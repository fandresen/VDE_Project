import { useSelector } from "react-redux";
import { RootState } from "../../../../../redux/store";
import { IoMoon, IoSunny } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { switchMode } from "../../../../../redux/modeSlice";

export default function DarkModeToogle() {
  const isDarkMode = useSelector((state: RootState) => state.mode.state);
  const dispatch  = useDispatch() 

  const darkModeToogle = () => {
    dispatch(switchMode())
  }

  if (isDarkMode) {
    return (
      <>
        <IoSunny className="w-8 h-8" onClick={darkModeToogle}/>
      </>
    );
  } else {
    return (
      <>
        <IoMoon className="w-8 h-8" onClick={darkModeToogle}/>
      </>
    );
  }
}
