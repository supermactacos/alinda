import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Check if the request is for the IDX wrapper page
  if (request.nextUrl.pathname.startsWith('/idx-wrapper/mls-search')) {
    // Get the current URL
    const url = request.nextUrl.clone()
    
    // Return response with headers
    return NextResponse.next({
      headers: {
        'Cache-Control': 'no-store',
        'Content-Type': 'text/html',
      },
    })
  }

  // For all other routes, continue as normal
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/idx-wrapper/mls-search',
    '/idx-wrapper/mls-search/:path*'
  ]
} 