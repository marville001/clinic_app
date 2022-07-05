import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DashboardWrapper from "../components/DashboardWrapper";
import Header from "../components/Header";
import SearchInput from "../components/SearchInput";
import { FaEye, FaSpinner, FaTrash, FaUserEdit } from "react-icons/fa";
import { HiPlusCircle } from "react-icons/hi";
import ConfirmDeleteModal from "../components/modals/ConfirmDeleteModal";
import AddDepartmentModal from "../components/modals/AddDepartmentModal";
import { useDispatch, useSelector } from "react-redux";
import { getDepartmentsAction } from "../redux/actions/departments.action";
import {
    deleteDoctorAction,
    getDoctorsAction,
} from "../redux/actions/doctors.action";

import { toast } from "react-toastify";

const Doctors = () => {
    const { departments } = useSelector(
        (state) => state.departmentsState
    );
    const { authDetails } = useSelector((state) => state.authState);
    const {
        doctors,
        loading: loading_dct,
        deleting,
    } = useSelector((state) => state.doctorsState);
    const [addModalOpen, setAddModalOpen] = useState(false);
    const [confirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState(false);
    const [deleteDoctor, setDeleteDoctor] = useState({});

    // const [page, setPage] = useState(0)
    // const [pageSize, setPageSize] = useState(0)

    const dispatch = useDispatch();

    const openDeleteModal = (doctor) => {
        setDeleteDoctor(doctor);
        setConfirmDeleteModalOpen(true);
    };

    const handleDeleteDoctor = async () => {
        const res = await dispatch(deleteDoctorAction(deleteDoctor?._id));

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
        setConfirmDeleteModalOpen(false);
        dispatch(getDoctorsAction());

        toast.success(`Doctor Deleted Successfully`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    };

    const handleSearch = async (e, search) => {
        e.preventDefault();

        if (search === "") {
            dispatch(getDoctorsAction());
            return;
        }

        dispatch(getDoctorsAction({ search }));
    };

    useEffect(() => {
        authDetails?._id && dispatch(getDepartmentsAction());
    }, [dispatch, authDetails?._id]);

    useEffect(() => {
        authDetails?._id && dispatch(getDoctorsAction());
    }, [dispatch, authDetails?._id]);

    const navigate = useNavigate();

    if (
        authDetails?._id &&
        authDetails?.role !== "admin" &&
        authDetails?.role !== "secretary" &&
        (authDetails?.role === "doctor" && !authDetails?.isAdmin)
    ) {
        navigate("/home");
        return null;
    }

    return (
        <DashboardWrapper>
            <Header title="Doctors" />
            <div className="p-4 ">
                <div>
                    <div className="flex justify-between items-center">
                        <SearchInput onSubmit={handleSearch} />
                        <Link
                            to="/doctors/new"
                            className="flex items-center space-x-2 bg-seagreen py-2 px-6 rounded-md text-white  text-sm hover:opacity-75"
                        >
                            <HiPlusCircle />
                            <span>New Doctor</span>
                        </Link>
                    </div>

                    <div className="mt-5">
                        <div className="relative shadow-md rounded-md bg-white">
                            <table className="w-full text-sm text-left overflow-x-auto">
                                <thead className="text-md bg-dimgray text-white">
                                    <tr>
                                        <th className="px-6 py-4">#</th>
                                        <th className="px-6 py-4">Full Name</th>
                                        <th className="px-6 py-4">Email</th>
                                        <th className="px-6 py-4">Gender</th>
                                        <th className="px-6 py-4">DOB</th>
                                        <th className="px-6 py-4">Address</th>
                                        <th className="px-6 py-4">
                                            Phone Number
                                        </th>
                                        <th className="px-6 py-4">
                                            Department
                                        </th>
                                        <th className="px-6 py-4">
                                            <span className="sr-only">
                                                Action
                                            </span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {doctors?.map((doctor, idx) => (
                                        <tr
                                            key={doctor._id}
                                            className="group border-b "
                                        >
                                            <td className="px-6 py-4 font-bold">
                                                {idx + 1}
                                            </td>
                                            <td className="px-6 py-4">
                                                {doctor?.firstname}{" "}
                                                {doctor?.lastname}
                                            </td>
                                            <td className="px-6 py-4">
                                                {doctor?.email}
                                            </td>
                                            <td className="px-6 py-4">
                                                {doctor?.gender}
                                            </td>
                                            <td className="px-6 py-4">
                                                {doctor?.dob || "-"}
                                            </td>
                                            <td className="px-6 py-4">
                                                {doctor?.address || "-"}
                                            </td>
                                            <td className="px-6 py-4">
                                                {doctor?.phone || "-"}
                                            </td>
                                            <td className="px-6 py-4">
                                                {departments?.find(
                                                    (dep) =>
                                                        dep?._id ===
                                                        doctor?.department
                                                )?.name || "-"}
                                            </td>
                                            <td className="px-6  py-4 text-right  flex justify-end items-center space-x-1">
                                                <Link
                                                    className="
                                                flex items-center space-x-1 bg-seagreen p-2 text-white
                                                text-xs rounded-full hover:opacity-90 
                                                hover:scale-[1.02] "
                                                    to={`/doctors/${doctor?._id}`}
                                                >
                                                    <FaEye className="" />
                                                </Link>

                                                <Link
                                                    className="flex items-center space-x-1 bg-dimgray text-white text-xs p-2 
                                                rounded-full hover:opacity-90 hover:scale-[1.02]"
                                                    to={`/doctors/${doctor?._id}/edit`}
                                                >
                                                    <FaUserEdit className="" />
                                                </Link>

                                                <div
                                                    onClick={() =>
                                                        openDeleteModal(doctor)
                                                    }
                                                    className="flex items-center space-x-1 bg-salmon text-white text-xs p-2 rounded-full cursor-pointer hover:opacity-90 hover:scale-[1.02]"
                                                >
                                                    <FaTrash />
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {loading_dct && (
                                <div className="py-4 flex justify-center">
                                    <FaSpinner className="animate-spin  text-lg text-slate-900" />
                                </div>
                            )}
                        </div>

                        {/* <div className="flex my-4 justify-between">
                            <p>Showing 1-10 out of 50 </p>
                            <span>Pagination</span>
                        </div> */}
                    </div>
                </div>

                <AddDepartmentModal
                    isOpen={addModalOpen}
                    closeModal={() => {
                        setAddModalOpen(false);
                    }}
                />

                <ConfirmDeleteModal
                    isOpen={confirmDeleteModalOpen}
                    closeModal={() => {
                        setConfirmDeleteModalOpen(false);
                    }}
                    message="Deleting the doctor will erase everything about their
                        records. Are you sure you want to delete?"
                    actionMethod={handleDeleteDoctor}
                    loading={deleting}
                />
            </div>
        </DashboardWrapper>
    );
};

export default Doctors;
