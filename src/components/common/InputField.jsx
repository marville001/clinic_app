import React from "react";

const InputField = ({
    errors,
    register,
    name = "",
    label,
    labelColor,
    required,
    type = "text",
    optional = false,
    subLabel = "",
    shortError,
    inputClasses="",
    ...props
}) => {
    return (
        <div className="flex flex-col flex-1">
            <label
                style={{ color: labelColor ? labelColor : "" }}
                className="text-md mb-1"
            >
                {label} {optional && "(optional)"}{" "}
                <span className="text-sm">{subLabel && ` - ${subLabel}`}</span>
            </label>
            <input
                type={type}
                placeholder={label + " :"}
                className={`text-sm w-full rounded-md mt-1 ${
                    errors[name] && "border-red-400 border"
                } ${inputClasses}`}
                {...register(name, {
                    required: {
                        value: required,
                        message: `${name} is required`,
                    },
                })}
                {...props}
            />
            {errors[name] && (
                <p className="text-red-600 text-xs mt-1">
                    {shortError ? "Required" : errors[name].message}
                </p>
            )}
        </div>
    );
};

export default InputField;
