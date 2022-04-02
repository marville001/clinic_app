import React from "react";
import DashboardWrapper from "../components/DashboardWrapper";
import Header from "../components/Header";
import SearchInput from "../components/SearchInput";

const Appointments = () => {
    return (
        <DashboardWrapper>
            <Header title="Appointments List" />
            <div className="p-4">
                <SearchInput />
            </div>
        </DashboardWrapper>
    );
};

export default Appointments;
