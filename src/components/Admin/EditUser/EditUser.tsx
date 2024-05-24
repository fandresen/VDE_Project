import { useState } from "react";
import Modal from "../../Others/Modal/Modal";
import EditUserForm from "./Content/Content";


export default function EditUser() {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  return (
    <>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={openModal}
      >
        Open Modal
      </button>
      <Modal
        isOpen={isModalOpen}
        title="Custom Modal Title"
        onClose={closeModal}
        animation="fade"
      >       
        <EditUserForm />
      </Modal>
    </>
  );
}
