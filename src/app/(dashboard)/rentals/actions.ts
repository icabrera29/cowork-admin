'use server'

import { createClient as createSupabaseClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { checkRole } from '@/utils/supabase/auth-helpers'

export async function getRentals(query?: string) {
  const { authorized } = await checkRole(['admin', 'employee']);
  if (!authorized) return [];

  const supabase = await createSupabaseClient()
  
  const { data, error } = await supabase
    .from('rentals')
    .select(`
      *,
      clients (first_name, last_name, company),
      offices (name)
    `)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching rentals:', error)
    return []
  }

  if (query) {
    const s = query.toLowerCase()
    return data.filter((r: any) => {
      const clientName = `${r.clients?.first_name} ${r.clients?.last_name}`.toLowerCase()
      const company = (r.clients?.company || '').toLowerCase()
      const officeName = (r.offices?.name || '').toLowerCase()
      return clientName.includes(s) || company.includes(s) || officeName.includes(s)
    })
  }

  return data
}

export async function getRental(id: string) {
  const { authorized } = await checkRole(['admin', 'employee']);
  if (!authorized) return null;

  const supabase = await createSupabaseClient()
  
  const { data, error } = await supabase
    .from('rentals')
    .select(`
      *,
      clients (first_name, last_name, company),
      offices (name, price_per_hour)
    `)
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching rental:', error)
    return null
  }

  return data
}

export async function createRental(formData: FormData) {
  const { authorized } = await checkRole(['admin', 'employee']);
  if (!authorized) return { error: "No autorizado" };

  const supabase = await createSupabaseClient()
  
  const clientId = formData.get('client_id') as string
  const officeId = formData.get('office_id') as string
  const blockHours = parseInt(formData.get('block_hours') as string, 10)
  const startTime = formData.get('start_time') as string
  const endTime = formData.get('end_time') as string
  const daysOfWeek = formData.getAll('days_of_week') as string[]
  const startDate = formData.get('start_date') as string
  const endDate = formData.get('end_date') as string
  const paymentFrequency = formData.get('payment_frequency') as string
  const basePriceToCharge = parseFloat(formData.get('base_price_to_charge') as string)
  const discountApplied = parseFloat(formData.get('discount_applied') as string) || 0
  const finalPriceToCharge = parseFloat(formData.get('final_price_to_charge') as string)
  const advancement = parseFloat(formData.get('advancement') as string) || 0

  // VALIDACIÓN DE SOLAPAMIENTO
  // 1. Buscar alquileres activos para la misma oficina
  const { data: existingRentals, error: fetchError } = await supabase
    .from('rentals')
    .select('*')
    .eq('office_id', officeId)
    .neq('status', 'CANCELADO')

  if (fetchError) {
    return { error: "Error al validar disponibilidad: " + fetchError.message }
  }

  // 2. Verificar cruces uno por uno
  for (const existing of existingRentals) {
    // a. ¿Hay cruce de fechas (Contrato)?
    const contractOverlap = (startDate <= existing.end_date && endDate >= existing.start_date);
    
    if (contractOverlap) {
      // b. ¿Hay cruce de días de la semana?
      const dayOverlap = daysOfWeek.some(day => existing.days_of_week.includes(day));
      
      if (dayOverlap) {
        // c. ¿Hay cruce de horario? (Comparación de strings HH:mm:ss o HH:mm)
        // Normalizamos a HH:mm si es necesario para comparar
        const newStart = startTime.substring(0, 5);
        const newEnd = endTime.substring(0, 5);
        const exStart = existing.start_time.substring(0, 5);
        const exEnd = existing.end_time.substring(0, 5);

        const timeOverlap = (newStart < exEnd && newEnd > exStart);
        
        if (timeOverlap) {
          const conflictMsg = `Conflicto detectado: La oficina ya está reservada para otro cliente los días [${existing.days_of_week.join(', ')}] de ${exStart} a ${exEnd} entre el ${existing.start_date} y ${existing.end_date}.`;
          console.error(conflictMsg);
          return { error: conflictMsg };
        }
      }
    }
  }

  // Si no hay errores, insertar
  const { error: insertError } = await supabase
    .from('rentals')
    .insert([{
      client_id: clientId,
      office_id: officeId,
      block_hours: blockHours,
      start_time: startTime,
      end_time: endTime,
      days_of_week: daysOfWeek,
      start_date: startDate,
      end_date: endDate,
      payment_frequency: paymentFrequency,
      base_price_to_charge: basePriceToCharge,
      discount_applied: discountApplied,
      final_price_to_charge: finalPriceToCharge,
      advancement: advancement,
      status: formData.get('status') as string || 'PENDIENTE'
    }])

  if (insertError) {
    return { error: insertError.message }
  }

  revalidatePath('/rentals')
  return { success: true }
}

