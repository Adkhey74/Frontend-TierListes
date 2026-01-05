import SigninForm from '@/components/auth/SigninForm'
import Link from 'next/link'
import React from 'react'

export default function page() {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <div className='flex flex-col items-center justify-center gap-4 w-[500px]'>
        <h1 className='text-2xl font-bold'>Connexion</h1>
        <SigninForm />
        <p>Vous n&apos;avez pas de compte ? <Link href="/signup">Créer un compte</Link></p>
      </div>
    </div>
  )
}
