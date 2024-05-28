import React, { useState, ChangeEvent, ClipboardEvent } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/store';
import { erreur, hide, loading, success, vide } from '../../../redux/validationCodePopUp';
import axios from 'axios';


interface ModalProps {
  show: boolean;
}

const Modal: React.FC<ModalProps> = ({show}) => {

  const dispatch = useDispatch<AppDispatch>()
  const id : number = useSelector<RootState>((state)=>state.popUp.id) as number
  
  const [code, setCode] = useState<string[]>(new Array(6).fill(""));
  

  const handleCloseModal = () => {
    dispatch(hide())
  };

  const sendCode = async (codeVal:number)=>{
    dispatch(loading(true))
    try{
      const res = await axios.post(`/admin/enable-user/${id}`,{
        "code":codeVal
      })
      if(res.status == 200){
        dispatch(success())
        setTimeout(()=>{
          dispatch(vide())
        },10000)
      }
      else {
        dispatch(erreur())
        setTimeout(()=>{
          dispatch(vide())
        },10000)
      } 
    }
    catch(error){
      dispatch(erreur())
      // console.log(error);
      
    }
    finally{
      dispatch(loading(false))
    }
    
  }
 

  if (!show) return null;

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    if (/^[0-9]$/.test(value) || value === "") {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      // Move to the next input if the current input is filled
      if (value !== "" && index < 5) {
        const nextInput = document.getElementById(`code-input-${index + 1}`);
        if (nextInput) {
          nextInput.focus();
        }
        
      }
      if (value !== "" && index === 5){
        sendCode(Number(newCode.join('')))        
        handleCloseModal();
      }
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    const paste = e.clipboardData.getData('text');
    if (/^[0-9]{6}$/.test(paste)) {
      sendCode(Number(paste)) 
      const lastInput = document.getElementById(`code-input-5`);
      if (lastInput) {
        lastInput.focus();
        handleCloseModal();
      }
    }
    e.preventDefault();
  };

//  setTimeout(()=>console.log(code),10000)

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-[rgba(26,43,56,0.5)]  pb-[15vh] pt-[10vh] px-[20vh] rounded-lg shadow-lg">
        <div className='text-5xl text-[#FFCBCB] font-extrabold text-center mb-5'>Pour confirmer</div>
        <h2 className="text-3xl text-white font-bold mb-[8vh]"> Entrez le code que nous avons envoyé dans votre Email</h2>
        <div className="flex justify-between mb-4 mx-auto w-[35vw]">
          {code.map((digit, index) => (
            <input
              key={index}
              id={`code-input-${index}`}
              type="text"
              value={digit}
              maxLength={1}
              onChange={(e) => handleChange(e, index)}
              onPaste={handlePaste}
              className="w-[4.5vw] h-[9vh] border-2 border-gray-300 rounded-md text-center text-3xl font-bold"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Modal;
