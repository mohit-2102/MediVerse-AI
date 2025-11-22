import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { createServerClient } from "@supabase/ssr"

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get("code")

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          request.cookies.set(name, value, options)
        },
      },
    }
  )

  // 🔥 THIS IS THE MISSING PART
  if (code) {
    await supabase.auth.exchangeCodeForSession(code)
  }

  // Now session should exist
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.redirect(new URL("/sign-in", request.url))
  }

  // Check profile existence
  const { data: profile } = await supabase
    .from("profiles")
    .select("created_at")
    .eq("id", user.id)
    .maybeSingle()

  return NextResponse.redirect(
    new URL(profile ? "/dashboard" : "/onboarding", request.url)
  )
}


// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'
// import { createServerClient } from '@supabase/ssr'

// export async function GET(request: NextRequest) {
//   const supabase = createServerClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
//     {
//       cookies: {
//         get(name: string) {
//           return request.cookies.get(name)?.value
//         },
//       },
//     }
//   )

//   // ✅ Get the authenticated user
//   const { data: { user }, error } = await supabase.auth.getUser()

//   if (error || !user) {
//     console.error('Auth callback error:', error)
//     return NextResponse.redirect(new URL('/sign-in', request.url))
//   }

//   // ✅ Check if this user already has a profile record in your database
//   // Replace "profiles" with your actual user table name if different
//   const { data: existingProfile, error: profileError } = await supabase
//     .from('profiles')
//     .select('id')
//     .eq('id', user.id)
//     .maybeSingle()

//   if (profileError) {
//     console.error('Profile check failed:', profileError)
//     // fallback: always redirect to dashboard if uncertain
//     return NextResponse.redirect(new URL('/dashboard', request.url))
//   }

//   let redirectTo = '/dashboard'

//   // ✅ If no profile found, user is new → go to onboarding
//   if (!existingProfile) {
//     redirectTo = '/onboarding'
//   }

//   return NextResponse.redirect(new URL(redirectTo, request.url))
// }
