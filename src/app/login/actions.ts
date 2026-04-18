'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  // Dynamic Signup restriction check
  if (process.env.DISABLE_SIGNUP === 'true') {
    return { error: 'El registro de nuevas cuentas está deshabilitado.' }
  }

  const email = formData.get('email') as string
  const password = formData.get('password') as string
  // For the MVP, we can assume a simplified signup that also takes first/last name
  const firstName = formData.get('firstName') as string
  const lastName = formData.get('lastName') as string

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name: firstName,
        last_name: lastName,
      },
      // For testing, we might want to disable email confirmation in Supabase dashboard 
      // or tell the user to check their email.
    },
  })

  if (error) {
    return { error: error.message }
  }

  return { success: '¡Registro exitoso! Por favor, verifica tu correo o intenta iniciar sesión.' }
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/login')
}
