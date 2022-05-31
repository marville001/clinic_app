import React, { Fragment, useContext } from "react";
import { HiMenuAlt1 } from "react-icons/hi";
import {
    FaChevronDown,
    FaRegBell,
    FaRegEnvelope,
    FaRegEnvelopeOpen,
    FaRegUserCircle,
    FaUser,
    FaUserAlt,
} from "react-icons/fa";
import { Menu, Transition } from "@headlessui/react";
<<<<<<< HEAD
import { NavLink, useNavigate } from "react-router-dom";
import { NavContext } from "../nav.context";
=======

import { NavContext } from "../contexts/nav.context";
import { useNotifications } from "../contexts/notification.context";
>>>>>>> e5da180bf2b1b9d07116a66aca21ce777c8fc7d5

const Header = ({ title }) => {
    const { sidebarOpen, setSidebarOpen } = useContext(NavContext);

    const {
        notifications,
        newNotification,
        setNewNotification,
        toggleNotificationStatus,
    } = useNotifications();

    return (
        <div
            className={`flex justify-between items-center ${
                sidebarOpen && "ml-[250px] xl:ml-0"
            } transition-all duration-300 ease-linear bg-white _shadow p-4 py-2`}
        >
            <div className="flex items-center space-x-4">
                <HiMenuAlt1
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="text-slate-900 text-3xl cursor-pointer"
                />
                <h2 className="capitalize text-slate-900">{title}</h2>
            </div>

            <div className="flex items-center gap-4 z-[88]">
                <Menu as="div" className="relative inline-block text-left">
                    <Menu.Button
                        as="div"
                        className="p-2 py-2 relative hover:bg-lightgray group rounded-md cursor-pointer flex items-center gap-2"
                    >
                        <FaRegBell
                            onClick={(e) => {
                                if (newNotification) {
                                    setNewNotification(false);
                                }
                            }}
                            className="text-xl"
                        />
                        {newNotification && (
                            <div className="h-2 w-2 bg-steelblue rounded-full absolute right-2 top-2"></div>
                        )}
                    </Menu.Button>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items className="absolute right-0 mt-2 w-[300px] origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div
                                className={`w-full min-h-[300px] max-h-[400px] rounded-md overflow-auto text-sm`}
                            >
                                <h2 className="text-center text-xl my-2 border-b-2 pb-1 select-none">
                                    Notifications
                                </h2>

                                <div className="flex flex-col divide-y-[1px]">
                                    {notifications?.map((notification, i) => (
                                        <div
                                            key={notification?._id}
                                            onClick={() => {
                                                if (!notification?.read)
                                                    toggleNotificationStatus(
                                                        notification?._id,
                                                        true
                                                    );
                                            }}
                                            className={`py-2 w-full flex gap-2  px-2 items-center cursor-pointer hover:bg-gray-100 ${
                                                !notification?.read &&
                                                "bg-blue-50"
                                            }`}
                                        >
                                            <div className="p-2 bg-lightgray opacity-40 rounded-full">
                                                <FaUser className="text-lg text-dimgray" />
                                            </div>

                                            <div className="text-sm flex-1">
                                                <span className="font-bold opacity-70">
                                                    {notification?.title}
                                                </span>
                                                <p className="text-xs mt-2">
                                                    {notification?.description}
                                                </p>
                                            </div>

                                            {notification?.read ? (
                                                <FaRegEnvelopeOpen
                                                    onClick={() =>
                                                        toggleNotificationStatus(
                                                            notification?._id,
                                                            false
                                                        )
                                                    }
                                                    className="text-lg mr-2 text-dimgray"
                                                />
                                            ) : (
                                                <FaRegEnvelope
                                                    onClick={() =>
                                                        toggleNotificationStatus(
                                                            notification?._id,
                                                            true
                                                        )
                                                    }
                                                    className="text-lg mr-2 text-dimgray"
                                                />
                                            )}
                                        </div>
                                    ))}
                                    {notifications?.length === 0 && (
                                        <div className="py-4 opacity-40 uppercase text-lg font-bold text-center">
                                            No Notification Yet
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Menu.Items>
                    </Transition>
                </Menu>

                <Menu as="div" className="relative inline-block text-left">
                    <Menu.Button className="p-2 py-2 hover:bg-lightgray group rounded-md cursor-pointer flex items-center gap-2">
                        <FaRegUserCircle className="text-xl" />
                        <FaChevronDown className="group-hover:text-dwhite" />
                    </Menu.Button>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="px-1 py-1 flex flex-col gap-2 min-h-[100px]">
                                <Menu.Item>
                                    {({ active }) => (
                                    <NavLink
                                        to="/profile">
                                        <button
                                            className={`${
                                                active
                                                    ? "bg-dimgray text-white"
                                                    : "text-gray-900"
                                            } group flex w-full items-center rounded-md px-2 py-1 text-sm`}
                                        >
                                            <FaUserAlt
                                                className="mr-2 h-5 w-5"
                                                aria-hidden="true"
                                            />
                                            <span className="text-lg">
                                                Profile
                                            </span>
                                        </button></NavLink>
                                    )}
                                </Menu.Item>
                            </div>
                        </Menu.Items>
                    </Transition>
                </Menu>
            </div>
        </div>
    );
};

export default Header;
