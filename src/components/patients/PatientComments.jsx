import React, { useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import { useSelector, useDispatch } from "react-redux";
import { FaComment, FaSpinner } from "react-icons/fa";
import AddPatientCommentModal from "../modals/AddPatientCommentModal";
import ConfirmDeleteModal from "../modals/ConfirmDeleteModal";
import { deleteCommentAction } from "../../redux/actions/patients.action";
import { toast } from "react-toastify";
import CommentCard from "./CommentCard";

const PatientComments = ({ assigned }) => {
    const { commentType, comments } = useSelector(
        (state) => state.patientsState
    );
    const { authDetails } = useSelector((state) => state.authState);

    const [addCommentModalOpen, setAddCommentModalOpen] = useState(false);
    const [selectedType, setSelectedType] = useState(commentType[0]);
    const [filteredComments, setFilteredComments] = useState([]);
    const [filteredCommentTypes, setFilteredCommentTypes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [deletingComment, setDeletingComment] = useState(false);

    const [confirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState(false);
    const [selectedComment, setSelectedComment] = useState({});
    const [replyTo, setReplyTo] = useState("");

    const dispatch = useDispatch();
    const openDeleteModal = (comment) => {
        setSelectedComment(comment);
        setConfirmDeleteModalOpen(true);
    };

    const handleCloseDeleteModal = () => {
        setConfirmDeleteModalOpen(false);
        setSelectedComment({});
        setLoading(false);
    };

    const handleDeleteComment = async () => {
        setDeletingComment(true);
        const res = await dispatch(deleteCommentAction(selectedComment._id));

        handleCloseDeleteModal();
        setDeletingComment(false);
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
        toast.success(`Comment deleted Successfully`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    };

    useEffect(() => {
        if (selectedType?._id) {
            setFilteredComments(
                comments?.filter(
                    (comment) =>
                        comment?.commenttype === selectedType?._id &&
                        comment?.isReply === false
                )
            );
        }
    }, [selectedType?._id, comments]);

    useEffect(() => {
        if (authDetails?.role === "admin") {
            setFilteredCommentTypes(commentType);
        } else if (authDetails?.role === "doctor") {
            setFilteredCommentTypes(
                commentType?.filter(
                    (type) =>
                        type?.viewBy === "everyone" ||
                        type?.viewBy === "doctors"
                )
            );
        } else if (authDetails?.role === "secretary") {
            setFilteredCommentTypes(
                commentType?.filter((type) => type?.viewBy === "everyone")
            );
        } else {
            setFilteredCommentTypes([]);
        }
    }, [authDetails?.role, commentType]);

    return (
        <div className="p-4 flex-[1] rounded bg-white _shadow self-stfart">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-md mb-4 font-bold">Comments</h3>
                <div
                    onClick={() => {
                        setAddCommentModalOpen(true);
                    }}
                    className="flex items-center space-x-2 py-2 text-xs px-6 rounded-md text-white bg-seagreen 
						  hover:opacity-75 cursor-pointer"
                >
                    <FaComment />
                    <span>Add Comment</span>
                </div>
            </div>

            <div className="my-4">
                <Tab.Group>
                    <Tab.List className="flex space-x-5 border-b overflow-x-auto">
                        {filteredCommentTypes.map((category) => (
                            <Tab
                                key={category._id}
                                className={({ selected }) =>
                                    `
                  'w-full py-1.5 text-md px-0 font-medium leading-5 text-blue-700',
                  'focus:outline-none ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:ring-2',
                  ${
                      selected
                          ? "border-b-2 border-steelblue bg-flowerblue bg-opacity-25 rounded-t-md text-white px-0"
                          : "text-slate-800 hover:bg-white/[0.12] hover:text-slate-900"
                  }
                `
                                }
                            >
                                <div
                                    onClick={() => setSelectedType(category)}
                                    className="cursor-pointer text-sm w-full h-full contain p-2 px-4 "
                                >
                                    {category.name}
                                </div>
                            </Tab>
                        ))}
                    </Tab.List>
                </Tab.Group>
                {filteredCommentTypes?.length === 0 && (
                    <div className="text-center py-4 text-xl uppercase font-bold opacity-30">
                        No Comment Type Visible to you
                    </div>
                )}
            </div>
            {loading ? (
                <div className="w-full flex pt-20 justify-center">
                    <FaSpinner className="text-3xl animate-spin" />
                </div>
            ) : (
                <div className="p-4 max-h-[280px] overflow-y-auto">
                    <div className="text-sm my-2 divide-y-[1px] divide-gray-200">
                        {filteredComments?.map((comment, i) => (
                            <CommentCard
                                key={i}
                                comment={comment}
                                assigned={assigned}
                                openDeleteModal={openDeleteModal}
                                setReplyTo={setReplyTo}
                                replyTo={replyTo}
                            />
                        ))}
                    </div>

                    {filteredCommentTypes?.length > 0 &&
                        filteredComments?.length === 0 && (
                            <div className="text-center py-4 text-xl uppercase font-bold opacity-30">
                                No Comment Yet
                            </div>
                        )}
                </div>
            )}
            <ConfirmDeleteModal
                isOpen={confirmDeleteModalOpen}
                closeModal={handleCloseDeleteModal}
                message="Please confirm you want to remove the comment for this patient?"
                actionMethod={handleDeleteComment}
                loading={deletingComment}
            />
            <AddPatientCommentModal
                isOpen={addCommentModalOpen}
                closeModal={() => {
                    setAddCommentModalOpen(false);
                }}
            />
        </div>
    );
};

export default PatientComments;
