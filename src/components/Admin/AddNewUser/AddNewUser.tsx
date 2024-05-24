// import { useState } from "react";
// import Modal from "./PopUp";
import FormulaireInsertionUser from "./formulaire";


export default function AddNewUser() {

  // const [showModal, setShowModal] = useState(false);

  // const handleOpenModal = () => {
  //   setShowModal(true);
  // };

  // const handleCloseModal = () => {
  //   setShowModal(false);
  // };

  return (
    <>
      <h1 className=" text-[7vh] text-primary font-bold text-center mt-[2vh]">Créer un nouveau Utilisateur</h1>
      <FormulaireInsertionUser/>

      {/* <div className="flex items-center justify-center">
      <button
        onClick={handleOpenModal}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        Open Modal
      </button>
      <Modal show={showModal} onClose={handleCloseModal} />
    </div> */}
    </>
  )
}
