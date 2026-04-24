'use client'
import { useTranslations } from 'next-intl'
//C:\Users\User\mini-crm\app\[locale]\EditProfile\page.tsx
import useAuth from '../../../src/entities/session/useAuth'
import { useRenderProfile } from '@/src/entities/user/useProfile'
import EditProfile from '@/src/screens/ui/editProfile/EditProfile'

export default function EditPage() {
  const { user, loading: authLoading } = useAuth()
  const { profileData } = useRenderProfile()
const t =useTranslations()
  if (authLoading || !profileData) return <p>{t('loading.loading')}</p>
  if (!user) return <p>{t('generic_error_prefix')}</p>

  return <EditProfile datauser={profileData} />
}