//C:\Users\User\mini-crm\app\[locale]\types\types.ts

import { create } from 'zustand';
export type Task = {
  id: string
  name: string
  status: string
  user_id: string
  description: string
  profiles?: {
    name: string;
  };
  created_at: string
  deadline: string   
  isDone: boolean     
  isEditing?: boolean
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
  id: string;  
  name: string;
  age: number;
  about: string;
  role: 'user' | 'admin';
  tech_stack: string[];
  updated_at?: string;
}
export type Profile = {
  name: string
  age: number
  about: string
  role: 'admin' | 'user',
}
