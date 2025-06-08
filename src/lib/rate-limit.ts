import { NextApiRequest } from 'next';

interface RateLimitConfig {
  windowMs: number;
  max: number;
}

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

// Simple in-memory store (consider using Redis in production)
const store: RateLimitStore = {};

// Clean up expired entries every minute
setInterval(() => {
  const now = Date.now();
  Object.keys(store).forEach(key => {
    if (store[key].resetTime < now) {
      delete store[key];
    }
  });
}, 60000);

export async function rateLimit(
  req: NextApiRequest,
  config: RateLimitConfig
): Promise<void> {
  // Get IP address, handling both string and string[] types
  const forwardedFor = req.headers['x-forwarded-for'];
  const ip = Array.isArray(forwardedFor) 
    ? forwardedFor[0] 
    : forwardedFor || req.socket.remoteAddress || 'unknown';
  
  const key = typeof ip === 'string' ? ip : 'unknown';
  const now = Date.now();
  
  // Initialize or get existing entry
  if (!store[key] || store[key].resetTime < now) {
    store[key] = {
      count: 0,
      resetTime: now + config.windowMs
    };
  }

  // Increment counter
  store[key].count++;

  // Check if rate limit exceeded
  if (store[key].count > config.max) {
    throw new Error('Rate limit exceeded');
  }
} 