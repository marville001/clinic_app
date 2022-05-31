import React, { useEffect, useState } from "react";
import {
    FaBed,
    FaCheckSquare,
    FaUserFriends,
    FaUserNurse,
    FaUserShield,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import PatientsByDepartmentChart from "../components/charts/PatientsByDepartmentChart";
import PatientsVisitByGenderChart from "../components/charts/PatientsVisitByGenderChart";
import CalendarGrid from "../components/common/CalendarGrid";
import DashCountCard from "../components/common/DashCountCard";
import DashboardWrapper from "../components/DashboardWrapper";
import Header from "../components/Header";
import { getAdminsAction } from "../redux/actions/admins.action";
import { getAppointmentsAction } from "../redux/actions/appointments.action";
import { getDoctorsAction } from "../redux/actions/doctors.action";
import { getPatientsAction } from "../redux/actions/patients.action";
import { getSecretariesAction } from "../redux/actions/secretaries.action";
import { parseAppointments } from "../utils/calendar";

const AdminHome = () => {
    const { authDetails } = useSelector((state) => state.authState);
    const { patients } = useSelector((state) => state.patientsState);
    const { doctors } = useSelector((state) => state.doctorsState);
    const { secretaries } = useSelector((state) => state.secretariesState);
    const { admins } = useSelector((state) => state.adminsState);
    const { appointments } = useSelector((state) => state.appointmentsState);

    const [appoints, setAppoints] = useState([]);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

    const [patientsByGender, setPatientsByGender] = useState([
        { name: "Male", data: [0, 0, 0, 30, 0, 0, 0, 0, 0, 0, 0, 0] },
        { name: "Female", data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
        { name: "Children", data: [0, 0, 0, 0, 40, 0, 0, 0, 0, 0, 0, 0] },
    ]);

    const dispatch = useDispatch();

    useEffect(() => {
        if (authDetails?._id) {
            dispatch(getDoctorsAction());
            dispatch(getPatientsAction());
            dispatch(getSecretariesAction());
            dispatch(getAdminsAction());
        }
    }, [dispatch, authDetails?._id]);

    useEffect(() => {
        if (authDetails?._id && authDetails?.role === "doctor") {
            dispatch(getAppointmentsAction(authDetails?._id));
        }
    }, [dispatch, authDetails]);

    useEffect(() => {
        setAppoints(parseAppointments(appointments));
    }, [appointments]);

    useEffect(() => {
        const monthNames = [
            "Jan",
            "Feby",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ];

        const filtered_patients = patients
            .map((patient) => {
                let dob = new Date(patient.dob).getFullYear();
                let date = new Date(parseInt(patient.createdAt));
                let year = date.getFullYear();
                let month = date.getMonth() + 1;
                return {
                    gender: patient.gender,
                    year,
                    month: monthNames[month],
                    age: new Date().getFullYear() - dob,
                };
            })
            .filter((p) => p.year === parseInt(selectedYear));

        const filtered_male_patients = monthNames.map((month) => {
            const males_for_month = filtered_patients.filter(
                (p) => p.month === month && p.gender === "male"
            );

            return males_for_month.length;
        });

        const filtered_female_patients = monthNames.map((month) => {
            const females_for_month = filtered_patients.filter(
                (p) => p.month === month && p.gender === "female"
            );

            return females_for_month.length;
        });

        const filtered_children_patients = monthNames.map((month) => {
            const childrens_for_month = filtered_patients.filter(
                (p) => p.month === month && p.age < 18
            );

            return childrens_for_month.length;
        });

        const filters = [
            { name: "Male", data: filtered_male_patients },
            { name: "Female", data: filtered_female_patients },
            { name: "Children", data: filtered_children_patients },
        ];

        setPatientsByGender(filters)
    }, [patients, selectedYear]);

    return (
        <DashboardWrapper>
            <Header title="Dashboard" />
            <div className="p-4">
                <h4 className="text-lg">Dashboard</h4>
                <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3  xl:grid-cols-5 my-5">
                    <DashCountCard
                        icon={FaBed}
                        count={patients?.length}
                        text="Patients"
                    />
                    <DashCountCard
                        icon={FaUserNurse}
                        count={doctors?.length}
                        text="Doctors"
                    />
                    <DashCountCard
                        icon={FaUserFriends}
                        count={secretaries?.length}
                        text="Secretaries"
                    />
                    {authDetails?.role === "doctor" && (
                        <DashCountCard
                            icon={FaCheckSquare}
                            count={appointments?.length}
                            text="Appointments"
                        />
                    )}
                    <DashCountCard
                        icon={FaUserShield}
                        count={admins?.length}
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
                                value={selectedYear}
                                onChange={(e) =>
                                    setSelectedYear(e.target.value)
                                }
                                className="rounded-md border-[1px] border-lightgray"
                            >
                                <option value="2023">2023</option>
                                <option value="2022">2022</option>
                                <option value="2021">2021</option>
                            </select>
                        </div>
                        <PatientsVisitByGenderChart
                            patients={patientsByGender}
                        />
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

                {/* Calendar */}
                {authDetails?.role === "doctor" && (
                    <div className="w-full my-8 bg-white p-5 _shadow">
                        <h2 className="text-xl font-bold mb-6">My Calendar</h2>
                        <CalendarGrid
                            appointments={appoints}
                            doctorId={authDetails?._id}
                        />
                    </div>
                )}
            </div>
        </DashboardWrapper>
    );
};

export default AdminHome;
