"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import styles from './LoginPage.module.scss'
import Input from '../components/Input/Input'
import  Link  from 'next/link'
import ChangeLanguage from '../components/Changelanguage/ChangeLanguage'
import ChangeTheme from '../components/ThemeButton/ThemeButton'
import { supabase } from '@/utils/supabase'

type LoginPage={
  email:string
  password:string
}

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useRouter()
  const  t  = useTranslations()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    try {
      const {data,error}=await supabase.auth.signInWithPassword({
        email,
        password
      })
      if (error) throw error
      navigate.push('/Dashboard')
    } catch (err: any) {
      setError(err.message || t('login.error'))
    }
  }

  return (
    <div className={styles.LoginPage}>
      <div className={styles.ExitBox}>
        <ChangeLanguage />
        <ChangeTheme />
      </div>
      <div className={styles.wrapper}>
        <form className={styles.form} onSubmit={handleLogin}>
          <h2>{t('login.title')}</h2>
          <Input
            value={email}
            name='email'
            onChange={e => setEmail(e.target.value)}
            placeholder={t('login.email')}
          />
          <Input
            value={password}
            name='password'
            onChange={e => setPassword(e.target.value)}
            placeholder={t('login.password')}
          />
          {error && <p className={styles.error}>{error}</p>}
<button className={styles.logIn} type='submit'>
  {t('login.button')}
</button>
          <p className={styles.haveAccount}>
            {t('login.noAccount')} <Link href='/RegisterPage'>{t('login.link')}</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default LoginPage