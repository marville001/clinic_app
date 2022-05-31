import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaSpinner } from "react-icons/fa";
import { updateUserProfileAction } from "../../redux/actions/auth.action";
import { toast } from "react-toastify";

const EditName = ({ setEditingName }) => {
    const { authDetails } = useSelector((state) => state.authState);

    const [loading, setLoading] = useState(false);
    const [name, setName] = useState({
        first: "",
        last: "",
    });

    const dispatch = useDispatch();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setName((prev) => ({ ...prev, [name]: value }));
    };

    const handleEditName = async () => {
        const obj = {
            firstname: name.first,
            lastname: name.last,
        };
        setLoading(true);
        const res = await dispatch(
            updateUserProfileAction(obj, authDetails?.role, authDetails?._id)
        );
        setLoading(false);

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

        setEditingName(false);

        toast.success(`Name Updated Successfully`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    };

    useEffect(() => {
        if (authDetails?._id) {
            setName({
                first: authDetails?.firstname,
                last: authDetails?.lastname,
            });
        }
    }, [authDetails]);

    return (
        <div className=" w-full">
            <flex className="gap-2 flex flex-col lg:flex-row sm:items-center">
                <div className="flex flex-col">
                    <label htmlFor="name">First Name*</label>
                    <input
                        type="text"
                        value={name.first}
                        name="first"
                        onChange={handleInputChange}
                        className="mt-2"
                    />
                </div>

                <div className="flex flex-col mt-5 lg:mt-0">
                    <label htmlFor="name">Last Name*</label>
                    <input
                        type="text"
                        value={name.last}
                        name="last"
                        onChange={handleInputChange}
                        className="mt-2"
                    />
                </div>
            </flex>
            <div className="flex items-center mt-8">
                <button
                    onClick={handleEditName}
                    className="disabled:opacity-50 disabled:cursor-not-allowed uppercase px-8
                            tracking-wider py-2 text-white text-lg rounded-md flex items-center
                            bg-seagreen
                        "
                >
                    {loading ? (
                        <FaSpinner className="animate-spin mr-4" />
                    ) : (
                        "Save"
                    )}
                </button>
                <button
                    onClick={() => setEditingName(false)}
                    className="ring-0 border-0 outline-none text-seagreen py-2 px-5 rounded-md"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default EditName;
