'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useProfileStore } from '@/store/profileStore'
import {
  ChevronDown,
  ChevronLeft,
  Save,
  SkipForward,
  Stethoscope,
  Pill,
  HeartPulse,
  Activity,
  User,
  Phone,
  Home,
  Mail,
  Weight,
  Ruler,
  AlertTriangle,
  ShieldCheck,
  Brain,
  Contact,
} from 'lucide-react'
import { FaArrowRight } from 'react-icons/fa'
import { createBrowserSupabaseClient } from '@/lib/supabase/client'
import { useOnboardingStore } from '@/store/onboardingStore'
import { onboardingService } from '@/services/onboardingService'
import type { OnboardingFormData } from '@/types/onboarding'

export default function OnboardingPage(): JSX.Element {
  const router = useRouter()
  const supabase = createBrowserSupabaseClient()
  const updateField = useOnboardingStore((s) => s.updateField)
  const reset = useOnboardingStore((s) => s.reset)

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  // ✅ Check Supabase session
  useEffect(() => {
    async function checkSession() {
      const { data } = await supabase.auth.getSession()
      if (!data.session) router.push('/sign-in')
    }
    checkSession()
  }, [router, supabase])

  // Options
  const genderOptions = ['Male', 'Female', 'Other', 'Prefer not to say']
  const bloodGroupOptions = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
  const smokingOptions = ['Non-Smoker', 'Occasional', 'Regular']
  const frequencyOptions = ['Daily', 'Weekly', 'Monthly', 'Never']
  const activityOptions = ['Sedentary', 'Light', 'Moderate', 'Active']

  const INPUT_CLASS =
    'w-full p-3 border border-gray-200 rounded-xl focus:border-[#6E5BFF] focus:ring-[#6E5BFF] text-gray-700 placeholder-gray-400 text-sm shadow-sm bg-white/80 backdrop-blur-sm'
  const LABEL_CLASS =
    'text-sm font-medium text-gray-600 mb-1 flex items-center space-x-2'

  // ✅ Reusable Input
  const InputField = ({
    label,
    placeholder,
    field,
    type = 'text',
    icon: Icon,
    color = '#6E5BFF',
  }: {
    label: string
    placeholder: string
    field: keyof OnboardingFormData
    type?: string
    icon?: any
    color?: string
  }) => {
    const value = useOnboardingStore((s) => s.formData[field]) // ✅ read only this field
    const updateField = useOnboardingStore((s) => s.updateField)

    return (
      <div>
        <label className={LABEL_CLASS}>
          {Icon && <Icon size={16} color={color} />}
          <span>{label}</span>
        </label>
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => updateField(field, e.target.value)}
          className={INPUT_CLASS}
        />
      </div>
    )
  }

  // ✅ Reusable Select
  const SelectField = ({
    label,
    options,
    field,
    icon: Icon,
    color = '#6E5BFF',
  }: {
    label: string
    options: string[]
    field: keyof OnboardingFormData
    icon?: any
    color?: string
  }) => {
    const value = useOnboardingStore((s) => s.formData[field])
    const updateField = useOnboardingStore((s) => s.updateField)

    return (
      <div>
        <label className={LABEL_CLASS}>
          {Icon && <Icon size={16} color={color} />}
          <span>{label}</span>
        </label>
        <div className="relative">
          <select
            value={value}
            onChange={(e) => updateField(field, e.target.value)}
            className={`${INPUT_CLASS} appearance-none pr-10 bg-white cursor-pointer`}
          >
            <option value="">Select {label.toLowerCase()}</option>
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <ChevronDown
            size={16}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
          />
        </div>
      </div>
    )
  }


  // ✅ Reusable Textarea
  const TextareaField = ({
    label,
    placeholder,
    field,
    icon: Icon,
    color = '#6E5BFF',
  }: {
    label: string
    placeholder: string
    field: keyof OnboardingFormData
    icon?: any
    color?: string
  }) => {
    const value = useOnboardingStore((s) => s.formData[field])
    const updateField = useOnboardingStore((s) => s.updateField)

    return (
      <div className="mb-4">
        <label className={LABEL_CLASS}>
          {Icon && <Icon size={16} color={color} />}
          <span>{label}</span>
        </label>
        <textarea
          placeholder={placeholder}
          rows={3}
          value={value}
          onChange={(e) => updateField(field, e.target.value)}
          className={`${INPUT_CLASS} resize-none`}
        />
      </div>
    )
  }


  // ✅ Handle Submit
  async function handleSubmit(e: React.FormEvent) {
  e.preventDefault()
  setLoading(true)
  setMessage(null)

  try {
    const formData = useOnboardingStore.getState().formData
    console.log('Form Data:', formData)


    const res = await onboardingService.submitHealthProfile(formData)

    if (res.success) {
      // Clear onboarding fields
      useOnboardingStore.getState().reset()

      // Fetch fresh full profile from backend
      const freshProfile = await onboardingService.getProfile()

      // Save profile globally
      useProfileStore.getState().setProfile(freshProfile)

      setMessage('Profile saved successfully!')

      router.push('/dashboard')
    } else {
      setMessage(res.message || 'Something went wrong.')
    }
  } catch (err: any) {
    console.error('❌ Submission error:', err.message)
    setMessage('Failed to save profile. Please try again.')
  } finally {
    setLoading(false)
  }
}


  const MotionMain = motion.main

  return (
    <MotionMain
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col justify-start items-center px-6 md:px-16 py-10 bg-gradient-to-br from-[#EFF6FF] via-[#F5F3FF] to-[#DBEAFE]"
    >
      {/* ===== NAVBAR (Sticky Top) ===== */}
      <nav className="w-full fixed top-0 left-0 z-50 bg-gradient-to-br from-[#EFF6FF] via-[#F5F3FF] to-[#DBEAFE] backdrop-blur-md border-b border-gray-200 py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between px-6 md:px-0">
          {/* Back Button */}
          <button
            onClick={() => router.push('/sign-in')}
            className="flex items-center text-sm font-medium text-gray-600 hover:text-[#6E5BFF] transition"
          >
            <ChevronLeft size={18} className="mr-1" />
            Back
          </button>

          {/* Center Title */}
          <div className="flex flex-col items-center text-center">
            <h1 className="text-md font-semibold text-[#1A1F36]">MediVerse AI</h1>
            <p className="text-xs text-gray-400 -mt-1">Health Profiling</p>
          </div>

          {/* Spacer (for alignment) */}
          <div className="text-sm font-medium text-gray-500 w-[40px]"></div>
        </div>
      </nav>

      {/* ===== STEP INDICATOR + PROGRESS BAR ===== */}
      <div className="max-w-4xl w-full mx-auto mt-10 mb-6 flex flex-col items-center">
        {/* Step text */}
        <p className="text-sm font-medium text-gray-600 mb-1 self-start ml-6 md:ml-28">
          Step 2 of 2
        </p>

        {/* Progress bar */}
        <div className="w-3/4 h-2 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 1 }}
            className="h-2 bg-gradient-to-r from-[#6E5BFF] to-[#4FC3F7]"
          />
        </div>
      </div>

      {/* ===== HEADER ===== */}
      <div className="flex flex-col items-center gap-4 mb-8 text-center">
        <Image
          src="/images/onboarding.png"
          alt="MediVerse Icon"
          width={75}
          height={75}
          className="rounded-xl"
        />
        <h2 className="text-2xl font-semibold text-[#1A1F36]">
          MediVerse AI - Health Profiling
        </h2>
        <p className="text-sm text-gray-500 max-w-md">
          Your information helps MediVerse AI personalize your healthcare experience
          and provide better recommendations.
        </p>
      </div>


      {/* ===== FORM CARD ===== */}
      <div className="w-full max-w-3xl mx-auto bg-gray-200 backdrop-blur-lg shadow-xl rounded-3xl p-8 border border-gray-100">
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* --- 1. Basic Details --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <InputField label="Full Name" field="full_name" placeholder="Enter your full name" icon={User} />
            <InputField label="Age" field="age" placeholder="Your age" type="number" icon={HeartPulse} color="#EF4444" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <SelectField label="Gender" field="gender" options={genderOptions} icon={Stethoscope} color="#14B8A6" />
            <InputField label="Phone Number" field="phone_number" placeholder="+1 (555) 000-0000" icon={Phone} color="#F59E0B" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <InputField label="Address" field="address" placeholder="Your complete address" icon={Home} />
            <InputField label="Email Address" field="email" placeholder="you@email.com" type="email" icon={Mail} />
          </div>

          <div className="border-t border-gray-100 pt-4" />

          {/* --- 2. Health Info --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <SelectField label="Blood Group" field="blood_group" options={bloodGroupOptions} icon={HeartPulse} color="#EF4444" />
            <div className="grid grid-cols-2 gap-4">
              <InputField label="Weight (kg)" field="weight" placeholder="70" type="number" icon={Weight} color="#10B981" />
              <InputField label="Height (cm)" field="height" placeholder="170" type="number" icon={Ruler} color="#2563EB" />
            </div>
          </div>

          <TextareaField label="Allergies" field="allergies" placeholder="List known allergies" icon={AlertTriangle} color="#F97316" />
          <TextareaField label="Chronic Conditions" field="chronic_conditions" placeholder="Ongoing health conditions" icon={Brain} color="#F43F5E" />
          <TextareaField label="Current Medications" field="medications" placeholder="List current medications" icon={Pill} color="#3B82F6" />

          <div className="border-t border-gray-100 pt-4" />

          {/* --- 3. Lifestyle --- */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <SelectField label="Smoking Status" field="smoking_status" options={smokingOptions} icon={ShieldCheck} color="#10B981" />
            <SelectField label="Alcohol Consumption" field="alcohol_consumption" options={frequencyOptions} icon={Activity} color="#EAB308" />
            <SelectField label="Activity Level" field="activity_level" options={activityOptions} icon={HeartPulse} color="#8B5CF6" />
          </div>

          <div className="border-t border-gray-100 pt-4" />

          {/* --- 4. Emergency Contact --- */}
          <div className="bg-orange-50 border border-orange-200 rounded-2xl p-5 shadow-inner">
            <h3 className="text-md font-semibold text-orange-500 mb-4 flex items-center gap-2">
              <Contact size={18} color="#F97316" />
              Emergency Contact Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <InputField label="Contact Name" field="emergency_contact_name" placeholder="Full name" icon={User} color="#F97316" />
              <InputField label="Relationship" field="emergency_contact_relation" placeholder="Spouse, Parent, etc." icon={HeartPulse} color="#EF4444" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <InputField label="Phone Number" field="emergency_contact_phone" placeholder="+1 (555) 000-0990" icon={Phone} color="#F59E0B" />
              <InputField label="Email (Optional)" field="emergency_contact_email" placeholder="email@example.com" type="email" icon={Mail} color="#0EA5E9" />
            </div>
          </div>

          {/* --- ACTION BUTTONS --- */}
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 pt-6">
            <button
              type="submit"
              disabled={loading}
              className={`
    flex items-center justify-center
    w-full sm:w-[415px] h-[48px]
    text-lg  rounded-[16px]
    cursor-pointer
    text-white border border-[#E5E7EB]
    bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6]
    shadow-[0_10px_15px_0_rgba(0,0,0,0.1),0_4px_6px_0_rgba(0,0,0,0.1)]
    transition-transform transform hover:scale-[1.03]
    ${loading ? 'opacity-60 cursor-not-allowed' : ''}
  `}
            >
              {loading ? (
                'Saving...'
              ) : (
                <>
                  <FaArrowRight className="mr-2 h-5 w-5 text-white" />
                  Save & Continue
                </>
              )}
            </button>


            <button
              type="button"
              onClick={() => router.push('/dashboard')}
              className={`
    flex items-center justify-center
    w-full sm:w-[417px] h-[48px]
    text-lg 
    cursor-pointer
    rounded-[16px] border border-[#D1D5DB]
    text-gray-700 bg-[#FFFFFFB2]
    shadow-[0_4px_6px_0_rgba(0,0,0,0.1)]
    transition-all hover:bg-[#F9FAFB]
  `}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" className="mr-2" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_1_186)">
                  <path d="M8 0C10.1217 0 12.1566 0.842855 13.6569 2.34315C15.1571 3.84344 16 5.87827 16 8C16 10.1217 15.1571 12.1566 13.6569 13.6569C12.1566 15.1571 10.1217 16 8 16C5.87827 16 3.84344 15.1571 2.34315 13.6569C0.842855 12.1566 0 10.1217 0 8C0 5.87827 0.842855 3.84344 2.34315 2.34315C3.84344 0.842855 5.87827 0 8 0ZM7.25 3.75V8C7.25 8.25 7.375 8.48438 7.58437 8.625L10.5844 10.625C10.9281 10.8562 11.3938 10.7625 11.625 10.4156C11.8562 10.0687 11.7625 9.60625 11.4156 9.375L8.75 7.6V3.75C8.75 3.33437 8.41562 3 8 3C7.58437 3 7.25 3.33437 7.25 3.75Z" fill="#374151" />
                </g>
                <defs>
                  <clipPath id="clip0_1_186">
                    <path d="M0 0H16V16H0V0Z" fill="white" />
                  </clipPath>
                </defs>
              </svg>

              Skip for Now
            </button>

          </div>

          {message && (
            <p className="text-sm text-center mt-3 text-gray-700">{message}</p>
          )}

          <p className="text-xs text-center text-gray-500 pt-4">
            Your privacy is important to us. All information is encrypted and secure.
            <a href="#" className="text-[#6E5BFF] hover:underline ml-1">
              DMCA Compliant
            </a>
          </p>
        </form>
      </div>
    </MotionMain>
  )
}


