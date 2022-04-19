import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NavContext } from "../nav.context";
import Sidebar from "./Sidebar";

const DashboardWrapper = ({ children }) => {
    const { sidebarOpen } = useContext(NavContext);

    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.token) navigate("/");
    }, [navigate]);

    return (
        <div className="flex">
            <Sidebar />
            <div
                className={`flex-1 ${
                    sidebarOpen && "xl:ml-[250px]"
                } transition-all duration-300 ease-linear`}
            >
                {children}
            </div>
        </div>
    );
};

export default DashboardWrapper;
