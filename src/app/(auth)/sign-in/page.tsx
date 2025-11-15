'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { createClient } from '@/lib/supabase/client'
import LoginForm from '@/components/LoginForm'
import { useState } from 'react'
import { toast } from 'sonner'

export default function AuthPage() {
  const router = useRouter()
  const supabase = createClient()
  const [loading, setLoading] = useState(false)

  // Handles both login and signup actions
  async function handleAuth(action: 'signin' | 'signup', email: string, password: string) {
    setLoading(true)
    try {
      if (action === 'signin') {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error

        toast.success('✅ Login successful! Redirecting to dashboard...')
        await new Promise((r) => setTimeout(r, 400))
        router.push('/dashboard')
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          },
        })
        if (error) throw error

        if (data?.user) {
          toast.success('🎉 Account created! Redirecting to onboarding...')
          await new Promise((r) => setTimeout(r, 400))
          router.push('/onboarding')
        } else {
          toast.info('📧 Please check your email to confirm your account.')
        }
      }
    } catch (err: any) {
      toast.error(`❌ ${err.message || 'Something went wrong.'}`)
    } finally {
      setLoading(false)
    }
  }

  // Google OAuth
  async function handleGoogleAuth() {
    try {
      toast('🔄 Redirecting to Google login...')
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })
      if (error) throw error
    } catch (err: any) {
      toast.error(`❌ Google login failed: ${err.message}`)
    }
  }

  return (
    <main className="min-h-screen flex justify-center items-center px-6 md:px-16 bg-gradient-to-br from-[#EFF6FF] via-[#F5F3FF] to-[#DBEAFE]">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 items-center gap-10 rounded-3xl p-10 md:p-12">
        
        {/* ==== LEFT AUTH SECTION ==== */}
        <div className="flex flex-col space-y-6 w-full">
          {/* Progress Bar */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600 font-medium">Step 1 of 2</p>
              <p className="text-sm text-gray-500">Login</p>
            </div>
            <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                layout
                className="h-1 rounded-full transition-all duration-500 bg-[#2563EB] w-2/4"
              />
            </div>
          </div>

          {/* Heading */}
          <div className="mt-4 flex flex-col items-center">
            <div className="flex flex-col items-center gap-2 mb-2">
              <Image
                src="/images/login-img2.png"
                alt="MediVerse logo"
                width={45}
                height={45}
                className="object-contain rounded-xl"
              />
              <h1 className="text-[24px] font-semibold text-[#1A1F36]">Welcome to MediVerse AI</h1>
            </div>
            <p className="text-gray-500 text-center text-sm max-w-sm">
              Your AI-powered health companion for smarter healthcare decisions.
            </p>
          </div>

          {/* Unified Login/Signup Form */}
          <div className="mt-2 flex justify-center items-center min-h-[380px] w-full">
            <LoginForm onAuth={handleAuth} onGoogleAuth={handleGoogleAuth} />
          </div>

          {/* Optional loading indicator */}
          {loading && (
            <p className="text-center text-sm text-gray-500 mt-2">Processing...</p>
          )}
        </div>

        {/* ==== RIGHT IMAGE SECTION ==== */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden md:flex justify-center items-center relative"
        >
          <div className="relative w-[500px] h-[500px] flex justify-center items-center">
            <Image
              src="/images/login-img.png"
              alt="AI Doctor illustration"
              width={500}
              height={500}
              className="object-contain rounded-full"
              priority
            />
          </div>
        </motion.div>
      </div>
    </main>
  )
}


