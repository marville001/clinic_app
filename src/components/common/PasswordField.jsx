import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const PasswordField = ({
    errors,
    register,
    name = "",
    label,
    labelColor,
    required,
    optional = false,
}) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="flex flex-col flex-1">
            <label
                style={{ color: labelColor ? labelColor : "" }}
                htmlFor="firstname"
                className="text-md mb-1"
            >
                {label} {optional && "(optional)"}
            </label>
            <div className="relative w-full h-10 mt-1">
                <input
                    type={showPassword?"text":"password"}
                    placeholder={label + " :"}
                    className={`text-sm w-full rounded-md ${
                        errors[name] && "border-red-400 border"
                    }`}
                    {...register(name, {
                        required: {
                            value: required,
                            message: `${name} is required`,
                        },
                    })}
                />
                <div className="absolute inset-y-0 right-2 top-1/2 -translate-y-1/2 flex justify-center items-center cursor-pointer">
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

            {errors[name] && (
                <p className="text-red-600 text-xs mt-1">
                    {errors[name].message}
                </p>
            )}
        </div>
    );
};

export default PasswordField;
