// import Content from "./Content";

import { useEffect } from "react";
import Content from "./Content/Content";
import Navbar from "./Navbar/Navbar";
import Sidebar from "./Sidebar/Sidebar";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import {  setUserRole } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { getToken } from "../../services/TokenServices";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
// import axios from "axios";



interface DecodedToken {
  role: string;
}


export default function Home() {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const accessToken = getToken()
  const isAuthenticated  = useSelector((state: RootState) => state.auth.isAuthenticated)

  useEffect(() => {
    // recover cookies
    console.log(isAuthenticated);
    
    const getRoleFromCookie = async () => {
      if(isAuthenticated) {
        try {
          const decodedToken = jwtDecode<DecodedToken>(accessToken);
          dispatch(setUserRole(decodedToken.role));
        } catch (error) {
          console.error('Error decoding token:', error);
        }
        
      } else {
        // if cookie don't exist we navigate in login
        // dispatch(setAuth(false));
        navigate('/login');
      }
    }
    getRoleFromCookie();


 
  }, [dispatch, navigate, accessToken, isAuthenticated])

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const { data } = await axios.get('/auth/user');
  //       // setIsProfil(`${data.last_name} ${data.first_name}`);
  //       dispatch(setAuth(true));
  //       console.log(data);
  //     } catch (error) {
  //       console.error('Error: ', error);
  //     }
  //   })();
  // }, [dispatch]);
  return (
    <div className="relative bg-bglight dark:bg-bgdark">
      <Sidebar />

      <div className="lg:ml-28 min-h-screen">
        <Navbar />
        <Content />
      </div>
    </div>
  );
}
