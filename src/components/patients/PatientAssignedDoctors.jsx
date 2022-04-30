import React, { useState } from "react";
import { HiUserAdd } from "react-icons/hi";
import { useSelector } from "react-redux";
import AssignDoctorModal from "../modals/AssignDoctorModal";

const PatientAssignedDoctors = () => {
    const { patient } = useSelector((state) => state.patientsState);
    const { departments } = useSelector((state) => state.departmentsState);

    const [assignDoctorModalOpen, setAssignDoctorModalOpen] = useState(false);

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
                                    src="https://randomuser.me/api/portraits/women/85.jpg"
                                    className="w-8 h-8 rounded-full"
                                    alt=""
                                />
                                <span className="text-sm">
                                    {doc?.firstname} {doc?.lastname}
                                </span>
                            </div>
                            <div className="flex space-x-1">
                                <span className="bg-flowerblue bg-opacity-40 rounded py-1 text-xs text-flowerblue px-6">
                                    {departments?.find(
                                        (dep) => dep?._id === doc?.department
                                    )?.name || "-"}
                                </span>
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
        </div>
    );
};

export default PatientAssignedDoctors;
