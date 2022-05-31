import React, { useEffect, useState } from "react";
import { HiPlusCircle } from "react-icons/hi";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { parseAppointments } from "../../utils/calendar";
import CalendarGrid from "../common/CalendarGrid";
import AddAppointmentModal from "../modals/AddAppointmentModal";

const DoctorCalendar = () => {
    const { appointments } = useSelector((state) => state.appointmentsState);

    const [addAppointmentModalOpen, setAddAppointmentModalOpen] =
        useState(false);
    const [appoints, setAppoints] = useState([]);

    useEffect(() => {
        setAppoints(parseAppointments(appointments));
    }, [appointments]);

    const { id } = useParams();

    return (
        <div className="w-full bg-white p-4 my-5 _shadow">
            <div className="flex items-center justify-between">
                <h3>
                    <strong>Dr. James</strong> Calendar
                </h3>
                <div
                    onClick={() => setAddAppointmentModalOpen(true)}
                    className="flex cursor-pointer items-center space-x-2 bg-seagreen py-2 px-6 rounded-md text-white  text-sm hover:opacity-75"
                >
                    <HiPlusCircle />
                    <span>add Appointment</span>
                </div>
            </div>

            <div className="w-full mt-6">
                <CalendarGrid appointments={appoints} doctorId={id} />
            </div>

            <AddAppointmentModal
                isOpen={addAppointmentModalOpen}
                closeModal={() => {
                    setAddAppointmentModalOpen(false);
                }}
                doctorId={id}
            />
        </div>
    );
};

export default DoctorCalendar;
