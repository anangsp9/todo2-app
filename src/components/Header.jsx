import { Bell, Settings, Search, Plus } from "lucide-react";

function Header() {
  return (
    <header className="fixed top-0 left-0 md:left-64 right-0 z-40 flex justify-between items-center px-4 md:px-8 lg:px-10 h-16 bg-white border-b border-gray-200">
      
      {/* Search */}
      <div className="flex items-center flex-1 max-w-md md:ml-2">
        <div className="relative w-full">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search tasks..."
            className="w-full bg-[#f1f3ff] border-none rounded-full py-2 pl-10 pr-4 text-sm text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all duration-150 placeholder:text-gray-400"
          />
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-4 ml-auto">
        <button className="hidden md:flex items-center gap-2 bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-indigo-800 transition-colors duration-150 shadow-md">
          <Plus size={16} />
          Add Task
        </button>

        <button className="text-gray-500 hover:bg-gray-100 p-2 rounded-full transition-colors duration-150">
          <Bell size={20} />
        </button>

        <button className="text-gray-500 hover:bg-gray-100 p-2 rounded-full transition-colors duration-150">
          <Settings size={20} />
        </button>

        <img
          src="https://i.pravatar.cc/100"
          alt="profile"
          className="w-8 h-8 rounded-full border border-gray-200 cursor-pointer object-cover"
        />
      </div>
    </header>
  );
}

export default Header;