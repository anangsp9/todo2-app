import { useState } from "react";
import { supabase } from "../lib/supabase";
import { getTasks,createTask,updateTaskService,deleteTaskService,toggleTaskService, } from "../services/taskService";

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);

    const fetchTasks = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  const { data, error } = await getTasks(user.id);

  if (error) {
    console.error(error);
    return;
  }

  const formattedTasks = data.map((task) => ({
    id: task.id,
    title: task.title,
    category: task.category,
    dueDate: task.due_date,
    time: task.task_time,
    completed: task.completed,
  }));

  setTasks(formattedTasks);
};

const deleteTask = async (id) => {
  const { error } = await deleteTaskService(id);

  if (error) {
    console.error(error);
    return;
  }

  await fetchTasks();
};

const toggleTask = async (id) => {
  const task = tasks.find((t) => t.id === id);

  if (!task) return;

  const { error } = await toggleTaskService(
    id,
    !task.completed
  );

  if (error) {
    console.error(error);
    return;
  }

  await fetchTasks();
};

const addTask = async (taskData) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  const { error } = await createTask({
    title: taskData.title,
    category: taskData.category,
    due_date: taskData.dueDate || null,
    task_time: taskData.time || null,
    completed: false,
    user_id: user.id,
  });

  if (error) {
    console.error(error);
    return;
  }

  await fetchTasks();
};

const updateTask = async (updatedTask) => {
  const { error } = await updateTaskService(
    updatedTask.id,
    {
      title: updatedTask.title,
      category: updatedTask.category,
      due_date: updatedTask.dueDate || null,
      task_time: updatedTask.time || null,
      completed: updatedTask.completed,
    }
  );

  if (error) {
    console.error(error);
    return false;
  }

  await fetchTasks();

  return true;
};

  return {
    tasks,
    setTasks,
    fetchTasks,
    deleteTask,
    toggleTask,
    addTask,
    updateTask,
  };
};