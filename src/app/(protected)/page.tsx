import AddCompanyDialog from "@/components/AddCompanyDialog";
import Tierlist from "@/components/tierlist/Tierlist";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex flex-col gap-8 pb-4">
      <Card>
        <CardHeader>
          <CardTitle>Ajouter une entreprise</CardTitle>
          <CardDescription>Il vous reste 10 entreprises à ajouter</CardDescription>
        </CardHeader>
        <CardContent>
          <AddCompanyDialog />
        </CardContent>
      </Card>
      <Tierlist />
    </div>
  );
}
