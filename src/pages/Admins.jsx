import React from "react";
import DashboardWrapper from "../components/DashboardWrapper";
import Header from "../components/Header";

const Admins = () => {
    return (
        <DashboardWrapper>
            <Header title="Admins List" />
            <div className="p-4">
                <h4>Admins</h4>
            </div>
        </DashboardWrapper>
    );
};

export default Admins;
