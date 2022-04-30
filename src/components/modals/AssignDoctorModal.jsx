import React, { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import Modal from "../common/Modal";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { assignPatientDoctorAction } from "../../redux/actions/patients.action";
import { toast } from "react-toastify";

const AssignDoctorModal = ({
    isOpen = false,
    closeModal = () => {}
}) => {
    const { doctors, loading: loading_dct } = useSelector(
        (state) => state.doctorsState
    );
    const { assigning, patient } = useSelector((state) => state.patientsState);

    const [selectedDoctor, setSelectedDoctor] = useState({});
    const [docOptions, setDocOptions] = useState([]);
    const [error, setError] = useState("");


    const dispatch  = useDispatch()

    const handleCloseModal = async () => {
        closeModal();
        setError("");
        setSelectedDoctor({});
    };

    const handleSubmit = async () => {
        setError("");

        const res = await dispatch(assignPatientDoctorAction(patient?._id, selectedDoctor.value));

        if (!res.success) {
            setError(res.message);
            return;
        }
        toast.success(`Doctor Assigned Successfully`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
        
        handleCloseModal();
    };

    useEffect(() => {
        if (patient?._id && doctors?.length > 0) {
            const dids = patient?.doctors?.map((doc) => doc._id);

            let _doctors = doctors
                ?.filter((doc) => !dids.includes(doc._id))
                ?.map((doc) => {
                    return {
                        value: doc._id,
                        label: `${doc.firstname} ${doc.lastname} - ${doc.email}`,
                    };
                });

            setDocOptions(_doctors);
        }
    }, [patient, doctors]);

    return (
        <Modal size="xl" isOpen={isOpen} closeModal={handleCloseModal}>
            <div className="bg-white p-5 _shadow rounded-md mb-20">
                <h4 className="text-center text-2xl text-slate-900 mb-6">
                    Assign Doctor
                </h4>

                <div className="my-5">
                    <p>Select Doctor(s)</p>
                </div>

                {error && (
                    <div className="text-center bg-red-200 rounded-md text-red-500 my-4 text-sm p-1">
                        {error}
                    </div>
                )}

                <div className="w-full my-6 mb-16">
                    <Select
                        isDisabled={loading_dct}
                        placeholder="Search Doctor"
                        value={selectedDoctor}
                        onChange={(value) => setSelectedDoctor(value)}
                        options={docOptions}
                    />
                </div>

                <div className="flex justify-between items-center mt-8">
                    <button
                        onClick={handleCloseModal}
                        type="button"
                        className="bg-salmon rind-0 border-0 outline-none text-white py-2 px-5 rounded-md"
                    >
                        No
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="disabled:opacity-50 disabled:cursor-not-allowed uppercase px-16
						 tracking-wider py-2 text-white text-lg rounded-md flex items-center
						 bg-seagreen
                     "
                    >
                        {assigning ? (
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
