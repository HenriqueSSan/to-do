import { Todo } from '../module_core/module_todo/screen/todo/Todo';
import { TodoProvider } from '../module_core/module_todo/context/todo.provider';
import { TodoEditDialog } from '../module_core/module_todo/screen/todo/components/TodoEditDialog';

export function IndexPage() {
  return (
    <TodoProvider>
      <Todo />
      <TodoEditDialog />
    </TodoProvider>
  );
}
