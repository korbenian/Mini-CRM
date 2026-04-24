 'use client'
 //C:\Users\User\mini-crm\app\[locale]\Analitycs\page.tsx
 import { useState } from 'react'
import  Analitycs  from '../../../src/screens/ui/ADanalitycs/Analytics'
import { useTranslations } from 'next-intl'
import { supabase } from '@/src/shared/utils/supabase'
import useAuth from '../../../src/entities/session/useAuth'
import { useRenderProfile } from '@/src/entities/user/useProfile'
export default function AnalitycsPage() {
  const [metrics, setMetrics] = useState({ userCount: 0, totalCards: 0, avgAge: 0 });
  const  t  = useTranslations()
 const { user, loading: authLoading } = useAuth()
 const { profileData }=useRenderProfile()

  const LoadAdminmetrics = async () => {
  try {
    const { count: userCount, error: userError } = await supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true });

    
    const { count: totalCards, error: cardsError } = await supabase
      .from('leads')
      .select('*', { count: 'exact', head: true });

    const { data: ageData, error: ageError } = await supabase
      .from('profiles')
      .select('age');

    const ages = ageData?.map(p => p.age).filter(Boolean) || [];
    const avg = ages.length 
      ? Math.round(ages.reduce((a, b) => a + b, 0) / ages.length) 
      : 0;

    if (!userError && !cardsError) {
      setMetrics({
        userCount: userCount || 0,
        totalCards: totalCards || 0,
        avgAge: avg
      });
    }
  } catch (err) {
    console.error('Supabase Analytics Error:', err);
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