import React, { useState, useEffect, useCallback } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaUserPlus, FaUsers, FaSitemap, FaStar, FaFileInvoice, FaDownload, FaPlus, FaCheckDouble, FaExclamationTriangle, FaInfoCircle, FaDatabase, FaArrowUp, FaArrowDown, FaRobot, FaSync } from 'react-icons/fa';
import { FiCheck } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { supabase } from '@/lib/supabase';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { Tooltip } from '@/components/ui/Tooltip';

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
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

const StatusHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const RefreshIcon = styled(FaSync)<{ $isRefreshing: boolean }>`
  animation: ${props => props.$isRefreshing ? spin : 'none'} 1s linear infinite;
`;

const RefreshButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 6px;
  color: #6B7280;
  border: none;
  background: none;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    color: #4B5563;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ErrorDetails = styled.div`
  margin-top: 8px;
  padding: 8px;
  background-color: #FEF2F2;
  border: 1px solid #FEE2E2;
  border-radius: 4px;
  font-family: monospace;
  font-size: 0.75rem;
  color: #991B1B;
  white-space: pre-wrap;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease-out;

  &.expanded {
    max-height: 200px;
  }
`;

const ExpandButton = styled.button`
  background: none;
  border: none;
  color: #6B7280;
  font-size: 0.75rem;
  cursor: pointer;
  padding: 4px 8px;
  margin-top: 4px;
  border-radius: 4px;

  &:hover {
    background-color: #F3F4F6;
  }
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
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
`;

const LatencyText = styled.span`
  font-size: 0.75rem;
  color: rgba(15, 23, 42, 0.5);
