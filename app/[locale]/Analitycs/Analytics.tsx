 'use client'
 //C:\Users\User\mini-crm\app\[locale]\Analitycs\Analytics.tsx
 import { useEffect, useState } from 'react'
 import { useTranslations } from 'next-intl'
 import styles from './Analytics.module.scss'
 import Sidebar from '../components/Sidebar/Sidebar'


type PropsAnalityc={
  loadMetrics:()=>void
  data: {
    userCount: number;
    totalCards: number;
    avgAge: number;
  }
}
 const Analytics =({loadMetrics,data}:PropsAnalityc)=>{
      const  t  = useTranslations()
const AdminMetrics=[  { id: 1, title: t('dashboardMetrics.totalUsers'), value: data.userCount  },
    { id: 2, title: t('dashboardMetrics.totalCards'), value: data.totalCards },
    { id: 3, title: t('dashboardMetrics.avgAge'), value: data.avgAge },]

useEffect(()=>{
    loadMetrics()
},[])
return(
     <div className={styles.DashBoardPage}>
          <div className={styles.Sidebar}>
            <Sidebar />
          </div>
          <div className={styles.mainContent}>
            <h1 className={styles.pageTitle}>{t('dashboardMetrics.title')}</h1>
            {/* Метрики */}
            <div className={styles.metrics}>
              {AdminMetrics.map(m => (
                <div key={m.id} className={styles.metricCard}
                >
                  <h3 className={styles.metricTitle}>{m.title}</h3>
                  <p className={styles.metricValue}>{m.value !== undefined ? m.value : "..."}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
)
}
export default Analytics