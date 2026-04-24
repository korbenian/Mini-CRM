'use client';
import {
  LayoutDashboard,
  BookOpenCheck,
  ClipboardList,
  Handshake,
  ChartNoAxesCombined,
  BotMessageSquare 
} from 'lucide-react'
import  Link  from 'next/link'
import styles from './Sidebar.module.scss'
import ChangeTheme from '@/src/shared/ui/ThemeButton/ThemeButton'
import ChangeLanguage from '@/src/shared/ui/Changelanguage/ChangeLanguage'
import { useTranslations } from 'next-intl'
import { useRenderProfile } from '@/src/entities/user/useProfile';

export default function Sidebar () {
const t = useTranslations()
const { profileData,loading:profileLoading} = useRenderProfile()

const isAdmin=profileData?.role==='admin'


  return (
  <div className={styles.container}>
    <div className={styles.header}>
      <ChartNoAxesCombined />
      Mini-CRM
    </div>

    <nav className={styles.nav}>
      <Link href='/Dashboard' className={styles.link}>
        <LayoutDashboard size={18} />
        <span>{t('navigation.dashboard')}</span>
      </Link>

      <Link href='/Deals' className={styles.link}>
        <Handshake size={18} />
        <span>{t('navigation.deals')}</span>
      </Link>

      <Link href='/Articles' className={styles.link}>
        <BookOpenCheck size={18} />
        <span>{t('navigation.articles')}</span>
      </Link>

      <Link href='/Tasks' className={styles.link}>
        <ClipboardList size={18} />
        <span>{t('navigation.tasks')}</span>
      </Link>

      <Link href='/ChatWithAI' className={styles.link}>
        <BotMessageSquare size={18} />
        <span>{t('navigation.chat')}</span>
      </Link>
    </nav>

    <div className={styles.WrapperChangeLanguage}>
      <div className={styles.ChangeLanguage}>
        <ChangeLanguage />
      </div>
    </div>

    <div className={styles.adminPanel}>
      {!profileLoading && isAdmin && (
        <>
          <hr className={styles.separator} />
          <p className={styles.adminTitle}>{t('navigation.admin_title')}</p>
          <Link href="/AllUsers" className={styles.link}>{t('navigation.users')}</Link>
          <Link href="/AllCards" className={styles.link}>{t('navigation.cards')}</Link>
          <Link href="/Analitycs" className={styles.link}>{t('navigation.analytics')}</Link>
        </>
      )}
    </div>

    <div className={styles.wrapaccext}>
      <div className={styles.accext}>
        <ChangeTheme />
        {profileData ? (
          <Link className={styles.buttons} href='/ClientForm'>
            {t('navigation.profile')}
          </Link>
        ) : (
          <Link className={styles.buttons} href='/CreateProfile'>
            {t('navigation.account')}
          </Link>
        )}

        <Link className={styles.exitx} href='/'>
          {t('navigation.exit')}
        </Link>
      </div>
    </div>
  </div>
);
}
