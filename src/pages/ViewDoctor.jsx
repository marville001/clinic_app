import React, { useEffect } from "react";
import DashboardWrapper from "../components/DashboardWrapper";
import Header from "../components/Header";
import DoctorPersonalDetails from "../components/doctors/DoctorPersonalDetails";
import AssignedPatients from "../components/doctors/AssignedPatients";
import DoctorCalendar from "../components/doctors/DoctorCalendar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getDoctorAction } from "../redux/actions/doctors.action";
import { FaSpinner } from "react-icons/fa";
import { getDepartmentsAction } from "../redux/actions/departments.action";
import { getAppointmentsAction } from "../redux/actions/appointments.action";

const ViewDoctor = () => {
    const { loadingDoctor: loading_doc, doctor } = useSelector(
        (state) => state.doctorsState
    );
    const { authDetails } = useSelector((state) => state.authState);

    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        authDetails?._id && dispatch(getDoctorAction(id));
        authDetails?._id && dispatch(getAppointmentsAction(id));
        authDetails?._id && dispatch(getDepartmentsAction());
    }, [dispatch, authDetails?._id, id]);

    const navigate = useNavigate();

    if (
        authDetails?._id &&
        (authDetails?.role !== "admin" && authDetails?.role !== "secretary")
        && (authDetails?.role === "doctor" && !authDetails?.isAdmin)
    ) {
        navigate("/home");
        return null;
    }

    return (
        <DashboardWrapper>
            <Header title="View Doctor" />
            {loading_doc ? (
                <div className="w-full flex pt-20 justify-center">
                    <FaSpinner className="text-3xl animate-spin" />
                </div>
            ) : (
                <div className="px-5">
                    {doctor?._id ? (
                        <>
                            <h1 className="text-xl my-5">Doctor Profile</h1>
                            <div className="flex gap-5 flex-col lg:flex-row">
                                <DoctorPersonalDetails />
                                <AssignedPatients />
                            </div>

                            <DoctorCalendar />
                        </>
                    ) : (
                        <div className="flex justify-center py-20">
                            <h4 className="uppercase text-3xl font-bold text-center opacity-50">
                                DOCtor NOT FOUND
                            </h4>
                        </div>
                    )}
                </div>
            )}
        </DashboardWrapper>
    );
};

export default ViewDoctor;
