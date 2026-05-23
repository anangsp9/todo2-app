import { Check, Clock, CalendarDays } from "lucide-react";

const categoryStyles = {
  Work: "text-indigo-700 bg-[#e2dfff]",
  Personal: "text-purple-700 bg-purple-100",
  Shopping: "text-gray-500 bg-gray-100",
  General: "text-blue-700 bg-blue-100",
};

function TaskItem({ task, toggleTask }) {
  const catStyle =
    categoryStyles[task.category] ||
    "text-indigo-700 bg-[#e2dfff]";

  return (
    <div
      className={`group bg-white rounded-2xl px-5 py-4 flex items-center justify-between border border-transparent hover:border-gray-200 hover:bg-[#fcfcff] transition-all duration-200 shadow-sm ${
        task.completed ? "opacity-50" : ""
      }`}
      style={{ boxShadow: "0 4px 12px rgba(70, 69, 85, 0.05)" }}
    >
      <div className="flex items-start gap-4 flex-1">
        {/* Checkbox */}
        <button
          onClick={() => toggleTask(task.id)}
          className={`mt-1 w-5 h-5 rounded-md border flex items-center justify-center transition-colors duration-150 flex-shrink-0 ${
            task.completed
              ? "bg-emerald-600 border-emerald-600 text-white"
              : "border-gray-400 text-transparent hover:border-indigo-600"
          }`}
        >
          <Check size={13} strokeWidth={2.5} />
        </button>

        {/* Content */}
        <div className="flex flex-col gap-2">
          <span
            className={`text-[15px] font-medium ${
              task.completed
                ? "line-through text-gray-400"
                : "text-gray-800"
            }`}
          >
            {task.title}
          </span>

          {/* Meta */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Category */}
            <span
              className={`text-xs font-semibold px-2 py-1 rounded-full ${catStyle}`}
            >
              {task.category}
            </span>

            {/* Due Date */}
            {task.dueDate && (
              <span className="text-xs text-gray-500 flex items-center gap-1">
                <CalendarDays size={13} />
                {task.dueDate}
              </span>
            )}

            {/* Optional Time */}
            {task.time && (
              <span className="text-xs text-red-500 flex items-center gap-1 font-medium">
                <Clock size={13} />
                {task.time}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskItem;