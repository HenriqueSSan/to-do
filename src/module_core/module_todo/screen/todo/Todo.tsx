import { Icon } from '@iconify/react';
import { useRef, useState } from 'react';

import { useTasks } from '../../hook/task.hook';
import { TaskList } from './TaskList';

export function Todo() {
  const [titleInputValue, setTitleInputValue] = useState('');

  const formRef = useRef<HTMLFormElement | null>(null);
  const todoContext = useTasks();

  const { addedNewTask } = todoContext;

  return (
    <div className='w-full min-h-screen flex py-[72px]'>
      <div className='w-[50%] mx-auto h-full bg-white border border-gray-100 p-8 rounded-xl'>
        <div className='mb-8'>
          <h1 className='text-2xl font-bold mb-2'>To-do Application</h1>
          <form
            onSubmit={e => {
              e.preventDefault();

              if (titleInputValue.length > 0) {
                addedNewTask({ title: titleInputValue });
                setTitleInputValue('');
              }
            }}
            ref={formRef}
            action=''
          >
            <fieldset>
              <label>
                <span className='mb-1.5 inline-block font-medium text-sm'>Added new To-do</span>

                <div className='flex items-center border border-gray-300 rounded-lg'>
                  <input
                    type='text'
                    value={titleInputValue}
                    placeholder='To-do title'
                    onChange={e => setTitleInputValue(e.currentTarget.value)}
                    className='appearance-none border-0 grow px-4 min-h-[40px] rounded-l-lg'
                  />
                  <button
                    type='submit'
                    className='shrink-0 flex items-center gap-2 cursor-pointer px-4 rounded-r-lg hover:bg-gray-300 text-sm font-bold h-full min-h-[40px]'
                  >
                    <Icon icon='mingcute:add-line' className='text-lg' />
                    <span>Added</span>
                  </button>
                </div>
              </label>
            </fieldset>
          </form>
        </div>
        <div className='space-y-4'>
          <TaskList />
        </div>
      </div>
    </div>
  );
}
