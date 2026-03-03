'use client'
import { useEffect, useState } from 'react'
import { collection, addDoc, onSnapshot } from 'firebase/firestore'
import { db,auth } from '../firebase'
import TaskView from './TaskView'
import { useTranslations } from 'next-intl'
import { Task } from '../types/types'
import styles from './tasks.module.scss' 
import Sidebar from '../components/Sidebar'

export default function AddTask() {
  const [tasks, setTasks] = useState<Task[]>([])
  const  t  = useTranslations()
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
const user = auth.currentUser
 useEffect(() => {
  if (!user) return

  const unsub = onSnapshot(
    collection(db, 'cards'),
    snap => {
      const data = snap.docs
        .map(d => ({ id: d.id, ...d.data() } as Task))
        .filter(task => task.uid === user.uid) 
      setTasks(data)
    }
  )

  return unsub
}, [user])

  const filteredTasks = tasks.filter(task => {
    const matchesTitle = (task.title || '').toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'All' || task.status === statusFilter
    return matchesTitle && matchesStatus
  })

const handleNewTask = async () => {
  if (!user) return
  await addDoc(collection(db, 'cards'), {
    title: '',
    deadline: '',
    status: 'To Do',
    isDone: false,
    createdAt: new Date(),
    isEditing: true,
    uid: user.uid 
  })
}

  return (
  <div className={styles.addTaskPage}>
    <Sidebar/>
    <div className={styles.wrapper}>
    <div className={styles.filters}>
      <input
        type="text"
        placeholder={t('addtask.search')}
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
      />

      <select
        value={statusFilter}
        onChange={e => setStatusFilter(e.target.value)}
      >
        <option value="All">{t('addtask.filter.all')}</option>
        <option value="To Do">🔴 {t('addtask.status.todo')}</option>
        <option value="In Progress">🟡 {t('addtask.status.inProgress')}</option>
        <option value="Done">✅ {t('addtask.status.done')}</option>
      </select>
    </div>

    <button className={styles.addButton} onClick={handleNewTask}>
      +
    </button>

    <div className={styles.taskList}>
      {filteredTasks.map(task => (
        <TaskView key={task.id} task={task} />
      ))}
    </div></div>
  </div>
)
}
