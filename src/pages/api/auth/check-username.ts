import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

// Use anon key for public username checks. Ensure RLS allows public SELECT on user_profiles.username.
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ error: 'Username is required.' });
  }

  // Query the user_profiles table for username existence
  const { data, error } = await supabase
    .from('user_profiles')
    .select('username')
    .eq('username', username.toLowerCase())
    .limit(1);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  const exists = data && data.length > 0;
  return res.status(200).json({ exists });
} 