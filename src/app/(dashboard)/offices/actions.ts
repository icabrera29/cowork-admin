'use server'

import { createClient as createSupabaseClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { checkRole } from '@/utils/supabase/auth-helpers'

export async function getOffices(query?: string) {
  const { authorized } = await checkRole(['admin', 'employee']);
  if (!authorized) return [];

  const supabase = await createSupabaseClient()
  
  let fetchQuery = supabase
    .from('offices')
    .select('*')
    .order('created_at', { ascending: false })

  if (query) {
    const searchTerm = `%${query}%`
    fetchQuery = fetchQuery.or(`name.ilike.${searchTerm},description.ilike.${searchTerm},type.ilike.${searchTerm},status.ilike.${searchTerm}`)
  }

  const { data, error } = await fetchQuery

  if (error) {
    console.error('Error fetching offices:', error)
    return []
  }

  return data
}

export async function getOfficeById(id: string) {
  const { authorized } = await checkRole(['admin', 'employee']);
  if (!authorized) return null;

  const supabase = await createSupabaseClient()
  
  const { data, error } = await supabase
    .from('offices')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching office:', error)
    return null
  }

  return data
}

export async function createOffice(formData: FormData) {
  const { authorized } = await checkRole(['admin', 'employee']);
  if (!authorized) return { error: "No autorizado para realizar esta acción" };

  const supabase = await createSupabaseClient()
  
  const name = formData.get('name') as string
  const description = formData.get('description') as string
  const pricePerHourStr = formData.get('price_per_hour') as string
  const pricePerHour = parseFloat(pricePerHourStr)
  const details = formData.get('details') as string
  const type = formData.get('type') as string
  const capacityStr = formData.get('capacity') as string
  const capacity = parseInt(capacityStr, 10)
  const status = formData.get('status') as string

  const { error } = await supabase
    .from('offices')
    .insert([{
      name,
      description,
      price_per_hour: isNaN(pricePerHour) ? 0 : pricePerHour,
      details,
      type,
      capacity: isNaN(capacity) ? 0 : capacity,
      status
    }])

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/offices')
  redirect('/offices')
}

export async function updateOffice(id: string, formData: FormData) {
  const { authorized } = await checkRole(['admin', 'employee']);
  if (!authorized) return { error: "No autorizado para realizar esta acción" };

  const supabase = await createSupabaseClient()
  
  const name = formData.get('name') as string
  const description = formData.get('description') as string
  const pricePerHourStr = formData.get('price_per_hour') as string
  const pricePerHour = parseFloat(pricePerHourStr)
  const details = formData.get('details') as string
  const type = formData.get('type') as string
  const capacityStr = formData.get('capacity') as string
  const capacity = parseInt(capacityStr, 10)
  const status = formData.get('status') as string

  const { error } = await supabase
    .from('offices')
    .update({
      name,
      description,
      price_per_hour: isNaN(pricePerHour) ? 0 : pricePerHour,
      details,
      type,
      capacity: isNaN(capacity) ? 0 : capacity,
      status
    })
    .eq('id', id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/offices')
  redirect('/offices')
}

export async function deleteOffice(id: string) {
  const { authorized } = await checkRole(['admin', 'employee']);
  if (!authorized) return { error: "No autorizado" };

  const supabase = await createSupabaseClient()

  const { error } = await supabase
    .from('offices')
    .delete()
    .eq('id', id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/offices')
  return { success: true }
}
