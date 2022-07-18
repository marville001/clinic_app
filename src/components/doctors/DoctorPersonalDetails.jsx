import React from "react";
import { FaHouseUser, FaSpinner } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { STATIC_FILE_BASE } from "../../constants";
import { useSocket } from "../../contexts/socket.context";
import { updateDoctorAdminStatusAction } from "../../redux/actions/doctors.action";

const PatientPersonalDetails = () => {
    const { doctor, updatingIsAdmin } = useSelector(
        (state) => state.doctorsState
    );

    const dispatch = useDispatch();

    const { socket } = useSocket();

    const handleDoctorAdminStatus = async (status) => {
        const res = await dispatch(
            updateDoctorAdminStatusAction(status, doctor?._id)
        );

        let notif_data;

        if (status) {
            notif_data = {
                title: "You are an Admin",
                description: "You have been updated to an admin.",
                link: "",
                read: false,
            };
        } else {
            notif_data = {
                title: "Admin Status Revoked",
                description: "Your admin status has been revoked.",
                link: "",
                read: false,
            };
        }

        socket?.emit("new notification", {
            room: doctor?._id,
            notification: notif_data,
        });

        toast.success(`Admin Status Updates Successfully`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    };

    console.log(doctor);

    return (
        <div className="p-4 flex-[1] xl:flex-[2] rounded bg-white _shadow self-stfart relative">
            <h3 className="text-md mb-4 font-bold">Personal Information</h3>
            <img
                src={
                    doctor?.avatar?.startsWith("http")
                        ? doctor?.avatar
                        : `${STATIC_FILE_BASE}${doctor?.avatar}`
                }
                className="w-24 h-24 rounded-full object-cover absolute top-6 right-10"
                alt=""
            />
            <p className="text-sm my-2">{doctor?.bio}</p>

            <div className="flex w-3/4 my-5">
                <table className="w-full">
                    <thead className="text-left">
                        <tr className="border-b">
                            <td className="py-2 font-bold text-sm">
                                Full Name
                            </td>
                            <td className="py-2 text-sm">
                                {doctor?.firstname} {doctor?.lastname}
                            </td>
                        </tr>
                        <tr className="border-b">
                            <td className="py-2 text-sm font-bold">Mobile</td>
                            <td className="py-2  text-sm">
                                {doctor?.phone || "-"}
                            </td>
                        </tr>

                        <tr className="border-b">
                            <td className="py-2 text-sm font-bold">Email</td>
                            <td className="py-2  text-sm">
                                {doctor?.email || "-"}
                            </td>
                        </tr>

                        <tr className="border-b">
                            <td className="py-1 text-sm font-bold">Address</td>
                            <td className="py-1  text-sm">{doctor?.address}</td>
                        </tr>
                    </thead>
                </table>
            </div>

            <div className="flex items-center gap-6">
                <div className="flex flex-col text-sm space-y-2">
                    <div className="flex items-center space-x-2 text-sm">
                        <FaHouseUser className="text-flowerblue" />
                        <span>Department</span>
                    </div>
                    <h4 className="text-md opacity-80">
                        {doctor?.department?.name}
                    </h4>
                </div>

                <div className="flex flex-col gap-2">
                    <span
                        className={`bg-slate-200 text-center text-sm py-1 rounded-md ${
                            doctor?.isAdmin ? "text-seagreen" : "text-red-400"
                        }`}
                    >
                        {" "}
                        {doctor?.isAdmin ? "Admin" : "Not Admin"}{" "}
                    </span>

                    {!doctor?.isAdmin ? (
                        <div
                            onClick={() => handleDoctorAdminStatus(true)}
                            className="flex cursor-pointer items-center space-x-2 bg-seagreen py-1 px-6 rounded-md text-white  text-sm hover:opacity-75"
                        >
                            {updatingIsAdmin ? (
                                <FaSpinner className="animate-spin text-xl opacity-80" />
                            ) : (
                                <span>Make Admin</span>
                            )}
                        </div>
                    ) : (
                        <div
                            onClick={() => handleDoctorAdminStatus(false)}
                            className="flex cursor-pointer items-center space-x-2 bg-seagreen py-1 px-6 rounded-md text-white  text-sm hover:opacity-75"
                        >
                            {updatingIsAdmin ? (
                                <FaSpinner className="animate-spin text-xl opacity-80" />
                            ) : (
                                <span>Revoke Admin</span>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PatientPersonalDetails;
