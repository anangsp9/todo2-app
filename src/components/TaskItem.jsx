import {
  Clock,
  CalendarDays,
  MoreVertical,
  Pencil,
  Trash2,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import PixelCheckbox from "./PixelCheckbox";
import ElectricBorder from "./ElectricBorder";

const categoryStyles = {
  Work: "text-indigo-700 bg-[#e2dfff]",
  Personal: "text-purple-700 bg-purple-100",
  Shopping: "text-gray-500 bg-gray-100",
  General: "text-blue-700 bg-blue-100",
};

function TaskItem({
  task,
  formatDueDate,
  toggleTask,
  onDelete,
  onEdit,
}) {
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef(null);

  const catStyle =
    categoryStyles[task.category] ||
    "text-indigo-700 bg-[#e2dfff]";

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const taskCard = (
    <div
      className={`group bg-white rounded-2xl px-5 py-4 flex items-center justify-between border border-transparent hover:border-gray-200 hover:bg-[#fcfcff] transition-all duration-200 shadow-sm relative z-0 ${
        task.completed ? "opacity-50" : ""
      }`}
      style={{ boxShadow: "0 4px 12px rgba(70, 69, 85, 0.05)" }}
    >
      <div className="flex items-center gap-4 flex-1">
        {/* Pixel Checkbox */}
        <div
          className="shrink-0"
          onClick={(e) => e.stopPropagation()}
        >
          <PixelCheckbox
            checked={task.completed}
            onChange={() => toggleTask(task.id)}
          />
        </div>

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
                {formatDueDate(task.dueDate)}
              </span>
            )}

            {/* Time */}
            {task.time && (
              <span className="text-xs text-red-500 flex items-center gap-1 font-medium">
                <Clock size={13} />
                {task.time}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Kebab Menu */}
      <div className="relative ml-4" ref={menuRef}>
        <button
          onClick={() => setOpenMenu(!openMenu)}
          className="p-2 rounded-lg hover:bg-gray-100 transition"
        >
          <MoreVertical size={18} className="text-gray-500" />
        </button>

        {openMenu && (
          <div className="absolute right-0 top-11 z-60">
            <ElectricBorder
              color="#6366f1"
              speed={0.8}
              chaos={0.025}
              borderRadius={12}
              style={{ borderRadius: 12 }}
            >
              <div className="w-40 rounded-xl bg-white overflow-hidden shadow-2xl">
                <button
                  onClick={() => {
                    onEdit(task);
                    setOpenMenu(false);
                  }}
                  className="w-full flex items-center gap-2 px-4 py-3 text-sm text-gray-700 bg-white hover:bg-gray-50 transition"
                >
                  <Pencil size={16} />
                  Edit Task
                </button>

                <button
                  onClick={() => {
                    onDelete(task.id);
                    setOpenMenu(false);
                  }}
                  className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-500 bg-white hover:bg-red-50 transition"
                >
                  <Trash2 size={16} />
                  Delete Task
                </button>
              </div>
            </ElectricBorder>
          </div>
        )}
      </div>
    </div>
  );

  if (task.completed || openMenu) {
    return (
      <div className={openMenu ? "relative z-50" : "relative"}>
        {taskCard}
      </div>
    );
  }

  return (
    <div className="relative">
      <ElectricBorder
        color="#6366f1"
        speed={0.5}
        chaos={0.045}
        borderRadius={16}
        style={{ borderRadius: 16 }}
      >
        {taskCard}
      </ElectricBorder>
    </div>
  );
}

export default TaskItem;