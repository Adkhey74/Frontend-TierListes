'use client'

import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { EditIcon } from 'lucide-react'
import { Button } from '../ui/button'
import Tierlist from '../tierlist/Tierlist';
import { Tierlist as TierlistType } from '@/types/tierlist';
import { Company } from '@/types/company'

interface EditTierlistDialogProps {
  id: string;
  title: string;
}

export default function EditTierlistDialog({ id, title }: EditTierlistDialogProps) {
  const [tierlist, setTierlist] = useState<TierlistType | null>(null)
  const [availableCompanies, setAvailableCompanies] = useState<Company[]>([])
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (open) {
      const getTierlist = async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tier-lists/${id}`, {
          method: 'GET',
          credentials: 'include'
        })
        if (!response.ok) {
          throw new Error('Failed to fetch tierlist')
        }
        const data = await response.json()
        console.log(data)
        setTierlist(data)
      }
      getTierlist()
    }
  }, [open, id])

  useEffect(() => {
    const getCompanies = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/logos`, {
        method: 'GET',
        credentials: 'include'
      })
      if (!response.ok) {
        throw new Error('Failed to fetch companies')
      }
      const data = await response.json()
      setAvailableCompanies(data)
    }
    getCompanies()
  }, [])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <EditIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className='!max-w-6xl'>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {tierlist && (
          <Tierlist availableCompanies={availableCompanies} existingTierlist={tierlist} />
        )}
      </DialogContent>
    </Dialog>
  )
}
