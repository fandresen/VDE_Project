import { Link } from "react-router-dom";
import AddNewUser from "./AddNewUser/AddNewUser";
import Home from "./Home/Home";


interface SidebarExtractorProps {
    isOpen?: boolean;
}

export default function Content({isOpen}: SidebarExtractorProps) {
    

    const spanClassname = isOpen ? "":"hidden"
    const buttonClassname = isOpen ? " hover:bg-button" : ""

    
  return (
    <>
        <Link to="/admin" className={`flex items-center w-full gap-5 py-2 ${buttonClassname} sidebar-button h-20 px-2 rounded-3xl`}>
            <Home />
            <span className={`${spanClassname} text-xl`}>Accueil</span>
        </Link>
        <Link to="/add" className={`flex items-center w-full gap-5 py-2 ${buttonClassname} sidebar-button h-20 px-2 rounded-3xl`}>
            <AddNewUser />
            <span className={`${spanClassname} text-xl`}>Ajouter utilisateurs</span>
        </Link>
    </>
  )
}
