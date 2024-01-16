import { section1 } from "@/constants/sidemenu";
import { LogOut } from "lucide-react";

const SideMenu: React.FC = () => {
  return (
    <menu className="bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 h-full w-full flex flex-col">
      <header className="text-center pb-5 pt-3 border-b border-slate-700">
        <h2 className="text-slate-200 font-bold text-4xl">cryptobot.</h2>
      </header>
      <section className="flex-1 px-6">
        <ul className="space-y-3 border-b py-10">
        {section1.map((item, index) => (
          <li
            key={index} 
            className="text-slate-200 font-semibold flex gap-x-2 items-center text-lg hover:text-indigo-400 cursor-pointer transition duration-300 bo"
          >
              <item.icon />
              <span>{item.name}</span>

          </li>
        ))}
        </ul>
        <ul className="space-y-3 py-10">
     {section1.map((item, index) => (
          <li
            key={index}
            className="text-slate-200 font-semibold text-lg flex gap-x-2 items-center hover:text-indigo-400 cursor-pointer transition duration-300"
          >
              <item.icon />
              <span>{item.name}</span>
          </li>
        ))}
        </ul>
      </section>
      <div className="px-4 pb-5 pt-3 border-b border-slate-700 text-slate-400 flex items-center gap-x-2 hover:text-indigo-400 transition duration-300 cursor-pointer">
        <LogOut />
        <h2 className="font-bold text-lg">Logout</h2>
      </div>
    </menu>
  );
};

export default SideMenu;
