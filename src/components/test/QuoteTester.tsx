import React, { useState } from 'react';
import styled from 'styled-components';

interface TestResult {
  success: boolean;
  message?: string;
  data?: unknown;
}

interface QuoteTesterProps {
  onTest: (config: any) => Promise<TestResult>;
}

const Container = styled.div`
  display: grid;
  gap: var(--spacing-lg, 1.5rem);
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-md, 1rem);
`;

const FormGroup = styled.div`
  display: grid;
  gap: var(--spacing-xs, 0.25rem);
`;

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-secondary, #374151);
`;

const Input = styled.input`
  padding: var(--spacing-sm, 0.5rem);
  border: 1px solid var(--border-color, #D1D5DB);
  border-radius: 0.375rem;
  font-size: 0.875rem;
  background-color: var(--bg-primary, white);
  color: var(--text-primary, #1F2937);

  &:focus {
    outline: none;
    border-color: var(--color-primary, #3B82F6);
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
  }
`;

const Select = styled.select`
  padding: var(--spacing-sm, 0.5rem);
  border: 1px solid var(--border-color, #D1D5DB);
  border-radius: 0.375rem;
  font-size: 0.875rem;
  background: var(--bg-primary, white);
  color: var(--text-primary, #1F2937);

  &:focus {
    outline: none;
    border-color: var(--color-primary, #3B82F6);
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
  }
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
  grid-column: 1 / -1;
  justify-self: start;

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

const MOCK_ROLES = ['Developer', 'Designer', 'QA Tester', 'Project Manager', 'Business Analyst', 'Data Scientist'];

export default function QuoteTester({ onTest }: QuoteTesterProps) {
  const [lastResult, setLastResult] = useState<TestResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    teamSize: '5',
    location: 'Philippines',
    roles: [MOCK_ROLES[0], MOCK_ROLES[1]]
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRolesChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    setFormData(prev => ({ ...prev, roles: selectedOptions }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setLastResult(null);
    try {
      const config = {
        type: 'quote',
        params: {
          ...formData,
          teamSize: parseInt(formData.teamSize, 10) || 1
        }
      };
      const result = await onTest(config);
      
      if(result.success){
        result.data = {
          quoteId: `QT-${Date.now()}`,
          estimatedCost: (config.params.teamSize * 5000 * (formData.location === 'Philippines' ? 1 : 1.2)),
          currency: 'USD',
          details: config.params,
          pdfUrl: `/mock/quote_${Date.now()}.pdf`
        }
      }
      
      setLastResult(result);
    } catch (error) {
      setLastResult({
        success: false,
        message: error instanceof Error ? error.message : 'Quote test failed unexpectedly'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderResult = () => {
    if (!lastResult) return <p>Generate a quote to see results.</p>;
    const resultData = lastResult.data ? (
      <ResultPre>{JSON.stringify(lastResult.data, null, 2)}</ResultPre>
    ) : null;
    return (
      <React.Fragment>
        <ResultTitle color={lastResult.success ? 'var(--color-secondary, green)' : 'red'}>
          {lastResult.success ? '✅ Quote Generated' : '❌ Generation Failed'}
        </ResultTitle>
        <p>{lastResult.message}</p>
        {resultData}
      </React.Fragment>
    );
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="teamSize">Team Size</Label>
          <Input
            id="teamSize"
            name="teamSize"
            type="number"
            value={formData.teamSize}
            onChange={handleInputChange}
            min="1"
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="location">Location</Label>
          <Select
            id="location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            required
          >
            <option value="Philippines">Philippines</option>
            <option value="Vietnam">Vietnam</option>
            <option value="India">India</option>
          </Select>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="roles">Roles (Select multiple)</Label>
          <Select
            id="roles"
            name="roles"
            multiple
            value={formData.roles}
            onChange={handleRolesChange}
            required
            size={6}
            style={{ height: 'auto'}}
          >
            {MOCK_ROLES.map(role => (
              <option key={role} value={role}>{role}</option>
            ))}
          </Select>
        </FormGroup>

        <Button type="submit" disabled={isLoading}>
          Generate Quote
        </Button>
      </Form>

      <ResultDisplay>
        {isLoading ? <p>Generating quote...</p> : renderResult()}
      </ResultDisplay>

      <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <Button disabled>Compare Salaries</Button>
        <Button disabled>Export PDF</Button>
      </div>
    </Container>
  );
} 