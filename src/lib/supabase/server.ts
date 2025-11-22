import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

export async function createServerSupabaseClient() {
  const cookieStore = await cookies() // MUST await

  const client = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value ?? ""
        },
        set(name: string, value: string, options) {
          cookieStore.set({ name, value, ...options })
        },
        remove(name: string, options) {
          cookieStore.set({ name, value: "", ...options })
        }
      }
    }
  )

  return client
}


// // src/lib/supabase/server.ts
// import { createServerClient } from '@supabase/ssr'
// import { cookies } from 'next/headers'

// export function createServerSupabaseClient() {
//   const cookieStore = cookies()   // <-- not async, not awaited
// console.log("cookies() typeof =", typeof cookies());

//   return createServerClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
//     {
//       cookies: {
//         get(name: string) {
//           return cookieStore.get(name)?.value
//         },
//         set(name: string, value: string, options) {
//           cookieStore.set(name, value, options)
//         },
//         remove(name: string, options) {
//           cookieStore.set(name, '', options)
//         }
//       }
//     }
//   )
// }

