import React from "react";

const SelectField = ({
    errors,
    register,
    name = "",
    label,
    required,
    options,
}) => {
    return (
        <div className="flex flex-col flex-1">
            <label htmlFor="firstname" className="text-sm">
                {label}
            </label>
            <select
                className={`text-sm w-full rounded-md mt-1 ${
                    errors[name] && "border-red-400 border"
                }`}
                {...register(name, {
                    required: {
                        value: required,
                        message: `${name} is required`,
                    },
                })}
            >
                <option value=""></option>
                {options.map(({ label, value }) => (
                    <option value={value}>{label}</option>
                ))}
            </select>
            {errors[name] && (
                <p className="text-red-600 text-xs mt-1">
                    {errors[name].message}
                </p>
            )}
        </div>
    );
};

export default SelectField;
