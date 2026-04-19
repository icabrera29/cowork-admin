import { getRentals } from './actions'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import { Plus, Calendar, Clock, User, Building, Filter } from 'lucide-react'
import Link from 'next/link'
import RentalActions from './_components/RentalActions'
import RentalSearch from './_components/RentalSearch'

export const metadata = {
  title: 'Alquileres | Nordic Co-Work Manager',
}

interface PageProps {
  searchParams: Promise<{ q?: string }>
}

export default async function RentalsPage({ searchParams }: PageProps) {
  const { q } = await searchParams
  const rentals = await getRentals(q)

  return (
    <div className="p-4 md:p-10 max-w-7xl mx-auto space-y-6 md:space-y-8">
      <header className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 transition-all duration-500 ease-in-out">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-2">Gestión de Alquileres</h2>
          <p className="text-sm md:text-base text-nordic-on-bg/60">Monitorea y administra los contratos de oficinas activos.</p>
        </div>
        <Link href="/rentals/create" className="w-full md:w-auto">
          <Button className="w-full">
            <Plus size={18} className="mr-2" />
            Nuevo Alquiler
          </Button>
        </Link>
      </header>

      <Card variant="low" className="overflow-hidden p-0 border border-nordic-outline-variant/10 shadow-2xl backdrop-blur-md">
        <div className="p-4 bg-nordic-surface-highest/30 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 border-b border-nordic-outline-variant/10">
          <RentalSearch />
          <div className="flex gap-2">
            <Button variant="secondary" size="sm" className="flex-1 md:flex-none justify-center">
              <Filter size={14} className="mr-2" />
              Filtros
            </Button>
          </div>
        </div>

        {rentals.length === 0 ? (
          <div className="p-20 text-center space-y-4">
            <div className="bg-white/5 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white/20">
              <Calendar size={32} />
            </div>
            <h3 className="text-xl font-medium text-white">No hay alquileres registrados</h3>
            <p className="text-white/40 max-w-sm mx-auto">Comienza creando el primer contrato de alquiler para un cliente.</p>
          </div>
        ) : (
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left min-w-[1000px]">
              <thead>
                <tr className="text-[10px] uppercase tracking-widest text-nordic-on-bg/40 border-b border-nordic-outline-variant/10">
                  <th className="px-6 py-4 font-bold">Cliente / Oficina</th>
                  <th className="px-6 py-4 font-bold">Horario y Días</th>
                  <th className="px-6 py-4 font-bold">Vigencia</th>
                  <th className="px-6 py-4 font-bold">Seña</th>
                  <th className="px-6 py-4 font-bold text-left">Total</th>
                  <th className="px-6 py-4 font-bold">Estado</th>
                  <th className="px-6 py-4 font-bold text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-nordic-outline-variant/5">
                {rentals.map((rental: any) => (
                  <tr key={rental.id} className="group hover:bg-nordic-surface-highest/20 transition-colors">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:bg-blue-500/20 transition-colors">
                          <User size={20} />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">
                             {rental.clients?.first_name} {rental.clients?.last_name}
                          </span>
                          <span className="text-xs text-nordic-on-bg/40 flex items-center gap-1">
                            <Building size={12} />
                            {rental.offices?.name || 'Oficina'}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex flex-col gap-2">
                        <div className="text-sm text-white/80 flex items-center gap-2">
                          <Clock size={14} className="text-nordic-primary/60" />
                          {rental.start_time.substring(0, 5)} - {rental.end_time.substring(0, 5)}
                          <span className="text-[10px] bg-white/5 px-1.5 py-0.5 rounded text-white/40">{rental.block_hours}h</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {rental.days_of_week.map((day: string) => (
                            <span key={day} className="px-2 py-0.5 rounded-md bg-white/5 border border-white/5 text-[9px] text-white/60 uppercase font-medium">
                              {day.substring(0, 3)}
                            </span>
                          ))}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex flex-col">
                        <span className="text-xs text-white/80">{new Date(rental.start_date).toLocaleDateString()}</span>
                        <span className="text-[10px] text-nordic-on-bg/40">al {new Date(rental.end_date).toLocaleDateString()}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className="text-sm font-bold text-emerald-400">${rental.advancement}</span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex flex-col">
                        <span className="text-base font-black text-white">${rental.final_price_to_charge}</span>
                        <span className="text-[10px] text-emerald-400/60 uppercase font-bold tracking-tighter">{rental.payment_frequency}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider ${
                        rental.status === 'Activo' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'
                      }`}>
                        {rental.status}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <RentalActions 
                        rental={{
                          id: rental.id,
                          client_name: `${rental.clients?.first_name} ${rental.clients?.last_name}`,
                          office_name: rental.offices?.name || 'Oficina'
                        }} 
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  )
}
