"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'
import styles from './RegisterPage.module.scss'
import Input from '../components/Input'
import  Link  from 'next/link'
import Button from '../components/Button'
import { useTranslations } from 'next-intl'
import ChangeTheme from '../components/ThemeButton'
import LanguageSwitcher from '../components/ChangeLanguage'
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
      await createUserWithEmailAndPassword(auth, email, password)

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
          <Button type='submit' label='register' />
          <p className={styles.haveAccount}>
            {t('registration.haveAccount')}<Link href='/LoginPage'>{t('registration.link')}</Link>
          </p>
        </form>
      </div>
    </div>
  )
}
export default RegisterPage
