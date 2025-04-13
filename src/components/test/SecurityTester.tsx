import React, { useState } from 'react';
import styled from 'styled-components';

interface TestResult {
  success: boolean;
  message?: string;
  data?: unknown;
}

interface SecurityTesterProps {
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

const Input = styled.input`
  padding: var(--spacing-sm, 0.5rem);
  border: 1px solid var(--border-color, #E5E7EB);
  border-radius: 4px;
  font-size: 0.9rem;
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

const SecurityGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-md, 1rem);
  margin-top: var(--spacing-md, 1rem);
`;

const SecurityCard = styled.div<{ $status: 'pass' | 'fail' | 'pending' }>`
  padding: var(--spacing-md, 1rem);
  background: white;
  border: 1px solid var(--border-color, #E5E7EB);
  border-radius: 4px;
  text-align: center;
  color: ${props => 
    props.$status === 'pass' ? 'var(--color-success, #10B981)' :
    props.$status === 'fail' ? 'var(--color-error, #EF4444)' :
    'var(--text-secondary, #6B7280)'
  };
`;

const SecurityLabel = styled.div`
  font-size: 0.9rem;
  margin-top: var(--spacing-xs, 0.25rem);
`;

export default function SecurityTester({ onTest }: SecurityTesterProps) {
  const [result, setResult] = useState<TestResult | null>(null);
  const [securityChecks, setSecurityChecks] = useState({
    xss: 'pending',
    csrf: 'pending',
    sqlInjection: 'pending',
    rateLimiting: 'pending',
    auth: 'pending'
  });

  const handleTest = async (type: string) => {
    const testResult = await onTest({ type });
    setResult(testResult);
    
    if (testResult.success) {
      setSecurityChecks(prev => ({
        ...prev,
        [type]: 'pass'
      }));
    } else {
      setSecurityChecks(prev => ({
        ...prev,
        [type]: 'fail'
      }));
    }
  };

  return (
    <Container>
      <Form>
        <Button onClick={() => handleTest('xss')}>Test XSS Protection</Button>
        <Button onClick={() => handleTest('csrf')}>Test CSRF Protection</Button>
        <Button onClick={() => handleTest('sqlInjection')}>Test SQL Injection Protection</Button>
        <Button onClick={() => handleTest('rateLimiting')}>Test Rate Limiting</Button>
        <Button onClick={() => handleTest('auth')}>Test Authentication</Button>
      </Form>

      <SecurityGrid>
        <SecurityCard $status={securityChecks.xss as 'pass' | 'fail' | 'pending'}>
          XSS Protection
          <SecurityLabel>{securityChecks.xss}</SecurityLabel>
        </SecurityCard>
        <SecurityCard $status={securityChecks.csrf as 'pass' | 'fail' | 'pending'}>
          CSRF Protection
          <SecurityLabel>{securityChecks.csrf}</SecurityLabel>
        </SecurityCard>
        <SecurityCard $status={securityChecks.sqlInjection as 'pass' | 'fail' | 'pending'}>
          SQL Injection Protection
          <SecurityLabel>{securityChecks.sqlInjection}</SecurityLabel>
        </SecurityCard>
        <SecurityCard $status={securityChecks.rateLimiting as 'pass' | 'fail' | 'pending'}>
          Rate Limiting
          <SecurityLabel>{securityChecks.rateLimiting}</SecurityLabel>
        </SecurityCard>
        <SecurityCard $status={securityChecks.auth as 'pass' | 'fail' | 'pending'}>
          Authentication
          <SecurityLabel>{securityChecks.auth}</SecurityLabel>
        </SecurityCard>
      </SecurityGrid>

      {result && (
        <ResultContainer>
          {JSON.stringify(result, null, 2)}
        </ResultContainer>
      )}
    </Container>
  );
} 