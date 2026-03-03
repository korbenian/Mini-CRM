'use client'
//C:\Users\User\mini-crm\app\[locale]\AllUsers\users.tsx
import React, { useEffect, useState } from 'react'
import { db } from '../firebase'
import { collection, onSnapshot} from 'firebase/firestore'
import styles from './users.module.scss'
import { useTranslations } from 'next-intl'
import Sidebar from '../components/Sidebar'
import { UserProfile } from '../types/types'
const AllUsers: React.FC = () => {
const [users, setUsers] = useState<UserProfile[]>([])
  const  t  = useTranslations()
  useEffect(() => {
    
  const usersRef = collection(db, 'users')
  const unsubscribe = onSnapshot(usersRef, snapshot => {
    const usersList: UserProfile[] = snapshot.docs.map(doc => ({
      id: doc.id,
      ...(doc.data() as Omit<UserProfile, 'id'>)
    }))

    setUsers(usersList)
  },(error) => { console.error("Firebase error:", error); })


  return () => unsubscribe()

}, [])
return (
  <div className={styles.wrapper}>
    <Sidebar />
   
       <p className={styles.usersTitle}>All Users</p>
    <table className={styles.main}> 
      <thead>
        <tr>
          <th>{t('profile.name')||'-'}</th>      
          <th>{t('profile.age')||0}</th>
          <th>{t('profile.aboutuser')||'-'}</th>
          <th>{t('profile.technologies')||'-'}</th>
           <th>{t('profile.role')||'-'}</th>
        </tr>
        </thead>

        <tbody>
      {users.map(user => (
        <tr key={user.uid} className={styles.dataUser}>

          <td> {user.name}</td>
          <td>{user.age}</td> 
            <td> {user.about}</td>
          <td>{user.techStack?.join(', ') || '-'}</td>
          <td> {user.role}</td>
        </tr>
      ))}</tbody>
    </table>
  </div>
)

}

export default AllUsers
