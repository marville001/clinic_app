import React from "react";
import DashboardWrapper from "../components/DashboardWrapper";
import Header from "../components/Header";

const Doctors = () => {
    return (
        <DashboardWrapper>
            <Header title="Doctors" />
            <div className="p-4">
            <h4>Doctors</h4>
            </div>
        </DashboardWrapper>
    );
};

export default Doctors;
