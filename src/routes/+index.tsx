import { useRef, useState, type MouseEvent } from 'react';

interface Task {
  id: number;
  title: string;
  completed: boolean;
  description?: string;
}

export function IndexPage() {
  const [todos, setTodos] = useState<Task[]>([
    { id: 1, title: 'To-do 1', completed: true },
  ]);

  const [titleInputValue, setTitleInputValue] = useState('');
  const formRef = useRef<HTMLFormElement | null>(null);

  const addedNewTodo = (params: { title: string }) =>
    setTodos(oldTodos => [
      ...oldTodos,
      { id: oldTodos.length + 1, title: params.title, completed: false },
    ]);

  const delTodo = (currentTodo: { id: number }) => {
    const newTodos = todos.filter(todo => todo.id !== currentTodo.id);
    setTodos([...newTodos]);
  };

  const delByDataTodoId = (e: MouseEvent<HTMLButtonElement>) => {
    if (e.currentTarget.dataset['todoId'])
      delTodo({
        id: parseInt(e.currentTarget.dataset['todoId']),
      });
  };

  return (
    <>
      <div className='w-full min-h-screen flex py-[72px]'>
        <div className='w-[50%] mx-auto h-full bg-white border border-gray-100 p-8 rounded-xl'>
          <div className='mb-8'>
            <h1 className='text-2xl font-bold mb-2'>To-do Application</h1>
            <form
              onSubmit={e => {
                e.preventDefault();

                addedNewTodo({ title: titleInputValue });
                setTitleInputValue('');
              }}
              ref={formRef}
              action=''
            >
              <fieldset>
                <label>
                  <span className='mb-1.5 inline-block font-medium text-sm'>
                    Added new To-do
                  </span>

                  <div className='flex items-center border border-gray-300 rounded-lg'>
                    <input
                      value={titleInputValue}
                      onChange={e => setTitleInputValue(e.currentTarget.value)}
                      className='appearance-none border-0 grow px-4 min-h-[40px] rounded-l-lg'
                      placeholder='To-do title'
                      type='text'
                    />
                    <button
                      type='submit'
                      className='shrink-0 cursor-pointer px-4 rounded-r-lg hover:bg-gray-300 text-sm font-bold h-full min-h-[40px]'
                    >
                      Added
                    </button>
                  </div>
                </label>
              </fieldset>
            </form>
          </div>
          <div className='space-y-4'>
            {todos.map(({ id, title, description, completed }) => (
              <div key={id} className='flex items-center justify-between'>
                <div className='flex items-start gap-2'>
                  <input
                    className='flex w-[18px] h-[18px] border border-gray-200 data-[checked="true"]:bg-blue-400'
                    type='checkbox'
                    data-checked={completed}
                    defaultChecked={completed}
                  />

                  <div className='flex gap-1.5 flex-col'>
                    <span
                      className={[
                        'text-xl leading-[18px] font-medium',
                        completed && 'line-through text-gray-400',
                      ].join(' ')}
                    >
                      {title}
                    </span>
                    {description ?? (
                      <span className='text-sm'>{description}</span>
                    )}
                  </div>
                </div>
                <div className='flex items-stretch gap-2'>
                  <button data-todo-id={id}>
                    <span>Edit</span>
                  </button>
                  <button data-todo-id={id} onClick={delByDataTodoId}>
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
