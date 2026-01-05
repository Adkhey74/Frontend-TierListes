import MyTierListItem from '@/components/myTierList/MyTierListItem'
import React from 'react'

export default function page() {
  return (
    <div className='flex flex-col gap-4'>
      <ul className='flex flex-col gap-2'>
        <li><MyTierListItem /></li>
        <li><MyTierListItem /></li>
        <li><MyTierListItem /></li>
        <li><MyTierListItem /></li>
        <li><MyTierListItem /></li>
        <li><MyTierListItem /></li>
        <li><MyTierListItem /></li>
      </ul>
    </div>
  )
}
