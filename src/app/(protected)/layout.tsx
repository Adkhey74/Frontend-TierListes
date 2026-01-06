import Header from '@/components/header/Header'
import { verifySession } from '@/lib/dal';
import { redirect } from 'next/navigation';
import React from 'react'

export default async function layout({ children }: { children: React.ReactNode }) {

  const session = await verifySession();

  if (!session.isAuth) {
    redirect('/signin');
  }

  return (
    <div className='flex flex-col min-h-screen gap-4'>
      <Header />
      <main className='flex-1 mx-5'>{children}</main>
    </div>
  )
}
