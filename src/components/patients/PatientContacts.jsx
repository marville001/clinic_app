import React, { useState } from "react";
import {  HiUserAdd } from "react-icons/hi";
import AddPatientContactModal from "../modals/AddPatientContactModal";

const PatientContacts = () => {

    const [addContactModalOpen, setAddContactModalOpen] = useState(false);

    return (
        <div className="p-4 flex-[1] xl:flex-[2] rounded bg-white _shadow self-stfart">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-md mb-4 font-bold">Patient Contact</h3>
                <div
                    onClick={() => {
                        setAddContactModalOpen(true);
                    }}
                    className="flex items-center space-x-2 py-2 text-xs px-6 rounded-md text-white bg-seagreen 
						  hover:opacity-75 cursor-pointer"
                >
                    <HiUserAdd />
                    <span>Add Patient Contact</span>
                </div>
            </div>

            <div className="flex w-full my-5">
                <table className="w-full">
                    <thead className="text-left">
                        <tr className="border-b">
                            <th className="py-2 text-sm">#</th>
                            <th className="py-2 text-sm">Contact Type</th>
                            <th className="py-2 text-sm">First Name</th>
                            <th className="py-2 text-sm">Last Name</th>
                            <th className="py-2 text-sm">Address</th>
                            <th className="py-2 text-sm">Telephone</th>
                            <th className="py-2 text-sm">Email</th>
                            <th className="py-2 text-sm">Availability</th>
                        </tr>
                    </thead>

                    <tbody className="text-left">
                        {[1, 2, 3, 4, 5, 6].map((contact, idx) => (
                            <tr key={idx} className="border-b">
                                <td className="text-xs py-3">{idx + 1}</td>
                                <td className="text-xs py-3">Relative</td>
                                <td className="text-xs py-3">Kaberm</td>
                                <td className="text-xs py-3">Motash</td>
                                <td className="text-xs py-3">
                                    Steer 4345 - Kaka
                                </td>
                                <td className="text-xs py-3">
                                    +(333344) 564 654 4554,
                                    <br />
                                    +(333344) 564 654 4554
                                </td>
                                <td className="text-xs py-3">
                                    kaberm_motash@yopmail.com
                                </td>
                                <td className="text-xs py-3">10:00 - 14:00</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <AddPatientContactModal
                isOpen={addContactModalOpen}
                closeModal={() => {
                    setAddContactModalOpen(false);
                }}
            />
        </div>
    );
};

export default PatientContacts;
