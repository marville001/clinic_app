import React, { useEffect } from "react";
import { useState } from "react";
import { FaSpinner, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { STATIC_FILE_BASE } from "../../constants";
import { createCommentAction, getCommentsAction } from "../../redux/actions/patients.action";

const CommendCard = ({
    comment,
    assigned,
    openDeleteModal,
    replyTo,
    setReplyTo,
}) => {
    const { authDetails } = useSelector((state) => state.authState);
    const { creatingComment } = useSelector((state) => state.patientsState);
    const { comments } = useSelector((state) => state.patientsState);

    const [replying, setReplying] = useState(false);
    const [reply, setReply] = useState("");
    const [replies, setReplies] = useState([]);

    const dispatch = useDispatch();
    const { id } = useParams();

    const handleSendReply = async () => {
        const res = await dispatch(
            createCommentAction(
                {
                    comment: reply,
                    commenttype: comment?.commenttype,
                    senderRole: authDetails.role,
                    senderId: authDetails._id,
                    isReply: true,
                    replyTo: comment?._id,
                },
                id
            )
        );

        if (!res.success) {
            toast.error(res.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            return;
        }

        toast.success(`Comment Added Successfully`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
        authDetails?._id && dispatch(getCommentsAction(id));
        setReplying(false);
    };

    useEffect(() => {
        if (comment?._id) {
            setReplies(
                comments?.filter(
                    (c) =>
                        c?.commenttype === comment?.commenttype &&
                        c.replyTo === comment?._id &&
                        c?.isReply
                )
            );
        }
    }, [comment?._id, comments, comment?.commenttype]);

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
            <div className="mx-14">
                {replies?.map((reply) => (
                    <div
                        key={reply?._id}
                        className="flex justify-between items-start"
                    >
                        <div className="flex items-start space-x-3 p-2">
                            {/* <FaUser className="text-lg text-dimgray" /> */}
                            <img
                                src={
                                    reply?.senderId.avatar?.startsWith("http")
                                        ? reply?.senderId.avatar
                                        : `${STATIC_FILE_BASE}${reply?.senderId.avatar}`
                                }
                                alt=""
                                className="h-6 w-6 rounded-full object-cover"
                            />
                            <span className=" flex flex-col text-xs">
                                <p className="font-bold">
                                    {reply?.senderId.firstname +
                                        " " +
                                        reply?.senderId.lastname}
                                </p>
                                <p>{reply.comment}</p>
                            </span>{" "}
                        </div>
                    </div>
                ))}
            </div>
            {replying && replyTo === comment?._id ? (
                <div className="flex flex-col gap-2 mx-2 ml-12 mb-5">
                    <textarea
                        name=""
                        className="w-full text-xs"
                        rows="2"
                        placeholder="Type reply here..."
                        value={reply}
                        onChange={(e) => setReply(e.target.value)}
                    ></textarea>
                    <div className="flex justify-between">
                        <button
                            onClick={() => {
                                setReplyTo("");
                                setReplying(false);
                            }}
                            className="bg-salmon rounded test-white px-5 py-1 text-white"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSendReply}
                            disabled={reply === "" || creatingComment}
                            className="bg-seagreen disabled:opacity-70 disabled:cursor-not-allowed rounded test-white px-5 py-1 text-white"
                        >
                            {creatingComment ? (
                                <FaSpinner className="animate-spin" />
                            ) : (
                                "Send"
                            )}
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
