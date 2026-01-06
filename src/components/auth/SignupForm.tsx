"use client"

import React from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { Label } from '../ui/label';
import { redirect } from 'next/navigation';

const schema = z.object({
  lastName: z.string().min(1, { message: 'Le nom est requis' }),
  firstName: z.string().min(1, { message: 'Le prénom est requis' }),
  email: z.string().email({ message: 'L\'email est requis' }),
  password: z.string().min(8, { message: 'Le mot de passe doit contenir au moins 8 caractères' }),
});

type FormData = z.infer<typeof schema>;

export default function SignupForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  const registerUser = handleSubmit(async (data) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to register user');
    }

    redirect('/');
  });

  return (
    <form onSubmit={registerUser} className='w-full flex flex-col gap-4'>
      <div className='flex flex-col gap-1'>
        <Label htmlFor="lastName">Nom</Label>
        <Input
          {...register('lastName')}
          type="text"
          placeholder="Nom"
          name="lastName"
        />
        {errors.lastName && <p className='text-red-500'>{errors.lastName.message}</p>}
      </div>
      <div className='flex flex-col gap-1'>
        <Label htmlFor="firstName">Prénom</Label>
        <Input
          {...register('firstName')}
          type="text"
          placeholder="Prénom"
          name="firstName"
        />
        {errors.firstName && <p className='text-red-500'>{errors.firstName.message}</p>}
      </div>
      <div className='flex flex-col gap-1'>
        <Label htmlFor="email">Email</Label>
        <Input
          {...register('email')}
          type="email"
          placeholder="Email"
          name="email"
        />
        {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
      </div>
      <div className='flex flex-col gap-1'>
        <Label htmlFor="password">Mot de passe</Label>
        <Input
          {...register('password')}
          type="password"
          placeholder="Password"
          name="password"
        />
        {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
      </div>
      <Button>Créer un compte</Button>
    </form>
  )
}
