"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from './RegisterPage.module.scss'
import {Input} from '@/src/shared/ui/input'
import  Link  from 'next/link'
import { useTranslations } from 'next-intl'
import ChangeTheme from '../../../src/shared/ui/ThemeButton/ThemeButton'
import LanguageSwitcher from '../../../src/shared/ui/Changelanguage/ChangeLanguage'
import { supabase } from '@/src/shared/utils/supabase'
const RegisterPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useRouter()
    const  t  = useTranslations()
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    try {
      const {data,error}=await supabase.auth.signUp({
        email,
        password
      })
if (error) throw error
      navigate.push('/Dashboard')
    } catch (err: any) {
  console.error(err)
  setError(err.message)
}
  }
  return (
    <div className={styles.RegisterPage}>
      <div className={styles.ExitBox}>
        <LanguageSwitcher/>
        <ChangeTheme />
      </div>
      <div className={styles.wrapper}>
        <form className={styles.form} onSubmit={handleRegister}>
          <h2>{t('registration.title')}</h2>
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
          {error && <p>{error}</p>}
          <button className={styles.logIn} type='submit' >
            Register
            </button>
          <p className={styles.haveAccount}>
            {t('registration.haveAccount')}<Link href='/LoginPage'>{t('registration.link')}</Link>
          </p>
        </form>
      </div>
    </div>
  )
}
export default RegisterPage
