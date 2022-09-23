import React, { useState, useEffect } from "react";
import DashboardWrapper from "../components/DashboardWrapper";
import Header from "../components/Header";
import { useForm } from "react-hook-form";
import { FaSpinner } from "react-icons/fa";
import InputField from "../components/common/InputField";
import SelectField from "../components/common/SelectField";
import { gender } from "../constants";
import Select from "react-select";
import AddDiagnosisModal from "../components/modals/AddDiagnosisModal";
import { useDispatch, useSelector } from "react-redux";
import { getDiagnosisAction } from "../redux/actions/diagnosis.action";
import { createPatientAction } from "../redux/actions/patients.action";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddPatient = () => {
    const { authDetails } = useSelector((state) => state.authState);
    const { creating } = useSelector((state) => state.patientsState);
    const { diagnosis } = useSelector((state) => state.diagnosisState);

    const [addModalOpen, setAddModalOpen] = useState(false);
    const [selectedDiagnosis, setSelectedDiagnosis] = useState([]);
    const [diag_err, setDiagerror] = useState("");
    const [error, setError] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const handleAddPatient = async (data) => {
        setDiagerror("");
        setError("");
        if (selectedDiagnosis?.length === 0) {
            setDiagerror("Diagnosis is Required");
            return;
        }

        const _diagnosis = selectedDiagnosis.map((d) => d.value);

        const details = { ...data, diagnosis: _diagnosis };

        const res = await dispatch(createPatientAction(details));

        if (!res.success) {
            setError(res.message);
            return;
        }

        toast.success(`Patient Added Successfully`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });

        reset();
        setError("");
        navigate("/patients");
    };

    useEffect(() => {
        authDetails?._id && dispatch(getDiagnosisAction());
    }, [dispatch, authDetails?._id]);

    if (
        authDetails?._id &&
        (authDetails?.role !== "admin" && authDetails?.role !== "secretary")
        && (authDetails?.role === "doctor" && !authDetails?.isAdmin)
    ) {
        navigate("/home");
        return null;
    }

    return (
        <DashboardWrapper>
            <Header title="Add Patient" />
            <div className="p-4  max-w-4xl mx-auto pb-48">
                <div className="my-4 p-5 bg-white _shadow">
                    <h2 className="font-medium">Add Patient</h2>
                </div>

                {error && (
                    <div className="text-center bg-red-200 rounded-md text-red-500 my-4 text-sm p-1">
                        {error}
                    </div>
                )}

                <div className="bg-white p-5 _shadow">
                    <form onSubmit={handleSubmit(handleAddPatient)}>
                        <div className="flex gap-5">
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
                                name="email"
                                label="Email"
                                register={register}
                                optional={true}
                                type="email"
                            />
                        </div>

                        <div className="flex gap-5 mt-4">
                            <InputField
                                errors={errors}
                                name="dob"
                                label="Date of Birth"
                                register={register}
                                required={true}
                                type="date"
                            />
                            <SelectField
                                errors={errors}
                                name="type"
                                label="Type"
                                register={register}
                                required={true}
                                options={[
                                    { value: "active", label: "Active" },
                                    { value: "inactive", label: "Inactive" },
                                    {
                                        value: "not-subscribed",
                                        label: "Not Subscribed",
                                    },
                                ]}
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
                                name="address"
                                label="Address"
                                register={register}
                                required={true}
                                type="text"
                            />
                        </div>

                        <div className="flex gap-4 mt-4">
                            <div className="flex-1">
                                <label
                                    htmlFor="firstname"
                                    className="text-md mb-2 block"
                                >
                                    Select Diagnosis
                                </label>
                                <Select
                                    placeholder="Select Diagnosis"
                                    isMulti
                                    value={selectedDiagnosis}
                                    onChange={(value) =>
                                        setSelectedDiagnosis(value)
                                    }
                                    options={diagnosis?.map((diag) => {
                                        return {
                                            value: diag._id,
                                            label: diag.name,
                                        };
                                    })}
                                />
                                {diag_err && (
                                    <p className="text-red-600 text-xs mt-1">
                                        {diag_err}
                                    </p>
                                )}
                            </div>
                            <button
                                type="button"
                                onClick={() => setAddModalOpen(true)}
                                className="text-seagreen self-end py-2 text-sm px-10 bg-white border border-seagreen rounded-md 
                            flex items-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                Add Diagnosis
                            </button>
                        </div>

                        <button
                            disabled={creating}
                            className="mt-6 bg-seagreen py-2 text-sm px-10 text-white rounded-md 
                            flex items-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {creating ? (
                                <>
                                    <FaSpinner className="animate-spin" />
                                    <span className="text-sm">Loading...</span>
                                </>
                            ) : (
                                <span>Submit</span>
                            )}
                        </button>
                    </form>
                </div>

                <AddDiagnosisModal
                    isOpen={addModalOpen}
                    closeModal={() => {
                        setAddModalOpen(false);
                    }}
                />
            </div>
        </DashboardWrapper>
    );
};

export default AddPatient;
