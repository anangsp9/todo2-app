import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";
import { LayoutList, CalendarDays, Calendar } from "lucide-react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import TaskItem from "./components/TaskItem";
import QuickAdd from "./components/QuickAdd";
import AddTaskModal from "./components/AddTaskModal";
import Login from "./pages/Login";
import { formatDueDate } from "./utils/dateUtils";
import { useTasks } from "./hooks/useTasks";

function App() {
  const { tasks, setTasks, fetchTasks, deleteTask, toggleTask, addTask, updateTask, } = useTasks();
  const [user, setUser] = useState(null);
const [loading, setLoading] = useState(true);

  const remaining = tasks.filter((t) => !t.completed).length;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [editingTask, setEditingTask] = useState(null);

useEffect(() => {
  if (!user) return;

  fetchTasks();
}, [user]);

useEffect(() => {
  const getUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    setUser(user);

    setLoading(false);
  };

  getUser();
}, []);

useEffect(() => {
  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange(
  (_, session) => {
    const currentUser = session?.user ?? null;

    setUser(currentUser);

    if (!currentUser) {
      setTasks([]);
    }
  }
);

  return () => subscription.unsubscribe();
}, []);

if (loading) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f9f9ff]">
      <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-700 rounded-full animate-spin"></div>
    </div>
  );
}

if (!user) {
  return <Login />;
}

  return (
    <div className="flex min-h-screen bg-[#f9f9ff] overflow-x-hidden">
      <Sidebar />

      <main className="flex-1 md:ml-64 flex flex-col min-h-screen bg-[#f9f9ff]">
        <Header onOpenModal={() => setIsModalOpen(true)} user={user} />

        <div className="flex-1 pt-24 px-4 md:px-10 pb-8 flex justify-center w-full">
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
              {tasks.map((task) => (
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

              ))}

              <QuickAdd addTask={addTask} />
            </div>
          </div>
        </div>
      </main>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 flex justify-around items-center h-16 z-50">
        <a href="#" className="flex flex-col items-center gap-1 text-gray-500">
          <LayoutList size={22} />
        </a>
        <a href="#" className="flex flex-col items-center gap-1 text-indigo-700">
          <CalendarDays size={22} />
        </a>
        <a href="#" className="flex flex-col items-center gap-1 text-gray-500">
          <Calendar size={22} />
        </a>
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

export default App;