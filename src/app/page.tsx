'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { createBrowserSupabaseClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'
import { SparklesIcon, UserIcon } from '@heroicons/react/24/solid'
import FeatureCard from '@/components/FeatureCard'

export default function Onboarding(): JSX.Element {
  const router = useRouter()
   const supabase = createBrowserSupabaseClient()
  const [checkingSession, setCheckingSession] = useState(false)

  // ✅ Function to handle route intelligently
  async function handleRoute() {
    setCheckingSession(true)
    try {
      const { data } = await supabase.auth.getSession()

      if (data.session) {
        // User is logged in → go to dashboard
        router.push('/dashboard')
      } else {
        // No session → go to sign-in
        router.push('/sign-in')
      }
    } catch (err) {
      console.error('Error checking session:', err)
      router.push('/sign-in')
    } finally {
      setCheckingSession(false)
    }
  }


  return (
    <main className="min-h-screen flex flex-col bg-[linear-gradient(135deg,#EFF6FF_0%,#F5F3FF_35%,#DBEAFE_70%)] text-gray-800 overflow-hidden">
      {/* ===== HEADER ===== */}
      <header className="flex flex-col items-center justify-center text-center mt-8 mb-10">
        <div className="flex flex-col items-center gap-1 mb-1">
          <div className="rounded-xl">
            <Image
              src="/images/header.svg"
              alt="MediVerse AI logo"
              width={70}
              height={70}
              priority
            />
          </div>
          <h1 className="text-xl font-semibold text-[#1A1F36]">
            MediVerse AI
          </h1>
        </div>
        <p className="text-sm text-gray-500">Bridging Medicine via Vision</p>
      </header>

      {/* ===== MAIN GRID ===== */}
      <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-3 items-center px-6 md:px-16">
        {/* LEFT TEXT SECTION */}
        <div className="flex flex-col justify-center space-y-5">
          <h2
            className="text-[32px] md:text-[32px] font-semibold text-gray-900 leading-[40px] tracking-normal"
          >
            Your intelligent health companion for diagnosis, tracking, and doctor{' '}
            <br className="hidden md:block" />
            recommendations.
          </h2>

          <p
            className="text-gray-700 text-[16px] md:text-[15px] leading-[28px] md:leading-[25px] max-w-md"
          >
            Experience the future of healthcare with AI-powered insights, personalized recommendations,
            and seamless medical support at your fingertips.
          </p>

          {/* ===== FEATURE CARDS ===== */}
          <div className="flex flex-wrap gap-3 mt-2">
            <FeatureCard
              image="/images/doc-logo.png"
              title="AI Diagnosis"
              desc="Smart symptom analysis"
            />
            <FeatureCard
              image="/images/stet-img.png"
              title="Health Tracking"
              desc="Monitor your progress"
            />
            <FeatureCard
              image="/images/graph.png"
              title="Expert Connect"
              desc="Find the right doctor"
            />
          </div>
        </div>

        {/* ===== RIGHT IMAGE SECTION ===== */}
        <div className="relative flex justify-center items-center">
          <div className="relative w-[380px] h-[380px] md:w-[400px] md:h-[400px] flex justify-center items-center">
            {/* Brain Image */}
            <Image
              src="/images/brain.png"
              alt="AI Brain"
              width={400}
              height={400}
              className="object-contain drop-shadow-[0_10px_40px_rgba(79,195,247,0.3)]"
              priority
            />

            {/* Top-right badge */}
            <div className="absolute" style={{ top: '-19px', right: '8px' }}>
              <div className="relative">
                <div className="absolute inset-0 bg-[#7b61ff]/40 blur-xl rounded-full animate-pulse-slow"></div>
                <Image
                  src="/images/badge-glow.svg"
                  alt="Glow badge"
                  width={95}
                  height={95}
                  className="relative z-10"
                  priority
                />
              </div>
            </div>

            {/* Bottom-left badge */}
            <div className="absolute" style={{ bottom: '20px', left: '25px' }}>
              <div className="relative">
                <div className="absolute inset-0 bg-[#6E5BFF]/40 blur-xl rounded-full animate-pulse-slow"></div>
                <Image
                  src="/images/bottom.png"
                  alt="User badge"
                  width={75}
                  height={75}
                  className="relative rounded-2xl z-10 drop-shadow-[0_2px_8px_rgba(110,91,255,0.4)]"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== BUTTON SECTION ===== */}
      <div className="flex flex-col items-center justify-center gap-2 mt-8 mb-8">
        <button
          onClick={handleRoute}
          disabled={checkingSession}
          className="w-60 py-2.5 bg-gradient-to-r from-[#6E5BFF] to-[#4FC3F7] text-white font-medium rounded-xl shadow-md hover:opacity-90 transition text-[15px] cursor-pointer"
        >
          {checkingSession ? 'Checking...' : 'Get Started'}
        </button>

        <button
          onClick={handleRoute}
          disabled={checkingSession}
          className="w-60 py-2.5 border border-gray-400 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition flex items-center justify-center gap-2 text-[15px] cursor-pointer"
        >
          <UserIcon className="h-5 w-5 text-gray-500" />
          {checkingSession ? 'Checking...' : 'Sign In'}
        </button>

        <p className="text-xs text-gray-500 mt-2">
          Made with ⚡ ❤️ by <span className="text-[#6E5BFF] font-medium">BMVV</span>
        </p>
      </div>
    </main>
  )
}
