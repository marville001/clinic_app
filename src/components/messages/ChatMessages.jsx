import React, {  useState } from "react";
import ChatContainer from "./ChatContainer";
import { FaBars, FaPaperPlane, FaSpinner } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { sendMessageAction } from "../../redux/actions/messages.action";
import ScrollableFeed from "react-scrollable-feed";

const ChatMessages = ({ selectedChat, setChatInfoOpen, messages, socket }) => {
    const { loadingMessages } = useSelector(
        (state) => state.messagesState
    );
    const { authDetails } = useSelector((state) => state.authState);

    const [text, setText] = useState("");
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

        socket?.emit("new message", data.message)
    };

    const typingHandler = (e) => {
        setError("");
        setText(e.target.value);

        // Typing Indicator Logic
    };

    return (
        <div className="flex-[1] px-5 flex flex-col h-full">
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
            <div className="flex-[1] overflow-scroll no-scroll">
                <ScrollableFeed forceScroll={true}>
                    {messages?.map((chat) => (
                        <ChatContainer key={chat._id} chat={chat} />
                    ))}
                </ScrollableFeed>

                {!selectedChat?._id && (
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
            <form
                onSubmit={handleSendMessage}
                autoComplete="off"
                className="flex items-center gap-3 mt-5"
            >
                <div className="h-12 w-full p-1 ring-1 relative rounded-full">
                    {error && (
                        <div className="bg-gray-200 p-3 py-1 text-xs absolute top-0 -translate-y-full left-5 rounded-t-lg right-5 ">
                            {error}
                        </div>
                    )}
                    <input
                        type="text"
                        disabled={!selectedChat?._id}
                        value={text}
                        onChange={typingHandler}
                        placeholder="Type message here."
                        className="w-full h-full disabled:cursor-not-allowed bg-transparent rounded-full outline-none ring-0 focus:ring-0 focus:outline-none focus:border-0 border-0"
                    />
                </div>
                <button className="p-2 bg-opacity-30 rounded-full h-14 bg-flowerblue  w-14 flex justify-center items-center cursor-pointer">
                    <FaPaperPlane className="text-2xl text-steelblue" />
                </button>
            </form>
        </div>
    );
};

export default ChatMessages;