export async function updateRental(id: string, formData: FormData) {
  const { authorized } = await checkRole(['admin', 'employee']);
  if (!authorized) return { error: "No autorizado" };

  const supabase = await createSupabaseClient()
  
  const clientId = formData.get('client_id') as string
  const officeId = formData.get('office_id') as string
  const blockHours = parseInt(formData.get('block_hours') as string, 10)
  const startTime = formData.get('start_time') as string
  const endTime = formData.get('end_time') as string
  const daysOfWeek = formData.getAll('days_of_week') as string[]
  const startDate = formData.get('start_date') as string
  const endDate = formData.get('end_date') as string
  const paymentFrequency = formData.get('payment_frequency') as string
  const basePriceToCharge = parseFloat(formData.get('base_price_to_charge') as string)
  const discountApplied = parseFloat(formData.get('discount_applied') as string) || 0
  const finalPriceToCharge = parseFloat(formData.get('final_price_to_charge') as string)
  const advancement = parseFloat(formData.get('advancement') as string) || 0
  const status = formData.get('status') as string || 'PENDIENTE'

  // VALIDACIÓN DE SOLAPAMIENTO (Excluyendo el alquiler actual)
  const { data: existingRentals, error: fetchError } = await supabase
    .from('rentals')
    .select('*')
    .eq('office_id', officeId)
    .neq('status', 'CANCELADO')
    .neq('id', id) // CLAVE: Excluir el alquiler actual

  if (fetchError) {
    return { error: "Error al validar disponibilidad: " + fetchError.message }
  }

  for (const existing of existingRentals) {
    const contractOverlap = (startDate <= existing.end_date && endDate >= existing.start_date);
    if (contractOverlap) {
      const dayOverlap = daysOfWeek.some(day => existing.days_of_week.includes(day));
      if (dayOverlap) {
        const newStart = startTime.substring(0, 5);
        const newEnd = endTime.substring(0, 5);
        const exStart = existing.start_time.substring(0, 5);
        const exEnd = existing.end_time.substring(0, 5);

        const timeOverlap = (newStart < exEnd && newEnd > exStart);
        if (timeOverlap) {
          const conflictMsg = `Conflicto detectado: La oficina ya está reservada para otro cliente los días [${existing.days_of_week.join(', ')}] de ${exStart} a ${exEnd} entre el ${existing.start_date} y ${existing.end_date}.`;
          return { error: conflictMsg };
        }
      }
    }
  }

  const { error: updateError } = await supabase
    .from('rentals')
    .update({
      client_id: clientId,
      office_id: officeId,
      block_hours: blockHours,
      start_time: startTime,
      end_time: endTime,
      days_of_week: daysOfWeek,
      start_date: startDate,
      end_date: endDate,
      payment_frequency: paymentFrequency,
      base_price_to_charge: basePriceToCharge,
      discount_applied: discountApplied,
      final_price_to_charge: finalPriceToCharge,
      advancement: advancement,
      status: status
    })
    .eq('id', id)

  if (updateError) {
    return { error: updateError.message }
  }

  revalidatePath('/rentals')
  return { success: true }
}

export async function deleteRental(id: string) {
  const { authorized } = await checkRole(['admin', 'employee']);
  if (!authorized) return { error: "No autorizado" };

  const supabase = await createSupabaseClient()

  const { error } = await supabase
    .from('rentals')
    .delete()
    .eq('id', id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/rentals')
  return { success: true }
}
