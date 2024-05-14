import { useDispatch,  } from "react-redux"
// import { RootState } from "../../redux/store";
import { useEffect, useState, } from "react";
import axios from "axios";
import { setAuth } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

import Header from "./Header";
import { MdOutlineNotStarted } from "react-icons/md";
import ExtractorHome from './ExtractorHome';
import { jwtDecode} from "jwt-decode"; // for decoded the JWT token

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
    // const [isProfil, setIsProfil] = useState('')
    // const auth = useSelector((state: RootState) => state.auth.value);

    const [userRole, setUserRole] = useState('');

    useEffect(() => {
      const getRoleFromCookie = async () => {
        const accessToken = Cookies.get('access_token');

        console.log('accessToken: ', Cookies.get("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImZpcnN0X25hbWUiOiJJbGEiLCJyb2xlIjoiU1VQRVJWSVNPUiIsImlhdCI6MTcxNTY2ODc2MCwiZXhwIjoxNzE2MjczNTYwfQ.nqYkwZOaXSpVJgsvt6dPAN1pLXtAoP5Cl-2P3HIIO-w"));
        if(accessToken) {
          try {
            const decodedToken = jwtDecode<DecodedToken>(accessToken);
            setUserRole(decodedToken.role)
            console.log('Decoded role:' ,decodedToken.role);
          } catch (error) {
            console.error('Error decoding token:', error);
          }
          
        }
      }
      
      getRoleFromCookie();
    }, [])

    

    useEffect(() => {
      (async () => {
        try {
          const { data } = await axios.get('/auth/user', {withCredentials: true});
          // setIsProfil(`${data.last_name} ${data.first_name}`);
          dispatch(setAuth(true));
          console.log(data);
        } catch (error) {
          // setIsProfil('');
          dispatch(setAuth(false));
          // Rediriger vers la page de connexion
          navigate("/login");
        }
      })();
    }, [dispatch, navigate]);
  

  
  return (
    <div className="p-0 m-0 bg-[#1E293B] h-screen w-full">
      <Header isOpen={isOpen} setIsOpen={setIsOpen} />
        <div className="flex items-center justify-center w-full min-h-[calc(100vh-96px)]">
          <ExtractorHome/>
          <div className="rounded-full w-[200px] h-[50px] flex justify-center items-center text-[20px]  text-green-400 bg-[#0F172A]  hover: cursor-pointer">
            {userRole}
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