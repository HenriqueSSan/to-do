import { useReducerPersist } from '../hook/use-reducer.persist.hook';

import type { Task } from './task.context';
import { reducerMapper } from './task.reducer';

export type TaskReducerState = {
  tasks: Task[];
};

export type TaskReducerAction = {
  type: keyof typeof reducerMapper;
  data?: Pick<Task, 'title' | 'description' | 'completed'>;
  taskId?: number;
};

export function useTaskStore() {
  const [state, dispatch] = useReducerPersist<TaskReducerState, TaskReducerAction>(
    'tasks',
    { tasks: [] },
    (state, action) => (reducerMapper[action.type] ? reducerMapper[action.type](state, action) : state),
  );

  const addedNewTask = (params: { title: string; description?: string }) => {
    dispatch({
      type: 'create_task',
      data: { title: params.title, description: params.description || '', completed: false },
    });
  };

  const toggleCompletedTask = (taskSubmitted: { id: number }) => {
    dispatch({ type: 'toggle_task', taskId: taskSubmitted.id });
  };

  const editTask = (taskSubmitted: Pick<Task, 'id' | 'title' | 'description'>) => {
    dispatch({
      type: 'update_task',
      data: { title: taskSubmitted.title, description: taskSubmitted.description, completed: false },
      taskId: taskSubmitted.id,
    });
  };

  const delTask = (taskSubmitted: { id: number }) => {
    dispatch({ type: 'delete_task', taskId: taskSubmitted.id });
  };

  return { state, addedNewTask, toggleCompletedTask, editTask, delTask };
}
