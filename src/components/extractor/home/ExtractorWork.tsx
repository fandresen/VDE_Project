import CVQuality from "./CVQuality/CVQuality";
import ConfirmedCV from "./ConfirmedCV/ConfirmedCV";
import ExtractedCV from "./ExtractedCV/ExtractedCV";
import Stat from "./HighlightStat/HighlightStat";
import ProgressionStatistics from "./ProgressionStatistics /ProgressionStatistics";


const ExtractorWork = () => {
  console.log("extractor");
  
  return (
    <div className="flex flex-col gap-16 p-10">
      <div>
        <Stat />
      </div>
      <div>
        <ExtractedCV />
      </div>
      <div>
        <ConfirmedCV />
      </div>
      <div>
        <CVQuality />
      </div>
      <div>
        <ProgressionStatistics />
      </div>
    </div>
  )
}

export default ExtractorWork