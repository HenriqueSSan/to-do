import { Icon } from '@iconify/react';
import { useTasks } from '../../hook/task.hook';

export function TaskList() {
  const { tasks, toggleByDataCompletedTaskId, editByDataTaskId, delByDataTaskId } = useTasks();

  return tasks.map(({ id, title, description, completed }) => (
    <div key={id} className='flex items-center justify-between'>
      <div className='flex items-start gap-2'>
        <input
          type='checkbox'
          data-task-id={id}
          data-checked={completed}
          defaultChecked={completed}
          value={completed ? 'on' : 'off'}
          onChange={toggleByDataCompletedTaskId}
          className='flex w-[18px] h-[18px] border border-gray-200 data-[checked="true"]:bg-blue-400'
        />

        <div className='flex gap-1.5 flex-col'>
          <span className={['text-xl leading-[18px] font-medium', completed && 'line-through text-gray-400'].join(' ')}>
            {title}
          </span>
          {description ?? <span className='text-sm'>{description}</span>}
        </div>
      </div>
      <div className='flex items-stretch gap-2'>
        <button
          data-task-id={id}
          onClick={editByDataTaskId}
          className='w-[32px] h-[32px] flex items-center justify-center rounded-lg cursor-pointer hover:bg-gray-200 transition-all'
        >
          <Icon icon='mingcute:pencil-line' className='text-lg' />
          <span className='sr-only'>Edit</span>
        </button>
        <button
          data-task-id={id}
          onClick={delByDataTaskId}
          className='text-red-500 w-[32px] h-[32px] flex items-center justify-center rounded-lg cursor-pointer hover:bg-gray-200 transition-all'
        >
          <Icon icon='mingcute:delete-2-line' className='text-lg' />
          <span className='sr-only'>Delete</span>
        </button>
      </div>
    </div>
  ));
}
