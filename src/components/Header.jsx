import React from "react";

const Header = ({ title }) => {
    return (
        <div className="flex justify-between items-center bg-slate-900 p-4">
			<h2 className="capitalize text-white">{title}</h2>
			<div className="p-4 bg-red-300 rounded-full"></div>
        </div>
    );
};

export default Header;
