import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button';
import { verifySession } from '@/lib/dal';
import UserButton from './UserButton';

export default async function Header() {
  const session = await verifySession();

  const renderUserButton = () => {
    if (session.isAuth) {
      return (
        <UserButton />
      )
    }
    return (
      <Button variant="outline">
        <Link href="/signin">Connexion</Link>
      </Button>
    )
  }

  return (
    <header className='flex justify-between items-center px-4 border-b border-gray-200 bg-accent'>
      <Image src="/logo2.png" alt="TierListes" width={100} height={100} />
      <nav>
        <ul className='flex gap-4'>
          <li>
            <Link href="/">Accueil</Link>
          </li>
          <li>
            <Link href="/my-tier-list">Mes tier listes</Link>
          </li>
          <li>
            <Link href="/">Global</Link>
          </li>
        </ul>
      </nav>
      {renderUserButton()}
    </header>
  )
}
