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

            <div className="flex flex-col divide-y-[1px]">
                {[1, 2, 3, 4, 5].map((_, idx) => (
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
                            <span className="text-sm">Daniellle Kerubo</span>
                        </div>
                        <span className="bg-flowerblue rounded py-1 text-xs text-white px-2">
                            Eye doctor
                        </span>
                    </div>
                ))}
                <div className="py-5 flex justify-between w-full">
                    <button
                        className="flex items-center space-x-2 py-1 text-xs px-6 rounded-md text-white bg-seagreen 
						  hover:opacity-75 cursor-pointer"
                    >
                        View All
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PatientAssignedDoctors;
