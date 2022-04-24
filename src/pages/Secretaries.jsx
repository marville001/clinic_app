import React, { useEffect, useState } from "react";
import { FaEye, FaSpinner, FaTrash, FaUserEdit } from "react-icons/fa";
import { HiPlusCircle } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import DashboardWrapper from "../components/DashboardWrapper";
import Header from "../components/Header";
import AddSecretaryModal from "../components/modals/AddSecretaryModal";
import ConfirmDeleteModal from "../components/modals/ConfirmDeleteModal";
import EditSecretaryModal from "../components/modals/EditSecretaryModal";
import SearchInput from "../components/SearchInput";
import {
    deleteSecretaryAction,
    getSecretariesAction,
} from "../redux/actions/secretaries.action";

import { toast } from "react-toastify";

const Secretaries = () => {
    const { authDetails } = useSelector((state) => state.authState);
    const {
        loading: loading_secs,
        secretaries,
        deleting: deleting_sec,
    } = useSelector((state) => state.secretariesState);

    const [addModalOpen, setAddModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [confirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState(false);
    const [editSecretary, setEditSecretary] = useState({});
    const [deleteSecretary, setDeleteSecretary] = useState({});

    const dispatch = useDispatch();

    const openEditModal = (secretary) => {
        setEditSecretary(secretary);
        setEditModalOpen(true);
    };

    const openDeleteModal = (secretary) => {
        setDeleteSecretary(secretary);
        setConfirmDeleteModalOpen(true);
    };

    const handleDeleteSecretary = async () => {
        const res = await dispatch(deleteSecretaryAction(deleteSecretary?._id));

        if (!res.success) {
            toast.error(res.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            setConfirmDeleteModalOpen(false);
            return;
        }
        dispatch(getSecretariesAction());

        setConfirmDeleteModalOpen(false);
        toast.success(`Secretary Deleted Successfully`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    };

    useEffect(() => {
        authDetails?._id && dispatch(getSecretariesAction());
    }, [dispatch, authDetails?._id]);

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
                        <table className="w-full text-sm text-left overflow-x-auto">
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
                                {secretaries?.map((secretary, idx) => (
                                    <tr
                                        key={secretary?._id}
                                        className="group border-b "
                                    >
                                        <td className="px-6 py-4 font-bold">
                                            {idx + 1}
                                        </td>
                                        <td className="px-6 py-4 capitalize">
                                            {secretary?.firstname}{" "}
                                            {secretary?.lastname}
                                        </td>
                                        <td className="px-6 py-4 capitalize">
                                            {secretary?.gender}
                                        </td>
                                        <td className="px-6 py-4">
                                            {new Date(
                                                secretary?.dob
                                            ).toDateString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            {secretary?.address}
                                        </td>
                                        <td className="px-6 py-4">
                                            {secretary?.phone}
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
                                                    openEditModal(secretary)
                                                }
                                            >
                                                <FaUserEdit />
                                            </div>

                                            <div
                                                className="flex items-center space-x-1 bg-salmon text-white text-xs p-2 
                                            rounded-full cursor-pointer hover:opacity-90 hover:scale-[1.02]"
                                                onClick={() =>
                                                    openDeleteModal(secretary)
                                                }
                                            >
                                                <FaTrash />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {loading_secs && (
                            <div
                                colSpan={5}
                                className="py-4 flex justify-center"
                            >
                                <FaSpinner className="animate-spin  text-lg text-slate-900" />
                            </div>
                        )}
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
                        setEditSecretary({});
                    }}
                    secretary={editSecretary}
                />

                <ConfirmDeleteModal
                    isOpen={confirmDeleteModalOpen}
                    closeModal={() => {
                        setConfirmDeleteModalOpen(false);
                        setDeleteSecretary({});
                    }}
                    message="Deleting the secretary will erase everything about their
                        records. Are you sure you want to delete?"
                    actionMethod={handleDeleteSecretary}
                    loading={deleting_sec}
                />
            </div>
        </DashboardWrapper>
    );
};

export default Secretaries;
