import { useDispatch,  } from "react-redux"
import { useEffect } from "react";
import axios from "axios";
import { setAuth, setUserRole } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

import Header from "./Header";
import { MdOutlineNotStarted } from "react-icons/md";
import ExtractorHome from './ExtractorHome';
import { jwtDecode} from "jwt-decode"; // for decoded the JWT token
import SourcingHome from "./SourcingHome";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

interface HomeProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

interface DecodedToken {
  role: string;
}

const Home: React.FC<HomeProps> = ({isOpen, setIsOpen}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userRole = useSelector((state: RootState) => state.auth.userRole);

    useEffect(() => {
      // recover cookies
      const getRoleFromCookie = async () => {
        // get Cookie
        const accessToken = Cookies.get('access_token');
        console.log(accessToken);

        if(accessToken) {
          try {
            const decodedToken = jwtDecode<DecodedToken>(accessToken);
            dispatch(setUserRole(decodedToken.role));
            console.log('Decoded role:' ,decodedToken.role);
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

    useEffect(() => {
      (async () => {
        try {
          const { data } = await axios.get('/auth/user');
          // setIsProfil(`${data.last_name} ${data.first_name}`);
          dispatch(setAuth(true));
          console.log(data);
        } catch (error) {
          console.error('Error: ', error);
        }
      })();
    }, [dispatch, navigate]);

  return (
    <div className="p-0 m-0 bg-[#1E293B] h-screen w-full">
      <Header isOpen={isOpen} setIsOpen={setIsOpen} />
        <div className="flex items-center justify-center w-full min-h-[calc(100vh-96px)]">
          {userRole === 'EXTRACTOR' ? <ExtractorHome /> : <SourcingHome />}
          <div className="rounded-full w-[200px] h-[50px] flex justify-center items-center text-[20px]  text-green-400 bg-[#0F172A]  hover: cursor-pointer">
            <MdOutlineNotStarted className="size-10" />
            <span className="ml-5 text-green-400">Start</span>
          </div>
          <div className="absolute right-5 bottom-[48px] flex flex-col w-[150px]">
            <button className="flex flex-col items-center text-white bg-[#0F172a] rounded-3xl"> 
              <span className="mt-2">Short break</span>
              <span className="mb-2">00:00</span>
            </button>
            <button className="flex flex-col items-center text-white bg-[#0F172a] rounded-3xl mt-3"> 
              <span className="mt-2">Break</span>
              <span className="mb-2">15:00</span>
            </button>
            <button className="flex flex-col items-center text-white bg-[#0F172a] rounded-3xl mt-3"> 
              <span className="mt-2">Sanitary break</span>
              <span className="mb-2">00:00</span>
            </button>
          </div>
        </div>
    </div>
  )
}

export default Home

