"use client"

import React from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

export default function SigninForm() {
  return (
    <form action="" className='w-full flex flex-col gap-4'>
      <Input
        type="email"
        placeholder="Email"
        name="email"
        required
      />
      <Input
        type="password"
        placeholder="Password"
        name="password"
        required
      />
      <Button>Se connecter</Button>
    </form>
  )
}
