'use client'
import { supabase } from '@/src/shared/utils/supabase'
import { useState } from 'react'

export default function useTasks(onUpdate?: () => void) {
  const [isPending, setIsPending] = useState(false)

  const removeTask = async (id: string) => {
    const { error } = await supabase
      .from('leads')
      .delete()
      .eq('id', id)

    if (error) throw error
    if (onUpdate) onUpdate() 
  }

  const handleSave = async (id: string, title: string, deadline: string) => {
    setIsPending(true)
    try {
      const { error } = await supabase
        .from('leads')
        .update({ name: title, deadline: deadline })
        .eq('id', id)

      if (error) throw error
      if (onUpdate) onUpdate()
    } finally {
      setIsPending(false)
    }
  }

  const updateStatus = async (id: string, newStatus: string) => {
    const { error } = await supabase
      .from('leads')
      .update({ status: newStatus })
      .eq('id', id)

    if (error) throw error
    if (onUpdate) onUpdate()
  }

  return { removeTask, handleSave, updateStatus, isPending }
}