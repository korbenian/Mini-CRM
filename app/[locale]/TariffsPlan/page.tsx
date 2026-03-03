'use client'
//C:\Users\User\mini-crm\app\[locale]\TariffsPlan.tsx\page.tsx
import useAuth from '../hooks/useAuth'
import { setDoc,doc } from 'firebase/firestore'
import { db } from '../firebase'
import TariffPlans from './TariffsPage'
import { useRouter } from 'next/navigation'
import { useUserStore } from '../store/userStore'
import { useRenderProfile } from '../hooks/useProfile'
export default function PageTariffs(){
    const { user } = useAuth()
    const { user: profileData, setUser } = useUserStore() 
    const {profileData:loadedData}=useRenderProfile(user?.uid)
    const navigate = useRouter()

    const addAdmin = async () => {
        console.log("Кнопка нажата!")
        if (!user || !profileData) {
            console.log("Нет данных для обновления!");
            return;
        }

        try {
            await setDoc(doc(db, "users", user.uid), { role: "admin" }, { merge: true });
            
            setUser({ ...profileData, role: "admin" });

            console.log("Роль успешно обновлена до Admin");
            

            navigate.push('/ClientForm'); 
        } catch (error) {
            console.error("Ошибка при покупке:", error);
        }
    }

    return <TariffPlans Tariffprops={addAdmin} />
}