import React, { useState } from "react";
import { HiUserAdd } from "react-icons/hi";
import { useSelector } from "react-redux";
import AddPatientContactModal from "../modals/AddPatientContactModal";

const PatientContacts = () => {
    const { patient, contactType } = useSelector(
        (state) => state.patientsState
    );

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
                        {patient?.contact?.map((contact, idx) => (
                            <tr key={idx} className="border-b">
                                <td className="text-xs py-3">{idx + 1}</td>
                                <td className="text-xs py-3">
                                    {
                                        contactType?.find(
                                            (c) => c._id === contact.contacttype
                                        )?.name || "-"
                                    }
                                </td>
                                <td className="text-xs py-3">
                                    {contact?.firstname}
                                </td>
                                <td className="text-xs py-3">
                                    {contact?.lastname}
                                </td>
                                <td className="text-xs py-3">
                                    {contact?.address}
                                </td>
                                <td className="text-xs py-3">
                                    {contact?.phone.join(",")}
                                </td>
                                <td className="text-xs py-3">
                                    {contact?.email}
                                </td>
                                <td className="text-xs py-3">
                                    {contact?.availability}
                                </td>
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
