//C:\Users\User\mini-crm\app\[locale]\store\userStore.tsx
import { create } from 'zustand';

type UserProfile = {
  uid: string;
  email: string | null;
  age:number
  name: string;
  about:string | null
  avatarUrl?: string;
  role: 'user'|'admin'
};

type UserStore = {
  user: UserProfile | null;
  setUser: (user: UserProfile) => void;
  clearUser: () => void;
};

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));
