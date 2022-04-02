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

                <div className="mt-5 ">
                    <div className="relative overflow-x-auto shadow-md rounded-md bg-white">
                        <table className="w-full text-sm text-left mb-4">
                            <thead className="text-xs bg-dimgray text-white">
                                <tr>
                                    <th className="px-6 py-3">First Name</th>
                                    <th className="px-6 py-3">Last Name</th>
                                    <th className="px-6 py-3">Username</th>
                                    <th className="px-6 py-3">Email</th>
                                    <th className="px-6 py-3">
                                        <span className="sr-only">Action</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {[1, 2, 3, 4, 5, 6].map((doctor) => (
                                    <tr
                                        key={doctor}
                                        className="group border-b "
                                    >
                                        <th className="px-6 py-2">Alfred</th>
                                        <td className="px-6 py-2">Sliver</td>
                                        <td className="px-6 py-2">alfred001</td>
                                        <td className="px-6 py-2">
                                            alfred.silver@clin.com
                                        </td>
                                        <td className="px-6  py-2 text-right flex justify-end items-center space-x-1">
                                            <Link
                                                className="
                                                flex items-center space-x-1 bg-seagreen text-white 
                                                text-xs p-2 rounded-full hover:opacity-90 
                                                hover:scale-[1.02] "
                                                to="/doctors/hgdghdghd"
                                            >
                                                <FaEye />
                                            </Link>

                                            <Link
                                                className="flex items-center space-x-1 bg-dimgray text-white text-xs p-2 
                                                rounded-full hover:opacity-90 hover:scale-[1.02]"
                                                to="/doctors/hgdghdghd/edit"
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
