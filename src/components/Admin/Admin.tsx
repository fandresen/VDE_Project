import axios from "axios";
import ListUser from "./ListUser/ListUser";
import { getToken } from "../../services/TokenServices";

export default function Admin() {
  const token = getToken()

  console.log(token);
  
  try {
    const data = axios.get('/admin/list-users', {
      headers: {
        Authorization: `Bearer ${token}`
    }
    });

    
  } catch (error) {
    console.log(error);
  }

  return (
    <div className="p-10">
      <ListUser />
    </div>
  )
}
