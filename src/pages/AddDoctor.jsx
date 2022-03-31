import React, { useState } from "react";
import DashboardWrapper from "../components/DashboardWrapper";
import Header from "../components/Header";
import { useForm } from "react-hook-form";
import { FaSpinner } from "react-icons/fa";
import InputField from "../components/common/InputField";
const AddDoctor = () => {
    const [state, setState] = useState({
        error: "",
        loading: false,
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const handleAddDoctor = (data) => {
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
                    <h2>Add Doctor</h2>
                    <div className="h-[2px] w-full bg-slate-900 my-4 opacity-20" />

                    <form onSubmit={handleSubmit(handleAddDoctor)}>
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

export default AddDoctor;
