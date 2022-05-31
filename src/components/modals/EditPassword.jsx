import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";
import { HiUserAdd } from "react-icons/hi";
import { changeUserPassword } from "../../redux/actions/auth.action";
const EditPassword = ({ message = "", closeModal = () => {} }) => {
  const { authDetails, loading } = useSelector((state) => state.authState);
  const [cpassword, setCpassword] = useState("");
  const [npassword, setNpassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const editPassword = () => {
    if (npassword === "" || confirm === "" || cpassword === "") {
      setError("Enter all fields");
    } else if (npassword !== confirm) {
      setError("Passwords do not match");
    } else {
      handleEditPassword({
        current: cpassword,
        previous: confirm,
        email: authDetails?.email,
      });
    }
  };

  const handleEditPassword = async (password) => {
    const res = await dispatch(
      changeUserPassword(password, authDetails?.email)
    );
    if (!res.success) {
      toast.error(res.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      return;
    }
    toast.success(`Password Updated Successfully`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    closeModal();
  };

  return (
    <div className="bg-white p-5 _shadow rounded-md">
      <div className="my-5">
        <p>{message}</p>
      </div>
      <div className="flex flex-col">
        <label htmlFor="">Enter current password</label>
        <input
          type="password"
          onChange={(e) => setCpassword(e.target.value)}
          required
        />
      </div>
      <div className="flex mt-2">
        <div className="flex flex-col mr-2">
          <label htmlFor="newpassword">Enter new password</label>
          <input
            type="password"
            required
            onChange={(e) => setNpassword(e.target.value)}
          />
        </div>
        <div className="flex flex-col ml-2">
          <label htmlFor="confirmpassword">Confirm new password</label>{" "}
          <input
            type="password"
            required
            onChange={(e) => setConfirm(e.target.value)}
          />{" "}
          <p className="text-red-500 text-xs">{error}</p>
        </div>
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
          className="disabled:opacity-50 disabled:cursor-not-allowed uppercase px-5
                            tracking-wider py-2 text-white text-lg rounded-md flex items-center
                            bg-seagreen
                        "
        >
          {loading ? <FaSpinner className="animate-spin mr-4" /> : "Yes"}
        </button>
      </div>
      <div className="flex mt-10 justify-between flex-row">
        <p>Can't remember password?</p>
        <Link
          to="/forgot-password"
          className="text-sm flex items-center space-x-2 justify-center"
        >
          <div
            className={
              "flex items-center space-x-2 py-2 text-xs px-6 rounded-md bg-white text-seagreen hover:opacity-75 cursor-pointer h-fit w-fit border-2 border-seagreen"
            }
          >
            <HiUserAdd />
            <span>Reset via email</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default EditPassword;
