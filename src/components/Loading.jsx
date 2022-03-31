import React from "react";

import { FaSpinner } from "react-icons/fa";

const Loading = () => {
    return (
        <div className="w-36 h-28 flex justify-center items-center bg-lightgray rounded-lg mx-auto my-4">
            <div className="flex flex-col items-center space-y-4">
                <FaSpinner className="animate-spin text-3xl  text-seagreen" />
                <p className="font-light text-center uppercase">Loading</p>
            </div>
        </div>
    );
};

export default Loading;
