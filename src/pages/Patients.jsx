import React from "react";
import DashboardWrapper from "../components/DashboardWrapper";
import Header from "../components/Header";

const Patients = () => {
    return (
        <DashboardWrapper>
            <Header title="Patients" />
            <div className="p-4">
                <h4>Patients</h4>
            </div>
        </DashboardWrapper>
    );
};

export default Patients;
