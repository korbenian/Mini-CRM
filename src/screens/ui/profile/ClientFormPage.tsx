'use client'
//C:\Users\User\mini-crm\app\[locale]\ClientForm\ClientFormPage.tsx
import { useState } from 'react'
import styles from './ClientFormPage.module.scss'
import { useTranslations } from 'next-intl'
import TechSelector from '../../../shared/ui/TechSelector/TechSelector'
import Sidebar from '../../../widgets/Sidebar/Sidebar'
import  Link  from 'next/link'
import useAuth from '../../../entities/session/useAuth'
import {useRenderProfile} from '@/src/entities/user/useProfile'
import { supabase } from '@/src/shared/utils/supabase'
import { useEffect } from 'react'
const ClientForm: React.FC = () => {
     const [showTech, setShowTech] = useState(false) 
     const [localTechs, setLocalTechs] = useState<string[]>([]);
     const  t  = useTranslations()
const { user, email, loading: authLoading } = useAuth()
  const { profileData, loading: profileLoading } = useRenderProfile()

useEffect(() => {
    if (profileData?.tech_stack) {
      setLocalTechs(profileData.tech_stack);
    }
  }, [profileData]);

  const updateTechStack = async (newList: string[]) => {
    setLocalTechs(newList); 

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;


    const { error } = await supabase
      .from('profiles')
      .upsert({ 
        id: user.id, 
        tech_stack: newList,
        updated_at: new Date().toISOString() 
      });

    if (error) console.error(t('errors.stack_update_failed'), error.message);
  };




  if (authLoading || profileLoading) return <p>{t('loading.loading')}</p>
  if (!user) return <p>{t("errors.access_denied_login")}</p>
 
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
    <strong>{t('profile.email')}:</strong> {email}
  </p>
  <p>
    <strong>{t('profile.name')}:</strong> {profileData?.name}
  </p>
  <p>
    <strong>{t('profile.age')}:</strong> {profileData?.age}
  </p>
  <p>
    <strong>{t('profile.aboutuser')}:</strong> {profileData?.about}
  </p>    <span className={styles.techText}>
    {t('profile.technologies')} : {profileData?.tech_stack.join(', ')}
  </span>
  <div className={styles.techList + ' ' + (!showTech ? styles.hidden : '')}>
  <TechSelector 
        selected={localTechs} 
        onChange={updateTechStack} 
      />
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
