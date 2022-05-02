import React from "react";
import { FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";

const AssignedPatients = () => {
    const { doctor } = useSelector((state) => state.doctorsState);
    const { departments } = useSelector((state) => state.departmentsState);

    return (
        <div className="p-4 flex-[1] rounded bg-white _shadow">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-md font-bold">Assigned Patients</h3>
            </div>

            <div className="max-h-[280px] overflow-y-auto">
                <div className="flex flex-col divide-y-[1px]">
                    {doctor?.patients.map((pat, idx) => (
                        <div
                            key={idx}
                            className="flex justify-between items-center py-2"
                        >
                            <div className="flex items-center space-x-3">
                                <div className="p-2 bg-lightgray rounded-full">
                                    <FaUser className="text-lg text-dimgray" />
                                </div>
                                <span className="text-sm">
                                    {pat?.firstname} {pat?.lastname}
                                </span>
                            </div>
                            <div className="flex space-x-4">
                                <span className="bg-flowerblue bg-opacity-40 rounded py-1 text-xs text-flowerblue px-6">
                                    {departments?.find(
                                        (dep) => dep?._id === pat?.department
                                    )?.name || "-"}
                                </span>
                            </div>
                        </div>
                    ))}
                    {doctor?.patients?.length <= 0 && (
                        <div className="flex justify-center py-5">
                            <h4 className="text-xl  font-bold opacity-40">
                                No Assigned Patient
                            </h4>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AssignedPatients;
