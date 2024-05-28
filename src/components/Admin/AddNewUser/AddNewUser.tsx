import axios from "axios";
// import { useState } from "react";
import Modal from "./PopUp";
import FormulaireInsertionUser from "./formulaire";
import { getToken } from "../../../services/TokenServices";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Load from "./Loading";


 function AddNewUser() {
  const token = getToken()
  // console.log(token);
  

  //Token configuration
    useEffect(() => {
      async () => {
        const data = await axios.get('/admin/list-users', {
          headers: {
            Authorization: `Bearer ${token}`
        }
        });
      }
    }, [token])
    
  
    const visible :boolean = useSelector<RootState>((state)=>state.popUp.value) as boolean
    const load :boolean = useSelector<RootState>((state)=>state.popUp.loading) as boolean

  return (
    <>
      <h1 className=" text-[7vh] text-primary font-bold text-center mt-[2vh]">Créer un nouvel Utilisateur</h1>
      <FormulaireInsertionUser/>

      <div className="flex items-center justify-center">

      {/* Pop up code confirmation */}
      <Modal show={visible}/>

      {/* Loading component */}
      {
        load?<Load/>:''
      }
      
    </div>
    </>
  )
}

export default AddNewUser