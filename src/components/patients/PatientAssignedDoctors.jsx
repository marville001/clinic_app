import React from "react";
import { HiUserAdd } from "react-icons/hi";

const PatientAssignedDoctors = () => {
    return (
        <div className="p-4 flex-[1] rounded bg-white _shadow">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-md font-bold">Assigned Doctors</h3>
                <div
                    className="flex items-center space-x-2 py-1 text-xs px-6 rounded-md text-white bg-seagreen 
						  hover:opacity-75 cursor-pointer"
                >
                    <HiUserAdd />
                    <span>Assign Doctor</span>
                </div>
            </div>
        </div>
    );
};

export default PatientAssignedDoctors;
