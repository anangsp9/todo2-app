import {
  Bell,
  Settings,
  Search,
} from "lucide-react";

function Header() {
  return (
    <header className="
border-b
border-gray-200
bg-white
px-4
lg:px-8
py-4
flex
flex-col
lg:flex-row
gap-4
lg:gap-0
items-start
lg:items-center
justify-between
">
      <div className="relative w-full lg:w-[480px]">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="text"
          placeholder="Search tasks..."
          className="w-full bg-[#f3f4ff] rounded-2xl pl-12 pr-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="flex items-center gap-4 flex-wrap">
        <button className="bg-indigo-700 hover:bg-indigo-800 text-white px-6 py-3 rounded-xl font-medium shadow-md transition-all">
          Add Task
        </button>

        <Bell className="text-gray-700 cursor-pointer" />
        <Settings className="text-gray-700 cursor-pointer" />

        <img
          src="https://i.pravatar.cc/100"
          alt="profile"
          className="w-11 h-11 rounded-full object-cover"
        />
      </div>
    </header>
  );
}

export default Header;