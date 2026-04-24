import { useState, useEffect } from 'react'
import { supabase } from '@/src/shared/utils/supabase'
import { Task } from '../../shared/types/types'
import { useTranslations } from 'next-intl'

export function useAllCards() {
  const [cards, setCards] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
const t =useTranslations()
  const fetchCards = async () => {
    setLoading(true)
    
    const { data, error: supabaseError } = await supabase
      .from('leads')
      .select(`
    *,
    profiles (name) 
  `)
      .order('created_at', { ascending: false }) 

    if (supabaseError) {
      setError(supabaseError.message)
      console.error(t('errors.fetch_cards_failed'), supabaseError)
    } else {
      setCards(data || [])
    }
    
    setLoading(false)
  }

  useEffect(() => {
    fetchCards()
  }, [])

  return { cards, loading, error, refresh: fetchCards }
}