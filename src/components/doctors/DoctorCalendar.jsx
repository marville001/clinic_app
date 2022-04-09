import React from "react";
import { HiChevronLeft, HiChevronRight, HiPlusCircle } from "react-icons/hi";

const DoctorCalendar = () => {
    return (
        <div className="w-full bg-white p-4 my-5">
            <div className="flex items-center justify-between">
                <h3>
                    <strong>Dr. James</strong> Calendar
                </h3>
                <div className="flex cursor-pointer items-center space-x-2 bg-seagreen py-2 px-6 rounded-md text-white  text-sm hover:opacity-75">
                    <HiPlusCircle />
                    <span>add Appointment</span>
                </div>
            </div>

            <div className="flex items-center justify-between my-4">
                <div className="bg-flowerblue flex text-white rounded-md overflow-hidden">
                    <div className="flex-1 p-2 cursor-pointer hover:bg-steelblue">
                        <HiChevronLeft className="text-xl" />
                    </div>
                    <div className="flex-1 p-2 cursor-pointer hover:bg-steelblue">
                        <HiChevronRight className="text-xl" />
                    </div>
                </div>
                <h4 className="text-2xl opacity-70 font-medium">April 2022</h4>
                <div className="bg-flowerblue flex text-white rounded-md overflow-hidden">
                    <div className="flex-1 p-2 px-4 text-sm bg-steelblue cursor-pointer hover:bg-steelblue">
                        <span>month</span>
                    </div>
                    <div className="flex-1 p-2 px-4 text-sm cursor-pointer hover:bg-steelblue">
                        <span>week</span>
                    </div>
                    <div className="flex-1 p-2 px-4 text-sm cursor-pointer hover:bg-steelblue">
                        <span>day</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DoctorCalendar;
