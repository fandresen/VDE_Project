import axios from "axios";
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAuth } from "../../redux/authSlice";
import profil from "../../assets/avatar.jpeg"
import { FaTimes } from "react-icons/fa";
import { LiaUserEditSolid } from "react-icons/lia";

interface FlyoutProfilPanelProps {
    closeModal: () => void;
    unlocked: boolean;
    setUnlocked: (value: boolean) => void;
  }

const FlyoutProfilPanel: React.FC<FlyoutProfilPanelProps> = ({closeModal, unlocked, setUnlocked}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isEmail, setIsEmail] = useState('');
    const [isName, setIsName] = useState('');

    // const handleLogout = async () => {
    //   try {
    //     await axios.post('/auth/logout');

    //     dispatch(setAuth(true));

    //     navigate("/login")
    //   } catch(error) {
    //     console.error('error:', error);
    //   }
    // }

    useEffect(() => {
        (async () => {
          try {
            const { data } = await axios.get('/auth/user');
            setIsName(`${data.last_name} ${data.first_name}`);
            setIsEmail(`${data.email}`)
            dispatch(setAuth(true));
            console.log(data);
          } catch (error) {
            console.error('error:',error);
            setIsName('');
            dispatch(setAuth(false));
            // Rediriger vers la page de connexion
            navigate("/login");
          }
        })();
      }, [dispatch, navigate]);

  return (
    <div onClick={closeModal} className="fixed top-[55px] right-1 w-full h-screen overflow-auto">
            <div onClick={(e) => e.stopPropagation()} className="absolute right-5 lg:right-[120px] bg-[#0F172A] rounded-3xl w-[412px] h-[230px] items-center">
                <div className="absolute right-3 top-3 text-white text-[20px] hover: cursor-pointer" onClick={() => setUnlocked(!unlocked)}>
                    <FaTimes />
                </div>
                <div className="text-white flex justify-center mt-[25px]">
                    {isEmail}
                </div>
                <div className="flex flex-col justify-center items-center">
                  <div className="relative">
                    <img className="rounded-full size-20 object-cover object-center mt-[30px]" src={profil} alt="profil" />
                    <LiaUserEditSolid className="absolute bottom-1 -right-1 size-6 text-green-500" />
                  </div>
                    <div className="text-white text-[20px] pt-[25px]">
                        Have a good day {isName} !
                    </div>
                </div>
            </div>
        </div>
  )
}

export default FlyoutProfilPanel