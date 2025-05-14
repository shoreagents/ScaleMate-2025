import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FaUserPlus, FaUsers, FaSitemap, FaStar, FaFileInvoice, FaDownload, FaPlus, FaCheckDouble, FaExclamationTriangle, FaInfoCircle, FaDatabase, FaArrowUp, FaArrowDown, FaRobot } from 'react-icons/fa';
import { FiCheck } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { testSupabaseConnection, testOpenAIConnection } from '@/lib/test-connection';
import { supabase } from '@/lib/supabase';
import { createClient } from '@supabase/supabase-js';

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #F9FAFB;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 1.5rem;
  background-color: #F9FAFB;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const StatsPanel = styled.section`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 24px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const StatCard = styled.div`
  background-color: white;
  padding: 24px;
  border-radius: 12px;
  border: 1px solid #E5E7EB;
  @media (max-width: 500px) {
    padding: 12px;
  }
`;

const StatHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  @media (max-width: 500px) {
    margin-bottom: 8px;
  }
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
  @media (max-width: 500px) {
    width: 32px;
    height: 32px;
    font-size: 1rem;
  }
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
  min-height: 28.8px;
  @media (max-width: 500px) {
    font-size: 1.1rem;
    min-height: 21.6px;
  }
`;

const StatLabel = styled.p`
  color: rgba(15, 23, 42, 0.7);
  margin: 0;
  min-height: 20px;
  @media (max-width: 500px) {
    font-size: 0.85rem;
    min-height: 18px;
  }
`;

const TrendIndicator = styled.div<{ $isPositive: boolean }>`
  margin-top: 8px;
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  color: ${props => props.$isPositive ? '#00E915' : '#EC297B'};
  min-height: 20px;
  @media (max-width: 500px) {
    font-size: 0.75rem;
    margin-top: 4px;
    min-height: 18px;
  }
`;

const TopRolesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  @media (max-width: 500px) {
    gap: 4px;
  }
`;

const RoleItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const RoleLabel = styled.span`
  font-size: 0.875rem;
  color: rgba(15, 23, 42, 0.7);
  @media (max-width: 500px) {
    font-size: 0.75rem;
  }
`;

const RoleValue = styled.span`
  font-size: 0.875rem;
  font-weight: 700;
  color: #0F172A;
  @media (max-width: 500px) {
    font-size: 0.75rem;
  }
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;

  @media (min-width: 768px) {
    grid-template-columns: 2fr 1fr;
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
  @media (max-width: 500px) {
    padding: 12px;
  }
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
  height: calc(5 * (48px + 16px)); /* 5 items * (item height + gap) */
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
`;

const ActivityText = styled.p`
  color: #0F172A;
  margin: 0;
  white-space: normal;
  word-wrap: break-word;
  line-height: 1.4;
  flex: 1;
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
  @media (max-width: 500px) {
    padding: 12px;
  }
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
      try {
        const res = await fetch('/api/admin/database-status');
        if (!res.ok) throw new Error('Failed to fetch database status');
        const data = await res.json();
        setDbStatus({
          success: data.success,
          message: data.message,
          lastChecked: new Date(data.lastChecked)
        });
      } catch (error) {
        console.error('Error checking database status:', error);
        setDbStatus({
          success: false,
          message: 'Failed to check database status',
          lastChecked: new Date()
        });
      }
    };

    // Initial check
    checkDatabaseStatus();

    // Check every 15 seconds
    const interval = setInterval(checkDatabaseStatus, 15000);

    return () => clearInterval(interval);
  }, []);

  const fetchUserStats = async () => {
    try {
      const res = await fetch('/api/admin/user-stats');
      if (!res.ok) throw new Error('Failed to fetch user stats');
      const data = await res.json();
      setUserStats(data);
    } catch (error) {
      console.error('Error fetching user stats:', error);
    }
  };

  useEffect(() => {
    fetchUserStats();
  }, []);

  useEffect(() => {
    const fetchRecentActivities = async () => {
      try {
        const { data: activities, error } = await supabase
          .from('users')
          .select('id, full_name, email, created_at')
          .order('created_at', { ascending: false })
          .limit(5);

        if (error) throw error;
        setRecentActivities(activities || []);
      } catch (error) {
        console.error('Error fetching recent activities:', error);
      }
    };

    fetchRecentActivities();
    // Refresh activities every minute
    const interval = setInterval(fetchRecentActivities, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const checkOpenAIStatus = async () => {
      let statusData: OpenAIStatus = {
        success: false,
        message: 'Failed to check OpenAI status',
        lastChecked: new Date()
      };
      try {
        const res = await fetch('/api/admin/openai-status');
        const data = await res.json(); // Attempt to parse JSON regardless of res.ok
        if (!res.ok) {
          // Use message from API response if available, otherwise throw generic error
          statusData.message = data?.message || 'Failed to fetch OpenAI status';
          throw new Error(statusData.message);
        }
        statusData = {
          success: data.success,
          message: data.message,
          lastChecked: new Date(data.lastChecked)
        };
      } catch (error) {
        console.error('Error checking OpenAI status:', error);
        // If statusData.message wasn't updated from API response, it keeps the default
      }
      setOpenAIStatus(statusData);
    };

    checkOpenAIStatus();
    const interval = setInterval(checkOpenAIStatus, 5 * 60 * 1000); // Check every 5 minutes

    return () => clearInterval(interval);
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
                  ? (userStats.yesterdayCount ?? 0).toLocaleString()
                  : timePeriod === 'week'
                    ? (userStats.weekCount ?? 0).toLocaleString()
                    : (userStats.monthCount ?? 0).toLocaleString()}
              </StatValue>
              <StatLabel>New Users</StatLabel>
              <TrendIndicator $isPositive={
                timePeriod === 'today' 
                  ? (userStats.trend ?? 0) >= 0 
                  : timePeriod === 'week'
                    ? (userStats.weekTrend ?? 0) >= 0
                    : (userStats.monthTrend ?? 0) >= 0
              }>
                {timePeriod === 'today' 
                  ? ((userStats.trend ?? 0) >= 0 ? <FaArrowUp /> : <FaArrowDown />)
                  : timePeriod === 'week'
                    ? ((userStats.weekTrend ?? 0) >= 0 ? <FaArrowUp /> : <FaArrowDown />)
                    : ((userStats.monthTrend ?? 0) >= 0 ? <FaArrowUp /> : <FaArrowDown />)
                }
                <span style={{ marginLeft: '4px' }}>
                  {timePeriod === 'today' 
                    ? `${(userStats.trend ?? 0) >= 0 ? '+' : ''}${userStats.trend ?? 0}% vs yesterday`
                    : timePeriod === 'week'
                      ? `${(userStats.weekTrend ?? 0) >= 0 ? '+' : ''}${userStats.weekTrend ?? 0}% vs last week`
                      : `${(userStats.monthTrend ?? 0) >= 0 ? '+' : ''}${userStats.monthTrend ?? 0}% vs last month`}
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