import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaSpinner } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import InputField from "../common/InputField";
import Modal from "../common/Modal";
import SelectField from "../common/SelectField";
import { toast } from "react-toastify";
import {
    createCommentAction,
    getCommentsAction,
} from "../../redux/actions/patients.action";
import { useParams } from "react-router-dom";

const AddPatientCommentModal = ({
    isOpen = false,
    closeModal = () => {},
    loading,
}) => {
    const { authDetails } = useSelector((state) => state.authState);
    const { commentType, creatingComment } = useSelector(
        (state) => state.patientsState
    );

    const [error, setError] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        clearErrors,
    } = useForm();

    const dispatch = useDispatch();

    const handleCloseModal = () => {
        reset();
        clearErrors();
        closeModal();
        setError("");
    };

    const { id } = useParams();

    const handleAddComment = async (data) => {
        setError("");

        const { type, comment, ...rest } = data;
        const res = await dispatch(
            createCommentAction(
                {
                    ...rest,
                    comment,
                    commenttype: type,
                    senderRole: authDetails.role,
                    senderId: authDetails._id,
                    isReply: false,
                },
                id
            )
        );

        if (!res.success) {
            setError(res.message);
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
        handleCloseModal();
        authDetails?._id && dispatch(getCommentsAction(id));
    };

    return (
        <Modal size="xl" isOpen={isOpen} closeModal={handleCloseModal}>
            <form
                onSubmit={handleSubmit(handleAddComment)}
                className="bg-white p-5 _shadow rounded-md"
            >
                <h4 className="text-center text-2xl text-slate-900 mb-6">
                    Add Comment
                </h4>

                {error && (
                    <div className="text-center bg-red-200 rounded-md text-red-500 my-4 text-sm p-1">
                        {error}
                    </div>
                )}

                <div className="flex  flex-col gap-5 mt-4">
                    <SelectField
                        errors={errors}
                        name="type"
                        label="Comment Type"
                        register={register}
                        required={true}
                        options={commentType.map((type) => {
                            return {
                                value: type._id,
                                label: type.name,
                            };
                        })}
                    />
                    <InputField
                        errors={errors}
                        name="comment"
                        label="Comment"
                        register={register}
                        required={true}
                        type="text"
                    />
                </div>

                <div className="flex justify-between items-center mt-8">
                    <button
                        type="button"
                        onClick={handleCloseModal}
                        className="bg-salmon rind-0 border-0 outline-none text-white py-2 px-5 rounded-md"
                    >
                        No
                    </button>
                    <button
                        disabled={creatingComment}
                        className="disabled:opacity-50 disabled:cursor-not-allowed uppercase px-16
						 tracking-wider py-2 text-white text-lg rounded-md flex items-center
						 bg-seagreen
                     "
                    >
                        {creatingComment ? (
                            <FaSpinner className="animate-spin mr-4" />
                        ) : (
                            "Add Comment"
                        )}
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default AddPatientCommentModal;
