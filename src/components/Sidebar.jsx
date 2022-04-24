import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import {
    FaUncharted,
    FaHospitalUser,
    FaUserInjured,
    FaUserSecret,
    FaRocketchat,
    FaPowerOff,
    FaUserShield,
} from "react-icons/fa";
import { NavContext } from "../nav.context";
import { useDispatch, useSelector } from "react-redux";
import { logoutUserAction } from "../redux/actions/auth.action";

const Sidebar = () => {
    const { authDetails } = useSelector((state) => state.authState);

    const { sidebarOpen } = useContext(NavContext);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogOut = () => {
        dispatch(logoutUserAction());
        navigate("/");
    };

    return (
        <div
            className={`h-screen bg-slate-900 w-[250px] p-5 fixed transition-all z-[100]
            duration-300 ease-linear ${
                sidebarOpen ? "translate-x-0" : "-translate-x-[100%]"
            }`}
        >
            <h4 className="text-lg text-seagreen text-center font-bold">
                {authDetails?.firstname} {authDetails?.lastname}
            </h4>
            <div className="w-full h-[2px] bg-white my-4 opacity-30" />
            <div className="links my-6 flex flex-col space-y-4">
                <NavLink
                    to="/home"
                    className={({ isActive }) =>
                        `py-2 px-3 rounded-md  w-full flex items-center space-x-4 ${
                            isActive
                                ? "bg-white text-slate-900"
                                : "text-white opacity-70 hover:bg-slate-700 "
                        }`
                    }
                >
                    <FaUncharted />
                    <span>Dashboard</span>
                </NavLink>
                <NavLink
                    to="/doctors"
                    className={({ isActive }) =>
                        `py-2 px-3 rounded-md  w-full flex items-center space-x-4 ${
                            isActive
                                ? "bg-white text-slate-900"
                                : "text-white opacity-70 hover:bg-slate-700 "
                        }`
                    }
                >
                    <FaHospitalUser />
                    <span>Doctors</span>
                </NavLink>
                <NavLink
                    to="/patients"
                    className={({ isActive }) =>
                        `py-2 px-3 rounded-md  w-full flex items-center space-x-4 ${
                            isActive
                                ? "bg-white text-slate-900"
                                : "text-white opacity-70 hover:bg-slate-700 "
                        }`
                    }
                >
                    <FaUserInjured />
                    <span>Patients</span>
                </NavLink>

                <NavLink
                    to="/secretaries"
                    className={({ isActive }) =>
                        `py-2 px-3 rounded-md  w-full flex items-center space-x-4 ${
                            isActive
                                ? "bg-white text-slate-900"
                                : "text-white opacity-70 hover:bg-slate-700 "
                        }`
                    }
                >
                    <FaUserShield />
                    <span>Secretaries</span>
                </NavLink>

                <NavLink
                    to="/admins"
                    className={({ isActive }) =>
                        `py-2 px-3 rounded-md  w-full flex items-center space-x-4 ${
                            isActive
                                ? "bg-white text-slate-900"
                                : "text-white opacity-70 hover:bg-slate-700 "
                        }`
                    }
                >
                    <FaUserSecret />
                    <span>Admins</span>
                </NavLink>

                <NavLink
                    to="/messages"
                    className={({ isActive }) =>
                        `py-2 px-3 rounded-md  w-full flex items-center space-x-4 ${
                            isActive
                                ? "bg-white text-slate-900"
                                : "text-white opacity-70 hover:bg-slate-700 "
                        }`
                    }
                >
                    <FaRocketchat />
                    <span>Messages</span>
                </NavLink>
            </div>
            <div className="absolute bottom-10 inset-x-0 px-5 text-white ">
                <button
                    onClick={handleLogOut}
                    className="w-full flex items-center space-x-4 opacity-80 py-2 px-4 hover:bg-slate-700 rounded-md active:opacity-100"
                >
                    <FaPowerOff />
                    <span>Logout</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
