import { useEffect, useState } from "react";
import SidebarExtractor from "../../extractor/Sidebar/Sidebar";
import SidebarAdmin from "../../Admin/Sidebar/SidebarAdmin";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";


export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const roleUser = useSelector((state:RootState) => state.auth.userRole)
  
  console.log(roleUser);
  

  useEffect(() => {
    const handleMouseEnter = () => {
      setIsOpen(true)
    };
    const handleMouseLeave = () => {
      setIsOpen(false)      
    };

    const sidebar = document.querySelector('#sidebar');
    
    if (sidebar) {
      sidebar.addEventListener('mouseenter', handleMouseEnter);
      sidebar.addEventListener('mouseleave', handleMouseLeave);
    }
  }, [isOpen]);

  const classname = isOpen ? 'w-96' : 'w-28';

  if (roleUser === "ADMIN") {
    return (
      <aside className={`hidden lg:block fixed h-screen bg-primary text-muted z-50 ${classname}`} id="sidebar"> 
        <SidebarAdmin isOpen={isOpen}/>
      </aside>
    )
  }else{
    return (
      <aside className={`hidden lg:block fixed h-screen bg-primary text-muted z-50 ${classname}`} id="sidebar"> 
        <SidebarExtractor isOpen={isOpen}/>
      </aside>
    )
  }

}
