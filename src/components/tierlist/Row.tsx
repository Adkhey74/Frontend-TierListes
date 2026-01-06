import React from 'react'

interface RowProps {
  item: {
    rank: string;
    color: string;
  }
}

export default function Row({ item }: RowProps) {
  return (
    <div className='w-full flex gap-2 border-b border-gray-200 bg-accent'>
      <div className={`flex items-center justify-center text-black text-lg font-bold size-20 ${item.color}`}>{item.rank}</div>
      <div className='flex-1'>
      </div>
    </div>
  )
}
