import { GrUserAdmin } from "react-icons/gr";
import { MdLock } from "react-icons/md";
import { BiSolidBinoculars } from "react-icons/bi";
import { PiMouseDuotone } from "react-icons/pi";
import { SlEarphonesAlt } from "react-icons/sl";
import { AiOutlineLogout } from "react-icons/ai";


const nav = [
    {icon: GrUserAdmin, href:"#", name: "Admin", lock: MdLock},
    {icon: BiSolidBinoculars, href:"#", name: "Supervisor", lock: MdLock},
    {icon: PiMouseDuotone, href:"#", name: "Extracteur", lock: MdLock},
    {icon: SlEarphonesAlt, href:"#", name: "Sourcing", lock: MdLock}
]

interface NavBarProps {
    closeModal: () => void;
}

const NavBar:React.FC<NavBarProps> = ({closeModal}) => {
    
  return (

    <div onClick={closeModal} className={` ${window.innerWidth <= 1024 ? 'fixed top-[48px] right-0 overflow-auto w-full h-screen backdrop-blur-sm' : 'w-0 h-0'}`}>
            <div onClick={(e) => e.stopPropagation} className='absolute top-0  flex flex-col justify-start text-white bg-[#0F172A] min-h-[calc(100vh-96px)] w-[200px] rounded-xl left-0 lg:left-3 lg:top-[48px]'>
                {nav.map((item) => (
                    <div key={item.name} className="flex pl-4 items-center justify-between pt-5 ">
                        <item.icon className="size-5"/>
                        <div className="flex items-center justify-start w-[120px]">
                            <a className="pr-1" href={item.href}>{item.name}</a>
                            <item.lock/>
                        </div>
                    </div>
                ))}
                <div className="absolute bottom-5 left-[17px] text-white text-[20px] flex justify-center items-center bg-[#1E293B] w-[165px] h-[50px] rounded-full mt-[100px] hover:cursor-pointer">
                <AiOutlineLogout className="text-[#f72121]" />
                <button className="ml-3" type="submit">Log out</button>
                </div>
            </div>
        
    </div>
  )
}

export default NavBar