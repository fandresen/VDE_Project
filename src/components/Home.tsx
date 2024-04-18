import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../redux/store";
import { useEffect, useState } from "react";
import axios from "axios";
import { setAuth } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";


const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isProfil, setIsProfil] = useState('')
    const auth = useSelector((state: RootState) => state.auth.value);

    

    useEffect(() => {
      (async () => {
        try {
          const { data } = await axios.get('/auth/user', {withCredentials: true});
          setIsProfil(`${data.last_name} ${data.first_name}`);
          dispatch(setAuth(true));
          console.log(data);
        } catch (error) {
          setIsProfil('');
          dispatch(setAuth(false));
          // Rediriger vers la page de connexion
          navigate("/login");
        }
      })();
    }, [dispatch, navigate]);
  

  
  return (
    <div>Bienvenue {auth ? isProfil : ''}</div>
  )
}

export default Home