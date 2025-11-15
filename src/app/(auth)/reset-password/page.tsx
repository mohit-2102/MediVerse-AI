'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { FaEyeSlash, FaEye } from 'react-icons/fa'

export default function ResetPasswordPage() {
  const supabase = createClient()
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showPassword2, setShowPassword2] = useState(false)

  useEffect(() => {
    const handleRecovery = async () => {
      const { data, error } = await supabase.auth.getSession()
      if (error) {
        toast.error('Invalid or expired link.')
        router.push('/sign-in')
      } else if (!data.session) {
        toast.info('Please log in again.')
        router.push('/sign-in')
      }
    }
    handleRecovery()
  }, [router, supabase])

  async function handleResetPassword() {
    if (password !== confirmPassword) {
      toast.warning('Passwords do not match!')
      return
    }

    try {
      setLoading(true)
      const { error } = await supabase.auth.updateUser({ password })
      if (error) throw error
      toast.success('Password updated successfully! 🎉')
      router.push('/sign-in')
    } catch (err: any) {
      toast.error(`Error: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#EFF6FF] via-[#F5F3FF] to-[#DBEAFE] px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md text-center">
        <h1 className="text-2xl font-semibold mb-4">Reset Your Password</h1>
        <p className="text-sm text-gray-500 mb-6">
          Enter your new password below to complete the reset process.
        </p>

        {/* New Password */}
        <div className="relative mb-3">
          <Input
            type={showPassword ? 'text' : 'password'}
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="pr-10" // 👈 adds space for the icon
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600"
          >
            {showPassword ? (
              <FaEyeSlash className="h-5 w-5" />
            ) : (
              <FaEye className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Confirm New Password */}
        <div className="relative mb-5">
          <Input
            type={showPassword2 ? 'text' : 'password'}
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword2(!showPassword2)}
            className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600"
          >
            {showPassword2 ? (
              <FaEyeSlash className="h-5 w-5" />
            ) : (
              <FaEye className="h-5 w-5" />
            )}
          </button>
        </div>

        <Button
          onClick={handleResetPassword}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700"
        >
          {loading ? 'Updating...' : 'Reset Password'}
        </Button>
      </div>
    </main>
  )
}
