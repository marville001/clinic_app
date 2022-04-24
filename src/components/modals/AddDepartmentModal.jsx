import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaSpinner } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { createDepartmentAction } from "../../redux/actions/departments.action";
import InputField from "../common/InputField";
import Modal from "../common/Modal";
import TextareaField from "../common/TextareaField";

import { toast } from "react-toastify";

const AddDepartmentModal = ({ isOpen, closeModal = () => { } }) => {
    const {creating} = useSelector(state=>state.departmentsState)
    const [error, setError] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors },
        clearErrors,
        reset,
    } = useForm();

    const dispatch = useDispatch();

    const handleCloseModal = () => {
        closeModal();
        clearErrors();
        reset();
    };

    const handleAddDepartment = async (data) => {
        setError("")
        const res = await dispatch(createDepartmentAction(data));

        if (!res.success) {
            setError(res.message)
            return;
        }

        toast.success(`Department Added Successfully`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });

        handleCloseModal();
    };

    return (
        <Modal
            title={"New Board"}
            size="xl"
            isOpen={isOpen}
            closeModal={handleCloseModal}
        >
            <form
                onSubmit={handleSubmit(handleAddDepartment)}
                className="bg-white p-5 _shadow rounded-md"
            >
                <h4 className="text-center text-2xl text-slate-900 uppercase mb-6">
                    Add Department
                </h4>
                {error && (
                    <div className="text-center bg-red-200 rounded-md text-red-500 my-4 text-sm p-1">
                        {error}
                    </div>
                )}
                <div className="flex gap-5 mt-4">
                    <InputField
                        errors={errors}
                        name="name"
                        label="Name"
                        register={register}
                        required={true}
                        type="text"
                    />
                </div>
                <div className="flex gap-5 mt-4">
                    <TextareaField
                        errors={errors}
                        name="description"
                        label="Description"
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
                        Cancel
                    </button>
                    <button
                        disabled={creating}
                        type="submit"
                        className="disabled:opacity-50 disabled:cursor-not-allowed uppercase px-16
						 tracking-wider py-2 text-white text-lg rounded-md flex items-center
						 bg-seagreen
                     "
                    >
                        {creating ? (
                            <>
                                <FaSpinner className="animate-spin mr-4" />{" "}
                                <span className="capitalize">Loading...</span>
                            </>
                        ) : (
                            <span>Create</span>
                        )}
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default AddDepartmentModal;
