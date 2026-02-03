import AddCompaniesSection from "@/components/AddCompaniesSection";
import Tierlist from "@/components/tierlist/Tierlist";
import { cookies } from "next/headers";

export default async function Home() {
  const cookiesStore = await cookies()
  const accessToken = cookiesStore.get('accessToken')?.value

  const getCompanies = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/logos`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })
    if (!response.ok) {
      throw new Error('Failed to fetch companies')
    }
    const data = await response.json()
    return data
  }

  const companies = await getCompanies()

  return (
    <div className="flex flex-col gap-8 pb-4">
      {companies.length < 10 && (
        <AddCompaniesSection availableCompanies={companies} />
      )}
      <Tierlist availableCompanies={companies} />
    </div>
  );
}
