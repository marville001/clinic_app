import React, { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { putApi } from "../api";
import parseError from "../utils/parseError";
import { resetPasswordUrl } from "../constants";
import PasswordField from "../components/common/PasswordField";

const ResetPassword = () => {
    const [state, setState] = useState({
        error: "",
        loading: false,
        success: "",
    });
    // const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const { token } = useParams();
    const navigate = useNavigate();

    const handleReset = async (details) => {
        setState({ error: "", loading: true, success: "" });

        if (details.password !== details.cpassword) {
            setState({ error: "Passwords do not match" });
            return;
        }

        try {
            const { data } = await putApi(resetPasswordUrl(token), {
                password: details.password,
            });

            setState({ loading: false, success: data.message });

            reset();

            navigate("/");
        } catch (error) {
            setState({ error: parseError(error), loading: false });
        }
    };

    return (
        <div className="flex  p-4">
            <div className="w-full sm:w-[90%] md:w-[500px] rounded-md overflow-hidden mx-auto mt-20 bg-white max-w-[460px] _shadow">
                <div className="p-4 bg-burlywood bg-opacity-60 relative h-28">
                    <h2 className="mb-1 text-xl text-flowerblue font-bold">
                        Welcome Back!
                    </h2>
                    <p className="text-flowerblue">Reset Password</p>
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
                        {state.success && (
                            <div className="bg-green-200 text-sm my-4 p-2 rounded-lg text-center text-green-500">
                                {state.success}!
                            </div>
                        )}
                        <div className="my-3">
                            <PasswordField
                                errors={errors}
                                name="password"
                                label="New Password"
                                register={register}
                                required={true}
                            />
                        </div>
                        <div className="my-3">
                            <PasswordField
                                errors={errors}
                                name="cpassword"
                                label="Confirm Password"
                                register={register}
                                required={true}
                            />
                        </div>
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
                                    <span>Submit</span>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
