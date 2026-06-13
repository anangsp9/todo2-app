import { useEffect, useState, useMemo } from "react";
import {
  LayoutList,
  CalendarDays,
  Calendar,
  CheckCircle2,
  Plus,
} from "lucide-react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import TaskItem from "../components/TaskItem";
import QuickAdd from "../components/QuickAdd";
import AddTaskModal from "../components/AddTaskModal";
import { formatDueDate } from "../utils/dateUtils";
import { useTasks } from "../hooks/useTasks";
import { useAuth } from "../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

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
  const completed = tasks.filter((t) => t.completed).length;
  const totalTasks = tasks.length;
  const progressPercent =
    totalTasks === 0 ? 0 : Math.round((completed / totalTasks) * 100);

  const displayName = user?.email?.split("@")[0] || "Guest";

  const now = new Date();
  const currentHour = now.getHours();

  const greeting =
    currentHour < 12
      ? "Good Morning"
      : currentHour < 17
        ? "Good Afternoon"
        : currentHour < 20
          ? "Good Evening"
          : "Good Night";

  const greetingEmoji =
    currentHour < 12
      ? "☀️"
      : currentHour < 17
        ? "🌤️"
        : currentHour < 20
          ? "🌇"
          : "🌙";

  const todayText = now.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const activeFilter = location.pathname.split("/")[2] || "all";

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
              Boolean(task.dueDate) && task.dueDate > today && !task.completed
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
      <Sidebar
        activeFilter={activeFilter}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <main className="flex-1 md:ml-64 flex flex-col min-h-screen bg-[#f9f9ff]">
        <Header
          onOpenModal={() => setIsModalOpen(true)}
          user={user}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onMenuClick={() => setIsSidebarOpen(true)}
        />

        <div className="flex-1 pt-24 px-4 md:px-10 pb-24 md:pb-8 flex justify-center w-full">
          <div className="w-full max-w-[800px] flex flex-col gap-6">
            {/* Page header */}
            <div className="flex items-end justify-between border-b border-gray-200 pb-5">
              <div className="flex flex-col gap-2">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                    {greeting}, {displayName}!{" "}
                    <span className="inline-block">{greetingEmoji}</span>
                  </h2>

                  <p className="text-base text-gray-400 mt-1">{todayText}</p>
                </div>

                <div className="mt-2 w-full max-w-[280px]">
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span
                      className={`font-medium ${
                        progressPercent === 100
                          ? "text-emerald-600"
                          : "text-indigo-700"
                      }`}
                    >
                      {progressPercent === 100
                        ? "🎉 All tasks completed!"
                        : `✓ Progress: ${completed}/${totalTasks} completed`}
                    </span>

                    <span className="text-gray-400 text-xs">
                      {progressPercent}%
                    </span>
                  </div>

                  <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500"
                      animate={{ width: `${progressPercent}%` }}
                      transition={{
                        type: "spring",
                        stiffness: 120,
                        damping: 20,
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="text-xs font-semibold text-indigo-700 bg-[#e2dfff] px-3 py-1 rounded-full">
                {remaining} Task{remaining !== 1 ? "s" : ""} Left
              </div>
            </div>

            {/* Task list */}
            <div className="flex flex-col gap-3">
              {filteredTasks.length > 0 ? (
                <AnimatePresence mode="popLayout">
                  {filteredTasks.map((task) => (
                    <motion.div
                      key={task.id}
                      layout
                      initial={{ opacity: 0, y: -15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 15 }}
                      transition={{
                        layout: {
                          duration: 0.8,
                          type: "spring",
                          stiffness: 100,
                          damping: 30,
                        },
                        duration: 0.4,
                      }}
                    >
                      <TaskItem
                        task={task}
                        formatDueDate={formatDueDate}
                        toggleTask={toggleTask}
                        onDelete={deleteTask}
                        onEdit={(task) => {
                          setEditingTask(task);
                          setIsModalOpen(true);
                        }}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
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

      {/* Mobile Floating Action Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="
        md:hidden
        fixed
        bottom-20
        right-5
        z-50
        w-14
        h-14
        rounded-full
        bg-indigo-600
        text-white
        flex
        items-center
        justify-center
        shadow-[0_8px_24px_rgba(79,70,229,0.35)]
        backdrop-blur-sm
        transition-all
        duration-200
        hover:bg-indigo-700
        active:scale-95
        "
        aria-label="Add Task"
      >
        <Plus size={28} strokeWidth={2.5} />
      </button>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 flex justify-around items-center h-16 z-50">
        <button
          onClick={() => navigate("/tasks/all")}
          className={`flex flex-col items-center justify-center transition-colors ${
            activeFilter === "all" ? "text-indigo-700" : "text-gray-500"
          }`}
        >
          <LayoutList size={22} />
        </button>

        <button
          onClick={() => navigate("/tasks/today")}
          className={`flex flex-col items-center justify-center transition-colors ${
            activeFilter === "today" ? "text-indigo-700" : "text-gray-500"
          }`}
        >
          <CalendarDays size={22} />
        </button>

        <button
          onClick={() => navigate("/tasks/upcoming")}
          className={`flex flex-col items-center justify-center transition-colors ${
            activeFilter === "upcoming" ? "text-indigo-700" : "text-gray-500"
          }`}
        >
          <Calendar size={22} />
        </button>

        <button
          onClick={() => navigate("/tasks/completed")}
          className={`flex flex-col items-center justify-center transition-colors ${
            activeFilter === "completed" ? "text-indigo-700" : "text-gray-500"
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
