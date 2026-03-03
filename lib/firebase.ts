import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics, isSupported } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyB7Oeh8A-avtdw1zeYXK4t-Aivqn8qaRbk',
  authDomain: 'mini-crm-59748.firebaseapp.com',
  projectId: 'mini-crm-59748',
  storageBucket: 'mini-crm-59748.appspot.com', 
  messagingSenderId: '935891437255',
  appId: '1:935891437255:web:981f1428d16d1f4271e0e2',
  measurementId: 'G-KWQPND2BB0'
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export const initAnalytics = async () => {
  if (typeof window !== 'undefined' && await isSupported()) {
    return getAnalytics(app);
  }
  return null;
};

export { app };