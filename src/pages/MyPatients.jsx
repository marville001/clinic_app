import React, { useEffect } from "react";
import { FaBed, FaEye, FaSpinner } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import DashCountCard from "../components/common/DashCountCard";
import DashboardWrapper from "../components/DashboardWrapper";
import Header from "../components/Header";
import { getDepartmentsAction } from "../redux/actions/departments.action";
import { getDoctorAssignedPatientsAction } from "../redux/actions/doctors.action";


const MyPatients = () => {
    const { authDetails } = useSelector((state) => state.authState);
    const { loadingAssignedPatients, assignedPatients } = useSelector((state) => state.doctorsState);
    const { departments } = useSelector((state) => state.departmentsState);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const showType = (type) => {
        if (type === "active") return "Active";

        if (type === "inactive") return "Inactive";

        return "Not Subscribed";
    };

    useEffect(() => {
        authDetails?._id && dispatch(getDoctorAssignedPatientsAction(authDetails?._id));
        authDetails?._id && dispatch(getDepartmentsAction());
    }, [dispatch, authDetails?._id]);

    if (authDetails?._id && authDetails?.role !== "doctor") {
        navigate("/home");
        return null;
    }

    return (
        <DashboardWrapper>
            <Header title="Assigned Patients" />
            <div className="p-4">
                <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3  xl:grid-cols-5 my-5">
                    <DashCountCard
                        icon={FaBed}
                        count={assignedPatients?.length}
                        text="Patients Assigned"
                    />
                </div>
            </div>

            <div className="p-4">
                <div className="relative overflow-x-auto shadow-md rounded-md bg-white">
                    <table className="w-full text-sm text-left">
                        <thead className="text-md bg-dimgray text-white">
                            <tr>
                                <th className="px-6 py-4">#</th>
                                <th className="px-6 py-4">First Name</th>
                                <th className="px-6 py-4">Last Name</th>
                                <th className="px-6 py-4">Gender</th>
                                <th className="px-6 py-4">DOB</th>
                                <th className="px-6 py-4">Address</th>
                                <th className="px-6 py-4">Phone Number</th>
                                <th className="px-6 py-4">Department</th>
                                <th className="px-6 py-4">Type</th>
                                <th className="px-6 py-4">
                                    <span className="sr-only">Action</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {assignedPatients?.map((patient, idx) => (
                                <tr
                                    key={patient?._id}
                                    className="group border-b "
                                >
                                    <td className="px-6 py-4 font-bold">
                                        {idx + 1}
                                    </td>
                                    <td className="px-6 py-4">
                                        {patient?.firstname}
                                    </td>
                                    <td className="px-6 py-4">
                                        {patient?.lastname}
                                    </td>
                                    <td className="px-6 py-4 capitalize">
                                        {patient?.gender}
                                    </td>
                                    <td className="px-6 py-4">
                                        {new Date(patient?.dob).toDateString()}
                                    </td>
                                    <td className="px-6 py-4">
                                        {patient?.address}
                                    </td>
                                    <td className="px-6 py-4">
                                        {patient?.phone}
                                    </td>
                                    <td className="px-6 py-4">
                                        {departments?.find(
                                            (dep) =>
                                                dep?._id === patient?.department
                                        )?.name || "-"}
                                    </td>
                                    <td className="px-6 py-4">
                                        {showType(patient?.type)}
                                    </td>
                                    <td className="px-6  py-4 text-right flex justify-end items-center space-x-1">
                                        <Link
                                            className="
                                                flex items-center space-x-1 bg-seagreen text-white 
                                                text-xs p-2 rounded-full hover:opacity-90 
                                                hover:scale-[1.02] "
                                            to={`/assigned-patients/${patient?._id}`}
                                        >
                                            <FaEye />
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {assignedPatients.length === 0 && (
                        <div className="py-10 text-center text-2xl font-bold uppercase opacity-70">
                            <h4>No Assigned Patient Yet</h4>
                        </div>
                    )}

                    {loadingAssignedPatients && (
                        <div className="py-4 flex justify-center">
                            <FaSpinner className="animate-spin  text-lg text-slate-900" />
                        </div>
                    )}
                </div>
            </div>
        </DashboardWrapper>
    );
};

export default MyPatients;
