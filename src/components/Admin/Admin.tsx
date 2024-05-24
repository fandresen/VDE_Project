import axios from "axios";
import ListUser from "./ListUser/ListUser";
import { useEffect } from "react";
import { getToken } from "../../services/TokenServices";


export default function Admin() {
  const token = getToken()

  useEffect(() => {
   
    axios.get('/admin/list-users', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      const data = response.data;
      console.log(data);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
    
  }, [token])
  
  

  return (
    <div className="p-10">
      <ListUser />
    </div>
  )
}
