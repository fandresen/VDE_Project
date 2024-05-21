// import Content from "./Content";

import Content from "./Content/Content";
import Navbar from "./Navbar/Navbar";
import Sidebar from "./Sidebar/Sidebar";

export default function Home() {
  return (
    <div className="relative bg-bglight dark:bg-bgdark">
      <Sidebar />

      <div className="lg:ml-28 min-h-screen">
        <Navbar />
        <Content />
      </div>
    </div>
  );
}
