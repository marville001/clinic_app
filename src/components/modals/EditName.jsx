import React, { useEffect, useState } from "react";
import { HiUserAdd } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { FaSpinner } from "react-icons/fa";
import Modal from "../common/Modal";

const EditName = ({
  isOpen,
  actionMethod = () => {},
  message = "",
  closeModal = () => {},
  loading,
}) => {
  const { authDetails } = useSelector((state) => state.authState);

  const [name, setName] = useState("");
  const editName = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  useEffect(() => {
    setName(authDetails.username);
  }, [isOpen]);

  return (
    <div className="bg-white p-5 _shadow rounded-md">
      <div className="flex flex-col">
        <label htmlFor="name">Edit Name*</label>
        <input
          type="text"
          value={name}
          placeholder={name}
          onChange={(e) => editName(e)}
        />
      </div>
      <div className="flex justify-around items-center mt-8">
        <button
          onClick={closeModal}
          className="bg-salmon rind-0 border-0 outline-none text-white py-2 px-5 rounded-md"
        >
          No
        </button>
        <button
          onClick={() => actionMethod(name)}
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

export default EditName;
