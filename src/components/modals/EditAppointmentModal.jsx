import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaSpinner } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import InputField from "../common/InputField";
import Modal from "../common/Modal";
import TextareaField from "../common/TextareaField";

import { toast } from "react-toastify";
import {
    deleteAppointmentAction,
    getAppointmentsAction,
    updateAppointmentAction,
} from "../../redux/actions/appointments.action";

const EditAppointmentModal = ({
    isOpen,
    closeModal = () => {},
    selectedId = "",
    doctorId,
}) => {
    const { appointments, updating, deleting } = useSelector(
        (state) => state.appointmentsState
    );

    const [error, setError] = useState("");
    const [allDay, setAllDay] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        clearErrors,
        reset,
        setValue,
    } = useForm();

    const dispatch = useDispatch();

    const handleCloseModal = () => {
        closeModal();
        clearErrors();
        reset();
        setAllDay(false);
    };

    const handleUpdateAppointment = async (data) => {
        setError("");
        const res = await dispatch(
            updateAppointmentAction({ ...data, allDay, doctorId }, selectedId)
        );

        if (!res.success) {
            setError(res.message);
            return;
        }

        dispatch(getAppointmentsAction(doctorId));
        toast.success(`Appointment Updated Successfully`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });

        handleCloseModal();
    };

    const handleDeleteAppointment = async () => {
        setError("");
        const res = await dispatch(deleteAppointmentAction(selectedId));

        if (!res.success) {
            setError(res.message);
            return;
        }

        dispatch(getAppointmentsAction(doctorId));
        toast.success(`Appointment Deleted Successfully`, {
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
        console.log(selectedId, appointments);

        const appointment = appointments.find(
            (appointment) => appointment._id === selectedId
        );

        if (appointment) {
            setValue("title", appointment.title);
            setValue("description", appointment.description);
            setValue(
                "startDate",
                new Date(appointment.startDate)
                    .toISOString()
                    .toString()
                    .slice(0, 10)
            );
            setValue(
                "endDate",
                new Date(appointment.endDate)
                    .toISOString()
                    .toString()
                    .slice(0, 10)
            );
            setValue("timeFrom", appointment.timeFrom);
            setValue("timeTo", appointment.timeTo);
            setAllDay(appointment.allDay);
        }
    }, [selectedId, appointments, setValue]);

    return (
        <Modal size="3xl" isOpen={isOpen} closeModal={()=>{}}>
            <form
                onSubmit={handleSubmit(handleUpdateAppointment)}
                className="bg-white p-5 _shadow rounded-md"
            >
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
                        disabled={deleting || updating}
                        className="bg-salmon disabled:cursor-not-allowed  bg-opacity-70 rind-0 border-0 outline-none text-white py-2 px-5 rounded-md"
                    >
                        Cancel
                    </button>

                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={handleDeleteAppointment}
                            disabled={deleting || updating}
                            className="disabled:opacity-50 disabled:cursor-not-allowed bg-salmon rind-0 flex items-center border-0 outline-none text-white py-2 px-5 rounded-md"
                        >
                            {deleting ? (
                                <>
                                    <FaSpinner className="animate-spin mr-4" />{" "}
                                    <span className="capitalize">
                                        Loading...
                                    </span>
                                </>
                            ) : (
                                <span>Delete</span>
                            )}
                        </button>
                        <button
                            disabled={deleting || updating}
                            type="submit"
                            className="disabled:opacity-50 disabled:cursor-not-allowed uppercase px-8
						 tracking-wider py-2 text-white text-lg rounded-md flex items-center
						 bg-seagreen
                     "
                        >
                            {updating ? (
                                <>
                                    <FaSpinner className="animate-spin mr-4" />{" "}
                                    <span className="capitalize">
                                        Loading...
                                    </span>
                                </>
                            ) : (
                                <span>Update</span>
                            )}
                        </button>
                    </div>
                </div>
            </form>
        </Modal>
    );
};

export default EditAppointmentModal;
