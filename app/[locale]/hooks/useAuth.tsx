//C:\Users\User\mini-crm\app\[locale]\hooks\useAuth.tsx
import { useState, useEffect } from 'react'
import { onAuthStateChanged, User } from 'firebase/auth'
import { auth } from '../firebase'

export default function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    return onAuthStateChanged(auth, (usr) => {
      setUser(usr)
      setLoading(false)
    })
  }, [])

  return { user, loading }
}