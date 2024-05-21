import FifteenBreak from "./FifteenBreak/FifteenBreak";
import LunchBreak from "./LunchBreak/LunchBreak";
import SanitaryBreak from "./SanitaryBreak/SanitaryBreak";
import StartWork from "./StartWork/StartWork";

interface SidebarExtractorProps {
    isOpen?: boolean;
}

export default function Content({isOpen}: SidebarExtractorProps) {

    const spanClassname = isOpen ? "":"hidden"
    const buttonClassname = isOpen ? " hover:bg-button" : ""

    
  return (
    <>
        <button className={`flex items-center w-full gap-5 py-2 ${buttonClassname} sidebar-button h-20 px-2 rounded-3xl`}>
            <StartWork />
            <span className={`${spanClassname} text-xl`}>Start</span>
        </button>
        <button className={`flex items-center w-full gap-5 py-2 ${buttonClassname} sidebar-button h-20 px-2 rounded-3xl`}>
            <FifteenBreak />
            <span className={`${spanClassname} text-xl`}>Pause 15</span>
        </button>
        <button className={`flex items-center w-full gap-5 py-2 ${buttonClassname} sidebar-button h-20 px-2 rounded-3xl`}>
            <SanitaryBreak />
            <span className={`${spanClassname} text-xl`}>Pause sanitaire</span>
        </button>
        <button className={`flex items-center w-full gap-5 py-2 ${buttonClassname} sidebar-button h-20 px-2 rounded-3xl`}>
            <LunchBreak />
            <span className={`${spanClassname} text-xl`}>Pause Dej</span>
        </button>
    </>
  )
}
