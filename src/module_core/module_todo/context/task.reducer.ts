import type { TaskReducerAction, TaskReducerState } from './task.store';

export const reducerMapper: Record<
  KeyOfReducerMapper,
  (state: TaskReducerState, action: TaskReducerAction) => TaskReducerState
> = {
  create_task: (state, action) => {
    if (!checkHasDataInAction(action)) return state;

    return {
      ...state,
      tasks: [...state.tasks, { id: state.tasks.length + 1, title: action.data?.title || '', completed: false }],
    };
  },

  update_task: (state, action) => {
    if (!(checkHasDataInAction(action) && checkHasTaskIdInAction(action))) return state;

    return {
      ...state,
      tasks: state.tasks.map(task =>
        task.id === action.taskId
          ? { ...task, title: action.data?.title || '', description: action.data?.description }
          : task,
      ),
    };
  },

  delete_task: (state, action) => {
    if (!checkHasTaskIdInAction(action)) return state;

    return { ...state, tasks: state.tasks.filter(task => task.id !== action.taskId) };
  },

  toggle_task: (state, action) => {
    if (checkHasTaskIdInAction(action)) return state;

    return {
      ...state,
      tasks: state.tasks.map(task => (task.id === action.taskId ? { ...task, completed: !task.completed } : task)),
    };
  },
};

type KeyOfReducerMapper = 'create_task' | 'update_task' | 'delete_task' | 'toggle_task';

function checkHasDataInAction(action: TaskReducerAction): boolean {
  return !!action.data;
}

function checkHasTaskIdInAction(action: TaskReducerAction): boolean {
  return !!action.taskId;
}
