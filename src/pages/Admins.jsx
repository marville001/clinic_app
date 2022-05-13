import React, { useEffect, useState } from "react";
import { FaSpinner, FaTrash, FaUserEdit } from "react-icons/fa";
import { HiPlusCircle } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import DashboardWrapper from "../components/DashboardWrapper";
import Header from "../components/Header";
import ConfirmDeleteModal from "../components/modals/ConfirmDeleteModal";
import SearchInput from "../components/SearchInput";
import {
    deleteAdminAction,
    getAdminsAction,
} from "../redux/actions/admins.action";

import { toast } from "react-toastify";
import AddAdminModal from "../components/modals/AddAdminModal";
import EditAdminModal from "../components/modals/EditAdminModal";
import { useNavigate } from "react-router-dom";

const Admins = () => {
    const { authDetails } = useSelector((state) => state.authState);
    const {
        loading: loading_adm,
        admins,
        deleting: deleting_adm,
    } = useSelector((state) => state.adminsState);

    const [addModalOpen, setAddModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedAdmin, setSelectedAdmin] = useState({});
    const [confirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const openEditModal = (admin) => {
        setSelectedAdmin(admin);
        setEditModalOpen(true);
    };

    const openDeleteModal = (admin) => {
        setSelectedAdmin(admin);
        setConfirmDeleteModalOpen(true);
    };

    const handleDeleteAdmin = async () => {
        const res = await dispatch(deleteAdminAction(selectedAdmin?._id));

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
            setSelectedAdmin({});
            return;
        }
        dispatch(getAdminsAction());

        setConfirmDeleteModalOpen(false);
        toast.success(`Admin Deleted Successfully`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    };

    useEffect(() => {
        authDetails?._id && dispatch(getAdminsAction());
    }, [dispatch, authDetails?._id]);

    if (authDetails?._id && authDetails?.role !== "admin") {
        navigate("/home");
        return null;
    }

    return (
        <DashboardWrapper>
            <Header title="Admins List" />
            <div className="p-4 ">
                <div className="flex justify-between items-center">
                    <SearchInput />
                    <div
                        onClick={() => setAddModalOpen(true)}
                        className="flex cursor-pointer items-center space-x-2 bg-seagreen py-2 px-6 rounded-md text-white  text-sm hover:opacity-75"
                    >
                        <HiPlusCircle />
                        <span>New Admin</span>
                    </div>
                </div>

                <div className="mt-5">
                    <div className="relative shadow-md rounded-md bg-white">
                        <table className="w-full text-sm text-left overflow-x-auto">
                            <thead className="text-md bg-dimgray text-white">
                                <tr>
                                    <th className="px-6 py-4">#</th>
                                    <th className="px-6 py-4">Full Name</th>
                                    <th className="px-6 py-4">Phone</th>
                                    <th className="px-6 py-4">Gender</th>
                                    <th className="px-6 py-4">Date Of Birth</th>
                                    <th className="px-6 py-4">Email</th>
                                    <th className="px-6 py-4">Username</th>
                                    <th className="px-6 py-4">
                                        <span className="sr-only">Action</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {admins?.map((admin, idx) => (
                                    <tr
                                        key={admin?._id}
                                        className="group border-b "
                                    >
                                        <td className="px-6 py-4 font-bold">
                                            {idx + 1}
                                        </td>
                                        <td className="px-6 py-4 capitalize">
                                            {admin?.firstname} {admin?.lastname}
                                        </td>
                                        <td className="px-6 py-4 capitalize">
                                            {admin?.phone}
                                        </td>
                                        <td className="px-6 py-4 capitalize">
                                            {admin?.gender}
                                        </td>
                                        <td className="px-6 py-4">
                                            {admin?.dob
                                                ? new Date(
                                                      admin?.dob
                                                  ).toDateString()
                                                : "-"}
                                        </td>
                                        <td className="px-6 py-4">
                                            {admin?.email}
                                        </td>
                                        <td className="px-6 py-4">
                                            {admin?.username}
                                        </td>
                                        <td className="px-6  py-4 text-right flex justify-end items-center space-x-1">
                                            <div
                                                className="flex items-center space-x-1 bg-dimgray text-white text-xs p-2 
                                                rounded-full hover:opacity-90 hover:scale-[1.02] cursor-pointer"
                                                onClick={() =>
                                                    openEditModal(admin)
                                                }
                                            >
                                                <FaUserEdit />
                                            </div>

                                            <div
                                                className="flex items-center space-x-1 bg-salmon text-white text-xs p-2 
                                            rounded-full cursor-pointer hover:opacity-90 hover:scale-[1.02]"
                                                onClick={() =>
                                                    openDeleteModal(admin)
                                                }
                                            >
                                                <FaTrash />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {loading_adm && (
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

                <AddAdminModal
                    isOpen={addModalOpen}
                    closeModal={() => {
                        setAddModalOpen(false);
                    }}
                />

                <EditAdminModal
                    isOpen={editModalOpen}
                    closeModal={() => {
                        setEditModalOpen(false);
                        setSelectedAdmin({});
                    }}
                    admin={selectedAdmin}
                />

                <ConfirmDeleteModal
                    isOpen={confirmDeleteModalOpen}
                    closeModal={() => {
                        setConfirmDeleteModalOpen(false);
                        setSelectedAdmin({});
                    }}
                    message="Deleting the admin will erase everything about their
                        records. Are you sure you want to delete?"
                    actionMethod={handleDeleteAdmin}
                    loading={deleting_adm}
                />
            </div>
        </DashboardWrapper>
    );
};

export default Admins;
