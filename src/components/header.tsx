import AppContext from "@/context/AppContext";
import { useContext } from "react";
import SidebarToggle from "./icons/sidebarToggle";

function Header() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error(
      "AppContext is null, ensure it's provided in a parent component"
    );
  }

  const { toggleSidebar } = context;
  return (
    <div className="bg-[#1C1C1C] p-4 fixed z-10 w-full top-0 flex items-center gap-4">
      <button onClick={toggleSidebar} className="sidebar-toggle">
        <SidebarToggle />
      </button>
      <p className="font-semibold text-white">StyleGuide</p>
    </div>
  );
}

export default Header;
