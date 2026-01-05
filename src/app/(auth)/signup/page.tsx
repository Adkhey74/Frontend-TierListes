import SignupForm from '@/components/auth/SignupForm'
import Link from 'next/link'
import React from 'react'

export default function page() {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <div className='flex flex-col items-center justify-center gap-4 w-[500px]'>
        <h1 className='text-2xl font-bold'>Création de compte</h1>
        <SignupForm />
        <p>Vous avez déjà un compte ? <Link href="/signin">Se connecter</Link></p>
      </div>
    </div>
  )
}
