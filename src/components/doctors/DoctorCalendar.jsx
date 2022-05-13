import React, { useEffect, useState } from "react";
import { HiPlusCircle } from "react-icons/hi";
import { useSelector } from "react-redux";
import CalendarGrid from "../common/CalendarGrid";
import AddAppointmentModal from "../modals/AddAppointmentModal";

const DoctorCalendar = () => {
    const { appointments } = useSelector((state) => state.appointmentsState);

    const [addAppointmentModalOpen, setAddAppointmentModalOpen] =
        useState(false);
    const [appoints, setAppoints] = useState([]);

    const getTodayStr = (date) => {
        return new Date(date).toISOString().replace(/T.*$/, "");
    };

    const getTimeStr = (time) => {
        return "T" + (time ? time.toString() : "00:00") + ":00";
    };

    useEffect(() => {
        const _apps = appointments.map((appointment) => {
            const {
                title,
                timeFrom,
                timeTo,
                allDay,
                startDate,
                endDate,
                description,
            } = appointment;

            console.log(appointment);
            return {
                title,
                start: allDay
                    ? getTodayStr(startDate) + getTimeStr(timeFrom)
                    : getTodayStr(startDate),
                end: allDay ? getTodayStr(endDate) + getTimeStr(timeTo) : "",
                id: appointment._id,
                description,
            };
        });

        console.log(_apps);

        setAppoints(_apps);
    }, [appointments]);

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
                <CalendarGrid appointments={appoints} />
            </div>

            <AddAppointmentModal
                isOpen={addAppointmentModalOpen}
                closeModal={() => {
                    setAddAppointmentModalOpen(false);
                }}
            />
        </div>
    );
};

export default DoctorCalendar;
