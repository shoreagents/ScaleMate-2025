import React from 'react';
import styled from 'styled-components';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: ${({ theme }) => theme.spacing.lg};

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Card = styled.div`
  background-color: ${({ theme }) => theme.colors.background.secondary};
  border-radius: 1rem;
  padding: ${({ theme }) => theme.spacing.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};
`;

const CardTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const Metric = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const MetricValue = styled.span`
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
`;

const MetricLabel = styled.span`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const UserList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const UserItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.sm};
  background-color: ${({ theme }) => theme.colors.background.primary};
  border-radius: 0.5rem;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserEmail = styled.span`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const UserRole = styled.span`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const StatusIndicator = styled.div<{ $status: 'up' | 'down' }>`
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 50%;
  background-color: ${({ theme, $status }) => 
    $status === 'up' ? theme.colors.success : theme.colors.error};
`;

const ServiceStatus = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.sm};
  background-color: ${({ theme }) => theme.colors.background.primary};
  border-radius: 0.5rem;
`;

const ServiceName = styled.span`
  font-weight: 500;
`;

const LastChecked = styled.span`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

interface DashboardTabProps {
  metrics: {
    totalUsers: number;
    activeUsers: number;
    conversionRate: number;
  };
  recentUsers: Array<{
    email: string;
    role: string;
  }>;
  services: Array<{
    name: string;
    status: 'up' | 'down';
    lastChecked: Date;
  }>;
}

const DashboardTab: React.FC<DashboardTabProps> = ({ metrics, recentUsers, services }) => {
  return (
    <Grid>
      <Card>
        <CardTitle>Key Metrics</CardTitle>
        <Grid>
          <Metric>
            <MetricValue>{metrics.totalUsers}</MetricValue>
            <MetricLabel>Total Users</MetricLabel>
          </Metric>
          <Metric>
            <MetricValue>{metrics.activeUsers}</MetricValue>
            <MetricLabel>Active Users</MetricLabel>
          </Metric>
          <Metric>
            <MetricValue>{metrics.conversionRate}%</MetricValue>
            <MetricLabel>Conversion Rate</MetricLabel>
          </Metric>
        </Grid>
      </Card>

      <Card>
        <CardTitle>Recent Users</CardTitle>
        <UserList>
          {recentUsers.map((user, index) => (
            <UserItem key={index}>
              <UserInfo>
                <UserEmail>{user.email}</UserEmail>
                <UserRole>{user.role}</UserRole>
              </UserInfo>
            </UserItem>
          ))}
        </UserList>
      </Card>

      <Card>
        <CardTitle>System Status</CardTitle>
        <UserList>
          {services.map((service, index) => (
            <ServiceStatus key={index}>
              <ServiceName>{service.name}</ServiceName>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <StatusIndicator $status={service.status} />
                <LastChecked>
                  Last checked: {service.lastChecked.toLocaleTimeString()}
                </LastChecked>
              </div>
            </ServiceStatus>
          ))}
        </UserList>
      </Card>
    </Grid>
  );
};

export default DashboardTab; 