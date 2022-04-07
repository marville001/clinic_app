import React from "react";
import DashboardWrapper from "../components/DashboardWrapper";
import Header from "../components/Header";
import PatientAssignedDoctors from "../components/patients/PatientAssignedDoctors";
import PatientPersonalDetails from "../components/patients/PatientPersonalDetails";

const ViewPatient = () => {
    return (
        <DashboardWrapper>
            <Header title="ViewPatient" />
            <div className="px-5">
                <h1 className="text-xl my-5">Patients Profile</h1>
                <div className="flex gap-5">
                    <PatientPersonalDetails />
                    <PatientAssignedDoctors />
                </div>
            </div>
        </DashboardWrapper>
    );
};

export default ViewPatient;
