import React, { useState, Suspense } from 'react';
import styled from 'styled-components';
import { TestConfig, TestResult, TestComponentProps } from '@/types';

// Import all components statically
import ServiceChecker from '@/components/test/ServiceChecker';
import AuthTester from '@/components/test/AuthTester';
import QuoteTester from '@/components/test/QuoteTester';
import StyleTester from '@/components/test/StyleTester';
import RoleBuilderTester from '@/components/test/RoleBuilderTester';
import QuizTester from '@/components/test/QuizTester';
import ToolStackTester from '@/components/test/ToolStackTester';
import GamificationTester from '@/components/test/GamificationTester';
import AiPromptTester from '@/components/test/AiPromptTester';
import PageCreatorPanel from '@/components/test/PageCreatorPanel';
import AnonUserTester from '@/components/test/AnonUserTester';
import EventTracker from '@/components/test/EventTracker';
import DbMigrationTester from '@/components/test/DbMigrationTester';
import AdminAccountTester from '@/components/test/AdminAccountTester';

// Static imports for layout components
const Container = styled.div`
  padding: ${props => props.theme.spacing.lg} ${props => props.theme.spacing.xl};
  max-width: 1200px;
  margin: 0 auto;
  font-family: ${props => props.theme.fonts?.sans || 'var(--font-sans)'};
  color: ${props => props.theme.colors.text.primary};
  background-color: ${props => props.theme.colors.background};
  min-height: 100vh;
`;

const Header = styled.header`
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: ${props => props.theme.colors.text.primary};
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const Description = styled.p`
  font-size: 1rem;
  color: ${props => props.theme.colors.text.secondary};
`;

const TabContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing.sm};
  margin-bottom: ${props => props.theme.spacing.xl};
  border-bottom: 1px solid ${props => props.theme.colors.border || 'var(--border-color)'};
  padding-bottom: ${props => props.theme.spacing.md};
`;

const Tab = styled.button<{ $active: boolean }>`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border: none;
  background: none;
  font-family: inherit;
  font-size: 0.9rem;
  color: ${props => props.$active ? props.theme.colors.primary : props.theme.colors.text.secondary};
  font-weight: ${props => props.$active ? '600' : '500'};
  cursor: pointer;
  border-bottom: 2px solid ${props => props.$active ? props.theme.colors.primary : 'transparent'};
  transition: all ${props => props.theme.transitions.fast};
  white-space: nowrap;

  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const MainContent = styled.main`
  background: ${props => props.theme.colors.background};
  border-radius: 8px;
  box-shadow: ${props => props.theme.shadows.md};
  padding: ${props => props.theme.spacing.lg};
  min-height: 300px;
`;

const LoadingContainer = styled.div`
  padding: ${props => props.theme.spacing.xl};
  text-align: center;
  color: ${props => props.theme.colors.text.secondary};
`;

const ErrorContainer = styled.div`
  padding: ${props => props.theme.spacing.md};
  background: #FEF2F2;
  border: 1px solid #FEE2E2;
  border-radius: 6px;
  color: #991B1B;
  margin-bottom: ${props => props.theme.spacing.md};
`;

// Define all tabs
const TABS = [
  { id: 'services', label: 'Services' },
  { id: 'auth', label: 'Authentication' },
  { id: 'quote', label: 'Quote Engine' },
  { id: 'roleBuilder', label: 'Role Builder' },
  { id: 'quiz', label: 'Readiness Quiz' },
  { id: 'tools', label: 'Tool Stack' },
  { id: 'gamification', label: 'Gamification' },
  { id: 'ai', label: 'AI Prompts' },
  { id: 'pageCreator', label: 'Page Creator' },
  { id: 'style', label: 'Style Guide' },
  { id: 'anonUser', label: 'Anon User Flow' },
  { id: 'events', label: 'Event Tracking' },
  { id: 'db', label: 'DB & Migrations' },
  { id: 'admin', label: 'Admin Account' },
];

export default function TestDashboard() {
  const [activeTab, setActiveTab] = useState(TABS[0].id);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [services] = useState([
    { name: 'API', status: 'up' as const, lastChecked: new Date() },
    { name: 'Database', status: 'up' as const, lastChecked: new Date() },
    { name: 'Auth Service', status: 'up' as const, lastChecked: new Date() }
  ]);

  const handleTest = async (config: TestConfig): Promise<TestResult> => {
    setIsLoading(true);
    setError(null);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      return {
        success: true,
        message: 'Test completed successfully',
        data: { testConfig: config }
      };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Test failed';
      setError(message);
      return {
        success: false,
        message
      };
    } finally {
      setIsLoading(false);
    }
  };

  const renderActiveTabContent = () => {
    switch (activeTab) {
      case 'services': return <ServiceChecker />;
      case 'auth': return <AuthTester onTest={handleTest} />;
      case 'quote': return <QuoteTester onTest={handleTest} />;
      case 'style': return <StyleTester onTest={handleTest} />;
      case 'roleBuilder': return <RoleBuilderTester onTest={handleTest} />;
      case 'quiz': return <QuizTester onTest={handleTest} />;
      case 'tools': return <ToolStackTester onTest={handleTest} />;
      case 'gamification': return <GamificationTester onTest={handleTest} />;
      case 'ai': return <AiPromptTester onTest={handleTest} />;
      case 'pageCreator': return <PageCreatorPanel onTest={handleTest} />;
      case 'anonUser': return <AnonUserTester onTest={handleTest} />;
      case 'events': return <EventTracker onTest={handleTest} />;
      case 'db': return <DbMigrationTester onTest={handleTest} />;
      case 'admin': return <AdminAccountTester onTest={handleTest} />;
      default: return <div>Select a tab</div>;
    }
  };

  return (
    <Container>
      <Header>
        <Title>ScaleMate Test Dashboard</Title>
        <Description>Internal platform for testing and validating features.</Description>
      </Header>

      <TabContainer>
        {TABS.map(tab => (
          <Tab
            key={tab.id}
            $active={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </Tab>
        ))}
      </TabContainer>

      {error && (
        <ErrorContainer>
          <strong>Error:</strong> {error}
        </ErrorContainer>
      )}

      <MainContent>
        <Suspense fallback={<LoadingContainer>Loading test components...</LoadingContainer>}>
          {isLoading ? (
            <LoadingContainer>Running tests...</LoadingContainer>
          ) : (
            renderActiveTabContent()
          )}
        </Suspense>
      </MainContent>
    </Container>
  );
}