import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";
import { LayoutList, CalendarDays, Calendar } from "lucide-react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import TaskItem from "./components/TaskItem";
import QuickAdd from "./components/QuickAdd";
import AddTaskModal from "./components/AddTaskModal";

function App() {
  const [tasks, setTasks] = useState([]);

const toggleTask = async (id) => {
  const task = tasks.find((t) => t.id === id);

  const { error } = await supabase
    .from("tasks")
    .update({
      completed: !task.completed,
    })
    .eq("id", id);

  if (error) {
    console.error(error);
    return;
  }

  setTasks(
    tasks.map((t) =>
      t.id === id
        ? {
            ...t,
            completed: !t.completed,
          }
        : t
    )
  );
};

const deleteTask = async (id) => {
  const { error } = await supabase
    .from("tasks")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(error);
    return;
  }

  setTasks(tasks.filter((task) => task.id !== id));
};


const addTask = async (taskData) => {
  const { data, error } = await supabase
    .from("tasks")
    .insert([
      {
        title: taskData.title,
        category: taskData.category,
        due_date: taskData.dueDate || null,
        task_time: taskData.time || null,
        completed: false,
      },
    ])
    .select()
    .single();

  if (error) {
    console.error(error);
    return;
  }

  setTasks([
    {
      id: data.id,
      title: data.title,
      category: data.category,
      dueDate: data.due_date,
      time: data.task_time,
      completed: data.completed,
    },
    ...tasks,
  ]);
};

const updateTask = async (updatedTask) => {
  const { error } = await supabase
    .from("tasks")
    .update({
      title: updatedTask.title,
      category: updatedTask.category,
      due_date: updatedTask.dueDate,
      task_time: updatedTask.time,
      completed: updatedTask.completed,
    })
    .eq("id", updatedTask.id);

  if (error) {
    console.error(error);
    return;
  }

  setTasks(
    tasks.map((task) =>
      task.id === updatedTask.id
        ? updatedTask
        : task
    )
  );

  setEditingTask(null);
};


  const remaining = tasks.filter((t) => !t.completed).length;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [editingTask, setEditingTask] = useState(null);

  const formatDueDate = (dateString) => {
  if (!dateString) return "";

  const today = new Date();
  const target = new Date(dateString);

  // reset jam agar perbandingan tanggal akurat
  today.setHours(0, 0, 0, 0);
  target.setHours(0, 0, 0, 0);

  const diffTime = target - today;
  const diffDays = diffTime / (1000 * 60 * 60 * 24);

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Tomorrow";
  if (diffDays === -1) return "Yesterday";

  return target.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
};

const fetchTasks = async () => {
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .order("created_at", { ascending: false });

    console.log("DATA:", data);
  console.log("ERROR:", error);
  console.log("JUMLAH DATA:", data?.length);

  if (!error) {
    const formattedTasks = data.map((task) => ({
      id: task.id,
      title: task.title,
      category: task.category,
      dueDate: task.due_date,
      time: task.task_time,
      completed: task.completed,
    }));

    setTasks(formattedTasks);
  }
};

useEffect(() => {
  fetchTasks();
}, []);

  return (
    <div className="flex min-h-screen bg-[#f9f9ff] overflow-x-hidden">
      <Sidebar />

      <main className="flex-1 md:ml-64 flex flex-col min-h-screen bg-[#f9f9ff]">
        <Header onOpenModal={() => setIsModalOpen(true)} />

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