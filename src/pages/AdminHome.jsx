import React, { useEffect, useState } from "react";
import {
    FaBed,
    FaCheckSquare,
    FaUserFriends,
    FaUserNurse,
    FaUserShield,
} from "react-icons/fa";
import { HiPlusCircle } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import AllAppointmentCalendar from "../components/AllAppointmentCalendar";
import PatientsByDepartmentChart from "../components/charts/PatientsByDepartmentChart";
import PatientsVisitByGenderChart from "../components/charts/PatientsVisitByGenderChart";
import CalendarGrid from "../components/common/CalendarGrid";
import DashCountCard from "../components/common/DashCountCard";
import DashboardWrapper from "../components/DashboardWrapper";
import Header from "../components/Header";
import AddAppointmentModal from "../components/modals/AddAppointmentModal";
import { getAdminsAction } from "../redux/actions/admins.action";
import { getAppointmentsAction } from "../redux/actions/appointments.action";
import { getDepartmentsAction } from "../redux/actions/departments.action";
import {
    getDoctorAssignedPatientsAction,
    getDoctorsAction,
} from "../redux/actions/doctors.action";
import { getPatientsAction } from "../redux/actions/patients.action";
import { getSecretariesAction } from "../redux/actions/secretaries.action";
import { parseAppointments } from "../utils/calendar";

const AdminHome = () => {
    const { authDetails } = useSelector((state) => state.authState);
    const { patients } = useSelector((state) => state.patientsState);
    const { departments } = useSelector((state) => state.departmentsState);
    const { doctors, assignedPatients } = useSelector(
        (state) => state.doctorsState
    );
    const { secretaries } = useSelector((state) => state.secretariesState);
    const { admins } = useSelector((state) => state.adminsState);
    const { appointments } = useSelector((state) => state.appointmentsState);

    const [appoints, setAppoints] = useState([]);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [addAppointmentModalOpen, setAddAppointmentModalOpen] =
        useState(false);
    const [patientsByDeptValues, setPatientsByDeptValues] = useState([]);
    const [patientsByDeptLabels, setPatientsByDeptLabels] = useState([]);

    const [patientsByGender, setPatientsByGender] = useState([
        { name: "Male", data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
        { name: "Female", data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
        { name: "Children", data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
    ]);

    const dispatch = useDispatch();

    useEffect(() => {
        if (authDetails?._id) {
            dispatch(getDoctorsAction());
            dispatch(getPatientsAction());
            dispatch(getSecretariesAction());
            dispatch(getAdminsAction());
            dispatch(getDepartmentsAction());
            authDetails?.role === "doctor" &&
                dispatch(getDoctorAssignedPatientsAction(authDetails?._id));
        }
    }, [dispatch, authDetails?._id, authDetails?.role]);

    useEffect(() => {
        if (authDetails?._id) {
            dispatch(
                getAppointmentsAction(
                    authDetails?._id,
                    authDetails?.role === "doctor" ? "" : "all"
                )
            );
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

        setPatientsByGender(filters);
    }, [patients, selectedYear]);

    useEffect(() => {
        const deps = [...new Set(patients.map((p) => p.department))];
        const values = deps.map((dep) => {
            const value = patients.filter((p) => p.department === dep)?.length;
            return Math.round((value / patients.length) * 100);
        });
        const labels = deps.map(
            (dep) => departments.find((d) => d._id === dep || "")?.name
        );
        setPatientsByDeptValues(values);
        setPatientsByDeptLabels(labels);
    }, [departments, patients]);

    return (
        <DashboardWrapper>
            <Header title="Dashboard" />
            <div className="p-4">
                <h4 className="text-lg">Dashboard</h4>

                {(authDetails?.role === "admin" ||
                    authDetails?.role === "secretary") && (
                    <>
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

                            <DashCountCard
                                icon={FaUserShield}
                                count={admins?.length}
                                text="Admins"
                            />

                            <DashCountCard
                                icon={FaUserShield}
                                count={departments?.length}
                                text="Departments"
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
                                    <p className="font-bold">
                                        Patients by Department
                                    </p>
                                </div>
                                <PatientsByDepartmentChart
                                    labels={patientsByDeptLabels}
                                    values={patientsByDeptValues}
                                />
                            </div>
                        </div>
                    </>
                )}

                {authDetails?.role === "doctor" && (
                    <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3  xl:grid-cols-5 my-5">
                        <DashCountCard
                            icon={FaBed}
                            count={assignedPatients?.length}
                            text="Patients Assigned"
                        />
                        <DashCountCard
                            icon={FaCheckSquare}
                            count={appointments?.length}
                            text="Appointments"
                        />
                    </div>
                )}

                {/* Calendar */}
                {authDetails?.role === "doctor" && (
                    <div className="w-full my-8 bg-white p-5 _shadow">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold mb-6">
                                My Calendar
                            </h2>
                            <div
                                onClick={() => setAddAppointmentModalOpen(true)}
                                className="flex cursor-pointer items-center space-x-2 bg-seagreen py-2 px-6 rounded-md text-white  text-sm hover:opacity-75"
                            >
                                <HiPlusCircle />
                                <span>add Appointment</span>
                            </div>
                        </div>
                        <CalendarGrid
                            appointments={appoints}
                            doctorId={authDetails?._id}
                        />
                    </div>
                )}

                {(authDetails?.role === "admin" ||
                    authDetails?.role === "secretary") && (
                    <AllAppointmentCalendar appointments={appoints}  />
                )}
            </div>
            <AddAppointmentModal
                isOpen={addAppointmentModalOpen}
                closeModal={() => {
                    setAddAppointmentModalOpen(false);
                }}
                doctorId={authDetails?._id}
            />
        </DashboardWrapper>
    );
};

export default AdminHome;
