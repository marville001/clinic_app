import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaSpinner } from "react-icons/fa";
import { useDispatch } from "react-redux";
import InputField from "../common/InputField";
import Modal from "../common/Modal";
import TextareaField from "../common/TextareaField";

import { toast } from "react-toastify";
import {
    createAppointmentAction,
    getAppointmentsAction,
} from "../../redux/actions/appointments.action";
import { useSocket } from "../../contexts/socket.context";

const AddAppointmentModal = ({
    isOpen,
    closeModal = () => {},
    doctorId = "",
    startDate = "",
    endDate = "",
    startTime = "",
    endTime = "",
}) => {
    const [error, setError] = useState("");

    const [allDay, setAllDay] = useState(false);
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        clearErrors,
        reset,
        setValue,
    } = useForm();

    const dispatch = useDispatch();

    const { socket } = useSocket();

    const handleCloseModal = () => {
        closeModal();
        clearErrors();
        reset();
        setAllDay(false);
    };

    const handleAddDepartment = async (data) => {
        setError("");
        setLoading(true);
        const res = await dispatch(
            createAppointmentAction({ ...data, allDay, doctorId })
        );
        setLoading(false);

        if (!res.success) {
            setError(res.message);
            return;
        }

        let notif_data = {
            title: "New Appointment",
            description: `You have a new appointment at ${data.startDate}.`,
            link: "",
            read: false,
        };

        socket?.emit("new notification", {
            room: doctorId,
            notification: notif_data,
        });

        dispatch(getAppointmentsAction(doctorId));
        toast.success(`Appointment Added Successfully`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });

        handleCloseModal();
    };

    useEffect(() => {
        setValue("timeFrom", startTime ? startTime : "08:00");
        setValue("timeTo", endTime ? endTime : "08:45");
    }, [setValue, startTime, endTime]);

    useEffect(() => {
        setValue(
            "startDate",
            startDate
                ? startDate
                : new Date().toISOString().toString().slice(0, 10)
        );
        setValue(
            "endDate",
            endDate ? endDate : new Date().toISOString().toString().slice(0, 10)
        );
    }, [setValue, startDate, endDate]);

    return (
        <Modal size="3xl" isOpen={isOpen} closeModal={handleCloseModal}>
            <form
                onSubmit={handleSubmit(handleAddDepartment)}
                className="bg-white p-5 _shadow rounded-md"
            >
                <h4 className="text-center text-2xl text-slate-900 uppercase mb-6">
                    Add Appointment
                </h4>
                {error && (
                    <div className="text-center bg-red-200 rounded-md text-red-500 my-4 text-sm p-1">
                        {error}
                    </div>
                )}

                <div className="flex gap-5 mt-4">
                    <InputField
                        errors={errors}
                        name="title"
                        label="Title"
                        register={register}
                        required={true}
                        type="text"
                        inputClasses="border-0 border-b focus:ring-0 rounded-none bg-gray-100"
                    />
                </div>

                <div className="flex gap-5 mt-6 items-end relative">
                    <div className="flex justify-end items-center gap-2 absolute -top-2 right-2">
                        <input
                            type="checkbox"
                            checked={allDay}
                            onChange={(e) => {
                                setAllDay(e.target.checked);
                                if (!e.target.checked) {
                                    setValue("endDate", "");
                                }
                            }}
                            className="ring-0 focus:ring-0 active:ring-0 "
                        />{" "}
                        All Day
                    </div>
                    <InputField
                        errors={errors}
                        name="startDate"
                        label="Appointment Date"
                        register={register}
                        required={true}
                        shortError
                        type="date"
                        min={new Date().toISOString().toString().slice(0, 10)}
                        inputClasses="border-0 border-b focus:ring-0 rounded-none bg-gray-100"
                    />

                    {allDay ? (
                        <>
                            <p>{"->"}</p>
                            <InputField
                                errors={errors}
                                name="endDate"
                                register={register}
                                required={true}
                                type="date"
                                shortError
                                min={new Date()
                                    .toISOString()
                                    .toString()
                                    .slice(0, 10)}
                                inputClasses="border-0 border-b focus:ring-0 rounded-none bg-gray-100"
                            />
                        </>
                    ) : (
                        <div className="flex-[2] flex gap-2 items-end">
                            <InputField
                                errors={errors}
                                name="timeFrom"
                                register={register}
                                required={true}
                                type="time"
                                shortError
                                defaultValue="08:00"
                                inputClasses="border-0 border-b focus:ring-0 rounded-none bg-gray-100"
                            />
                            <p>to</p>
                            <InputField
                                errors={errors}
                                name="timeTo"
                                register={register}
                                required={true}
                                type="time"
                                defaultValue="08:45"
                                shortError
                                inputClasses="border-0 border-b focus:ring-0 rounded-none bg-gray-100"
                            />
                        </div>
                    )}
                </div>
                <div className="flex gap-5 mt-4">
                    <TextareaField
                        errors={errors}
                        name="description"
                        label="Description"
                        register={register}
                        required={true}
                        type="text"
                    />
                </div>
                <div className="flex justify-between items-center mt-8">
                    <button
                        type="button"
                        onClick={handleCloseModal}
                        className="bg-salmon rind-0 border-0 outline-none text-white py-2 px-5 rounded-md"
                    >
                        Cancel
                    </button>
                    <button
                        disabled={loading}
                        type="submit"
                        className="disabled:opacity-50 disabled:cursor-not-allowed uppercase px-16
						 tracking-wider py-2 text-white text-lg rounded-md flex items-center
						 bg-seagreen
                     "
                    >
                        {loading ? (
                            <>
                                <FaSpinner className="animate-spin mr-4" />{" "}
                                <span className="capitalize">Loading...</span>
                            </>
                        ) : (
                            <span>Create</span>
                        )}
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default AddAppointmentModal;
