'use client'
//C:\Users\User\mini-crm\src\pages\EditProfile\EditProfile.tsx
import { useEffect, useState} from 'react'
import styles from './EditProfile.module.scss'
import  Link  from 'next/link'
import { useTranslations } from 'next-intl'
import { UserProfile } from '@/src/shared/types/types'
import { Input } from '@/src/shared/ui/input/'
import Sidebar from '@/src/widgets/Sidebar/Sidebar'
import { useProfile, useRenderProfile } from '@/src/entities/user/useProfile'

type Props={
  datauser:UserProfile
}
export default function EditProfile({ datauser }: Props) {
  const [formState, setFormState] = useState<UserProfile>(datauser)
  const { handleSaveProfile, loading: isSaving, error: saveError } = useProfile()
  const t = useTranslations()

  return (
    <div className={styles.wrapper_edit}>
      <div className={styles.Sidebar}>
        <Sidebar />
      </div>
      <div className={styles.wrapper}>
        <div className={styles.form}>
          <h1 className={styles.title}>{t('edit.edit')}</h1>
          {saveError && <p className={styles.error}>{saveError}</p>}

          <Input
            className={styles.input}
            type='text'
            placeholder={t('edit.name')}
            value={formState.name}
            onChange={e => setFormState({ ...formState, name: e.target.value })}
          />
          <Input
            className={styles.input}
            type='number'
            placeholder={t('edit.age')}
            value={formState.age}
            onChange={e => setFormState({ ...formState, age: +e.target.value })}
          />
          <textarea
            className={styles.textarea}
            placeholder={t('edit.aboutuser')}
            value={formState.about}
            onChange={e => setFormState({ ...formState, about: e.target.value })}
          />

          <button 
            className={styles.button} 
            onClick={() => handleSaveProfile(formState)} 
            disabled={isSaving}
          >
            {isSaving ? t('edit.saving') : t('edit.save')}
          </button>
          
          <Link href='/ClientForm'>{t('edit.exit')}</Link>
        </div>
      </div>
    </div>
  )
}


