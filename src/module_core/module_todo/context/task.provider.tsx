import { useState, type ChangeEvent, type MouseEvent, type PropsWithChildren } from 'react';
import { TaskContext, type Task } from './task.context';
import { useTaskStore } from './task.store';

export function TaskProvider({ children }: PropsWithChildren) {
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);

  const { state, addedNewTask, editTask, delTask, toggleCompletedTask } = useTaskStore();

  const [editFormData, setEditFormData] = useState<Pick<Task, 'title' | 'description'>>({
    title: '',
    description: '',
  });

  const toggleByDataCompletedTaskId = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.dataset['taskId'])
      toggleCompletedTask({
        id: parseInt(e.currentTarget.dataset['taskId']),
      });
  };

  const editByDataTaskId = (e: MouseEvent<HTMLButtonElement>) => {
    if (e.currentTarget.dataset['taskId']) {
      const currentTask = state.tasks.find(task => task.id === parseInt(e.currentTarget.dataset['taskId'] as string));

      if (currentTask) {
        setEditFormData(currentTask);
        setEditId(parseInt(e.currentTarget.dataset['taskId']));
        setShowEditDialog(true);
      }
    }
  };

  const delByDataTaskId = (e: MouseEvent<HTMLButtonElement>) => {
    if (e.currentTarget.dataset['taskId'])
      delTask({
        id: parseInt(e.currentTarget.dataset['taskId']),
      });
  };

  const { tasks } = state;

  return (
    <TaskContext.Provider
      value={{
        tasks,
        editId,
        delTask,
        editTask,
        setEditId,
        editFormData,
        addedNewTask,
        showEditDialog,
        setEditFormData,
        delByDataTaskId,
        editByDataTaskId,
        setShowEditDialog,
        toggleCompletedTask,
        toggleByDataCompletedTaskId,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
