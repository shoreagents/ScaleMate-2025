import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Test the connection by making a simple query
    const { data, error } = await supabaseAdmin
      .from('users')
      .select('count')
      .limit(1);

    if (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
        lastChecked: new Date().toISOString()
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Database connection healthy',
      lastChecked: new Date().toISOString()
    });
  } catch (error) {
    console.error('Database status check error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to check database status',
      lastChecked: new Date().toISOString()
    });
  }
} 