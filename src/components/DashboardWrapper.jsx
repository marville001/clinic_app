import React, { useContext } from "react";
import { NavContext } from "../nav.context";
import Sidebar from "./Sidebar";

const DashboardWrapper = ({ children }) => {
    const { sidebarOpen } = useContext(NavContext);
    return (
        <div className="flex">
            <Sidebar />
            <div
                className={`flex-1 ${
                    sidebarOpen && "ml-[250px]"
                } transition-all duration-300 ease-linear`}
            >
                {children}
            </div>
        </div>
    );
};

export default DashboardWrapper;
