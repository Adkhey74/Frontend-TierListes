import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button';

export default function Header() {

  const isConnected = false;

  const renderUserButton = () => {
    if (isConnected) {
      return (
        <p>User connected</p>
      )
    }
    return (
      <Button variant="outline">
        <Link href="/signin">Connexion</Link>
      </Button>
    )
  }

  return (
    <header className='flex justify-between items-center px-4 bg-black'>
      <Image src="/logo2.png" alt="TierListes" width={100} height={100} />
      <nav>
        <ul className='flex gap-4 text-white'>
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
