import { useSelector } from "react-redux";
import CVExtrait from "./CVextrait";
import InsertCVForm from "./InsertCv"
import RangExtracteur from "./RangExtracteur";
import InsertEmail from "./insertEmail";
import { RootState } from "../../../redux/store";
import ModalEdit from "./modalEdit";


const ExtractorWorkspace = () => {
  const showModalEdit = useSelector<RootState>((state)=>state.popUp.editpopUpShow)
  return (
    <>
      <div className="flex justify-between mx-auto w-[85vw]">
        <CVExtrait/>
        <RangExtracteur/>
      </div>
        <InsertCVForm/>
        <InsertEmail/>
        {
           showModalEdit?<ModalEdit/>:''
        }

    </>
  )
}

export default  ExtractorWorkspace; 