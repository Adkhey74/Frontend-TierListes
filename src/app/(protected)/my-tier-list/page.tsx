import MyTierListItem from '@/components/myTierList/MyTierListItem'
import { Tierlist } from '@/types/tierlist'
import { cookies } from 'next/headers'
import React from 'react'

export default async function page() {
  const cookiesStore = await cookies()
  const accessToken = cookiesStore.get('accessToken')?.value

  const getMyTierLists = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tier-lists/my`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })

    if (!response.ok) {
      throw new Error('Failed to fetch my tier lists')
    }

    const data = await response.json()
    return data
  }

  const myTierLists = await getMyTierLists()

  return (
    <div className='flex flex-col gap-4'>
      <ul className='flex flex-col gap-2'>
        {myTierLists.map((tierList: Tierlist) => (
          <li key={tierList.id}><MyTierListItem title={tierList.title} id={tierList.id} /></li>
        ))}
      </ul>
    </div>
  )
}
