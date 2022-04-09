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
            <label htmlFor="firstname" className="text-md mb-2">
                {label}
            </label>
            <select
                placeholder={label}
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
                {/* <option value="" disabled>Select {label }</option> */}
                {options.map(({ label, value }) => (
                    <option key={value} value={value}>
                        {label}
                    </option>
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
