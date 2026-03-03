'use client'
//C:\Users\User\mini-crm\app\[locale]\AllCards\page.tsx
import AllCards from "./AllCards";
import { useRenderProfile } from '../hooks/useProfile'
import useAuth from "../hooks/useAuth";
import { useTranslations } from 'next-intl'
export default function AllCardsPage(){
    const {user,loading:authLoading}=useAuth()
     const { profileData }=useRenderProfile(user?.uid)
     const  t  = useTranslations()
    if(authLoading || !profileData){
    return <div>{t('common.loading')}</div>
    }
    
    if(profileData.role !=='admin'){
     return <div>{t('errors.notAdmin')}</div>
    }
    
    return <AllCards/>
}