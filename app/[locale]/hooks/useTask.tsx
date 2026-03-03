// app/[locale]/hooks/useTask.ts
import { db } from '../firebase'
import { doc, deleteDoc } from 'firebase/firestore'
import { Task } from '../types/types'
export const useTask = ({
  task,
  onSave,
 
}:{
  task: Task
  onSave: (id: string, title: string, deadline: string) => void
} ) => {
  const onDelete = async (id: string) => {
    try {
      const ref = doc(db, 'cards', id)
      await deleteDoc(ref)
      console.log('Deleted:', id)
    } catch (err) {
      console.error('Delete error:', err)
    }
  }

  return { onDelete }
}
