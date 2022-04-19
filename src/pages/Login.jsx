import React, { useState } from "react";
import { HiLockClosed } from "react-icons/hi";
import { FaSpinner, FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUserAction } from "../redux/actions/auth.action";

const Login = () => {
    const { authDetails } = useSelector((state) => state.authState);
    const [showPassword, setShowPassword] = useState(false);
    const [state, setState] = useState({
        error: "",
        loading: false,
    });
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const handleLogin = async (data) => {
        setState({ error: "", loading: true });
        const res = await dispatch(
            loginUserAction({
                email_username: data.username,
                password: data.password,
            })
        );
        if (!res.success) {
            setState({ error: res.message, loading: false });
            return;
        }
        setState({ error: "", loading: false });
        navigate("/home");
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
                    />
                </div>
                <div className="pb-8">
                    <div className="w-16 h-16 bg-slate-400 p-4 rounded-full translate-x-5 -translate-y-1/3"></div>
                    <form
                        onSubmit={handleSubmit(handleLogin)}
                        className="px-5 mt-5"
                    >
                        {state.error && (
                            <div className="bg-red-300 p-2 mb-2 text-center rounded text-sm text-red-800">
                                {state.error}
                            </div>
                        )}
                        <label
                            htmlFor="username"
                            className="mb-2 block text-sm"
                        >
                            Email or Username
                        </label>
                        <input
                            type="text"
                            className={`w-full border rounded ${
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

                        <label
                            htmlFor="password"
                            className="mb-2 block mt-5 text-sm"
                        >
                            Password
                        </label>
                        <div className="relative bg-red-200 rounded overflow-hidden">
                            <input
                                type={showPassword ? "text" : "password"}
                                className={`w-full border rounded ${
                                    errors.password && "border-red-400 border"
                                }`}
                                {...register("password", {
                                    required: {
                                        value: true,
                                        message: "Password is required",
                                    },
                                })}
                            />
                            <div className="bg-lightgray absolute rounded cursor-pointer inset-y-0 right-0 h-full w-10 flex items-center justify-center ">
                                {!showPassword ? (
                                    <FaEye
                                        onClick={() => setShowPassword(true)}
                                        className=" text-xl text-dimgray"
                                    />
                                ) : (
                                    <FaEyeSlash
                                        onClick={() => setShowPassword(false)}
                                        className=" text-xl text-dimgray"
                                    />
                                )}
                            </div>
                        </div>
                        {errors.password && (
                            <p className="text-red-600 text-xs mt-1">
                                {errors.password.message}
                            </p>
                        )}

                        <label
                            htmlFor="remember-me"
                            className="flex items-center space-x-4 my-5 text-sm"
                        >
                            <input
                                type="checkbox"
                                name=""
                                id=""
                                className="rounded"
                            />
                            <span>Remember me</span>
                        </label>
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

                        <Link
                            to="/forgot-password"
                            className="mt-6 text-sm flex items-center space-x-2 justify-center"
                        >
                            <HiLockClosed />
                            <span>Forgot your password?</span>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
