import React from "react";
import ChatContainer from "./ChatContainer";
import {FaPaperPlane} from "react-icons/fa"

const ChatMessages = () => {
    return (
        <div className="flex-[1] px-5 flex flex-col h-full">
            {/* Header */}
            <div className="my-5">
                <h2>Chat with</h2>
                <h1 className="font-bold text-lg">Martin Kamau</h1>
            </div>
            <div className="min-h-[550px] h-[580px] overflow-scroll no-scroll">
                {[1, 2, 3, 4, 5, 6, 7].map((chat) => (
                    <React.Fragment key={chat}>
                        <ChatContainer index={chat} />
                    </React.Fragment>
                ))}
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
