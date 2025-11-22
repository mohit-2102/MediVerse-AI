import { type NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

export async function middleware(request: NextRequest) {
  return await updateSession(request)
}

export const config = {

  matcher: [
    /*
    * Match all request paths except for the ones starting with:
    * - _next/static (static files)
    * _next/image (image optimization files)
    * favicon.ico (favicon file)
    * Feel free to modify this pattern to include more paths.
    */

    '/((?!_next/static|_next/image|favicon.ico|auth/callback|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',

  ],
}


// import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'

// export async function middleware(req: NextRequest) {
//   const res = NextResponse.next()
//   const supabase = createMiddlewareClient({ req, res })
//   const { data: { session } } = await supabase.auth.getSession()

//   const protectedRoutes = ['/dashboard']

//   if (protectedRoutes.includes(req.nextUrl.pathname) && !session) {
//     return NextResponse.redirect(new URL('/sign-in', req.url))
//   }

//   return res
// }

// export const config = {
//   matcher: ['/dashboard/:path*', '/onboarding/:path*'],
// }
