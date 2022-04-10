import React from "react";
import { FaDownload, FaFileCsv, FaFileUpload } from "react-icons/fa";

const PatientAttachedFiles = () => {
    return (
        <div className="p-4 flex-[1] rounded bg-white _shadow">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-md font-bold">Files</h3>
                <div
                    className="flex items-center space-x-2 py-2 text-xs px-6 rounded-md text-white bg-seagreen 
						  hover:opacity-75 cursor-pointer"
                >
                    <FaFileUpload />
                    <span>Add File</span>
                </div>
            </div>

            <div className="flex flex-col divide-y-[1px]">
                {[1, 2, 3, 4].map((_, idx) => (
                    <div key={idx} className="flex items-center py-3">
                        <div className="flex bg-flowerblue bg-opacity-50 p-3 rounded-full">
                            <FaFileCsv className="text-flowerblue text-xl" />
                        </div>
                        <div className="flex flex-col ml-4 space-y-1">
                            <span className="text-slate-900">
                                Medical Examination
                            </span>
                            <span className="text-xs">Size: 3.54 MB</span>
                        </div>
                        <div className="ml-auto mr-5 p-2 rounded-md hover:bg-lightgray cursor-pointer">
                            <FaDownload className="text-xl opacity-80" />
                        </div>
                    </div>
                ))}
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
    );
};

export default PatientAttachedFiles;
