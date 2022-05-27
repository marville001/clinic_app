import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardWrapper from "../components/DashboardWrapper";
import Header from "../components/Header";
import { FaSpinner, FaTrash } from "react-icons/fa";
import AddDepartmentModal from "../components/modals/AddDepartmentModal";
import { useDispatch, useSelector } from "react-redux";
import { getDepartmentsAction } from "../redux/actions/departments.action";
import ConfirmDeleteModal from "../components/modals/ConfirmDeleteModal";
import AddContactTypeModal from "../components/modals/AddContactTypeModal";
import AddDiagnosisModal from "../components/modals/AddDiagnosisModal";
import { deleteContactTypeAction, getContactTypesAction } from "../redux/actions/patients.action";
import { deleteDiagnosisAction, getDiagnosisAction } from "../redux/actions/diagnosis.action";
import { HiPlusCircle } from "react-icons/hi";
import { toast } from "react-toastify";

const Settings = () => {
    const { departments, loading: loading_dpt } = useSelector(
        (state) => state.departmentsState
    );
    const { authDetails } = useSelector((state) => state.authState);
    const { diagnosis, deleting: deleting_diag } = useSelector(
        (state) => state.diagnosisState
    );
    const { contactType, deletingCType } = useSelector(
        (state) => state.patientsState
    );

    const [addModalOpen, setAddModalOpen] = useState(false);
    const [confirmDeleteCtypeModalOpen, setConfirmDeleteCtypeModalOpen] =
        useState(false);
    const [
        confirmDeleteDiagnosisModalOpen,
        setConfirmDeleteDiagnosisModalOpen,
    ] = useState(false);
    const [addCTypeModalOpen, setAddCTypeModalOpen] = useState(false);
    const [addDiagnosisModalOpen, setAddDiagnosisModalOpen] = useState(false);
    const [selectedCType, setSelectedCType] = useState({});
    const [selectedDiagnosis, setSelectedDiagnosis] = useState({});

    const dispatch = useDispatch();

    const openDeleteCtypeModal = (type) => {
        setSelectedCType(type);
        setConfirmDeleteCtypeModalOpen(true);
    };

    const openDeleteDiagnosisModal = (diagnosis) => {
        setSelectedDiagnosis(diagnosis);
        setConfirmDeleteDiagnosisModalOpen(true);
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
        setSelectedCType({});

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
        const res = await dispatch(
            deleteDiagnosisAction(selectedDiagnosis?._id)
        );

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
        setSelectedCType({});

        toast.success(`Diagnosis Deleted Successfully`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    };

    useEffect(() => {
        authDetails?._id && dispatch(getDepartmentsAction());
        authDetails?._id && dispatch(getContactTypesAction());
        authDetails?._id && dispatch(getDiagnosisAction());
    }, [dispatch, authDetails?._id]);

    const navigate = useNavigate();

    if (authDetails?._id && authDetails?.role !== "admin") {
        navigate("/home");
        return null;
    }

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

                        <div className="px-4 h-[250px] overflow-y-auto">
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

                        <div className="px-4 h-[250px] overflow-y-auto">
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

                <AddDepartmentModal
                    isOpen={addModalOpen}
                    closeModal={() => {
                        setAddModalOpen(false);
                    }}
                />

                <ConfirmDeleteModal
                    isOpen={confirmDeleteCtypeModalOpen}
                    closeModal={() => {
                        setConfirmDeleteCtypeModalOpen(false);
                        setSelectedCType({});
                    }}
                    loading={deletingCType}
                    message="Are you sure you want to delete the Contact Type?"
                    actionMethod={handleDeleteContactType}
                />

                <ConfirmDeleteModal
                    isOpen={confirmDeleteDiagnosisModalOpen}
                    closeModal={() => {
                        setConfirmDeleteDiagnosisModalOpen(false);
                        setSelectedDiagnosis({});
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

export default Settings;
