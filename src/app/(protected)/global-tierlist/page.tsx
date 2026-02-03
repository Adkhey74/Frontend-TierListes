'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getLogoUrl } from '@/lib/utils'
import { Download } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

interface GlobalTierlist {
  companyName: string,
  voteDistribution: {
    S: number,
    A: number,
    B: number,
    C: number,
    D: number
  }
}

export default function Page() {
  const [globalTierlist, setGlobalTierlist] = useState<GlobalTierlist[]>([])
  const handleExportPDF = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tier-lists/mutualized/pdf/download`, {
      method: 'GET',
      credentials: 'include'
    })

    if (!response.ok) {
      throw new Error('Failed to fetch global tier list')
    }

    const blob = await response.blob()
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'tier-list.pdf'
    a.click()
  }

  useEffect(() => {
    const getGlobalTierlist = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tier-lists/mutualized/all`, {
        method: 'GET',
        credentials: 'include'
      })
      if (!response.ok) {
        throw new Error('Failed to fetch global tier list')
      }
      const data = await response.json()
      setGlobalTierlist(data)
    }
    getGlobalTierlist()
  }, [])

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

  return (
    <div className='flex flex-col gap-10'>
      <div className='w-full flex items-center justify-between'>
        <div className='flex flex-col gap-2'>
          <h1 className='text-2xl font-bold'>Tier liste globale</h1>
          <p className='text-sm text-gray-500'>
            Voici la tier liste globale de tous les utilisateurs.
          </p>
        </div>
        <Button variant="outline" onClick={handleExportPDF}>
          <Download className='w-4 h-4' />
          Exporter en PDF
        </Button>
      </div>
      <div className='w-full flex flex-col gap-4'>
        {globalTierlist.map((item) => (
          <Card key={item.companyName}>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Image src={getLogoUrl(item.companyName)} alt={item.companyName} width={40} height={40} />
                <span>{item.companyName}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className='flex gap-2'>
                <li className={`flex flex-col items-center flex-1 rounded-lg py-4 text-xl font-bold ${getColor('S')}`}>S <span className='text-sm text-white'>({item.voteDistribution.S})</span></li>
                <li className={`flex flex-col items-center flex-1 rounded-lg py-4 text-xl font-bold ${getColor('A')}`}>A <span className='text-sm text-white'>({item.voteDistribution.A})</span></li>
                <li className={`flex flex-col items-center flex-1 rounded-lg py-4 text-xl font-bold ${getColor('B')}`}>B <span className='text-sm text-white'>({item.voteDistribution.B})</span></li>
                <li className={`flex flex-col items-center flex-1 rounded-lg py-4 text-xl font-bold ${getColor('C')}`}>C <span className='text-sm text-white'>({item.voteDistribution.C})</span></li>
                <li className={`flex flex-col items-center flex-1 rounded-lg py-4 text-xl font-bold ${getColor('D')}`}>D <span className='text-sm text-white'>({item.voteDistribution.D})</span></li>
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
