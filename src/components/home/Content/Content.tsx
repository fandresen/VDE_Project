import { Outlet } from "react-router-dom";
import ExtractorWork from "../../extractor/home/ExtractorWork";

export default function Content() {
  const roleUser = "ADMIN"

  if (roleUser === "ADMIN") {
    return (
      <>
           <Outlet />
      </>
    )
  }else{
    return (
      <>
           <ExtractorWork />
      </>
    )
  }
  
}
