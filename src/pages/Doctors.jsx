import React from "react";
import { Link } from "react-router-dom";
import DashboardWrapper from "../components/DashboardWrapper";
import Header from "../components/Header";
import SearchInput from "../components/SearchInput";
import { FaEye, FaTrash, FaUserEdit } from "react-icons/fa";
import { HiPlusCircle } from "react-icons/hi";

const Doctors = () => {
    return (
        <DashboardWrapper>
            <Header title="Doctors" />
            <div className="p-4">
                <div className="flex justify-between items-center">
                    <SearchInput />
                    <Link
                        to="/doctors/new"
                        className="flex items-center space-x-2 bg-seagreen py-2 px-6 rounded-md text-white  text-sm hover:opacity-75"
                    >
                        <HiPlusCircle />
                        <span>New Doctor</span>
                    </Link>
                </div>

                <div className="mt-5">
                    <div className="relative overflow-x-auto shadow-md rounded-md bg-white">
                        <table className="w-full text-sm text-left mb-10">
                            <thead className="text-md bg-dimgray text-white">
                                <tr>
                                    <th className="px-6 py-4">#</th>
                                    <th className="px-6 py-4">Full Name</th>
                                    <th className="px-6 py-4">DOB</th>
                                    <th className="px-6 py-4">Age</th>
                                    <th className="px-6 py-4">Gender</th>
                                    <th className="px-6 py-4">Address</th>
                                    <th className="px-6 py-4">Phone Number</th>
                                    <th className="px-6 py-4">Department</th>
                                    <th className="px-6 py-4">
                                        <span className="sr-only">Action</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {[1, 2, 3, 4, 5, 6].map((doctor, idx) => (
                                    <tr
                                        key={doctor}
                                        className="group border-b "
                                    >
                                        <td className="px-6 py-4 font-bold">
                                            {idx + 1}
                                        </td>
                                        <td className="px-6 py-4">Alfred Sliver</td>
                                        <td className="px-6 py-4">Male</td>
                                        <td className="px-6 py-4">
                                            27<sup>th</sup> June 2000
                                        </td>
                                        <td className="px-6 py-4">24</td>
                                        <td className="px-6 py-4">
                                            1451 - ABC Street, NY
                                        </td>
                                        <td className="px-6 py-4">
                                            +6575 563535353
                                        </td>
                                        <td className="px-6 py-4">Dentist</td>
                                        <td className="px-6  py-4 text-right flex justify-end items-center space-x-1">
                                            <Link
                                                className="
                                                flex items-center space-x-1 bg-seagreen text-white 
                                                text-xs p-2 rounded-full hover:opacity-90 
                                                hover:scale-[1.02] "
                                                to="/doctors/23fsr34few433d342"
                                            >
                                                <FaEye />
                                            </Link>

                                            <Link
                                                className="flex items-center space-x-1 bg-dimgray text-white text-xs p-2 
                                                rounded-full hover:opacity-90 hover:scale-[1.02]"
                                                to="/doctors/23fsr34few433d342/edit"
                                            >
                                                <FaUserEdit />
                                            </Link>

                                            <div className="flex items-center space-x-1 bg-salmon text-white text-xs p-2 rounded-full cursor-pointer hover:opacity-90 hover:scale-[1.02]">
                                                <FaTrash />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex my-4 justify-between">
                        <p>Showing 1-10 out of 50 </p>
                        <span>Pagination</span>
                    </div>
                </div>
            </div>
        </DashboardWrapper>
    );
};

export default Doctors;
