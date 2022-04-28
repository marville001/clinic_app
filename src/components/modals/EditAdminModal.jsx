import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaSpinner } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { gender } from "../../constants";
import InputField from "../common/InputField";
import Modal from "../common/Modal";
import SelectField from "../common/SelectField";

import { toast } from "react-toastify";
import { getAdminsAction, updateAdminAction } from "../../redux/actions/admins.action";

const EditAdminModal = ({ isOpen, closeModal = () => {}, admin = {} }) => {
    const { updating: updating_adm } = useSelector(
        (state) => state.adminsState
    );
    const [error, setError] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors },
        clearErrors,
        reset,
        setValue,
    } = useForm();

    const dispatch = useDispatch();

    const handleCloseModal = () => {
        closeModal();
        clearErrors();
        setError();
        reset();
        dispatch(getAdminsAction());
    };

    const handleEditAdmin = async (data) => {
        setError("");

        const res = await dispatch(updateAdminAction(data, admin?._id));

        if (!res.success) {
            setError(res.message);
            return;
        }
        toast.success(`Admin Updated Successfully`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
        handleCloseModal();
    };

    useEffect(() => {
        if (admin?._id) {
            setValue("firstname", admin?.firstname);
            setValue("lastname", admin?.lastname);
            setValue("gender", admin?.gender);
            setValue("phone", admin?.phone);
            setValue("address", admin?.address);

            const temp_dob = admin?.dob ? admin?.dob.slice(0, 10) : "";
            setValue("dob", temp_dob);
        }
    }, [admin, setValue]);

    return (
        <Modal size="xl" isOpen={isOpen} closeModal={handleCloseModal}>
            <form
                onSubmit={handleSubmit(handleEditAdmin)}
                className="bg-white p-5 _shadow rounded-md"
            >
                <h4 className="text-center text-2xl text-slate-900 uppercase mb-6">
                    Edit Admin
                </h4>
                {error && (
                    <div className="text-center bg-red-200 rounded-md text-red-500 my-4 text-sm p-1">
                        {error}
                    </div>
                )}
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

                <div className="flex justify-between items-center mt-8">
                    <button
                        type="button"
                        onClick={handleCloseModal}
                        className="bg-salmon rind-0 border-0 outline-none text-white py-2 px-5 rounded-md"
                    >
                        Cancel
                    </button>
                    <button
                        disabled={updating_adm}
                        type="submit"
                        className="disabled:opacity-50 disabled:cursor-not-allowed uppercase px-16
						 tracking-wider py-2 text-white text-lg rounded-md flex items-center
						 bg-seagreen
                     "
                    >
                        {updating_adm ? (
                            <>
                                <FaSpinner className="animate-spin mr-4" />{" "}
                                <span className="capitalize">Loading...</span>
                            </>
                        ) : (
                            <span>Update</span>
                        )}
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default EditAdminModal;
