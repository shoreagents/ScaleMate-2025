import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define protected routes and their required roles
const PROTECTED_ROUTES = {
  '/admin': ['admin'],
  '/admin/dashboard': ['admin'],
  '/user/dashboard': ['user', 'admin'],
  '/profile': ['user', 'admin'],
  '/settings': ['user', 'admin'],
} as const;

// Define public routes that don't require authentication
const PUBLIC_ROUTES = [
  '/',
  '/login',
  '/signup',
  '/auth/callback',
  '/auth/reset-password',
  '/about',
  '/contact',
  '/pricing',
  '/features',
  '/blog',
  '/terms',
  '/privacy',
];

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  // Get the session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // If we're on the login page
  if (req.nextUrl.pathname === '/login') {
    // If we have a session, redirect to appropriate dashboard
    if (session) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .single();

      // Get the redirectTo parameter if it exists
      const redirectTo = req.nextUrl.searchParams.get('redirectTo');
      
      // If we have a redirectTo parameter and the user has the right role, use it
      if (redirectTo) {
        const route = Object.keys(PROTECTED_ROUTES).find(route => 
          redirectTo.startsWith(route)
        );
        
        if (route && PROTECTED_ROUTES[route as keyof typeof PROTECTED_ROUTES].includes(profile?.role || '')) {
          return NextResponse.redirect(new URL(redirectTo, req.url));
        }
      }

      // Otherwise redirect to role-based dashboard
      return NextResponse.redirect(
        new URL(profile?.role === 'admin' ? '/admin/dashboard' : '/user/dashboard', req.url)
      );
    }
    return res;
  }

  // Check if the route is public
  if (PUBLIC_ROUTES.includes(req.nextUrl.pathname)) {
    return res;
  }

  // If no session and trying to access protected route, redirect to login
  if (!session) {
    // Don't add redirectTo if we're already on the login page
    if (req.nextUrl.pathname === '/login') {
      return res;
    }

    const redirectUrl = new URL('/login', req.url);
    redirectUrl.searchParams.set('redirectTo', req.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // Check if the route is protected
  const isProtectedRoute = Object.keys(PROTECTED_ROUTES).some(route => 
    req.nextUrl.pathname.startsWith(route)
  );

  if (isProtectedRoute) {
    // Get user's role from profiles table
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', session.user.id)
      .single();

    if (error || !profile) {
      console.error('Error fetching user role:', error);
      // If we can't get the role, redirect to login
      const redirectUrl = new URL('/login', req.url);
      redirectUrl.searchParams.set('redirectTo', req.nextUrl.pathname);
      return NextResponse.redirect(redirectUrl);
    }

    // Check if user has required role for the route
    const route = Object.keys(PROTECTED_ROUTES).find(route => 
      req.nextUrl.pathname.startsWith(route)
    );

    if (route && !PROTECTED_ROUTES[route as keyof typeof PROTECTED_ROUTES].includes(profile.role)) {
      // If user doesn't have required role, redirect to appropriate dashboard
      return NextResponse.redirect(
        new URL(profile.role === 'admin' ? '/admin/dashboard' : '/user/dashboard', req.url)
      );
    }
  }

  return res;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
}; 