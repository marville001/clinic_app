import React from "react";
import { HiUserAdd } from "react-icons/hi";
import { Link } from "react-router-dom";

const PatientFiles = ({ id }) => {
    return (
        <div>
            {/* Assigned doctors */}
            <div className="bg-white _shadow p-4 my-4">
                <div className="flex justify-between items-center">
                    <h3 className="text-sm opacity-60 my-5">Patient Files</h3>
                    <Link
                        to={`/patients/${id}/edit`}
                        className="flex items-center space-x-2 py-2 px-6 rounded-md text-white bg-seagreen  text-sm hover:opacity-75"
                    >
                        <HiUserAdd />
                        <span>Add File</span>
                    </Link>
                </div>

                <div className="h-[2px] w-full bg-slate-900 my-4 opacity-20" />

            </div>
        </div>
    );
};

export default PatientFiles;
