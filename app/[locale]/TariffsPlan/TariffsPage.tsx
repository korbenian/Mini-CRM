'use client'
import { useTranslations } from 'next-intl'
//C:\Users\User\mini-crm\app\[locale]\TariffsPlan.tsx\TariffsPage.tsx
import Sidebar from '../components/Sidebar/Sidebar'
import styles from './tariffs.module.scss'
import {
UserStar,User
} from 'lucide-react'
type Tariffs={
    Tariffprops:()=>void
}

const TariffPlans=({Tariffprops}:Tariffs)=>{
    const t =useTranslations()
    const tariffs = [
    {id:1,title:t('tariffs.user_label'),description:t('tariffs.user_features')}
,{id:2,title:t('tariffs.admin_label'),description:t('tariffs.admin_features')}

]
    return(
        <div className={styles.wrappertariff}>
            <div className={styles.sis}> <Sidebar/></div>
      
            {tariffs.map(i=>
                <div className={styles.tariffCard} key={i.id}>
                    <p>{i.title}</p>
                    {i.title =='ADMIN' ? <UserStar /> :<User />}
                    
                    <span>{i.description}</span>
                    {i.title =='ADMIN' ? <div><button className={styles.buyButton} onClick={Tariffprops}>{t('tariffs.buy')}</button><p>5.50$</p></div> :"Now"}
                </div>
                
            )}
      
        <div></div>
        </div>
    )
}
export default TariffPlans