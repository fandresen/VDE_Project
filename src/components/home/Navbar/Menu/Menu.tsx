import { FaUser } from "react-icons/fa";
import {   IoNotifications } from "react-icons/io5";
import { LuFileSearch2 } from "react-icons/lu";
import DarkModeToogle from "./DarkModeToogle/DarkModeToogle";



export default function Menu() {



  return (
    <>
    <div>
        <LuFileSearch2  className="w-8 h-8"/>
    </div>
    <div>
        <IoNotifications  className="w-8 h-8"/>
    </div>
    <div>
        <DarkModeToogle />
    </div>
    <div>
        <FaUser className="w-8 h-8"/>
    </div>
    </>
  )
}
