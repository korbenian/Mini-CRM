'use client'
//C:\Users\User\mini-crm\app\[locale]\AllUsers\users.tsx
import React, { useEffect, useState } from 'react'
import styles from './users.module.scss'
import { useTranslations } from 'next-intl'
import Sidebar from '../components/Sidebar/Sidebar'
import { useAllUsers } from '../AdminHooks/useAllUsers'
const AllUsers: React.FC = () => {

const  t  = useTranslations()
const { users, loading, error } = useAllUsers()

  if (loading) return <p>{t('errors.loading_users')}</p>
  if (error) return <p style={{ color: 'red' }}>{error}</p>
return (
  <div className={styles.wrapper}>
    <Sidebar />
   
       <p className={styles.usersTitle}>{t('profile.all_users')}</p>
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
        <tr key={user.id} className={styles.dataUser}>

          <td> {user.name}</td>
          <td>{user.age  ||'-'}</td> 
            <td> {user.about}</td>
          <td>{user.tech_stack?.join(', ') || '-'}</td>
          <td> {user.role}</td>
        </tr>
      ))}</tbody>
    </table>
  </div>
)

}

export default AllUsers
