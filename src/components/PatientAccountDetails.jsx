import React from "react";
import { FaEye, FaTrash } from "react-icons/fa";
import { HiUserAdd } from "react-icons/hi";
import { Link } from "react-router-dom";

const PatientAccountDetails = ({ id }) => {
    return (
        <div>
            {/* Personal Details */}
            <div className="bg-white _shadow p-4 my-4">
                <h3 className="text-sm opacity-60 my-5">Personal Details</h3>

                <div className="h-[2px] w-full bg-slate-900 my-4 opacity-20" />

                <div className="flex items-center justify-between font-light">
                    <p>{id}</p>
                    <h5 className="opacity-75">Account referrence ID</h5>
                </div>

                <div className="h-[1px] w-full bg-slate-900 my-4 opacity-20" />

                <div className="flex items-center justify-between font-light my-4">
                    <p>John Smith</p>
                    <h5 className="opacity-75">Full name</h5>
                </div>
                <div className="h-[1px] w-full bg-slate-900 my-4 opacity-20" />
                <div className="flex items-center justify-between font-light  my-4">
                    <p>07-08-1990</p>
                    <h5 className="opacity-75">Date of Birth</h5>
                </div>
                <div className="h-[1px] w-full bg-slate-900 my-4 opacity-20" />
                <div className="flex items-center justify-between font-light  my-4">
                    <p>Male</p>
                    <h5 className="opacity-75">Gender</h5>
                </div>
                <div className="h-[1px] w-full bg-slate-900 my-4 opacity-20" />
                <div className="flex items-center justify-between font-light  my-4">
                    <p>123 Maddox Street, W1S</p>
                    <h5 className="opacity-75">Address</h5>
                </div>
                <div className="h-[1px] w-full bg-slate-900 my-4 opacity-20" />
                <div className="flex items-center justify-between font-light  my-4">
                    <p>(+455) 785893935</p>
                    <h5 className="opacity-75">Contact number</h5>
                </div>
            </div>

            {/* Assigned doctors */}
            <div className="bg-white _shadow p-4 my-4">
                <div className="flex justify-between items-center">
                    <h3 className="text-sm opacity-60 my-5">
                        Assigned Doctors
                    </h3>
                    <div
						className="flex items-center space-x-2 py-2 px-6 rounded-md text-white bg-seagreen 
						 text-sm hover:opacity-75 cursor-pointer"
                    >
                        <HiUserAdd />
                        <span>Assign Doctor</span>
                    </div>
                </div>

                <div className="h-[2px] w-full bg-slate-900 my-4 opacity-20" />

                <div className="flex items-center justify-between font-light">
                    <div className="flex items-center">
                        <div className="h-16 w-16 rounded-full bg-lightgray"></div>
                        <div className="mx-4">
                            <h3 className="font-bold opacity-80">John Doe</h3>
                            <p className="text-sm opacity-80">Dentist</p>
                        </div>
                        <h5 className="opacity-75">(+_646) 76474788446</h5>
                    </div>
                    <div className="flex space-x-2">
                        <Link to={`/doctors/${"ety53e4v4654ve"}`} className="bg-flowerblue p-2 rounded-full cursor-pointer hover:opacity-75">
                            <FaEye className="text-indigo-600 text-sm" />
						</Link>
						<div className="bg-salmon p-2 rounded-full cursor-pointer hover:opacity-75">
                            <FaTrash className="text-red-600 text-sm" />
                        </div>
                    </div>
                </div>

                <div className="h-[1px] w-full bg-slate-900 my-4 opacity-20" />

                <div className="flex items-center justify-between font-light">
                    <div className="flex items-center">
                        <div className="h-16 w-16 rounded-full bg-lightgray"></div>
                        <div className="mx-4">
                            <h3 className="font-bold opacity-80">John Doe</h3>
                            <p className="text-sm opacity-80">Dentist</p>
                        </div>
                        <h5 className="opacity-75">(+_646) 76474788446</h5>
                    </div>
                    <div className="flex space-x-2">
                        <Link to={`/doctors/${"ety53e4v4654ve"}`} className="bg-flowerblue p-2 rounded-full cursor-pointer hover:opacity-75">
                            <FaEye className="text-indigo-600 text-sm" />
						</Link>
						<div className="bg-salmon p-2 rounded-full cursor-pointer hover:opacity-75">
                            <FaTrash className="text-red-600 text-sm" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PatientAccountDetails;
