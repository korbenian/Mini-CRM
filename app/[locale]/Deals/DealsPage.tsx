'use client'
//C:\Users\User\mini-crm\app\[locale]\Deals\DealsPage.tsx
import Sidebar from '../components/Sidebar/Sidebar'
import styles from './Dealspage.module.scss'
import Column from '../dealsComponents/Column'
import dynamic from 'next/dynamic'
import { DragDropContext, Droppable } from '@hello-pangea/dnd'
import { useDeals } from '../hooks/useDeals'
import { useTranslations } from 'next-intl'
export default function Dealspage() {
  const t =useTranslations()
  const { deals, handleChangeDeal } = useDeals() 

  const onDragEnd = async (result: any) => {
    const { destination, source, draggableId } = result
    if (!destination) return 
    if (destination.droppableId === source.droppableId) return

    await handleChangeDeal(draggableId, { stage: destination.droppableId })
  }
const Column = dynamic(() => import('../dealsComponents/Column'), { 
  ssr: false 
});
  return (
    <main className={styles.layout}>
      <div className={styles.sidebarWrapper}><Sidebar /></div>
      <aside className={styles.title}>{t('navigation.deals')}</aside>
      <aside className={styles.columns}>
        <DragDropContext onDragEnd={onDragEnd}>
          <Column title={t('deals.stages.new')} stage="lead" deals={deals} />
<Column title={t('deals.stages.negotiation')} stage="negotiation" deals={deals} />
<Column title={t('deals.stages.proposal')} stage="proposal" deals={deals} />
<Column title={t('deals.stages.closed_won')} stage="closed_won" deals={deals} />
<Column title={t('deals.stages.closed_lost')} stage="closed_lost" deals={deals} />
        </DragDropContext>
      </aside>
    </main>
  )
}