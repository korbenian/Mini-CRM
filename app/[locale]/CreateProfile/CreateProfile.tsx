'use client'
//C:\Users\User\mini-crm\app\[locale]\CreateProfile\CreateProfile.tsx
import { useState, useEffect } from 'react'
import { auth, db } from '../firebase'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { onAuthStateChanged ,User} from 'firebase/auth'
import { useRouter } from 'next/navigation'
import Input from '../components/Input'
import styles from  './CreateProfile.module.scss'
import { useTranslations } from 'next-intl'
import Sidebar from '../components/Sidebar'
import { Profile } from '../types/types'
import {useProfile} from '../hooks/useProfile'

const CreateProfile = () => {
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null)
  const  t  = useTranslations()
  const [profileData, setProfileData] = useState<Profile>({
    name: '',
    age: 0,
    about: '',
    role: 'user',
  })
  const navigate = useRouter()
const {handleSaveProfile,loading:isSaving,error:isError}=useProfile(firebaseUser?.uid)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async user => {
      if (user) {
        setFirebaseUser(user)

        const q = query(collection(db, 'users'), where('uid', '==', user.uid))
        const querySnapshot = await getDocs(q)

        if (!querySnapshot.empty) {
          navigate.push('/ClientForm')
        }
      } else {
        setFirebaseUser(null)
      }
      
    })

    return () => unsubscribe()
  }, [navigate])






  if (!firebaseUser) return <p>Пожалуйста, войдите в систему</p>

  return (
    <div className={styles.wrapper}>
     <Sidebar/>
      <div className={styles.create_account}>
        <div className={styles.true_reg}>
        <h1 className={styles.title}>{t('createprofile.createprofile')}</h1>
        {isError && <p style={{ color: 'red' }}>{isError}</p>}
    


        <Input
          className={styles.input}
          type='text'
          placeholder={t('createprofile.name')}
          value={profileData.name}
          onChange={e =>
            setProfileData({ ...profileData, name: e.target.value })
          }
        />
        <Input
          className={styles.input}
          placeholder={t('createprofile.age')}
          value={profileData.age}
          onChange={e =>
            setProfileData({ ...profileData, age: +e.target.value })
          }
        />
        <Input
          className={styles.textarea}
          placeholder={t('createprofile.description')}
          value={profileData.about}
          onChange={e =>
            setProfileData({ ...profileData, about: e.target.value })
          }
        />
     <button
  onClick={()=>handleSaveProfile(profileData)}
  disabled={isSaving}
>{isSaving ? 'Saving...' : 'Save'}
</button>
      </div></div>
    </div>
  )
}

export default CreateProfile
