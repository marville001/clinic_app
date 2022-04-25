import React from "react";
import { FaHouseUser } from "react-icons/fa";
import { HiCalendar } from "react-icons/hi";
import { useSelector } from "react-redux";

const PatientPersonalDetails = () => {
    const { patient } = useSelector((state) => state.patientsState);
    return (
        <div className="p-4 flex-[1] xl:flex-[2] rounded bg-white _shadow self-stfart">
            <h3 className="text-md mb-4 font-bold">Personal Information</h3>
            <p className="text-sm my-2">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fuga
                distinctio vero non libero nisi in voluptatibus atque, ut alias
                ipsum?
            </p>

            <div className="flex w-full sm:w-3/4 my-5">
                <table className="w-full">
                    <thead className="text-left">
                        <tr className="border-b">
                            <td className="py-2 font-bold text-sm">
                                Full Name
                            </td>
                            <td className="py-2 text-sm">
                                {patient?.firstname} {patient?.lastname}
                            </td>
                        </tr>
                        <tr className="border-b">
                            <td className="py-2 text-sm font-bold">Mobile</td>
                            <td className="py-2  text-sm">
                                {patient?.phone || "-"}
                            </td>
                        </tr>

                        <tr className="border-b">
                            <td className="py-2 text-sm font-bold">Email</td>
                            <td className="py-2  text-sm">
                                {patient?.email || "-"}
                            </td>
                        </tr>

                        <tr className="border-b">
                            <td className="py-1 text-sm font-bold">Address</td>
                            <td className="py-1  text-sm">
                                {patient?.address}
                            </td>
                        </tr>
                    </thead>
                </table>
            </div>

            <div className="flex gap-5 flex-col sm:flex-row">
                <div className="flex flex-col text-sm space-y-2">
                    <div className="flex items-center space-x-2 text-sm">
                        <HiCalendar className="text-flowerblue" />
                        <span>Last Visit</span>
                    </div>
                    <h4 className="text-md opacity-80">08 Sept, 2019</h4>
                </div>
                <div className="flex flex-col text-sm space-y-2">
                    <div className="flex items-center space-x-2 text-sm">
                        <FaHouseUser className="text-flowerblue" />
                        <span>Department</span>
                    </div>
                    <h4 className="text-md opacity-80">
                        {patient?.department?.name}
                    </h4>
                </div>

                <div className="flex flex-col text-sm space-y-2">
                    <div className="flex items-center space-x-2 text-sm">
                        <FaHouseUser className="text-flowerblue" />
                        <span>Diagnosis</span>
                    </div>
                    <h4 className="text-md opacity-80">
                        {patient?.diagnosis?.map((diagnosis, idx) => (
                            <React.Fragment key={diagnosis?._id}>
                                {diagnosis?.name}
                                {idx !== patient?.diagnosis?.length - 1 && (
                                    <span>, </span>
                                )}
                            </React.Fragment>
                        ))}
                    </h4>
                </div>
            </div>
        </div>
    );
};

export default PatientPersonalDetails;
