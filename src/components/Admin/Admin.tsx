import { useSelector } from "react-redux";
import ListUser from "./ListUser/ListUser";
import { RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";


export default function Admin() {
  const userRole = useSelector((state: RootState) => state.auth.userRole)
  const navigate = useNavigate()

  if(userRole !== "ADMIN"){
    navigate("/")
  }
  
  return (
    <div className="p-10">
      <ListUser />
    </div>
  )
}
