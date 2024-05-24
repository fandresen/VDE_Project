import axios from "axios";
import ListUser from "./ListUser/ListUser";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useEffect } from "react";


export default function Admin() {
  // const token = useSelector((state: RootState) => state.auth.accessToken)

  // useEffect(() => {
   
  //   axios.get('/admin/list-users', {
  //     headers: {
  //       Authorization: `Bearer ${token}`
  //     }
  //   })
  //   .then(response => {
  //     const data = response.data;
  //     console.log(data);
  //   })
  //   .catch(error => {
  //     console.error('Error fetching data:', error);
  //   });
    
  // }, [token])
  
  

  return (
    <div className="p-10">
      <ListUser />
    </div>
  )
}
