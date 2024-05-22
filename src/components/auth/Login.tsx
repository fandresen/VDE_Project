/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react"
import axios from "axios"
import { Link, Navigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "../../redux/authSlice";
import { RootState } from "../../redux/store";
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { PiEyeClosedDuotone, PiEyeBold } from "react-icons/pi";



const login = () => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [showPassword, setShowPassword] = useState(false);
    const [notify, setNotify] = useState({
      show: false,
      error: false,
      message: ''
    })

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setPassword('');
        
        try {
          const {data, status } = await axios.post('/auth/login', {
              email,
              password
          });


         // axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
         
          setNotify({
            show: true,
            error: false,
            message: "success."
          })

          // check if the connexion is success
          if (status === 200) {
            dispatch(setAuth(true));
            
          } else {
            console.error("Error during login", data);
            
          }
        } catch (e) {
          console.error ("Network error during login:", e);
          setNotify({
            show: true,
            error: true,
            message: 'Incorrect email or password!'
          })
        }

      }

    const handleShowPassword = () => {
      setShowPassword(!showPassword);
    }

      let info;
      let icon;
      if (notify.show) {
        icon = notify.error ? <FaTimesCircle className="mr-1"/> : <FaCheckCircle className="mr-1"/>
        info = <div className={`flex items-center text-[12px] ${notify.error ? 'text-red-500' : 'text-green-500'}`}>
          {icon} {notify.message}
        </div>
      }

    useEffect(() => {
      console.log(isAuthenticated);
      if (isAuthenticated) {
        const accessToken = Cookies.get('access_token');
        console.log(accessToken);
        if(accessToken) {
          // decode the access token for get the user information
          const decoded: { email: string; first_name: string } = jwtDecode(accessToken);
          // const { email, first_name } = jwtDecode(accessToken);
          console.log('Email:', decoded.email);
          console.log('First Name:', decoded.first_name);
        }
      }
    }, [isAuthenticated]);

    // if submit 
    if(isAuthenticated){
        return <Navigate to="/"/>
    }

  return (
    <div className="flex items-center justify-center
     flex-col px-6 py-12 lg:px-8 h-screen bg-gradient-to-r from-gray-200 to-blue-200">
      <div className=" relative bg-white rounded-[20px] shadow-xl overflow-hidden w-full max-w-3xl min-h-[450px]">
        <div className="absolute top-0 h-full left-0 w-1/2 transition-all duration-600 ease-in-out transform animate-move">
          <form onSubmit={handleSubmit}  action="#" method="POST" className="flex items-center justify-center h-full px-10 flex-col bg-[#fff]">
            <h1 className="text-[40px] font-bold mb-5">Log In</h1>
            <span className="text-[12px] text-center">Use your <label htmlFor="email">email</label> and <label htmlFor="password">password</label></span>
              <div>
                <div className="mt-2">
                  <input
                      onChange={e => setEmail(e.target.value)}
                      id="email"
                      name="email"
                      type="email"
                      value={email}
                      autoComplete="email"
                      placeholder="Email"
                      required
                      className=" bg-[#eee] border-none my-2 px-4 py-3 text-sm rounded-md w-full outline-none"
                  />
                </div>
              </div>

              <div className="relative">
                <div className="mt-2">
                  <input
                      onChange={e => setPassword(e.target.value)}
                    id="password"
                    name="password"
                    type={(showPassword === false) ? 'password' : 'text'}
                    value={password}
                    autoComplete="current-password"
                    placeholder="Password"
                    required
                    className={` bg-[#eee] border my-2 px-4 py-3 text-sm rounded-md w-full outline-none ${notify.error ? 'border-red-500' : 'border-transparent'}`}
                  />
                  <div className="absolute top-8 right-4 cursor-pointer hover:bg-[#bfc5da] hover:rounded">
                    {
                      (showPassword === false) ? <PiEyeClosedDuotone onClick={handleShowPassword}/> : <PiEyeBold onClick={handleShowPassword}/>
                    }
                  </div>
                </div>
                {info}
              </div>

              <div>
                <button
                  type="submit"
                  className="bg-[#512da8] text-[#fff] text-xs md:text-sm px-12 py-2 border-transparent rounded-md font-semibold uppercase tracking-wide mt-4 cursor-pointer hover:text-[#0a8852] hover:shadow-md hover:shadow-[#0a8852]"
                >
                  Sign in
                </button>
              </div>
            </form>
        </div>
        <div className="absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-all duration-600 easy-in-out rounded-tr-none rounded-bl-[150px] rounded-br-none rounded-tl-[150px] z-10">
          <div className="relative left-[-100%] w-[200%] h-full bg-gradient-to-r from-indigo-500 to-purple-800 text-[#fff] transition-all duration-600 ease-in-out ">
            <div className="absolute w-1/2 h-full right-0 flex items-center justify-center flex-col px-4 text-center top-0 transform translate-x-0 transition-all duration-600 ease-in-out">
              <h1 className="text-[30px] font-bold">Hello,</h1>
              <p className="text-[14px] leading-[20px] tracking-[0.3px] my-5">If you forgot your authentication don't worry</p>
              <Link to="/forgot-password">
                <button className="bg-transparent bg-[#512da8] text-[#fff] text-xs md:text-sm px-12 py-2 border border-[#f8f4f4] border-transparent rounded-md font-semibold uppercase tracking-wide mt-4 cursor-pointer hover:text-[#0A8852] hover:border-[#EEE] hover:shadow-xl">Forgot Password</button>
              </Link>
            </div>
          </div>
        </div>

      </div>
      </div>
  )
}

export default login