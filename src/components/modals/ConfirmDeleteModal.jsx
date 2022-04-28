import React from "react";
import { FaSpinner } from "react-icons/fa";
import Modal from "../common/Modal";

const ConfirmDeleteModal = ({
    isOpen,
    actionMethod = () => {},
    message = "",
    closeModal = () => {},
    loading,
}) => {
    return (
        <Modal
            size="xl"
            isOpen={isOpen}
            closeModal={() => {}}
        >
            <div className="bg-white p-5 _shadow rounded-md">
                <h4 className="text-center text-2xl text-slate-900 mb-6">
                    Please Confirm Delete
                </h4>

                <div className="my-5">
                    <p>{message}</p>
                </div>

                <div className="flex justify-between items-center mt-8">
                    <button
                        onClick={closeModal}
                        className="bg-salmon rind-0 border-0 outline-none text-white py-2 px-5 rounded-md"
                    >
                        No
                    </button>
                    <button
                        onClick={actionMethod}
                        className="disabled:opacity-50 disabled:cursor-not-allowed uppercase px-16
						 tracking-wider py-2 text-white text-lg rounded-md flex items-center
						 bg-seagreen
                     "
                    >
                        {loading ? (
                            <FaSpinner className="animate-spin mr-4" />
                        ) : (
                            "Yes"
                        )}
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default ConfirmDeleteModal;
