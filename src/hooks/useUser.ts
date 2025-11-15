'use client'
import { useUser as useSupabaseUser } from '@supabase/auth-helpers-react'

export function useUser() {
  const user = useSupabaseUser()
  return user
}
