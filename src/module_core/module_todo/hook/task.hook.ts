import { useContext } from "react";
import { TaskContext } from "../context/task.context";

export const useTasks = () => {
  return useContext(TaskContext);
};