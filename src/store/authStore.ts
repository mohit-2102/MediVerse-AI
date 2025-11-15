'use client'

import { create } from 'zustand'
import { createClient } from '@/lib/supabase/client'

interface AuthUser {
  id: string
  email: string
  full_name?: string
  avatar_url?: string
}

interface AuthState {
  user: AuthUser | null
  loading: boolean
  fetchUser: () => Promise<void>
  logout: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,

  // Fetch the Supabase user session
  fetchUser: async () => {
    const supabase = createClient()
    const { data, error } = await supabase.auth.getUser()
    if (error) {
      console.error('❌ Failed to fetch user:', error.message)
      set({ user: null, loading: false })
      return
    }

    const raw = data?.user
    set({
      user: raw
        ? {
            id: raw.id,
            email: raw.email ?? '',
            full_name: raw.user_metadata?.full_name ?? '',
            avatar_url: raw.user_metadata?.avatar_url ?? '',
          }
        : null,
      loading: false,
    })
  },

  // Logout and clear session
  logout: async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    set({ user: null })
  },
}))
