import React, { useState } from 'react';
import styled from 'styled-components';

interface TestResult {
  success: boolean;
  message?: string;
  data?: unknown;
}

interface QuizTesterProps {
  onTest: (config: any) => Promise<TestResult>;
}

// --- Styled Components (reusing from previous testers) ---
const Container = styled.div`
  display: grid;
  gap: var(--spacing-lg, 1.5rem);
`;

const TestActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center; // Align items vertically
  gap: var(--spacing-md, 1rem);
`;

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-secondary, #374151);
  margin-right: var(--spacing-xs, 0.25rem); // Add some spacing
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
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
  }
`;

const Select = styled.select`
  padding: var(--spacing-sm, 0.5rem);
  border: 1px solid var(--border-color, #D1D5DB);
  border-radius: 0.375rem;
  font-size: 0.875rem;
  background: var(--bg-primary, white);
  color: var(--text-primary, #1F2937);
  max-width: 200px; // Adjust width

  &:focus {
    outline: none;
    border-color: var(--color-primary, #3B82F6);
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
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

const ResultTitle = styled.h4`
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
  word-wrap: break-word;
  font-family: var(--font-mono, monospace);
  font-size: 0.8rem;
  color: var(--text-secondary, #6B7280);
`;

export default function QuizTester({ onTest }: QuizTesterProps) {
  const [lastResult, setLastResult] = useState<TestResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [readinessState, setReadinessState] = useState<'Low' | 'Medium' | 'High'>('Medium');

  const runAutoSubmitTest = async () => {
    setIsLoading(true);
    setLastResult(null);
    try {
      const config = {
        type: 'quizSubmit',
        params: {
            // Simulate some answers for the test
            mockAnswers: [
                { questionId: 'q1', answer: 'Yes' },
                { questionId: 'q2', answer: 'Partially' },
                { questionId: 'q3', answer: 'No' },
            ],
            targetState: readinessState // Pass the selected state for result simulation
        }
      };
      const result = await onTest(config);

      // Add mock data for quiz result based on targetState
      if (result.success) {
          let score, pdfUrl, label;
          switch(readinessState){
              case 'Low': score = 35; label = 'Low Readiness'; pdfUrl = '/mock/plan_low.pdf'; break;
              case 'Medium': score = 65; label = 'Medium Readiness'; pdfUrl = '/mock/plan_medium.pdf'; break;
              case 'High': score = 90; label = 'High Readiness'; pdfUrl = '/mock/plan_high.pdf'; break;
              default: score = 0; label = 'Unknown'; pdfUrl = '/mock/plan_unknown.pdf';
          }
          result.data = {
              readinessLabel: label,
              score: score,
              actionPlanPdfUrl: pdfUrl,
              debugInfo: `Simulated result for ${readinessState} state.`
          };
      }

      setLastResult(result);
    } catch (error) {
      setLastResult({
        success: false,
        message: error instanceof Error ? error.message : 'Quiz test failed unexpectedly'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderResult = () => {
    if (!lastResult) return <p>Submit a quiz simulation to see results.</p>;
    const resultData = lastResult.data ? (
        <ResultPre>{JSON.stringify(lastResult.data, null, 2)}</ResultPre>
    ) : null;
    return (
      <React.Fragment>
        <ResultTitle color={lastResult.success ? 'var(--color-secondary, green)' : 'red'}>
          {lastResult.success ? '✅ Quiz Submitted' : '❌ Submission Failed'}
        </ResultTitle>
        <p>{lastResult.message}</p>
        {resultData}
      </React.Fragment>
    );
  };

  return (
    <Container>
      <TestActions>
        {/* Group Label and Select */} 
        <div style={{display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm, 0.5rem)'}}>
          <Label htmlFor="readinessState">Simulate Result State:</Label>
          <Select
              id="readinessState"
              value={readinessState}
              onChange={(e) => setReadinessState(e.target.value as 'Low' | 'Medium' | 'High')}
              disabled={isLoading}
          >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
          </Select>
        </div>
        <Button onClick={runAutoSubmitTest} disabled={isLoading}>
          Auto-fill & Submit Quiz
        </Button>
      </TestActions>

      <ResultDisplay>
        {isLoading ? <p>Submitting quiz simulation...</p> : renderResult()}
      </ResultDisplay>
    </Container>
  );
} 