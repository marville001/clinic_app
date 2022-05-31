import React, { useEffect, useState } from "react";
import { HiUserAdd } from "react-icons/hi";
import { useForm } from "react-hook-form";

import { useDispatch, useSelector } from "react-redux";
import { FaSpinner } from "react-icons/fa";
import Modal from "../common/Modal";
import { toast } from "react-toastify";

const EditPassword = ({
  isOpen,
  actionMethod = () => {},
  message = "",
  closeModal = () => {},
  loading,
}) => {
  const [cpassword, setCpassword] = useState("");
  const [npassword, setNpassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const { authDetails } = useSelector((state) => state.authState);
  const editPassword = () => {
    if (npassword !== confirm) {
      setError("Passwords do not match");
    } else {
      handleEditPassword(cpassword, confirm);
    }
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    reset,
    setValue,
  } = useForm();
  const handleCloseModal = () => {
    closeModal();
    clearErrors();
    setError();
    reset();
  };

  const handleEditPassword = async (password) => {
    console.log(password);
    // const res = await dispatch(deleteDoctorAction(deleteDoctor?._id));
    // if (!res.success) {
    //   toast.error(res.message, {
    //     position: "top-right",
    //     autoClose: 5000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //   });
    //   setNameModalOpen(false);
    //   return;

    toast.success(`Password Updated Successfully`, {
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
    <div className="bg-white p-5 _shadow rounded-md">
      <h4 className="text-center text-2xl text-slate-900 mb-6">
        Please Confirm Delete
      </h4>
      <div className="my-5">
        <p>{message}</p>
      </div>
      <div className="flex flex-col">
        <label htmlFor="">Enter current password</label>
        <input
          type="password"
          required
          onChange={(e) => setCpassword(e.target.value)}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="newpassword">Enter new password</label>
        <input
          type="password"
          required
          onChange={(e) => setNpassword(e.target.value)}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="confirmpassword">Confirm new password</label>{" "}
        <input
          type="password"
          required
          onChange={(e) => setConfirm(e.target.value)}
        />{" "}
        <p className="text-red-500 text-xs">{error}</p>
      </div>
      <div className="flex justify-between items-center mt-8">
        <button
          onClick={closeModal}
          className="bg-salmon rind-0 border-0 outline-none text-white py-2 px-5 rounded-md"
        >
          No
        </button>
        <button
          onClick={() => editPassword()}
          className="disabled:opacity-50 disabled:cursor-not-allowed uppercase px-16
                            tracking-wider py-2 text-white text-lg rounded-md flex items-center
                            bg-seagreen
                        "
        >
          {loading ? <FaSpinner className="animate-spin mr-4" /> : "Yes"}
        </button>
      </div>
    </div>
  );
};

export default EditPassword;
