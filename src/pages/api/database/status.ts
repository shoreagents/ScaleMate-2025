import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { data, error } = await supabase
      .from('user_roles')
      .select('id')
      .limit(1)
      .single();

    if (error) {
      return res.status(500).json({
        success: false,
        message: `Connection failed: ${error.message}`,
        lastChecked: new Date(),
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Connection successful',
      lastChecked: new Date(),
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err instanceof Error ? err.message : 'Unknown error',
      lastChecked: new Date(),
    });
  }
} 