import React from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

export default function SignupForm() {
  return (
    <form action="" className='w-full flex flex-col gap-4'>
      <Input
        type="text"
        placeholder="Nom"
        name="nom"
        required
      />
      <Input
        type="email"
        placeholder="Prénom"
        name="prenom"
        required
      />
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
      <Button>Créer un compte</Button>
    </form>
  )
}
