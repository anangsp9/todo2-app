import { useState } from "react";
import { Plus } from "lucide-react";

function QuickAdd({ addTask }) {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(value);
    setValue("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  return (
    <div className="mt-2 relative w-full group">
      <Plus
        size={18}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors duration-150"
      />
      <input
        type="text"
        placeholder="Quick add task (press Enter)"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-full bg-[#f1f3ff] border border-transparent rounded-lg py-3 pl-11 pr-4 text-base text-gray-800 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 focus:bg-white focus:shadow-[0_0_0_4px_rgba(79,70,229,0.1)] transition-all duration-150 placeholder:text-gray-400 outline-none"
      />
    </div>
  );
}

export default QuickAdd;