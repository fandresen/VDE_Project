import Menu from "./Menu/Menu";


export default function Navbar() {
  return (
    <div className="flex justify-between px-10 py-3 border-b-2 border-black20">
        <div className="w-full text-black80 text-xl">21 May 2024</div>
        <div className="w-full"></div>
        <div className="flex justify-end w-full gap-20">
            <Menu />              
        </div>
    </div>
  )
}
