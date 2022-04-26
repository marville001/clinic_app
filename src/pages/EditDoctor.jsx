import React, { useEffect, useState } from "react";
import DashboardWrapper from "../components/DashboardWrapper";
import Header from "../components/Header";
import { useForm } from "react-hook-form";
import { FaSpinner } from "react-icons/fa";
import InputField from "../components/common/InputField";
import SelectField from "../components/common/SelectField";
import { gender } from "../constants";
import TextareaField from "../components/common/TextareaField";
import {
  getDoctorAction,
  updateDoctorAction,
} from "../redux/actions/doctors.action";
import { getDepartmentsAction } from "../redux/actions/departments.action";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditDoctor = () => {
  const {
    loading: loading_doc,
    updating,
    doctor,
  } = useSelector((state) => state.doctorsState);

  const { authDetails } = useSelector((state) => state.authState);
  const { departments, loading: loading_dpt } = useSelector(
    (state) => state.departmentsState
  );
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

  const handleEditDoctor = async (data) => {
    setError("");
    const res = await dispatch(updateDoctorAction(data, doctor?._id));

    if (!res.success) {
      setError(res.message);
      return;
    }
    toast.success(`Doctor Updated Successfully`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    navigate("/doctors");
  };

  useEffect(() => {
    if (doctor?._id) {
      setValue("firstname", doctor?.firstname);
      setValue("lastname", doctor?.lastname);
      setValue("email", doctor?.email);
      setValue("gender", doctor?.gender);
      setValue("phone", doctor?.phone);
      setValue("username", doctor?.username);
      setValue("bio", doctor?.bio);
      setValue("address", doctor?.address);

      const temp_dob = doctor?.dob.slice(0, 10);
      setValue("dob", temp_dob);
      setValue("department", doctor?.department?._id);
    }
  }, [doctor, setValue, departments]);

  useEffect(() => {
    authDetails?._id && dispatch(getDoctorAction(id));
    authDetails?._id && dispatch(getDepartmentsAction());
  }, [dispatch, authDetails?._id, id]);

  return (
    <DashboardWrapper>
      <Header title="Dashboard" />
      <div className="p-4 max-w-4xl mx-auto ">
        <div className="my-4 p-5 bg-white _shadow">
          <h2 className="font-medium">Edit Doctor</h2>
        </div>
        {error && (
          <div className="text-center bg-red-200 rounded-md text-red-500 my-4 text-sm p-1">
            {error}
          </div>
        )}

        {loading_doc || loading_dpt ? (
          <div className="w-full flex pt-20 justify-center">
            <FaSpinner className="text-3xl animate-spin" />
          </div>
        ) : (
          <div className="bg-white p-5 _shadow">
            {doctor?._id ? (
              <form onSubmit={handleSubmit(handleEditDoctor)}>
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
                    name="username"
                    label="Username"
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
                  <SelectField
                    errors={errors}
                    name="gender"
                    label="Gender"
                    register={register}
                    required={true}
                    options={gender}
                  />
                  <SelectField
                    errors={errors}
                    name="department"
                    label="Department"
                    register={register}
                    required={true}
                    options={departments.map((dep) => {
                      return {
                        value: dep._id,
                        label: dep.name,
                      };
                    })}
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
                    name="address"
                    label="Address"
                    register={register}
                    required={true}
                    type="text"
                  />
                  <div className="flex-1 p-2"></div>
                </div>

                <div className="flex gap-5 mt-4">
                  <TextareaField
                    errors={errors}
                    name="bio"
                    label="Doctors Bio"
                    register={register}
                    required={true}
                  />
                </div>

                <button
                  disabled={updating}
                  className="mt-6 bg-seagreen py-2 text-sm px-10 text-white rounded-md 
                            flex items-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {updating ? (
                    <>
                      <FaSpinner className="animate-spin" />
                      <span className="text-sm">Loading...</span>
                    </>
                  ) : (
                    <span>Submit</span>
                  )}
                </button>
              </form>
            ) : (
              <div className="flex justify-center py-20">
                <h4 className="uppercase text-3xl font-bold text-center opacity-50">
                  DOCTOR NOT FOUND
                </h4>
              </div>
            )}
          </div>
        )}
      </div>
    </DashboardWrapper>
  );
};

export default EditDoctor;
