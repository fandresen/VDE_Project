// import Content from "./Content";

import { useEffect } from "react";
import Content from "./Content/Content";
import Navbar from "./Navbar/Navbar";
import Sidebar from "./Sidebar/Sidebar";
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { setAuth, setUserRole } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import axios from "axios";



interface DecodedToken {
  role: string;
}


export default function Home() {
  const dispatch = useDispatch()
  const navigate = useNavigate();


  useEffect(() => {
    // recover cookies
    const getRoleFromCookie = async () => {
      // get Cookie
      const accessToken = Cookies.get('access_token');
      // console.log("token:"+accessToken);

      if(accessToken) {
        try {
          const decodedToken = jwtDecode<DecodedToken>(accessToken);
          dispatch(setUserRole(decodedToken.role));
          // console.log('Decoded role:' ,decodedToken.role);
        } catch (error) {
          console.error('Error decoding token:', error);
        }
        
      } else {
        // if cookie don't exist we navigate in login
        dispatch(setAuth(false));
        navigate('/login');
      }
    }
    getRoleFromCookie();


 
  }, [dispatch, navigate])

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
