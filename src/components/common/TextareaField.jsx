import React from "react";

const TextareaField = ({ errors, register, name = "", label, required, rows=4, optional=false }) => {
    return (
        <div className="flex flex-col flex-1">
            <label htmlFor="firstname" className="text-md mb-2">
                {label} {optional && "(optional)"}
            </label>
            <textarea
                rows={rows}
                placeholder={label + " :"}
                className={`text-sm w-full rounded-md mt-1 ${
                    errors[name] && "border-red-400 border"
                }`}
                {...register(name, {
                    required: {
                        value: required,
                        message: `${name} is required`,
                    },
                })}
            ></textarea>
            {errors[name] && (
                <p className="text-red-600 text-xs mt-1">
                    {errors[name].message}
                </p>
            )}
        </div>
    );
};

export default TextareaField;
