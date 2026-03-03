'use client'
//C:\Users\User\mini-crm\app\[locale]\AllUsers\page.tsx
import AllUsers from "./users";
import { useRenderProfile } from '../hooks/useProfile'
import useAuth from "../hooks/useAuth";
import { useTranslations } from 'next-intl'
export default function AllUsersPage(){
const {user,loading:authLoading}=useAuth()
 const { profileData }=useRenderProfile(user?.uid)
 const  t  = useTranslations()
if(authLoading || !profileData){
return <div>{t('common.loading')}</div>
}

if(profileData.role !=='admin'){
 return <div>{t('errors.notAdmin')}</div>
}

  return  <AllUsers/>
}