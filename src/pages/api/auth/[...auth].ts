import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { code } = req.query;

    if (code) {
      try {
        const { data, error } = await supabase.auth.exchangeCodeForSession(code as string);
        if (error) throw error;
        return res.status(200).json({ success: true, data });
      } catch (error: any) {
        console.error('Auth callback error:', error);
        return res.status(400).json({ error: error.message || 'Authentication failed' });
      }
    }

    return res.status(400).json({ error: 'No code provided' });
  }

  if (req.method === 'POST') {
    try {
      const { email, password, action } = req.body;

      if (action === 'signup') {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              first_name: req.body.firstName,
              last_name: req.body.lastName,
            }
          }
        });

        if (error) {
          return res.status(400).json({ error: error.message });
        }

        // Return session if available (e.g., if email confirmation is not required)
        return res.status(200).json({ success: true, data, session: data.session || null });
      }

      // Default to sign in
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return res.status(400).json({ error: error.message });
      }

      // Return session explicitly for frontend to set
      return res.status(200).json({ success: true, data, session: data.session || null });
    } catch (error: any) {
      console.error('Auth error:', error);
      return res.status(500).json({ 
        error: error.message || 'An unexpected error occurred' 
      });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
} 