import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Normalize path by removing trailing slash except for the root path
  const normalizedPath = pathname === '/' 
    ? pathname 
    : pathname.endsWith('/') ? pathname.slice(0, -1) : pathname

  // Check if request is for the IDX wrapper
  if (normalizedPath === '/idx-wrapper/mls-search') {
    // Always return a 200 OK for any type of request to this exact path
    return new NextResponse('<!DOCTYPE html><html><head><title>IDX Wrapper Page</title></head><body><div id="idx-results-wrapper"></div></body></html>', {
      status: 200,
      headers: {
        'Content-Type': 'text/html',
        'Cache-Control': 'no-store',
      },
    })
  }
  
  // For sub-paths under mls-search (for the actual search UI)
  if (normalizedPath.startsWith('/idx-wrapper/mls-search/')) {
    const response = NextResponse.next()
    response.headers.set('Cache-Control', 'no-store')
    return response
  }

  // For all other routes, continue as normal
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/idx-wrapper/mls-search',
    '/idx-wrapper/mls-search/',
    '/idx-wrapper/mls-search/:path*',
  ],
} 