"use server"

import { Item } from "@/types/tierlist";
import { cookies } from "next/headers";

export const saveTierlist = async (name: string, items: Item[]) => {
  const cookiesStore = await cookies()
  const accessToken = cookiesStore.get('accessToken')?.value

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tier-lists`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
    body: JSON.stringify({ title: name, items: items }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data
}

export const editTierlist = async (tierlistId: string, name: string, items: Item[]) => {
  const cookiesStore = await cookies()
  const accessToken = cookiesStore.get('accessToken')?.value

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tier-lists/${tierlistId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
    body: JSON.stringify({ title: name, items: items }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data
}

export const deleteTierlist = async (tierlistId: string) => {
  const cookiesStore = await cookies()
  const accessToken = cookiesStore.get('accessToken')?.value

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tier-lists/${tierlistId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  })

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data
}