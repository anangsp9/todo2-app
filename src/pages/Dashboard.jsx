import { useEffect, useState, useMemo } from "react";
import { LayoutList, CalendarDays, Calendar, CheckCircle2, } from "lucide-react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import TaskItem from "../components/TaskItem";
import QuickAdd from "../components/QuickAdd";
import AddTaskModal from "../components/AddTaskModal";
import { formatDueDate } from "../utils/dateUtils";
import { useTasks } from "../hooks/useTasks";
import { useAuth } from "../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";

function Dashboard() {
  const { user } = useAuth();
const {
  tasks,
  setTasks,
  fetchTasks,
  deleteTask,
  toggleTask,
  addTask,
  updateTask,
} = useTasks(user);
  const remaining = tasks.filter((t) => !t.completed).length;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

const activeFilter =
  location.pathname.split("/")[2] || "all";

useEffect(() => {
  if (!user) return;

  fetchTasks();
}, [user]);

useEffect(() => {
  if (!user) {
    setTasks([]);
  }
}, [user, setTasks]);

const today = new Date().toISOString().split("T")[0];

const filteredTasks = useMemo(() => {
  return tasks.filter((task) => {
    const matchesFilter = (() => {
      switch (activeFilter) {
        case "today":
          return task.dueDate === today && !task.completed;

        case "upcoming":
          return (
            Boolean(task.dueDate) &&
            task.dueDate > today &&
            !task.completed
          );

        case "completed":
          return task.completed;

        case "all":
        default:
          return true;
      }
    })();

    const keyword = searchTerm.trim().toLowerCase();

    const matchesSearch =
      keyword === "" ||
      (task.title || "").toLowerCase().includes(keyword) ||
      (task.category || "").toLowerCase().includes(keyword);

    return matchesFilter && matchesSearch;
  });
}, [tasks, activeFilter, today, searchTerm]);

  return (
    <div className="flex min-h-screen bg-[#f9f9ff] overflow-x-hidden">
      <Sidebar activeFilter={activeFilter} />

      <main className="flex-1 md:ml-64 flex flex-col min-h-screen bg-[#f9f9ff]">
        <Header
        onOpenModal={() => setIsModalOpen(true)}
        user={user}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        />

        <div className="flex-1 pt-24 px-4 md:px-10 pb-24 md:pb-8 flex justify-center w-full">
          <div className="w-full max-w-[800px] flex flex-col gap-6">
            {/* Page header */}
            <div className="flex items-end justify-between border-b border-gray-200 pb-3">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                  {new Date().toLocaleDateString("en-US", {
                    weekday: "long",
                  })}
                </h2>

                <p className="text-base text-gray-400 mt-1">
                  {new Date().toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
              <div className="text-xs font-semibold text-indigo-700 bg-[#e2dfff] px-3 py-1 rounded-full">
                {remaining} Task{remaining !== 1 ? "s" : ""} Left
              </div>
            </div>

            {/* Task list */}
            <div className="flex flex-col gap-3">
            {filteredTasks.length > 0 ? (
                filteredTasks.map((task) => (
                <TaskItem
                    key={task.id}
                    task={task}
                    formatDueDate={formatDueDate}
                    toggleTask={toggleTask}
                    onDelete={deleteTask}
                    onEdit={(task) => {
                    setEditingTask(task);
                    setIsModalOpen(true);
                    }}
                />
                ))
            ) : (
                <div className="py-10 text-center text-gray-400 text-sm">
                No tasks found.
                </div>
            )}

            <QuickAdd addTask={addTask} />
            </div>
          </div>
        </div>
      </main>

      {/* Mobile bottom nav */}
        <nav className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 flex justify-around items-center h-16 z-50">
        <button
            onClick={() => navigate("/tasks/all")}
            className={`flex flex-col items-center justify-center transition-colors ${
            activeFilter === "all"
                ? "text-indigo-700"
                : "text-gray-500"
            }`}
        >
            <LayoutList size={22} />
        </button>

        <button
            onClick={() => navigate("/tasks/today")}
            className={`flex flex-col items-center justify-center transition-colors ${
            activeFilter === "today"
                ? "text-indigo-700"
                : "text-gray-500"
            }`}
        >
            <CalendarDays size={22} />
        </button>

        <button
            onClick={() => navigate("/tasks/upcoming")}
            className={`flex flex-col items-center justify-center transition-colors ${
            activeFilter === "upcoming"
                ? "text-indigo-700"
                : "text-gray-500"
            }`}
        >
            <Calendar size={22} />
        </button>

        <button
            onClick={() => navigate("/tasks/completed")}
            className={`flex flex-col items-center justify-center transition-colors ${
            activeFilter === "completed"
                ? "text-indigo-700"
                : "text-gray-500"
            }`}
        >
            <CheckCircle2 size={22} />
        </button>
        </nav>

      <AddTaskModal
  isOpen={isModalOpen}
  onClose={() => {
    setIsModalOpen(false);
    setEditingTask(null);
  }}
  onAddTask={addTask}
  editingTask={editingTask}
  onUpdateTask={updateTask}
/>


    </div>
  );
}

export default Dashboard;