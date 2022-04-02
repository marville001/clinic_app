import React, { useState } from "react";
import { FaUserEdit } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import DashboardWrapper from "../components/DashboardWrapper";
import Header from "../components/Header";
import PatientAccountDetails from "../components/PatientAccountDetails";
import PatientFiles from "../components/PatientFiles";

const ViewPatient = () => {
    const [active, setActive] = useState("account");

    const { id } = useParams();

    return (
        <DashboardWrapper>
            <Header title="ViewPatient" />
            <div className="max-w-4xl mx-auto py-5">
                <div className="bg-white _shadow p-4 my-4">
                    <div className="flex justify-between items-center">
                        <div className="flex space-x-4 items-center">
                            <div
                                onClick={() => setActive("account")}
                                className={`cursor-pointer ${
                                    active === "account" &&
                                    "border-seagreen border-b-2"
                                }`}
                            >
                                Account
                            </div>
                            <div
                                onClick={() => setActive("files")}
                                className={`cursor-pointer ${
                                    active === "files" &&
                                    "border-seagreen border-b-2"
                                }`}
                            >
                                Files
                            </div>
                            <div
                                onClick={() => setActive("comments")}
                                className={`cursor-pointer ${
                                    active === "comments" &&
                                    "border-seagreen border-b-2"
                                }`}
                            >
                                Comments
                            </div>
                        </div>
                        <Link
                            to={`/patients/${id}/edit`}
                            className="flex items-center space-x-2 py-2 px-6 rounded-md text-seagreen  text-sm hover:opacity-75"
                        >
                            <FaUserEdit />
                            <span>Edit Patient</span>
                        </Link>
                    </div>
                </div>

                {active === "account" && <PatientAccountDetails id={id} />}
                {active === "files" && <PatientFiles id={id} />}
            </div>
        </DashboardWrapper>
    );
};

export default ViewPatient;
