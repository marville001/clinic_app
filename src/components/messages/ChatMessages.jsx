import React, { useState } from "react";
import ChatContainer from "./ChatContainer";
import {
    FaAngleDoubleRight,
    FaBars,
    FaPaperPlane,
    FaSpinner,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { sendMessageAction } from "../../redux/actions/messages.action";

const ChatMessages = React.forwardRef(
    (
        {
            selectedChat,
            setChatInfoOpen,
            messages,
            socket,
            socketConnected,
            typing,
            setTyping,
            isTyping,
            text,
            setText,
            setChatsBarOpen,
        },
        ref
    ) => {
        const { loadingMessages } = useSelector((state) => state.messagesState);
        const { authDetails } = useSelector((state) => state.authState);

        const [error, setError] = useState("");

        const dispatch = useDispatch();

        const handleSendMessage = async (e) => {
            e.preventDefault();
            setError("");

            if (text === "") {
                setError("Please type a message to continue");
                return;
            }

            setText("");

            const data = await dispatch(
                sendMessageAction({
                    chatId: selectedChat?._id,
                    content: text,
                })
            );

            socket?.emit("new message", data.message);
        };

        const typingHandler = (e) => {
            setError("");
            setText(e.target.value);

            // Typing Indicator Logic
            if (!socketConnected) return;

            if (!typing) {
                setTyping(true);
                socket?.emit("typing", selectedChat?._id);
            }

            let lastTypingTime = new Date().getTime();

            let timerLength = 3000;

            setTimeout(() => {
                let timeNow = new Date().getTime();
                let timeDifference = timeNow - lastTypingTime;
                if (timeDifference >= timerLength && typing) {
                    socket?.emit("stop typing", selectedChat?._id);
                    setTyping(false);
                }
            }, timerLength);
        };

        return (
            <div className="flex-[1] sm:px-5 flex flex-col h-full">
                <div className="md:hidden">
                    <FaAngleDoubleRight
                        onClick={() => setChatsBarOpen(true)}
                        className="text-2xl cursor-pointer"
                    />
                </div>
                {/* Header */}
                {selectedChat?._id && (
                    <div className="flex items-center justify-between">
                        <div className="my-5">
                            <h2>Chat with</h2>
                            <h1 className="font-bold text-lg">
                                {
                                    selectedChat?.users?.find(
                                        (c) => c._id !== authDetails?._id
                                    )?.firstname
                                }{" "}
                                {
                                    selectedChat?.users?.find(
                                        (c) => c._id !== authDetails?._id
                                    )?.lastname
                                }
                            </h1>
                        </div>
                        <FaBars
                            onClick={() => setChatInfoOpen(true)}
                            className="text-lg cursor-pointer opacity-70 lg:hidden"
                        />
                    </div>
                )}
                <div className="flex-[1] overflow-scroll flex flex-col justify-end no-scroll">
                    {messages?.map((chat) => (
                        <div key={chat._id}>
                            <ChatContainer chat={chat} />
                        </div>
                    ))}
                    <div ref={ref} />

                    {!selectedChat?._id && messages?.length === 0 && (
                        <div className="h-full flex flex-col justify-center items-center">
                            <h4 className="text-2xl font-bold opacity-70 mb-2">
                                Select a Conversation
                            </h4>
                            <p className="max-w-[300px] text-center opacity-75">
                                Try selecting a conversation or searching for
                                someone specific.
                            </p>
                        </div>
                    )}

                    {loadingMessages && (
                        <div className="h-full flex flex-col justify-center items-center">
                            <FaSpinner className="text-xl opacity-75 animate-spin" />
                        </div>
                    )}

                    {selectedChat?._id &&
                        !loadingMessages &&
                        messages.length === 0 && (
                            <div className="h-full flex flex-col justify-center items-center">
                                <h4 className="text-2xl font-bold opacity-70 mb-2">
                                    No Message in This Chat
                                </h4>
                            </div>
                        )}
                </div>

                {selectedChat?._id && (
                    <form
                        onSubmit={handleSendMessage}
                        autoComplete="off"
                        className="flex items-center gap-3 mt-5"
                    >
                        <div className="h-8 w-full p-1 ring-1 relative rounded-lg">
                            {error && (
                                <div className="bg-gray-200 p-3 py-1 text-xs absolute top-0 -translate-y-full left-5 rounded-t-lg right-5 ">
                                    {error}
                                </div>
                            )}
                            {isTyping && (
                                <div className="px-2 absolute -top-1 opacity-70 -translate-y-full left text-xs flex gap-1 items-center">
                                    <span>Typing</span>
                                    <div className="bg-gray-500 h-2 w-2 rounded-full animate-pulse"></div>
                                    <div className="bg-gray-500 h-2 w-2 rounded-full animate-pulse"></div>
                                    <div className="bg-gray-500 h-2 w-2 rounded-full animate-pulse"></div>
                                </div>
                            )}
                            <input
                                type="text"
                                disabled={!selectedChat?._id}
                                value={text}
                                onChange={typingHandler}
                                placeholder="Type message here."
                                className="w-full h-full text-sm disabled:cursor-not-allowed bg-transparent rounded-full outline-none ring-0 focus:ring-0 focus:outline-none focus:border-0 border-0"
                            />
                        </div>
                        <button className="p-2 bg-opacity-30 rounded-full bg-flowerblue flex justify-center items-center cursor-pointer">
                            <FaPaperPlane className="text-xl text-steelblue" />
                        </button>
                    </form>
                )}
            </div>
        );
    }
);

export default ChatMessages;
