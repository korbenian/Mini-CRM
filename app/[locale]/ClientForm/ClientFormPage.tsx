'use client'
//C:\Users\User\mini-crm\app\[locale]\ClientForm\ClientFormPage.tsx
import { useState, useEffect } from 'react'
import { useUserStore } from '../store/userStore'
import { auth, db } from '../firebase'
import { onAuthStateChanged ,User} from 'firebase/auth'
import {getDoc,doc} from 'firebase/firestore'
import styles from './ClientFormPage.module.scss'
import { useTranslations } from 'next-intl'
import TechSelector from '../components/TechSelector'
import Sidebar from '../components/Sidebar'
import  Link  from 'next/link'
import useAuth from '../hooks/useAuth'

import {useRenderProfile} from '../hooks/useProfile'

export type UsProfile = {
  name: string
  age: number
  about: string
  avatarUrl?: string
  techStack?: string[]
  email:string
}


const ClientForm: React.FC = () => {
    const [techStack, setTechStack] = useState<string[]>([])
     const [showTech, setShowTech] = useState(false)
     const { user, loading: authLoading } = useAuth()
  const { profileData }=useRenderProfile(user?.uid)
  const  t  = useTranslations()
 useEffect(() => {
  if (profileData?.techStack) {
    setTechStack(profileData.techStack)
  }
}, [profileData])
if (authLoading) return <p>Проверка доступа...</p>
  if (!user) return <p>Вы не вошли в систему</p>
  if (!profileData) return <p>{t('loading.loadingdata')}</p>

  return (
    <div className={styles.wrapper}>
     <div className={styles.Sidebar}>
        <Sidebar />
      </div>
      <div className={styles.main}>
        <div className={styles.options}>
           <div className={styles.dataUser}>
  <h1>{t('profile.profile')}</h1>
  <p>
    <strong>{t('profile.email')}:</strong> {user.email}
  </p>
  <p>
    <strong>{t('profile.name')}:</strong> {profileData.name}
  </p>
  <p>
    <strong>{t('profile.age')}:</strong> {profileData.age}
  </p>
  <p>
    <strong>{t('profile.aboutuser')}:</strong> {profileData.about}
  </p>    <span className={styles.techText}>
    {t('profile.technologies')} : {techStack.join(', ')}
  </span>
  <div className={styles.techList + ' ' + (!showTech ? styles.hidden : '')}>
  <TechSelector onChange={list => setTechStack(list)} />
</div>
<button
  className={styles.techToggleButton}
  onClick={() => setShowTech(prev => !prev)}
>
  {showTech ? t('profile.hideTech') : t('profile.addTech')}
</button>
<Link className={styles.tariffs} href="/TariffsPlan">{t('tariff.plans')}</Link>
<Link className={styles.options_first} href='/EditProfile'>
            {t('profile.edit')}
          </Link>
</div>     
      </div>
    
        </div>
</div>  
  )
}
export default ClientForm
