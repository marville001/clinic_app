import React, { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import Modal from "../common/Modal";
import Select from "react-select";
import { useSelector } from "react-redux";

const AssignDoctorModal = ({
    isOpen = false,
    closeModal = () => {},
    loading,
}) => {
    const { doctors, loading: loading_dct } = useSelector(
        (state) => state.doctorsState
    );

    const [selectedDoctors, setSelectedDoctors] = useState([]);

    return (
        <Modal
            title={"New Board"}
            size="xl"
            isOpen={isOpen}
            closeModal={closeModal}
        >
            <div className="bg-white p-5 _shadow rounded-md mb-20">
                <h4 className="text-center text-2xl text-slate-900 mb-6">
                    Assign Doctor
                </h4>

                <div className="my-5">
                    <p>Select Doctor(s)</p>
                </div>

                <div className="w-full my-6 mb-16">
                    <Select
                        isDisabled={loading_dct}
                        placeholder="Search Doctor"
                        isMulti
                        value={selectedDoctors}
                        onChange={(value) => setSelectedDoctors(value)}
                        options={doctors?.map((doc) => {
                            return {
                                value: doc._id,
                                label: `${doc.firstname} ${doc.lastname}`,
                            };
                        })}
                    />
                </div>

                <div className="flex justify-between items-center mt-8">
                    <button
                        onClick={closeModal}
                        className="bg-salmon rind-0 border-0 outline-none text-white py-2 px-5 rounded-md"
                    >
                        No
                    </button>
                    <button
                        className="disabled:opacity-50 disabled:cursor-not-allowed uppercase px-16
						 tracking-wider py-2 text-white text-lg rounded-md flex items-center
						 bg-seagreen
                     "
                    >
                        {loading ? (
                            <FaSpinner className="animate-spin mr-4" />
                        ) : (
                            "Assign"
                        )}
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default AssignDoctorModal;
