import React, { useState } from "react";
import { FaTrash, FaUser } from "react-icons/fa";
import { HiUserAdd } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { STATIC_FILE_BASE } from "../../constants";
import { unAssignPatientDoctorAction } from "../../redux/actions/patients.action";
import AssignDoctorModal from "../modals/AssignDoctorModal";
import ConfirmDeleteModal from "../modals/ConfirmDeleteModal";

const PatientAssignedDoctors = () => {
    const { patient, unassigning } = useSelector(
        (state) => state.patientsState
    );
    const { departments } = useSelector((state) => state.departmentsState);

    const [assignDoctorModalOpen, setAssignDoctorModalOpen] = useState(false);
    const [confirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState({});

    const openDeleteModal = (doc) => {
        setSelectedDoctor(doc);
        setConfirmDeleteModalOpen(true);
    };

    const dispatch = useDispatch();

    const handleCloseDeleteModal = () => {
        setConfirmDeleteModalOpen(false);
        setSelectedDoctor({});
    };

    const handleReassignDoc = async () => {
        const res = await dispatch(
            unAssignPatientDoctorAction(patient?._id, selectedDoctor._id)
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
        toast.success(`Doctor UnAssigned Successfully`, {
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
                <h3 className="text-md font-bold">Assigned Doctors</h3>
                <div
                    onClick={() => setAssignDoctorModalOpen(true)}
                    className="flex items-center space-x-2 py-1 text-xs px-6 rounded-md text-white bg-seagreen 
						  hover:opacity-75 cursor-pointer"
                >
                    <HiUserAdd />
                    <span>Assign Doctor</span>
                </div>
            </div>

            <div className="max-h-[280px] overflow-y-auto">
                <div className="flex flex-col divide-y-[1px]">
                    {patient?.doctors?.map((doc, idx) => (
                        <div
                            key={idx}
                            className="flex justify-between items-center py-2"
                        >
                            <div className="flex items-center space-x-3">
                                <img
                                    src={
                                        doc?.avatar?.startsWith("http")
                                            ? doc?.avatar
                                            : `${STATIC_FILE_BASE}${doc?.avatar}`
                                    }
                                    alt=""
                                    className="h-8 w-8 rounded-full object-cover"
                                />
                                <span className="text-sm">
                                    {doc?.firstname} {doc?.lastname}
                                </span>
                            </div>
                            <div className="flex space-x-4">
                                <span className="bg-flowerblue bg-opacity-40 rounded py-1 text-xs text-flowerblue px-6">
                                    {departments?.find(
                                        (dep) => dep?._id === doc?.department
                                    )?.name || "-"}
                                </span>

                                <div
                                    className="flex items-center space-x-1 bg-salmon text-white text-xs p-2 
                                            rounded-full cursor-pointer hover:opacity-90 hover:scale-[1.02]"
                                    onClick={() => {
                                        openDeleteModal(doc);
                                    }}
                                >
                                    <FaTrash />
                                </div>
                            </div>
                        </div>
                    ))}
                    {patient?.doctors?.length <= 0 && (
                        <div className="flex justify-center py-5">
                            <h4 className="text-xl  font-bold opacity-40">
                                No Assigned Doctor
                            </h4>
                        </div>
                    )}
                </div>
            </div>

            <AssignDoctorModal
                isOpen={assignDoctorModalOpen}
                closeModal={() => {
                    setAssignDoctorModalOpen(false);
                }}
            />

            <ConfirmDeleteModal
                isOpen={confirmDeleteModalOpen}
                closeModal={handleCloseDeleteModal}
                message="Please confirm you want to remove the doctor from assigned list for this patient?"
                actionMethod={handleReassignDoc}
                loading={unassigning}
            />
        </div>
    );
};

export default PatientAssignedDoctors;
