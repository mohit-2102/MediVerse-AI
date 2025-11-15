'use client'

import { create } from 'zustand'
import { OnboardingFormData } from '@/types/onboarding'

const initialFormData: OnboardingFormData = {
  full_name: '',
  age: '',
  gender: '',
  phone_number: '',
  email: '',
  address: '',
  blood_group: '',
  weight: '',
  height: '',
  allergies: '',
  chronic_conditions: '',
  medications: '',
  smoking_status: '',
  alcohol_consumption: '',
  activity_level: '',
  emergency_contact_name: '',
  emergency_contact_relation: '',
  emergency_contact_phone: '',
  emergency_contact_email: '',
}

interface OnboardingState {
  formData: OnboardingFormData
  updateField: <K extends keyof OnboardingFormData>(
    field: K,
    value: OnboardingFormData[K]
  ) => void
  reset: () => void
}

export const useOnboardingStore = create<OnboardingState>((set) => ({
  formData: initialFormData,

  updateField: (field, value) =>
    set((state) => ({
      formData: { ...state.formData, [field]: value },
    })),

  reset: () => set({ formData: initialFormData }),
}))
