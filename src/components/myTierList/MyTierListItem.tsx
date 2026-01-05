import React from 'react'
import { Card, CardTitle } from '../ui/card'
import { Button } from '../ui/button';
import { EditIcon, TrashIcon } from 'lucide-react';

interface MyTierListItemProps {
  name: string;
  description: string;
  image: string;
}

export default function MyTierListItem() {
  return (
    <Card className='flex flex-row items-center justify-between p-4'>
      <CardTitle>Nom de la tier liste</CardTitle>
      <div className='flex gap-2'>
        <Button variant="outline">
          <EditIcon />
        </Button>
        <Button variant="outline">
          <TrashIcon className='text-red-500' />
        </Button>
      </div>
    </Card>
  )
}
