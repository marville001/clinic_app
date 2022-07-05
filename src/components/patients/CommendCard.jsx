import React from "react";
import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { STATIC_FILE_BASE } from "../../constants";

const CommendCard = ({
    comment,
    assigned,
    openDeleteModal,
    replyTo,
    setReplyTo,
}) => {
    const [replying, setReplying] = useState(false);

    return (
        <div className=" p-2">
            <div className="flex justify-between items-start">
                <div className="flex items-start space-x-3 p-2">
                    {/* <FaUser className="text-lg text-dimgray" /> */}
                    <img
                        src={
                            comment?.senderId.avatar?.startsWith("http")
                                ? comment?.senderId.avatar
                                : `${STATIC_FILE_BASE}${comment?.senderId.avatar}`
                        }
                        alt=""
                        className="h-8 w-8 rounded-full object-cover"
                    />
                    <span className=" flex flex-col text-sm">
                        <p className="font-bold">
                            {comment?.senderId.firstname +
                                " " +
                                comment?.senderId.lastname}
                        </p>
                        <p>{comment.comment}</p>
                    </span>{" "}
                </div>
                {!assigned && (
                    <div
                        className="flex items-center space-x-1 bg-salmon text-white text-xs p-2 
                                            rounded-full cursor-pointer hover:opacity-90 hover:scale-[1.02]"
                        onClick={() => {
                            openDeleteModal(comment);
                        }}
                    >
                        <FaTrash />
                    </div>
                )}
            </div>
            {replying && replyTo === comment?._id ? (
                <div className="flex flex-col gap-2 mx-2 ml-12 mb-5">
                    <textarea
                        name=""
                        className="w-full text-xs"
                        rows="2"
                        placeholder="Type reply here..."
                    ></textarea>
                    <div className="flex justify-between">
                        <button
                            onClick={() => {
                                setReplyTo("");
                                setReplying(false);
                            }}
                            className="bg-salmon test-white px-5 py-1 text-white"
                        >
                            Cancel
                        </button>
                        <button className="bg-seagreen test-white px-5 py-1 text-white">
                            Send
                        </button>
                    </div>
                </div>
            ) : (
                <button
                    onClick={() => {
                        setReplyTo(comment?._id);
                        setReplying(true);
                    }}
                    className="p-2 text-seagreen"
                >
                    Reply
                </button>
            )}
        </div>
    );
};

export default CommendCard;
