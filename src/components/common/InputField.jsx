import React from "react";

const InputField = ({ errors, register, name = "", label, required, type }) => {
    return (
        <div className="flex flex-col flex-1">
            <label htmlFor="firstname" className="text-sm">
                {label}
            </label>
            <input
                type={type}
                className={`text-sm w-full rounded-md mt-1 ${
                    errors[name] && "border-red-400 border"
                }`}
                {...register(name, {
                    required: {
                        value: required,
                        message: `${name} is required`,
                    },
                })}
            />
            {errors[name] && (
                <p className="text-red-600 text-xs mt-1">
                    {errors[name].message}
                </p>
            )}
        </div>
    );
};

export default InputField;
