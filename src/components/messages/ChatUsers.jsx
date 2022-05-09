import React from "react";
import { FaPlus, FaSearch } from "react-icons/fa";
import { HiDotsHorizontal } from "react-icons/hi";
import { useSelector } from "react-redux";
import parseInitials from "../../utils/parseInitials";
import { format } from "timeago.js";

const ChatUsers = ({setSelectedChat, selectedChat}) => {
    const { chats } = useSelector((state) => state.messagesState);

    return (
        <div className="w-[300px] pr-5 h-full">
            <div className="my-5 flex justify-between items-center">
                <h3 className="text-xl font-bold">Chat</h3>
                <HiDotsHorizontal className="text-2xl cursor-pointer" />
            </div>

            <div className="my-5 flex _shadow rounded-full p-2 cursor-pointer items-center gap-5 justfy-center">
                <div className="p-3 rounded-full bg-lightgray">
                    <FaPlus className="text-steelblue font-bold" />
                </div>
                <h4 className="flex-1 text-center text-xl font-bold opacity-60">
                    Create New
                </h4>
            </div>

            <div className="my-8 flex relative bg-lightgray p-1 rounded-full overflow-hidden">
                <input
                    type="text"
                    name=""
                    id=""
                    className="border-0 opacity-80 outline-none w-[90%] ring-0 bg-transparent focus:ring-0 focus:outline-none"
                />
                <FaSearch className="absolute right-4 text-xl top-1/2 opacity-40 -translate-y-1/2 z-40" />
            </div>

            <div className="flex flex-col divide-y-[1px] gap-4 max-h-[570px] overflow-auto no-scroll">
                {chats?.map((chat) => (
                    <div
                        key={chat._id}
                        onClick={()=>selectedChat._id !== chat?._id && setSelectedChat(chat)}
                        className="flex gap-4 items-center cursor-pointer hover:bg-lightgray p-2 rounded-lg"
                    >
                        <div className="p-2 rounded-full h-10 w-10 flex items-center justify-center bg-lightgray">
                            <span className="text-sm font-bold opacity-70 text-steelblue">
                                {parseInitials(chat?.users[0])}
                            </span>
                        </div>
                        <div className="flex-1">
                            <h2 className="text-sm font-bold flex justify-between w-full items-center">
                                <span className="block">
                                    {chat?.users[0].firstname}{" "}
                                    {chat?.users[0].lastname}
                                </span>
                                <span className="text-steelblue block text-[10px] font-medium">
                                    {format(chat?.updatedAt, "en_US")}
                                </span>
                            </h2>
                            <p className="text-xs mt-2">
                                {chat?.latestMessage?.content.substring(0, 25)}{" "}
                                {chat?.latestMessage?.content?.length > 25 &&
                                    "..."}
                            </p>
                        </div>
                    </div>
                ))}

                {chats?.length === 0 && (
                    <div className="p-5 flex justify-center items-center flex-col">
                        <h3 className="text-xl opacity-75">No Chat Yes</h3>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatUsers;
