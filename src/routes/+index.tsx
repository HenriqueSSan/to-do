import { useState } from 'react';

interface Task {
  title: string;
  completed: boolean;
  description: string;
}

export function IndexPage() {
  const [todos, setTodos] = useState<Task[]>([
    {
      title: 'To-do 1',
      completed: true,
      description: 'To-do Description 1',
    },
  ]);

  return (
    <>
      <div className='w-full h-screen flex items-center'>
        <div className='w-[50%] mx-auto bg-white border border-gray-100 p-8 rounded-xl'>
          <div className='mb-8'>
            <h1 className='text-2xl font-bold mb-2'>To-do Application</h1>
            <form action=''>
              <fieldset>
                <label>
                  <span className='mb-1.5 inline-block font-medium text-sm'>
                    Added new To-do
                  </span>

                  <div className='flex items-center border border-gray-300 rounded-lg'>
                    <input
                      className='appearance-none border-0 grow px-4 min-h-[40px] rounded-l-lg'
                      placeholder='To-do title'
                      type='text'
                    />
                    <button className='shrink-0 cursor-pointer px-4 rounded-r-lg hover:bg-gray-300 text-sm font-bold h-full min-h-[40px]'>
                      Added
                    </button>
                  </div>
                </label>
              </fieldset>
            </form>
          </div>
          <div className='space-y-4'>
            {todos.map(({ title, description, completed }) => (
              <div className='flex items-center justify-between'>
                <div className='flex items-start gap-2'>
                  <input
                    className='flex w-[18px] h-[18px] border border-gray-200 data-[checked="true"]:bg-blue-400'
                    type='checkbox'
                    data-checked={completed}
                    checked={completed}
                  />

                  <div className='flex gap-1.5 flex-col'>
                    <span className='text-xl leading-[18px] font-medium'>
                      {title}
                    </span>
                    <span className='text-sm'>{description}</span>
                  </div>
                </div>
                <div className='flex items-stretch gap-2'>
                  <button>
                    <span>Edit</span>
                  </button>
                  <button>
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
