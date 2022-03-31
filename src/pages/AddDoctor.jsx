import React, { useState } from "react";
import DashboardWrapper from "../components/DashboardWrapper";
import Header from "../components/Header";
import { useForm } from "react-hook-form";
import { FaSpinner } from "react-icons/fa";
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
                            <div className="flex flex-col flex-1">
                                <label htmlFor="firstname" className="text-sm">
                                    Firstname
                                </label>
                                <input
                                    type="text"
                                    className={`text-sm w-full rounded-md mt-1 ${
                                        errors.firstname &&
                                        "border-red-400 border"
                                    }`}
                                    {...register("firstname", {
                                        required: {
                                            value: true,
                                            message: "Firstname is required",
                                        },
                                    })}
                                />
                                {errors.firstname && (
                                    <p className="text-red-600 text-xs mt-1">
                                        {errors.firstname.message}
                                    </p>
                                )}
                            </div>
                            <div className="flex flex-col flex-1">
                                <label htmlFor="firstname" className="text-sm">
                                    Lastname
                                </label>
                                <input
                                    type="text"
                                    className={`text-sm w-full rounded-md mt-1 ${
                                        errors.lastname &&
                                        "border-red-400 border"
                                    }`}
                                    {...register("lastname", {
                                        required: {
                                            value: true,
                                            message: "Lastname is required",
                                        },
                                    })}
                                />
                                {errors.lastname && (
                                    <p className="text-red-600 text-xs mt-1">
                                        {errors.lastname.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="flex gap-5 mt-4">
                            <div className="flex flex-col flex-1">
                                <label htmlFor="firstname" className="text-sm">
                                    Username
                                </label>
                                <input
                                    type="text"
                                    className={`text-sm w-full rounded-md mt-1 ${
                                        errors.username &&
                                        "border-red-400 border"
                                    }`}
                                    {...register("username", {
                                        required: {
                                            value: true,
                                            message: "Username is required",
                                        },
                                    })}
                                />
                                {errors.username && (
                                    <p className="text-red-600 text-xs mt-1">
                                        {errors.username.message}
                                    </p>
                                )}
                            </div>
                            <div className="flex flex-col flex-1">
                                <label htmlFor="firstname" className="text-sm">
                                    Email
                                </label>
                                <input
                                    type="text"
                                    className={`text-sm w-full rounded-md mt-1 ${
                                        errors.email && "border-red-400 border"
                                    }`}
                                    {...register("email", {
                                        required: {
                                            value: true,
                                            message: "Email is required",
                                        },
                                    })}
                                />
                                {errors.email && (
                                    <p className="text-red-600 text-xs mt-1">
                                        {errors.email.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        <button className="mt-6 bg-seagreen py-2 text-sm px-10 text-white rounded-md flex items-center space-x-2">
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
