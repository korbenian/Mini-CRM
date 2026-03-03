'use client'
//C:\Users\User\mini-crm\src\pages\EditProfile\EditProfile.tsx
import { useState} from 'react'
import styles from './EditProfile.module.scss'
import { db } from '../firebase'
import  Link  from 'next/link'
import {
  doc,
  updateDoc,
} from 'firebase/firestore'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { UserProfile } from '../types/types'
import { useUserStore } from '../store/userStore'
import Sidebar from '../components/Sidebar'

type Props={
  datauser:UserProfile
}
export default function EditProfile({datauser}:Props)  {
  const  t  = useTranslations()
  const [profileData, setProfileData] = useState<UserProfile>(datauser)
  const [error, setError] = useState('')
  const setUser=useUserStore((state)=>state.setUser)
  const navigate = useRouter()

 const handleSaveProfile = async () => {
  if (!profileData.docId) {
    console.error("ID документа отсутствует! Обновление невозможно.");
    return;
  }

  try {
    const userRef = doc(db, 'users', profileData.docId);
    await updateDoc(userRef, {
      name: profileData.name,
      age: profileData.age,
      about: profileData.about
    });
    
    setUser(profileData)
    navigate.push('/ClientForm')
  } catch (err) {
    console.error("Ошибка обновления:", err);
  }
};

  return (
    <div><div className={styles.Sidebar}>
        <Sidebar />
      </div>
    <div className={styles.wrapper}>
      
      <div className={styles.form} >
      <h1 className={styles.title}>{t('edit.edit')}</h1>
      {error && <p className={styles.error}>{error}</p>}

      <input
        className={styles.input}
        type='text'
        placeholder={t('edit.name')}
        value={profileData.name}
        onChange={e => setProfileData({ ...profileData, name: e.target.value })}
      />
      <input
        className={styles.input}
        type='number'
        placeholder='Возраст'
        value={profileData.age}
        onChange={e => setProfileData({ ...profileData, age: +e.target.value })}
      />
      <textarea
        className={styles.textarea}
        placeholder={t('edit.aboutuser')}
        value={profileData.about}
        onChange={e =>
          setProfileData({ ...profileData, about: e.target.value })
        }
      />
      <button className={styles.button} onClick={handleSaveProfile}>
        {t('edit.save')}
      </button>
      <Link href='/ClientForm'>{t('edit.exit')}</Link>
      </div>
    </div></div>
  )
}


