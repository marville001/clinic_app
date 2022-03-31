import React from "react";
import Sidebar from "./Sidebar";

const DashboardWrapper = ({ children }) => {
    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1">{children}</div>
        </div>
    );
};

export default DashboardWrapper;
