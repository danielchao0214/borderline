import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export default function middleware(req) {
  const token = req.cookies.get("token")?.value;
  const secret = new TextEncoder().encode(
    "secret"
  );
  if (!token) return NextResponse.redirect(new URL("/login/", req.url));
  try {
    const  {payload, header} = jwtVerify(token, secret);
    console.log("verified!");
    console.log(req.nextUrl.pathname)
    if(req.nextUrl.pathname.startsWith('/login')) {
      return NextResponse.redirect(new URL("/dashboardmaps", req.url));
    }
    return NextResponse.next();
  } catch (e) {
    console.log(e);
    return NextResponse.redirect(new URL("/login/", req.url));
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}