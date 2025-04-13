import React, { useState } from 'react';
import styled from 'styled-components';

interface TestResult {
  success: boolean;
  message?: string;
  data?: unknown;
}

interface ToolStackTesterProps {
  onTest: (config: any) => Promise<TestResult>;
}

// --- Mock Data ---
const MOCK_TOOLS = [
  { id: 'tool-chatgpt', name: 'ChatGPT', description: 'AI language model for conversation and text generation.', tags: ['llm', 'text', 'openai'] },
  { id: 'tool-uxpilot', name: 'UX-Pilot', description: 'AI tool for generating user flows and UX analysis.', tags: ['ux', 'design', 'analysis'] },
  { id: 'tool-runway', name: 'RunwayML', description: 'AI platform for video editing and generation.', tags: ['video', 'creative', 'genai'] },
];

// --- Styled Components ---
const Container = styled.div`
  display: grid;
  gap: var(--spacing-lg, 1.5rem);
`;

const ToolsSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-md, 1rem);
`;

const ToolCard = styled.div`
  border: 1px solid var(--border-color, #E5E7EB);
  border-radius: 6px;
  padding: var(--spacing-md, 1rem);
  background: var(--bg-primary, white);
  box-shadow: var(--shadow-sm, 0 1px 2px 0 rgba(0, 0, 0, 0.05));
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm, 0.5rem);
`;

const ToolName = styled.h5`
  font-weight: 600;
  font-size: 1rem;
  color: var(--text-primary, #1F2937);
`;

const ToolDescription = styled.p`
  font-size: 0.875rem;
  color: var(--text-secondary, #6B7280);
  flex-grow: 1; // Push actions to the bottom
`;

const ToolTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-xs, 0.25rem);
`;

const Tag = styled.span`
  background-color: var(--bg-secondary, #F9FAFB);
  color: var(--text-secondary, #6B7280);
  padding: 0.1rem 0.5rem;
  border-radius: 99px;
  font-size: 0.75rem;
  border: 1px solid var(--border-color, #E5E7EB);
`;

const ToolActions = styled.div`
  display: flex;
  gap: var(--spacing-sm, 0.5rem);
  margin-top: var(--spacing-sm, 0.5rem);
`;

const ActionButton = styled.button`
  padding: 0.3rem 0.6rem;
  background: var(--bg-secondary, #F9FAFB);
  color: var(--color-primary, #3B82F6);
  border: 1px solid var(--border-color, #E5E7EB);
  border-radius: 0.375rem;
  font-weight: 500;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all var(--transition-fast, 150ms ease);
  flex-grow: 1; // Make buttons fill space

  &:hover {
    background-color: #E5E7EB; // Slightly darker background on hover
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const SearchSection = styled.div`
  display: flex;
  gap: var(--spacing-md, 1rem);
  align-items: center;
  border-top: 1px solid var(--border-color, #E5E7EB);
  padding-top: var(--spacing-lg, 1.5rem);
`;

const Input = styled.input`
  padding: var(--spacing-sm, 0.5rem);
  border: 1px solid var(--border-color, #D1D5DB);
  border-radius: 0.375rem;
  font-size: 0.875rem;
  background-color: var(--bg-primary, white);
  color: var(--text-primary, #1F2937);
  flex-grow: 1;

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
  white-space: nowrap;

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

const ResultDisplay = styled.div` /* Reusing */
  padding: var(--spacing-md, 1rem);
  border-radius: 6px;
  background: var(--bg-secondary, #F9FAFB);
  border: 1px solid var(--border-color, #E5E7EB);
  font-size: 0.875rem;
  min-height: 100px;
`;

const ResultTitle = styled.h4` /* Reusing */
  font-weight: 600;
  margin-bottom: var(--spacing-sm, 0.5rem);
  color: ${props => props.color || 'inherit'};
`;

const ResultPre = styled.pre` /* Reusing */
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

export default function ToolStackTester({ onTest }: ToolStackTesterProps) {
  const [lastResult, setLastResult] = useState<TestResult | null>(null);
  const [isLoading, setIsLoading] = useState<string | null>(null); // Track type of test loading
  const [searchTag, setSearchTag] = useState('');

  const runTest = async (testType: string, params: any = {}) => {
    setIsLoading(testType + JSON.stringify(params)); // Unique loading state
    setLastResult(null);
    try {
      const config = {
        type: testType,
        params
      };
      const result = await onTest(config);

      // Add mock data based on test type
      if (result.success) {
          if(testType === 'saveUserStack'){
              result.data = { saved: true, userId: 'mock-user-id', tool: params.toolName };
          } else if (testType === 'saveAnonStack'){
              result.data = { saved: true, sessionId: 'mock-session-id-123', tool: params.toolName };
          } else if (testType === 'searchTool'){
              // Filter mock tools based on the tag
              const foundTools = MOCK_TOOLS.filter(t => t.tags.includes(params.tag));
              result.data = foundTools;
              // Set the message based on search results
              result.message = foundTools.length > 0 
                ? `Found ${foundTools.length} tools with tag '${params.tag}'.` 
                : `No tools found for tag '${params.tag}'.`;
          }
      }

      setLastResult(result);
    } catch (error) {
      setLastResult({
        success: false,
        message: error instanceof Error ? error.message : `Tool Stack test (${testType}) failed unexpectedly`
      });
    } finally {
      setIsLoading(null);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
      e.preventDefault();
      if (searchTag.trim()){
          runTest('searchTool', { tag: searchTag.trim().toLowerCase() });
      }
  }

  const renderResult = () => {
    if (!lastResult) return <p>Perform an action (Save, Search) to see results.</p>;
    
    // Check if data is an array (for search results) before stringifying
    const dataString = lastResult.data 
      ? JSON.stringify(lastResult.data, null, 2) 
      : 'No additional data.';
      
    const resultData = (
        <ResultPre>{dataString}</ResultPre>
    );
    
    return (
      <React.Fragment>
        <ResultTitle color={lastResult.success ? 'var(--color-secondary, green)' : 'red'}>
          {lastResult.success ? '✅ Action Succeeded' : '❌ Action Failed'}
        </ResultTitle>
        <p>{lastResult.message}</p>
        {resultData}
      </React.Fragment>
    );
  };

  return (
    <Container>
      {/* Tool Cards Section */}
      <ToolsSection>
        {MOCK_TOOLS.map(tool => (
          <ToolCard key={tool.id}>
            <ToolName>{tool.name}</ToolName>
            <ToolDescription>{tool.description}</ToolDescription>
            <ToolTags>
                {tool.tags.map(tag => <Tag key={tag}>{tag}</Tag>)}
            </ToolTags>
            <ToolActions>
              <ActionButton
                onClick={() => runTest('saveUserStack', { toolName: tool.name })}
                disabled={!!isLoading}
              >
                Save (User)
              </ActionButton>
              <ActionButton
                onClick={() => runTest('saveAnonStack', { toolName: tool.name })}
                disabled={!!isLoading}
              >
                Save (Anon)
              </ActionButton>
            </ToolActions>
          </ToolCard>
        ))}
      </ToolsSection>

      {/* Search Section */}
      <SearchSection as="form" onSubmit={handleSearch}>
        <Input 
            type="text"
            placeholder="Search tool by tag (e.g., llm, video)"
            value={searchTag}
            onChange={(e) => setSearchTag(e.target.value)}
            disabled={!!isLoading} 
        />
        <Button type="submit" disabled={!!isLoading || !searchTag.trim()}>
            Search
        </Button>
      </SearchSection>

      {/* Result Display Section */}
      <ResultDisplay>
        {isLoading ? <p>Performing action...</p> : renderResult()}
      </ResultDisplay>
    </Container>
  );
} 