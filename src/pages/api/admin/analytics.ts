import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // TODO: Add authentication/authorization check here!
  // e.g., check for a valid session and admin role

  // Example: Fetch all users (replace with your admin logic as needed)
  const { data, error } = await supabaseAdmin
    .from('users')
    .select('id, full_name, email, created_at');

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.status(200).json({ users: data });
} 