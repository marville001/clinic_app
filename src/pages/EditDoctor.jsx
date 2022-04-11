import React, { useEffect, useState } from "react";
import DashboardWrapper from "../components/DashboardWrapper";
import Header from "../components/Header";
import { useForm } from "react-hook-form";
import { FaSpinner } from "react-icons/fa";
import InputField from "../components/common/InputField";
import SelectField from "../components/common/SelectField";
import { departments, gender } from "../constants";
import TextareaField from "../components/common/TextareaField";
const EditDoctor = () => {
    const [state, setState] = useState({
        error: "",
        loading: false,
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm();

    const handleEditDoctor = (data) => {
        setState({ error: "", loading: true });
        try {
            setTimeout(() => {
                setState({ ...state, loading: false });
            }, 4000);
        } catch (error) {
            setState({ error: error.message, loading: false });
        }
    };

    useEffect(() => {
        setValue("gender", "female");
        setValue("firstname", "Martin");
        setValue("lastname", "Mwangi");
        setValue("username", "mwas");
        setValue("email", "mwas@gmail.com");
        setValue("phone", "+24542332323");
        setValue("dob", "1998-04-26");
        setValue("bio", "lorem ipsum num herum sopum");
    }, [setValue]);

    return (
        <DashboardWrapper>
            <Header title="Dashboard" />
            <div className="p-4 max-w-4xl mx-auto ">
                <div className="my-4 p-5 bg-white _shadow">
                    <h2 className="font-medium">Edit Doctor</h2>
                </div>
                <div className="bg-white p-5 _shadow">
                    <form onSubmit={handleSubmit(handleEditDoctor)}>
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
                                options={departments}
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
                            <TextareaField
                                errors={errors}
                                name="bio"
                                label="Doctors Bio"
                                register={register}
                                required={true}
                            />
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

export default EditDoctor;
