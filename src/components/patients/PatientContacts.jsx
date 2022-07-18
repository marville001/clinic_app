import React, { useState } from "react";
import { HiUserAdd } from "react-icons/hi";
import { FaTrash, FaUserEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import AddPatientContactModal from "../modals/AddPatientContactModal";
import { deleteContactAction } from "../../redux/actions/patients.action";
import ConfirmDeleteModal from "../modals/ConfirmDeleteModal";
import EditPatientContactModal from "../modals/EditPatientContactModal";

const PatientContacts = () => {
    const { patient, deletingContact, contactType } = useSelector(
        (state) => state.patientsState
    );

    const [selectedEditContact, setSelectedEditContact] = useState({});
    const [editModalOpen, setEditModalOpen] = useState(false);

    const [selectedDeleteContact, setSelectedDeleteContact] = useState({});
    const [confirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState(false);
    const [addContactModalOpen, setAddContactModalOpen] = useState(false);

    const dispatch = useDispatch();

    const openEditModal = (contact) => {
        setSelectedEditContact(contact);
        setEditModalOpen(true);
    };

    const openDeleteModal = (contact) => {
        setSelectedDeleteContact(contact);
        setConfirmDeleteModalOpen(true);
    };
    const handleCloseDeleteModal = () => {
        setConfirmDeleteModalOpen(false);
        setSelectedDeleteContact({});
    };

    const handleDeleteContact = async () => {
        const res = await dispatch(
            deleteContactAction(selectedDeleteContact._id)
        );

        handleCloseDeleteModal();
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
        toast.success(`Contact deleted Successfully`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    };

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
                                    {contactType?.find(
                                        (c) => c._id === contact.contacttype
                                    )?.name || "-"}
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
                                <td className="flex py-4 gap-2">
                                    <div
                                        className="flex items-center space-x-1 bg-dimgray text-white text-xs p-2 
                                                rounded-full hover:opacity-90 hover:scale-[1.02] cursor-pointer"
                                        onClick={() => openEditModal(contact)}
                                    >
                                        <FaUserEdit />
                                    </div>
                                    <div
                                        className="flex items-center space-x-1 bg-salmon text-white text-xs p-2 w-fit
                                            rounded-full cursor-pointer hover:opacity-90 hover:scale-[1.02]"
                                        onClick={() => {
                                            openDeleteModal(contact);
                                        }}
                                    >
                                        <FaTrash />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <ConfirmDeleteModal
                isOpen={confirmDeleteModalOpen}
                closeModal={handleCloseDeleteModal}
                message="Please confirm you want to remove the contact for this patient?"
                actionMethod={handleDeleteContact}
                loading={deletingContact}
            />
            <AddPatientContactModal
                isOpen={addContactModalOpen}
                closeModal={() => {
                    setAddContactModalOpen(false);
                }}
            />
            <EditPatientContactModal
                isOpen={editModalOpen}
                closeModal={() => {
                    setEditModalOpen(false);
                    setSelectedEditContact({});
                }}
                contact={selectedEditContact}
            />
        </div>
    );
};

export default PatientContacts;
