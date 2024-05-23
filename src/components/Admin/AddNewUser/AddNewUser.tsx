import axios from "axios";
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
    
  return (
    <>
      <h1 className=" text-4xl xl:text-6xl text-primary font-bold text-center mt-[2vh]">Créer un nouveau Utilisateur</h1>
      <FormulaireInsertionUser/>
    </>
  )
}

export default AddNewUser