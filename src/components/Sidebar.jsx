import React from "react";
import { Link, NavLink } from "react-router-dom";

const Sidebar = () => {
    return (
        <div className="h-screen bg-slate-900 w-[250px] p-5">
			<h4 className="text-3xl text-white">Admed</h4>
			<div className="w-full h-[2px] bg-white my-4 opacity-30" />
            <div className="links my-6 flex flex-col space-y-4">
				<NavLink to="/home" acti className={({isActive}) =>(`block py-2 px-3 rounded-md  w-full ${isActive ? "bg-white text-slate-900":"text-white"}`)}>
                    <span>Dashboard</span>
				</NavLink>
				<NavLink to="/doctors" acti className={({isActive}) =>(`block py-2 px-3 rounded-md  w-full ${isActive ? "bg-white text-slate-900":"text-white"}`)}>
                    <span>Doctors</span>
                </NavLink>
            </div>
        </div>
    );
};

export default Sidebar;
