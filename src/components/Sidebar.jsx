import React from "react";
import { NavLink } from "react-router-dom";

import { FaUncharted, FaHospitalUser, FaUserInjured, FaUserCog, FaUserSecret } from "react-icons/fa";

const Sidebar = () => {
    return (
        <div className="h-screen bg-slate-900 w-[250px] p-5 relative">
            <h4 className="text-lg text-seagreen font-bold"> Alexander Mam...</h4>
            <div className="w-full h-[2px] bg-white my-4 opacity-30" />
            <div className="links my-6 flex flex-col space-y-4">
                <NavLink
                    to="/home"
                    className={({ isActive }) =>
                        `py-2 px-3 rounded-md  w-full flex items-center space-x-4 ${
                            isActive ? "bg-white text-slate-900" : "text-white"
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
                            isActive ? "bg-white text-slate-900" : "text-white"
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
                            isActive ? "bg-white text-slate-900" : "text-white"
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
                            isActive ? "bg-white text-slate-900" : "text-white"
                        }`
                    }
				>
					<FaUserCog />
                    <span>Secretaries</span>
				</NavLink>

				<NavLink
                    to="/admins"
                    className={({ isActive }) =>
                        `py-2 px-3 rounded-md  w-full flex items-center space-x-4 ${
                            isActive ? "bg-white text-slate-900" : "text-white"
                        }`
                    }
				>
					<FaUserSecret />
                    <span>Admins</span>
				</NavLink>
				
            </div>
            <div className="absolute bottom-10 inset-x-0 px-8 text-white ">
                <button>Logout</button>
            </div>
        </div>
    );
};

export default Sidebar;
