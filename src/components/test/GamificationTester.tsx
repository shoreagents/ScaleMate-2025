import React, { useState } from 'react';
import styled from 'styled-components';

interface TestResult {
  success: boolean;
  message?: string;
  data?: unknown;
}

interface GamificationTesterProps {
  onTest: (config: any) => Promise<TestResult>;
}

// --- Mock Data ---
const MOCK_BADGES = [
  { id: 'badge_quiz_complete', name: 'Quiz Whiz', description: 'Completed the Readiness Quiz.' },
  { id: 'badge_first_role', name: 'Role Architect', description: 'Built your first role.' },
  { id: 'badge_level_5', name: 'Level 5 Achiever', description: 'Reached Level 5.' },
  { id: 'badge_tool_master', name: 'Tool Collector', description: 'Saved 5 tools to your stack.' },
];

// --- Styled Components (Reusing) ---
const Container = styled.div`
  display: grid;
  gap: var(--spacing-lg, 1.5rem);
`;

const TestGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end; // Align items to bottom for better layout with inputs
  gap: var(--spacing-md, 1rem);
  padding-bottom: var(--spacing-md, 1rem);
  border-bottom: 1px solid var(--border-color, #E5E7EB);
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs, 0.25rem);
  flex-grow: 1;
  min-width: 150px; // Ensure inputs don't get too small
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
  white-space: nowrap;
  height: fit-content; // Align button bottom with inputs

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
  min-height: 150px;
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

// Mock user state (replace with actual state management later)
let mockUserState = {
    userId: 'user-123',
    xp: 150,
    level: 2,
    badges: [MOCK_BADGES[0].id]
};

export default function GamificationTester({ onTest }: GamificationTesterProps) {
  const [lastResult, setLastResult] = useState<TestResult | null>(null);
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const [userId, setUserId] = useState(mockUserState.userId);
  const [xpAmount, setXpAmount] = useState('100');
  const [selectedBadge, setSelectedBadge] = useState(MOCK_BADGES[1].id);

  const runTest = async (testType: string, params: any = {}) => {
    setIsLoading(testType);
    setLastResult(null);
    try {
      const config = {
        type: testType,
        params: { userId, ...params }
      };
      const result = await onTest(config);

      // --- Simulate State Update --- 
      if (result.success) {
        let message = result.message || 'Action successful.';
        if (testType === 'awardXp') {
            const awardedXp = parseInt(params.amount || '0', 10);
            mockUserState.xp += awardedXp;
            mockUserState.level = Math.floor(Math.sqrt(mockUserState.xp / 100)) + 1; // Recalculate level
            message = `Awarded ${awardedXp} XP. User is now Level ${mockUserState.level}.`;
        } else if (testType === 'unlockBadge') {
            if (!mockUserState.badges.includes(params.badgeId)) {
                mockUserState.badges.push(params.badgeId);
                message = `Badge '${MOCK_BADGES.find(b=>b.id === params.badgeId)?.name}' unlocked.`;
            } else {
                 message = `User already has badge '${MOCK_BADGES.find(b=>b.id === params.badgeId)?.name}'.`;
            }
        }
        result.message = message; // Update message with simulation result
        result.data = { ...mockUserState }; // Show current mock state
      }
      // --- End Simulation ---

      setLastResult(result);
    } catch (error) {
      setLastResult({
        success: false,
        message: error instanceof Error ? error.message : `Gamification test (${testType}) failed unexpectedly`
      });
    } finally {
      setIsLoading(null);
    }
  };

  const renderResult = () => {
    if (!lastResult) return <p>Trigger an action to see results and updated user state.</p>;
    const resultData = lastResult.data ? (
        <ResultPre>{JSON.stringify(lastResult.data, null, 2)}</ResultPre>
    ) : null;
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
        {/* Action Triggers */}
        <TestGroup>
            <FormGroup>
                <Label htmlFor="userId">Target User ID</Label>
                <Input 
                    id="userId"
                    type="text"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    placeholder="Enter User ID"
                />
            </FormGroup>
        </TestGroup>
        
        <TestGroup>
            <FormGroup>
                <Label htmlFor="xpAmount">XP Amount</Label>
                <Input 
                    id="xpAmount"
                    type="number"
                    value={xpAmount}
                    onChange={(e) => setXpAmount(e.target.value)}
                    min="0"
                    step="10"
                />
            </FormGroup>
            <Button onClick={() => runTest('awardXp', { amount: xpAmount })} disabled={!!isLoading || !userId || !xpAmount}>Award XP</Button>
        </TestGroup>
        
        <TestGroup>
             <FormGroup>
                <Label htmlFor="badgeId">Badge to Unlock</Label>
                <Select
                    id="badgeId"
                    value={selectedBadge}
                    onChange={(e) => setSelectedBadge(e.target.value)}
                >
                    {MOCK_BADGES.map(badge => (
                        <option key={badge.id} value={badge.id}>{badge.name}</option>
                    ))}
                </Select>
             </FormGroup>
            <Button onClick={() => runTest('unlockBadge', { badgeId: selectedBadge })} disabled={!!isLoading || !userId}>Unlock Badge</Button>
        </TestGroup>

        <TestGroup>
             <Button onClick={() => runTest('viewProgress')} disabled={!!isLoading || !userId}>View Current Progress</Button>
        </TestGroup>

        {/* Result Display */}
        <ResultDisplay>
            {isLoading ? <p>Performing action...</p> : renderResult()}
        </ResultDisplay>
    </Container>
  );
} 