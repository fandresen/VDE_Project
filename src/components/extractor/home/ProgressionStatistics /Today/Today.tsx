import BarChart from "../Barchart/Barchart";



export default function Today() {
  return (
    <div className='rounded-3xl border border-black20 shadow-xl shadow-black20  p-10 flex flex-col gap-10 h-full'>
        <div className='text-2xl font-bold flex justify-center text-base'>
            <h1>Votre progression aujourd'hui</h1>
        </div>
        <BarChart />
    </div>
  )
}
