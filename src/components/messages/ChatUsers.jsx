import React from "react";
import { FaSearch } from "react-icons/fa";
import { HiDotsHorizontal } from "react-icons/hi";

const ChatUsers = () => {
    return (
        <div className="w-[300px] pr-5 h-full">
            <div className="my-5 flex justify-between items-center">
                <h3 className="text-xl font-bold">Chat</h3>
                <HiDotsHorizontal className="text-2xl cursor-pointer" />
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

            <div className="flex flex-col gap-4 max-h-[500px] overflow-auto no-scroll">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17].map((chat) => (
                    <div
                        key={chat}
                        className="flex gap-4 items-center cursor-pointer"
                    >
                        <img
                            src="https://randomuser.me/api/portraits/men/0.jpg"
                            className="w-12 h-12 rounded-full"
                            alt=""
                        />
                        <div>
                            <h2 className="text-sm font-bold">
                                Martin Kamau{" "}
                                <span className="text-steelblue ml-2 text-xs font-medium">
                                    {chat} hours ago
                                </span>
                            </h2>
                            <p className="text-xs">
                                Lorem ipsum dolor sit....{" "}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ChatUsers;
