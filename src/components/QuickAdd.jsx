import { useState } from "react";
import { Plus } from "lucide-react";

function QuickAdd({ addTask }) {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    addTask(value);
    setValue("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#eef1ff] rounded-2xl px-5 py-4 flex items-center gap-3 mt-8"
    >
      <Plus className="text-gray-500" />

      <input
        type="text"
        placeholder="Quick add task (press Enter)"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="bg-transparent w-full outline-none text-lg"
      />
    </form>
  );
}

export default QuickAdd;