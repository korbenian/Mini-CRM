import { useState, useEffect } from 'react'
import { supabase } from '@/src/shared/utils/supabase'
import { useTranslations } from 'next-intl'

export function useAllUsers() {
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
const t =useTranslations()
  const fetchUsers = async () => {
    setLoading(true)
    
    const { data, error: supabaseError } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false }) 

    if (supabaseError) {
      setError(supabaseError.message)
      console.error(t('errors.fetch_users_failed'), supabaseError)
    } else {
      setUsers(data || [])
    }
    
    setLoading(false)
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return { users, loading, error, refresh: fetchUsers }
}