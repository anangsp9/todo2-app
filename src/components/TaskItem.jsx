import { Check, Clock3 } from "lucide-react";

function TaskItem({ task, toggleTask }) {
  return (
    <div
      className={`bg-white
rounded-2xl
px-4
lg:px-5
py-4
lg:py-5
flex
flex-col
sm:flex-row
gap-4
sm:items-center
justify-between shadow-sm border border-gray-100 hover:bg-gray-50 transition-all ${
        task.completed && "opacity-60"
      }`}
    >
      <div className="flex items-center gap-3 flex-wrap">
        <button
          onClick={() => toggleTask(task.id)}
          className={`w-6 h-6 rounded-md border flex items-center justify-center transition-all ${
            task.completed
              ? "bg-emerald-500 border-emerald-500"
              : "border-gray-400"
          }`}
        >
          {task.completed && (
            <Check size={16} className="text-white" />
          )}
        </button>

        <p
          className={`text-base sm:text-lg lg:text-xl ${
            task.completed
              ? "line-through text-gray-400"
              : "text-[#141b2b]"
          }`}
        >
          {task.title}
        </p>
      </div>

      <div className="flex items-center gap-4">
        <span className="bg-indigo-100 text-indigo-700 px-4 py-1 rounded-full text-sm font-medium">
          {task.category}
        </span>

        {task.time && (
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <Clock3 size={15} />
            {task.time}
          </div>
        )}
      </div>
    </div>
  );
}

export default TaskItem;