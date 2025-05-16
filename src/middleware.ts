import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { Redis } from '@upstash/redis';
import { Ratelimit } from '@upstash/ratelimit';
import { Logger } from '@/lib/utils/logger';

// Initialize Redis client
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
});

// Initialize logger
const logger = new Logger('rate-limit');

// Rate limiting configuration from environment variables with defaults
const RATE_LIMIT_CONFIG = {
  // General rate limits
  default: {
    window: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '300000'), // 5 minutes
    maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '30'),
  },
  // Stricter limits for auth endpoints
  auth: {
    window: parseInt(process.env.RATE_LIMIT_AUTH_WINDOW_MS || '300000'),
    maxRequests: parseInt(process.env.RATE_LIMIT_AUTH_MAX_REQUESTS || '10'),
  },
  // More lenient limits for admin endpoints
  admin: {
    window: parseInt(process.env.RATE_LIMIT_ADMIN_WINDOW_MS || '300000'),
    maxRequests: parseInt(process.env.RATE_LIMIT_ADMIN_MAX_REQUESTS || '50'),
  },
  // Special limits for admin account creation
  adminSignup: {
    window: parseInt(process.env.RATE_LIMIT_ADMIN_SIGNUP_WINDOW_MS || '60000'),
    maxRequests: parseInt(process.env.RATE_LIMIT_ADMIN_SIGNUP_MAX_REQUESTS || '5'),
  }
};

// Initialize rate limiters for each endpoint type
const limiters = {
  default: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(RATE_LIMIT_CONFIG.default.maxRequests, `${RATE_LIMIT_CONFIG.default.window}ms`),
    analytics: true,
    prefix: 'ratelimit:default',
  }),
  auth: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(RATE_LIMIT_CONFIG.auth.maxRequests, `${RATE_LIMIT_CONFIG.auth.window}ms`),
    analytics: true,
    prefix: 'ratelimit:auth',
  }),
  admin: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(RATE_LIMIT_CONFIG.admin.maxRequests, `${RATE_LIMIT_CONFIG.admin.window}ms`),
    analytics: true,
    prefix: 'ratelimit:admin',
  }),
  adminSignup: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(RATE_LIMIT_CONFIG.adminSignup.maxRequests, `${RATE_LIMIT_CONFIG.adminSignup.window}ms`),
    analytics: true,
    prefix: 'ratelimit:adminSignup',
  }),
};

// Helper function to create a simple hash using Web Crypto API
async function createHash(str: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('').slice(0, 8);
}

// Get client identifier from request
async function getClientIdentifier(request: NextRequest): Promise<string> {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 
             request.headers.get('x-real-ip') || 
             'unknown';
  const userAgent = request.headers.get('user-agent') || '';
  
  // Create hash of user agent
  const userAgentHash = userAgent ? await createHash(userAgent) : '';
  
  return `${ip}:${userAgentHash}`;
}

// Helper to determine which rate limit config to use
const getRateLimitConfig = (path: string) => {
  if (path.startsWith('/api/auth') || path.includes('signup') || path.includes('login')) {
    if (path.includes('admin') && (path.includes('signup') || path.includes('create'))) {
      return { limiter: limiters.adminSignup, config: RATE_LIMIT_CONFIG.adminSignup };
    }
    return { limiter: limiters.auth, config: RATE_LIMIT_CONFIG.auth };
  }
  if (path.startsWith('/admin')) {
    return { limiter: limiters.admin, config: RATE_LIMIT_CONFIG.admin };
  }
  return { limiter: limiters.default, config: RATE_LIMIT_CONFIG.default };
};

// Helper to format rate limit response
const createRateLimitResponse = (
  success: boolean,
  limit: number,
  remaining: number,
  reset: number,
  retryAfter: number,
  isAdminSignup: boolean
) => {
  const message = isAdminSignup
    ? 'Admin account creation rate limit exceeded. Please try again in a few minutes.'
    : `Please try again in ${retryAfter} seconds`;

  return new NextResponse(
    JSON.stringify({
      success,
      error: !success ? 'Rate limit exceeded' : undefined,
      message: !success ? message : undefined,
      retryAfter: !success ? retryAfter : undefined,
      remainingRequests: remaining,
      resetTime: reset,
      isAdminSignup
    }),
    {
      status: success ? 200 : 429,
      headers: {
        'Content-Type': 'application/json',
        'Retry-After': retryAfter.toString(),
        'X-RateLimit-Limit': limit.toString(),
        'X-RateLimit-Remaining': remaining.toString(),
        'X-RateLimit-Reset': reset.toString(),
        'X-RateLimit-Window': (reset - Date.now()).toString()
      }
    }
  );
};

// Rate limiting middleware
export async function middleware(request: NextRequest) {
  // Skip rate limiting only for static files and _next routes
  if (
    request.nextUrl.pathname.startsWith('/_next') ||
    request.nextUrl.pathname.startsWith('/static/')
  ) {
    return NextResponse.next();
  }

  try {
    const path = request.nextUrl.pathname;
    const clientId = await getClientIdentifier(request);
    const { limiter, config } = getRateLimitConfig(path);
    const isAdminSignup = path.includes('admin') && (path.includes('signup') || path.includes('create'));

    // Log rate limit attempt
    logger.info('Rate limit check', {
      path,
      clientId,
      isAdminSignup,
      config: {
        window: config.window,
        maxRequests: config.maxRequests
      }
    });

    // Check rate limit
    const result = await limiter.limit(clientId);
    
    // Log result
    logger.info('Rate limit result', {
      path,
      clientId,
      success: result.success,
      limit: result.limit,
      remaining: result.remaining,
      reset: result.reset
    });

    // If rate limited, log warning
    if (!result.success) {
      logger.warn('Rate limit exceeded', {
        path,
        clientId,
        isAdminSignup,
        retryAfter: Math.ceil((result.reset - Date.now()) / 1000)
      });
    }

    return createRateLimitResponse(
      result.success,
      result.limit,
      result.remaining,
      result.reset,
      Math.ceil((result.reset - Date.now()) / 1000),
      isAdminSignup
    );
  } catch (error) {
    // Log error but don't block the request
    logger.error('Rate limit error', {
      error: error instanceof Error ? error.message : 'Unknown error',
      path: request.nextUrl.pathname,
      clientId: await getClientIdentifier(request)
    });

    // In case of Redis/rate limit service failure, allow the request
    // but add a header indicating the rate limit check was skipped
    const response = NextResponse.next();
    response.headers.set('X-RateLimit-Skipped', 'true');
    return response;
  }
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    '/api/auth/:path*',
    '/admin/:path*',
    '/signup/:path*',
    '/login/:path*',
    '/user/:path*',
    '/dashboard/:path*'
  ]
}; 