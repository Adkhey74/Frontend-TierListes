import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import AddCompanyDialog from './AddCompanyDialog'
import { Company } from '@/types/company'

export default function AddCompaniesSection({ availableCompanies }: { availableCompanies: Company[] }) {
  const remainingCompanies = 10 - availableCompanies.length
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ajouter une entreprise</CardTitle>
        <CardDescription>Il vous reste {remainingCompanies} entreprises à ajouter</CardDescription>
      </CardHeader>
      <CardContent>
        <AddCompanyDialog />
      </CardContent>
    </Card>
  )
}
