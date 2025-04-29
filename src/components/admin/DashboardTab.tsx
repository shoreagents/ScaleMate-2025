import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaUserPlus, FaUsers, FaSitemap, FaStar, FaFileInvoice, FaDownload, FaPlus, FaCheckDouble, FaExclamationTriangle, FaInfoCircle } from 'react-icons/fa';
import { FiCheck } from 'react-icons/fi';
import { useRouter } from 'next/router';

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

const SuccessModal = styled.div<{ $isOpen: boolean }>`
  display: ${props => props.$isOpen ? 'flex' : 'none'};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  z-index: 1001;
`;

const SuccessModalContent = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 12px;
  width: 100%;
  max-width: 400px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const SuccessIcon = styled.div`
  width: 48px;
  height: 48px;
  background-color: ${props => props.theme.colors.success}15;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  color: ${props => props.theme.colors.success};
`;

const SuccessTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text.primary};
  margin-bottom: 0.5rem;
`;

const SuccessMessage = styled.p`
  font-size: 0.875rem;
  color: ${props => props.theme.colors.text.secondary};
  margin-bottom: 1.5rem;
`;

const SuccessButton = styled.button`
  padding: 0.875rem 1.5rem;
  background: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  width: 100%;

  &:hover {
    background: ${props => props.theme.colors.primaryDark};
  }

  &:active {
    transform: scale(0.98);
  }
`;

const DashboardTab: React.FC = () => {
  const router = useRouter();
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    // Show success modal when component mounts
    setShowSuccessModal(true);
  }, []);

  const handleSuccessContinue = () => {
    setShowSuccessModal(false);
  };

  return (
    <>
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
              </WarningList>
            </SystemWarnings>
          </Container>
        </MainContent>
      </DashboardContainer>

      <SuccessModal $isOpen={showSuccessModal}>
        <SuccessModalContent>
          <SuccessIcon>
            <FiCheck size={24} />
          </SuccessIcon>
          <SuccessTitle>Setup Completed</SuccessTitle>
          <SuccessMessage>
            Your account has been successfully set up. You can now use your new credentials to log in.
          </SuccessMessage>
          <SuccessButton onClick={handleSuccessContinue}>
            Continue
          </SuccessButton>
        </SuccessModalContent>
      </SuccessModal>
    </>
  );
};

export default DashboardTab; 