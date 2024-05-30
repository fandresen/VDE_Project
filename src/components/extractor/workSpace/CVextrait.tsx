import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

const CVExtrait = () => {
  const [nbrCV,setNbrCv]=useState<number>()
  const newCvAdded = useSelector<RootState>((state)=>state.popUp.addCv)
  
  const fetchData = async ()=>{
    try {
      const res = (await axios.get('/extract/today')).data
      setNbrCv(res.today)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    fetchData()
  },[newCvAdded])
 

  return (
    <>
        <div className="bg-white w-[15vw] p-5 rounded-xl my-[4vh]">
            <h1 className="text-[12vh] text-secondary text-center font-bold pt-[1vh]">{nbrCV}</h1>
            <h1 className="text-[4vh] text-primary text-center font-bol">CV Extraits</h1>

        </div>
    </>
  )
}

export default  CVExtrait; 