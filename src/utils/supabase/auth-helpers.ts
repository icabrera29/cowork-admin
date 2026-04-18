import { createClient } from "./server";
import { redirect } from "next/navigation";
import { cache } from "react";

export type UserRole = 'admin' | 'employee' | 'client';

/**
 * Validates if the current user has the required roles.
 * If not, it redirects to the login or throws an error for Server Actions.
 * Wrapped in cache to avoid redundant fetches in the same request.
 */
export const requireRole = cache(async function(allowedRoles: UserRole[]) {
  const supabase = await createClient();
  
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  
  if (authError || !user) {
    redirect('/login');
  }

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profileError || !profile || !allowedRoles.includes(profile.role as UserRole)) {
    // If it's a server component, we could redirect to an "unauthorized" page.
    console.error(`Security alert: User ${user.email} attempted unauthorized access.`);
    throw new Error('No autorizado');
  }

  return { user, profile };
});

/**
 * Silent version for checks within Server Actions that might need to return specific error objects
 */
export async function checkRole(allowedRoles: UserRole[]) {
  try {
    const result = await requireRole(allowedRoles);
    return { authorized: true, ...result };
  } catch (error) {
    return { authorized: false, error: 'No autorizado' };
  }
}
