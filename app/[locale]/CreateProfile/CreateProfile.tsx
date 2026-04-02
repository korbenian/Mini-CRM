'use client'
//C:\Users\User\mini-crm\app\[locale]\CreateProfile\CreateProfile.tsx
import { useState } from 'react'
import Input from '../components/Input/Input'
import styles from  './CreateProfile.module.scss'
import { useTranslations } from 'next-intl'
import Sidebar from '../components/Sidebar/Sidebar'
import { Profile } from '../types/types'
import {useProfile} from '../hooks/useProfile'

const CreateProfile = () => {
  const  t  = useTranslations()
  const [profileData, setProfileData] = useState<Profile>({
    name: '',
    age: 0,
    about: '',
    role: 'user',
  })
const {handleSaveProfile,loading:isSaving,error:isError}=useProfile()
  

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
     className={styles.button}
  onClick={()=>handleSaveProfile(profileData)}
  disabled={isSaving}
>{isSaving ? 'Saving...' : 'Save'}
</button>
      </div></div>
    </div>
  )
}

export default CreateProfile
