import {
  LayoutList,
  CalendarDays,
  CheckCircle2,
  Plus,
  CircleHelp,
  LogOut,
} from "lucide-react";

function Sidebar() {
  return (
    <aside className="
w-full
lg:w-[280px]
bg-[#eef1ff]
border-r
border-gray-200
flex
flex-col
justify-between
p-4
lg:p-6
">
      <div>
        <div className="flex items-center gap-3 mb-10">
          <div className="w-12 h-12 rounded-full bg-indigo-700 text-white flex items-center justify-center font-bold">
            T
          </div>

          <div>
            <h1 className="text-3xl font-bold text-indigo-700">
              TaskFlow
            </h1>

            <p className="text-gray-500 text-sm">
              Productivity Hub
            </p>
          </div>
        </div>

        <button className="w-full bg-indigo-700 hover:bg-indigo-800 transition-all text-white py-4 rounded-2xl flex items-center justify-center gap-2 font-medium shadow-md mb-8">
          <Plus size={18} />
          New Project
        </button>

        <nav className="flex lg:block gap-2 overflow-x-auto lg:overflow-visible">
          <SidebarItem
            icon={<LayoutList size={20} />}
            text="All Tasks"
          />

          <SidebarItem
            active
            icon={<CalendarDays size={20} />}
            text="Today"
          />

          <SidebarItem
            icon={<CalendarDays size={20} />}
            text="Upcoming"
          />

          <SidebarItem
            icon={<CheckCircle2 size={20} />}
            text="Completed"
          />
        </nav>
      </div>

      <div className="space-y-4">
        <SidebarItem
          icon={<CircleHelp size={20} />}
          text="Help Center"
        />

        <SidebarItem
          icon={<LogOut size={20} />}
          text="Log Out"
        />
      </div>
    </aside>
  );
}

function SidebarItem({ icon, text, active }) {
  return (
    <button
      className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all font-medium ${
        active
          ? "bg-indigo-700 text-white shadow-md"
          : "text-gray-700 hover:bg-white"
      }`}
    >
      {icon}
      {text}
    </button>
  );
}

export default Sidebar;