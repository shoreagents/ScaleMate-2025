import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Rate limiting configuration
const RATE_LIMIT_WINDOW = 5 * 60 * 1000; // 5 minutes in milliseconds
const MAX_REQUESTS = 3; // Maximum requests per window
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

export function middleware(request: NextRequest) {
  // Only apply rate limiting to auth-related endpoints
  if (request.nextUrl.pathname.startsWith('/api/auth') || 
      request.nextUrl.pathname.startsWith('/admin') ||
      request.nextUrl.pathname.includes('signup') ||
      request.nextUrl.pathname.includes('login')) {
    
    // Get client IP from headers
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 
               request.headers.get('x-real-ip') || 
               'unknown';
    
    const now = Date.now();
    
    // Get or initialize rate limit data for this IP
    const rateLimitData = rateLimitMap.get(ip) || { count: 0, resetTime: now + RATE_LIMIT_WINDOW };
    
    // Reset if window has passed
    if (now > rateLimitData.resetTime) {
      rateLimitData.count = 0;
      rateLimitData.resetTime = now + RATE_LIMIT_WINDOW;
    }
    
    // Check if rate limit exceeded
    if (rateLimitData.count >= MAX_REQUESTS) {
      const retryAfter = Math.ceil((rateLimitData.resetTime - now) / 1000);
      
      return new NextResponse(
        JSON.stringify({
          error: 'Rate limit exceeded',
          message: `Please try again in ${retryAfter} seconds`,
          retryAfter
        }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'Retry-After': retryAfter.toString()
          }
        }
      );
    }
    
    // Increment request count
    rateLimitData.count++;
    rateLimitMap.set(ip, rateLimitData);
  }
  
  return NextResponse.next();
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    '/api/auth/:path*',
    '/admin/:path*',
    '/signup/:path*',
    '/login/:path*'
  ]
}; 