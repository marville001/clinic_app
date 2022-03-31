import React from "react";
import DashboardWrapper from "../components/DashboardWrapper";
import Header from "../components/Header";
import SearchInput from "../components/SearchInput";

const Patients = () => {
    return (
        <DashboardWrapper>
            <Header title="Patients" />
            <div className="p-4">
                <SearchInput />
            </div>
        </DashboardWrapper>
    );
};

export default Patients;
