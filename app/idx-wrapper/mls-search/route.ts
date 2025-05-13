import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Cache-Control': 'no-store',
      'Content-Type': 'text/html',
    },
  })
}

// Handle all other methods
export async function POST(request: NextRequest) { return GET(request) }
export async function PUT(request: NextRequest) { return GET(request) }
export async function DELETE(request: NextRequest) { return GET(request) }
export async function PATCH(request: NextRequest) { return GET(request) }
export async function HEAD(request: NextRequest) { return GET(request) }
export async function OPTIONS(request: NextRequest) { return GET(request) } 