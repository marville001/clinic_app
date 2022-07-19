import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { getAppointmentsAction } from "../redux/actions/appointments.action";
import CalendarGrid from "./common/CalendarGrid";

const AllAppointmentCalendar = ({ appointments }) => {
    const { doctors } = useSelector((state) => state.doctorsState);

    const [selectedDoctors, setSelectedDoctors] = useState([]);

    const dispatch = useDispatch();

    const handleApplyClick = () => {
        dispatch(
            getAppointmentsAction("", "all", {
                doctors: selectedDoctors.map((d) => d.value),
            })
        );
    };

    console.log(selectedDoctors.map((d) => d.value));

    return (
        <div className="w-full my-8 bg-white p-5 _shadow rounded-lg">
            <div className="flex py-5 gap-4 items-center">
                <div className="font-bold">
                    Total{" "}
                    <span className="text-seagreen text-2xl ml-2">
                        {appointments?.length}
                    </span>
                </div>
                <div className="max-w-[600px]">
                    <Select
                        placeholder="Select Doctors"
                        isMulti
                        className="z-[100]"
                        value={selectedDoctors}
                        onChange={(value) => setSelectedDoctors(value)}
                        options={doctors?.map((doc) => {
                            return {
                                value: doc._id,
                                label: `${doc.firstname} ${doc.lastname}`,
                            };
                        })}
                    />
                </div>
                <button
                    type="button"
                    onClick={handleApplyClick}
                    className="text-seagreen hover:text-white self-end py-2 text-sm px-10 bg-white hover:bg-seagreen border border-seagreen rounded-md 
                            flex items-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    Apply
                </button>
            </div>
            <CalendarGrid appointments={appointments} />
        </div>
    );
};

export default AllAppointmentCalendar;
