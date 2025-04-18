// middleware.ts
// This file needs to be in the root directory of your project
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Configure which routes should be protected
const protectedRoutes = [
  '/dashboard',
  '/profile',
  '/settings',
  // Add other protected routes here
];

// Routes that should always be accessible to non-authenticated users
const authRoutes = ['/signin', '/register'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  console.log("Middleware is running for:", pathname);
  // Check if the pathname is a protected route
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname === route || pathname.startsWith(`${route}/`)
  );
  
  // Check if the pathname is an auth route (signin or register)
  const isAuthRoute = authRoutes.some(route => pathname === route);
  
  // Get the NextAuth.js session token
  const token = await getToken({ 
    req: request, 
    secret: process.env.NEXTAUTH_SECRET 
  });
  
  // Redirect logic for protected routes
  if (isProtectedRoute && !token) {
    // User is not authenticated and trying to access protected route
    // Redirect to signin page with return URL
    const url = new URL('/signin', request.url);
    url.searchParams.set('callbackUrl', encodeURI(request.url));
    return NextResponse.redirect(url);
  }
  
  // Redirect logic for auth routes
  if (isAuthRoute && token) {
    // User is already authenticated but trying to access signin/register
    // Redirect to dashboard or home
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  
  // Allow the request to proceed normally
  return NextResponse.next();
}

// Configure which routes this middleware applies to
// This is more efficient than applying middleware to all routes
export const config = {
    matcher: [
      '/dashboard/:path*',
      '/profile/:path*',
      '/settings/:path*',
      '/signin',
      '/register',
    ],
  };
  