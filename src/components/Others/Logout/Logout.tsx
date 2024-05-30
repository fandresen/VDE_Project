import { IoLogOut } from "react-icons/io5";

interface SidebarExtractorProps {
  isOpen?: boolean;
}


export default function Logout({isOpen}: SidebarExtractorProps) {
  const spanClassname = isOpen ? "":"hidden"
  const buttonClassname = isOpen ? "w-80 rounded-3xl hover:bg-button" : ""

  return (
    <button className={`flex items-center gap-5 ${buttonClassname}  sidebar-button h-20 px-2`}>
    <div className="flex justify-center">
        <IoLogOut className="w-icon h-icon" />
    </div>
    <span className={`${spanClassname}`}>Deconnexion</span>
    </button>
  )
}
