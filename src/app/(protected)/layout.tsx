import Header from '@/components/Header'
import React from 'react'

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex flex-col min-h-screen gap-4'>
      <Header />
      <main className='flex-1 mx-5'>{children}</main>
    </div>
  )
}
