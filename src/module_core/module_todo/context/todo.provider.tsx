import { useState, type ChangeEvent, type MouseEvent, type PropsWithChildren } from 'react';
import { TodoContext, type Task } from './todo.context';
import { useLocalStorage } from '../hook/local-storage.hook';

export function TodoProvider({ children }: PropsWithChildren) {
  const [todos, setTodos] = useLocalStorage<Task[]>('tasks', []);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);

  const [editFormData, setEditFormData] = useState<Pick<Task, 'title' | 'description'>>({
    title: '',
    description: '',
  });

  const addedNewTodo = (params: { title: string }) => {
    setTodos(oldTodos => [...oldTodos, { id: oldTodos.length + 1, title: params.title, completed: false }]);
  };
  const toggleCompletedTodo = (currentTodo: { id: number }) => {
    setTodos(oldTodos =>
      oldTodos.map(todo => (todo.id === currentTodo.id ? { ...todo, completed: !todo.completed } : todo)),
    );
  };

  const editTodo = (currentTodo: Pick<Task, 'id' | 'title' | 'description'>) => {
    setTodos(oldTodos =>
      oldTodos.map(todo =>
        todo.id === currentTodo.id
          ? {
              ...todo,
              title: currentTodo.title,
              description: currentTodo.description,
              completed: false,
            }
          : todo,
      ),
    );
  };

  const delTodo = (currentTodo: { id: number }) => {
    const newTodos = todos.filter(todo => todo.id !== currentTodo.id);
    setTodos([...newTodos]);
  };

  const toggleByDataCompletedTodoId = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.dataset['todoId'])
      toggleCompletedTodo({
        id: parseInt(e.currentTarget.dataset['todoId']),
      });
  };

  const editByDataTodoId = (e: MouseEvent<HTMLButtonElement>) => {
    if (e.currentTarget.dataset['todoId']) {
      const currentTodo = todos.find(todo => todo.id === parseInt(e.currentTarget.dataset['todoId'] as string));

      if (currentTodo) {
        setEditFormData(currentTodo);
        setEditId(parseInt(e.currentTarget.dataset['todoId']));
        setShowEditDialog(true);
      }
    }
  };

  const delByDataTodoId = (e: MouseEvent<HTMLButtonElement>) => {
    if (e.currentTarget.dataset['todoId'])
      delTodo({
        id: parseInt(e.currentTarget.dataset['todoId']),
      });
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        editId,
        delTodo,
        setTodos,
        editTodo,
        setEditId,
        editFormData,
        addedNewTodo,
        showEditDialog,
        setEditFormData,
        delByDataTodoId,
        editByDataTodoId,
        setShowEditDialog,
        toggleCompletedTodo,
        toggleByDataCompletedTodoId,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}
