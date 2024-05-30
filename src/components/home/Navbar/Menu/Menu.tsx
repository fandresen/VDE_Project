import { FaUser } from "react-icons/fa";
import {   IoNotifications } from "react-icons/io5";
import { LuFileSearch2 } from "react-icons/lu";
import DarkModeToogle from "./DarkModeToogle/DarkModeToogle";
import { Link } from 'react-router-dom';



export default function Menu() {



  return (
    <>
    <div>
      <Link to={"/extractor/workSpace"}>
          <LuFileSearch2  className="w-8 h-8"/>
      </Link>
        
    

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
