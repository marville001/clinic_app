import React, { useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import { useSelector, useDispatch } from "react-redux";
import { FaComment, FaUser, FaSpinner, FaTrash } from "react-icons/fa";
import AddPatientCommentModal from "../modals/AddPatientCommentModal";
import ConfirmDeleteModal from "../modals/ConfirmDeleteModal";
import { deleteCommentAction } from "../../redux/actions/patients.action";
import { toast } from "react-toastify";

const PatientComments = () => {
    const { commentType, comments } = useSelector(
        (state) => state.patientsState
    );
    const [addCommentModalOpen, setAddCommentModalOpen] = useState(false);
    const [selectedType, setSelectedType] = useState(commentType[0]);
    const [filteredComments, setFilteredComments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [deletingComment, setDeletingComment] = useState(false);

    const [confirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState(false);
    const [selectedComment, setSelectedComment] = useState({});
    const dispatch = useDispatch();
    const openDeleteModal = (comment) => {
        setSelectedComment(comment);
        setConfirmDeleteModalOpen(true);
    };

    const handleCloseDeleteModal = () => {
        setConfirmDeleteModalOpen(false);
        setSelectedComment({});
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
        setLoading(true);
        if (selectedType?._id) {
            setFilteredComments(
                comments?.filter(
                    (comment) => comment?.commenttype === selectedType?._id
                )
            );
        }
        setLoading(false);
    }, [selectedType?._id, comments, addCommentModalOpen]);

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
                    <Tab.List className="flex space-x-5">
                        {commentType.map((category) => (
                            <Tab
                                key={category.id}
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
                                    className="cursor-pointer w-full h-full contain p-2 px-4 "
                                >
                                    {category.name}
                                </div>
                            </Tab>
                        ))}
                    </Tab.List>
                </Tab.Group>
            </div>
            {loading ? (
                <div className="w-full flex pt-20 justify-center">
                    <FaSpinner className="text-3xl animate-spin" />
                </div>
            ) : (
                <div className="p-4 max-h-[280px] overflow-y-auto">
                    <div className="text-sm my-2">
                        {filteredComments?.map((comment) => (
                            <div className="flex justify-between items-center">
                                <div className="flex items-center space-x-3 p-2">
                                    <div className="p-2 bg-lightgray rounded-full">
                                        <FaUser className="text-lg text-dimgray" />
                                    </div>
                                    <span className=" flex flex-col text-sm">
                                        <p className="font-bold">
                                            {comment?.senderId.firstname +
                                                " " +
                                                comment?.senderId.lastname}
                                        </p>
                                        <p>{comment.comment}</p>
                                    </span>{" "}
                                </div>
                                <div
                                    className="flex items-center space-x-1 bg-salmon text-white text-xs p-2 
                                            rounded-full cursor-pointer hover:opacity-90 hover:scale-[1.02]"
                                    onClick={() => {
                                        openDeleteModal(comment);
                                    }}
                                >
                                    <FaTrash />
                                </div>{" "}
                            </div>
                        ))}
                    </div>
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
