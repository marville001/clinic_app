/* eslint-disable react-hooks/exhaustive-deps */
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
import { useSocket } from "../contexts/socket.context";

let selectedChatCompare;

const Messages = () => {
    const { authDetails } = useSelector((state) => state.authState);
    const { messages } = useSelector((state) => state.messagesState);

    const [selectedChat, setSelectedChat] = useState({});
    const [chatInfoOpen, setChatInfoOpen] = useState(false);
    const [typing, setTyping] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [text, setText] = useState("");
    const [chatsBarOpen, setChatsBarOpen] = useState(false)
    

    const scrollRef = useRef();
    const dispatch = useDispatch();

    const { socket, socketConnected } = useSocket();

    useEffect(() => {
        if (socket) {
            socket.on(
                "typing",
                (room) => room === selectedChat?.id && setIsTyping(true)
            );
            socket.on("stop typing", () => setIsTyping(false));

            socket?.on("message received", (newMessageReceived) => {
                if (
                    !selectedChatCompare ||
                    newMessageReceived?.chat?._id !== selectedChatCompare._id
                ) {
                    //give notification
                } else {
                    dispatch(addMessageAction(newMessageReceived));
                }
            });
        }
    }, [socket]);

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
            <div className="p-4 flex md:divide-x-[1px] min-h-[600px] relative chat-container">
                <ChatUsers
                    setSelectedChat={setSelectedChat}
                    selectedChat={selectedChat}
                    chatsBarOpen={chatsBarOpen}
                    setChatsBarOpen={setChatsBarOpen}
                    setText={setText}
                />
                <ChatMessages
                    messages={messages}
                    setChatInfoOpen={setChatInfoOpen}
                    selectedChat={selectedChat}
                    socket={socket}
                    ref={scrollRef}
                    socketConnected={socketConnected}
                    typing={typing}
                    setChatsBarOpen={setChatsBarOpen}
                    setTyping={setTyping}
                    isTyping={isTyping}
                    text={text}
                    setText={setText}
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
