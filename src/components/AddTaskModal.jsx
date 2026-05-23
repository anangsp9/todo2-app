import { X } from "lucide-react";
import { useState } from "react";

function AddTaskModal({ isOpen, onClose, onAddTask }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [time, setTime] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    // validasi wajib
    if (!title.trim() || !category) {
      alert("Task name dan category wajib diisi!");
      return;
    }

    onAddTask({
      title,
      category,
      dueDate,
      time,
    });

    // reset form
    setTitle("");
    setCategory("");
    setDueDate("");
    setTime("");

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="w-full max-w-md bg-white rounded-2xl p-6 shadow-2xl animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">
            Add New Task
          </h2>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          {/* Task Name */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Task Name *
            </label>

            <input
              type="text"
              placeholder="Enter task name..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Category *
            </label>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select category</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Shopping">Shopping</option>
              <option value="General">General</option>
            </select>
          </div>

          {/* Due Date */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Due Date
            </label>

            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Time */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Time
            </label>

            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="mt-2 bg-indigo-700 hover:bg-indigo-800 text-white py-3 rounded-xl font-medium transition"
          >
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddTaskModal;