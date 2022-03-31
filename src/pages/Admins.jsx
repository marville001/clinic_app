import React from "react";
import DashboardWrapper from "../components/DashboardWrapper";
import Header from "../components/Header";
import SearchInput from "../components/SearchInput";

const Admins = () => {
    return (
        <DashboardWrapper>
            <Header title="Admins List" />
            <div className="p-4">
                <SearchInput />
            </div>
        </DashboardWrapper>
    );
};

export default Admins;
