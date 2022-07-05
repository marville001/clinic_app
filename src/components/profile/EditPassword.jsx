import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";
import { changeUserPasswordAction } from "../../redux/actions/auth.action";
import { forgotPasswordUrl } from "../../constants";
import { postApi } from "../../api";
const EditPassword = () => {
    const { authDetails } = useSelector((state) => state.authState);

    const [cpassword, setCpassword] = useState("");
    const [npassword, setNpassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [error, setError] = useState("");

    const [loading, setLoading] = useState({
        update: false,
        reset: false,
    });

    const dispatch = useDispatch();

    const editPassword = () => {
        if (
            npassword.length < 8 ||
            confirm.length < 8 ||
            cpassword.length < 8
        ) {
            setError("Passwords should be atleast 8 characters");
            return;
        }
        if (npassword === "" || confirm === "" || cpassword === "") {
            setError("Enter all fields");
            return;
        }

        if (npassword !== confirm) {
            setError("Passwords do not match");
            return;
        }

        setError("");
        handleEditPassword({
            old_password: cpassword,
            new_password: npassword,
            email: authDetails?.email,
        });
    };

    const handleCancel = () => {
        setConfirm("");
        setCpassword("");
        setNpassword("");
    };

    const handleEditPassword = async (details) => {
        const res = await dispatch(changeUserPasswordAction(details));
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
        handleCancel();
    };

    const handleReset = async () => {
        try {
            setLoading((prev) => ({ ...prev, reset: true }));
            await postApi(forgotPasswordUrl, {
                email: authDetails?.email,
            });
            setLoading((prev) => ({ ...prev, reset: false }));

            toast.success(`Reset link sent to your email`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        } catch (error) {
            setLoading((prev) => ({ ...prev, reset: false }));
        }
    };

    return (
        <div className="">
            {error && (
                <div className="mb-5 bg-red-300 text-red-600 text-center py-2 rounded-md">
                    <p>{error}</p>
                </div>
            )}
            <div className="flex mt-5 md:mt-0 flex-col gap-5 sm:flex-row">
                <div className="flex flex-col">
                    <label htmlFor="">Enter current password</label>
                    <input
                        type="password"
                        value={cpassword}
                        onChange={(e) => setCpassword(e.target.value)}
                        placeholder="Enter current password"
                        className="mt-2 w-full"
                    />
                    <div></div>
                </div>
            </div>
            <div className="flex mt-5 flex-col gap-5 sm:flex-row">
                <div className="flex flex-col">
                    <label htmlFor="newpassword">Enter new password</label>
                    <input
                        type="password"
                        placeholder="Enter new password"
                        value={npassword}
                        onChange={(e) => setNpassword(e.target.value)}
                        className="mt-2"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="confirmpassword">
                        Confirm new password
                    </label>{" "}
                    <input
                        type="password"
                        placeholder="Confirm new password"
                        value={confirm}
                        onChange={(e) => setConfirm(e.target.value)}
                        className="mt-2"
                    />
                </div>
            </div>
            <div className="flex sm:items-center flex-col sm:flex-row mt-8">
                <button
                    onClick={() => editPassword()}
                    disabled={
                        loading.update ||
                        cpassword === "" ||
                        npassword === "" ||
                        confirm === ""
                    }
                    className="disabled:opacity-50 disabled:cursor-not-allowed text-center px-5 py-2 text-white rounded-md flex items-center justify-center
                            bg-seagreen
                        "
                >
                    {loading.update ? (
                        <FaSpinner className="animate-spin mr-4" />
                    ) : (
                        "Update Password"
                    )}
                </button>
                <button
                    onClick={handleCancel}
                    className=" rind-0 border-0 outline-none text-seagreen py-2 px-5 rounded-md"
                >
                    Cancel
                </button>
            </div>
            <div className="flex mt-10 justify-between flex-col gap-2 sm:flex-row">
                <p>Can't remember password?</p>
                <button
                    onClick={handleReset}
                    className={
                        "flex items-center disabled:cursor-not-allowed space-x-2 py-2 text-xs px-6 rounded-md bg-white text-seagreen hover:opacity-75 cursor-pointer h-fit w-fit border-2 border-seagreen"
                    }
                    disabled={loading.reset}
                >
                    {loading.reset ? (
                        <FaSpinner className="animate-spin" />
                    ) : (
                        <span>Reset via email</span>
                    )}
                </button>
            </div>
        </div>
    );
};

export default EditPassword;
