//C:\Users\User\mini-crm\src\pages\Articles\ArticlesClient.tsx
'use client'
import {  useState } from 'react'
import ArticleModal from '../ArticleModal/ArticleModal'
import styles from './Articles.module.scss'
import Sidebar from '../components/Sidebar'
import { useTranslations } from 'next-intl' 
import {getArticles} from '../types/types'
export default function ArticlesClient ({ initialArticles }: { initialArticles: getArticles[] }) {
  const [articles] = useState<getArticles[]>(initialArticles)
  const [selectedArticle, setSelectedArticle] = useState<getArticles |null>(null)

 const  t  = useTranslations()

  
return (
  <div className={styles.articlesPage}>
    <div className={styles.articlesPage__sidebar}>
      <Sidebar />
    </div>

    <div className={styles.articlesPage__content}>
      <h1>{t('art.title')}</h1>

      <div className={styles.articlesPage__content__grid}>
        {articles.map(article => (
          <div
            key={article.id}
            className={styles.articlesPage__content__card}
            onClick={() => setSelectedArticle(article)}
          >
            <h2>{article.title}</h2>
            <p>{article.description || t('art.noDescription')}</p>
          </div>
        ))}

        {selectedArticle && (
          <ArticleModal
            id={selectedArticle.id}
            onClose={() => setSelectedArticle(null)}
          />
        )}
      </div>
    </div>
  </div>
)
}
