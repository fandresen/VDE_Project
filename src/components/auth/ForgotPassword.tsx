import { useState } from "react"
import axios from "axios";
import { Link } from "react-router-dom";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { TfiEmail } from "react-icons/tfi";

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    // const [emailExists, setEmailExists] = useState('');
    const [notify, setNotify] = useState({
      show: false,
      error: false,
      message: ''
    });
    const [success, setSuccess] = useState(false)

    // Handle Submit
    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        // reset the value in Form after submit
        e.preventDefault();
        e.currentTarget.reset();
        try {
          const { status } = await axios.post('/auth/forgot-password', {email})
          setNotify({
            show: true,
            error: false,
            message:"Please check your Email!"
          })

          // check if the forgot password is success
          if (status === 200) {
            setSuccess(true);
          } else {
            setSuccess(false);
          }
        } catch(e) {
          setNotify({
            show: true,
            error: true,
            message: 'Wrong E-mail!'
          })
        }
    }

   
    

    let info;
    let icon;
    if (notify.show) {
      icon = notify.error ? <FaTimesCircle className="mr-1"/> : <FaCheckCircle className="mr-1"/>
      info = <div className={`flex items-center text-[12px] ${notify.error ? 'text-red-500' : 'text-green-500'}`}>
        {icon} {notify.message}
      </div>
    }

    const emailForm = (<form onSubmit={submit}  action="#" method="POST" className="flex items-center justify-center h-full px-10 flex-col bg-[#fff] z-20">
    <h1 className="text-[40px] font-bold mb-5">Forgot Password!</h1>
    <span className="text-[12px] text-center">Enter your email to receive a password reset link.</span>
      <div>
        <div className="mt-2">
          <input
              onChange={e => setEmail(e.target.value)}
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="Email"
            required
            className={`bg-[#eee] border my-2 px-4 py-3 text-sm rounded-md w-full outline-none ${notify.error ? 'border border-red-500' : 'border-transparent'}`}
          />
        </div>
        {info}
      </div>
      
        <button
          type="submit"
          className="bg-[#512da8] text-[#fff] text-xs md:text-sm px-12 py-2 border-transparent rounded-md font-semibold uppercase tracking-wide mt-4 cursor-pointer hover:text-[#0A8852] hover:shadow-md hover:shadow-[#0A8852]"
        >
          Continue
        </button>
      
  </form>);

    const emailCheck = (<div className="flex items-center justify-center h-full px-10 flex-col text-center bg-[#fff] z-10">
      <TfiEmail className="text-[60px] text-[#0A8852] mb-10"/>
    <h1 className="text-[30px] font-bold mb-5">Check your email</h1>
    <span className="text-[12px] leading-[20px] tracking-[0.3px]">Please check the email address example@gmail.com for instructions to reset your password.</span>
    <button type="submit" className="bg-[#512da8] text-[#fff] text-xs md:text-sm px-12 py-2 border-transparent rounded-md font-semibold uppercase tracking-wide mt-4 cursor-pointer hover:text-[#0A8852] hover:shadow-md hover:shadow-[#000]">Resend email</button>
  </div>);
    // JSX.Element: convert the script in JSX
    const emailDisplay: JSX.Element = success ? emailCheck : emailForm

  return (
    <div className="flex items-center justify-center
     flex-col px-6 py-12 lg:px-8 h-screen bg-gradient-to-r from-gray-200 to-blue-200">
      <div className=" relative bg-white rounded-[20px] shadow-xl overflow-hidden w-full max-w-3xl min-h-[450px]">
        <div className="absolute top-0 h-full left-1/2 w-1/2 transition-all ease-in-out transform ">
          {emailDisplay}
          
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

export default ForgotPassword