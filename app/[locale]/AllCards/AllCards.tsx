'use client'
//C:\Users\User\mini-crm\app\[locale]\AllCards\AllCards.tsx
import { useEffect, useState } from 'react'
import { collection, onSnapshot, getDoc } from 'firebase/firestore'
import { db} from '../firebase'
import { doc, updateDoc, deleteDoc } from 'firebase/firestore'
import { useTranslations } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import { Task } from '../types/types' 
import useTasks from '../hooks/useTasks'
import TaskEditing from '../Tasks/TaskEditing'
 import styles from './AllCards.module.scss'
import Sidebar from '../components/Sidebar'
 const AllCards = () => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const  t  = useTranslations()
 const {handleSave,removeTask}=useTasks()

useEffect(() => {
  const unsub = onSnapshot(collection(db, 'cards'), async snap => {
    const tasks = await Promise.all(
      snap.docs.map(async d => {
        const task = { id: d.id, ...d.data() } as Task

        if (task.uid) {
          const userSnap = await getDoc(doc(db, 'users', task.uid))
          return {
            ...task,
            userName: userSnap.exists()
              ? userSnap.data().name
              : 'Unknown'
          }
        }

        return task
      })
    )

    setTasks(tasks)
  })

  return unsub
}, [])



 return (
  <div className={styles.container}>
    <Sidebar />
    <p className={styles.cardsTitle}>{t('tasks.allCards')}</p>
    <table className={styles.taskList}>
      <thead>
        <tr>
          <th>{t('tasks.title')}</th>
          <th>{t('tasks.status.status')}</th>
          <th>{t('tasks.deadline')}</th>
          <th>{t('tasks.cardHolder')}</th>
        </tr>
      </thead>
     <tbody className={styles.tableBody}>
  {tasks.map((task) => [
    <tr key={`${task.id}-row`} className={styles.taskRow}>
      <td>{task.title || t('tasks.noTitle')}</td>
      <td>{t(`tasks.status.${task.status.toLowerCase().replace(/\s/g, '')}`)}</td>
      <td>{task.deadline || '—'}</td>
      <td className={styles.userCell}>👤 {task.userName || '—'}</td>
      <td className={styles.taskActions}>
        <button onClick={() => setEditingId(editingId === task.id ? null : task.id)} className={styles.editBtn}>
          {editingId === task.id ? t('tasks.close') : t('tasks.fill')}
        </button>
        <button onClick={() => removeTask(task.id)} className={styles.deleteBtn}>
          {t('tasks.delete')}
        </button>
      </td>
    </tr>,
    
    editingId === task.id && (
      <tr key={`${task.id}-edit`} className={styles.editRow}>
        <td >
          <motion.div className={styles.editWrapper} initial={{ height: 0 }} animate={{ height: 'auto' }}>
            <TaskEditing task={task} onSave={handleSave} />
          </motion.div>
        </td>
      </tr>
    )
  ])}
</tbody>
    </table>
  </div>
);
}

export default AllCards