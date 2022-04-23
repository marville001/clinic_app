import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DashboardWrapper from "../components/DashboardWrapper";
import Header from "../components/Header";
import SearchInput from "../components/SearchInput";
import { FaEye, FaSpinner, FaTrash, FaUserEdit } from "react-icons/fa";
import { HiPlusCircle } from "react-icons/hi";
import ConfirmDeleteModal from "../components/modals/ConfirmDeleteModal";
import AddDepartmentModal from "../components/modals/AddDepartmentModal";
import { useDispatch, useSelector } from "react-redux";
import { getDepartmentsAction } from "../redux/actions/departments.action";
import { getDoctorsAction } from "../redux/actions/doctors.action";

const Doctors = () => {
    const { departments, loading: loading_dpt } = useSelector(
        (state) => state.departmentsState
    );
    const { authDetails } = useSelector((state) => state.authState);
    const { doctors, loading: loading_dct } = useSelector(
        (state) => state.doctorsState
    );
    const [addModalOpen, setAddModalOpen] = useState(false);
    const [confirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState(false);

    const dispatch = useDispatch();

    const openDeleteModal = (id) => {
        setConfirmDeleteModalOpen(true);
    };

    const handleDeleteDoctor = () => {
        setConfirmDeleteModalOpen(false);
    };

    useEffect(() => {
        authDetails?._id && dispatch(getDepartmentsAction());
    }, [dispatch, authDetails?._id]);

    useEffect(() => {
        authDetails?._id && dispatch(getDoctorsAction());
    }, [dispatch, authDetails?._id]);

    return (
        <DashboardWrapper>
            <Header title="Doctors" />
            <div className="p-4 ">
                <div className="my-6 p-4 bg-white _shadow">
                    <div className="flex gap-5 items-center">
                        <h2 className="font-bold text-lg">Departments</h2>
                        {loading_dpt && (
                            <FaSpinner className="animate-spin text-slate-900" />
                        )}
                        {/* <div
                            className="flex items-center space-x-2 py-2 cursor-pointer px-6 rounded-md text-seagreen  text-sm hover:opacity-75"
                        >
                            <HiPlusCircle />
                            <span>New Department</span>
                        </div> */}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 my-5">
                        {departments?.map((department) => (
                            <div
                                key={department?._id}
                                className="_shadow px-6 py-2 flex items-center justify-center text-seagreen rounded-md hover:scale-[1.02] 
                                transition-all duration-150 ease-linear cursor-pointer
                                hover:opacity-80 hover:bg-slate-50"
                            >
                                <span>{department?.name}</span>
                            </div>
                        ))}
                        <div
                            onClick={() => setAddModalOpen(true)}
                            className="_shadow bg-seagreen bg-opacity-20 text-seagreen rounded-md px-6 py-2 flex items-center justify-center 
                                hover:scale-[1.02] transition-all duration-150 ease-linear cursor-pointer hover:bg-opacity-40"
                        >
                            <span>Add Department</span>
                        </div>
                    </div>
                </div>
                <div>
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
                        <div className="relative shadow-md rounded-md bg-white">
                            <table className="w-full text-sm text-left mb-10 overflow-x-auto">
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
                                    {loading_dct ? (
                                        <tr>
                                            <td colSpan={5} className="py-5 flex justify-center">
                                                <FaSpinner className="animate-spin  text-lg text-slate-900" />
                                            </td>
                                        </tr>
                                    ) : (
                                        doctors?.map((doctor, idx) => (
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
                                                    {doctor?.department || "-"}
                                                </td>
                                                <td className="px-6  py-4 text-right flex justify-end items-center space-x-1">
                                                    <Link
                                                        className="
                                                flex items-center space-x-1 bg-seagreen text-white 
                                                text-xs p-2 rounded-full hover:opacity-90 
                                                hover:scale-[1.02] "
                                                        to={`/doctors/${doctor?._id}`}
                                                    >
                                                        <FaEye />
                                                    </Link>

                                                    <Link
                                                        className="flex items-center space-x-1 bg-dimgray text-white text-xs p-2 
                                                rounded-full hover:opacity-90 hover:scale-[1.02]"
                                                        to={`/doctors/${doctor?._id}/edit`}
                                                    >
                                                        <FaUserEdit />
                                                    </Link>

                                                    <div
                                                        onClick={() =>
                                                            openDeleteModal(
                                                                doctor?._id
                                                            )
                                                        }
                                                        className="flex items-center space-x-1 bg-salmon text-white text-xs p-2 rounded-full cursor-pointer hover:opacity-90 hover:scale-[1.02]"
                                                    >
                                                        <FaTrash />
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>

                        <div className="flex my-4 justify-between">
                            <p>Showing 1-10 out of 50 </p>
                            <span>Pagination</span>
                        </div>
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
                />
            </div>
        </DashboardWrapper>
    );
};

export default Doctors;
