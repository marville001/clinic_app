import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaSpinner } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import InputField from "../common/InputField";
import Modal from "../common/Modal";
import SelectField from "../common/SelectField";

import { toast } from "react-toastify";
import { createContactAction } from "../../redux/actions/patients.action";
import { useParams } from "react-router-dom";

const AddPatientContactModal = ({
    isOpen = false,
    closeModal = () => {},
    loading,
}) => {
    const { contactType, creatingContact } = useSelector(
        (state) => state.patientsState
    );

    const [error, setError] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        clearErrors,
    } = useForm();

    const dispatch = useDispatch();

    const handleCloseModal = () => {
        reset();
        clearErrors();
        closeModal();
        setError("");
    };

    const {id} = useParams()

    const handleAddContact = async (data) => {
        setError("");
        console.log({ data });

        const { timeend, timestart, type, phone, ...rest } = data;

        const availability = `${timestart} - ${timeend}`;
        const phoneArr = phone.split(",");

        const res = await dispatch(
            createContactAction({
                ...rest,
                availability,
                phone: phoneArr,
                contacttype: type,
            }, id)
        );

        if (!res.success) {
            setError(res.message);
            return;
        }

        toast.success(`Contact Added Successfully`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
        handleCloseModal();
    };

    return (
        <Modal size="xl" isOpen={isOpen} closeModal={handleCloseModal}>
            <form
                onSubmit={handleSubmit(handleAddContact)}
                className="bg-white p-5 _shadow rounded-md"
            >
                <h4 className="text-center text-2xl text-slate-900 mb-6">
                    Add Contact
                </h4>

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
                        label="Lastame"
                        register={register}
                        required={true}
                        type="text"
                    />
                </div>

                <div className="flex gap-5 mt-4">
                    <SelectField
                        errors={errors}
                        name="type"
                        label="Contact Type"
                        register={register}
                        required={true}
                        options={contactType.map((type) => {
                            return {
                                value: type._id,
                                label: type.name,
                            };
                        })}
                    />

                    <InputField
                        errors={errors}
                        name="email"
                        label="Email"
                        register={register}
                        required={true}
                        type="email"
                    />
                </div>

                <div className="flex gap-5 mt-4">
                    <div className="flex flex-col flex-1">
                        <label className="text-md mb-1">Availability</label>
                        <div className="flex gap-1">
                            <InputField
                                errors={errors}
                                name="timestart"
                                register={register}
                                required={true}
                                type="time"
                                shortError
                            />
                            <span className="block mt-4">-</span>
                            <InputField
                                errors={errors}
                                name="timeend"
                                register={register}
                                required={true}
                                type="time"
                                shortError
                            />
                        </div>
                    </div>
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
                    <InputField
                        errors={errors}
                        name="phone"
                        label="Phone"
                        subLabel="separate with comma"
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
                        No
                    </button>
                    <button
                        disabled={creatingContact}
                        className="disabled:opacity-50 disabled:cursor-not-allowed uppercase px-16
						 tracking-wider py-2 text-white text-lg rounded-md flex items-center
						 bg-seagreen
                     "
                    >
                        {creatingContact ? (
                            <FaSpinner className="animate-spin mr-4" />
                        ) : (
                            "Add Contact"
                        )}
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default AddPatientContactModal;
