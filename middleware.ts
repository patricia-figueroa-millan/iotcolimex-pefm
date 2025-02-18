import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { isAuthenticated } from './lib/auth'

export function middleware(request: NextRequest) {
  console.log(`Middleware activado para: ${request.nextUrl.pathname}`)

  if (!isAuthenticated(request) && request.nextUrl.pathname !== '/') {
    return NextResponse.redirect(new URL("/", request.url));

  }

  return NextResponse.next()
}

export const config = {
  matcher: "/((?!_next/static|_next/image|favicon.ico|public|login|index).*)",
};


