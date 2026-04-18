'use server'

import { createClient as createSupabaseClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { checkRole } from '@/utils/supabase/auth-helpers'

export async function getClients() {
  const { authorized } = await checkRole(['admin', 'employee']);
  if (!authorized) return [];

  const supabase = await createSupabaseClient()
  
  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .order('last_name', { ascending: true })

  if (error) {
    console.error('Error fetching clients:', error)
    return []
  }

  return data
}

export async function deleteClient(id: string) {
  const { authorized } = await checkRole(['admin', 'employee']);
  if (!authorized) throw new Error("Unauthorized");

  const supabase = await createSupabaseClient()

  const { error } = await supabase
    .from('clients')
    .delete()
    .eq('id', id)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/clients')
}

export async function createClient(formData: FormData) {
  const { authorized } = await checkRole(['admin', 'employee']);
  if (!authorized) return { error: "No autorizado para realizar esta acción" };

  const supabase = await createSupabaseClient()
  
  const firstName = formData.get('first_name') as string
  const lastName = formData.get('last_name') as string
  const email = formData.get('email') as string
  const phone = formData.get('phone') as string
  const company = formData.get('company') as string
  const plan = formData.get('plan') as string

  const { error } = await supabase
    .from('clients')
    .insert([{
      first_name: firstName,
      last_name: lastName,
      email,
      phone,
      company,
      plan,
      status: 'Activo'
    }])

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/clients')
  redirect('/clients')
}

export async function getClientById(id: string) {
  const { authorized } = await checkRole(['admin', 'employee']);
  if (!authorized) return null;

  const supabase = await createSupabaseClient()
  
  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching client:', error)
    return null
  }

  return data
}

export async function updateClient(id: string, formData: FormData) {
  const { authorized } = await checkRole(['admin', 'employee']);
  if (!authorized) return { error: "No autorizado para realizar esta acción" };

  const supabase = await createSupabaseClient()
  
  const firstName = formData.get('first_name') as string
  const lastName = formData.get('last_name') as string
  const email = formData.get('email') as string
  const phone = formData.get('phone') as string
  const company = formData.get('company') as string
  const plan = formData.get('plan') as string
  const status = formData.get('status') as string

  const { error } = await supabase
    .from('clients')
    .update({
      first_name: firstName,
      last_name: lastName,
      email,
      phone,
      company,
      plan,
      status
    })
    .eq('id', id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/clients')
  redirect('/clients')
}
