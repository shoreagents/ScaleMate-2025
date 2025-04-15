import React, { Suspense } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faClipboardList, faRocket } from '@fortawesome/free-solid-svg-icons';
import HeroSection from './components/HeroSection';
import QuoteCalculator from './components/QuoteCalculator';
import HowItWorks from './components/HowItWorks';
import ToolHighlights from './components/ToolHighlights';
import LatestInsights from './components/LatestInsights';

const DEBUG_MODE = process.env.NODE_ENV === 'development';

const Main = styled.main`
  min-height: 100vh;
  width: 100%;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.background.primary};
  position: relative;

  ${DEBUG_MODE && `
    border: 2px dashed green;
    * {
      border: 1px solid rgba(255, 0, 0, 0.1);
    }
  `}
`;

const Section = styled.section`
  padding: 5rem 0;
`;

const Container = styled.div`
  max-width: 72rem;
  margin: 0 auto;
  padding: 0 1rem;
`;

const Title = styled.h2`
  font-size: 2.25rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 4rem;
  color: #0F172A;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Card = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 0.75rem;
  border: 1px solid #E5E7EB;
`;

const IconWrapper = styled.div<{ bgColor: string }>`
  width: 4rem;
  height: 4rem;
  background-color: ${props => props.bgColor};
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #0F172A;
`;

const CardDescription = styled.p`
  color: rgba(15, 23, 42, 0.7);
`;

const steps = [
  {
    icon: faMagnifyingGlass,
    title: '1. Discover',
    description: 'Explore roles, tools, and cost comparisons to find the perfect fit for your business needs.',
    colors: {
      bg: 'rgba(59, 130, 246, 0.1)',
      icon: '#3B82F6'
    }
  },
  {
    icon: faClipboardList,
    title: '2. Plan',
    description: 'Create detailed role blueprints and automated training flows for seamless onboarding.',
    colors: {
      bg: 'rgba(236, 41, 123, 0.1)',
      icon: '#EC297B'
    }
  },
  {
    icon: faRocket,
    title: '3. Execute',
    description: 'Delegate with confidence and track progress using our smart management tools.',
    colors: {
      bg: 'rgba(0, 233, 21, 0.1)',
      icon: '#00E915'
    }
  }
];

// Error boundary component
class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error in component:', error);
    console.error('Error info:', errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div>Something went wrong in this component.</div>;
    }

    return this.props.children;
  }
}

export default function Home() {
  if (DEBUG_MODE) {
    console.log('Home page rendering');
  }

  return (
    <>
      <Head>
        <title>ScaleMate - Scale Your Team Without The Burnout</title>
        <meta name="description" content="Leverage offshore talent and AI tools to grow your business smarter. Trusted by 500+ companies across USA, Australia, and New Zealand." />
      </Head>

      <Main>
        <ErrorBoundary>
          <HeroSection />
        </ErrorBoundary>
        <ErrorBoundary>
          <QuoteCalculator />
        </ErrorBoundary>
        <ErrorBoundary>
          <HowItWorks />
        </ErrorBoundary>
        <ErrorBoundary>
          <ToolHighlights />
        </ErrorBoundary>
        <ErrorBoundary>
          <LatestInsights />
        </ErrorBoundary>
      </Main>
    </>
  );
} 