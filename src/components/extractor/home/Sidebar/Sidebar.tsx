import LogoVde from "../../../Others/LogoVde/LogoVde";
import Logout from "../../../Others/Logout/Logout";
import Content from "./Content/Content";

interface SidebarExtractorProps {
    isOpen: boolean;
}



export default function SidebarExtractor({isOpen}: SidebarExtractorProps) {

    const classname = isOpen ? "w-80" : ""
    
  return (
    <div className={`h-full flex flex-col gap-8 justify-between py-8 items-start px-6`}>
        <div className="flex justify-center px-2">
            <LogoVde />
        </div>
        <div className={`flex justify-center flex-col  gap-20 ${classname}`}>
            <Content isOpen={isOpen}/>
        </div>
        <div className="flex justify-center px-2">
            <Logout isOpen={isOpen}/>
        </div>
    </div>
  )
}
