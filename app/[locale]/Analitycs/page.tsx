 'use client'
 //C:\Users\User\mini-crm\app\[locale]\Analitycs\page.tsx
 import { collection, getDocs, query } from 'firebase/firestore'
 import {db } from '../firebase'
 import { useState } from 'react'
import  Analitycs  from './Analytics'
import { useTranslations } from 'next-intl'
import useAuth from '../hooks/useAuth'
import { useRenderProfile } from '../hooks/useProfile'
export default function AnalitycsPage() {
  const [metrics, setMetrics] = useState({ userCount: 0, totalCards: 0, avgAge: 0 });
  const  t  = useTranslations()
 const { user, loading: authLoading } = useAuth()
 const { profileData }=useRenderProfile(user?.uid)

  const LoadAdminmetrics = async () => {
    try {
      
      const usersSnapQuery =query(collection(db, 'users'));
      const cardsSnapQuery =query(collection(db, 'cards'));
      
      const [usersSnap,cardsSnap]= await Promise.all([
getDocs(usersSnapQuery),
getDocs(cardsSnapQuery)])

      const ages = usersSnap.docs.map(doc => (doc.data() as any).age || 0);
      const avg = ages.length ? Math.round(ages.reduce((a, b) => a + b, 0) / ages.length) : 0;

      setMetrics({
        userCount: usersSnap.size,
        totalCards: cardsSnap.size,
        avgAge: avg
      });
    } catch (err) {
      console.error('Firestore error:', err);
    }
  };

if(authLoading || !profileData){
return <div>{t('common.loading')}</div>
}

if(profileData.role !=='admin'){
 return <div>{t('errors.notAdmin')}</div>
}
  return <Analitycs loadMetrics={LoadAdminmetrics} data={metrics} />;
}