`;

interface SystemStatus {
  database: {
    success: boolean;
    message: string;
    lastChecked: Date;
    error?: {
      code: string;
      message: string;
      details?: string;
      timestamp: Date;
    };
    latency?: number;
  };
  openai: {
    success: boolean;
    message: string;
    lastChecked: Date;
    error?: {
      code: string;
      message: string;
      details?: string;
      timestamp: Date;
    };
  };
}

interface UserStats {
  totalUsers: number;
  yesterdayCount: number;
  trend: number;
  weekCount: number;
  lastWeekCount: number;
  weekTrend: number;
  monthCount: number;
  lastMonthCount: number;
  monthTrend: number;
}

const mockRecentActivities = [
  {
    id: '1',
    full_name: 'John Doe',
    email: 'john@example.com',
    created_at: new Date(Date.now() - 1000 * 60 * 5).toISOString() // 5 minutes ago
  },
  {
    id: '2',
    full_name: 'Jane Smith',
    email: 'jane@example.com',
    created_at: new Date(Date.now() - 1000 * 60 * 15).toISOString() // 15 minutes ago
  },
  {
    id: '3',
    full_name: 'Bob Johnson',
    email: 'bob@example.com',
    created_at: new Date(Date.now() - 1000 * 60 * 30).toISOString() // 30 minutes ago
  },
  {
    id: '4',
    full_name: 'Alice Brown',
    email: 'alice@example.com',
    created_at: new Date(Date.now() - 1000 * 60 * 45).toISOString() // 45 minutes ago
  },
  {
    id: '5',
    full_name: 'Charlie Wilson',
    email: 'charlie@example.com',
    created_at: new Date(Date.now() - 1000 * 60 * 60).toISOString() // 1 hour ago
  }
];

const mockSystemStatus: SystemStatus = {
  database: {
    success: true,
    message: 'Connection healthy',
    lastChecked: new Date(),
    latency: 0
  },
  openai: {
    success: true,
    message: 'OpenAI API connection healthy',
    lastChecked: new Date()
  }
};

const DashboardTab: React.FC = () => {
  const router = useRouter();
  const [timePeriod, setTimePeriod] = useState<'today' | 'week' | 'month'>('today');
  const [isLoading, setIsLoading] = useState(true);
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
  const [recentActivities] = useState(mockRecentActivities);
  const [systemStatus, setSystemStatus] = useState<SystemStatus>(mockSystemStatus);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const [expandedErrors, setExpandedErrors] = useState<{ [key: string]: boolean }>({});

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

  const getStatsForPeriod = () => {
    switch (timePeriod) {
      case 'week':
        return {
          count: userStats.weekCount,
          trend: userStats.weekTrend,
          label: 'This Week'
        };
      case 'month':
        return {
          count: userStats.monthCount,
          trend: userStats.monthTrend,
          label: 'This Month'
        };
      default:
        return {
          count: userStats.totalUsers,
          trend: userStats.trend,
          label: 'Today'
        };
    }
  };

  const stats = getStatsForPeriod();

  // Function to fetch user statistics
  const fetchUserStats = useCallback(async () => {
    try {
      // Get total users count (only role 'user')
      const { count: totalUsers, error: countError } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .eq('role', 'user');

      if (countError) throw countError;

      // Get yesterday's new users (only role 'user')
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      yesterday.setHours(0, 0, 0, 0);

      const { count: yesterdayCount, error: yesterdayError } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .eq('role', 'user')
        .gte('created_at', yesterday.toISOString());

      if (yesterdayError) throw yesterdayError;

      // Get last week's new users (only role 'user')
      const lastWeek = new Date();
      lastWeek.setDate(lastWeek.getDate() - 7);
      lastWeek.setHours(0, 0, 0, 0);

      const { count: weekCount, error: weekError } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .eq('role', 'user')
        .gte('created_at', lastWeek.toISOString());

      if (weekError) throw weekError;

      // Get last month's new users (only role 'user')
      const lastMonth = new Date();
      lastMonth.setMonth(lastMonth.getMonth() - 1);
      lastMonth.setHours(0, 0, 0, 0);

      const { count: monthCount, error: monthError } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .eq('role', 'user')
        .gte('created_at', lastMonth.toISOString());

      if (monthError) throw monthError;

      // Calculate trends (simplified for now)
      const trend = (yesterdayCount ?? 0) > 0 ? 100 : 0;
      const weekTrend = (weekCount ?? 0) > 0 ? 100 : 0;
      const monthTrend = (monthCount ?? 0) > 0 ? 100 : 0;

      setUserStats({
        totalUsers: totalUsers ?? 0,
        yesterdayCount: yesterdayCount ?? 0,
        trend,
        weekCount: weekCount ?? 0,
        lastWeekCount: 0, // TODO: Implement last week comparison
        weekTrend,
        monthCount: monthCount ?? 0,
        lastMonthCount: 0, // TODO: Implement last month comparison
        monthTrend
      });
    } catch (error) {
      console.error('Error fetching user stats:', error);
    }
  }, []);

  // Function to check database health
  const checkDatabaseHealth = useCallback(async () => {
    const startTime = Date.now();
    try {
      // Use a simple query that works on any Supabase database
      const { data, error } = await supabase
        .rpc('get_database_status')
        .select('*')
        .limit(1)
        .single();

      const latency = Date.now() - startTime;
      
      if (error) {
        // If the RPC doesn't exist, fall back to a simple connection test
        if (error.code === '42P01' || error.code === '42883') {
          const { error: connectionError } = await supabase
            .from('_prisma_migrations')
            .select('*')
            .limit(1);

          if (connectionError) {
            throw connectionError;
          }

          setSystemStatus(prev => ({
            ...prev,
            database: {
              success: true,
              message: 'Connection healthy',
              lastChecked: new Date(),
              latency
            }
          }));
          return;
        }
        throw error;
      }

      setSystemStatus(prev => ({
        ...prev,
        database: {
          success: true,
          message: 'Connection healthy',
          lastChecked: new Date(),
          latency
        }
      }));
    } catch (error: any) {
      console.error('Database health check failed:', error);
      setSystemStatus(prev => ({
        ...prev,
        database: {
          success: false,
          message: 'Connection failed',
          lastChecked: new Date(),
          error: {
            code: error.code || 'UNKNOWN_ERROR',
            message: error.message || 'An unknown error occurred',
            details: JSON.stringify({
              ...error,
              timestamp: new Date().toISOString(),
              context: 'Database health check failed during connection test'
            }, null, 2),
            timestamp: new Date()
          }
        }
      }));
    }
  }, []);

  // Function to check OpenAI status
  const checkOpenAIStatus = useCallback(async () => {
    try {
      // TODO: Implement actual OpenAI status check
      setSystemStatus(prev => ({
        ...prev,
        openai: {
          success: true,
          message: 'OpenAI API connection healthy',
          lastChecked: new Date()
        }
      }));
    } catch (error: any) {
      setSystemStatus(prev => ({
        ...prev,
        openai: {
          success: false,
          message: 'OpenAI API connection failed',
          lastChecked: new Date(),
          error: {
            code: error.code || 'UNKNOWN_ERROR',
            message: error.message || 'An unknown error occurred',
            details: JSON.stringify(error, null, 2),
            timestamp: new Date()
          }
        }
      }));
    }
  }, []);

  // Fetch user stats on component mount and when refreshing
  useEffect(() => {
    const loadInitialData = async () => {
      setIsLoading(true);
      try {
        await fetchUserStats();
      } finally {
        setIsLoading(false);
      }
    };
    loadInitialData();
  }, [fetchUserStats]);

  // Update handleRefresh to include loading state
  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    setShowTooltip(false);
    try {
      await Promise.all([
        checkDatabaseHealth(),
        checkOpenAIStatus(),
        fetchUserStats()
      ]);
    } finally {
      setIsRefreshing(false);
      // Show tooltip again after refresh completes
      setTimeout(() => setShowTooltip(true), 1000);
    }
  }, [checkDatabaseHealth, checkOpenAIStatus, fetchUserStats]);

  // Initial health check on component mount
  useEffect(() => {
    handleRefresh();
  }, [handleRefresh]);

  // Toggle error details expansion
  const toggleErrorDetails = (key: string) => {
    setExpandedErrors(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <DashboardContainer>
      <MainContent>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <Container>
            <StatsPanel>
              <StatCard>
                <StatHeader>
                  <IconContainer $color="#3B82F6">
                    <FaUserPlus />
                  </IconContainer>
                  <TimeLabel onClick={handleTimePeriodToggle}>{stats.label}</TimeLabel>
                </StatHeader>
                <StatValue>{stats.count}</StatValue>
                <StatLabel>New Users</StatLabel>
                <TrendIndicator $isPositive={stats.trend >= 0}>
                  {stats.trend >= 0 ? <FaArrowUp /> : <FaArrowDown />}
                  {Math.abs(stats.trend)}% from previous period
                </TrendIndicator>
              </StatCard>

              <StatCard>
                <StatHeader>
                  <IconContainer $color="#10B981">
                    <FaUsers />
                  </IconContainer>
                </StatHeader>
                <StatValue>{userStats.totalUsers}</StatValue>
                <StatLabel>Total Users</StatLabel>
              </StatCard>

              <StatCard>
                <StatHeader>
                  <IconContainer $color="#6366F1">
                    <FaSitemap />
                  </IconContainer>
                </StatHeader>
                <StatValue>24</StatValue>
                <StatLabel>Active Roles</StatLabel>
              </StatCard>

              <StatCard>
                <StatHeader>
                  <IconContainer $color="#F59E0B">
                    <FaStar />
                  </IconContainer>
                </StatHeader>
                <StatValue>4.8</StatValue>
                <StatLabel>Average Rating</StatLabel>
              </StatCard>
            </StatsPanel>

            <ContentGrid>
              <ActivityFeed>
                <SectionTitle>Recent Activity</SectionTitle>
                <ActivityList>
                  {recentActivities.map(activity => (
                    <ActivityItem key={activity.id}>
                      <ActivityIcon $color="#3B82F6">
                        <FaUserPlus />
                      </ActivityIcon>
                      <ActivityContent>
                        <ActivityText>
                          <strong>{activity.full_name}</strong> created an account
                        </ActivityText>
                        <ActivityTime>{getTimeAgo(activity.created_at)}</ActivityTime>
                      </ActivityContent>
                    </ActivityItem>
                  ))}
                </ActivityList>
              </ActivityFeed>

              <QuickActions>
                <SectionTitle>Quick Actions</SectionTitle>
                <ActionButton $primary onClick={() => router.push('/admin/users/new')}>
                  <FaPlus /> Add New User
                </ActionButton>
                <ActionButton onClick={() => router.push('/admin/export')}>
                  <FaDownload /> Export Data
                </ActionButton>
              </QuickActions>
            </ContentGrid>

            <SystemWarnings>
              <StatusHeader>
                <SectionTitle>System Status</SectionTitle>
                {showTooltip && (
                  <Tooltip 
                    text="Refresh Status"
                    position="bottom"
                  >
                    <RefreshButton 
                      onClick={handleRefresh} 
                      disabled={isRefreshing}
                    >
                      <RefreshIcon size={16} $isRefreshing={isRefreshing} />
                    </RefreshButton>
                  </Tooltip>
                )}
                {!showTooltip && (
                  <RefreshButton 
                    onClick={handleRefresh} 
                    disabled={isRefreshing}
                  >
                    <RefreshIcon size={16} $isRefreshing={isRefreshing} />
                  </RefreshButton>
                )}
              </StatusHeader>
              <WarningList>
                <WarningItem $type={systemStatus.database.success ? 'info' : 'error'}>
                  <WarningContent>
                    <WarningIcon $type={systemStatus.database.success ? 'info' : 'error'}>
                      <FaDatabase />
                    </WarningIcon>
                    <WarningText>
                      <WarningTitle $type={systemStatus.database.success ? 'info' : 'error'}>
                        Database Status
                      </WarningTitle>
                      <WarningDescription>
                        {systemStatus.database.message}
                      </WarningDescription>
                      {systemStatus.database.error && (
                        <>
                          <ErrorDetails className={expandedErrors.database ? 'expanded' : ''}>
                            {`Error Code: ${systemStatus.database.error.code}
