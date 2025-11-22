'use client'

import { useEffect } from 'react'
import { onboardingService } from '@/services/onboardingService'
import { useProfileStore } from '@/store/profileStore'

export default function ProfileBootstrap() {
  const setProfile = useProfileStore((s) => s.setProfile)

  useEffect(() => {
    async function loadProfile() {
      try {
        const profile = await onboardingService.getProfile()
        setProfile(profile)
      } catch (e) {
        console.log("No profile loaded")
      }
    }
    loadProfile()
  }, [setProfile])

  return null
}
