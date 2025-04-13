import React, { useState } from 'react';
import styled from 'styled-components';

interface TestResult {
  success: boolean;
  message?: string;
  data?: unknown;
}

interface StyleTesterProps {
  onTest: (config: any) => Promise<TestResult>;
}

const Container = styled.div`
  display: grid;
  gap: 1.5rem;
`;

const TestGroup = styled.div`
  display: grid;
  gap: 1rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background: #3B82F6;
  color: white;
  border: none;
  border-radius: 0.375rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ResultContainer = styled.div<{ $success?: boolean }>`
  padding: 1rem;
  border-radius: 0.375rem;
  background: ${props => props.$success ? '#DEF7EC' : '#FDE8E8'};
  color: ${props => props.$success ? '#03543F' : '#9B1C1C'};
  font-size: 0.875rem;
`;

const PreviewContainer = styled.div`
  padding: 1rem;
  border: 1px solid #E5E7EB;
  border-radius: 0.375rem;
  background: white;
`;

const PreviewTitle = styled.h3`
  font-size: 1rem;
  font-weight: 500;
  color: #1F2937;
  margin-bottom: 0.5rem;
`;

const PreviewContent = styled.div`
  display: grid;
  gap: 1rem;
`;

export default function StyleTester({ onTest }: StyleTesterProps) {
  const [result, setResult] = useState<TestResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const handleTest = async (testType: string) => {
    setIsLoading(true);
    try {
      const result = await onTest({
        type: testType,
        theme,
      });
      setResult(result);
    } catch (error) {
      setResult({
        success: false,
        message: error instanceof Error ? error.message : 'Test failed'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <TestGroup>
        <Button 
          onClick={() => handleTest('theme')}
          disabled={isLoading}
        >
          Test Theme
        </Button>
        <Button 
          onClick={() => handleTest('responsive')}
          disabled={isLoading}
        >
          Test Responsive Design
        </Button>
        <Button 
          onClick={() => handleTest('accessibility')}
          disabled={isLoading}
        >
          Test Accessibility
        </Button>
      </TestGroup>

      <PreviewContainer>
        <PreviewTitle>Theme Preview</PreviewTitle>
        <PreviewContent>
          <Button 
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          >
            Toggle Theme
          </Button>
          <div>Current Theme: {theme}</div>
        </PreviewContent>
      </PreviewContainer>

      {result && (
        <ResultContainer $success={result.success}>
          {result.message || (result.success ? 'Test passed!' : 'Test failed')}
        </ResultContainer>
      )}
    </Container>
  );
} 