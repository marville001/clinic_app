import React, { useEffect, useState } from "react";
import { FaBed, FaCheckSquare } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import CalendarGrid from "../components/common/CalendarGrid";
import DashCountCard from "../components/common/DashCountCard";
import DashboardWrapper from "../components/DashboardWrapper";
import Header from "../components/Header";
import { getAppointmentsAction } from "../redux/actions/appointments.action";
import { getDoctorsAction } from "../redux/actions/doctors.action";
import { parseAppointments } from "../utils/calendar";

const MyAppointments = () => {
    const { authDetails } = useSelector((state) => state.authState);
    const { patients } = useSelector((state) => state.patientsState);
    const { appointments } = useSelector((state) => state.appointmentsState);

    const [appoints, setAppoints] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        if (authDetails?._id) {
            dispatch(getDoctorsAction());
        }
    }, [dispatch, authDetails?._id]);

    useEffect(() => {
        if (authDetails?._id && authDetails?.role === "doctor") {
            dispatch(getAppointmentsAction(authDetails?._id));
        }
    }, [dispatch, authDetails]);

    useEffect(() => {
        setAppoints(parseAppointments(appointments));
    }, [appointments]);

    return (
        <DashboardWrapper>
            <Header title="My Appointments" />
            <div className="p-4">
                <h4 className="text-lg">My Appointments</h4>
                <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3  xl:grid-cols-5 my-5">
                    <DashCountCard
                        icon={FaBed}
                        count={patients?.length}
                        text="Patients Assigned"
                    />
                    {authDetails?.role === "doctor" && (
                        <DashCountCard
                            icon={FaCheckSquare}
                            count={appointments?.length}
                            text="Appointments"
                        />
                    )}
                </div>
                {/* Calendar */}
                {authDetails?.role === "doctor" && (
                    <div className="w-full my-8 bg-white p-5 _shadow">
                        <h2 className="text-xl font-bold mb-6">My Calendar</h2>
                        <CalendarGrid appointments={appoints} />
                    </div>
                )}
            </div>
        </DashboardWrapper>
    );
};

export default MyAppointments;
