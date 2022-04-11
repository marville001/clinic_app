import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaSpinner } from "react-icons/fa";
import { gender } from "../../constants";
import InputField from "../common/InputField";
import Modal from "../common/Modal";
import TextareaField from "../common/TextareaField";

const AddDepartmentModal = ({ isOpen, closeModal = () => {} }) => {
    const [state, setState] = useState({ error: "", loading: false });

    const {
        register,
        handleSubmit,
        formState: { errors },
        clearErrors,
        reset,
    } = useForm();

    const handleCloseModal = () => {
        closeModal();
        clearErrors();
        reset();
    };

    const handleAddSecretary = async () => {
        setState({ ...state, loading: false });
    };

    return (
        <Modal
            title={"New Board"}
            size="xl"
            isOpen={isOpen}
            closeModal={handleCloseModal}
        >
            <form
                onSubmit={handleSubmit(handleAddSecretary)}
                className="bg-white p-5 _shadow rounded-md"
            >
                <h4 className="text-center text-2xl text-slate-900 uppercase mb-6">
                    Add Department
                </h4>
                {state.error && (
                    <div className="text-center bg-red-200 rounded-md text-red-500 my-4 text-sm p-1">
                        {state.error}
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
                        disabled={state.loading}
                        type="submit"
                        className="disabled:opacity-50 disabled:cursor-not-allowed uppercase px-16
						 tracking-wider py-2 text-white text-lg rounded-md flex items-center
						 bg-seagreen
                     "
                    >
                        {state.loading ? (
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