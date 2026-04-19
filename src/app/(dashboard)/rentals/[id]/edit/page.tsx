import { getClients } from '@/app/(dashboard)/clients/actions'
import { getOffices } from '@/app/(dashboard)/offices/actions'
import { getRental } from '../../actions'
import RentalForm from '../../_components/RentalForm'
import { notFound } from 'next/navigation'

export const metadata = {
  title: 'Editar Alquiler | Nordic Co-Work Manager',
}

interface PageProps {
  params: { id: string }
}

export default async function EditRentalPage({ params }: PageProps) {
  const { id } = await params
  
  const [rental, clients, offices] = await Promise.all([
    getRental(id),
    getClients(),
    getOffices()
  ])

  if (!rental) {
    notFound()
  }

  return (
    <div className="p-4 md:p-10 max-w-7xl mx-auto space-y-6 md:space-y-8">
      <div>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-2">Editar Contrato de Alquiler</h2>
        <p className="text-sm md:text-base text-nordic-on-bg/60">Actualiza los horarios, precios o el estado del contrato actual.</p>
      </div>

      <RentalForm 
        clients={clients} 
        offices={offices} 
        initialData={rental} 
        isEditing={true} 
      />
    </div>
  )
}
