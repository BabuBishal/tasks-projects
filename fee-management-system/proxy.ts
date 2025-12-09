import createMiddleware from 'next-intl/middleware'
import { NextRequestWithAuth, withAuth } from 'next-auth/middleware'
import { routing } from './i18n/routing'
import { NextRequest, NextResponse } from 'next/server'

const intlMiddleware = createMiddleware(routing)
const authPages = ['/login', '/register']
const protectedPages = ['/dashboard', '/students', '/payments', '/profile', '/settings', '/reports']

export default withAuth(
  function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl
    const locale = pathname.split('/')[1] || 'en'

    // Remove locale prefix
    let normalizedPath = pathname.replace(`/${locale}`, '')

    // Ensure leading slash
    if (!normalizedPath.startsWith('/')) {
      normalizedPath = '/' + normalizedPath
    }

    // Remove trailing slash for consistent comparison
    if (normalizedPath !== '/' && normalizedPath.endsWith('/')) {
      normalizedPath = normalizedPath.slice(0, -1)
    }

    const isAuthPage = authPages.includes(normalizedPath)
    const isProtectedPage = protectedPages.some(page => normalizedPath.startsWith(page))
    const isLoggedIn = !!(req as NextRequestWithAuth).nextauth?.token

    // Redirect logged-in users away from auth pages
    if (isLoggedIn && isAuthPage) {
      return NextResponse.redirect(new URL(`/${locale}/dashboard`, req.url))
    }

    // Redirect non-logged-in users away from protected pages
    if (!isLoggedIn && isProtectedPage) {
      return NextResponse.redirect(new URL(`/${locale}/login`, req.url))
    }

    return intlMiddleware(req)
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token || true,
    },
  }
)

export const config = {
  matcher: [
    /*
     * Match all request paths except static files and APIs
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|_next).*)',
  ],
}
