import React, { useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { NavContext } from "../nav.context";
import Sidebar from "./Sidebar";
import Loading from "./Loading";

const DashboardWrapper = ({ children }) => {
    const { loading } = useSelector((state) => state.authState);
    const { sidebarOpen } = useContext(NavContext);

    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage["auth-token"]) navigate("/");
    }, [navigate]);

    if (loading) return <Loading />;

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
