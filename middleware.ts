import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth.config";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const userRole = (req.auth?.user as any)?.role;

  const isAdminRoute = nextUrl.pathname.startsWith("/admin");
  const isAuthRoute = nextUrl.pathname.startsWith("/login") || nextUrl.pathname.startsWith("/signup");
  const isProtectedCustomerRoute = 
    nextUrl.pathname.startsWith("/checkout") || 
    nextUrl.pathname.startsWith("/account") || 
    nextUrl.pathname.startsWith("/orders");

  // 1. Redirect logged-in users away from auth routes (login/signup)
  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL(userRole === "admin" ? "/admin" : "/account", nextUrl));
    }
    return NextResponse.next();
  }

  // 2. Protect Admin Route checks (Requires login + admin role)
  if (isAdminRoute) {
    if (!isLoggedIn) {
      const loginUrl = new URL("/login", nextUrl);
      loginUrl.searchParams.set("callbackUrl", nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }
    if (userRole !== "admin") {
      // Forbidden: redirect customer away from admin board to homepage
      return NextResponse.redirect(new URL("/", nextUrl));
    }
    return NextResponse.next();
  }

  // 3. Protect Customer Route checks (Requires login)
  if (isProtectedCustomerRoute) {
    if (!isLoggedIn) {
      const loginUrl = new URL("/login", nextUrl);
      loginUrl.searchParams.set("callbackUrl", nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  return NextResponse.next();
});

export const config = {
  // Apply middleware checks to these endpoints
  matcher: [
    "/admin/:path*",
    "/checkout/:path*",
    "/account/:path*",
    "/orders/:path*",
    "/login",
    "/signup"
  ]
};
