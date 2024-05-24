import axios from "axios";
// import { useState } from "react";
// import Modal from "./PopUp";
import FormulaireInsertionUser from "./formulaire";
import { getToken } from "../../../services/TokenServices";
import { useEffect } from "react";


 function AddNewUser() {
  const token = getToken()
  console.log(token);
  
    useEffect(() => {
      async () => {
        const data = await axios.get('/admin/list-users', {
          headers: {
            Authorization: `Bearer ${token}`
        }
        });
      }
    }, [token])
    

  // const [showModal, setShowModal] = useState(false);

  // const handleOpenModal = () => {
  //   setShowModal(true);
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
      <Modal show={showModal}/>
    </div> */}
    </>
  )
}

export default AddNewUser