import React, { useState, ChangeEvent, ClipboardEvent } from 'react';

interface ModalProps {
  show: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ show}) => {

  const [showModal, setShowModal] = useState(true);
  const [code, setCode] = useState<string[]>(new Array(6).fill(""));

  const handleCloseModal = () => {
    setShowModal(false);
  };
 

  if (!show || !showModal) return null;

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
        console.log(newCode);
        handleCloseModal();
      }
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    const paste = e.clipboardData.getData('text');
    if (/^[0-9]{6}$/.test(paste)) {
      setCode(paste.split(""));
      const lastInput = document.getElementById(`code-input-5`);
      if (lastInput) {
        lastInput.focus();
        console.log(code);
        handleCloseModal();
      }
    }
    e.preventDefault();
  };

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
        {/* <button
          onClick={onClose}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Close
        </button> */}
      </div>
    </div>
  );
};

export default Modal;
