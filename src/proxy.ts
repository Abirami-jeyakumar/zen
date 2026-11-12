import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Protect admin routes (except login)
        if (req.nextUrl.pathname.startsWith('/admin/login')) {
          return true
        }
        if (req.nextUrl.pathname.startsWith('/admin')) {
          return !!token
        }
        if (req.nextUrl.pathname.startsWith('/api/admin')) {
          return !!token
        }
        return true
      },
    },
  }
)

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
}

