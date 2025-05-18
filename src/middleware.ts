import { NextRequest, NextResponse } from 'next/server';
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Skip middleware for static files and special routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.match(/\.(svg|jpg|jpeg|png|webp|gif|ico|css|js)$/)
  ) {
    return NextResponse.next();
  }

  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  // Check auth state
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Get user role if authenticated
  let userRole = null;
  if (session?.user) {
    const { data: userData } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', session.user.id)
      .single();
    userRole = userData?.role;
  }

  // Handle public routes
  const isPublicRoute = pathname.startsWith('/login') ||
    pathname.startsWith('/signup') ||
    pathname.startsWith('/reset-password') ||
    pathname === '/';

  if (isPublicRoute) {
    // If user is authenticated, redirect to appropriate dashboard
    if (session?.user) {
      if (userRole === 'admin') {
        return NextResponse.redirect(new URL('/admin/dashboard', req.url));
      } else {
        return NextResponse.redirect(new URL('/user/dashboard', req.url));
      }
    }
    return res;
  }

  // Handle protected routes
  if (!session?.user) {
    // Redirect to login if not authenticated
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Handle role-based routes
  if (pathname.startsWith('/admin')) {
    if (userRole !== 'admin') {
      // Redirect to user dashboard if not admin
      return NextResponse.redirect(new URL('/user/dashboard', req.url));
    }
  }

  if (pathname.startsWith('/user')) {
    if (userRole === 'admin') {
      // Redirect to admin dashboard if admin
      return NextResponse.redirect(new URL('/admin/dashboard', req.url));
    }
  }

  return res;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ]
}; 