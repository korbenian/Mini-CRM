'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'
import TaskEditing from './TaskEditing'
import { Task } from '../../shared/types/types'
import styles from './tasks.module.scss'
import useTasks from '../../entities/tasks/useTasks' 

export default function TaskView({ task,onUpdate }: { task: Task,onUpdate:()=>void }) {
  const [isEditing, setIsEditing] = useState(false)
  const { handleSave, removeTask, updateStatus } = useTasks(onUpdate)
  const t = useTranslations()

const onSaveWithClose = async (id: string, title: string, deadline: string) => {
    await handleSave(id, title, deadline)
    setIsEditing(false) 
  }
  return (
 <div className={styles.taskCard}>
      <div className={styles.taskHeader}>
        <h2>{task.name || t('tasks.noTitle')}</h2> 
        <select
          value={task.status}
          onChange={e => updateStatus(task.id, e.target.value)} 
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
            <TaskEditing task={task} onSave={onSaveWithClose} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
