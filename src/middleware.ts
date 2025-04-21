import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Rate limiting configuration
const RATE_LIMIT_CONFIG = {
  // General rate limits
  default: {
    window: 5 * 60 * 1000, // 5 minutes
    maxRequests: 30, // 30 requests per window
  },
  // Stricter limits for auth endpoints
  auth: {
    window: 5 * 60 * 1000, // 5 minutes
    maxRequests: 10, // 10 requests per window
  },
  // More lenient limits for admin endpoints
  admin: {
    window: 5 * 60 * 1000, // 5 minutes
    maxRequests: 50, // 50 requests per window
  },
  // Special limits for admin account creation
  adminSignup: {
    window: 1 * 60 * 1000, // 1 minute
    maxRequests: 5, // 5 requests per minute
  }
};

// Store rate limit data
interface RateLimitData {
  count: number;
  resetTime: number;
  lastRequestTime: number;
  retryCount: number;
}

const rateLimitMap = new Map<string, RateLimitData>();

// Clean up old rate limit data periodically
setInterval(() => {
  const now = Date.now();
  for (const [ip, data] of rateLimitMap.entries()) {
    if (now > data.resetTime + RATE_LIMIT_CONFIG.default.window) {
      rateLimitMap.delete(ip);
    }
  }
}, RATE_LIMIT_CONFIG.default.window);

export function middleware(request: NextRequest) {
  // Determine which rate limit config to use based on the endpoint
  let config = RATE_LIMIT_CONFIG.default;
  const path = request.nextUrl.pathname;
  
  if (path.startsWith('/api/auth') || 
      path.includes('signup') ||
      path.includes('login')) {
    // Check if it's an admin signup request
    if (path.includes('admin') && (path.includes('signup') || path.includes('create'))) {
      config = RATE_LIMIT_CONFIG.adminSignup;
    } else {
      config = RATE_LIMIT_CONFIG.auth;
    }
  } else if (path.startsWith('/admin')) {
    config = RATE_LIMIT_CONFIG.admin;
  }
  
  // Get client IP from headers
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 
             request.headers.get('x-real-ip') || 
             'unknown';
  
  const now = Date.now();
  
  // Get or initialize rate limit data for this IP
  const rateLimitData = rateLimitMap.get(ip) || {
    count: 0,
    resetTime: now + config.window,
    lastRequestTime: now,
    retryCount: 0
  };
  
  // Reset if window has passed
  if (now > rateLimitData.resetTime) {
    rateLimitData.count = 0;
    rateLimitData.resetTime = now + config.window;
    rateLimitData.retryCount = 0;
  }
  
  // Check if rate limit exceeded
  if (rateLimitData.count >= config.maxRequests) {
    const retryAfter = Math.ceil((rateLimitData.resetTime - now) / 1000);
    const exponentialBackoff = Math.min(
      Math.pow(2, rateLimitData.retryCount) * 1000,
      30000 // Max 30 seconds
    );
    
    // Increment retry count
    rateLimitData.retryCount++;
    rateLimitMap.set(ip, rateLimitData);
    
    // Custom error message for admin signup
    const isAdminSignup = path.includes('admin') && (path.includes('signup') || path.includes('create'));
    const errorMessage = isAdminSignup 
      ? 'Admin account creation rate limit exceeded. Please try again in a few minutes.'
      : `Please try again in ${retryAfter} seconds`;
    
    return new NextResponse(
      JSON.stringify({
        error: 'Rate limit exceeded',
        message: errorMessage,
        retryAfter,
        remainingRequests: 0,
        resetTime: rateLimitData.resetTime,
        isAdminSignup
      }),
      {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'Retry-After': retryAfter.toString(),
          'X-RateLimit-Limit': config.maxRequests.toString(),
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': rateLimitData.resetTime.toString(),
          'X-RateLimit-Window': config.window.toString()
        }
      }
    );
  }
  
  // Update rate limit data
  rateLimitData.count++;
  rateLimitData.lastRequestTime = now;
  rateLimitMap.set(ip, rateLimitData);
  
  // Add rate limit headers to response
  const response = NextResponse.next();
  response.headers.set('X-RateLimit-Limit', config.maxRequests.toString());
  response.headers.set('X-RateLimit-Remaining', (config.maxRequests - rateLimitData.count).toString());
  response.headers.set('X-RateLimit-Reset', rateLimitData.resetTime.toString());
  response.headers.set('X-RateLimit-Window', config.window.toString());
  
  return response;
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