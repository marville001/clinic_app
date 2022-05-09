import React, { useState } from "react";
import { FaSearch, FaSpinner } from "react-icons/fa";
import { useDispatch } from "react-redux";
import Modal from "../common/Modal";

import { getApi } from "../../api";
import { searchChatUserUrl } from "../../constants/networkUrls";
import { createChatAction, getChatsAction } from "../../redux/actions/messages.action";

const NewChatModal = ({ isOpen, closeModal = () => {} }) => {
    const [chatWith, setChatWith] = useState("Admin");
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [creating, setCreating] = useState(false);
    const [found, setFound] = useState([]);

    const dispatch = useDispatch();

    const handleClose = () => {
        closeModal();
        setChatWith("Admin");
        setFound([])
        setSearch("");
        setCreating(false)
        setLoading(false)
    };

    const handleAddChat = async (user) => {
        setCreating(true)
        await dispatch(createChatAction({
            userId: user?._id,
            userRole: user?.role
        }));
        dispatch(getChatsAction());
        handleClose();
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        setFound([]);

        const key =
            chatWith === "Admin"
                ? "admins"
                : chatWith === "Doctor"
                ? "doctors"
                : "secretaries";

        try {
            const { data } = await getApi(searchChatUserUrl(key, search));
            setFound(data.results);
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    };

    return (
        <Modal size="lg" isOpen={isOpen} closeModal={handleClose}>
            <div className="bg-white p-5 _shadow rounded-md">
                <h4 className="text-center text-2xl text-slate-900 uppercase mb-6">
                    New Chat
                </h4>

                <p>Chat with</p>
                <div className="flex gap-2">
                    <button
                        type="button"
                        onClick={() => {
                            setChatWith("Admin");
                            setFound([]);
                        }}
                        className={`flex-1 py-2 text-white rounded-lg ${
                            chatWith === "Admin"
                                ? "bg-steelblue"
                                : "bg-flowerblue"
                        }`}
                    >
                        Admin
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            setChatWith("Doctor");
                            setFound([]);
                        }}
                        className={`flex-1 py-2 text-white rounded-lg ${
                            chatWith === "Doctor"
                                ? "bg-steelblue"
                                : "bg-flowerblue"
                        }`}
                    >
                        Doctor
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            setChatWith("Secretary");
                            setFound([]);
                        }}
                        className={`flex-1 py-2 text-white rounded-lg ${
                            chatWith === "Secretary"
                                ? "bg-steelblue"
                                : "bg-flowerblue"
                        }`}
                    >
                        Secretary
                    </button>
                </div>

                <form
                    onSubmit={handleSearch}
                    className="w-full my-5 flex items-center h-10 gap-2"
                >
                    <input
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                        }}
                        disabled={creating}
                        setSearch={setSearch}
                        type="text"
                        className="w-full rounded-lg disabled:cursor-pointer disabled:bg-slate-50"
                        placeholder={`Search ${chatWith} ...`}
                    />
                    <button
                        type="submit"
                        className="p-2 cursor-pointer bg-flowerblue text-lg h-full rounded-lg text-white  flex items-center justify-center w-12"
                    >
                        <FaSearch />
                    </button>
                </form>

                <div className="max-h-48">
                    {creating && (
                        <div className="flex justify-center py-5">
                            <FaSpinner className="animate-spin" />
                        </div>
                    )}
                    {found.map((user) => (
                        <div
                            key={user._id}
                            onClick={() => handleAddChat(user)}
                            className="py-2 bg-gray-50 px-2 mb-2 cursor-pointer"
                        >
                            <h4>
                                {user.firstname} {user.lastname} - {user.email}
                            </h4>
                        </div>
                    ))}

                    {loading && (
                        <div className="flex justify-center py-5">
                            <FaSpinner className="animate-spin" />
                        </div>
                    )}
                </div>

                <div className="flex justify-between items-center mt-8">
                    <button
                        type="button"
                        onClick={handleClose}
                        className="bg-salmon rind-0 border-0 outline-none text-white py-2 px-5 rounded-md"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default NewChatModal;
