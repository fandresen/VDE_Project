import { IoMenuSharp } from "react-icons/io5";
import { MdNotificationsActive, MdOutlineDarkMode } from "react-icons/md";
import profil from "../../assets/avatar.jpeg"
import { useState } from "react";
import { createPortal } from "react-dom";
import NavBar from "./NavBar";
import FlyoutProfilPanel from "./FlyoutProfilPanel";
import { SiGoogletranslate } from "react-icons/si";

interface HeaderProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Header:React.FC<HeaderProps> = ({isOpen, setIsOpen}) => {
  const [unlocked, setUnlocked] = useState(false);
  // const [isOpen, setIsOpen] = useState(true);

  // Déclaration de flyoutMenu
  const flyoutMenu = window.innerWidth <= 1024 ? (
    createPortal(
      <NavBar closeModal={() => setIsOpen(!isOpen)} />,
      document.body
    )
  ) : (
    <NavBar closeModal={() => setIsOpen(!isOpen)}/>
  );

  return (
    <div className="w-full flex justify-center">
      <header className='flex items-center justify-between bg-[#1E293B] w-[900px] py-2 relative'>
        <div className="flex flex-row items-center justify-start w-[200px] ml-2">
            <IoMenuSharp className="text-white lg:hidden mr-3 size-8" onClick={() => setIsOpen(!isOpen)}/>
            <span className=" text-2xl font-extrabold text-[#6B23AA]">Logo</span>
          </div>
        <div className="flex flex-row items-center justify-between w-[210px] text-white">
              <SiGoogletranslate className="size-6" />
              <MdOutlineDarkMode className="size-6"/>
              <MdNotificationsActive className="size-6"/>
              <img onClick={() => setUnlocked(!unlocked)} className="rounded-full size-8 object-cover object-center mr-3 lg:mr-0" src={profil} alt="profil" />
          </div>
          {unlocked && createPortal(<FlyoutProfilPanel unlocked={unlocked} setUnlocked={setUnlocked} closeModal={() => setUnlocked(!unlocked)} />, document.body)}
      </header>
          {/* Utilisation de flyoutMenu */}
          {isOpen && flyoutMenu}
    </div>
  )
}

export default Header
