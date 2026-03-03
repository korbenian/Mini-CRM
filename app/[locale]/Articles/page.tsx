//C:\Users\User\mini-crm\src\pages\Articles\articlesServer.tsx
import ArticlesClient from './ArticlesClient'
import {getArticles} from '../types/types'
export default async function ArticlesServer () {

      const res = await fetch('https://dev.to/api/articles?per_page=10')
      const data:getArticles[] = await res.json()
     
    
      return <ArticlesClient initialArticles={data}/>

}
