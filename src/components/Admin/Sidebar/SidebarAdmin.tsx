import { Link } from "react-router-dom";

interface SidebarAdminProps {
    isOpen: boolean;
}


export default function SidebarAdmin({isOpen}: SidebarAdminProps) {

    console.log(isOpen);
    
  return (
    <div>
        <div>
            <Link to="/home">Home</Link>
        </div>
        <div>
            <Link to="/add">Home</Link>
        </div>
    </div>
  )
}
