'use client'
import styles from './DashboardPage.module.scss'
import Sidebar from '../components/Sidebar/Sidebar'
import { Typewriter } from 'react-simple-typewriter'
import { useRenderProfile } from '../hooks/useProfile'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { useDashboard } from '../hooks/useDashboard' 
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'

export default function DashBoardPage() {
  const { profileData } = useRenderProfile()
  const router =useRouter()
  const { metrics, loading,kpi,funnel } = useDashboard()
const t =useTranslations()


  return (
  <div className={styles.DashBoardPage}>
    <div className={styles.Sidebar}>
      <Sidebar />
    </div>

    <div className={styles.mainContent}>
      <div className={styles.wrapper_greeting}>
        <div className={styles.greeting}>
          {t('dashboard.welcome')}, {profileData?.name || t('dashboard.friend')} 
          <Typewriter
            words={[t('dashboard.overview')]}
            typeSpeed={80}
          />
        </div>
      </div>

      <div className={styles.metrics}>
        <div className={styles.wrap_metricCard}>
          <div className={styles.metricCard}>
            <div className={styles.MyCard}>
              <span> 
                {t('dashboard.my_cards')}
                <h1>{metrics.myCards}</h1>
              </span>
            </div>
          </div>

          <div className={styles.metricCard}>
            <div className={styles.DoneCard}>
              <span>
                {t('dashboard.done_cards')}
                <h2>{metrics.doneCards}</h2>
              </span>
            </div>
          </div>
          
          <div className={styles.metricCard}>
            <h3>{t('dashboard.progress')}</h3>
            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{
                  width: `${metrics.progress}%`,
                  background: metrics.progress === 100 ? '#22c55e' : metrics.progress > 50 ? '#3b82f6' : '#f59e0b'
                }}
              />
            </div>
            <p>{metrics.progress}%</p>
          </div>
        </div>

        <div className={styles.hellowindow} onClick={()=>router.push('Tasks')}>
          <strong>{t('dashboard.welcome_back')}, {profileData?.name || t('dashboard.friend')} 👋</strong>
          <p>
            {t('dashboard.active_cards_msg', { activeCards: metrics.activeCards })}
          </p>
        </div>
      </div>
      <div className={styles.layout}>


<section>
   <div className={styles.wrap_metricCard}>
          <div className={styles.metricCard}>
            <div className={styles.MyCard}>
              
             <span>{t('dashboard.kpi.revenue')}</span>
              <h2>${kpi.revenue.toLocaleString()}</h2>
              
            </div>
          </div>

          <div className={styles.metricCard}>
            <div className={styles.DoneCard}>
             
                 <span>{t('dashboard.kpi.active_deals')}</span>
               <h2>{kpi.activeCount}</h2>
              
            </div>
          </div>
          
          <div className={styles.metricCard}>
           <span>{t('dashboard.kpi.avg_ticket')}</span>
          
           <h2>${kpi.avgTicket.toFixed(2)}</h2>
          </div>
        </div>
</section>











    
      <section className={styles.funnelSection}>
        <h3>{t('dashboard.funnel_title')}</h3>
        <ResponsiveContainer width="90%" height={270}>
          <BarChart data={funnel}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip 
              contentStyle={{ background: '#1c1c1e', border: '1px solid #3a3a3c' }} 
              labelStyle={{ color: '#fff' }}
            />
            <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </section>
    </div>
    </div>
  </div>
)
}