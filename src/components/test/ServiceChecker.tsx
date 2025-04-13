import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

interface ServiceStatus {
  name: string;
  status: 'checking' | 'up' | 'down' | 'error';
  message?: string;
  lastChecked?: Date;
}

const SERVICE_LIST = ['API', 'Database', 'Auth Service', 'Supabase', 'OpenAI', 'Anthropic'];

// --- Styled Components ---
const Container = styled.div`
  display: grid;
  gap: var(--spacing-md, 1rem);
`;

const ServiceItem = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: var(--spacing-md, 1rem);
  padding: var(--spacing-sm, 0.5rem) var(--spacing-md, 1rem);
  background: var(--bg-secondary, #F9FAFB);
  border-radius: 6px;
  border: 1px solid var(--border-color, #E5E7EB);
`;

const ServiceName = styled.span`
  font-weight: 500;
  color: var(--text-primary, #1F2937);
`;

const ServiceMessage = styled.span`
  font-size: 0.875rem;
  color: var(--text-secondary, #6B7280);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const StatusBadge = styled.span<{
  $status: ServiceStatus['status'];
}>`
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.8rem;
  font-weight: 500;
  text-transform: uppercase;
  white-space: nowrap;
  background: ${props => {
    switch (props.$status) {
      case 'up': return '#DEF7EC'; // Green
      case 'down':
      case 'error': return '#FDE8E8'; // Red
      case 'checking': return '#E0E7FF'; // Blue
      default: return 'var(--bg-secondary, #F9FAFB)';
    }
  }};
  color: ${props => {
    switch (props.$status) {
      case 'up': return '#03543F';
      case 'down':
      case 'error': return '#9B1C1C';
      case 'checking': return '#3730A3';
      default: return 'var(--text-secondary, #6B7280)';
    }
  }};
`;

const Spinner = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid rgba(59, 130, 246, 0.2);
  border-radius: 50%;
  border-top-color: var(--color-primary, #3B82F6);
  animation: spin 1s ease-in-out infinite;

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

// Mock connection check function
const checkServiceConnection = async (serviceName: string): Promise<Partial<ServiceStatus>> => {
  await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000)); // Simulate network delay
  const success = Math.random() > 0.2; // Simulate 80% success rate

  if (success) {
    return { status: 'up', message: 'Connected successfully' };
  } else {
    // Simulate different error types
    if (serviceName === 'Supabase' && Math.random() > 0.5) {
      return { status: 'error', message: 'Connection failed: Invalid API key' };
    }
    return { status: 'down', message: 'Service unreachable' };
  }
};

export default function ServiceChecker() {
  const [services, setServices] = useState<ServiceStatus[]>(() =>
    SERVICE_LIST.map(name => ({
      name,
      status: 'checking',
      message: 'Initiating check...'
    }))
  );

  useEffect(() => {
    const checkAllServices = async () => {
      const promises = services.map(async (service, index) => {
        if (service.status === 'checking') {
          try {
            const result = await checkServiceConnection(service.name);
            setServices(prev => {
              const updated = [...prev];
              updated[index] = { ...updated[index], ...result, lastChecked: new Date() };
              return updated;
            });
          } catch (error) {
            setServices(prev => {
              const updated = [...prev];
              updated[index] = {
                ...updated[index],
                status: 'error',
                message: 'Check failed unexpectedly',
                lastChecked: new Date()
              };
              return updated;
            });
          }
        }
      });
      await Promise.allSettled(promises);
    };

    checkAllServices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run only once on mount

  return (
    <Container>
      {services.map((service) => (
        <ServiceItem key={service.name}>
          <ServiceName>{service.name}</ServiceName>
          <ServiceMessage title={service.message}>{service.message}</ServiceMessage>
          <StatusBadge $status={service.status}>
            {service.status === 'checking' ? <Spinner /> : service.status}
          </StatusBadge>
        </ServiceItem>
      ))}
    </Container>
  );
} 