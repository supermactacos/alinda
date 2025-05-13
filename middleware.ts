import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Check if the request is for the IDX wrapper page
  if (request.nextUrl.pathname.startsWith('/idx-wrapper/mls-search')) {
    // Return the response with a 200 status code
    const response = NextResponse.next()
    response.headers.set('Cache-Control', 'no-store')
    return response
  }

  // For all other routes, continue as normal
  return NextResponse.next()
}

export const config = {
  matcher: '/idx-wrapper/mls-search/:path*',
} 