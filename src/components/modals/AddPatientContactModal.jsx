import React from "react";
import { useForm } from "react-hook-form";
import { FaSpinner } from "react-icons/fa";
import InputField from "../common/InputField";
import Modal from "../common/Modal";

const AddPatientContactModal = ({
    isOpen = false,
    closeModal = () => {},
    loading,
}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        clearErrors,
    } = useForm();

    const handleCloseModal = () => {
        reset();
        clearErrors();
        closeModal();
    };

    const handleAddContact = (data) => {
        console.log({ data });
    };

    return (
        <Modal
            title={"New Board"}
            size="xl"
            isOpen={isOpen}
            closeModal={handleCloseModal}
        >
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
                    <InputField
                        errors={errors}
                        name="type"
                        label="Contact Type"
                        register={register}
                        required={true}
                        type="text"
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
                        className="disabled:opacity-50 disabled:cursor-not-allowed uppercase px-16
						 tracking-wider py-2 text-white text-lg rounded-md flex items-center
						 bg-seagreen
                     "
                    >
                        {loading ? (
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