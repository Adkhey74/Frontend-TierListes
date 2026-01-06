import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import Image from 'next/image'
import { getLogoUrl } from '@/lib/utils'
import { Company } from '@/types/company'

interface ItemProps {
  company: Company
}

export default function Item({ company }: ItemProps) {  
  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: company.id,
  });
  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <div 
      className='size-20 bg-accent rounded-lg overflow-hidden'
      ref={setNodeRef} 
      style={style} 
      {...listeners} 
      {...attributes}
    >
      <Image src={getLogoUrl(company.name)} alt={company.name} width={100} height={100} />
    </div>
  )
}

