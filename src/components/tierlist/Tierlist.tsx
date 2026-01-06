'use client'

import React, { useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import Row from './Row'
import UnassignedZone from './UnassignedZone'
import { Company } from '@/types/company'
import { DndContext, DragEndEvent } from '@dnd-kit/core'

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

type RowAssignments = {
  [rowId: string]: string[]
}

export default function Tierlist({ availableCompanies }: TierlistProps) {
  const [rowAssignments, setRowAssignments] = useState<RowAssignments>({
    'S': [],
    'A': [],
    'B': [],
    'C': [],
    'D': [],
    'unassigned': availableCompanies.map(c => c.id)
  })

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    
    if (!over || active.id === over.id) return

    const companyId = active.id as string
    const targetRowId = over.id as string

    setRowAssignments(prev => {
      let sourceRowId: string | null = null
      for (const [rowId, companyIds] of Object.entries(prev)) {
        if (companyIds.includes(companyId)) {
          sourceRowId = rowId
          break
        }
      }

      if (!sourceRowId) return prev

      const newAssignments = { ...prev }
      
      newAssignments[sourceRowId] = prev[sourceRowId].filter(id => id !== companyId)
      
      if (!newAssignments[targetRowId]) {
        newAssignments[targetRowId] = []
      }
      newAssignments[targetRowId] = [...newAssignments[targetRowId], companyId]

      return newAssignments
    })
  }

  const getCompaniesForRow = (rowId: string): Company[] => {
    const companyIds = rowAssignments[rowId] || []
    return companyIds
      .map(id => availableCompanies.find(c => c.id === id))
      .filter((c): c is Company => c !== undefined)
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
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
        <li className='w-full'>
          <Row 
            item={{ rank: 'S', color: getColor('S') }} 
            companies={getCompaniesForRow('S')}
          />
        </li>
        <li className='w-full'>
          <Row 
            item={{ rank: 'A', color: getColor('A') }} 
            companies={getCompaniesForRow('A')}
          />
        </li>
        <li className='w-full'>
          <Row 
            item={{ rank: 'B', color: getColor('B') }} 
            companies={getCompaniesForRow('B')}
          />
        </li>
        <li className='w-full'>
          <Row 
            item={{ rank: 'C', color: getColor('C') }} 
            companies={getCompaniesForRow('C')}
          />
        </li>
        <li className='w-full'>
          <Row 
            item={{ rank: 'D', color: getColor('D') }} 
            companies={getCompaniesForRow('D')}
          />
        </li>
      </ul>
      <UnassignedZone getCompaniesForRow={getCompaniesForRow} />
    </div>
    </DndContext>
  )
}
