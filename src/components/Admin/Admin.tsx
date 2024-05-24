import axios from "axios";
import ListUser from "./ListUser/ListUser";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";


export default function Admin() {
  const token = useSelector((state: RootState) => state.auth.accessToken)

  console.log(token);
  
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
  

  return (
    <div className="p-10">
      <ListUser />
    </div>
  )
}
