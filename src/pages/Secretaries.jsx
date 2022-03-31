import React from "react";
import DashboardWrapper from "../components/DashboardWrapper";
import Header from "../components/Header";

const Secretaries = () => {
    return (
        <DashboardWrapper>
            <Header title="Secretaries" />
            <div className="p-4">
                <h4>Secretaries</h4>
            </div>
        </DashboardWrapper>
    );
};

export default Secretaries;
