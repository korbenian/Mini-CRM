import { useTranslations } from 'next-intl'
import Sidebar from '../components/Sidebar'
import AddTask from './addTasks'


export default function TaskPage() {
  const  t  = useTranslations()

  return (
  
        <AddTask />
      
  )
}
