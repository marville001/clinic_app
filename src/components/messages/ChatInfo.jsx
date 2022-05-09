import React from "react";
import { FaChevronCircleRight } from "react-icons/fa";
import { useSelector } from "react-redux";

const ChatInfo = ({ chatInfoOpen, setChatInfoOpen, selectedChat }) => {
    const { authDetails } = useSelector((state) => state.authState);

    return (
        <div
            className={`w-[300px] pl-5 absolute bg-white right-0 top-0 bottom-0 lg:static  transition-all duration-200 ease-linear ${
                chatInfoOpen
                    ? "block scale-100"
                    : " hidden scale-0 lg:scale-100 lg:block"
            }`}
        >
            <div className="flex items-center gap-5 lg:justify-center py-4">
                <FaChevronCircleRight
                    onClick={() => setChatInfoOpen(false)}
                    className="cursor-pointer lg:hidden text-lg opacity-70"
                />
                <h2 className="text-xl opacity-80 font-bold">Chat Info</h2>
            </div>

            <div className="my-6">
                <h4 className="text-center">
                    {selectedChat?.users?.find(c=>c._id !== authDetails?._id)?.firstname}{" "}
                                    {selectedChat?.users?.find(c=>c._id !== authDetails?._id)?.lastname}
                </h4>

                <h3 className="capitalize text-center font-bold text-lg mt-4 opacity-50 "> {selectedChat?.users?.find(c=>c._id !== authDetails?._id)?.role}</h3>
            </div>
        </div>
    );
};

export default ChatInfo;
