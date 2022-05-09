import React, { useRef } from "react";
import ChatContainer from "./ChatContainer";
import { FaBars, FaPaperPlane, FaSpinner } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { sendMessageAction } from "../../redux/actions/messages.action";

const ChatMessages = ({ selectedChat, setChatInfoOpen }) => {
    const { messages, loadingMessages } = useSelector(
        (state) => state.messagesState
    );
    const { authDetails } = useSelector((state) => state.authState);

    const {
        register,
        handleSubmit,
        formState: { errors },
        clearErrors,
        reset
    } = useForm();
    const dispatch = useDispatch()

    const handleSendMessage = async (data) => {

        await dispatch(sendMessageAction({
            chatId: selectedChat?._id,
            content: data.message
        }));

        reset();
    };

   

    return (
        <div className="flex-[1] px-5 flex flex-col h-full">
            {/* Header */}
            {selectedChat?._id &&
                <div className="flex items-center justify-between">
                    <div className="my-5">
                        <h2>Chat with</h2>
                        <h1 className="font-bold text-lg">
                            {selectedChat?.users?.find(c=>c._id !== authDetails?._id)?.firstname}{" "}
                            {selectedChat?.users?.find(c=>c._id !== authDetails?._id)?.lastname}
                        </h1>
                    </div>
                    <FaBars onClick={()=>setChatInfoOpen(true)} className="text-lg cursor-pointer opacity-70 lg:hidden" />
                </div>
            }
            <div className="min-h-[550px] h-[580px] overflow-scroll no-scroll">
                {messages?.map((chat) => (
                    <React.Fragment key={chat._id}>
                        <ChatContainer chat={chat} />
                    </React.Fragment>
                ))}

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
                onSubmit={handleSubmit(handleSendMessage)}
                autoComplete="off"
                className="flex items-center gap-3 mt-5"
            >
                <div className="h-12 w-full p-1 ring-1 relative rounded-full">
                    {errors.message && (
                        <div className="bg-gray-200 p-3 py-1 text-xs absolute top-0 -translate-y-full left-5 rounded-t-lg right-5 ">
                            {errors.message.message}
                        </div>
                    )}
                    <input
                        type="text"
                        disabled={!selectedChat?._id}
                        {...register("message", {
                            required: {
                                value: true,
                                message: `Please type a message to continue`,
                            },
                        })}
                        onChange={() => {
                            clearErrors()
                        }}
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
