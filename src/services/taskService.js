import { supabase } from "../lib/supabase";

export const getTasks = async (userId) => {
  return await supabase
    .from("tasks")
    .select("*")
    .eq("user_id", userId)
    .order("completed", { ascending: true })
    .order("created_at", { ascending: false });
};

export const createTask = async (task) => {
  return await supabase
    .from("tasks")
    .insert([task]);
};

export const updateTaskService = async (id, data) => {
  return await supabase
    .from("tasks")
    .update(data)
    .eq("id", id);
};

export const deleteTaskService = async (id) => {
  return await supabase
    .from("tasks")
    .delete()
    .eq("id", id);
};

export const toggleTaskService = async (id, completed) => {
  return await supabase
    .from("tasks")
    .update({
      completed,
    })
    .eq("id", id);
};