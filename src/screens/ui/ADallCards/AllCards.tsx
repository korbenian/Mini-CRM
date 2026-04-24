'use client'
//C:\Users\User\mini-crm\app\[locale]\AllCards\AllCards.tsx
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import useTasks from '@/src/entities/tasks/useTasks'
import React from 'react'
import TaskEditing from '@/src/widgets/Tasks/TaskEditing'
 import styles from './AllCards.module.scss'
import Sidebar from '@/src/widgets/Sidebar/Sidebar'
import { useAllCards } from '@/src/entities/allTasks/useAllCards'
 const AllCards = () => {
  const [editingId, setEditingId] = useState<string | null>(null)
  const  t  = useTranslations()
 const {handleSave,removeTask}=useTasks()
const{ cards,loading,error }=useAllCards()
if (loading) return <p>{t('errors.loading_users')}</p>
  if (error) return <p style={{ color: 'red' }}>{error}</p>
 return (
  <div className={styles.allCardsPage}>
    <Sidebar />
    <div className={styles.mainContent}>
      <h1 className={styles.cardsTitle}>{t('tasks.allCards')}</h1>
      
      <div className={styles.tableWrapper}>
        <table className={styles.taskList}>
          <thead>
            <tr>
              <th>{t('tasks.title')}</th>
              <th>{t('tasks.status.status')}</th>
              <th>{t('tasks.deadline')}</th>
              <th>{t('tasks.cardHolder')}</th>
              <th>{t('tasks.cardHolder')}</th>
            </tr>
          </thead>
          <tbody>
            {cards.map((task) => (
              <React.Fragment key={task.id}>
                <tr className={styles.taskRow}>
                  <td>{task.name || t('tasks.noTitle')}</td>
                  <td>{t(`tasks.status.${task.status.toLowerCase().replace(/\s/g, '')}`)}</td>
                  <td>{task.deadline || '—'}</td>
                  <td className={styles.userCell}>👤 {task.profiles?.name || '—'}</td>
                  <td className={styles.taskActions}>
                    <button onClick={() => setEditingId(editingId === task.id ? null : task.id)}>
                      {editingId === task.id ? t('tasks.close') : t('tasks.fill')}
                    </button>
                    <button onClick={() => removeTask(task.id)} className={styles.deleteBtn}>
                      {t('tasks.delete')}
                    </button>
                  </td>
                </tr>
                
                {editingId === task.id && (
                  <tr className={styles.editRow}>
                    <td colSpan={5}> {/* 🔥 Важно: растянуть ячейку на все колонки */}
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}>
                        <TaskEditing task={task} onSave={handleSave} />
                      </motion.div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);
}

export default AllCards