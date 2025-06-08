import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define role types and route types
type UserRole = 'user' | 'admin';
type ProtectedRoute = '/admin' | '/admin/dashboard' | '/user/dashboard' | '/profile' | '/settings';

// Define protected routes and their required roles
const PROTECTED_ROUTES: Record<ProtectedRoute, UserRole[]> = {
  '/admin': ['admin'],
  '/admin/dashboard': ['admin'],
  '/user/dashboard': ['user'],
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

// Helper function to get CSP directives
function getCSPDirectives() {
  // Development-specific directives
  const isDev = process.env.NODE_ENV === 'development';
  
  // Base script sources
  const scriptSrc = [
    "'self'",
    "'unsafe-inline'",
    // Only include unsafe-eval in development
    ...(isDev ? ["'unsafe-eval'"] : []),
    "https://storage.googleapis.com",
    // Add WebSocket connections for development
    ...(isDev ? ["ws:", "wss:"] : [])
  ].join(' ');

  // Base connect sources
  const connectSrc = [
    "'self'",
    "https://*.supabase.co",
    "https://api.openai.com",
    // Add WebSocket connections for development
    ...(isDev ? ["ws:", "wss:"] : [])
  ].join(' ');

  const baseDirectives = [
    "default-src 'self'",
    `script-src ${scriptSrc}`,
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: https://storage.googleapis.com https://*.supabase.co",
    `connect-src ${connectSrc}`,
    "frame-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "upgrade-insecure-requests"
  ];

  return baseDirectives.join('; ');
}

export async function middleware(request: NextRequest) {
  try {
    // Skip middleware for Next.js internal routes and WebSocket connections
    if (
      request.nextUrl.pathname.startsWith('/_next') ||
      request.nextUrl.pathname.startsWith('/__next') ||
      request.headers.get('upgrade') === 'websocket'
    ) {
      return NextResponse.next();
    }

    let response = NextResponse.next({
      request: {
        headers: request.headers,
      },
    });

    // Add security headers
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-XSS-Protection', '1; mode=block');
    response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
    
    // Set CSP with environment-aware directives
    response.headers.set(
      'Content-Security-Policy',
      getCSPDirectives()
    );

    // Check if Supabase environment variables are set
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.error('Missing Supabase environment variables');
      return response;
    }

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          get(name: string) {
            return request.cookies.get(name)?.value;
          },
          set(name: string, value: string, options: any) {
            response.cookies.set({
              name,
              value,
              ...options,
            });
          },
          remove(name: string, options: any) {
            response.cookies.set({
              name,
              value: '',
              ...options,
            });
          },
        },
      }
    );

    // Get the pathname of the request
    const path = request.nextUrl.pathname;

    // Check if it's a public route
    if (PUBLIC_ROUTES.some(route => path.startsWith(route))) {
      return response;
    }

    try {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();

      if (sessionError) {
        console.error('Session error:', sessionError);
        return response;
      }

      // If the user is not signed in and the route is not public, redirect to login
      if (!session) {
        const redirectUrl = new URL('/login', request.url);
        redirectUrl.searchParams.set('redirectedFrom', path);
        return NextResponse.redirect(redirectUrl);
      }

      // If the user is signed in and tries to access login/signup, redirect to dashboard
      if (session && (path === '/login' || path === '/signup')) {
        return NextResponse.redirect(new URL('/user/dashboard', request.url));
      }

      // Role-based access control
      try {
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single();

        if (profileError) {
          console.error('Profile error:', profileError);
          return response;
        }

        if (profile) {
          const userRole = profile.role as UserRole;
          console.log(`[Middleware] User role: ${userRole}, Current path: ${path}`);
          
          // Check if the current path exactly matches a protected route or starts with it
          const matchingRoute = (Object.entries(PROTECTED_ROUTES) as [ProtectedRoute, UserRole[]][]).find(([route]) => {
            // For dashboard routes, require exact match
            if (route === '/admin/dashboard' || route === '/user/dashboard') {
              const isExactMatch = path === route;
              console.log(`[Middleware] Checking exact match for ${route}: ${isExactMatch}`);
              return isExactMatch;
          }
            // For other routes, allow prefix matching
            const isPrefixMatch = path.startsWith(route);
            console.log(`[Middleware] Checking prefix match for ${route}: ${isPrefixMatch}`);
            return isPrefixMatch;
          });

          if (matchingRoute) {
            const [route, allowedRoles] = matchingRoute;
            console.log(`[Middleware] Found matching route: ${route}, Allowed roles: ${allowedRoles.join(', ')}`);
            
            // If user's role is not in the allowed roles for this route, redirect to appropriate dashboard
            if (!allowedRoles.includes(userRole)) {
              console.log(`[Middleware] Access denied: User with role ${userRole} attempted to access ${route}`);
              // Always redirect to the role's designated dashboard
              const redirectUrl = userRole === 'admin' ? '/admin/dashboard' : '/user/dashboard';
              console.log(`[Middleware] Redirecting to: ${redirectUrl}`);
              return NextResponse.redirect(new URL(redirectUrl, request.url));
            }
            console.log(`[Middleware] Access granted: User with role ${userRole} accessing ${route}`);
          }
        }
      } catch (profileError) {
        console.error('Error fetching profile:', profileError);
        return response;
      }
    } catch (authError) {
      console.error('Auth error:', authError);
      return response;
    }

    return response;
  } catch (error) {
    console.error('Middleware error:', error);
    return NextResponse.next();
  }
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