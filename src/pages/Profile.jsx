import React, { useState } from "react";
import DashboardWrapper from "../components/DashboardWrapper";
import Header from "../components/Header";
import { useSelector, useDispatch } from "react-redux";
import { HiUserAdd } from "react-icons/hi";
import EditName from "../components/modals/EditName";
import { toast } from "react-toastify";
import EditPassword from "../components/modals/EditPassword";
import { updateUserProfileAction } from "../redux/actions/auth.action";
import Moment from "react-moment";

const Profile = () => {
  const { authDetails, loading } = useSelector((state) => state.authState);
  const dispatch = useDispatch();
  const [nameModalOpen, setNameModalOpen] = useState(false);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const openEditModal = () => {
    setNameModalOpen(!nameModalOpen);
  };

  const handleEditName = async (newname) => {
    const res = await dispatch(
      updateUserProfileAction(
        { username: newname },
        authDetails?.role,
        authDetails?._id
      )
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
      setNameModalOpen(false);
      return;
    }
    setNameModalOpen(false);

    toast.success(`Name Updated Successfully`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };
  return (
    <DashboardWrapper>
      <Header title="Profile" />
      <div className="ml-8 mt-14 flex">
        <div className="relative h-40 w-40">
          <img
            src="/assets/JOAN.png"
            className="h-full w-full rounded-full hover:opacity-5"
            alt=""
          />
          <div className="absolute opacity-0 hover:opacity-100 mb-80">
            <p className="text-slate-900 absolute">Hello World</p>
          </div>
        </div>
        <div className="flex flex-col  items-center">
          <h4 className="text-lg  text-seagreen text-center font-bold m-10">
            {authDetails?.firstname} {authDetails?.lastname}
          </h4>
          <p className="">
            <Moment format="YYYY/MM/DD">{authDetails.createdAt} </Moment>
            {/* Member since {moment(authDetails.createdAt).format("MM/DD/YYYY")} */}
          </p>
        </div>
        <div
          className="flex items-center space-x-2 py-2 text-xs px-6 rounded-md text-white bg-seagreen 
						  hover:opacity-75 cursor-pointer h-fit mt-16"
        >
          <HiUserAdd />
          <span>Change profile picture</span>
        </div>
      </div>

      {/* START */}
      <div className="flex w-full mx-auto justify-around mt-10">
        <div className="flex-1 ml-44">
          <p>Username</p>
        </div>
        <div className="flex-1">
          {nameModalOpen ? (
            <EditName
              message="Edit Name"
              isOpen={nameModalOpen}
              closeModal={() => {
                setNameModalOpen(false);
              }}
              actionMethod={handleEditName}
              loading={loading}
            />
          ) : (
            <p>{authDetails.username}</p>
          )}
        </div>
        <div className="flex-1">
          <div
            onClick={() => {
              openEditModal();
            }}
            className={
              nameModalOpen
                ? "hidden"
                : "flex items-center space-x-2 py-2 text-xs px-6 rounded-md bg-white text-seagreen  bottom-4 hover:opacity-75 cursor-pointer h-fit w-fit border-2 border-seagreen"
            }
          >
            <HiUserAdd />
            <span>Edit</span>
          </div>
        </div>
      </div>

      {/* END */}

      {/* START */}
      <div className="flex w-full mx-auto justify-around mt-10">
        <div className="flex-1 ml-44">
          <p>Email</p>
        </div>
        <div className="flex-1">
          <p>{authDetails.email}</p>
        </div>
        <div className="flex-1"></div>
      </div>

      {/* END */}

      {/* START */}
      <div className="flex w-full mx-auto justify-around mt-10">
        <div className="flex-1 ml-44">
          <p>Password</p>
        </div>
        <div className="flex-1">
          {passwordModalOpen ? (
            <EditPassword
              isOpen={passwordModalOpen}
              closeModal={() => {
                setPasswordModalOpen(false);
              }}
              message="Change Password"
            />
          ) : (
            <p>********</p>
          )}
        </div>
        <div className="flex-1">
          <div
            onClick={() => {
              setPasswordModalOpen(!passwordModalOpen);
            }}
            className={
              passwordModalOpen
                ? "hidden"
                : "flex items-center space-x-2 py-2 text-xs px-6 rounded-md bg-white text-seagreen  bottom-4 hover:opacity-75 cursor-pointer h-fit w-fit border-2 border-seagreen"
            }
          >
            <HiUserAdd />
            <span>Edit</span>
          </div>
        </div>
      </div>
      {/* END */}
    </DashboardWrapper>
  );
};

export default Profile;
