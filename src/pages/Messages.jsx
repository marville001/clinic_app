import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DashboardWrapper from "../components/DashboardWrapper";
import Header from "../components/Header";
import ChatInfo from "../components/messages/ChatInfo";
import ChatMessages from "../components/messages/ChatMessages";
import ChatUsers from "../components/messages/ChatUsers";
import {
    addMessageAction,
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
    const { messages } = useSelector((state) => state.messagesState);

    const [selectedChat, setSelectedChat] = useState({});
    const [chatInfoOpen, setChatInfoOpen] = useState(false);
    const [socketConnected, setSocketConnected] = useState(false);
    const [typing, setTyping] = useState(false);
    const [isTyping, setIsTyping] = useState(false);

    const scrollRef = useRef();
    const dispatch = useDispatch();

    useEffect(() => {
        if (authDetails._id) {
            socket = io(END_POINT);
            socket.emit("setup", authDetails);
            socket.on("connected", () => setSocketConnected(true));
            socket.on("typing", () => setIsTyping(true));
            socket.on("stop typing", () => setIsTyping(false));

            socket?.on("message received", (newMessageReceived) => {
                if (
                    !selectedChatCompare ||
                    newMessageReceived?.chat?._id !== selectedChatCompare._id
                ) {
                    //give notification
                } else {
                    console.log("dispatching");
                    dispatch(addMessageAction(newMessageReceived));
                }
            });
        }
    }, [authDetails]);

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
        return () => {
            dispatch(resetMessagesAction());
        };
    }, [dispatch]);

    useEffect(() => {});

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

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
                    ref={scrollRef}
                    socketConnected={socketConnected}
                    typing={typing}
                    setTyping={setTyping}
                    isTyping={isTyping}
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
