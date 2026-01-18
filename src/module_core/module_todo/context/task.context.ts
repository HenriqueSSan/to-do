import { createContext, type ChangeEvent, type MouseEvent, type SetStateAction } from 'react';

export interface Task {
  id: number;
  title: string;
  completed: boolean;
  description?: string;
}

export const TaskContext = createContext(
  {} as {
    tasks: Task[];
    editId: number | null;
    delTask: (currentTask: { id: number }) => void;
    editTask: (currentTask: Pick<Task, 'id' | 'title' | 'description'>) => void;
    setEditId: React.Dispatch<SetStateAction<number | null>>;
    addedNewTask: (params: { title: string }) => void;
    editFormData: { title: string; description?: string };
    showEditDialog: boolean;
    setEditFormData: React.Dispatch<SetStateAction<{ title: string; description?: string }>>;
    delByDataTaskId: (e: MouseEvent<HTMLButtonElement>) => void;
    editByDataTaskId: (e: MouseEvent<HTMLButtonElement>) => void;
    setShowEditDialog: React.Dispatch<SetStateAction<boolean>>;
    toggleCompletedTask: (currentTask: { id: number }) => void;
    toggleByDataCompletedTaskId: (e: ChangeEvent<HTMLInputElement>) => void;
  },
);
