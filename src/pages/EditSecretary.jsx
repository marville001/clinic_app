import React, { useEffect, useState } from "react";
import DashboardWrapper from "../components/DashboardWrapper";
import Header from "../components/Header";
import { useForm } from "react-hook-form";
import { FaSpinner } from "react-icons/fa";
import InputField from "../components/common/InputField";
import SelectField from "../components/common/SelectField";
import { gender } from "../constants";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
    getSecretariesAction,
    getSecretaryAction,
    updateSecretaryAction,
} from "../redux/actions/secretaries.action";

const EditSecretary = () => {
    const {
        loadingSec: loading_sec,
        secretary,
        updating,
    } = useSelector((state) => state.secretariesState);

    const { authDetails } = useSelector((state) => state.authState);

    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { id } = useParams();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm();

    const handleEditSecretary = async (data) => {
        setError("");

        const res = await dispatch(updateSecretaryAction(data, secretary?._id));

        if (!res.success) {
            setError(res.message);
            return;
        }

        dispatch(getSecretariesAction());
        toast.success(`Secretary Updated Successfully`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
        navigate("/secretaries");
    };

    useEffect(() => {
        if (secretary?._id) {
            setValue("firstname", secretary?.firstname);
            setValue("lastname", secretary?.lastname);
            setValue("gender", secretary?.gender);
            setValue("phone", secretary?.phone);
            setValue("address", secretary?.address);
            setValue("status", secretary?.status);

            const temp_dob = secretary?.dob.slice(0, 10);
            setValue("dob", temp_dob);
        }
    }, [secretary, setValue]);

    useEffect(() => {
        authDetails?._id && dispatch(getSecretaryAction(id));
    }, [dispatch, authDetails?._id, id]);

    if (
        authDetails?._id &&
        authDetails?.role !== "admin" &&
        authDetails?.role !== "secretary" &&
        authDetails?.role === "doctor" &&
        !authDetails?.isAdmin
    ) {
        navigate("/home");
        return null;
    }

    return (
        <DashboardWrapper>
            <Header title="Dashboard" />
            <div className="p-4 max-w-4xl mx-auto ">
                <div className="my-4 p-5 bg-white _shadow">
                    <h2 className="font-medium">Edit Secretary</h2>
                </div>
                {error && (
                    <div className="text-center bg-red-200 rounded-md text-red-500 my-4 text-sm p-1">
                        {error}
                    </div>
                )}

                {loading_sec ? (
                    <div className="w-full flex pt-20 justify-center">
                        <FaSpinner className="text-3xl animate-spin" />
                    </div>
                ) : (
                    <div className="bg-white p-5 _shadow">
                        {secretary?._id ? (
                            <form onSubmit={handleSubmit(handleEditSecretary)}>
                                <div className="flex gap-5 mt-4">
                                    <InputField
                                        errors={errors}
                                        name="firstname"
                                        label="Firstname"
                                        register={register}
                                        required={true}
                                        type="text"
                                    />
                                    <InputField
                                        errors={errors}
                                        name="lastname"
                                        label="Lastname"
                                        register={register}
                                        required={true}
                                        type="text"
                                    />
                                </div>
                                <div className="flex gap-5 mt-4">
                                    <SelectField
                                        errors={errors}
                                        name="gender"
                                        label="Gender"
                                        register={register}
                                        required={true}
                                        options={gender}
                                    />
                                    <InputField
                                        errors={errors}
                                        name="dob"
                                        label="Date of Birth"
                                        register={register}
                                        required={true}
                                        type="date"
                                    />
                                </div>

                                <div className="flex gap-5 mt-4">
                                    <InputField
                                        errors={errors}
                                        name="phone"
                                        label="Phone Number"
                                        register={register}
                                        required={true}
                                        type="text"
                                    />
                                    <InputField
                                        errors={errors}
                                        name="address"
                                        label="Address"
                                        register={register}
                                        required={true}
                                        type="text"
                                    />
                                </div>

                                <div className="flex gap-5 mt-4">
                                    <SelectField
                                        errors={errors}
                                        name="status"
                                        label="Status"
                                        register={register}
                                        required={true}
                                        options={[
                                            {
                                                label: "Active",
                                                value: "active",
                                            },
                                            {
                                                label: "In Active",
                                                value: "inactive",
                                            },
                                        ]}
                                    />
                                    <div className="flex-1"></div>
                                </div>

                                <div className="flex justify-between items-center mt-8">
                                    <button
                                        disabled={updating}
                                        type="submit"
                                        className="disabled:opacity-50 disabled:cursor-not-allowed uppercase px-16
						 tracking-wider py-2 text-white text-lg rounded-md flex items-center
						 bg-seagreen
                     "
                                    >
                                        {updating ? (
                                            <>
                                                <FaSpinner className="animate-spin mr-4" />{" "}
                                                <span className="capitalize">
                                                    Loading...
                                                </span>
                                            </>
                                        ) : (
                                            <span>Update</span>
                                        )}
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <div className="flex justify-center py-20">
                                <h4 className="uppercase text-3xl font-bold text-center opacity-50">
                                    Secretary NOT FOUND
                                </h4>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </DashboardWrapper>
    );
};

export default EditSecretary;
