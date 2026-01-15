import { Icon } from '@iconify/react';
import { useRef } from 'react';
import { useTodos } from '../../../hook/todo.hook';

export function TodoEditDialog() {
  const editFormRef = useRef<HTMLFormElement | null>(null);
  const todoContext = useTodos();

  const { editId, editTodo, setEditId, editFormData, showEditDialog, setEditFormData, setShowEditDialog } = todoContext;

  if (!showEditDialog) return null;

  return (
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
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Praesentium quisquam id ratione.
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
            <Icon icon='mingcute:close-medium-line' className='text-3xl' />
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
                <span className='mb-1.5 inline-block text-sm font-medium'>Title</span>
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
            </fieldset>

            <fieldset>
              <label>
                <span className='mb-1.5 inline-block text-sm font-medium'>Description</span>
                <input
                  value={editFormData.description}
                  onChange={e => {
                    setEditFormData(oldData => ({
                      ...oldData,
                      description: e.target.value,
                    }));
                  }}
                  onKeyDown={e => e.code === 'Enter' && editFormRef.current?.submit()}
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
  );
}
