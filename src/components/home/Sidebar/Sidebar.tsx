import { useEffect, useState } from "react";
import SidebarExtractor from "../../extractor/Sidebar/Sidebar";


export default function Sidebar() {

  const [isOpen, setIsOpen] = useState(false);
  

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

  return (
    <aside className={`hidden lg:block fixed h-screen bg-primary text-muted z-50 ${classname}`} id="sidebar"> 
      <SidebarExtractor isOpen={isOpen}/>
    </aside>
  )
}
