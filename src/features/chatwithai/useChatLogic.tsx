'use client'
//C:\Users\User\mini-crm\src\components\useChatLogic.tsx
import { useState } from 'react'
import axios from 'axios'
import { useTranslations } from 'next-intl'

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

export function useChatLogic () {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
const t=useTranslations()
  const handleSend = async () => {
  if (!input.trim() || loading) return

  const userMessage: ChatMessage = {
    role: 'user',
    content: input
  }
  setMessages(prev => [...prev, userMessage])
  
  const messageToSend = input 
  setInput('')
  setLoading(true)
  setError(null)

  try {
    const res = await axios.post(`/api/chat`, {
      message: messageToSend
    })

    const assistantMessage: ChatMessage = {
      role: 'assistant',
      content: res.data.reply 
    }

    setMessages(prev => [...prev, assistantMessage])
  } catch (e) {
    setError(t('response_fetch_error'))
    setMessages(prev => [
      ...prev,
      { role: 'assistant', content: t('response_fetch_error')}
    ])
  } finally {
    setLoading(false)
  }
}



  const clearChat = () => {
    setMessages([])
    setError(null)
  }

  return {
    input,
    setInput,
    messages,
    loading,
    error,
    handleSend,
    clearChat
  }
}
