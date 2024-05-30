import RadialProgressBar from "../../../../Others/RadiaProgress/RadialProgress";

interface YesterdayProps {
  data: number
}

export default function YesterdayCV({data = 0}: YesterdayProps) {
  return (
    <div className="rounded-3xl border border-black20 shadow-xl shadow-black20  p-10 flex flex-col gap-2 h-full">
        <div className="text-4xl text-black20">CV</div>
        <div className="flex justify-center">
          <RadialProgressBar value={data} textColor="text-blue-500" barColor="text-secondary" barWidth={25} size={160} />
        </div>
        <div className="flex justify-center text-2xl font-bold">16 Mai 2024</div>
    </div>
  )
}
