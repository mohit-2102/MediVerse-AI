'use client'

import { create } from 'zustand'

export interface Profile {
  id: string
  full_name: string
  email: string
  patient_id?: string
  onboarding_completed?: boolean

  age?: string
  gender?: string
  phone_number?: string
  address?: string
  blood_group?: string
  weight?: string
  height?: string
  allergies?: string
  chronic_conditions?: string
  medications?: string
  smoking_status?: string
  alcohol_consumption?: string
  activity_level?: string
  emergency_contact_name?: string
  emergency_contact_relation?: string
  emergency_contact_phone?: string
  emergency_contact_email?: string
}

interface ProfileState {
  profile: Profile | null
  setProfile: (profile: Profile) => void
  clearProfile: () => void
}

export const useProfileStore = create<ProfileState>((set) => ({
  profile: null,
  setProfile: (profile) => set({ profile }),
  clearProfile: () => set({ profile: null }),
}))
