import {
  LayoutList,
  CalendarDays,
  CheckCircle2,
  Plus,
  CircleHelp,
  LogOut,
} from "lucide-react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";

function Sidebar({activeFilter}) {

    const navigate = useNavigate();

    const logout = async () => {
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error(error);
        return;
      }

      navigate("/", { replace: true });
    };

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-[#f1f3ff] flex flex-col p-4 gap-y-2 shadow-sm z-50 hidden md:flex">
      <div className="mb-8 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-indigo-700 flex items-center justify-center text-white font-bold text-lg">
          T
        </div>
        <div>
          <h3 className="text-2xl font-black text-indigo-700 leading-tight">TaskFlow</h3>
          <p className="text-xs text-gray-500 font-semibold tracking-wide">Productivity Hub</p>
        </div>
      </div>

      <button className="w-full flex items-center justify-center gap-2 bg-indigo-700 text-white text-sm font-medium py-2.5 rounded-lg hover:bg-indigo-800 transition-colors duration-150 mb-4 shadow-md">
        <Plus size={16} />
        New Project
      </button>

      <nav className="flex-1 flex flex-col gap-1">
<SidebarItem
  icon={<LayoutList size={18} />}
  text="All Tasks"
  active={activeFilter === "all"}
  onClick={() => navigate("/tasks/all")}
/>

<SidebarItem
  icon={<CalendarDays size={18} />}
  text="Today"
  active={activeFilter === "today"}
  onClick={() => navigate("/tasks/today")}
/>

<SidebarItem
  icon={<CalendarDays size={18} />}
  text="Upcoming"
  active={activeFilter === "upcoming"}
  onClick={() => navigate("/tasks/upcoming")}
/>

<SidebarItem
  icon={<CheckCircle2 size={18} />}
  text="Completed"
  active={activeFilter === "completed"}
  onClick={() => navigate("/tasks/completed")}
/>
</nav>

      <div className="mt-auto flex flex-col gap-1">
        <SidebarItem icon={<CircleHelp size={18} />} text="Help Center" />
        <SidebarItem icon={<LogOut size={18} />} text="Log Out" onClick={logout} />
      </div>
    </aside>
  );
}

function SidebarItem({ icon, text, active, onClick, }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-4 px-4 py-2.5 rounded-lg transition-all duration-150 text-sm font-medium ${
        active
          ? "bg-indigo-700 text-white shadow-md scale-[0.97] translate-x-0.5 opacity-90"
          : "text-gray-600 hover:bg-[#e1e8fd]"
      }`}
    >
      {icon}
      {text}
    </button>
  );
}

export default Sidebar;