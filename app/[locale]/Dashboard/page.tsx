// C:\Users\User\mini-crm\app\Dashboard\page.tsx
import { db } from '../../../lib/firebase' 
import { collection, getDocs, query, where } from 'firebase/firestore'
import DashBoardPage from './DashBoardPage'
import { NextIntlClientProvider } from 'next-intl'
import { DashboardTypes } from '../types/types'

export default async function DashboardServer({ searchParams }: { searchParams: Promise<{ uid?: string }> }) {
  const userId=(await searchParams).uid
    

    if (!userId) {
        const emptyMetrics: DashboardTypes = { myCards: 0, doneCards: 0, activeCards: 0, progress: 0 };
        return <DashBoardPage metrics={emptyMetrics} />;
    }

    const allCardsQuery = query(collection(db, 'cards'), where('uid', '==', userId));
    const doneCardsQuery = query(collection(db, 'cards'), where('uid', '==', userId), where('status', '==', 'Done'));

    const [allSnap, doneSnap] = await Promise.all([
        getDocs(allCardsQuery),
        getDocs(doneCardsQuery)
    ])

    const myCards = allSnap.size;
    const doneCards = doneSnap.size;

    const metrics: DashboardTypes = {
        myCards,
        doneCards,
        activeCards: myCards - doneCards,
        progress: myCards === 0 ? 0 : Math.round((doneCards / myCards) * 100)
    };

   return (
    <NextIntlClientProvider locale="en" messages={{}}>
      <DashBoardPage metrics={metrics}/>
    </NextIntlClientProvider>
  );
}