'use client'

import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from './ui/dialog'
import { Button } from './ui/button'
import { DialogTitle } from '@radix-ui/react-dialog'
import { Input } from './ui/input'
import Image from 'next/image'
import { addCompany } from '@/actions/company'
import { toast } from 'sonner'

export default function AddCompanyDialog() {
  const [logoUrl, setLogoUrl] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState<string>("")

  const getLogoUrl = (companyName: string) => {
    const token = process.env.NEXT_PUBLIC_LOGO_DEV_TOKEN
    return `https://img.logo.dev/name/${companyName}?token=${token}&format=png&size=200`
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchTerm(value)
    const logoUrl = getLogoUrl(value)
    setLogoUrl(logoUrl)
  }

  const handleAddCompany = async () => {
    try {
      await addCompany(searchTerm)
      setLogoUrl(null)
      setSearchTerm("")
      toast.success('Entreprise ajoutée avec succès')
    } catch (error) {
      console.error(error)
      const message = error instanceof Error ? error.message : 'Une erreur est survenue'
      toast.error(message)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Ajouter une entreprise</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ajouter une entreprise</DialogTitle>
        </DialogHeader>
        <Input type="text" placeholder="Nom de l'entreprise" onChange={handleSearchChange} value={searchTerm}/>
        {logoUrl && searchTerm && <Image src={logoUrl} alt="Logo de l'entreprise" width={100} height={100}/>}
        <Button onClick={handleAddCompany} disabled={!logoUrl}>Ajouter</Button>
      </DialogContent>
    </Dialog>
  )
}
