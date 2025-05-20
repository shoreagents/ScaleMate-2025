import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

// Simple in-memory rate limiting
const rateLimit = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS = 5;

// Generic error handler
const handleError = (error: any) => {
  // Check for specific error types while maintaining security
  if (error.message) {
    // Invalid login credentials
    if (error.message.includes('Invalid login credentials') || 
        error.message.includes('Email not confirmed') ||
        error.message.includes('Invalid email or password')) {
      return 'Invalid email or password';
    }
    
    // Email format errors
    if (error.message.includes('valid email')) {
      return 'Please enter a valid email address';
    }
    
    // Password errors
    if (error.message.includes('password')) {
      return 'Invalid password format';
    }
    
    // Rate limiting
    if (error.message.includes('rate limit')) {
      return 'Too many attempts. Please try again later';
    }

    // Network/Connection errors
    if (error.message.includes('network') || error.message.includes('connection')) {
      return 'Connection error. Please check your internet and try again';
    }
  }
  
  // Default generic error for unknown cases
  return 'Unable to process your request. Please try again in a moment.';
};

// Create two Supabase clients - one for regular operations and one for admin operations
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Admin client for checking email existence
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Add security headers
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  res.setHeader('Content-Security-Policy', "default-src 'self'");

  // Simple rate limiting
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const now = Date.now();
  const rateLimitInfo = rateLimit.get(ip as string);

  if (rateLimitInfo) {
    if (now > rateLimitInfo.resetTime) {
      // Reset if window has passed
      rateLimit.set(ip as string, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    } else if (rateLimitInfo.count >= MAX_REQUESTS) {
      return res.status(429).json({ error: 'Too many requests, please try again later.' });
    } else {
      // Increment count
      rateLimitInfo.count++;
    }
  } else {
    // First request
    rateLimit.set(ip as string, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
  }

  if (req.method === 'GET') {
    const { code } = req.query;

    if (code) {
      try {
        const { data, error } = await supabase.auth.exchangeCodeForSession(code as string);
        if (error) throw error;
        return res.status(200).json({ success: true, data });
      } catch (error: any) {
        console.error('Auth callback error:', error);
        return res.status(400).json({ error: handleError(error) });
      }
    }

    return res.status(400).json({ error: 'Invalid request' });
  }

  if (req.method === 'POST') {
    try {
      const { action, email, password, firstName, lastName } = req.body;
      
      console.log('Received POST request:', {
        action,
        email,
        hasPassword: !!password,
        firstName,
        lastName
      });

      // Input sanitization with null checks
      const sanitizeInput = (input: string | undefined | null) => {
        if (!input) return '';
        return input.trim().replace(/[<>]/g, '');
      };

      // Validate required fields
      if (action === 'signup' || action === 'signin') {
        if (!email) {
          console.log('Missing email');
          return res.status(400).json({ error: 'Email is required' });
        }
        if (!password) {
          console.log('Missing password');
          return res.status(400).json({ error: 'Password is required' });
        }
      }

      const sanitizedEmail = sanitizeInput(email);
      const sanitizedPassword = sanitizeInput(password);
      const sanitizedFirstName = firstName ? sanitizeInput(firstName) : '';
      const sanitizedLastName = lastName ? sanitizeInput(lastName) : '';

      console.log('Sanitized inputs:', {
        email: sanitizedEmail,
        hasPassword: !!sanitizedPassword,
        firstName: sanitizedFirstName,
        lastName: sanitizedLastName
      });

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (sanitizedEmail && !emailRegex.test(sanitizedEmail)) {
        console.log('Invalid email format:', sanitizedEmail);
        return res.status(400).json({ error: 'Invalid email format' });
      }

      switch (action) {
        case 'check-email':
          try {
            console.log('Checking email existence:', sanitizedEmail);
            
            // Check if user exists by attempting to sign in with OTP
            const { error: checkError } = await supabase.auth.signInWithOtp({
              email: sanitizedEmail,
              options: {
                shouldCreateUser: false
              }
            });

            console.log('Email check result:', { 
              hasError: !!checkError,
              errorMessage: checkError?.message,
              errorStatus: checkError?.status,
              fullError: checkError
            });

            // If we get a "User not found" error, the email doesn't exist
            if (checkError && checkError.message.includes('User not found')) {
              console.log('Email does not exist');
              return res.status(200).json({ exists: false });
            }

            // If we get an OTP configuration error, the email doesn't exist
            if (checkError && checkError.message.includes('Signups not allowed for otp')) {
              console.log('OTP not configured, assuming email does not exist');
              return res.status(200).json({ exists: false });
            }

            // If we get any other error or no error, the user exists
            console.log('Email exists');
            return res.status(200).json({ exists: true });
          } catch (error: any) {
            console.error('Email check error:', {
              message: error.message,
              name: error.name,
              stack: error.stack,
              fullError: error
            });
            return res.status(500).json({ 
              error: 'Failed to check email. Please try again.' 
            });
          }

        case 'signin':
          const { data: signinData, error: signinError } = await supabase.auth.signInWithPassword({
            email: sanitizedEmail,
            password: sanitizedPassword,
          });

          if (signinError) {
            // Log the actual error for debugging but return a sanitized message
            console.error('Sign in error:', signinError);
            return res.status(400).json({ error: handleError(signinError) });
          }

          return res.status(200).json({ 
            success: true, 
            data: signinData,
            session: signinData.session,
            role: signinData.user?.user_metadata?.role || 'user'
          });

        case 'signup':
          try {
            console.log('Starting signup process for email:', sanitizedEmail);
            
            // First check if user exists by attempting to sign in with OTP
            const { error: checkError } = await supabase.auth.signInWithOtp({
              email: sanitizedEmail,
              options: {
                shouldCreateUser: false
              }
            });

            console.log('OTP check result:', { 
              hasError: !!checkError,
              errorMessage: checkError?.message,
              errorStatus: checkError?.status,
              fullError: checkError
            });

            // If we get a "User not found" error or OTP config error, the email doesn't exist
            if (checkError && (
              checkError.message.includes('User not found') ||
              checkError.message.includes('Signups not allowed for otp')
            )) {
              console.log('Email does not exist, proceeding with signup');
              
              // Email doesn't exist, proceed with signup
              const { data: signupData, error: signupError } = await supabase.auth.signUp({
                email: sanitizedEmail,
                password: sanitizedPassword,
                options: {
                  data: {
                    first_name: sanitizedFirstName,
                    last_name: sanitizedLastName,
                  }
                }
              });

              console.log('Signup attempt result:', {
                hasError: !!signupError,
                errorMessage: signupError?.message,
                hasUser: !!signupData?.user,
                userId: signupData?.user?.id,
                fullError: signupError
              });

              if (signupError) {
                console.error('Signup error:', signupError);
                
                if (signupError.message.includes('Password')) {
                  return res.status(400).json({ error: 'Password is too weak' });
                }
                
                if (signupError.message.includes('Email')) {
                  return res.status(400).json({ error: 'Invalid email format' });
                }
                
                return res.status(400).json({ error: signupError.message });
              }

              if (!signupData.user) {
                return res.status(400).json({ error: 'Failed to create user account' });
              }

              return res.status(200).json({ 
                success: true, 
                data: signupData, 
                session: signupData.session || null 
              });
            } else if (checkError) {
              // If we get any other error, log it and check if it's a rate limit error
              console.log('Email check error details:', {
                message: checkError.message,
                status: checkError.status,
                name: checkError.name,
                fullError: checkError
              });

              if (checkError.message.includes('rate limit')) {
                return res.status(429).json({ error: 'Too many attempts. Please try again later.' });
              }

              // For other errors, assume email exists to be safe
              return res.status(400).json({ error: 'Email already exists' });
            } else {
              // If no error, the user exists
              console.log('No error from OTP check, assuming email exists');
              return res.status(400).json({ error: 'Email already exists' });
            }
          } catch (error: any) {
            console.error('Signup error:', {
              message: error.message,
              name: error.name,
              stack: error.stack,
              fullError: error
            });
            return res.status(500).json({ 
              error: error.message || 'Failed to create account. Please try again.' 
            });
          }

        default:
          return res.status(400).json({ error: 'Invalid action' });
      }
    } catch (error: any) {
      console.error('Auth error:', error);
      return res.status(500).json({ error: handleError(error) });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
} 