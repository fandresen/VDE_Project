import Table from "./Table/Table";
import Today from "./Today/Today";


export default function ProgressionStatistics() {
  return (
    <div className="flex gap-10 justify-between">
        <div className="">
            <Today />
        </div>
        <div className="w-full">
            <Table />
        </div>
    </div>
  )
}
