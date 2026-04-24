'use client'
import { useState } from 'react'
import {Input} from '@/src/shared/ui/input/input'
import { Task } from '../../../src/shared/types/types'
import { useTranslations } from 'next-intl'
import styles from './TaskEdidting.module.scss'
import useTasks from '../../../src/entities/tasks/useTasks'

export default function TaskEditing({
  task,
  onUpdate,
  onSave, 
}: {
  task: Task
  onSave: (id: string, title: string, deadline: string) => Promise<void> ,
  onUpdate?: () => void
}) {
  const [title, setTitle] = useState(task.name)
  const [deadline, setDeadline] = useState(task.deadline)
  const [isSubmitting, setIsSubmitting] = useState(false) 
  
  const t = useTranslations()
  const { removeTask } = useTasks()

  const handleInternalSave = async () => {
    setIsSubmitting(true)
    try {
      await onSave(task.id, title, deadline)
    } catch (err) {
      console.error("Ошибка при сохранении:", err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.inputGroup}>
        <Input
          type='text'
          placeholder={t('taskedit.titlePlaceholder')}
          value={title}
          onChange={e => setTitle(e.target.value)}
          className={styles.titleInput}
          disabled={isSubmitting}
        />
      </div>

      <div className={styles.deadlineWrapper}>
        <label>
          {t('taskedit.deadline')}:
          <Input
            type='date'
            value={deadline}
            onChange={e => setDeadline(e.target.value)}
            className={styles.dateInput}
            disabled={isSubmitting}
          />
        </label>
      </div>

      <div className={styles.actions}>
        <button
          onClick={handleInternalSave}
          className={`${styles.btn} ${styles.save}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? '...' : t('taskedit.create')}
        </button>

        <button
          className={`${styles.btn} ${styles.delete}`}
          onClick={async () => {
            if (confirm(t('taskedit.confirmDelete'))) {
               await removeTask(task.id)
            }
          }}
          disabled={isSubmitting}
        >
          {t('taskedit.delete')}
        </button>
      </div>
    </div>
  )
}