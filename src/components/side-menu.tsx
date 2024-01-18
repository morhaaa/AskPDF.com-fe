import React from "react";
import { section1 } from "@/constants/sidemenu";
import { LogOut } from "lucide-react";

interface SideMenuProps {
  section: Section;
  setSection: (sect: Section) => void;
}

const SideMenu: React.FC<SideMenuProps> = ({ section, setSection }) => {
  return (
    <menu className="bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 h-full w-full py-6 px-4 flex flex-col">
      <header className="border-b border-slate-800">
        <h2 className="text-slate-200 font-bold text-4xl p-4">cryptobot.</h2>
      </header>
      <section className="flex-1 px-6">
        <ul className="space-y-3 border-b py-10">
          {section1.map((item, index) => (
            <MenuItem key={index} item={item} isActive={item.name === section} />
          ))}
        </ul>
        <ul className="space-y-3 py-10">
          {section1.map((item, index) => (
            <MenuItem key={index} item={item} isActive={item.name === section} />
          ))}
        </ul>
      </section>
      <div className="px-4 pt-4 border-t border-slate-700 text-slate-400 flex items-center gap-x-2 hover:text-indigo-400 transition duration-300 cursor-pointer">
        <LogOut />
        <h2 className="font-bold text-lg">Logout</h2>
      </div>
    </menu>
  );
};

interface MenuItemProps {
  item: { icon: React.FC; name: string };
  isActive: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({ item, isActive }) => {
  return (
    <li
      className={`text-slate-200 font-semibold flex gap-x-2 items-center text-lg cursor-pointer transition duration-300 p-2 rounded-sm ${
        isActive ? "bg-gradient-to-r from-slate-700 via-slate-700/80 to-indigo-950/20 border-l-2 border-indigo-400" : " hover:text-indigo-400"
      }`}
    >
      <item.icon />
      <span>{item.name}</span>
    </li>
  );
};

export default SideMenu;