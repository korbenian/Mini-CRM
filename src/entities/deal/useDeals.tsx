'use client'
import { useEffect, useState, useCallback } from 'react'
import { supabase } from '@/src/shared/utils/supabase'

export function useDeals() {
  const [deals, setDeals] = useState<any[]>([]) 
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')


  const fetchDeals = useCallback(async () => {
    setLoading(true)
    try {
      const { data, error: sbError } = await supabase
        .from('deals')
        .select('*')
        .order('created_at', { ascending: false })

      if (sbError) throw sbError
      setDeals(data || [])
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])


  useEffect(() => {
    fetchDeals()
  }, [fetchDeals])


  const handleCreateDeal = async (title: string, amount: number, stage: string) => {
    setLoading(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { error: sbError } = await supabase
        .from('deals')
        .insert({ user_id: user.id, title, amount, stage })

      if (sbError) throw sbError
      
      await fetchDeals() 
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }


  const handleDeleteDeal = async (id: string) => {
    try {
      const { error: sbError } = await supabase.from('deals').delete().eq('id', id)
      if (sbError) throw sbError
      setDeals(prev => prev.filter(d => d.id !== id)) 
    } catch (err: any) {
      setError(err.message)
    }
  }

const handleChangeDeal = async (id: string, updates: any) => {

  setDeals((prevDeals) =>
    prevDeals.map((deal) =>
      deal.id === id ? { ...deal, ...updates } : deal
    )
  )

  const { error } = await supabase
    .from('deals')
    .update(updates)
    .eq('id', id)

  if (error) {
    console.error(error)
  }
}

  return { 
    deals, 
    handleCreateDeal, 
    fetchDeals, 
    handleDeleteDeal, 
    handleChangeDeal, 
    loading, 
    error 
  }
}