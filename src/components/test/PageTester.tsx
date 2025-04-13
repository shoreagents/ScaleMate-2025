import React, { useState } from 'react';
import styled from 'styled-components';

interface TestResult {
  success: boolean;
  message?: string;
  data?: unknown;
}

interface PageTesterProps {
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

const TextArea = styled.textarea`
  padding: var(--spacing-sm, 0.5rem);
  border: 1px solid var(--border-color, #E5E7EB);
  border-radius: 4px;
  font-size: 0.9rem;
  min-height: 100px;
  resize: vertical;
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

export default function PageTester({ onTest }: PageTesterProps) {
  const [pageTitle, setPageTitle] = useState('');
  const [pageContent, setPageContent] = useState('');
  const [result, setResult] = useState<TestResult | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const testResult = await onTest({
      pageTitle,
      pageContent
    });
    setResult(testResult);
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          value={pageTitle}
          onChange={(e) => setPageTitle(e.target.value)}
          placeholder="Page Title"
        />
        <TextArea
          value={pageContent}
          onChange={(e) => setPageContent(e.target.value)}
          placeholder="Page Content"
        />
        <Button type="submit">Create Page</Button>
      </Form>
      {result && (
        <ResultContainer>
          {JSON.stringify(result, null, 2)}
        </ResultContainer>
      )}
    </Container>
  );
} 