import { getClients } from '@/app/(dashboard)/clients/actions'
import { getOffices } from '@/app/(dashboard)/offices/actions'
import RentalForm from '../_components/RentalForm'

export const metadata = {
  title: 'Nuevo Alquiler | Nordic Co-Work Manager',
}

export default async function CreateRentalPage() {
  const [clients, offices] = await Promise.all([
    getClients(),
    getOffices()
  ])

  return (
    <div className="p-4 md:p-10 max-w-7xl mx-auto space-y-6 md:space-y-8">
      <div>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-2">Nuevo Contrato de Alquiler</h2>
        <p className="text-sm md:text-base text-nordic-on-bg/60">Configura los parámetros, horarios y facturación del nuevo cliente.</p>
      </div>

      <RentalForm clients={clients} offices={offices} />
    </div>
  )
}
