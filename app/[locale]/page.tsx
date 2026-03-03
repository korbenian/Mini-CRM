//C:\Users\User\mini-crm\app\[locale]\page.tsx
import { redirect } from 'next/navigation';

export default async function IndexPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  

  redirect(`/${locale}/LoginPage`);
}