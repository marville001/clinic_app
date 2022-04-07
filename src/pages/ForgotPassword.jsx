import React, { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
    const [state, setState] = useState({
        error: "",
        loading: false,
    });
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const handleReset = (data) => {
        setState({ error: "", loading: true });
        try {
            setTimeout(() => {
                setState({ ...state, loading: false });
                navigate("/home");
            }, 4000);
        } catch (error) {
            setState({ error: error.message, loading: false });
        }
    };

    return (
        <div className="flex  p-4">
            <div className="w-full sm:w-[90%] md:w-[500px] rounded-md overflow-hidden mx-auto mt-20 bg-white max-w-[460px] _shadow">
                <div className="p-4 bg-burlywood bg-opacity-60 relative h-28">
                    <h2 className="mb-1 text-xl text-flowerblue font-bold">
                        Welcome Back!
                    </h2>
                    <p className="text-flowerblue">sign in to continue</p>
                    <img
                        src="/assets/profile-img.png"
                        className="hidden sm:block absolute bottom-0 w-48 h-28 right-5"
                        alt=""
                        srcset=""
                    />
                </div>
                <div className="pb-8">
                    <div className="w-16 h-16 bg-slate-400 p-4 rounded-full translate-x-5 -translate-y-1/3"></div>
                    <form
                        onSubmit={handleSubmit(handleReset)}
                        className="px-5 mt-5"
                    >
                        {state.error && (
                            <div className="bg-red-300 p-2 text-center rounded text-sm text-red-800">
                                {state.error}
                            </div>
                        )}
                        <label
                            htmlFor="username"
                            className="mb-2 block text-sm"
                        >
                            Email
                        </label>
                        <input
                            type="text"
                            className={`w-full border rounded ${
                                errors.email && "border-red-400 border"
                            }`}
                            {...register("email", {
                                required: {
                                    value: true,
                                    message: "email is required",
                                },
                            })}
                        />
                        {errors.email && (
                            <p className="text-red-600 text-xs mt-1">
                                {errors.email.message}
                            </p>
                        )}
                        <div className="flex justify-end">
                            <button
                                disabled={state.loading}
                                className="
						mt-6 bg-seagreen py-2 px-10 flex justify-center 
						items-center space-x-2 text-white rounded
						disabled:cursor-not-allowed disabled:opacity-80 hover:scale-[1.01]
						transition-all ease-in-out duration-150"
                            >
                                {state.loading ? (
                                    <>
                                        <FaSpinner className="animate-spin" />
                                        <span className="text-sm">
                                            Loading...
                                        </span>
                                    </>
                                ) : (
                                    <span>Reset</span>
                                )}
                            </button>
                        </div>

                        <Link
                            to="/"
                            className="mt-6 text-sm flex items-center space-x-2 justify-center"
                        >
                            <span>Go back to Login</span>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
