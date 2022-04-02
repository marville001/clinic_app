import React from "react";
import {
    FaBed,
    FaCheckSquare,
    FaUserFriends,
    FaUserNurse,
    FaUserShield,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import PatientsByDepartmentChart from "../components/charts/PatientsByDepartmentChart";
import PatientsVisitByGenderChart from "../components/charts/PatientsVisitByGenderChart";
import DashCountCard from "../components/common/DashCountCard";
import DashboardWrapper from "../components/DashboardWrapper";
import Header from "../components/Header";

const AdminHome = () => {
    return (
        <DashboardWrapper>
            <Header title="Dashboard" />
            <div className="p-4">
                <h4 className="text-lg">Dashboard</h4>
                <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3  xl:grid-cols-5 my-5">
                    <DashCountCard icon={FaBed} count={444} text="Patients" />
                    <DashCountCard
                        icon={FaUserNurse}
                        count={20}
                        text="Doctors"
                    />
                    <DashCountCard
                        icon={FaUserFriends}
                        count={40}
                        text="Secretaries"
                    />
                    <DashCountCard
                        icon={FaCheckSquare}
                        count={125}
                        text="Appointments"
                    />
                    <DashCountCard
                        icon={FaUserShield}
                        count={5}
                        text="Admins"
                    />
                </div>

                {/* Charts */}
                <div className="my-6 grid gap-5 grid-cols-1 md:grid-cols-2 2xl:grid-cols-3">
                    <div className="p-4 bg-white 2xl:col-span-2 rounded-lg _shadow">
                        <div className="flex items-center justify-between w-full mb-5">
                            <p className="font-bold">
                                Patients visit by gender
                            </p>
                            <select
                                id=""
                                className="rounded-md border-[1px] border-lightgray"
                            >
                                <option value="2022">2022</option>
                                <option value="2021">2021</option>
                                <option value="2020">2020</option>
                                <option value="2019">2019</option>
                            </select>
                        </div>
                        <PatientsVisitByGenderChart />
                    </div>

                    <div className="p-4 bg-white rounded-lg _shadow">
                        <div className="flex items-center justify-between w-full mb-5">
                            <p className="font-bold">Patients by Department</p>
                            <select
                                id=""
                                className="rounded-md border-[1px] border-lightgray"
                            >
                                <option value="2022">2022</option>
                                <option value="2021">2021</option>
                                <option value="2020">2020</option>
                                <option value="2019">2019</option>
                            </select>
                        </div>
                        <PatientsByDepartmentChart />
                    </div>
                </div>

                {/* Samples */}
                <div className="grid gap-2 grid-cols-1 lg:grid-cols-2">
                    <div className="p-4 py-6 bg-white rounded-lg _shadow">
                        <div className="flex items-center justify-between w-full mb-5">
                            <p className="font-bold">Latest Appointments</p>
                            <Link
                                to="/appointments"
                                className="text-flowerblue"
                            >
                                View All
                            </Link>
                        </div>
                    </div>

                    <div className="p-4 bg-white rounded-lg _shadow">
                        <div className="flex items-center justify-between w-full mb-5">
                            <p className="font-bold">
                                Patients visit by gender
                            </p>
                            <select
                                id=""
                                className="rounded-md border-[1px] border-lightgray"
                            >
                                <option value="2022">2022</option>
                                <option value="2021">2021</option>
                                <option value="2020">2020</option>
                                <option value="2019">2019</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardWrapper>
    );
};

export default AdminHome;
