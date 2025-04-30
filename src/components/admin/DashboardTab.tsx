import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FaUserPlus, FaUsers, FaSitemap, FaStar, FaFileInvoice, FaDownload, FaPlus, FaCheckDouble, FaExclamationTriangle, FaInfoCircle, FaDatabase } from 'react-icons/fa';
import { FiCheck } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { testSupabaseConnection } from '@/lib/test-connection';

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
`;

const SectionTitle = styled.h2`
  font-size: 1.125rem;
  font-weight: 700;
  margin-bottom: 24px;
  color: #0F172A;
`;

const ActivityList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ActivityItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
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
`;

const ActivityContent = styled.div`
  flex: 1;
`;

const ActivityText = styled.p`
  color: #0F172A;
  margin: 0;
`;

const ActivityTime = styled.p`
  font-size: 0.875rem;
  color: rgba(15, 23, 42, 0.6);
  margin: 0;
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

interface DatabaseStatus {
  success: boolean;
  message: string;
  lastChecked: Date;
}

const DashboardTab: React.FC = () => {
  const router = useRouter();
  const [dbStatus, setDbStatus] = useState<DatabaseStatus | null>(null);

  useEffect(() => {
    const checkDatabaseStatus = async () => {
      const result = await testSupabaseConnection();
      setDbStatus({
        success: result.success,
        message: result.message,
        lastChecked: new Date()
      });
    };

    // Initial check
    checkDatabaseStatus();

    // Check every 30 seconds
    const interval = setInterval(checkDatabaseStatus, 30000);

    return () => clearInterval(interval);
  }, []);

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
                <TimeLabel>Today</TimeLabel>
              </StatHeader>
              <StatValue>1,893</StatValue>
              <StatLabel>Active Users</StatLabel>
              <TrendIndicator $isPositive={true}>
                <FaUserPlus style={{ marginRight: '4px' }} />
                <span>8% vs yesterday</span>
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
              <SectionTitle>Recent Activity</SectionTitle>
              <ActivityList>
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
                <ActivityItem>
                  <ActivityIcon $color="#EC297B">
                    <FaUserPlus />
                  </ActivityIcon>
                  <ActivityContent>
                    <ActivityText>New user signup: <strong>Sarah Johnson</strong></ActivityText>
                    <ActivityTime>32 minutes ago</ActivityTime>
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
              <WarningItem $type="error">
                <WarningContent>
                  <WarningIcon $type="error">
                    <FaExclamationTriangle />
                  </WarningIcon>
                  <WarningText>
                    <WarningTitle $type="error">API Timeout</WarningTitle>
                    <WarningDescription>Payment gateway response delay</WarningDescription>
                  </WarningText>
                </WarningContent>
                <WarningTime>2 mins ago</WarningTime>
              </WarningItem>
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
                    ? `${Math.floor((new Date().getTime() - dbStatus.lastChecked.getTime()) / 1000 / 60)} mins ago`
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