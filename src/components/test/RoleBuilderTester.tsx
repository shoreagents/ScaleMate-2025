import React, { useState } from 'react';
import styled from 'styled-components';

interface TestResult {
  success: boolean;
  message?: string;
  data?: unknown;
}

interface RoleBuilderTesterProps {
  onTest: (config: any) => Promise<TestResult>;
}

// --- Styled Components (reusing from QuoteTester/AuthTester) ---
const Container = styled.div`
  display: grid;
  gap: var(--spacing-lg, 1.5rem);
`;

const Form = styled.form`
  display: grid;
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

const Textarea = styled.textarea`
  padding: var(--spacing-sm, 0.5rem);
  border: 1px solid var(--border-color, #D1D5DB);
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-family: inherit;
  background-color: var(--bg-primary, white);
  color: var(--text-primary, #1F2937);
  min-height: 80px;

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
    content: 'Generating...';
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
  min-height: 150px;
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

// --- Mock Data ---
const MOCK_DEPARTMENTS = ['Engineering', 'Marketing', 'Sales', 'Support', 'Operations', 'HR'];
const MOCK_TASK_SETS: Record<string, string[]> = {
    Engineering: ['Frontend Dev', 'Backend Dev', 'DevOps', 'Mobile Dev', 'QA Automation'],
    Marketing: ['Content Creation', 'SEO', 'PPC Ads', 'Social Media', 'Email Marketing'],
    Sales: ['Lead Generation', 'Account Management', 'Sales Development', 'Sales Operations'],
    Support: ['Tier 1 Support', 'Technical Support', 'Customer Success'],
    Operations: ['Process Improvement', 'Project Management', 'Logistics'],
    HR: ['Recruitment', 'Onboarding', 'Employee Relations']
};
const MOCK_TOOLS: Record<string, string[]> = {
    Engineering: ['React', 'Node.js', 'Python', 'AWS', 'Docker', 'Kubernetes', 'Terraform'],
    Marketing: ['HubSpot', 'Google Analytics', 'SEMrush', 'Canva', 'Mailchimp'],
    Sales: ['Salesforce', 'LinkedIn Sales Navigator', 'ZoomInfo', 'Outreach.io'],
    Support: ['Zendesk', 'Jira Service Desk', 'Intercom'],
    Operations: ['Asana', 'Notion', 'Excel', 'Zapier'],
    HR: ['Lever', 'BambooHR', 'Workday']
};

export default function RoleBuilderTester({ onTest }: RoleBuilderTesterProps) {
  const [lastResult, setLastResult] = useState<TestResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    department: MOCK_DEPARTMENTS[0],
    taskSet: '' as string, // Explicitly type as string
    tools: '' as string    // Explicitly type as string
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const isDepartmentChange = name === 'department';

    setFormData(prev => ({
        ...prev,
        [name]: value,
        // Reset dependent fields if department changes
        taskSet: isDepartmentChange ? '' : prev.taskSet,
        tools: isDepartmentChange ? '' : prev.tools
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setLastResult(null);
    try {
        const config = {
            type: 'roleBuilder',
            params: formData
        };
        const result = await onTest(config);

        // Add mock data for role builder result
        if (result.success) {
            result.data = {
                jobDescription: `**Job Title:** Mock ${formData.taskSet || 'Role'} (${formData.department})\n\n**Responsibilities:**\n- Perform tasks related to ${formData.taskSet || 'selected tasks'}.\n- Utilize tools like ${formData.tools || 'relevant tools'}.\n- Collaborate with the team.\n\n**Requirements:**\n- Experience in ${formData.department}.\n- Proficiency in relevant tools.`, // Added fallback text
                kpiSuggestions: [
                    `KPI 1 for ${formData.taskSet || 'role'}`,
                    `KPI 2 based on ${formData.tools || 'tools'}`,
                    `KPI 3 general`
                ],
                pdfUrl: `/mock/role_${Date.now()}.pdf`
            };
        }

        setLastResult(result);
    } catch (error) {
      setLastResult({
        success: false,
        message: error instanceof Error ? error.message : 'Role Builder test failed unexpectedly'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderResult = () => {
    if (!lastResult) return <p>Generate a role description to see results.</p>;
    const resultData = lastResult.data ? (
        <ResultPre>{JSON.stringify(lastResult.data, null, 2)}</ResultPre>
    ) : null;
    return (
      <React.Fragment>
        <ResultTitle color={lastResult.success ? 'var(--color-secondary, green)' : 'red'}>
          {lastResult.success ? '✅ Role Generated' : '❌ Generation Failed'}
        </ResultTitle>
        <p>{lastResult.message}</p>
        {resultData}
      </React.Fragment>
    );
  };

  // Get available tasks and tools based on selected department
  const availableTasks = MOCK_TASK_SETS[formData.department] || [];
  const availableTools = MOCK_TOOLS[formData.department] || [];

  // Reset taskSet and tools if the current selection is no longer valid for the chosen department
  // This should ideally be in an effect, but for simplicity here:
  if (formData.taskSet && !availableTasks.includes(formData.taskSet)) {
      formData.taskSet = '';
  }
  // Similar check for tools could be added if it was a select

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="department">Department</Label>
          <Select
            id="department"
            name="department"
            value={formData.department}
            onChange={handleInputChange}
            required
          >
            {MOCK_DEPARTMENTS.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </Select>
        </FormGroup>

        <FormGroup>
            <Label htmlFor="taskSet">Task Set</Label>
            <Select
                id="taskSet"
                name="taskSet"
                value={formData.taskSet}
                onChange={handleInputChange}
                required
                disabled={!availableTasks.length}
            >
                <option value="">-- Select Task Set --</option>
                {availableTasks.map(task => (
                    <option key={task} value={task}>{task}</option>
                ))}
            </Select>
        </FormGroup>

        <FormGroup>
            <Label htmlFor="tools">Primary Tools (comma-separated)</Label>
             <Textarea
                id="tools"
                name="tools"
                value={formData.tools}
                onChange={handleInputChange}
                placeholder={`e.g., ${availableTools.slice(0, 3).join(', ')}`}
                required
                rows={3}
             />
        </FormGroup>

        <Button type="submit" disabled={isLoading || !formData.taskSet || !formData.tools}>
          Generate Role Description
        </Button>
      </Form>

      <ResultDisplay>
        {isLoading ? <p>Generating role description...</p> : renderResult()}
      </ResultDisplay>
    </Container>
  );
} 