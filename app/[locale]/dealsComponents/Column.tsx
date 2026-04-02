'use client'
import { useState } from 'react'
import styles from './Column.module.scss'
import { useDeals } from '../hooks/useDeals'
import Input from '../components/Input/Input'
import DealCard from './DealCard'
import { Droppable,Draggable} from '@hello-pangea/dnd'
import { useTranslations } from 'next-intl'

interface Props {
  title: string;
  stage: string;
  deals:any[]
}

export default function Column({ title, stage,deals }: Props) {
  const { handleCreateDeal, loading } = useDeals()
  const t =useTranslations()
  const [isCreate, setIsCreate] = useState(false)
  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')

  const onCreate = async () => {
    if (!name.trim()) return

    await handleCreateDeal(name, Number(amount), stage)
    
    setName('')
    setAmount('')
    setIsCreate(false)
  }

  return (
  <article className={styles.column}>
    <div className={styles.header}>
      <h3 className={styles.title}>{title}</h3>
      <button onClick={() => setIsCreate(true)} className={styles.plusBtn}>
        + {t('column.add_card')}
      </button>
    </div>
    <div className={styles.cardList}>
      <Droppable droppableId={stage}>
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={{ minHeight: '50px' }}
          >
            {deals
              .filter((deal) => deal.stage === stage)
              .map((deal, index) => (
                <Draggable key={deal.id} draggableId={deal.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <DealCard
                        id={deal.id}
                        title={deal.title}
                        amount={deal.amount}
                        created_at={deal.created_at}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
    {isCreate && (
      <div className={styles.createForm}>
        <Input
          placeholder={t('column.enter_name')}
          value={name}
          onChange={(e: any) => setName(e.target.value)}
          autoFocus
        />
        <Input
          placeholder={t('column.enter_amount')}
          type="number"
          value={amount}
          onChange={(e: any) => setAmount(e.target.value)}
        />
        <div className={styles.actions}>
          <button onClick={onCreate} disabled={loading} className={styles.addBtn}>
            {loading ? t('column.creating') : t('column.add_card')}
          </button>
          <button onClick={() => setIsCreate(false)} className={styles.cancelBtn}>✕</button>
        </div>
      </div>
    )}
  </article>
)
}