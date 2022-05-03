import React from "react";
import DashboardWrapper from "../components/DashboardWrapper";
import Header from "../components/Header";
import ChatInfo from "../components/messages/ChatInfo";
import ChatMessages from "../components/messages/ChatMessages";
import ChatUsers from "../components/messages/ChatUsers";

const Messages = () => {
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
