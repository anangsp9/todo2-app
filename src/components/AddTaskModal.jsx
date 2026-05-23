import { X, CalendarDays, Clock3 } from "lucide-react";
import { useState } from "react";

function AddTaskModal({ isOpen, onClose, onAddTask }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [time, setTime] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !category) {
      alert("Task name dan task type wajib diisi!");
      return;
    }

    onAddTask({
      title,
      category,
      dueDate,
      time,
    });

    // reset
    setTitle("");
    setCategory("");
    setDueDate("");
    setTime("");

    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">

      {/* Modal */}
      <div className="w-full max-w-[420px] overflow-hidden rounded-xl bg-white shadow-2xl animate-in fade-in zoom-in duration-200">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Add New Task
          </h3>

          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-gray-500 transition hover:bg-gray-100"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>

          <div className="flex flex-col gap-4 px-5 py-5">

            {/* Task Name */}
            <div className="flex flex-col items-start gap-1.5">
              <label className="text-sm font-medium text-gray-600 text-left w-full">
                Task Name *
              </label>

              <input
                type="text"
                placeholder="Enter task name..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-[#f1f3ff] px-3 py-2.5 text-sm text-gray-800 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Task Type */}
            <div className="flex flex-col items-start gap-1.5">
              <label className="text-sm font-medium text-gray-600 text-left w-full">
                Task Type *
              </label>

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-[#f1f3ff] px-3 py-2.5 text-sm text-gray-800 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Select task type</option>
                <option value="Work">Work</option>
                <option value="Personal">Personal</option>
                <option value="Shopping">Shopping</option>
                <option value="General">General</option>
              </select>
            </div>

            {/* Due Date */}
            <div className="flex flex-col items-start gap-1.5">
              <label className="text-sm font-medium text-gray-600 text-left w-full">
                Due Date
              </label>

              <div className="relative w-full">
                <CalendarDays
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                />

                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-[#f1f3ff] py-2.5 pl-10 pr-3 text-sm text-gray-800 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* Time */}
            <div className="flex flex-col items-start gap-1.5">
              <label className="text-sm font-medium text-gray-600 text-left w-full">
                Time
              </label>

              <div className="relative w-full">
                <Clock3
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                />

                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-[#f1f3ff] py-2.5 pl-10 pr-3 text-sm text-gray-800 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-2 bg-[#f7f8ff] px-5 py-4">

            <button
              type="button"
              onClick={onClose}
              className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-200"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700"
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTaskModal;