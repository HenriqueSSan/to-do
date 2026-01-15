import { useContext } from "react";
import { TodoContext } from "../context/todo.context";

export const useTodos = () => {
  return useContext(TodoContext);
};