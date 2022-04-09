import React from "react";
import DashboardWrapper from "../components/DashboardWrapper";
import Header from "../components/Header";
import DoctorPersonalDetails from "../components/doctors/DoctorPersonalDetails";
import AssignedPatients from "../components/doctors/AssignedPatients";
import DoctorCalendar from "../components/doctors/DoctorCalendar";

const ViewDoctor = () => {
    return (
        <DashboardWrapper>
            <Header title="View Doctor" />
            <div className="px-5">
                <h1 className="text-xl my-5">Doctor Profile</h1>
                <div className="flex gap-5 flex-col lg:flex-row">
                    <DoctorPersonalDetails />
                    <AssignedPatients />
                </div>

                <DoctorCalendar />
            </div>
        </DashboardWrapper>
    );
};

export default ViewDoctor;
