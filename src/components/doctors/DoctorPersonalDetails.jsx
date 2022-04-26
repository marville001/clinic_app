import React from "react";
import { FaHouseUser } from "react-icons/fa";
import { useSelector } from "react-redux";

const PatientPersonalDetails = () => {
    const { doctor } = useSelector(
        (state) => state.doctorsState
    );
    return (
        <div className="p-4 flex-[1] xl:flex-[2] rounded bg-white _shadow self-stfart">
            <h3 className="text-md mb-4 font-bold">Personal Information</h3>
            <p className="text-sm my-2">
                {doctor?.bio}
            </p>

            <div className="flex w-3/4 my-5">
                <table className="w-full">
                    <thead className="text-left">
                        <tr className="border-b">
                            <td className="py-2 font-bold text-sm">
                                Full Name
                            </td>
                            <td className="py-2 text-sm">{doctor?.firstname} {doctor?.lastname}</td>
                        </tr>
                        <tr className="border-b">
                            <td className="py-2 text-sm font-bold">Mobile</td>
                            <td className="py-2  text-sm">
                                {doctor?.phone || "-"}
                            </td>
                        </tr>

                        <tr className="border-b">
                            <td className="py-2 text-sm font-bold">Email</td>
                            <td className="py-2  text-sm">
                                {doctor?.firstname || "-"}
                            </td>
                        </tr>

                        <tr className="border-b">
                            <td className="py-1 text-sm font-bold">Address</td>
                            <td className="py-1  text-sm">
                                {doctor?.address}
                            </td>
                        </tr>
                    </thead>
                </table>
            </div>

            <div className="flex flex-col text-sm space-y-2">
                    <div className="flex items-center space-x-2 text-sm">
                        <FaHouseUser className="text-flowerblue" />
                        <span>Department</span>
                    </div>
                    <h4 className="text-md opacity-80">
                        {doctor?.department?.name}
                    </h4>
                </div>
        </div>
    );
};

export default PatientPersonalDetails;
