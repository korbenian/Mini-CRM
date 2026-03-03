'use client'
//C:\Users\User\mini-crm-vite\src\pages\ChatWithAI\ChatWithAI.tsx
import { useChatLogic } from '../components/useChatLogic'
import styles from './ChatWithAI.module.scss'
import ChatInput from '../components/ChatInput'
import { useTranslations } from 'next-intl'
import Sidebar from '../components/Sidebar'
export default function ChatWithAI () {
  const {
    input,
    setInput,
    messages,
    loading,
    error,
    handleSend,
  } = useChatLogic()


const  t  = useTranslations()
  return (
  <div className={styles.chat}>
    <aside className={styles.sidebar}>
      <Sidebar />
    </aside>

    <div className={styles.page}>
      <main className={styles.main}>
        <header className={styles.header}>
          <strong>{t('chat.title')}</strong>
        </header>

        <div className={styles.messagesWrapper}>
          <section className={styles.messages}>
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`${styles.message} ${
                  msg.role === 'user'
                    ? styles.user
                    : styles.assistant
                }`}
              >
                {msg.content}
              </div>
            ))}

            {loading && (
              <div className={styles.status}>
                {t('chat.thinking')}
              </div>
            )}

            {error && (
              <div className={styles.error}>
                {error}
              </div>
            )}

            {!loading && messages.length === 0 && (
              <div className={styles.empty}>
                {t('chat.empty')}
              </div>
            )}
          </section>
        </div>

        <ChatInput
          input={input}
          setInput={setInput}
          onSend={handleSend}
          placeholder={t('chat.placeholder')}
        />
      </main>
    </div>
  </div>
)
}
