'use client'

import React from 'react'
import { Card, CardTitle } from '../ui/card'
import { Button } from '../ui/button';
import { EditIcon, TrashIcon } from 'lucide-react';
import { deleteTierlist } from '@/actions/tierlist';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import EditTierlistDialog from './EditTierlistDialog';

interface MyTierListItemProps {
  id: string;
  title: string;
}

export default function MyTierListItem({ id, title }: MyTierListItemProps) {
  const router = useRouter()

  const handleDelete = async () => {
    try {
      await deleteTierlist(id)
      toast.success('Tier liste supprimée avec succès')
      router.refresh()
    } catch (error) {
      toast.error('Erreur lors de la suppression de la tier liste')
    }
  }

  return (
    <Card className='flex flex-row items-center justify-between p-4'>
      <CardTitle>{title}</CardTitle>
      <div className='flex gap-2'>
        <EditTierlistDialog id={id} title={title} />
        <Button variant="outline" onClick={handleDelete}>
          <TrashIcon className='text-red-500' />
        </Button>
      </div>
    </Card>
  )
}
