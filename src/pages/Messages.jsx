import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DashboardWrapper from "../components/DashboardWrapper";
import Header from "../components/Header";
import ChatInfo from "../components/messages/ChatInfo";
import ChatMessages from "../components/messages/ChatMessages";
import ChatUsers from "../components/messages/ChatUsers";
import { getChatsAction } from "../redux/actions/messages.action";

const Messages = () => {
    const { authDetails } = useSelector((state) => state.authState);

    const dispatch = useDispatch();

    useEffect(() => {
        authDetails?._id && dispatch(getChatsAction());
    }, [dispatch, authDetails?._id]);

    return (
        <DashboardWrapper>
            <Header title="Messages" />
            <div className="p-4 flex divide-x-[1px] min-h-[600px]">
                <ChatUsers />
                <ChatMessages />
                <ChatInfo/>
            </div>
        </DashboardWrapper>
    );
};

export default Messages;
