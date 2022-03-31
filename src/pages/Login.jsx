import React, { useState } from "react";
import { HiPlusSm } from "react-icons/hi";
import { FaSpinner } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [state, setState] = useState({
        error: "",
        loading: false,
    });
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const handleLogin = (data) => {
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
        <div>
            <form
                onSubmit={handleSubmit(handleLogin)}
                className="w-full sm:w-[350px] mx-auto my-10"
            >
                <h2 className="flex items-center justify-center mb-5">
                    <HiPlusSm className="text-4xl text-seagreen font-bold" />
                    <span className="text-slate-900">Clinic Name</span>
                </h2>
                <div className="bg-lightgray p-4 rounded-xl">
                    <h2 className="font-light font-sans text-2xl uppercase tracking-wider text-center mb-6">
                        Please SIgn in
                    </h2>
                    {state.error && (
                        <div className="bg-red-300 p-2 text-center rounded text-sm text-red-800">
                            {state.error}
                        </div>
                    )}
                    <input
                        type="text"
                        placeholder="Username"
                        className={`w-full mt-4 border-0 rounded ${
                            errors.username && "border-red-400 border"
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
                    <input
                        type="password"
                        placeholder="Password"
                        className={`w-full mt-4 border-0 rounded ${
                            errors.password && "border-red-400 border"
                        }`}
                        {...register("password", {
                            required: {
                                value: true,
                                message: "Password is required",
                            },
                        })}
                    />
                    {errors.password && (
                        <p className="text-red-600 text-xs mt-1">
                            {errors.password.message}
                        </p>
                    )}
                    <button
                        disabled={state.loading}
                        className="
						mt-6 bg-seagreen w-full py-2 flex justify-center 
						items-center space-x-2 text-white rounded
						disabled:cursor-not-allowed disabled:opacity-80 hover:scale-[1.01]
						transition-all ease-in-out duration-150"
                    >
                        {state.loading ? (
                            <>
                                <FaSpinner className="animate-spin" />
                                <span className="text-sm">Loading...</span>
                            </>
                        ) : (
                            <span>Sign in</span>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Login;
