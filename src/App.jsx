import { useState } from "react";
import { LayoutList, CalendarDays, Calendar } from "lucide-react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import TaskItem from "./components/TaskItem";
import QuickAdd from "./components/QuickAdd";

function App() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Finish project proposal",
      category: "Work",
      dueDate: "Today",
      time: "14:00",
      completed: false,
    },
    {
      id: 2,
      title: "Call mom",
      category: "Personal",
      dueDate: "Today",
      time: "",
      completed: false,
    },
    {
      id: 3,
      title: "Buy groceries",
      category: "Shopping",
      dueDate: "",
      time: "",
      completed: true,
    },
  ]);

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const addTask = (title) => {
    if (!title.trim()) return;

    const newTask = {
      id: Date.now(),
      title,
      category: "General",
      dueDate: "Today",
      time: "",
      completed: false,
    };

    setTasks([newTask, ...tasks]);
  };

  const remaining = tasks.filter((t) => !t.completed).length;

  return (
    <div className="flex min-h-screen bg-[#f9f9ff] overflow-x-hidden">
      <Sidebar />

      <main className="flex-1 md:ml-64 flex flex-col min-h-screen bg-[#f9f9ff]">
        <Header />

        <div className="flex-1 pt-24 px-4 md:px-10 pb-8 flex justify-center w-full">
          <div className="w-full max-w-[800px] flex flex-col gap-6">
            {/* Page header */}
            <div className="flex items-end justify-between border-b border-gray-200 pb-3">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                  Today
                </h2>
                <p className="text-base text-gray-400 mt-1">Wednesday, October 25</p>
              </div>
              <div className="text-xs font-semibold text-indigo-700 bg-[#e2dfff] px-3 py-1 rounded-full">
                {remaining} Task{remaining !== 1 ? "s" : ""} Left
              </div>
            </div>

            {/* Task list */}
            <div className="flex flex-col gap-3">
              {tasks.map((task) => (
                <TaskItem key={task.id} task={task} toggleTask={toggleTask} />
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
    </div>
  );
}

export default App;