import React from "react";
import { Link } from "react-router-dom";
import DashboardWrapper from "../components/DashboardWrapper";
import Header from "../components/Header";
import SearchInput from "../components/SearchInput";
import { FaEye, FaTrash, FaEdit } from "react-icons/fa";
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
                    <div className="relative overflow-x-auto shadow-md rounded-md">
                        <table className="w-full text-sm text-left mb-10">
                            <thead className="text-xs bg-dimgray text-white">
                                <tr>
                                    <th className="px-6 py-3">First Name</th>
                                    <th className="px-6 py-3">Last Name</th>
                                    <th className="px-6 py-3">Username</th>
                                    <th className="px-6 py-3">Email</th>
                                    <th className="px-6 py-3">
                                        <span className="sr-only">Edit</span>
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
                                                className="flex items-center space-x-1 bg-seagreen text-white text-xs py-1 px-2 rounded-lg hover:opacity-90 hover:scale-[1.02]"
                                                to="/doctors/hgdghdghd"
                                            >
                                                <FaEye />
                                                <span>View</span>
                                            </Link>

                                            <Link
                                                className="flex items-center space-x-1 bg-dimgray text-white text-xs py-1 px-2 rounded-lg hover:opacity-90 hover:scale-[1.02]"
                                                to="/doctors/hgdghdghd/edit"
                                            >
                                                <FaEdit />
                                                <span>Edit</span>
                                            </Link>

                                            <div className="flex items-center space-x-1 bg-salmon text-white text-xs py-1 px-2 rounded-lg cursor-pointer hover:opacity-90 hover:scale-[1.02]">
                                                <FaTrash />
                                                <span>Delete</span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </DashboardWrapper>
    );
};

export default Doctors;
