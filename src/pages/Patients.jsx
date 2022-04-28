import React, { useEffect, useState } from "react";
import { FaEye, FaSpinner, FaTrash, FaUserEdit } from "react-icons/fa";
import { HiPlusCircle } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import DashboardWrapper from "../components/DashboardWrapper";
import Header from "../components/Header";
import ConfirmDeleteModal from "../components/modals/ConfirmDeleteModal";
import SearchInput from "../components/SearchInput";
import { getDepartmentsAction } from "../redux/actions/departments.action";
import {
    deleteContactTypeAction,
    deletePatientAction,
    getContactTypesAction,
    getPatientsAction,
} from "../redux/actions/patients.action";

import { toast } from "react-toastify";
import AddContactTypeModal from "../components/modals/AddContactTypeModal";
import AddDiagnosisModal from "../components/modals/AddDiagnosisModal";
import { deleteDiagnosisAction, getDiagnosisAction } from "../redux/actions/diagnosis.action";

const Patients = () => {
    const {
        loading: loading_pat,
        patients,
        contactType,
        deletingCType,
        deleting,
    } = useSelector((state) => state.patientsState);
    const { authDetails } = useSelector((state) => state.authState);
    const { departments } = useSelector((state) => state.departmentsState);
    const { diagnosis, deleting: deleting_diag } = useSelector((state) => state.diagnosisState);

    const [confirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState(false);
    const [confirmDeleteCtypeModalOpen, setConfirmDeleteCtypeModalOpen] =
        useState(false);
     const [confirmDeleteDiagnosisModalOpen, setConfirmDeleteDiagnosisModalOpen] =
        useState(false);
    const [addCTypeModalOpen, setAddCTypeModalOpen] = useState(false);
    const [addDiagnosisModalOpen, setAddDiagnosisModalOpen] = useState(false);
    const [selectedPatient, setSelectedPatient] = useState({});
    const [selectedCType, setSelectedCType] = useState({});
    const [selectedDiagnosis, setSelectedDiagnosis] = useState({});

    const dispatch = useDispatch();

    const openDeleteModal = (patient) => {
        setSelectedPatient(patient);
        setConfirmDeleteModalOpen(true);
    };

    const openDeleteCtypeModal = (type) => {
        setSelectedCType(type);
        setConfirmDeleteCtypeModalOpen(true);
    };

    const openDeleteDiagnosisModal = (diagnosis) => {
        setSelectedDiagnosis(diagnosis);
        setConfirmDeleteDiagnosisModalOpen(true);
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
        setSelectedPatient({})

        toast.success(`Patient Deleted Successfully`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    };

    const handleDeleteContactType = async () => {
        const res = await dispatch(deleteContactTypeAction(selectedCType?._id));

        if (!res.success) {
            toast.error(res.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            setConfirmDeleteCtypeModalOpen(false);
            return;
        }
        setConfirmDeleteCtypeModalOpen(false);
        dispatch(getContactTypesAction());
        setSelectedCType({})

        toast.success(`Contact Type Deleted Successfully`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    };

    const handleDeleteDiagnosis = async () => {
        const res = await dispatch(deleteDiagnosisAction(selectedDiagnosis?._id));

        if (!res.success) {
            toast.error(res.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            setConfirmDeleteDiagnosisModalOpen(false);
            return;
        }
        setConfirmDeleteDiagnosisModalOpen(false);
        dispatch(getDiagnosisAction());
        setSelectedCType({})

        toast.success(`Diagnosis Deleted Successfully`, {
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

    useEffect(() => {
        authDetails?._id && dispatch(getPatientsAction());
    }, [dispatch, authDetails?._id]);

    useEffect(() => {
        authDetails?._id && dispatch(getDepartmentsAction());
        authDetails?._id && dispatch(getContactTypesAction());
    }, [dispatch, authDetails?._id]);

    return (
        <DashboardWrapper>
            <Header title="Patients" />
            <div className="p-4">
                <div className="flex gap-5 flex-col lg:flex-row mb-6">
                    <div className="py-4 flex-[1] xl:flex-[2] rounded bg-white _shadow self-stfart">
                        <div className="flex justify-between items-center px-4">
                            <h3 className="text-md mb-4 font-bold">
                                Contact Types
                            </h3>
                            <button
                                onClick={() => setAddCTypeModalOpen(true)}
                                className="flex items-center space-x-2 bg-seagreen py-2 px-6 rounded-md text-white  text-sm hover:opacity-75"
                            >
                                <HiPlusCircle />
                                <span>Add Contact Type</span>
                            </button>
                        </div>

                        <div className="px-4 h-[200px] overflow-y-auto">
                            <table className="w-full text-sm text-left px-4">
                                <thead className="text-md">
                                    <tr>
                                        <th className="py-4">#</th>
                                        <th className="py-4">Type</th>
                                        <th className="py-4">Description</th>
                                        <th className="py-4"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {contactType?.map((type, idx) => (
                                        <tr
                                            key={type?._id}
                                            className="group border-b "
                                        >
                                            <td className="py-2 font-bold">
                                                {idx + 1}
                                            </td>
                                            <td className="py-2">
                                                {type?.name}
                                            </td>
                                            <td className="py-2 capitalize">
                                                {type?.description}
                                            </td>
                                            <td className="py-2 pr-12 text-right flex justify-end items-center space-x-1">
                                                <div
                                                    onClick={() =>
                                                        openDeleteCtypeModal(
                                                            type
                                                        )
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
                        </div>
                    </div>
                    <div className="p-4 flex-[1] xl:flex-[2] rounded bg-white _shadow self-stfart">
                        <div className="flex justify-between items-center px-4">
                            <h3 className="text-md mb-4 font-bold">
                                All Diagnosis
                            </h3>
                            <button
                                onClick={() => setAddDiagnosisModalOpen(true)}
                                className="flex items-center space-x-2 bg-seagreen py-2 px-6 rounded-md text-white  text-sm hover:opacity-75"
                            >
                                <HiPlusCircle />
                                <span>Add Diagnosis</span>
                            </button>
                        </div>

                        <div className="px-4 h-[200px] overflow-y-auto">
                            <table className="w-full text-sm text-left px-4">
                                <thead className="text-md">
                                    <tr>
                                        <th className="py-4">#</th>
                                        <th className="py-4">Type</th>
                                        <th className="py-4">Description</th>
                                        <th className="py-4"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {diagnosis?.map((diag, idx) => (
                                        <tr
                                            key={diag?._id}
                                            className="group border-b "
                                        >
                                            <td className="py-2 font-bold">
                                                {idx + 1}
                                            </td>
                                            <td className="py-2">
                                                {diag?.name}
                                            </td>
                                            <td className="py-2 capitalize">
                                                {diag?.description}
                                            </td>
                                            <td className="py-2 pr-12 text-right flex justify-end items-center space-x-1">
                                                <div
                                                    onClick={() =>
                                                        openDeleteDiagnosisModal(
                                                            diag
                                                        )
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
                        </div>
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <SearchInput />
                    <Link
                        to="/patients/new"
                        className="flex items-center space-x-2 bg-seagreen py-2 px-6 rounded-md text-white  text-sm hover:opacity-75"
                    >
                        <HiPlusCircle />
                        <span>Add Patient</span>
                    </Link>
                </div>

                <div className="mt-5">
                    <div className="relative overflow-x-auto shadow-md rounded-md bg-white">
                        <table className="w-full text-sm text-left">
                            <thead className="text-md bg-dimgray text-white">
                                <tr>
                                    <th className="px-6 py-4">#</th>
                                    <th className="px-6 py-4">First Name</th>
                                    <th className="px-6 py-4">Last Name</th>
                                    <th className="px-6 py-4">Gender</th>
                                    <th className="px-6 py-4">DOB</th>
                                    <th className="px-6 py-4">Address</th>
                                    <th className="px-6 py-4">Phone Number</th>
                                    <th className="px-6 py-4">Department</th>
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
                                            {patient?.firstname}
                                        </td>
                                        <td className="px-6 py-4">
                                            {patient?.lastname}
                                        </td>
                                        <td className="px-6 py-4 capitalize">
                                            {patient?.gender}
                                        </td>
                                        <td className="px-6 py-4">
                                            {new Date(
                                                patient?.dob
                                            ).toDateString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            {patient?.address}
                                        </td>
                                        <td className="px-6 py-4">
                                            {patient?.phone}
                                        </td>
                                        <td className="px-6 py-4">
                                            {departments?.find(
                                                (dep) =>
                                                    dep?._id ===
                                                    patient?.department
                                            )?.name || "-"}
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

                    <div className="flex my-4 justify-between">
                        <p>Showing 1-10 out of 50 </p>
                        <span>Pagination</span>
                    </div>
                </div>

                <ConfirmDeleteModal
                    isOpen={confirmDeleteModalOpen}
                    closeModal={() => {
                        setConfirmDeleteModalOpen(false);
                        setSelectedPatient({})
                    }}
                    loading={deleting}
                    message="Deleting the patient will erase everything about their
                        records. Are you sure you want to delete?"
                    actionMethod={handleDeletePatient}
                />

                <ConfirmDeleteModal
                    isOpen={confirmDeleteCtypeModalOpen}
                    closeModal={() => {
                        setConfirmDeleteCtypeModalOpen(false);
                        setSelectedCType({})
                    }}
                    loading={deletingCType}
                    message="Are you sure you want to delete the Contact Type?"
                    actionMethod={handleDeleteContactType}
                />

                <ConfirmDeleteModal
                    isOpen={confirmDeleteDiagnosisModalOpen}
                    closeModal={() => {
                        setConfirmDeleteDiagnosisModalOpen(false);
                        setSelectedDiagnosis({})
                    }}
                    loading={deleting_diag}
                    message="Are you sure you want to delete the Diagnosis?"
                    actionMethod={handleDeleteDiagnosis}
                />

                <AddContactTypeModal
                    isOpen={addCTypeModalOpen}
                    closeModal={() => {
                        setAddCTypeModalOpen(false);
                    }}
                />

                <AddDiagnosisModal
                    isOpen={addDiagnosisModalOpen}
                    closeModal={() => {
                        setAddDiagnosisModalOpen(false);
                    }}
                />
            </div>
        </DashboardWrapper>
    );
};

export default Patients;
