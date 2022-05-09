import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaSearch, FaSpinner } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { gender } from "../../constants";
import InputField from "../common/InputField";
import Modal from "../common/Modal";
import PasswordField from "../common/PasswordField";
import SelectField from "../common/SelectField";

import { toast } from "react-toastify";
import {
    createAdminAction,
    getAdminsAction,
} from "../../redux/actions/admins.action";

const NewChatModal = ({ isOpen, closeModal = () => {} }) => {
    const { creating } = useSelector((state) => state.adminsState);

    const [chatWith, setChatWith] = useState("Admin");
    const [search, setSearch] = useState("");

    const dispatch = useDispatch();

    const handleClose = () => {
        closeModal()
        setChatWith("Admin")
        setSearch("")
    }

    const handleAddAdmin = async (data) => {
        const res = await dispatch(createAdminAction(data));

        if (!res.success) {
            return;
        }

        dispatch(getAdminsAction());
        toast.success(`Admin Added Successfully`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    };

    const handleSearch = async (e) => {
        e.preventDefault();
    }

    return (
        <Modal size="lg" isOpen={isOpen} closeModal={handleClose}>
            <div className="bg-white p-5 _shadow rounded-md">
                <h4 className="text-center text-2xl text-slate-900 uppercase mb-6">
                    New Chat
                </h4>

                <p>Chat with</p>
                <div className="flex gap-2">
                    <button
                        type="button"
                        onClick={() => setChatWith("Admin")}
                        className={`flex-1 py-2 text-white rounded-lg ${chatWith ==="Admin" ? "bg-steelblue":"bg-flowerblue"}`}
                    >
                        Admin
                    </button>
                    <button
                        type="button"
                        onClick={() => setChatWith("Doctor")}
                        className={`flex-1 py-2 text-white rounded-lg ${chatWith ==="Doctor" ? "bg-steelblue":"bg-flowerblue"}`}
                    >
                        Doctor
                    </button>
                    <button
                        type="button"
                        onClick={() => setChatWith("Secretary")}
                        className={`flex-1 py-2 text-white rounded-lg ${chatWith ==="Secretary" ? "bg-steelblue":"bg-flowerblue"}`}
                    >
                        Secretary
                    </button>
                </div>

                <form onSubmit={handleSearch} className="w-full my-5 flex items-center h-10 gap-2">
                    <input value={search} onChange={e=>setSearch(e.target.value)} setSearch={setSearch} type="text" className="w-full rounded-lg" placeholder={`Search ${chatWith} ...`} />
                    <button type="submit" className="p-2 cursor-pointer bg-flowerblue text-lg h-full rounded-lg text-white  flex items-center justify-center w-12">
                        <FaSearch />
                    </button>
                </form>

                <div className="max-h-48">

                </div>

                <div className="flex justify-between items-center mt-8">
                    <button
                        type="button"
                        onClick={handleClose}
                        className="bg-salmon rind-0 border-0 outline-none text-white py-2 px-5 rounded-md"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default NewChatModal;
