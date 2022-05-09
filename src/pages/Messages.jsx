import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DashboardWrapper from "../components/DashboardWrapper";
import Header from "../components/Header";
import ChatInfo from "../components/messages/ChatInfo";
import ChatMessages from "../components/messages/ChatMessages";
import ChatUsers from "../components/messages/ChatUsers";
import {
    getChatMessagesAction,
    getChatsAction,
} from "../redux/actions/messages.action";

const Messages = () => {
    const { authDetails } = useSelector((state) => state.authState);

    const [selectedChat, setSelectedChat] = useState({});

    const [chatInfoOpen, setChatInfoOpen] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        authDetails?._id && dispatch(getChatsAction());
    }, [dispatch, authDetails?._id]);

    useEffect(() => {
        authDetails?._id &&
            selectedChat?._id &&
            dispatch(getChatMessagesAction(selectedChat?._id));
    }, [dispatch, authDetails?._id, selectedChat?._id]);

    return (
        <DashboardWrapper>
            <Header title="Messages" />
            <div className="p-4 flex divide-x-[1px] min-h-[600px] relative">
                <ChatUsers
                    setSelectedChat={setSelectedChat}
                    selectedChat={selectedChat}
                />
                <ChatMessages
                    setChatInfoOpen={setChatInfoOpen}
                    selectedChat={selectedChat}
                />
                <ChatInfo
                    chatInfoOpen={chatInfoOpen}
                    setChatInfoOpen={setChatInfoOpen}
                />
            </div>
        </DashboardWrapper>
    );
};

export default Messages;
