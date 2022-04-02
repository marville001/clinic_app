import React from "react";

const DashCountCard = ({ icon: Icon, count, text }) => {
    return (
        <div className="rounded-md p-5 flex bg-white space-x-2 _shadow">
            <div className="rounded-md flex items-center p-2 px-4 bg-ghostwhite">
                <Icon className="text-3xl text-flowerblue" />
            </div>
            <div>
                <h2 className="text-2xl font-bold">{count}</h2>
                <p className="text-sm">{text}</p>
            </div>
        </div>
    );
};

export default DashCountCard;
