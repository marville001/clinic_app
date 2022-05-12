import React, { useState } from "react";
import { HiPlusCircle } from "react-icons/hi";
import CalendarGrid from "../common/CalendarGrid";
import AddAppointmentModal from "../modals/AddAppointmentModal";

const DoctorCalendar = () => {

    const [addAppointmentModalOpen, setAddAppointmentModalOpen] = useState(false);

    return (
        <div className="w-full bg-white p-4 my-5 _shadow">
            <div className="flex items-center justify-between">
                <h3>
                    <strong>Dr. James</strong> Calendar
                </h3>
                <div onClick={()=>setAddAppointmentModalOpen(true)} className="flex cursor-pointer items-center space-x-2 bg-seagreen py-2 px-6 rounded-md text-white  text-sm hover:opacity-75">
                    <HiPlusCircle />
                    <span>add Appointment</span>
                </div>
            </div>

            <div className="w-full mt-6">
                <CalendarGrid />
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
