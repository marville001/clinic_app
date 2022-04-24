import React, { useEffect, useState } from "react";
import DashboardWrapper from "../components/DashboardWrapper";
import Header from "../components/Header";
import { useForm } from "react-hook-form";
import { FaSpinner } from "react-icons/fa";
import InputField from "../components/common/InputField";
import SelectField from "../components/common/SelectField";
import { gender } from "../constants";
import TextareaField from "../components/common/TextareaField";
import PasswordField from "../components/common/PasswordField";
import { useDispatch, useSelector } from "react-redux";
import { createDoctorAction } from "../redux/actions/doctors.action";
import { useNavigate } from "react-router-dom";
import { getDepartmentsAction } from "../redux/actions/departments.action";
const AddDoctor = () => {
    const { creating } = useSelector((state) => state.doctorsState);
    const { departments } = useSelector((state) => state.departmentsState);
    const { authDetails } = useSelector((state) => state.authState);

    const [error, setError] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleAddDoctor = async (data) => {
        setError("");

        const { password, ...rest } = data;

        const res = await dispatch(createDoctorAction(rest));

        if (!res.success) {
            setError(res.message);
            return;
        }

        reset();
        setError("")
        navigate("/doctors");
    };

    useEffect(() => {
        authDetails?._id && dispatch(getDepartmentsAction());
    }, [dispatch, authDetails?._id]);

    return (
        <DashboardWrapper>
            <Header title="Dashboard" />
            <div className="p-4  max-w-4xl mx-auto ">
                <div className="my-4 p-5 bg-white _shadow">
                    <h2 className="font-medium">Add Doctor</h2>
                </div>

                {error && (
                    <div className="text-center bg-red-200 rounded-md text-red-500 my-4 text-sm p-1">
                        {error}
                    </div>
                )}

                <div className="bg-white p-5 _shadow">
                    <form
                        onSubmit={handleSubmit(handleAddDoctor)}
                        autoComplete="off"
                    >
                        <div className="flex gap-5">
                            <InputField
                                errors={errors}
                                name="firstname"
                                label="Firstname"
                                register={register}
                                required={true}
                                type="text"
                            />
                            <InputField
                                errors={errors}
                                name="lastname"
                                label="Lastname"
                                register={register}
                                required={true}
                                type="text"
                            />
                        </div>

                        <div className="flex gap-5 mt-4">
                            <InputField
                                errors={errors}
                                name="username"
                                label="Username"
                                register={register}
                                required={true}
                                type="text"
                            />
                            <InputField
                                errors={errors}
                                name="email"
                                label="Email"
                                register={register}
                                required={true}
                                type="email"
                            />
                        </div>

                        <div className="flex gap-5 mt-4">
                            <SelectField
                                errors={errors}
                                name="gender"
                                label="Gender"
                                register={register}
                                required={true}
                                options={gender}
                            />
                            <SelectField
                                errors={errors}
                                name="department"
                                label="Department"
                                register={register}
                                required={true}
                                options={departments.map((dep) => {
                                    return {
                                        value: dep._id,
                                        label: dep.name,
                                    };
                                })}
                            />
                        </div>

                        <div className="flex gap-5 mt-4">
                            <InputField
                                errors={errors}
                                name="phone"
                                label="Phone Number"
                                register={register}
                                required={true}
                                type="text"
                            />
                            <InputField
                                errors={errors}
                                name="dob"
                                label="Date of Birth"
                                register={register}
                                required={true}
                                type="date"
                            />
                        </div>
                        <div className="flex gap-5 mt-4">
                            <PasswordField
                                errors={errors}
                                name="password"
                                label="Password"
                                register={register}
                                required={true}
                            />
                            <div className="flex-1"> </div>
                        </div>
                        <div className="flex gap-5 mt-4">
                            <TextareaField
                                errors={errors}
                                name="bio"
                                label="Doctors Bio"
                                register={register}
                                required={true}
                            />
                        </div>

                        <button
                            disabled={creating}
                            className="mt-6 bg-seagreen py-2 text-sm px-10 text-white rounded-md 
                            flex items-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {creating ? (
                                <>
                                    <FaSpinner className="animate-spin" />
                                    <span className="text-sm">Loading...</span>
                                </>
                            ) : (
                                <span>Submit</span>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </DashboardWrapper>
    );
};

export default AddDoctor;
