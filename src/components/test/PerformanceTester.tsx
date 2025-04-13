import React, { useState } from 'react';
import styled from 'styled-components';

interface TestResult {
  success: boolean;
  message?: string;
  data?: unknown;
}

interface PerformanceTesterProps {
  onTest: (config: any) => Promise<TestResult>;
}

const Container = styled.div`
  display: grid;
  gap: var(--spacing-lg, 1.5rem);
`;

const Form = styled.form`
  display: grid;
  gap: var(--spacing-md, 1rem);
`;

const Button = styled.button`
  padding: var(--spacing-sm, 0.5rem) var(--spacing-md, 1rem);
  background: var(--color-primary, #3B82F6);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background: var(--color-primary-dark, #2563EB);
  }
`;

const ResultContainer = styled.div`
  padding: var(--spacing-md, 1rem);
  background: var(--bg-secondary, #F9FAFB);
  border-radius: 4px;
  font-family: monospace;
  white-space: pre-wrap;
`;

const MetricGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-md, 1rem);
  margin-top: var(--spacing-md, 1rem);
`;

const MetricCard = styled.div`
  padding: var(--spacing-md, 1rem);
  background: white;
  border: 1px solid var(--border-color, #E5E7EB);
  border-radius: 4px;
  text-align: center;
`;

const MetricValue = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--color-primary, #3B82F6);
`;

const MetricLabel = styled.div`
  font-size: 0.9rem;
  color: var(--text-secondary, #6B7280);
  margin-top: var(--spacing-xs, 0.25rem);
`;

export default function PerformanceTester({ onTest }: PerformanceTesterProps) {
  const [result, setResult] = useState<TestResult | null>(null);
  const [metrics, setMetrics] = useState({
    fcp: 0,
    lcp: 0,
    cls: 0,
    tti: 0,
    tbt: 0
  });

  const handleTest = async () => {
    const testResult = await onTest({ type: 'performance' });
    setResult(testResult);
    
    if (testResult.success && testResult.data) {
      setMetrics({
        fcp: Math.random() * 2, // Simulated FCP
        lcp: Math.random() * 2.5, // Simulated LCP
        cls: Math.random() * 0.1, // Simulated CLS
        tti: Math.random() * 3, // Simulated TTI
        tbt: Math.random() * 0.5 // Simulated TBT
      });
    }
  };

  return (
    <Container>
      <Button onClick={handleTest}>Run Performance Test</Button>
      
      <MetricGrid>
        <MetricCard>
          <MetricValue>{metrics.fcp.toFixed(2)}s</MetricValue>
          <MetricLabel>First Contentful Paint</MetricLabel>
        </MetricCard>
        <MetricCard>
          <MetricValue>{metrics.lcp.toFixed(2)}s</MetricValue>
          <MetricLabel>Largest Contentful Paint</MetricLabel>
        </MetricCard>
        <MetricCard>
          <MetricValue>{metrics.cls.toFixed(3)}</MetricValue>
          <MetricLabel>Cumulative Layout Shift</MetricLabel>
        </MetricCard>
        <MetricCard>
          <MetricValue>{metrics.tti.toFixed(2)}s</MetricValue>
          <MetricLabel>Time to Interactive</MetricLabel>
        </MetricCard>
        <MetricCard>
          <MetricValue>{metrics.tbt.toFixed(2)}s</MetricValue>
          <MetricLabel>Total Blocking Time</MetricLabel>
        </MetricCard>
      </MetricGrid>

      {result && (
        <ResultContainer>
          {JSON.stringify(result, null, 2)}
        </ResultContainer>
      )}
    </Container>
  );
} 