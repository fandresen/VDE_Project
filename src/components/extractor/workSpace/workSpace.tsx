import CVExtrait from "./CVextrait";
import InsertCVForm from "./InsertCv"
import RangExtracteur from "./RangExtracteur";
import InsertEmail from "./insertEmail";


const ExtractorWorkspace = () => {
  return (
    <>
      <div className="flex justify-between mx-auto w-[85vw]">
        <CVExtrait/>
        <RangExtracteur/>
      </div>
        <InsertCVForm/>
        <InsertEmail/>
    </>
  )
}

export default  ExtractorWorkspace; 