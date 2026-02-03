'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'
import { cn } from '@/lib/utils';

export default function Nav() {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  return (
    <nav>
      <ul className='flex gap-8'>
        <li>
          <Link href="/" className={cn('text-lg', isActive('/') ? 'text-primary' : 'text-gray-500')}>Accueil</Link>
        </li>
        <li>
          <Link href="/my-tier-list" className={cn('text-lg', isActive('/my-tier-list') ? 'text-primary' : 'text-gray-500')}>Mes tier listes</Link>
        </li>
        <li>
          <Link href="/global-tierlist" className={cn('text-lg', isActive('/global-tierlist') ? 'text-primary' : 'text-gray-500')}>Global</Link>
        </li>
      </ul>
    </nav>
  )
}
