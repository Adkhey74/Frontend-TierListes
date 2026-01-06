import { useDroppable } from '@dnd-kit/core';
import React from 'react'
import { Company } from '@/types/company'
import Item from './Item'

interface RowProps {
  item: {
    rank: string;
    color: string;
  }
  companies: Company[]
}

export default function Row({ item, companies }: RowProps) {
  const {isOver, setNodeRef} = useDroppable({
    id: item.rank,
  });
  const style = {
    backgroundColor: isOver ? 'rgba(0, 0, 0, 0.1)' : undefined,
  };
  return (
    <div 
      className='w-full flex border-b border-gray-200 bg-accent'
    >
      <div className={`flex items-center justify-center text-black text-lg font-bold size-20 ${item.color}`}>{item.rank}</div>
      <div 
        className='flex-1 flex'
        ref={setNodeRef} 
        style={style}
      >
        {companies.map((company) => (
          <Item key={company.id} company={company} />
        ))}
      </div>
    </div>
  )
}
