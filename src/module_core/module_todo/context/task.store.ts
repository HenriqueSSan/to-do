import { useReducerPersist } from '../hook/use-reducer.persist.hook';

import type { Task } from './task.context';

export type TaskReducerState = {
  tasks: Task[];
};

export type TaskReducerAction = {
  type: `create_task` | `update_task` | `delete_task` | `toggle_task`;
  data?: Pick<Task, 'title' | 'description' | 'completed'>;
  taskId?: number;
};

export function useTaskStore() {
  const [state, dispatch] = useReducerPersist<TaskReducerState, TaskReducerAction>(
    'tasks',
    { tasks: [] },
    (state, action) => {
      if (action.type === 'create_task' && action.data) {
        return {
          ...state,
          tasks: [...state.tasks, { id: state.tasks.length + 1, title: action.data.title, completed: false }],
        };
      }

      if (action.type === 'update_task' && action.data && action.taskId) {
        return {
          ...state,
          tasks: state.tasks.map(task =>
            task.id === action.taskId
              ? { ...task, title: action.data?.title || '', description: action.data?.description }
              : task,
          ),
        };
      }

      if (action.type === 'delete_task' && action.taskId) {
        return { ...state, tasks: state.tasks.filter(task => task.id !== action.taskId) };
      }

      if (action.type === 'toggle_task' && action.taskId) {
        return {
          ...state,
          tasks: state.tasks.map(task => (task.id === action.taskId ? { ...task, completed: !task.completed } : task)),
        };
      }

      return state;
    },
  );

  const addedNewTask = (params: { title: string; description?: string }) => {
    dispatch({
      type: 'create_task',
      data: { title: params.title, description: params.description || '', completed: false },
    });
  };

  const toggleCompletedTask = (currentTodo: { id: number }) => {
    dispatch({ type: 'toggle_task', taskId: currentTodo.id });
  };

  const editTask = (currentTodo: Pick<Task, 'id' | 'title' | 'description'>) => {
    dispatch({
      type: 'update_task',
      data: { title: currentTodo.title, description: currentTodo.description, completed: false },
      taskId: currentTodo.id,
    });
  };

  const delTask = (currentTodo: { id: number }) => {
    dispatch({ type: 'delete_task', taskId: currentTodo.id });
  };

  return { state, addedNewTask, toggleCompletedTask, editTask, delTask };
}
