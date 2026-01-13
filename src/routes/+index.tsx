import { useRef, useState, type ChangeEvent, type MouseEvent } from 'react';

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

  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);

  const [editFormData, setEditFormData] = useState<
    Pick<Task, 'title' | 'description'>
  >({
    title: '',
    description: '',
  });

  const [titleInputValue, setTitleInputValue] = useState('');

  const formRef = useRef<HTMLFormElement | null>(null);
  const editFormRef = useRef<HTMLFormElement | null>(null);

  const addedNewTodo = (params: { title: string }) =>
    setTodos(oldTodos => [
      ...oldTodos,
      { id: oldTodos.length + 1, title: params.title, completed: false },
    ]);

  const editTodo = (
    currentTodo: Pick<Task, 'id' | 'title' | 'description'>,
  ) => {
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

  const toggleCompletedTodo = (currentTodo: { id: number }) => {
    setTodos(oldTodos =>
      oldTodos.map(todo =>
        todo.id === currentTodo.id
          ? { ...todo, completed: !todo.completed }
          : todo,
      ),
    );
  };

  const delTodo = (currentTodo: { id: number }) => {
    const newTodos = todos.filter(todo => todo.id !== currentTodo.id);
    setTodos([...newTodos]);
  };

  const editByDataTodoId = (e: MouseEvent<HTMLButtonElement>) => {
    if (e.currentTarget.dataset['todoId']) {
      const currentTodo = todos.find(
        todo =>
          todo.id === parseInt(e.currentTarget.dataset['todoId'] as string),
      );

      if (currentTodo) {
        setEditFormData(currentTodo);
        setEditId(parseInt(e.currentTarget.dataset['todoId']));
        setShowEditDialog(true);
      }
    }
  };

  const toggleByDataCompletedTodoId = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.dataset['todoId'])
      toggleCompletedTodo({
        id: parseInt(e.currentTarget.dataset['todoId']),
      });
  };

  const delByDataTodoId = (e: MouseEvent<HTMLButtonElement>) => {
    if (e.currentTarget.dataset['todoId'])
      delTodo({
        id: parseInt(e.currentTarget.dataset['todoId']),
      });
  };

  return (
    <>
      {showEditDialog && (
        <div className='fixed top-0 left-0 z-1000 h-screen w-full overflow-y-scroll py-[10vh]'>
          <div
            className='fixed top-0 left-0 h-screen w-full bg-gray-900/10'
            onClick={() => {
              setShowEditDialog(false);
              setEditId(null);
            }}
          ></div>
          <div className='relative z-1000 mx-auto h-auto w-full max-w-[26%] rounded-xl bg-white p-8'>
            <div className='flex flex-col items-start justify-between'>
              <div>
                <h3 className='text-2xl font-bold'>Edit To-do</h3>
                <p className='mb-2 text-sm text-gray-400'>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Praesentium quisquam id ratione.
                </p>
              </div>

              <button
                tabIndex={0}
                onClick={() => {
                  setShowEditDialog(false);
                  setEditId(null);
                }}
                className='absolute top-6 right-6 h-[32px] w-[32px] cursor-pointer rounded-sm text-gray-400 hover:bg-gray-200'
              >
                {/* <Icon icon='mingcute:close-medium-line' className='text-3xl' /> */}
                <span className='sr-only'>Close</span>
              </button>
            </div>

            <div className='flex items-stretch gap-10'>
              <form
                data-todo-id={editId}
                onSubmit={e => {
                  e.preventDefault();

                  if (e.currentTarget.dataset['todoId']) {
                    editTodo({
                      id: parseInt(e.currentTarget.dataset['todoId']),
                      title: editFormData.title,
                      description: editFormData.description,
                    });

                    setShowEditDialog(false);
                    setEditId(null);
                  }
                }}
                ref={editFormRef}
                action=''
                className='grow space-y-4'
              >
                <fieldset>
                  <label>
                    <span className='mb-1.5 inline-block text-sm font-medium'>
                      Title
                    </span>
                    <input
                      value={editFormData.title}
                      onChange={e =>
                        setEditFormData(oldData => ({
                          ...oldData,
                          title: e.target.value,
                        }))
                      }
                      type='text'
                      className='w-full appearance-none rounded-lg px-4 min-h-[40px] border-gray-300 bg-gray-100'
                    />
                  </label>

                  <label>
                    <span className='mb-1.5 inline-block text-sm font-medium'>
                      Description
                    </span>
                    <input
                      value={editFormData.description}
                      onChange={e => {
                        console.log(e.target.value);

                        setEditFormData(oldData => ({
                          ...oldData,
                          description: e.target.value,
                        }));
                      }}
                      onKeyDown={e =>
                        e.code === 'Enter' && editFormRef.current?.submit()
                      }
                      type='text'
                      className='w-full appearance-none rounded-lg px-4 min-h-[40px] border-gray-300 bg-gray-100'
                    />
                  </label>
                </fieldset>

                <button
                  type='submit'
                  className='w-full cursor-pointer rounded-xl bg-blue-500 px-4 py-3 text-lg font-bold text-gray-900 transition-all hover:bg-blue-400'
                >
                  Confirm
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

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
                    data-todo-id={id}
                    onChange={toggleByDataCompletedTodoId}
                    className='flex w-[18px] h-[18px] border border-gray-200 data-[checked="true"]:bg-blue-400'
                    type='checkbox'
                    value={completed ? 'on' : 'off'}
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
                  <button data-todo-id={id} onClick={editByDataTodoId}>
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
