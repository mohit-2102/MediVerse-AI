/**
 * =============================
 * MediVerse Onboarding Types
 * =============================
 * A single-page health profile setup form
 * (no multi-step structure, just grouped logically)
 */

// src/types/onboarding.ts

export interface OnboardingFormData {
  full_name: string
  age: string
  gender: string
  phone_number: string
  email: string
  address: string
  blood_group: string
  weight: string
  height: string
  allergies: string
  chronic_conditions: string
  medications: string
  smoking_status: string
  alcohol_consumption: string
  activity_level: string
  emergency_contact_name: string
  emergency_contact_relation: string
  emergency_contact_phone: string
  emergency_contact_email: string
}


/**
 * Response type from backend after saving profile
 */
export interface OnboardingResponse {
  success: boolean
  message: string
}

/**
 * API request payload structure for saving onboarding
 * (same shape as OnboardingFormData but type-safe)
 */
export type OnboardingRequest = Partial<OnboardingFormData>
