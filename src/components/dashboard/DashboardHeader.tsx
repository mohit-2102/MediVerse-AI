'use client'

import { useEffect, useState } from 'react'
import { createBrowserSupabaseClient } from '@/lib/supabase/client'
import { Bell, Search } from 'lucide-react'

export default function DashboardHeader() {
  const supabase = createBrowserSupabaseClient()
  const [userName, setUserName] = useState<string>('')

  useEffect(() => {
    async function getUser() {
      const { data } = await supabase.auth.getUser()
      if (data?.user?.user_metadata?.full_name) {
        setUserName(data.user.user_metadata.full_name)
      } else {
        setUserName(data?.user?.email || 'User')
      }
    }
    getUser()
  }, [supabase])

  return (
    <header className="flex justify-between items-center w-full px-8 py-5 shadow-xs bg-transparent">
      <div>
        <h1 className="text-lg font-semibold text-gray-800">
          Hi, {userName || 'there'} 👋
        </h1>
        <p className="text-sm text-gray-500">
          Welcome back to MediVerse AI
        </p>
      </div>
      <div className="flex items-center gap-3">
        <button className="p-2 rounded-2xl border shadow-md  hover:bg-gray-100">
          <Search className="w-5 h-5 text-gray-600" />
        </button>
        <button className="p-2 rounded-2xl border shadow-md  hover:bg-gray-100">
          <Bell className="w-5 h-5 text-gray-600" />
        </button>
      </div>
    </header>
  )
}
