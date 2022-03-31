import React from "react";
import DashboardWrapper from "../components/DashboardWrapper";
import Header from "../components/Header";
import SearchInput from "../components/SearchInput";

const Secretaries = () => {
    return (
        <DashboardWrapper>
            <Header title="Secretaries" />
            <div className="p-4">
                <SearchInput />
            </div>
        </DashboardWrapper>
    );
};

export default Secretaries;
