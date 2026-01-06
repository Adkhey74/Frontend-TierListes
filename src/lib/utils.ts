import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getLogoUrl(companyName: string) {
  const token = process.env.NEXT_PUBLIC_LOGO_DEV_TOKEN
  return `https://img.logo.dev/name/${companyName}?token=${token}`
}
