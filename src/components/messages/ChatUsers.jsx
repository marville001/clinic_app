import React, { useState } from "react";
import { useRef } from "react";
import { FaPlus, FaTimes } from "react-icons/fa";
import { HiDotsHorizontal } from "react-icons/hi";
import { useSelector } from "react-redux";
import parseInitials from "../../utils/parseInitials";
import NewChatModal from "../modals/NewChatModal";

const ChatUsers = ({
    setSelectedChat,
    selectedChat,
    setText,
    chatsBarOpen,
    setChatsBarOpen,
}) => {
    const { authDetails } = useSelector((state) => state.authState);
    const { chats } = useSelector((state) => state.messagesState);

    const chatSidebarRef = useRef(null);

    const [newChatModalOpen, setNewChatModalOpen] = useState(false);

    const handleOutsideClick = (e) => {
        if (!chatSidebarRef.current.contains(e.target)) {
            setChatsBarOpen(false);
        }
    };

    return (
        <div
            onClick={handleOutsideClick}
            className={`inset-0 fixed md:static  z-[4554] top-14 left-0  ${
                chatsBarOpen
                    ? "translate-x-0"
                    : "-translate-x-[100%] md:translate-x-0"
            } transition-all duration-150 ease-linear`}
        >
            <div
                ref={chatSidebarRef}
                className={`w-[300px] h-full overflow-auto no-scroll bg-white
            
        
        `}
            >
                <div className="my-5 flex justify-between items-center px-5">
                    <h3 className="text-xl font-bold">Chat</h3>
                    <FaTimes
                        onClick={() => setChatsBarOpen(false)}
                        className="text-2xl cursor-pointer md:hidden"
                    />
                </div>

                <div
                    onClick={() => {
                        setChatsBarOpen(false);
                        setNewChatModalOpen(true);
                    }}
                    className="my-5 flex _shadow rounded-full p-2 mx-5 cursor-pointer items-center gap-5 justfy-center"
                >
                    <div className="p-3 rounded-full bg-lightgray">
                        <FaPlus className="text-steelblue font-bold" />
                    </div>
                    <h4 className="flex-1 text-center text-xl font-bold opacity-60">
                        Create New
                    </h4>
                </div>

                {/* <div className="my-8 flex relative bg-lightgray mx-5 p-1 rounded-full overflow-hidden">
                <input
                    type="text"
                    name=""
                    id=""
                    className="border-0 opacity-80 outline-none w-[90%] ring-0 bg-transparent focus:ring-0 focus:outline-none"
                />
                <FaSearch className="absolute right-4 text-xl top-1/2 opacity-40 -translate-y-1/2 z-40" />
            </div> */}

                <div className="flex flex-col divide-y-[1px] gap-4 mt-14 px-5 overflow-auto no-scroll">
                    {chats?.map((chat) => (
                        <div
                            key={chat._id}
                            onClick={() => {
                                if (selectedChat._id !== chat?._id) {
                                    setSelectedChat(chat);
                                    setText("");
                                }
                                setChatsBarOpen(false);
                            }}
                            className="flex gap-4 items-center cursor-pointer hover:bg-lightgray p-2 rounded-lg"
                        >
                            <div className="p-2 rounded-full h-10 w-10 flex items-center justify-center bg-lightgray">
                                <span className="text-sm font-bold opacity-70 text-steelblue">
                                    {parseInitials(
                                        chat?.users?.find(
                                            (c) => c._id !== authDetails?._id
                                        )
                                    )}
                                </span>
                            </div>
                            <div className="flex-1">
                                <h2 className="text-sm font-bold flex justify-between w-full items-center">
                                    <span className="block">
                                        {
                                            chat?.users?.find(
                                                (c) =>
                                                    c._id !== authDetails?._id
                                            )?.firstname
                                        }{" "}
                                        {
                                            chat?.users?.find(
                                                (c) =>
                                                    c._id !== authDetails?._id
                                            )?.lastname
                                        }
                                    </span>
                                    <span className="text-steelblue block text-[10px] font-medium">
                                        {new Date(
                                            chat?.latestMessage?.updatedAt
                                        )
                                            .toDateString()
                                            .toString()
                                            .replaceAll("/", "-")}
                                    </span>
                                </h2>
                                <p className="text-xs mt-2">
                                    {chat?.latestMessage?.content.substring(
                                        0,
                                        25
                                    )}{" "}
                                    {chat?.latestMessage?.content?.length >
                                        25 && "..."}
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

                <NewChatModal
                    setSelectedChat={setSelectedChat}
                    isOpen={newChatModalOpen}
                    closeModal={() => {
                        setNewChatModalOpen(false);
                    }}
                />
            </div>
        </div>
    );
};

export default ChatUsers;
