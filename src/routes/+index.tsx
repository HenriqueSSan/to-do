import { Todo } from '../module_core/module_todo/screen/todo/Todo';
import { TaskProvider } from '../module_core/module_todo/context/task.provider';
import { TaskEditDialog } from '../module_core/module_todo/screen/todo/components/TaskEditDialog';

export function IndexPage() {
  return (
    <TaskProvider>
      <Todo />
      <TaskEditDialog />
    </TaskProvider>
  );
}
