import React, { useEffect } from "react";
import { FaSpinner } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import DashboardWrapper from "../components/DashboardWrapper";
import Header from "../components/Header";
import PatientAttachedFiles from "../components/patients/PatientAttachedFiles";
import PatientComments from "../components/patients/PatientComments";
import PatientPersonalDetails from "../components/patients/PatientPersonalDetails";
import { getDepartmentsAction } from "../redux/actions/departments.action";
import {
    getCommentTypesAction,
    getPatientAction,
    getCommentsAction,
} from "../redux/actions/patients.action";

const ViewAssignedPatient = () => {
    const { loadingPatient: loading_pat, patient } = useSelector(
        (state) => state.patientsState
    );
    const { authDetails } = useSelector((state) => state.authState);

    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        authDetails?._id && dispatch(getPatientAction(id));
        authDetails?._id && dispatch(getCommentsAction(id));
        authDetails?._id && dispatch(getCommentTypesAction());
        authDetails?._id && dispatch(getDepartmentsAction());
    }, [dispatch, authDetails?._id, id]);

    return (
        <DashboardWrapper>
            <Header title="View Assigned Patient" />

            {loading_pat ? (
                <div className="w-full flex pt-20 justify-center">
                    <FaSpinner className="text-3xl animate-spin" />
                </div>
            ) : (
                <div className="px-5">
                    {patient?._id ? (
                        <>
                            <h1 className="text-xl my-5">Patients Profile</h1>
                            <div className="flex gap-5 flex-col lg:flex-row">
                                <PatientPersonalDetails />
                            </div>

                            <div className="flex gap-5 my-5 flex-col lg:flex-row">
                                <PatientComments assigned />
                                <PatientAttachedFiles />
                            </div>
                        </>
                    ) : (
                        <div className="flex justify-center py-20">
                            <h4 className="uppercase text-3xl font-bold text-center opacity-50">
                                Patient NOT FOUND
                            </h4>
                        </div>
                    )}
                </div>
            )}
        </DashboardWrapper>
    );
};

export default ViewAssignedPatient;
