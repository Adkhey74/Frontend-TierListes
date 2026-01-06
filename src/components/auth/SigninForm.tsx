"use client"

import React from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Label } from '@radix-ui/react-label';
import { redirect } from 'next/navigation';

const schema = z.object({
  email: z.string().email({ message: 'L\'email est requis' }),
  password: z.string().min(8, { message: 'Le mot de passe doit contenir au moins 8 caractères' }),
});

type FormData = z.infer<typeof schema>;

export default function SigninForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  const loginUser = handleSubmit(async (data) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to login user');
    }

    redirect('/');
  });

  return (
    <form onSubmit={loginUser} className='w-full flex flex-col gap-4'>
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
          placeholder="Mot de passe"
          name="password"
        />
        {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
      </div>
      <Button>Se connecter</Button>
    </form>
  )
}
