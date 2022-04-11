import React, { useState } from "react";
import { FaEye, FaTrash, FaUserEdit } from "react-icons/fa";
import { HiPlusCircle } from "react-icons/hi";
import DashboardWrapper from "../components/DashboardWrapper";
import Header from "../components/Header";
import AddSecretaryModal from "../components/modals/AddSecretaryModal";
import ConfirmDeleteModal from "../components/modals/ConfirmDeleteModal";
import EditSecretaryModal from "../components/modals/EditSecretaryModal";
import SearchInput from "../components/SearchInput";

const Secretaries = () => {
    const [addModalOpen, setAddModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [confirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState(true);

    const openEditModal = (id) => {
        setEditModalOpen(true);
    };

    const openDeleteModal = (id) => {
        setConfirmDeleteModalOpen(true);
    };

    const handleDeleteSecretary = () => {
        console.log("Deleting");
        setConfirmDeleteModalOpen(false);
    };

    return (
        <DashboardWrapper>
            <Header title="Secretaries" />
            <div className="p-4 ">
                <div className="flex justify-between items-center">
                    <SearchInput />
                    <div
                        onClick={() => setAddModalOpen(true)}
                        className="flex cursor-pointer items-center space-x-2 bg-seagreen py-2 px-6 rounded-md text-white  text-sm hover:opacity-75"
                    >
                        <HiPlusCircle />
                        <span>New Secretary</span>
                    </div>
                </div>

                <div className="mt-5">
                    <div className="relative shadow-md rounded-md bg-white">
                        <table className="w-full text-sm text-left mb-10 overflow-x-auto">
                            <thead className="text-md bg-dimgray text-white">
                                <tr>
                                    <th className="px-6 py-4">#</th>
                                    <th className="px-6 py-4">Full Name</th>
                                    <th className="px-6 py-4">Gender</th>
                                    <th className="px-6 py-4">DOB</th>
                                    <th className="px-6 py-4">Address</th>
                                    <th className="px-6 py-4">Phone Number</th>
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
                                        <td className="px-6 py-4">
                                            Alfred Sliver
                                        </td>
                                        <td className="px-6 py-4">Male</td>
                                        <td className="px-6 py-4">
                                            27<sup>th</sup> June 2000
                                        </td>
                                        <td className="px-6 py-4">
                                            1451 - ABC Street, NY
                                        </td>
                                        <td className="px-6 py-4">
                                            +6575 563535353
                                        </td>
                                        <td className="px-6  py-4 text-right flex justify-end items-center space-x-1">
                                            <div
                                                className=" flex items-center space-x-1 bg-seagreen text-white text-xs p-2 
                                                rounded-full hover:opacity-90 hover:scale-[1.02] cursor-pointer"
                                            >
                                                <FaEye />
                                            </div>

                                            <div
                                                className="flex items-center space-x-1 bg-dimgray text-white text-xs p-2 
                                                rounded-full hover:opacity-90 hover:scale-[1.02] cursor-pointer"
                                                onClick={() =>
                                                    openEditModal(idx)
                                                }
                                            >
                                                <FaUserEdit />
                                            </div>

                                            <div
                                                className="flex items-center space-x-1 bg-salmon text-white text-xs p-2 
                                            rounded-full cursor-pointer hover:opacity-90 hover:scale-[1.02]"
                                                onClick={() =>
                                                    openDeleteModal(idx)
                                                }
                                            >
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

                <AddSecretaryModal
                    isOpen={addModalOpen}
                    closeModal={() => {
                        setAddModalOpen(false);
                    }}
                />

                <EditSecretaryModal
                    isOpen={editModalOpen}
                    closeModal={() => {
                        setEditModalOpen(false);
                    }}
                />

                <ConfirmDeleteModal
                    isOpen={confirmDeleteModalOpen}
                    closeModal={() => {
                        setConfirmDeleteModalOpen(false);
                    }}
                    message="Deleting the secretary will erase everything about their
                        records. Are you sure you want to delete?"
                    actionMethod={handleDeleteSecretary}
                />
            </div>
        </DashboardWrapper>
    );
};

export default Secretaries;
