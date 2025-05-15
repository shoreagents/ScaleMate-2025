import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FaUserPlus, FaUsers, FaSitemap, FaStar, FaFileInvoice, FaDownload, FaPlus, FaCheckDouble, FaExclamationTriangle, FaInfoCircle, FaDatabase, FaArrowUp, FaArrowDown, FaRobot } from 'react-icons/fa';
import { FiCheck } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { supabase } from '@/lib/supabase';
import { createClient } from '@supabase/supabase-js';

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #F9FAFB;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 2rem;
  background-color: #F9FAFB;
  @media only screen and (max-width: 1023px) {
    padding: 1.5rem;
  }
  @media only screen and (max-width: 767px) {
    padding: 1rem;
  }
  @media only screen and (max-width: 480px) {
    padding: 0.5rem;
  }
  @media only screen and (max-width: 320px) {
    padding: 0.25rem;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const StatsPanel = styled.section`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 32px;

  @media only screen and (max-width: 1023px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
  }

  @media only screen and (max-width: 767px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }

  @media only screen and (max-width: 480px) {
    grid-template-columns: repeat(1, 1fr);
    gap: 10px;
  }

  @media only screen and (max-width: 320px) {
    grid-template-columns: repeat(1, 1fr);
    gap: 4px;
  }
`;

const StatCard = styled.div`
  background-color: white;
  padding: 24px;
  border-radius: 12px;
  border: 1px solid #E5E7EB;
  width: 100%;
`;

const StatHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const IconContainer = styled.div<{ $color: string }>`
  width: 48px;
  height: 48px;
  background-color: ${props => `${props.$color}10`};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.$color};
  font-size: 1.25rem;
`;

const TimeLabel = styled.span`
  font-size: 0.875rem;
  color: rgba(15, 23, 42, 0.6);
  cursor: pointer;
  user-select: none;
  &:hover {
    color: #3B82F6;
  }
`;

const StatValue = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: #0F172A;
  margin: 0;
`;

const StatLabel = styled.p`
  color: rgba(15, 23, 42, 0.7);
  margin: 0;
`;

const TrendIndicator = styled.div<{ $isPositive: boolean }>`
  margin-top: 8px;
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  color: ${props => props.$isPositive ? '#00E915' : '#EC297B'};
`;

const TopRolesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const RoleItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const RoleLabel = styled.span`
  font-size: 0.875rem;
  color: rgba(15, 23, 42, 0.7);
`;

const RoleValue = styled.span`
  font-size: 0.875rem;
  font-weight: 700;
  color: #0F172A;
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 32px;

  @media only screen and (max-width: 1023px) {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  @media only screen and (max-width: 767px) {
    gap: 16px;
  }

  @media only screen and (max-width: 480px) {
    gap: 10px;
  }

  @media only screen and (max-width: 320px) {
    gap: 4px;
  }
`;

const ActivityFeed = styled.div`
  background-color: white;
  border-radius: 12px;
  border: 1px solid #E5E7EB;
  padding: 24px;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const SectionTitle = styled.h2`
  font-size: 1.125rem;
  font-weight: 700;
  margin-bottom: 24px;
  color: #0F172A;
  flex-shrink: 0;
`;

const ActivityList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow-y: auto;
  height: calc(5 * (48px + 16px));
  padding-right: 16px;

  /* Custom scrollbar styles */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #F3F4F6;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: #D1D5DB;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #9CA3AF;
  }
`;

const ActivityItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  min-height: 48px;
  flex-shrink: 0;
  position: relative;
`;

const ActivityIcon = styled.div<{ $color: string }>`
  width: 32px;
  height: 32px;
  background-color: ${props => `${props.$color}10`};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.$color};
  flex-shrink: 0;
  margin-top: 2px; /* Align icon with text */
`;

const ActivityContent = styled.div`
  flex: 1;
  min-width: 0;
  padding: 2px 0;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;

  @media only screen and (max-width: 480px) {
    flex-direction: column;
    gap: 4px;
    align-items: flex-start;
  }
`;

const ActivityText = styled.p`
  color: #0F172A;
  margin: 0;
  white-space: normal;
  line-height: 1.4;
  flex: 1;
  min-width: 0;
  max-width: 100%;
`;

const ActivityTime = styled.p`
  font-size: 0.875rem;
  color: rgba(15, 23, 42, 0.6);
  margin: 0;
  white-space: nowrap;
`;

const QuickActions = styled.div`
  background-color: white;
  border-radius: 12px;
  border: 1px solid #E5E7EB;
  padding: 24px;
`;

const ActionButton = styled.button<{ $primary?: boolean }>`
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  margin-bottom: 16px;

  ${props => props.$primary ? `
    background-color: #3B82F6;
    color: white;
    border: none;
    &:hover {
      background-color: #2563EB;
    }
  ` : `
    background-color: white;
    color: #3B82F6;
    border: 1px solid #3B82F6;
    &:hover {
      background-color: #3B82F6;
      color: white;
    }
  `}
`;

const SystemWarnings = styled.section`
  background-color: white;
  border-radius: 12px;
  border: 1px solid #E5E7EB;
  padding: 24px;
`;

const WarningList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const WarningItem = styled.div<{ $type: 'error' | 'info' }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border-radius: 8px;
  background-color: ${props => props.$type === 'error' ? '#EC297B10' : '#F9FAFB'};
`;

const WarningContent = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const WarningIcon = styled.div<{ $type: 'error' | 'info' }>`
  color: ${props => props.$type === 'error' ? '#EC297B' : '#3B82F6'};
  font-size: 1.25rem;
`;

const WarningText = styled.div``;

const WarningTitle = styled.p<{ $type: 'error' | 'info' }>`
  font-weight: 600;
  color: ${props => props.$type === 'error' ? '#EC297B' : '#0F172A'};
  margin: 0;
`;

const WarningDescription = styled.p`
  font-size: 0.875rem;
  color: rgba(15, 23, 42, 0.6);
  margin: 0;
`;

const WarningTime = styled.span`
  font-size: 0.875rem;
  color: rgba(15, 23, 42, 0.6);
`;

// Create admin client with service role key
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

interface DatabaseStatus {
  success: boolean;
  message: string;
  lastChecked: Date;
}

interface UserStats {
  totalUsers: number;
  yesterdayCount: number;
  trend: number;
  weekCount?: number;
  lastWeekCount?: number;
  weekTrend?: number;
  monthCount?: number;
  lastMonthCount?: number;
  monthTrend?: number;
}

interface UserActivity {
  id: string;
  full_name: string;
  email: string;
  created_at: string;
}

interface OpenAIStatus {
  success: boolean;
  message: string;
  lastChecked: Date;
}

const DashboardTab: React.FC = () => {
  const router = useRouter();
  const [dbStatus, setDbStatus] = useState<DatabaseStatus | null>(null);
  const [userStats, setUserStats] = useState<UserStats>({ 
    totalUsers: 0, 
    yesterdayCount: 0, 
    trend: 0,
    weekCount: 0,
    lastWeekCount: 0,
    weekTrend: 0,
    monthCount: 0,
    lastMonthCount: 0,
    monthTrend: 0
  });
  const [timePeriod, setTimePeriod] = useState<'today' | 'week' | 'month'>('today');
  const [recentActivities, setRecentActivities] = useState<UserActivity[]>([]);
  const [openAIStatus, setOpenAIStatus] = useState<OpenAIStatus | null>(null);

  // Function to format time ago
  const getTimeAgo = (date: string | Date) => {
    const now = new Date();
    const activityDate = typeof date === 'string' ? new Date(date) : date;
    const diffInSeconds = Math.floor((now.getTime() - activityDate.getTime()) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  };

  useEffect(() => {
    const checkDatabaseStatus = async () => {
      // Initial check
      checkDatabaseStatus();

      // Check every 15 seconds instead of 30
      const interval = setInterval(checkDatabaseStatus, 15000);

      return () => clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        // Set up date ranges
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const todayISO = today.toISOString();

        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayISO = yesterday.toISOString();

        // Get this week's start (Sunday)
        const thisWeek = new Date(today);
        thisWeek.setDate(today.getDate() - today.getDay());
        thisWeek.setHours(0, 0, 0, 0);
        const thisWeekISO = thisWeek.toISOString();

        // Get last week's start
        const lastWeek = new Date(thisWeek);
        lastWeek.setDate(lastWeek.getDate() - 7);
        const lastWeekISO = lastWeek.toISOString();

        // Get this month's start
        const thisMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const thisMonthISO = thisMonth.toISOString();

        // Get last month's start
        const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        const lastMonthISO = lastMonth.toISOString();

        // Get active users created today
        const { data: activeUsersToday, error: activeUsersTodayError } = await supabaseAdmin
          .from('users')
          .select('id')
          .eq('is_active', true)
          .gte('created_at', todayISO);

        if (activeUsersTodayError) {
          console.error('Error fetching active users today:', activeUsersTodayError);
          return;
        }

        // Get active users created yesterday
        const { data: activeUsersYesterday, error: activeUsersYesterdayError } = await supabaseAdmin
          .from('users')
          .select('id')
          .eq('is_active', true)
          .gte('created_at', yesterdayISO)
          .lt('created_at', todayISO);

        if (activeUsersYesterdayError) {
          console.error('Error fetching active users yesterday:', activeUsersYesterdayError);
          return;
        }

        // Get this week's users
        const { data: activeUsersThisWeek, error: activeUsersThisWeekError } = await supabaseAdmin
          .from('users')
          .select('id')
          .eq('is_active', true)
          .gte('created_at', thisWeekISO);

        if (activeUsersThisWeekError) {
          console.error('Error fetching this week users:', activeUsersThisWeekError);
          return;
        }

        // Get last week's users
        const { data: activeUsersLastWeek, error: activeUsersLastWeekError } = await supabaseAdmin
          .from('users')
          .select('id')
          .eq('is_active', true)
          .gte('created_at', lastWeekISO)
          .lt('created_at', thisWeekISO);

        if (activeUsersLastWeekError) {
          console.error('Error fetching last week users:', activeUsersLastWeekError);
          return;
        }

        // Get this month's users
        const { data: activeUsersThisMonth, error: activeUsersThisMonthError } = await supabaseAdmin
          .from('users')
          .select('id')
          .eq('is_active', true)
          .gte('created_at', thisMonthISO);

        if (activeUsersThisMonthError) {
          console.error('Error fetching this month users:', activeUsersThisMonthError);
          return;
        }

        // Get last month's users
        const { data: activeUsersLastMonth, error: activeUsersLastMonthError } = await supabaseAdmin
          .from('users')
          .select('id')
          .eq('is_active', true)
          .gte('created_at', lastMonthISO)
          .lt('created_at', thisMonthISO);

        if (activeUsersLastMonthError) {
          console.error('Error fetching last month users:', activeUsersLastMonthError);
          return;
        }

        // Get counts for today and yesterday
        const { data: todayData, error: todayError } = await supabaseAdmin
          .from('user_roles')
          .select('user_id', { count: 'exact' })
          .eq('role', 'user')
          .in('user_id', activeUsersToday?.map(user => user.id) || []);

        if (todayError) {
          console.error('Error fetching today user stats:', todayError);
          return;
        }

        const { data: yesterdayData, error: yesterdayError } = await supabaseAdmin
          .from('user_roles')
          .select('user_id', { count: 'exact' })
          .eq('role', 'user')
          .in('user_id', activeUsersYesterday?.map(user => user.id) || []);

        if (yesterdayError) {
          console.error('Error fetching yesterday user stats:', yesterdayError);
          return;
        }

        // Get counts for this week and last week
        const { data: thisWeekData, error: thisWeekError } = await supabaseAdmin
          .from('user_roles')
          .select('user_id', { count: 'exact' })
          .eq('role', 'user')
          .in('user_id', activeUsersThisWeek?.map(user => user.id) || []);

        if (thisWeekError) {
          console.error('Error fetching this week user stats:', thisWeekError);
          return;
        }

        const { data: lastWeekData, error: lastWeekError } = await supabaseAdmin
          .from('user_roles')
          .select('user_id', { count: 'exact' })
          .eq('role', 'user')
          .in('user_id', activeUsersLastWeek?.map(user => user.id) || []);

        if (lastWeekError) {
          console.error('Error fetching last week user stats:', lastWeekError);
          return;
        }

        // Get counts for this month and last month
        const { data: thisMonthData, error: thisMonthError } = await supabaseAdmin
          .from('user_roles')
          .select('user_id', { count: 'exact' })
          .eq('role', 'user')
          .in('user_id', activeUsersThisMonth?.map(user => user.id) || []);

        if (thisMonthError) {
          console.error('Error fetching this month user stats:', thisMonthError);
          return;
        }

        const { data: lastMonthData, error: lastMonthError } = await supabaseAdmin
          .from('user_roles')
          .select('user_id', { count: 'exact' })
          .eq('role', 'user')
          .in('user_id', activeUsersLastMonth?.map(user => user.id) || []);

        if (lastMonthError) {
          console.error('Error fetching last month user stats:', lastMonthError);
          return;
        }

        const todayCount = todayData?.length || 0;
        const yesterdayCount = yesterdayData?.length || 0;
        const thisWeekCount = thisWeekData?.length || 0;
        const lastWeekCount = lastWeekData?.length || 0;
        const thisMonthCount = thisMonthData?.length || 0;
        const lastMonthCount = lastMonthData?.length || 0;
        
        // Calculate trends
        let trend = 0;
        if (yesterdayCount > 0) {
          trend = ((todayCount - yesterdayCount) / yesterdayCount) * 100;
        } else if (todayCount > 0) {
          trend = 100;
        }

        let weekTrend = 0;
        if (lastWeekCount > 0) {
          weekTrend = ((thisWeekCount - lastWeekCount) / lastWeekCount) * 100;
        } else if (thisWeekCount > 0) {
          weekTrend = 100;
        }

        let monthTrend = 0;
        if (lastMonthCount > 0) {
          monthTrend = ((thisMonthCount - lastMonthCount) / lastMonthCount) * 100;
        } else if (thisMonthCount > 0) {
          monthTrend = 100;
        }

        console.log('Debug - User stats:', {
          todayCount,
          yesterdayCount,
          thisWeekCount,
          lastWeekCount,
          thisMonthCount,
          lastMonthCount,
          trend,
          weekTrend,
          monthTrend
        });

        setUserStats({
          totalUsers: todayCount,
          yesterdayCount: yesterdayCount,
          trend: Math.round(trend),
          weekCount: thisWeekCount,
          lastWeekCount: lastWeekCount,
          weekTrend: Math.round(weekTrend),
          monthCount: thisMonthCount,
          lastMonthCount: lastMonthCount,
          monthTrend: Math.round(monthTrend)
        });
      } catch (error) {
        console.error('Error in fetchUserStats:', error);
      }
    };

    fetchUserStats();
  }, []);

  useEffect(() => {
    const fetchRecentActivities = async () => {
      try {
        const { data: activities, error } = await supabaseAdmin
          .from('users')
          .select('id, full_name, email, created_at')
          .order('created_at', { ascending: false })
          .limit(5);

        if (error) {
          console.error('Error fetching recent activities:', error);
          return;
        }

        setRecentActivities(activities || []);
      } catch (error) {
        console.error('Error in fetchRecentActivities:', error);
      }
    };

    fetchRecentActivities();
    // Refresh activities every minute
    const interval = setInterval(fetchRecentActivities, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const checkOpenAIStatus = async () => {
      // Check every 5 minutes
      const interval = setInterval(checkOpenAIStatus, 5 * 60 * 1000);

      return () => clearInterval(interval);
    };
  }, []);

  const handleTimePeriodToggle = () => {
    setTimePeriod(prev => {
      switch (prev) {
        case 'today':
          return 'week';
        case 'week':
          return 'month';
        case 'month':
          return 'today';
        default:
          return 'today';
      }
    });
  };

  return (
    <DashboardContainer>
      <MainContent>
        <Container>
          <StatsPanel>
            <StatCard>
              <StatHeader>
                <IconContainer $color="#3B82F6">
                  <FaUserPlus />
                </IconContainer>
                <TimeLabel>This Week</TimeLabel>
              </StatHeader>
              <StatValue>247</StatValue>
              <StatLabel>Total Leads</StatLabel>
              <TrendIndicator $isPositive={true}>
                <FaUserPlus style={{ marginRight: '4px' }} />
                <span>12% vs last week</span>
              </TrendIndicator>
            </StatCard>

            <StatCard>
              <StatHeader>
                <IconContainer $color="#EC297B">
                  <FaUsers />
                </IconContainer>
                <TimeLabel onClick={handleTimePeriodToggle}>
                  {timePeriod === 'today' ? 'Today' : timePeriod === 'week' ? 'This Week' : 'This Month'}
                </TimeLabel>
              </StatHeader>
              <StatValue>
                {timePeriod === 'today' 
                  ? userStats.totalUsers.toLocaleString()
                  : timePeriod === 'week'
                    ? userStats.weekCount?.toLocaleString()
                    : userStats.monthCount?.toLocaleString()}
              </StatValue>
              <StatLabel>New Users</StatLabel>
              <TrendIndicator $isPositive={
                timePeriod === 'today' 
                  ? userStats.trend >= 0 
                  : timePeriod === 'week'
                    ? userStats.weekTrend! >= 0
                    : userStats.monthTrend! >= 0
              }>
                {timePeriod === 'today' 
                  ? (userStats.trend >= 0 ? <FaArrowUp /> : <FaArrowDown />)
                  : timePeriod === 'week'
                    ? (userStats.weekTrend! >= 0 ? <FaArrowUp /> : <FaArrowDown />)
                    : (userStats.monthTrend! >= 0 ? <FaArrowUp /> : <FaArrowDown />)
                }
                <span style={{ marginLeft: '4px' }}>
                  {timePeriod === 'today' 
                    ? `${userStats.trend >= 0 ? '+' : ''}${userStats.trend}% vs yesterday`
                    : timePeriod === 'week'
                      ? `${userStats.weekTrend! >= 0 ? '+' : ''}${userStats.weekTrend}% vs last week`
                      : `${userStats.monthTrend! >= 0 ? '+' : ''}${userStats.monthTrend}% vs last month`}
                </span>
              </TrendIndicator>
            </StatCard>

            <StatCard>
              <StatHeader>
                <IconContainer $color="#00E915">
                  <FaSitemap />
                </IconContainer>
                <TimeLabel>This Month</TimeLabel>
              </StatHeader>
              <StatValue>156</StatValue>
              <StatLabel>New Roles Generated</StatLabel>
              <TrendIndicator $isPositive={false}>
                <FaUserPlus style={{ marginRight: '4px' }} />
                <span>3% vs last month</span>
              </TrendIndicator>
            </StatCard>

            <StatCard>
              <StatHeader>
                <IconContainer $color="#3B82F6">
                  <FaStar />
                </IconContainer>
                <TimeLabel>Top Roles</TimeLabel>
              </StatHeader>
              <TopRolesContainer>
                <RoleItem>
                  <RoleLabel>VA</RoleLabel>
                  <RoleValue>42%</RoleValue>
                </RoleItem>
                <RoleItem>
                  <RoleLabel>CSR</RoleLabel>
                  <RoleValue>28%</RoleValue>
                </RoleItem>
              </TopRolesContainer>
            </StatCard>
          </StatsPanel>

          <ContentGrid>
            <ActivityFeed>
              <SectionTitle>Recent Activities</SectionTitle>
              <ActivityList>
                {recentActivities.map((activity) => (
                  <ActivityItem key={activity.id}>
                    <ActivityIcon $color="#EC297B">
                      <FaUserPlus />
                    </ActivityIcon>
                    <ActivityContent>
                      <ActivityText>
                        New user: <strong>{activity.full_name}</strong>
                        <br />
                        <span style={{ fontSize: '0.875rem', color: 'rgba(15, 23, 42, 0.6)' }}>
                          {activity.email}
                        </span>
                      </ActivityText>
                      <ActivityTime>{getTimeAgo(activity.created_at)}</ActivityTime>
                    </ActivityContent>
                  </ActivityItem>
                ))}

                {/* Static reference items */}
                <ActivityItem>
                  <ActivityIcon $color="#3B82F6">
                    <FaFileInvoice />
                  </ActivityIcon>
                  <ActivityContent>
                    <ActivityText>New quote generated for <strong>TechCorp Inc.</strong></ActivityText>
                    <ActivityTime>2 minutes ago</ActivityTime>
                  </ActivityContent>
                </ActivityItem>
                <ActivityItem>
                  <ActivityIcon $color="#00E915">
                    <FaDownload />
                  </ActivityIcon>
                  <ActivityContent>
                    <ActivityText><strong>Role Blueprint</strong> downloaded by John Smith</ActivityText>
                    <ActivityTime>15 minutes ago</ActivityTime>
                  </ActivityContent>
                </ActivityItem>
              </ActivityList>
            </ActivityFeed>

            <QuickActions>
              <SectionTitle>Quick Actions</SectionTitle>
              <ActionButton $primary>
                <FaPlus />
                Post New Blog
              </ActionButton>
              <ActionButton>
                <FaUserPlus />
                Create User
              </ActionButton>
              <ActionButton>
                <FaCheckDouble />
                Review New Roles
              </ActionButton>
            </QuickActions>
          </ContentGrid>

          <SystemWarnings>
            <SectionTitle>System Health</SectionTitle>
            <WarningList>
              <WarningItem $type="info">
                <WarningContent>
                  <WarningIcon $type="info">
                    <FaInfoCircle />
                  </WarningIcon>
                  <WarningText>
                    <WarningTitle $type="info">System Update</WarningTitle>
                    <WarningDescription>New version deployment completed</WarningDescription>
                  </WarningText>
                </WarningContent>
                <WarningTime>1 hour ago</WarningTime>
              </WarningItem>
              <WarningItem $type={dbStatus?.success ? 'info' : 'error'}>
                <WarningContent>
                  <WarningIcon $type={dbStatus?.success ? 'info' : 'error'}>
                    <FaDatabase />
                  </WarningIcon>
                  <WarningText>
                    <WarningTitle $type={dbStatus?.success ? 'info' : 'error'}>
                      Database Connection
                    </WarningTitle>
                    <WarningDescription>
                      {dbStatus?.success 
                        ? 'Connection healthy' 
                        : `Connection issue: ${dbStatus?.message}`}
                    </WarningDescription>
                  </WarningText>
                </WarningContent>
                <WarningTime>
                  {dbStatus?.lastChecked 
                    ? getTimeAgo(dbStatus.lastChecked)
                    : 'Checking...'}
                </WarningTime>
              </WarningItem>
              <WarningItem $type={openAIStatus?.success ? 'info' : 'error'}>
                <WarningContent>
                  <WarningIcon $type={openAIStatus?.success ? 'info' : 'error'}>
                    <FaRobot />
                  </WarningIcon>
                  <WarningText>
                    <WarningTitle $type={openAIStatus?.success ? 'info' : 'error'}>
                      OpenAI Connection
                    </WarningTitle>
                    <WarningDescription>
                      {openAIStatus?.success 
                        ? 'Connection healthy' 
                        : `Connection issue: ${openAIStatus?.message}`}
                    </WarningDescription>
                  </WarningText>
                </WarningContent>
                <WarningTime>
                  {openAIStatus?.lastChecked 
                    ? getTimeAgo(openAIStatus.lastChecked)
                    : 'Checking...'}
                </WarningTime>
              </WarningItem>
            </WarningList>
          </SystemWarnings>
        </Container>
      </MainContent>
    </DashboardContainer>
  );
};

export default DashboardTab; 