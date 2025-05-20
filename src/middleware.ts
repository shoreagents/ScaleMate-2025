import { createServerClient } from '@supabase/ssr';
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

export async function middleware(request: NextRequest) {
  try {
    let response = NextResponse.next({
      request: {
        headers: request.headers,
      },
    });

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
          // Admin routes
          if (path.startsWith('/admin') && profile.role !== 'admin') {
            return NextResponse.redirect(new URL('/user/dashboard', request.url));
          }

          // User routes
          if (path.startsWith('/user') && profile.role !== 'user' && profile.role !== 'admin') {
            return NextResponse.redirect(new URL('/admin/dashboard', request.url));
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