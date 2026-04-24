import React from 'react'
import { useTranslations } from 'next-intl'
import styles from './ChatInput.module.scss'

import {
  ArrowBigUp
} from 'lucide-react'
interface ChatInputProps {
  input: string
  setInput: (val: string) => void
  onSend: () => void
  placeholder?: string
}

const ChatInput: React.FC<ChatInputProps> = ({
  input,
  setInput,
  onSend,
  placeholder
}) => {
  const  t  = useTranslations()

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      onSend()
    }
  }

  return (
    <div className={styles.chatInput}>
      <div className={styles.text}>
      <textarea
        className={styles.textarea}
        placeholder={placeholder || t('type_message')}
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={handleKeyPress}
      />
      <button className={styles.sendBtn} onClick={onSend}>
        <ArrowBigUp />
      </button></div>
    </div>
  )
}

export default ChatInput

