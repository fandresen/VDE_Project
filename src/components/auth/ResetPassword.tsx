import { useState } from 'react';
import { useParams, Navigate, Link } from "react-router-dom";
import axios from "axios"

import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { PiEyeClosedDuotone, PiEyeBold } from "react-icons/pi";

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

    const [notify, setNotify] = useState({
      show: false,
      error: false,
      message: ''
    })
    const {token} = useParams();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        // reset the value in Form after submit
        e.preventDefault();

        // check if password and passwordConfirm correspond
        if(password !== passwordConfirm) {
          setNotify({
            show: true,
            error: true,
            message: "Passwords don't match."
          })
          return;
        }

        try {
          await axios.post("/auth/reset-password", {
              token,
              password,
              password_confirm: passwordConfirm
            });
  
            setNotify({
              show: true,
              error: false,
              message: "success"
            })
  
          setRedirect(true);
        } catch(e) {
          setNotify({
            show: true,
            error: true,
            message: "An error occurred while resetting the password"
          });
        }
    }

    const handlePasswordConfirm = (e: React.ChangeEvent<HTMLInputElement>) => {
      setPasswordConfirm(e.target.value);

      // Check if password correspond 
      if(e.target.value !== password) {
        setNotify({
          show: true,
          error: true,
          message: "Passwords don't match."
        });
      } else {
        // if the password don't match
        setNotify({
          show: false,
          error: false,
          message: ""
        })
      }
    }

    const handleShowPassword = () => {
      setShowPassword(!showPassword);
    }

    const handleShowPasswordConfirm = () => {
      setShowPasswordConfirm(!showPasswordConfirm);
    }

    if(redirect) {
        return <Navigate to="/login"/>
    }

    let info;
    let icon;
    if (notify.show) {
      icon = notify.error ? <FaTimesCircle className="mr-1"/> : <FaCheckCircle className="mr-1"/>
      info = <div className={`flex items-center text-[12px] ${notify.error ? 'text-red-500' : 'text-green-500'}`}>
        {icon} {notify.message}
      </div>
    }

    

  return (
    <div className="flex items-center justify-center
     flex-col px-6 py-12 lg:px-8 h-screen bg-gradient-to-r from-gray-200 to-blue-200">
      <div className=" relative bg-white rounded-[20px] shadow-xl overflow-hidden w-full max-w-3xl min-h-[450px]">
        <div className="absolute top-0 h-full left-1/2 w-1/2 transition-all ease-in-out transform ">
        <form onSubmit={handleSubmit}  action="#" method="POST" className="flex items-center justify-center h-full px-10 flex-col bg-[#fff] z-20">
    <h1 className="text-[30px] font-bold mb-5">Pick a new Password!</h1>
    <span className="text-[12px] ">Enter your password to receive a password reset link.</span>
      <div>
        <div className="mt-2 relative">
          <input
              onChange={e => setPassword(e.target.value)}
            id="password"
            name="password"
            type={(showPassword === false) ? 'password' : 'text'}
            autoComplete="password"
            placeholder="Password"
            required
            className=" bg-[#eee] border-none my-2 px-4 py-3 text-sm rounded-md w-full outline-none"
          />
          <div className="absolute top-6 right-3 cursor-pointer hover:bg-[#bfc5da] hover:rounded">
            {
              (showPassword === false) ? <PiEyeClosedDuotone onClick={handleShowPassword}/> : <PiEyeBold onClick={handleShowPassword}/>
            }
          </div>
        </div>
        <div className="mt-2 relative">
          <input
              onChange={handlePasswordConfirm}
            id="passwordConfirm"
            name="passwordConfirm"
            type={(showPasswordConfirm === false) ? 'password' : 'text'}
            autoComplete="password"
            placeholder="Password Confirm"
            required
            className=" bg-[#eee] border-none my-2 px-4 py-3 text-sm rounded-md w-full outline-none"
          />
          <div className="absolute top-6 right-3 cursor-pointer hover:bg-[#bfc5da] hover:rounded">
            {
              (showPasswordConfirm === false) ? <PiEyeClosedDuotone onClick={handleShowPasswordConfirm}/> : <PiEyeBold onClick={handleShowPasswordConfirm}/>
            }
          </div>
        </div>
        {info}
      </div>
      
        <button
          type="submit"
          className="bg-[#512da8] text-[#fff] text-xs md:text-sm px-12 py-2 border-transparent rounded-md font-semibold uppercase tracking-wide mt-4 cursor-pointer hover:text-[#0A8852] hover:shadow-md hover:shadow-[#0A8852]"
        >
          Continue
        </button>
      
  </form>
          
        </div>
        <div className="absolute top-0 h-full left-0 w-1/2 transition-all duration-600 easy-in-out overflow-hidden rounded-tr-[150px] rounded-bl-none rounded-br-[150px] rounded-tl-none ">
          <div className="relative left-[-100%] w-[200%] h-full bg-gradient-to-r from-indigo-500 to-purple-800 text-[#fff] transition-all duration-600 ease-in-out ">
            <div className="absolute w-1/2 h-full right-0 flex items-center justify-center flex-col px-4 text-center top-0 transform -translate-0 transition-all duration-600 ease-in-out">
              <h1 className="text-[30px] font-bold">Welcome Back!</h1>
              <p className="text-[14px] leading-[20px] tracking-[0.3px] my-5">Enter your personal details to use your features in site</p>
              <Link to={"/login"}>
                <button className="bg-transparent bg-[#512da8] text-[#fff] text-xs md:text-sm px-12 py-2 border border-[#ebe9e9] border-transparent rounded-md font-semibold uppercase tracking-wide mt-4 cursor-pointer hover:text-[#0A8852] hover:border-[#EEE] hover:shadow-xl">Log In</button>
              </Link>
              
            </div>
          </div>
        </div>

      </div>
      </div>
  )
}

export default ResetPassword