import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Normalize path by removing trailing slash except for the root path
  const normalizedPath = pathname === '/' 
    ? pathname 
    : pathname.endsWith('/') ? pathname.slice(0, -1) : pathname

  // Check for legacy paths that should redirect to homepage
  // Add specific patterns that should be redirected
  if (
    normalizedPath.startsWith('/homepage-tips/') ||
    (normalizedPath !== '/blog' && normalizedPath.includes('blog') && !normalizedPath.startsWith('/blog/'))
  ) {
    // Redirect to homepage
    return NextResponse.redirect(new URL('/', request.url))
  }

  // Check if request is for the IDX wrapper
  if (normalizedPath === '/idx-wrapper/mls-search') {
    // Only intercept specific validation checks from IDX
    // We need to allow normal cURL requests to get the full page with navbar
    const userAgent = request.headers.get('user-agent') || ''
    
    // Special case: Only if it's a status check from the IDX admin panel
    // but NOT when it's a normal cURL request to get content
    if (userAgent.includes('IDX-Validate') || userAgent.includes('Vercel-Status-Check')) {
      // Format expected by the IDX service according to their specification
      return new NextResponse('<!DOCTYPE html><html><head><title>IDX Wrapper Page</title></head><body><div id="idxStart"></div><div id="idx-results-wrapper"></div><div id="idxStop"></div></body></html>', {
        status: 200,
        headers: {
          'Content-Type': 'text/html',
          'Cache-Control': 'no-store',
        },
      })
    }
    
    // For normal browser requests and cURL requests from IDX for content
    const response = NextResponse.next()
    response.headers.set('Cache-Control', 'no-store')
    return response
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
    // Handle IDX wrapper paths
    '/idx-wrapper/mls-search',
    '/idx-wrapper/mls-search/',
    '/idx-wrapper/mls-search/:path*',
    
    // Handle legacy paths that need redirection
    '/homepage-tips/:path*',
    '/((?!api|_next/static|_next/image|favicon.ico|blog/|blog$).*)'
  ],
} 