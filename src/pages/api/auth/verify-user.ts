import { createClient } from '@supabase/supabase-js';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { loginIdentifier, verificationCode } = req.body;

    if (!loginIdentifier || !verificationCode) {
      return res.status(400).json({ error: 'Missing required fields' });
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

    let emailToUse = loginIdentifier;

    // If the identifier is not an email, try to find the email by username
    if (!loginIdentifier.includes('@')) {
      // Query the user_profiles table to get the user_id
      const { data: profileData, error: profileError } = await supabase
        .from('user_profiles')
        .select('user_id')
        .eq('username', loginIdentifier)
        .single();

      if (profileError || !profileData) {
        return res.status(400).json({ error: 'Invalid login credentials' });
      }

      // Query the users table to get the email
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('email')
        .eq('id', profileData.user_id)
        .single();

      if (userError || !userData) {
        return res.status(400).json({ error: 'Invalid login credentials' });
      }

      emailToUse = userData.email;
    }

    // Verify the code
    const { error: verifyError } = await supabase.auth.verifyOtp({
      email: emailToUse,
      token: verificationCode,
      type: 'email'
    });

    if (verifyError) {
      return res.status(400).json({ error: verifyError.message });
    }

    return res.status(200).json({ success: true, email: emailToUse });
  } catch (error) {
    console.error('Error in verify-user API:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
} 