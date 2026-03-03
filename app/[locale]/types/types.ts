//C:\Users\User\mini-crm\app\[locale]\types\types.ts
import { create } from 'zustand';
export type Task = {
  id: string
  title: string
  deadline: string
  isDone: boolean
  status: string
  isEditing: boolean
  userName:string
  uid:string
}
export  type getArticles = {
    id:number,
    title:string,
    description:string,
    cover_image:string|null
  }
  export type DashboardTypes={
  myCards: number;
  doneCards: number;
  activeCards: number;
  progress: number;
  }

export type Analitycs={
    userCount:number
    avgAge:number
    totalCards:number
  }

  export type UserProfile = {
 uid: string;    
  docId: string;    
  email: string | null;
  name: string;
  age: number;
  about: string;
  avatarUrl?: string;
  role:'user'|'admin'
  techStack:string[]
}
export type Profile = {
  name: string
  age: number
  about: string
  role: 'admin' | 'user',

}
