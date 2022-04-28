import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaSpinner } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addPatientFileAction } from "../../redux/actions/patients.action";
import InputField from "../common/InputField";
import Modal from "../common/Modal";
import TextareaField from "../common/TextareaField";
import { useParams } from "react-router-dom";

import { toast } from "react-toastify";

const AddPatientFileModal = ({
    isOpen = false,
    closeModal = () => {},
    loading,
}) => {
    const { creatingFile } = useSelector((state) => state.patientsState);
    const [error, setError] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        clearErrors,
    } = useForm();

    const [selectedFile, setSelectedFile] = useState("");
    const [file_error, setFileError] = useState(false);


    const dispatch = useDispatch()

    const handleCloseModal = () => {
        reset();
        clearErrors();
        setFileError(false);
        setSelectedFile("")
        closeModal();
    };

    const {id} = useParams()

    const handleAddFile = async (data) => {
        setFileError(false);
        if (!selectedFile) {
            setFileError(true);
            return;
        }
        setError("");
        const formData = new FormData();

        const { name, description } = data;

        formData.append("name", name)
        formData.append("description", description)
        formData.append("file", selectedFile)

        const res = await dispatch(addPatientFileAction(formData, id));

        if (!res.success) {
            setError(res.message);
            return;
        }
        
        toast.success(`File Added Successfully`, {
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
            size="xl"
            isOpen={isOpen}
            closeModal={handleCloseModal}
        >
            <form
                onSubmit={handleSubmit(handleAddFile)}
                className="bg-white p-5 _shadow rounded-md"
            >
                <h4 className="text-center text-2xl text-slate-900 mb-6">
                    Add Patient File
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
                    />
                </div>

                <div className="flex flex-col mt-6">
                    <label
                        htmlFor="file"
                        className={`text-md mb-1 ${
                            file_error
                                ? "bg-salmon bg-opacity-40 border border-salmon"
                                : "bg-steelblue"
                        } w-40 py-2 cursor-pointer text-white text-center rounded-md`}
                    >
                        Select File
                    </label>
                    <input
                        type="file"
                        onChange={(e) => {
                            if (e.target.files.length) {
                                setFileError(false);
                                setSelectedFile(e.target.files[0]);
                            }
                        }}
                        className="hidden"
                        id="file"
                    />
                </div>
                {selectedFile && (
                    <div className="flex justify-between mt-4">
                        <h3>{selectedFile?.name}</h3>
                        <button
                            onClick={() => {
                                setSelectedFile("");
                                setFileError(true);
                            }}
                            className="text-salmon text-sm"
                        >
                            Remove
                        </button>
                    </div>
                )}

                <div className="flex justify-between items-center mt-8">
                    <button
                        type="button"
                        onClick={handleCloseModal}
                        className="bg-salmon rind-0 border-0 outline-none text-white py-2 px-5 rounded-md"
                    >
                        No
                    </button>
                    <button
                        disabled={creatingFile}
                        className="disabled:opacity-50 disabled:cursor-not-allowed uppercase px-16
						 tracking-wider py-2 text-white text-lg rounded-md flex items-center
						 bg-seagreen
                     "
                    >
                        {creatingFile ? (
                            <FaSpinner className="animate-spin mr-4" />
                        ) : (
                            "Add File"
                        )}
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default AddPatientFileModal;
