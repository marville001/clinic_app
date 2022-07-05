import React, { useEffect, useState } from "react";
import DashboardWrapper from "../components/DashboardWrapper";
import Header from "../components/Header";
import { useSelector } from "react-redux";
import { HiUserAdd } from "react-icons/hi";
import EditName from "../components/profile/EditName";
import EditPassword from "../components/profile/EditPassword";
import { FaEdit, FaSpinner } from "react-icons/fa";
import { putApi } from "../api";
import { uploadAvatarUrl } from "../constants/networkUrls";
import { STATIC_FILE_BASE } from "../constants";

const Profile = () => {
    const { authDetails } = useSelector((state) => state.authState);

    const [editingName, setEditingName] = useState(false);
    const [uploadingAvatar, setUploadingAvatar] = useState(false);
    const [avatar, setAvatar] = useState(
        "https://www.kindpng.com/picc/m/207-2074624_white-gray-circle-avatar-png-transparent-png.png"
    );

    const handleAvatarChange = async (e) => {
        if (e.target.files.length) {
            const avatar = e.target.files[0];

            const formData = new FormData();
            formData.append("role", authDetails?.role);
            formData.append("avatar", avatar);

            try {
                setUploadingAvatar(true);
                const res = await putApi(
                    uploadAvatarUrl(authDetails?._id),
                    formData
                );
                setAvatar(`${STATIC_FILE_BASE}${res?.data?.url}`);
                setUploadingAvatar(false);
            } catch (error) {
                setUploadingAvatar(false);
            }
        }
    };

    useEffect(() => {
        if (authDetails?._id) {
            setAvatar(
                authDetails?.avatar?.startsWith("http")
                    ? authDetails?.avatar
                    : `${STATIC_FILE_BASE}${authDetails?.avatar}`
            );
        }
    }, [authDetails?.avatar, authDetails?._id]);

    return (
        <DashboardWrapper>
            <Header title="Profile" />
            <div className="mx-8 py-28">
                <div className="flex w-full flex-col gap-10 items-center sm:flex-row mx-auto">
                    <div className="font-bold text-xl opacity-70">
                        <p>Avatar</p>
                    </div>
                    <label
                        htmlFor="avatar-input"
                        className="w-24 group relative h-24 cursor-pointer block bg-gray-500 rounded-full mb-5"
                    >
                        <img
                            src={`${avatar}`}
                            className="w-full h-full object-cover rounded-full"
                            alt=""
                        />
                        <FaEdit className="absolute bottom-2 right-2 opacity-70 text-seagreen" />
                        {uploadingAvatar && (
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                <FaSpinner className=" animate-spin" />
                            </div>
                        )}
                        <input
                            disabled={uploadingAvatar}
                            type="file"
                            id="avatar-input"
                            className="hidden"
                            accept="image/png, image/jpeg, image/jpg"
                            onChange={handleAvatarChange}
                        />
                    </label>
                </div>
                {/* START */}
                <div
                    className={`flex w-full flex-col gap-10 sm:flex-row mx-auto ${
                        !editingName && "sm:items-center"
                    }`}
                >
                    <div className="font-bold text-xl opacity-70">
                        <p>Name</p>
                    </div>
                    <div className="flex gap-5 items-center">
                        {editingName ? (
                            <EditName setEditingName={setEditingName} />
                        ) : (
                            <p>
                                {authDetails?.firstname} {authDetails?.lastname}
                            </p>
                        )}
                        <div>
                            <div
                                onClick={() => setEditingName(true)}
                                className={
                                    editingName
                                        ? "hidden"
                                        : "flex items-center space-x-2 py-2 text-xs px-6 rounded-md bg-white text-seagreen  bottom-4 hover:opacity-75 cursor-pointer h-fit w-fit border-2 border-seagreen"
                                }
                            >
                                <HiUserAdd />
                                <span>Edit</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* END */}

                {/* START */}
                <div className="flex w-full flex-col gap-10 mt-10 sm:flex-row mx-auto">
                    <div className="font-bold text-xl opacity-70">
                        <p>Email</p>
                    </div>
                    <div className="">
                        <p>{authDetails?.email}</p>
                    </div>
                </div>
                {/* END */}

                <hr className="my-12" />

                {/* START */}
                <div className="flex w-full flex-col md:flex-row  gap-4 md:gap-10 mx-auto">
                    <div className="font-bold text-xl opacity-70">
                        <p>Password</p>
                    </div>
                    <EditPassword />
                </div>
            </div>
            {/* END */}
        </DashboardWrapper>
    );
};

export default Profile;
