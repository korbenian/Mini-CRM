'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Profile, UserProfile } from '@/src/shared/types/types'
import { supabase } from '@/src/shared/utils/supabase'
import { useTranslations } from 'next-intl'

export  function useProfile() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useRouter()
const  t  = useTranslations()
  const handleSaveProfile = async (profileData: Profile) => {
  const{data:{user}}=await supabase.auth.getUser()
      if (!user) return
    
    setLoading(true)
    try {
 const { error: supabaseError } = await supabase
  .from('profiles')
  .upsert({
    id: user.id, 
    name: profileData.name,
    age: profileData.age,
    about: profileData.about,
    updated_at: new Date().toISOString()
  })

if (supabaseError) {
  setError(supabaseError.message)
  console.error(supabaseError)
  return 
}

navigate.push('/ClientForm')
    } catch (err) {
      setError(t('profile_creation_failed'))
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return { handleSaveProfile, loading, error }
}

export function useRenderProfile() {
  const [profileData, setProfileData] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchProfile = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { data, error } = await supabase
      .from('profiles') 
      .select('*')
      .eq('id', user.id)
      .single() 

    if (error && error.code !== 'PGRST116') {
       console.log(error)
    } else {
       setProfileData(data)
    }
    setLoading(false)
  }

  useEffect(() => { fetchProfile() }, []) 

  return { profileData, loading }
}