import React, { useState } from "react";
import DashboardWrapper from "../components/DashboardWrapper";
import Header from "../components/Header";
import { useForm } from "react-hook-form";
import { FaSpinner } from "react-icons/fa";
import InputField from "../components/common/InputField";
import SelectField from "../components/common/SelectField";
import { departments, gender } from "../constants";
const EditPatient = () => {
    const [state, setState] = useState({
        error: "",
        loading: false,
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const handleEditPatient = (data) => {
        console.log(data);
        setState({ error: "", loading: true });
        try {
            setTimeout(() => {
                setState({ ...state, loading: false });
            }, 4000);
        } catch (error) {
            setState({ error: error.message, loading: false });
        }
    };

    return (
        <DashboardWrapper>
            <Header title="Dashboard" />
            <div className="p-4">
                <div className="bg-white max-w-2xl mx-auto p-5">
                    <h2>Edit Patient</h2>
                    <div className="h-[2px] w-full bg-slate-900 my-4 opacity-20" />

                    <form onSubmit={handleSubmit(handleEditPatient)}>
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
                                name="phone"
                                label="Phone Number"
                                register={register}
                                required={true}
                                type="text"
                            />
                            <InputField
                                errors={errors}
                                name="email"
                                label="Email"
                                register={register}
                                optional={true}
                                type="email"
                            />
                        </div>

                        <div className="flex gap-5 mt-4">
                            <InputField
                                errors={errors}
                                name="age"
                                label="Age"
                                register={register}
                                required={true}
                                type="number"
                            />
                            <InputField
                                errors={errors}
                                name="status"
                                label="Status"
                                register={register}
                                required={true}
                                type="text"
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
                                options={departments}
                            />
                        </div>

                        <div className="flex gap-5 mt-4">
                            <InputField
                                errors={errors}
                                name="address"
                                label="Address"
                                register={register}
                                required={true}
                                type="text"
                            />
                            <div className="flex-1"></div>
                        </div>

                        <button
                            disabled={state.loading}
                            className="mt-6 bg-seagreen py-2 text-sm px-10 text-white rounded-md 
                            flex items-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {state.loading ? (
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

export default EditPatient;
