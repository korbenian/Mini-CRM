//C:\Users\User\mini-crm\app\[locale]\hooks\useProfile.tsx
'use client'
import {useEffect } from 'react'
import { getDoc} from 'firebase/firestore'
import { useUserStore } from '../store/userStore'
import { useState } from 'react'
import useAuth from '../hooks/useAuth'
import { db } from '../firebase'
import { doc, setDoc, serverTimestamp, query, collection, where, getDocs } from 'firebase/firestore'
import { useRouter } from 'next/navigation'
import { Profile, UserProfile } from '../types/types'

export  function useProfile(uid: string | undefined) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useRouter()

  const handleSaveProfile = async (profileData: Profile) => {
    if (!uid) {
      setError('No User ID')
      return
    }
    
    setLoading(true)
    try {
      const q = query(collection(db, 'users'), where('uid', '==', uid))
      const querySnapshot = await getDocs(q)

      if (!querySnapshot.empty) {
        navigate.push('/ClientForm')
        return
      }

      await setDoc(doc(db, "users", uid), {
        uid,
        ...profileData,
        createdAt: serverTimestamp()
      })

      navigate.push('/ClientForm')
    } catch (err) {
      setError('Ошибка при создании профиля')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return { handleSaveProfile, loading, error }
}

export function useRenderProfile(uid: string | undefined) {
  const [profileData, setProfileData] = useState<any>(null)
  const setUser = useUserStore((state) => state.setUser)
 const { user, loading: authLoading } = useAuth()
  useEffect(() => {
if (!uid || !user) return;
    const fetchProfile = async () => {
      const snap = await getDoc(doc(db, 'users', uid))

      
      if (snap.exists()) {
        const data = snap.data()
        const completedData={
          ...data,
          docId:snap.id
        } as UserProfile
        setProfileData(completedData)
       setUser(completedData);
      }
    }
    fetchProfile()
  }, [uid, setUser])

  return { profileData }
}