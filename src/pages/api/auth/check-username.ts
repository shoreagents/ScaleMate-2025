import { createClient } from '@supabase/supabase-js';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { username } = req.body;

    if (!username) {
      return res.status(400).json({ error: 'Missing username' });
    }

    // Create Supabase client with service role key
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    );

    // Query the user_profiles table
    const { data, error } = await supabase
      .from('user_profiles')
      .select('username, user_id')
      .eq('username', username.toLowerCase())
      .limit(1);

    if (error) {
      console.error('Error checking username:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }

    return res.status(200).json({ 
      exists: data && data.length > 0,
      available: !data || data.length === 0,
      userId: data && data.length > 0 ? data[0].user_id : null
    });
  } catch (error) {
    console.error('Error in check-username API:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
} 