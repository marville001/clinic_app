import Modal from "../common/Modal";

const ViewSecretaryModal = ({ isOpen, closeModal = () => {}, secretary }) => {
    const handleCloseModal = () => {
        closeModal();
    };

    return (
        <Modal
            size="xl"
            isOpen={isOpen}
            closeModal={handleCloseModal}
        >
            <div className="bg-white p-5 _shadow rounded-md">
                <h4 className="text-center text-2xl text-slate-900 uppercase mb-6">
                    Secretary Details
                </h4>
                <div className="flex gap-5 mt-4">
                    <div className="flex-1">
                        <p>Firstname</p>
                        <h3 className="mt-2 font-bold">
                            {secretary?.firstname}
                        </h3>
                    </div>
                    <div className="flex-1">
                        <p>Lastname</p>
                        <h3 className="mt-2 font-bold">
                            {secretary?.lastname}
                        </h3>
                    </div>
                </div>

                <div className="flex gap-5 mt-4">
                    <div className="flex-1">
                        <p>Username</p>
                        <h3 className="mt-2 font-bold">
                            {secretary?.username}
                        </h3>
                    </div>
                    <div className="flex-1">
                        <p>Email</p>
                        <h3 className="mt-2 font-bold">{secretary?.email}</h3>
                    </div>
                </div>

                <div className="flex gap-5 mt-4">
                    <div className="flex-1">
                        <p>Gender</p>
                        <h3 className="mt-2 font-bold capitalize">
                            {secretary?.gender}
                        </h3>
                    </div>
                    <div className="flex-1">
                        <p>Date of Birth</p>
                        <h3 className="mt-2 font-bold">
                            {new Date(secretary?.dob).toDateString()}
                        </h3>
                    </div>
                </div>

                <div className="flex gap-5 mt-4">
                    <div className="flex-1">
                        <p>Phone Number</p>
                        <h3 className="mt-2 font-bold capitalize">
                            {secretary?.phone}
                        </h3>
                    </div>
                    <div className="flex-1">
                        <p>Address</p>
                        <h3 className="mt-2 font-bold">{secretary?.address}</h3>
                    </div>
                </div>

                <div className="flex justify-between items-center mt-8">
                    <button
                        type="button"
                        onClick={handleCloseModal}
                        className="bg-salmon rind-0 border-0 outline-none text-white py-2 px-5 rounded-md"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default ViewSecretaryModal;
