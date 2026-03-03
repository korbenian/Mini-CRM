//C:\Users\User\mini-crm\app\[locale]\Tasks\TaskEditing.tsx
'use client'
import { db } from '../firebase'
import { useState } from 'react'
import Input from '../components/Input'
import { doc, updateDoc,addDoc,collection ,deleteDoc,onSnapshot} from 'firebase/firestore'
import { Task } from '../types/types'
import { useTranslations } from 'next-intl'
import {useTask} from '../hooks/useTask'
type PropTask={
  utils:Task
}
export default function TaskEditing ({
  task,
  onSave, 
 
}:{
  task: Task
  onSave: (id: string, title: string, deadline: string) => void
  
} ) {
  const [title, setTitle] = useState(task.title)
  const [deadline, setDeadline] = useState(task.deadline)
const  t  = useTranslations()
const {onDelete}=useTask({task,onSave})

  return (
  <div>
    <div className='flex items-center gap-3'>
      <Input
        type='text'
        placeholder={t('taskedit.titlePlaceholder')}
        value={title}
        onChange={e => setTitle(e.target.value)}
        className='w-96'
      />
    </div>

    <div className='mt-2'>
      <label className='text-sm text-gray-600'>
        {t('taskedit.deadline')}:
        <Input
          type='date'
          value={deadline}
          onChange={e => setDeadline(e.target.value)}
          className='ml-2 w-40'
        />
      </label>
    </div>

    <div className='flex gap-2'>
      <button
        onClick={()=>onSave(task.id,title,deadline)}
        className='mt-2 px-3 py-1 bg-green-600 text-white rounded-lg'
      >
        {t('taskedit.create')}
      </button> 

      <button
        className='mt-2 px-3 py-1 bg-red-600 text-white rounded-lg'
        onClick={async () => {
          await onDelete(task.id)
        }}
      >
        {t('taskedit.delete')}
      </button>
    </div>
  </div>
)
}