Timestamp: ${systemStatus.database.error.timestamp.toISOString()}
Details: ${systemStatus.database.error.details}`}
                          </ErrorDetails>
                          <ExpandButton onClick={() => toggleErrorDetails('database')}>
                            {expandedErrors.database ? 'Hide Details' : 'Show Details'}
                          </ExpandButton>
                        </>
                      )}
                    </WarningText>
                  </WarningContent>
                  <WarningTime>
                    {getTimeAgo(systemStatus.database.lastChecked)}
                    {systemStatus.database.latency !== undefined && (
                      <LatencyText>Latency: {systemStatus.database.latency}ms</LatencyText>
                    )}
                  </WarningTime>
                </WarningItem>

                <WarningItem $type={systemStatus.openai.success ? 'info' : 'error'}>
                  <WarningContent>
                    <WarningIcon $type={systemStatus.openai.success ? 'info' : 'error'}>
                      <FaRobot />
                    </WarningIcon>
                    <WarningText>
                      <WarningTitle $type={systemStatus.openai.success ? 'info' : 'error'}>
                        OpenAI Status
                      </WarningTitle>
                      <WarningDescription>
                        {systemStatus.openai.message}
                      </WarningDescription>
                      {systemStatus.openai.error && (
                        <>
                          <ErrorDetails className={expandedErrors.openai ? 'expanded' : ''}>
                            {`Error Code: ${systemStatus.openai.error.code}
Timestamp: ${systemStatus.openai.error.timestamp.toISOString()}
Details: ${systemStatus.openai.error.details}`}
                          </ErrorDetails>
                          <ExpandButton onClick={() => toggleErrorDetails('openai')}>
                            {expandedErrors.openai ? 'Hide Details' : 'Show Details'}
                          </ExpandButton>
                        </>
                      )}
                    </WarningText>
                  </WarningContent>
                  <WarningTime>
                    {getTimeAgo(systemStatus.openai.lastChecked)}
                  </WarningTime>
                </WarningItem>
              </WarningList>
            </SystemWarnings>
          </Container>
        )}
      </MainContent>
    </DashboardContainer>
  );
};

export default DashboardTab; 