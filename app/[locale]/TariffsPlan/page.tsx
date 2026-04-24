'use client'
//C:\Users\User\mini-crm\app\[locale]\TariffsPlan.tsx\page.tsx
import useAuth from '../../../src/entities/session/useAuth'
import TariffPlans from '@/src/screens/ui/tariffs/TariffsPage'
import { useRouter } from 'next/navigation'
import { supabase } from '@/src/shared/utils/supabase'
export default function PageTariffs(){
    const {  user , loading:authLoading,userId} = useAuth()
    const navigate = useRouter()
    const addAdmin = async () => {
if(authLoading) return
        if (!user) {
            console.log("Нет данных для обновления!");
            return;
        }

        try {
         const {error: supabaseError}=await supabase
         .from('profiles')
         .upsert({
        id: userId, 
        role: 'admin',   
        updated_at: new Date().toISOString()    
        })
if (supabaseError) {
  console.error("Ошибка базы:", supabaseError)
  return 
}

            navigate.push('/ClientForm'); 
        } catch (error) {
            console.error("Ошибка при покупке:", error);
        }
    }

    return <TariffPlans Tariffprops={addAdmin} />
}