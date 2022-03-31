import React from "react";
import DashboardWrapper from "../components/DashboardWrapper";
import Header from "../components/Header";

const Messages = () => {
    return (
        <DashboardWrapper>
            <Header title="Messages" />
            <div className="p-4">
                <h4>Messages</h4>
            </div>
        </DashboardWrapper>
    );
};

export default Messages;
