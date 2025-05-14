import { createClient } from '@supabase/supabase-js';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

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

  try {
    // Set up date ranges
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayISO = today.toISOString();

    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayISO = yesterday.toISOString();

    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(today.getDate() - 7);
    const sevenDaysAgoISO = sevenDaysAgo.toISOString();

    const fourteenDaysAgo = new Date(today);
    fourteenDaysAgo.setDate(today.getDate() - 14);
    const fourteenDaysAgoISO = fourteenDaysAgo.toISOString();

    const thirtyDaysAgo = new Date(today);
    thirtyDaysAgo.setDate(today.getDate() - 30);
    const thirtyDaysAgoISO = thirtyDaysAgo.toISOString();

    const sixtyDaysAgo = new Date(today);
    sixtyDaysAgo.setDate(today.getDate() - 60);
    const sixtyDaysAgoISO = sixtyDaysAgo.toISOString();

    // Get total users
    const { count: totalUsers, error: totalUsersError } = await supabase
      .from('users')
      .select('id', { count: 'exact', head: true });
    if (totalUsersError) throw totalUsersError;

    // Get users created since yesterday (for "today's new users" count)
    const { count: newUsersTodayCount, error: newUsersTodayError } = await supabase
      .from('users')
      .select('id', { count: 'exact', head: true })
      .gte('created_at', yesterdayISO); // Users created from start of yesterday until now
    if (newUsersTodayError) throw newUsersTodayError;

    // Get users created in the 24h period of yesterday
    const { count: newUsersYesterdayCount, error: newUsersYesterdayError } = await supabase
      .from('users')
      .select('id', { count: 'exact', head: true })
      .gte('created_at', yesterdayISO)
      .lt('created_at', todayISO);
    if (newUsersYesterdayError) throw newUsersYesterdayError;

    // Calculate trend for "today" vs "yesterday"
    const safeNewUsersToday = newUsersTodayCount ?? 0;
    const safeNewUsersYesterday = newUsersYesterdayCount ?? 0;
    const trend = safeNewUsersYesterday > 0 
        ? parseFloat((((safeNewUsersToday - safeNewUsersYesterday) / safeNewUsersYesterday) * 100).toFixed(2)) 
        : (safeNewUsersToday > 0 ? 100 : 0);

    // Get users created in the last 7 days (this week)
    const { count: weekCount, error: weekCountError } = await supabase
      .from('users')
      .select('id', { count: 'exact', head: true })
      .gte('created_at', sevenDaysAgoISO);
    if (weekCountError) throw weekCountError;

    // Get users created between 14 days ago and 7 days ago (last week)
    const { count: lastWeekCount, error: lastWeekCountError } = await supabase
      .from('users')
      .select('id', { count: 'exact', head: true })
      .gte('created_at', fourteenDaysAgoISO)
      .lt('created_at', sevenDaysAgoISO);
    if (lastWeekCountError) throw lastWeekCountError;
    
    const safeWeekCount = weekCount ?? 0;
    const safeLastWeekCount = lastWeekCount ?? 0;
    const weekTrend = safeLastWeekCount > 0 
        ? parseFloat((((safeWeekCount - safeLastWeekCount) / safeLastWeekCount) * 100).toFixed(2)) 
        : (safeWeekCount > 0 ? 100 : 0);

    // Get users created in the last 30 days (this month)
    const { count: monthCount, error: monthCountError } = await supabase
      .from('users')
      .select('id', { count: 'exact', head: true })
      .gte('created_at', thirtyDaysAgoISO);
    if (monthCountError) throw monthCountError;

    // Get users created between 60 days ago and 30 days ago (last month)
    const { count: lastMonthCount, error: lastMonthCountError } = await supabase
      .from('users')
      .select('id', { count: 'exact', head: true })
      .gte('created_at', sixtyDaysAgoISO)
      .lt('created_at', thirtyDaysAgoISO);
    if (lastMonthCountError) throw lastMonthCountError;

    const safeMonthCount = monthCount ?? 0;
    const safeLastMonthCount = lastMonthCount ?? 0;
    const monthTrend = safeLastMonthCount > 0 
        ? parseFloat((((safeMonthCount - safeLastMonthCount) / safeLastMonthCount) * 100).toFixed(2)) 
        : (safeMonthCount > 0 ? 100 : 0);

    res.status(200).json({
      totalUsers: totalUsers ?? 0,
      yesterdayCount: newUsersTodayCount ?? 0, // This is effectively "new users since yesterday morning"
      trend,
      weekCount: safeWeekCount,
      lastWeekCount: safeLastWeekCount,
      weekTrend,
      monthCount: safeMonthCount,
      lastMonthCount: safeLastMonthCount,
      monthTrend,
    });
  } catch (error) {
    console.error('Error fetching user stats:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
} 