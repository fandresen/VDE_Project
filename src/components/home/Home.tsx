// import Content from "./Content";

import { useEffect } from "react";
// import Content from "./Content/Content";
import Navbar from "./Navbar/Navbar";
import Sidebar from "./Sidebar/Sidebar";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import {  setUserRole } from "../../redux/authSlice";
import { Outlet, useNavigate } from "react-router-dom";

import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
// import axios from "axios";






export default function Home() {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const accessToken = useSelector((state: RootState) => state.auth.accessToken)
  const userRole = useSelector((state: RootState) => state.auth.userRole)
  const isAuthenticated  = useSelector((state: RootState) => state.auth.isAuthenticated) 

  useEffect(() => {
    // recover cookies
    // console.log(isAuthenticated);

    
      if(isAuthenticated) {
        console.log("auth");
        
        try {
          const decodedToken = jwtDecode(accessToken);
          // console.log(decodedToken);
          
          dispatch(setUserRole(decodedToken.role));
          if(userRole === "EXTRACTOR"){
            navigate("/extractor")
          }
        } catch (error) {
          console.error('Error decoding token:', error);
        }
        
      } else {
        // if cookie don't exist we navigate in login
        // dispatch(setAuth(false));
        navigate('/login');
      } 
  }, [dispatch, navigate, accessToken, isAuthenticated, userRole])

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
        <Outlet />
      </div>
    </div>
  );
}
