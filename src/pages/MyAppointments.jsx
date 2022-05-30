import React, { useEffect, useState } from "react";
import { FaBed, FaCheckSquare } from "react-icons/fa";
import { HiPlusCircle } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CalendarGrid from "../components/common/CalendarGrid";
import DashCountCard from "../components/common/DashCountCard";
import DashboardWrapper from "../components/DashboardWrapper";
import Header from "../components/Header";
import AddAppointmentModal from "../components/modals/AddAppointmentModal";
import { getAppointmentsAction } from "../redux/actions/appointments.action";
import { getDoctorsAction } from "../redux/actions/doctors.action";
import { parseAppointments } from "../utils/calendar";

const MyAppointments = () => {
    const { authDetails } = useSelector((state) => state.authState);
    const { patients } = useSelector((state) => state.patientsState);
    const { appointments } = useSelector((state) => state.appointmentsState);

    const [appoints, setAppoints] = useState([]);
    const [addAppointmentModalOpen, setAddAppointmentModalOpen] =
        useState(false);

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

    const navigate = useNavigate();

    if (authDetails?._id && authDetails?.role !== "doctor") {
        navigate("/home");
        return null;
    }

    return (
        <DashboardWrapper>
            <Header title="My Appointments" />
            <div className="p-4">
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
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold mb-6">
                                My Calendar
                            </h2>
                            <div
                                onClick={() => setAddAppointmentModalOpen(true)}
                                className="flex cursor-pointer items-center space-x-2 bg-seagreen py-2 px-6 rounded-md text-white  text-sm hover:opacity-75"
                            >
                                <HiPlusCircle />
                                <span>add Appointment</span>
                            </div>
                        </div>
                        <CalendarGrid appointments={appoints} doctorId={authDetails?._id} />
                    </div>
                )}
            </div>
            <AddAppointmentModal
                isOpen={addAppointmentModalOpen}
                closeModal={() => {
                    setAddAppointmentModalOpen(false);
                }}
                doctorId={authDetails?._id}
            />
        </DashboardWrapper>
    );
};

export default MyAppointments;
