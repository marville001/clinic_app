import React from "react";
import DashboardWrapper from "../components/DashboardWrapper";
import Header from "../components/Header";

const AdminHome = () => {
    return (
        <DashboardWrapper>
            <Header title="Dashboard" />
            <div className="p-4">
                <h4>Admin home</h4>
            </div>
        </DashboardWrapper>
    );
};

export default AdminHome;
