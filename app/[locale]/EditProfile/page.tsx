'use client'
//C:\Users\User\mini-crm\app\[locale]\EditProfile\page.tsx
import useAuth from '../hooks/useAuth'
import { useRenderProfile } from '../hooks/useProfile'
import EditProfile from './EditProfile'

export default function EditPage() {
  const { user, loading: authLoading } = useAuth()
  const { profileData } = useRenderProfile(user?.uid)

  if (authLoading || !profileData) return <p>Загрузка...</p>
  if (!user) return <p>Доступ запрещен</p>

  return <EditProfile datauser={profileData} />
}