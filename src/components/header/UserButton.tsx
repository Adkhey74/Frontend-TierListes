'use client'

import React from 'react'
import { Button } from '../ui/button'
import { redirect } from 'next/navigation';

export default function UserButton() {

  const logout = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to logout user');
    }

    redirect('/signin');
  }

  return (
    <Button variant="outline" onClick={logout}>Déconnexion</Button>
  )
}
