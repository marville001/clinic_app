import React, { useState } from "react";
import DashboardWrapper from "../components/DashboardWrapper";
import Header from "../components/Header";
import { useSelector } from "react-redux";
import { HiUserAdd } from "react-icons/hi";
import EditName from "../components/profile/EditName";
import EditPassword from "../components/profile/EditPassword";

const Profile = () => {
    const { authDetails } = useSelector((state) => state.authState);

    const [editingName, setEditingName] = useState(false);

    return (
        <DashboardWrapper>
            <Header title="Profile" />
            <div className="mx-8 py-28">
                {/* <div className="ml-8 mt-14 flex items-center gap-8">
                <div className="relative h-40 w-40">
                    <img
                        src="/assets/JOAN.png"
                        className="h-full w-full rounded-full hover:opacity-5"
                        alt=""
                    />
                </div>
                <div className="flex flex-col">
                    <h4 className="text-lg  text-seagreen font-bold">
                        {authDetails?.firstname} {authDetails?.lastname}
                    </h4>
                    <p className="">
                        {new Date(parseInt(authDetails?.createdAt))
                            .toISOString()
                            .toString()
                            .substring(0, 10)
                            .replaceAll("-", "/")}
                    </p>
                </div>
            </div> */}

                {/* START */}
                <div className={`flex w-full flex-col gap-10 sm:flex-row mx-auto ${!editingName && "sm:items-center"}`}>
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
