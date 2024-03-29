import React, { useEffect, useState } from "react";
import { FaEye, FaSpinner, FaTrash, FaUserEdit } from "react-icons/fa";
import { HiPlusCircle } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import DashboardWrapper from "../components/DashboardWrapper";
import Header from "../components/Header";
import ConfirmDeleteModal from "../components/modals/ConfirmDeleteModal";
import SearchInput from "../components/SearchInput";
import {
    deletePatientAction,
    getPatientsAction,
} from "../redux/actions/patients.action";

import { toast } from "react-toastify";

const Patients = () => {
    const {
        loading: loading_pat,
        patients,
        deleting,
    } = useSelector((state) => state.patientsState);
    const { authDetails } = useSelector((state) => state.authState);

    const [confirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState(false);
    const [selectedPatient, setSelectedPatient] = useState({});
    const [type, setType] = useState("");

    // const [page, setPage] = useState(0)
    // const [pageSize, setPageSize] = useState(0)

    const dispatch = useDispatch();

    const openDeleteModal = (patient) => {
        setSelectedPatient(patient);
        setConfirmDeleteModalOpen(true);
    };

    const handleDeletePatient = async () => {
        const res = await dispatch(deletePatientAction(selectedPatient?._id));

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
        dispatch(getPatientsAction());
        setSelectedPatient({});

        toast.success(`Patient Deleted Successfully`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    };

    const showType = (type) => {
        if (type === "active") return "Active";

        if (type === "inactive") return "Inactive";

        return "Not Subscribed";
    };

    const handleSearch = async (e, search) => {
        e.preventDefault();

        if (search === "") {
            dispatch(getPatientsAction());
            return;
        }

        dispatch(getPatientsAction({ search, type }));
    };

    useEffect(() => {
        authDetails?._id && dispatch(getPatientsAction());
    }, [dispatch, authDetails?._id]);

    useEffect(() => {
        dispatch(getPatientsAction({ type }));
    }, [type, dispatch]);

    const navigate = useNavigate();

    if (
        authDetails?._id &&
        authDetails?.role !== "admin" &&
        authDetails?.role !== "secretary" &&
        authDetails?.role === "doctor" &&
        !authDetails?.isAdmin
    ) {
        navigate("/home");
        return null;
    }

    return (
        <DashboardWrapper>
            <Header title="Patients" />
            <div className="p-4 grid grid-cols-1">
                <div className="flex flex-col md:flex-row md:justify-between gap-3 md:items-center">
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                        <SearchInput onSubmit={handleSearch} />
                        <select
                            name="status"
                            label="Status"
                            className="border-0 focus:outline-none focus:ring-0"
                            value={type}
                            onChange={e=>setType(e.target.value)}
                        >
                            <option value="">Select Type</option>
                            <option value="active">Active</option>
                            <option value="inactive">In Active</option>
                            <option value="not-subscribed">Not Subscribed</option>
                        </select>
                    </div>
                    <Link
                        to="/patients/new"
                        className="flex items-center self-end md:self-auto space-x-2 bg-seagreen py-2 px-6 rounded-md text-white  text-sm hover:opacity-75"
                    >
                        <HiPlusCircle />
                        <span>Add Patient</span>
                    </Link>
                </div>

                <div className="mt-5">
                    <div className="relative overflow-x-auto shadow-md rounded-md bg-white">
                        <table className="w-full text-sm text-left overflow-x-auto">
                            <thead className="text-md bg-dimgray text-white">
                                <tr>
                                    <th className="px-6 py-4">#</th>
                                    <th className="px-6 py-4">Name</th>
                                    <th className="px-6 py-4">Gender</th>
                                    <th className="px-6 py-4 hidden lg:table-cell">DOB</th>
                                    <th className="px-6 py-4 hidden lg:table-cell">Address</th>
                                    <th className="px-6 py-4">Phone Number</th>
                                    <th className="px-6 py-4">Type</th>
                                    <th className="px-6 py-4">
                                        <span className="sr-only">Action</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {patients?.map((patient, idx) => (
                                    <tr
                                        key={patient?._id}
                                        className="group border-b "
                                    >
                                        <td className="px-6 py-4 font-bold">
                                            {idx + 1}
                                        </td>
                                        <td className="px-6 py-4">
                                            {patient?.firstname} {" "}
                                            {patient?.lastname}
                                        </td>
                                        <td className="px-6 py-4 capitalize">
                                            {patient?.gender}
                                        </td>
                                        <td className="px-6 py-4 hidden lg:table-cell">
                                            {new Date(
                                                patient?.dob
                                            ).toDateString()}
                                        </td>
                                        <td className="px-6 py-4 hidden lg:table-cell">
                                            {patient?.address}
                                        </td>
                                        <td className="px-6 py-4">
                                            {patient?.phone}
                                        </td>
                                        <td className="px-6 py-4">
                                            {showType(patient?.type)}
                                        </td>
                                        <td className="px-6  py-4 text-right flex justify-end items-center space-x-1">
                                            <Link
                                                className="
                                                flex items-center space-x-1 bg-seagreen text-white 
                                                text-xs p-2 rounded-full hover:opacity-90 
                                                hover:scale-[1.02] "
                                                to={`/patients/${patient?._id}`}
                                            >
                                                <FaEye />
                                            </Link>

                                            <Link
                                                className="flex items-center space-x-1 bg-dimgray text-white text-xs p-2 
                                                rounded-full hover:opacity-90 hover:scale-[1.02]"
                                                to={`/patients/${patient?._id}/edit`}
                                            >
                                                <FaUserEdit />
                                            </Link>

                                            <div
                                                onClick={() =>
                                                    openDeleteModal(patient)
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

                        {loading_pat && (
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

                <ConfirmDeleteModal
                    isOpen={confirmDeleteModalOpen}
                    closeModal={() => {
                        setConfirmDeleteModalOpen(false);
                        setSelectedPatient({});
                    }}
                    loading={deleting}
                    message="Deleting the patient will erase everything about their
                        records. Are you sure you want to delete?"
                    actionMethod={handleDeletePatient}
                />
            </div>
        </DashboardWrapper>
    );
};

export default Patients;
