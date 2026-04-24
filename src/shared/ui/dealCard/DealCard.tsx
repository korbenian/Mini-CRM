'use client'
//C:\Users\User\mini-crm\app\[locale]\dealsComponents\DealCard.tsx
import styles from './DealCard.module.scss'
import { useDeals } from '@/src/entities/deal/useDeals'

interface DealProps {
  id: string
  title: string
  amount: number
  created_at: string
}

export default function DealCard({ id, title, amount, created_at }: DealProps) {
  const { handleDeleteDeal } = useDeals()

  const date = new Date(created_at).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'short',
  })

  const formattedAmount = new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'USD', 
    maximumFractionDigits: 0,
  }).format(amount)

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.date}>{date}</span>
        <button 
          className={styles.deleteBtn} 
          onClick={() => handleDeleteDeal(id)}
        >
          ✕
        </button>
      </div>
      
      <h4 className={styles.title}>{title}</h4>
      
      <div className={styles.footer}>
        <span className={styles.amount}>{formattedAmount}</span>
        <div className={styles.avatar}>👤</div>
      </div>
    </div>
  )
}