'use client'
//C:\Users\User\mini-crm\app\Dashboard\DashBoardPage.tsx
import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import styles from './DashboardPage.module.scss'
import { auth } from '../../../lib/firebase'
import Sidebar from '../components/Sidebar'
import { Typewriter } from 'react-simple-typewriter'
import { useUserStore } from '../store/userStore'
import {useRouter} from 'next/navigation'
import { DashboardTypes } from '../types/types'

type Props={
  metrics:DashboardTypes
}

export default function DashBoardPage ({metrics}:Props){
  const user = useUserStore(state => state.user)
const navigate = useRouter()

  return (
    <div className={styles.DashBoardPage}>
      <div className={styles.Sidebar}>
        <Sidebar />
      </div>

      <div className={styles.mainContent}>
        <h1 className={styles.pageTitle}>
          
        </h1>

        <div className={styles.wrapper_greeting}>
          <div className={styles.greeting}>
            <Typewriter
              words={[`Hello, ${user?.name || 'there'} 👋`]}
              typeSpeed={80}
            />
            <Typewriter
              words={['Here is a quick overview of your work today']}
              typeSpeed={80}
            />
          </div>
        </div>

        <div className={styles.metrics}>
          <div className={styles.wrap_metricCard}>
          <div className={styles.metricCard}>
            <h3></h3>
            <p>{metrics.myCards}</p>
          </div>

          <div className={styles.metricCard}>
            <h3></h3>
            <p>{metrics.doneCards}</p></div>
            <div className={styles.metricCard}>
  <h3>Progress</h3>

  <div className={styles.progressBar}>
    <div
     className={styles.progressFill}
  style={{
    width: `${metrics.progress}%`,
    background:
      metrics.progress === 100
        ? '#22c55e'
        : metrics.progress > 50
        ? '#3b82f6'
        : '#f59e0b'
  }}
    />
  </div>

  <p>{metrics.progress}%</p>
</div>
          
</div>
        
        
           
         <div  className={styles.hellowindow}  >
            <strong>
              Welcome back, {user?.name || 'friend'} 👋
            </strong>
            <p>
              You have {metrics.activeCards} active cards waiting for you
            </p>
          </div>
          
         
    
        </div>
       
      </div>
    </div>
  )
}


