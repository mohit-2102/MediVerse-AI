'use client'

import { createContext, useContext, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { SupabaseClient } from '@supabase/supabase-js'

// Create a React context for Supabase
type SupabaseContextType = {
  supabase: SupabaseClient
}

const SupabaseContext = createContext<SupabaseContextType | undefined>(undefined)

// Main provider component
export default function SupabaseProvider({ children }: { children: React.ReactNode }) {
  // Create a single client instance for the entire app
  const [supabase] = useState(() => createClient())

  return (
    <SupabaseContext.Provider value={{ supabase }}>
      {children}
    </SupabaseContext.Provider>
  )
}

// Optional hook for easy usage
export function useSupabase() {
  const context = useContext(SupabaseContext)
  if (!context) {
    throw new Error('useSupabase must be used inside SupabaseProvider')
  }
  return context.supabase
}
