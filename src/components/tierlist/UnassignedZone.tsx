import { useDroppable } from '@dnd-kit/core';
import { Card } from '../ui/card'
import { Company } from '@/types/company'
import Item from './Item'

interface UnassignedZoneProps {
  getCompaniesForRow: (rowId: string) => Company[]
}

export default function UnassignedZone({ getCompaniesForRow }: UnassignedZoneProps) {
  const {isOver, setNodeRef} = useDroppable({
    id: 'unassigned',
  });
  const style = {
    backgroundColor: isOver ? 'rgba(0, 0, 0, 0.05)' : undefined,
  };

  const unassignedCompanies = getCompaniesForRow('unassigned')

  return (
    <Card 
      className='flex flex-row gap-2 flex-wrap p-2' 
      ref={setNodeRef}
      style={style}
    >
      {unassignedCompanies.length > 0 ? (
        unassignedCompanies.map((company) => (
          <Item key={company.id} company={company} />
        ))
      ) : (
        <div className='flex items-center justify-center text-center text-gray-500 w-full h-20'>Aucune entreprise disponible</div>
      )}
    </Card>
  )
}

