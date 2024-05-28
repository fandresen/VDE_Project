import LastWeekCV from "../LastWeekCV/LastWeekCV";
import TodayCV from "./TodayCV/TodayCV";
import WorkDuration from "./WorkDuration/WorkDuration";


export default function HighlightStat() {
  return (
    <div className="flex gap-16 justify-center">
      <div className="w-1/4">
        <LastWeekCV />
      </div>
      <div className="w-1/4">
        <TodayCV />
      </div>
      <div className="w-2/4">
        <WorkDuration />
      </div>
    </div>
  )
}
