import { createMiddlewareSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareSupabaseClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if(req.nextUrl.pathname.startsWith("/api/")) {
    return res;
  }

  if (req.nextUrl.pathname === "/") {
  return NextResponse.redirect(new URL("/login", req.url));
  }

  if (req.nextUrl.pathname === "/login" && session) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  if (!session && req.nextUrl.pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return res;
}

export const config = {
  matcher: [
    "/",
    "/dashboard/:path*",
    "/recharts-test/:path*",
    "/reports/:path*",
    "/alerts/:path*",
    
  ],
};

