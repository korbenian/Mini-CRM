import { doc, updateDoc, deleteDoc } from 'firebase/firestore'
import { db } from '../firebase'
export default function useTasks(){
     const removeTask = async (id: string) => {
        await deleteDoc(doc(db, 'cards', id))
      }
    
      const handleSave = async (id: string, title: string, deadline: string) => {
        await updateDoc(doc(db, 'cards', id), { title, deadline, isEditing: false })
        
      }
      return {removeTask,handleSave}
}