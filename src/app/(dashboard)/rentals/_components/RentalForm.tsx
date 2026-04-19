'use client'

import { useState, useEffect, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import Button from '@/components/ui/Button'
import Modal from '@/components/ui/Modal'
import { Calendar, Clock, Users, Building, DollarSign, Percent, ArrowRight, Check, X, AlertTriangle } from 'lucide-react'
import { createRental, updateRental } from '../actions'

interface Office {
  id: string
  name: string
  price_per_hour: number
}

interface Client {
  id: string
  name?: string
  first_name?: string
  last_name?: string
  company?: string
}

interface RentalFormProps {
  offices: Office[]
  clients: Client[]
  initialData?: any
  isEditing?: boolean
}

const DAYS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']
const BLOCKS = [4, 6, 8]

export default function RentalForm({ offices, clients, initialData, isEditing = false }: RentalFormProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const [showErrorModal, setShowErrorModal] = useState(false)

  // Form State
  const [selectedClientId, setSelectedClientId] = useState(initialData?.client_id || '')
  const [selectedOfficeId, setSelectedOfficeId] = useState(initialData?.office_id || '')
  const [blockHours, setBlockHours] = useState(initialData?.block_hours || 4)
  const [startTime, setStartTime] = useState(initialData?.start_time?.substring(0, 5) || '09:00')
  const [selectedDays, setSelectedDays] = useState<string[]>(initialData?.days_of_week || [])
  const [startDate, setStartDate] = useState(initialData?.start_date || '')
  const [endDate, setEndDate] = useState(initialData?.end_date || '')
  const [discount, setDiscount] = useState(initialData?.discount_applied || 0)
  const [advancement, setAdvancement] = useState(initialData?.advancement || 0)
  const [status, setStatus] = useState(initialData?.status || 'Activo')

  // Derived State (Calculations)
  const [summary, setSummary] = useState({
    hoursPerCycle: 0,
    basePrice: 0,
    finalPrice: 0,
    officePrice: 0
  })

  // Auto-calculate end_time
  const calculateEndTime = (start: string, block: number) => {
    const [hours, minutes] = start.split(':').map(Number)
    const endHours = (hours + block) % 24
    return `${endHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
  }

  const endTime = calculateEndTime(startTime, blockHours)

  useEffect(() => {
    const office = offices.find(o => o.id === selectedOfficeId)
    if (!office || !startDate || !endDate || selectedDays.length === 0) {
      setSummary({ hoursPerCycle: 0, basePrice: 0, finalPrice: 0, officePrice: office?.price_per_hour || 0 })
      return
    }

    const start = new Date(startDate + 'T00:00:00')
    const end = new Date(endDate + 'T00:00:00')
    
    if (start > end) {
      setSummary({ hoursPerCycle: 0, basePrice: 0, finalPrice: 0, officePrice: office.price_per_hour })
      return
    }

    const dayMap: Record<string, number> = {
      'Domingo': 0, 'Lunes': 1, 'Martes': 2, 'Miércoles': 3, 'Jueves': 4, 'Viernes': 5, 'Sábado': 6
    }
    const selectedDayIndices = selectedDays.map(d => dayMap[d])
    
    let occurrences = 0
    let current = new Date(start)
    while (current <= end) {
      if (selectedDayIndices.includes(current.getDay())) {
        occurrences++
      }
      current.setDate(current.getDate() + 1)
    }

    const officePrice = office.price_per_hour
    const totalHours = blockHours * occurrences
    const basePrice = Math.round(totalHours * officePrice)
    const finalPrice = Math.max(0, basePrice - discount)

    setSummary({
      hoursPerCycle: totalHours,
      basePrice,
      finalPrice,
      officePrice
    })
  }, [selectedOfficeId, blockHours, selectedDays, startDate, endDate, discount, offices])

  // Scroll to top on error
  useEffect(() => {
    if (error) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [error])

  const toggleDay = (day: string) => {
    setSelectedDays(prev => 
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!selectedClientId || !selectedOfficeId || selectedDays.length === 0 || !startDate || !endDate) {
      setError("Por favor completa todos los campos requeridos.")
      return
    }

    const formData = new FormData()
    formData.append('client_id', selectedClientId)
    formData.append('office_id', selectedOfficeId)
    formData.append('block_hours', blockHours.toString())
    formData.append('start_time', startTime)
    formData.append('end_time', endTime)
    selectedDays.forEach(day => formData.append('days_of_week', day))
    formData.append('start_date', startDate)
    formData.append('end_date', endDate)
    formData.append('payment_frequency', 'pago_unico')
    formData.append('base_price_to_charge', summary.basePrice.toString())
    formData.append('discount_applied', discount.toString())
    formData.append('final_price_to_charge', summary.finalPrice.toString())
    formData.append('advancement', advancement.toString())
    formData.append('status', status)

    startTransition(async () => {
      const action = isEditing ? updateRental.bind(null, initialData.id) : createRental
      const result = await action(formData)
      
      if (result?.error) {
        setError(result.error)
        if (result.error.includes('Conflicto detectado')) {
          setShowErrorModal(true)
        }
      } else {
        router.push('/rentals')
        router.refresh()
      }
    })
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-8">
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300">
            <AlertTriangle size={18} />
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}
        
        {/* Sección: Cliente y Oficina */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-white/60 mb-2">
              <Users size={18} />
              <h3 className="text-sm font-medium uppercase tracking-wider">Asignación</h3>
            </div>
            {isEditing && (
              <div className="flex items-center gap-2">
                <label className="text-xs text-white/40 uppercase tracking-widest font-bold">Estado</label>
                <select 
                  value={status}
                  onChange={e => setStatus(e.target.value)}
                  className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider outline-none cursor-pointer transition-colors ${
                    status === 'Activo' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'
                  }`}
                >
                  <option value="Activo" className="bg-zinc-900">Activo</option>
                  <option value="Inactivo" className="bg-zinc-900">Inactivo</option>
                </select>
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm text-white/40">Cliente</label>
              <select 
                value={selectedClientId} 
                onChange={e => setSelectedClientId(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 appearance-none"
              >
                <option value="" className="bg-zinc-900">Seleccionar cliente...</option>
                {clients.map(c => (
                  <option key={c.id} value={c.id} className="bg-zinc-900">
                    {c.first_name} {c.last_name} {c.company ? `(${c.company})` : ''}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-white/40">Oficina</label>
              <select 
                value={selectedOfficeId} 
                onChange={e => setSelectedOfficeId(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 appearance-none"
              >
                <option value="" className="bg-zinc-900">Seleccionar oficina...</option>
                {offices.map(o => (
                  <option key={o.id} value={o.id} className="bg-zinc-900">
                    {o.name} - ${o.price_per_hour}/hr
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Sección: Tiempo y Recurrencia */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 space-y-6">
          <div className="flex items-center gap-2 text-white/60 mb-2">
            <Clock size={18} />
            <h3 className="text-sm font-medium uppercase tracking-wider">Horario y Recurrencia</h3>
          </div>

          <div className="space-y-4">
            <label className="text-sm text-white/40">Bloque de horas</label>
            <div className="flex gap-4">
              {BLOCKS.map(b => (
                <button
                  key={b}
                  type="button"
                  onClick={() => setBlockHours(b)}
                  className={`flex-1 py-3 rounded-xl border transition-all ${
                    blockHours === b 
                      ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/20' 
                      : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10'
                  }`}
                >
                  {b} horas
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm text-white/40">Hora Inicio</label>
              <input 
                type="time" 
                value={startTime}
                onChange={e => setStartTime(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-white/40">Hora Fin (Auto)</label>
              <input 
                type="time" 
                value={endTime}
                disabled
                className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-white/40 cursor-not-allowed"
              />
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-sm text-white/40">Días de la semana</label>
            <div className="flex flex-wrap gap-2">
              {DAYS.map(day => (
                <button
                  key={day}
                  type="button"
                  onClick={() => toggleDay(day)}
                  className={`px-4 py-2 rounded-full border text-xs font-medium transition-all ${
                    selectedDays.includes(day)
                      ? 'bg-emerald-600 border-emerald-500 text-white'
                      : 'bg-white/5 border-white/10 text-white/40 hover:bg-white/10'
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm text-white/40">Inicio Contrato</label>
              <input 
                type="date" 
                value={startDate}
                onChange={e => setStartDate(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-white/40">Fin Contrato</label>
              <input 
                type="date" 
                value={endDate}
                onChange={e => setEndDate(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Sección: Facturación */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 space-y-6">
          <div className="flex items-center gap-2 text-white/60 mb-2">
            <DollarSign size={18} />
            <h3 className="text-sm font-medium uppercase tracking-wider">Facturación</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm text-white/40">Descuento ($)</label>
              <input 
                type="number" 
                value={discount}
                onChange={e => setDiscount(Number(e.target.value))}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-white/40">Seña / Adelanto ($)</label>
              <input 
                type="number" 
                value={advancement}
                onChange={e => setAdvancement(Number(e.target.value))}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none"
              />
            </div>
          </div>
        </div>

      </form>

      {/* Modal de Error/Conflicto */}
      <Modal 
        isOpen={showErrorModal} 
        onClose={() => setShowErrorModal(false)} 
        title="Conflicto de Disponibilidad"
      >
        <div className="space-y-4">
          <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center text-red-500">
            <AlertTriangle size={24} />
          </div>
          <p className="text-white/80 text-sm leading-relaxed">
            No se puede confirmar el alquiler debido a un solapamiento con otra reserva existente.
          </p>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <p className="text-xs text-red-400 font-mono">
              {error}
            </p>
          </div>
          <Button 
            onClick={() => setShowErrorModal(false)}
            className="w-full bg-white/10 text-white hover:bg-white/20 rounded-xl py-3"
          >
            Entendido, corregir horario
          </Button>
        </div>
      </Modal>

      {/* Sidebar: Resumen y Guardar */}
      <div className="lg:col-span-1">
        <div className="sticky top-8 bg-zinc-900/50 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-6 text-white">
            <h3 className="text-lg font-semibold mb-1">Resumen del Alquiler</h3>
            <p className="text-white/70 text-xs">Cálculo estimado basado en selección</p>
          </div>
          
          <div className="p-6 space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-white/40">Horas totales del contrato</span>
                <span className="text-white font-medium">{summary.hoursPerCycle} hrs</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-white/40">Precio oficina (hr)</span>
                <span className="text-white font-medium">${summary.officePrice}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-white/40">Subtotal base</span>
                <span className="text-white font-medium">${summary.basePrice}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-white/40 font-semibold text-emerald-400">Total con descuento</span>
                <span className="text-white font-bold text-lg">${summary.finalPrice}</span>
              </div>
            </div>

            <div className="h-px bg-white/5" />

            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-white/40">Seña a pagar hoy</span>
                <span className="text-emerald-400 font-bold text-xl">${advancement}</span>
              </div>
              <p className="text-[10px] text-white/30 italic">
                * El saldo restante de ${summary.finalPrice - advancement} deberá ser abonado según lo acordado.
              </p>
            </div>

            <Button 
              onClick={handleSubmit} 
              isLoading={isPending}
              className="w-full bg-white text-black hover:bg-white/90 rounded-2xl py-6 font-bold text-lg group"
            >
              {isEditing ? 'Guardar Cambios' : 'Confirmar Alquiler'}
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
            </Button>

            <div className="flex items-center justify-center gap-2 text-white/20 text-[10px] uppercase tracking-tighter">
              <Check size={12} />
              Validación de disponibilidad activa
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
