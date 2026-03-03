'use client'
import { useState } from 'react'
import { doc, updateDoc, deleteDoc } from 'firebase/firestore'
import { motion, AnimatePresence } from 'framer-motion'
import { db } from '../firebase'
import { useTranslations } from 'next-intl'
import TaskEditing from './TaskEditing'
import { Task } from '../types/types'
import styles from './tasks.module.scss'
import useTasks from '../hooks/useTasks'

export default function TaskView({ task }: { task: Task }) {
  const [isEditing, setIsEditing] = useState(false)
  const {handleSave,removeTask}=useTasks()
const  t  = useTranslations()


  return (
    <div className={styles.taskCard}>
      <div className={styles.taskHeader}>
        <h2>{task.title || t('tasks.noTitle')}</h2>
        <select
          value={task.status}
          onChange={e =>
            updateDoc(doc(db, 'cards', task.id), { status: e.target.value })
          }
        >
          <option value="To Do">{t('tasks.status.todo')}</option>
          <option value="In Progress">{t('tasks.status.inProgress')}</option>
          <option value="Done">{t('tasks.status.done')}</option>
        </select>
      </div>

      <p className={styles.taskDeadline}> {t('tasks.deadline')}: {task.deadline || '—'}</p>

      <div  className={styles.taskActions}>
        <button className={styles.delete} onClick={() => removeTask(task.id)}>{t('tasks.delete')}</button>
        <button className={styles.edit} onClick={() => setIsEditing(v => !v)}>
          {isEditing ? t('tasks.close') : t('tasks.fill')}
        </button>
      </div>

      <AnimatePresence>
        {isEditing && (
          <motion.div initial={{ opacity: 0, x: 80 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 80 }}>
            <TaskEditing task={task} onSave={handleSave} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
