import React from "react";
import ChatContainer from "./ChatContainer";
import { FaPaperPlane } from "react-icons/fa";
import { useSelector } from "react-redux";

const ChatMessages = ({ selectedChat }) => {
	const { messages } = useSelector((state) => state.messagesState);
    return (
        <div className="flex-[1] px-5 flex flex-col h-full">
            {/* Header */}
            <div className="my-5">
                <h2>Chat with</h2>
                <h1 className="font-bold text-lg">Martin Kamau</h1>
            </div>
            <div className="min-h-[550px] h-[580px] overflow-scroll no-scroll">
                {messages?.map((chat) => (
                    <React.Fragment key={chat._id}>
                        <ChatContainer chat={chat} />
                    </React.Fragment>
                ))}

                {!selectedChat?._id && (
                    <div className="h-full flex flex-col justify-center items-center">
						<h4 className="text-2xl font-bold opacity-70 mb-2">Select a Conversation</h4>
						<p className="max-w-[300px] text-center opacity-75">Try selecting a conversation or searching for someone specific.</p>
                    </div>
                )}
            </div>
            <div className="flex items-center gap-3 mt-5">
                <div className="h-12 w-full p-1 ring-1 rounded-full">
                    <input
                        type="text"
                        placeholder="Type message here."
                        className="w-full h-full bg-transparent rounded-full outline-none ring-0 focus:ring-0 focus:outline-none focus:border-0 border-0"
                    />
                </div>
                <div className="p-2 bg-opacity-30 rounded-full h-14 bg-flowerblue  w-14 flex justify-center items-center cursor-pointer">
                    <FaPaperPlane className="text-2xl text-steelblue" />
                </div>
            </div>
        </div>
    );
};

export default ChatMessages;
