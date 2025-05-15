import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // NOT public!
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { username } = req.body;
  if (!username) {
    return res.status(400).json({ error: 'Username is required' });
  }

  // Find user_id by username
  const { data: profile, error: profileError } = await supabase
    .from('user_profiles')
    .select('user_id')
    .eq('username', username.toLowerCase())
    .single();

  if (profileError || !profile) {
    return res.status(200).json({ email: null });
  }

  // Find email by user_id
  const { data: user, error: userError } = await supabase
    .from('users')
    .select('email')
    .eq('id', profile.user_id)
    .single();

  if (userError || !user) {
    return res.status(200).json({ email: null });
  }

  return res.status(200).json({ email: user.email });
} 