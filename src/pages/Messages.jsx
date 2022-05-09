import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DashboardWrapper from "../components/DashboardWrapper";
import Header from "../components/Header";
import ChatInfo from "../components/messages/ChatInfo";
import ChatMessages from "../components/messages/ChatMessages";
import ChatUsers from "../components/messages/ChatUsers";
import {
    getChatMessagesAction,
    getChatsAction,
    resetMessagesAction,
} from "../redux/actions/messages.action";
import io from "socket.io-client";

let socket, selectedChatCompare;
const END_POINT =
    process.env.NODE_ENV === "production"
        ? "https://my-clinic-api.herokuapp.com"
        : "http://localhost:9003";

const Messages = () => {
    const { authDetails } = useSelector((state) => state.authState);
    const state = useSelector((state) => state.messagesState);

    const [selectedChat, setSelectedChat] = useState({});
    const [messages, setMessages] = useState([]);

    const [chatInfoOpen, setChatInfoOpen] = useState(false);

    const [socketConnected, setSocketConnected] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        socket = io(END_POINT);
        socket.emit("setup", authDetails);
        socket.on("connected", () => setSocketConnected(true));
    }, []);

    useEffect(() => {
        authDetails?._id && dispatch(getChatsAction());
    }, [dispatch, authDetails?._id]);

    useEffect(() => {
        if (authDetails?._id && selectedChat?._id) {
            dispatch(getChatMessagesAction(selectedChat?._id));

            socket?.emit("join chat", selectedChat?._id);
        }
        selectedChatCompare = selectedChat;
    }, [dispatch, authDetails?._id, selectedChat?._id]);

    useEffect(() => {
        return () => {
            dispatch(resetMessagesAction());
            setSelectedChat({});
        };
    }, [dispatch]);

    useEffect(() => {
        setMessages(state.messages);
    }, [state.messages]);

    console.log(selectedChatCompare);

    useEffect(() => {
        socket?.on("message received", (newMessageReceived) => {
            console.log(newMessageReceived);
            if (
                !selectedChatCompare ||
                newMessageReceived?.chat?._id !== selectedChatCompare._id
            ) {
                //give notification
            } else {
                setMessages([...messages, newMessageReceived]);
            }
        });
    }, []);

    return (
        <DashboardWrapper>
            <Header title="Messages" />
            <div className="p-4 flex divide-x-[1px] min-h-[600px] relative chat-container">
                <ChatUsers
                    setSelectedChat={setSelectedChat}
                    selectedChat={selectedChat}
                />
                <ChatMessages
                    messages={messages}
                    setChatInfoOpen={setChatInfoOpen}
                    selectedChat={selectedChat}
                    socket={socket}
                />
                <ChatInfo
                    chatInfoOpen={chatInfoOpen}
                    setChatInfoOpen={setChatInfoOpen}
                    selectedChat={selectedChat}
                />
            </div>
        </DashboardWrapper>
    );
};

export default Messages;
