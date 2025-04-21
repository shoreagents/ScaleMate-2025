import { createClient } from '@supabase/supabase-js';
import { NextApiRequest, NextApiResponse } from 'next';

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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { username } = req.body;

    if (!username) {
      return res.status(400).json({ error: 'Username is required' });
    }

    // Query user_profiles with service role to bypass RLS
    const { data: profile, error } = await supabase
      .from('user_profiles')
      .select('user_id, email')
      .eq('username', username)
      .single();

    if (error) {
      console.error('Error looking up username:', error);
      return res.status(404).json({ error: 'User not found' });
    }

    if (!profile || !profile.email) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json({ email: profile.email });
  } catch (error) {
    console.error('Error in username lookup:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
} 