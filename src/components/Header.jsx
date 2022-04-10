import React, { useContext } from "react";
import { HiMenuAlt1 } from "react-icons/hi";
import { NavContext } from "../nav.context";

const Header = ({ title }) => {
    const { sidebarOpen, setSidebarOpen } = useContext(NavContext);
    return (
        <div className="flex justify-between items-center bg-slate-900 p-4">
            <div className="flex items-center space-x-4">
                <HiMenuAlt1
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="text-white text-3xl cursor-pointer"
                />
                <h2 className="capitalize text-white">{title}</h2>
            </div>
            <div className="p-4 bg-red-300 rounded-full"></div>
        </div>
    );
};

export default Header;
