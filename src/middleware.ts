import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';

export async function middleware(request: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req: request, res });

  // Check auth state
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Get user role if authenticated
  let userRole = null;
  if (session?.user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', session.user.id)
      .single();
    userRole = profile?.role;
  }

  // Handle public routes
  const isPublicRoute = request.nextUrl.pathname.startsWith('/login') ||
    request.nextUrl.pathname.startsWith('/signup') ||
    request.nextUrl.pathname.startsWith('/reset-password') ||
    request.nextUrl.pathname === '/';

  if (isPublicRoute) {
    // If user is authenticated, redirect to appropriate dashboard
    if (session?.user) {
      if (userRole === 'admin') {
        return NextResponse.redirect(new URL('/admin/dashboard', request.url));
      } else {
        return NextResponse.redirect(new URL('/user/dashboard', request.url));
      }
    }
    return res;
  }

  // Handle protected routes
  if (!session?.user) {
    // Redirect to login if not authenticated
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Handle role-based routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (userRole !== 'admin') {
      // Redirect to user dashboard if not admin
      return NextResponse.redirect(new URL('/user/dashboard', request.url));
    }
  }

  if (request.nextUrl.pathname.startsWith('/user')) {
    if (userRole === 'admin') {
      // Redirect to admin dashboard if admin
      return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }
  }

  return res;
}

export const config = {
  matcher: [
    '/api/:path*',
    '/auth/:path*',
    '/admin/:path*',
    '/user/:path*',
    '/login',
    '/signup',
    '/reset-password',
    '/'
  ]
}; 