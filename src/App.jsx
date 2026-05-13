import { useState } from "react";
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
      time: "2:00 PM",
      completed: false,
    },
    {
      id: 2,
      title: "Call mom",
      category: "Personal",
      time: "Today",
      completed: false,
    },
    {
      id: 3,
      title: "Buy groceries",
      category: "Shopping",
      time: "",
      completed: true,
    },
  ]);

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  const addTask = (title) => {
    if (!title.trim()) return;

    const newTask = {
      id: Date.now(),
      title,
      category: "General",
      time: "Today",
      completed: false,
    };

    setTasks([newTask, ...tasks]);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#f9f9ff]">
      <Sidebar />

      <main className="flex-1">
        <Header />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-10 py-6 lg:py-10 w-full">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#141b2b]">
                Today
              </h1>

              <p className="text-gray-500 mt-2 text-lg">
                Wednesday, October 25
              </p>
            </div>

            <div className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-semibold">
              {tasks.filter((task) => !task.completed).length} Tasks Left
            </div>
          </div>

          <div className="space-y-4">
            {tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                toggleTask={toggleTask}
              />
            ))}

            <QuickAdd addTask={addTask} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;