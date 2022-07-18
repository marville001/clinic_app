import React, { useState } from "react";
import { FaDownload, FaFileCsv, FaFileUpload, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { STATIC_FILE_BASE } from "../../constants";
import { deletePatientFileAction } from "../../redux/actions/patients.action";
import AddPatientFileModal from "../modals/AddPatientFileModal";
import ConfirmDeleteModal from "../modals/ConfirmDeleteModal";

const PatientAttachedFiles = ({ assigned }) => {
    const { patient, deletingPatientFile } = useSelector((state) => state.patientsState);

    const [addFileModalOpen, setAddFileModalOpen] = useState(false);

    const [selectedDeleteFile, setSelectedDeleteFile] = useState({});
    const [confirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState(false);

    const dispatch = useDispatch();
    const {id} = useParams()

    const openDeleteModal = (file) => {
        setSelectedDeleteFile(file);
        setConfirmDeleteModalOpen(true);
    };

     const handleCloseDeleteModal = () => {
        setConfirmDeleteModalOpen(false);
        setSelectedDeleteFile({});
    };

     const handleDeleteContact = async () => {
        const res = await dispatch(
            deletePatientFileAction(id, selectedDeleteFile?._id)
        );

        handleCloseDeleteModal();
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
        toast.success(`Patient File deleted Successfully`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    };

    return (
        <div className="p-4 flex-[1] rounded bg-white _shadow">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-md font-bold">Attached Files</h3>
                {!assigned && (
                    <div
                        onClick={() => {
                            setAddFileModalOpen(true);
                        }}
                        className="flex items-center space-x-2 py-2 text-xs px-6 rounded-md text-white bg-seagreen 
						  hover:opacity-75 cursor-pointer"
                    >
                        <FaFileUpload />
                        <span>Add File</span>
                    </div>
                )}
            </div>

            <div className="p-4 max-h-[280px] overflow-y-auto">
                <div className="flex flex-col divide-y-[1px]">
                    {patient?.files?.map((file, idx) => (
                        <div key={idx} className="flex items-center py-3">
                            <div className="flex bg-flowerblue bg-opacity-50 p-3 rounded-full">
                                <FaFileCsv className="text-flowerblue text-xl" />
                            </div>
                            <div className="flex flex-col ml-4 space-y-1">
                                <span className="text-slate-900">
                                    {file.name}
                                </span>
                                <span className="text-xs">
                                    Size:{" "}
                                    {file.size / (1024 * 1024) > 0
                                        ? (file.size / 1024).toFixed(2) + "KB"
                                        : (file.size / (1024 * 1024)).toFixed(
                                              2
                                          ) + "MB"}
                                </span>
                            </div>
                            <a
                                href={`${STATIC_FILE_BASE}${file.url}`}
                                download
                                className="ml-auto mr-5 p-2 rounded-md hover:bg-lightgray cursor-pointer"
                            >
                                <FaDownload className="text-xl opacity-80" />
                            </a>
                            <div
                                className="flex items-center space-x-1 bg-salmon text-white text-xs p-2 w-fit
                                            rounded-full cursor-pointer hover:opacity-90 hover:scale-[1.02]"
                                onClick={() => {
                                    openDeleteModal(file);
                                }}
                            >
                                <FaTrash />
                            </div>
                        </div>
                    ))}

                    {patient?.files?.length <= 0 && (
                        <div className="flex justify-center py-5">
                            <h4 className="text-xl  font-bold opacity-40">
                                No File
                            </h4>
                        </div>
                    )}
                    {/* <div className="pt-5 flex justify-between w-full">
                    <button
                        className="flex items-center space-x-2 py-1 text-xs px-6 rounded-md text-white bg-seagreen 
						  hover:opacity-75 cursor-pointer"
                    >
                        View All
                    </button>
                </div> */}
                </div>
            </div>

            <ConfirmDeleteModal
                isOpen={confirmDeleteModalOpen}
                closeModal={handleCloseDeleteModal}
                message="Please confirm you want to remove the file for this patient?"
                actionMethod={handleDeleteContact}
                loading={deletingPatientFile}
            />

            <AddPatientFileModal
                isOpen={addFileModalOpen}
                closeModal={() => {
                    setAddFileModalOpen(false);
                }}
            />
        </div>
    );
};

export default PatientAttachedFiles;
