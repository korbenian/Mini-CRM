'use client'
import { useEffect, useState } from 'react'
import styles from './ArticleModal.module.scss'

export default function ArticleModal ({
  id,
  onClose
}: {
  id: number
  onClose: () => void
}) {
  const [article, setArticle] = useState<any | null>(null)

  useEffect(() => {
    const fetchArticle = async () => {
      const res = await fetch(`https://dev.to/api/articles/${id}`)
      const data = await res.json()
      setArticle(data)
    }
    fetchArticle()
  }, [id])

  
if (!article) {
  return (
    <div className={styles.loadingOverlay}>
      <div className={styles.loadingBox}>Загрузка...</div>
    </div>
  )
}

return (
  <div className={styles.modalOverlay}>
    <div className={styles.modalContent}>
      <button onClick={onClose} className={styles.closeButton}>
        ✖
      </button>

      <h2>{article.title}</h2>
      <p>Автор: {article.user?.name || 'Unknown'}</p>

      <img src={article.cover_image || '/placeholder.jpg'} alt="cover" />

      <div
        className="prose"
        dangerouslySetInnerHTML={{ __html: article.body_html }}
      />
    </div>
  </div>
)
}
