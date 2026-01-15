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
    showEditDialog: boolean;
    delTodo: (currentTodo: { id: number }) => void;
    setTodos: React.Dispatch<SetStateAction<Task[]>>;
    addedNewTodo: (params: { title: string }) => void;
    editFormData: { title: string; description?: string };
    setEditId: React.Dispatch<SetStateAction<number | null>>;
    toggleCompletedTodo: (currentTodo: { id: number }) => void;
    setShowEditDialog: React.Dispatch<SetStateAction<boolean>>;
    delByDataTodoId: (e: MouseEvent<HTMLButtonElement>) => void;
    editByDataTodoId: (e: MouseEvent<HTMLButtonElement>) => void;
    toggleByDataCompletedTodoId: (e: ChangeEvent<HTMLInputElement>) => void;
    editTodo: (currentTodo: Pick<Task, 'id' | 'title' | 'description'>) => void;
    setEditFormData: React.Dispatch<SetStateAction<{ title: string; description?: string }>>;
  },
);
