import { useState, useEffect } from 'react'
import { User } from "@supabase/supabase-js"
import { supabase } from '@/src/shared/utils/supabase'

export default function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [email, setEmail] = useState<string | null>(null)
  const [role, setRole] = useState<string | null>(null)
  const [name, setName] = useState<string | null>(null) 
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getInitialState = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      const currentUser = session?.user ?? null
      
      setUser(currentUser)
      setEmail(currentUser?.email ?? null)

      if (currentUser) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role, name') 
          .eq('id', currentUser.id)
          .single()

        if (profile) {
          setRole(profile.role)
          setName(profile.name)
        }
      }
      setLoading(false)
    }

    getInitialState()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const currentUser = session?.user ?? null
      setUser(currentUser)
      setEmail(currentUser?.email ?? null)

      if (currentUser) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role, name')
          .eq('id', currentUser.id)
          .single()
        
        setName(profile?.name ?? null)
        setRole(profile?.role ?? 'user')
      } else {
        setName(null)
        setRole(null)
      }
      setLoading(false)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  return { user, email, role, name, loading, userId: user?.id }
}