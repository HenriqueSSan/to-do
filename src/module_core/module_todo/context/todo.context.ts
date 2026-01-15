import { createContext, type ChangeEvent, type MouseEvent, type SetStateAction } from 'react';

export interface Task {
  id: number;
  title: string;
  completed: boolean;
  description?: string;
}

export const TodoContext = createContext(
  {} as {
    todos: Task[];
    editId: number | null;
    delTodo: (currentTodo: { id: number }) => void;
    editTodo: (currentTodo: Pick<Task, 'id' | 'title' | 'description'>) => void;
    setTodos: React.Dispatch<SetStateAction<Task[]>>;
    setEditId: React.Dispatch<SetStateAction<number | null>>;
    addedNewTodo: (params: { title: string }) => void;
    editFormData: { title: string; description?: string };
    showEditDialog: boolean;
    setEditFormData: React.Dispatch<SetStateAction<{ title: string; description?: string }>>;
    delByDataTodoId: (e: MouseEvent<HTMLButtonElement>) => void;
    editByDataTodoId: (e: MouseEvent<HTMLButtonElement>) => void;
    setShowEditDialog: React.Dispatch<SetStateAction<boolean>>;
    toggleCompletedTodo: (currentTodo: { id: number }) => void;
    toggleByDataCompletedTodoId: (e: ChangeEvent<HTMLInputElement>) => void;
  },
);
