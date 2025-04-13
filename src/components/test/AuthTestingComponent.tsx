import React, { useState } from 'react';
import styled from 'styled-components';
import { TestResult, TestComponentProps } from '@/types';

// --- Styled Components ---
const Container = styled.div`
  display: grid;
  gap: var(--spacing-lg, 1.5rem);
`;

const TestActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-md, 1rem);
`;

const Button = styled.button`
  padding: var(--spacing-sm, 0.5rem) var(--spacing-md, 1rem);
  background: var(--color-primary, #3B82F6);
  color: white;
  border: none;
  border-radius: 0.375rem;
  font-weight: 500;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all var(--transition-fast, 150ms ease);
  position: relative;

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    color: transparent;
  }

  &:disabled::after {
    content: 'Testing...';
    position: absolute;
    left: 0;
    right: 0;
    top: var(--spacing-sm, 0.5rem);
    color: white;
  }
`;

const ResultDisplay = styled.div`
  padding: var(--spacing-md, 1rem);
  border-radius: 6px;
  background: var(--bg-secondary, #F9FAFB);
  border: 1px solid var(--border-color, #E5E7EB);
  font-size: 0.875rem;
  min-height: 100px;
`;

const ResultTitle = styled.h4<{ color?: string }>`
  font-weight: 600;
  margin-bottom: var(--spacing-sm, 0.5rem);
  color: ${props => props.color || 'inherit'};
`;

const ResultPre = styled.pre`
  background: var(--bg-primary, white);
  padding: var(--spacing-sm, 0.5rem);
  border-radius: 4px;
  border: 1px solid var(--border-color, #E5E7EB);
  overflow-x: auto;
  white-space: pre-wrap;
  font-family: var(--font-mono, monospace);
  font-size: 0.8rem;
  color: var(--text-secondary, #6B7280);
`;

const AuthTestingComponent: React.FC<TestComponentProps> = ({ onTest }) => {
  const [lastResult, setLastResult] = useState<TestResult | null>(null);
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const runTest = async (testType: string) => {
    setIsLoading(testType);
    setLastResult(null);
    try {
      const config = { 
        type: testType,
        data: {
          email: ['signup', 'login', 'reset'].includes(testType) ? 'test@example.com' : undefined,
          password: ['signup', 'login'].includes(testType) ? 'TestPass123!' : undefined
        }
      };

      const result = await onTest(config);
      
      if(testType === 'session' && result.success){
          result.data = {
              user: { id: 'uuid-test-user', email: 'test@example.com', role: 'authenticated' },
              session: { access_token: 'mock_jwt_token_very_long...', expires_in: 3600, token_type: 'bearer' },
              cookies: 'Set-Cookie: sb-test-token=...; Path=/; HttpOnly; SameSite=Lax'
          }
      }
      
      setLastResult(result);
    } catch (error) {
      setLastResult({
        success: false,
        message: error instanceof Error ? error.message : 'Auth test failed unexpectedly'
      });
    } finally {
      setIsLoading(null);
    }
  };

  const renderResult = () => {
    if (!lastResult) return <p>Run a test to see the results.</p>;

    const resultData = lastResult.data ? (
      <ResultPre>
        {JSON.stringify(lastResult.data, null, 2)}
      </ResultPre>
    ) : null;

    return (
      <React.Fragment>
        <ResultTitle color={lastResult.success ? 'var(--color-secondary, green)' : 'red'}>
          {lastResult.success ? '✅ Test Passed' : '❌ Test Failed'}
        </ResultTitle>
        <p>{lastResult.message}</p>
        {resultData}
      </React.Fragment>
    );
  };

  return (
    <Container>
      <TestActions>
        <Button onClick={() => runTest('signup')} disabled={!!isLoading}>
          Test Sign Up
        </Button>
        <Button onClick={() => runTest('login')} disabled={!!isLoading}>
          Test Sign In
        </Button>
        <Button onClick={() => runTest('logout')} disabled={!!isLoading}>
          Test Logout
        </Button>
        <Button onClick={() => runTest('reset')} disabled={!!isLoading}>
          Test Password Reset
        </Button>
        <Button onClick={() => runTest('session')} disabled={!!isLoading}>
          View Session Info
        </Button>
      </TestActions>

      <ResultDisplay>
        {isLoading ? (
          <p>Running {isLoading} test...</p>
        ) : (
          renderResult()
        )}
      </ResultDisplay>
    </Container>
  );
};

export default AuthTestingComponent; 