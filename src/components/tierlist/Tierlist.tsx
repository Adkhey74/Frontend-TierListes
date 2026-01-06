'use client'

import React from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Card } from '../ui/card'
import Row from './Row'
import Image from 'next/image'
import { getLogoUrl } from '@/lib/utils'
import { Company } from '@/types/company'

const Item = ({ company }: { company: Company }) => {  
  return (
    <div className='size-20 bg-accent rounded-lg overflow-hidden'>
      <Image src={getLogoUrl(company.name)} alt={company.name} width={100} height={100} />
    </div>
  )
}

const getColor = (rank: string) => {
  switch (rank) {
    case 'S':
      return 'bg-red-500'
    case 'A':
      return 'bg-yellow-500'
    case 'B':
      return 'bg-green-500'
    case 'C':
      return 'bg-blue-500'
    case 'D':
      return 'bg-purple-500'
    default:
      return 'bg-gray-500'
  }
}

interface TierlistProps {
  availableCompanies: Company[]
}

export default function Tierlist({ availableCompanies }: TierlistProps) {
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex gap-4'>
        <Input
          type="text"
          placeholder="Nom de la tier liste"
          className='flex-1'
        />
        <Button>Sauvegarder</Button>
      </div>
      <ul className='w-full rounded-lg overflow-hidden'>
        <li className='w-full'><Row item={{ rank: 'S', color: getColor('S') }} /></li>
        <li className='w-full'><Row item={{ rank: 'A', color: getColor('A') }} /></li>
        <li className='w-full'><Row item={{ rank: 'B', color: getColor('B') }} /></li>
        <li className='w-full'><Row item={{ rank: 'C', color: getColor('C') }} /></li>
        <li className='w-full'><Row item={{ rank: 'D', color: getColor('D') }} /></li>
      </ul>
      <Card className='flex flex-row gap-2 flex-wrap p-2'>
        {availableCompanies.length > 0 ? (
          availableCompanies.map((company) => (
            <Item key={company.id} company={company} />
          ))
        ) : (
          <div className='text-center text-gray-500'>Aucune entreprise disponible</div>
        )}
      </Card>
    </div>
  )
}
