'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
// import { Checkbox } from '@/components/ui/checkbox'
import { FaGoogle, FaArrowRight, FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa'
import { createBrowserSupabaseClient } from '@/lib/supabase/client'
import { toast } from 'sonner'

interface LoginFormProps {
    onAuth: (action: 'signin' | 'signup', email: string, password: string) => Promise<void>
    onGoogleAuth: () => Promise<void>
}

export default function LoginForm({ onAuth, onGoogleAuth }: LoginFormProps) {
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const supabase = createBrowserSupabaseClient()

    // ✅ Forgot Password
    async function handleForgotPassword() {
        if (!email) {
            toast.warning('Please enter your email address first.')
            return
        }

        try {
            setLoading(true)
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/reset-password`,
            })
            if (error) throw error
            toast.success('Password reset email sent! Check your inbox 📧')
        } catch (err: any) {
            toast.error(`Failed to send reset email: ${err.message}`)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="w-full max-w-md space-y-6">
            <div className="rounded-2xl bg-white p-8 shadow-xl">
                <div className="space-y-6">
                    {/* Email Field */}
                    <div>
                        <label className="mb-2 flex items-center gap-2 text-sm font-medium text-blue-600">
                            <FaUser className="h-3 w-3" />
                            Email Address
                        </label>
                        <div className="relative">
                            <Input
                                type="email"
                                placeholder="Enter your email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="pl-10"
                                required
                            />
                            <FaUser className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        </div>
                    </div>

                    {/* Password Field */}
                    <div>
                        <label className="mb-2 flex items-center gap-2 text-sm font-medium text-blue-600">
                            <FaLock className="h-3 w-3" />
                            Password
                        </label>
                        <div className="relative">
                            <Input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="pl-10 pr-10"
                                required
                            />
                            <FaLock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {showPassword ? <FaEyeSlash className="h-4 w-4" /> : <FaEye className="h-4 w-4" />}
                            </button>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="space-y-3">
                        <Button
                            type="button"
                            disabled={loading}
                            onClick={() => onAuth('signin', email, password)}
                            className="w-full bg-blue-600 hover:bg-blue-700 h-11 text-base cursor-pointer"
                        >
                            {loading ? 'Please wait...' : 'Login'}
                            <FaArrowRight className="ml-2 h-4 w-4" />
                        </Button>

                        <Button
                            type="button"
                            disabled={loading}
                            onClick={() => onAuth('signup', email, password)}
                            className="w-full border border-blue-600 bg-white text-blue-600 hover:bg-blue-50 h-11 text-base cursor-pointer"
                        >
                            <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3 4C3 2.93913 3.42143 1.92172 4.17157 1.17157C4.92172 0.421427 5.93913 0 7 0C8.06087 0 9.07828 0.421427 9.82843 1.17157C10.5786 1.92172 11 2.93913 11 4C11 5.06087 10.5786 6.07828 9.82843 6.82843C9.07828 7.57857 8.06087 8 7 8C5.93913 8 4.92172 7.57857 4.17157 6.82843C3.42143 6.07828 3 5.06087 3 4ZM0 15.0719C0 11.9937 2.49375 9.5 5.57188 9.5H8.42813C11.5063 9.5 14 11.9937 14 15.0719C14 15.5844 13.5844 16 13.0719 16H0.928125C0.415625 16 0 15.5844 0 15.0719ZM15.75 9.75V7.75H13.75C13.3344 7.75 13 7.41563 13 7C13 6.58437 13.3344 6.25 13.75 6.25H15.75V4.25C15.75 3.83437 16.0844 3.5 16.5 3.5C16.9156 3.5 17.25 3.83437 17.25 4.25V6.25H19.25C19.6656 6.25 20 6.58437 20 7C20 7.41563 19.6656 7.75 19.25 7.75H17.25V9.75C17.25 10.1656 16.9156 10.5 16.5 10.5C16.0844 10.5 15.75 10.1656 15.75 9.75Z" fill="#3B82F6" />
                            </svg>
                            Sign Up
                        </Button>

                        {/* Divider */}
                        <div className="flex items-center gap-3 my-2">
                            <div className="flex-1 h-px bg-gray-300" />
                            <span className="text-sm text-gray-500 whitespace-nowrap">
                                Or continue with
                            </span>
                            <div className="flex-1 h-px bg-gray-300" />
                        </div>

                        {/* Google Auth */}
                        <Button
                            type="button"
                            onClick={onGoogleAuth}
                            variant="outline"
                            className="w-full h-11 text-base border-gray-300 cursor-pointer"
                        >
                            <FaGoogle className="mr-2 h-4 w-4 text-blue-600" />
                            Continue with Google
                        </Button>

                        {/* ✅ Forgot Password */}
                        <div className="text-center mt-3">
                            <button
                                type="button"
                                onClick={handleForgotPassword}
                                className="text-sm text-blue-600 hover:underline"
                            >
                                Forgot Password?
                            </button>
                        </div>
                    </div>
                    {/* Footer Links */}
                     <div className="space-y-2 text-center">
                         <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                             <a href="#" className="hover:underline">Terms of Service</a>
                             <span>•</span>
                             <a href="#" className="hover:underline">Privacy Policy</a>
                         </div>
                     </div>
                </div>
            </div>
        </div>
    )
}

