import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Normalize path by removing trailing slash except for the root path
  const normalizedPath = pathname === '/' 
    ? pathname 
    : pathname.endsWith('/') ? pathname.slice(0, -1) : pathname

  // Skip middleware for static files and assets
  if (
    pathname.match(/\.(jpg|jpeg|png|gif|svg|ico|webp|css|js|woff|woff2|ttf|otf|map|mp4|webm|mov|avi|wmv|flv|mkv|mp3|wav|ogg)$/) ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.startsWith('/static/') ||
    pathname.startsWith('/public/') ||
    pathname.startsWith('/videos/') ||
    pathname.startsWith('/market_reports/')
  ) {
    return NextResponse.next();
  }

  // List of valid path prefixes that should NOT be redirected
  const validPaths = [
    '/about-us',
    '/api',
    '/properties',
    '/north-end-palm-beach-real-estate',
    '/in-town-palm-beach-real-estate',
    '/estate-section',
    '/in-town-townhomes',
    '/in-town-condos',
    '/sloans-curve-south-to-manalapan',
    '/luxury-palm-beach-condominium-co-op-buildings',
    '/global-reach-local-expertise',
    '/palm-beach-a-slice-of-paradise',
    '/buying-selling-hire-professional',
    '/4-essential-things-to-consider-when-buying-a-condo',
    '/sellers-tips',
    '/blog',
    '/market-reports',
    '/testimonials',
    '/contact',
    '/palm-beach-florida-real-estate-news',
    '/a-leader-in-palm-beach-real-estate',
    '/concierge-quality-realty-services',
    '/community-involvement',
    '/idx-wrapper',
    '/our-team',
    '/_next',
    '/public',
    '/videos',
    '/market_reports'
  ];

  // Check if the current path starts with any valid path
  const isValidPath = validPaths.some(path => 
    normalizedPath === path || 
    normalizedPath.startsWith(`${path}/`)
  );

  // Check for specific paths that should redirect to homepage
  if (
    normalizedPath.startsWith('/homepage-tips/') ||
    normalizedPath.startsWith('/palm-beach-homes/') ||
    (normalizedPath !== '/blog' && normalizedPath.includes('blog') && !normalizedPath.startsWith('/blog/')) ||
    (!isValidPath && normalizedPath !== '/')
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
    // Match all paths except Next.js-specific asset paths
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
} 