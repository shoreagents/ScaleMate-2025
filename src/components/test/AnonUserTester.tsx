import React from 'react';
import styled from 'styled-components';

interface AnonUserTesterProps {
  onTest: (config: any) => Promise<{ success: boolean; message: string }>;
}

const Container = styled.div`
  padding: 1rem;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: #3B82F6;
  color: white;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  &:hover {
    background-color: #2563EB;
  }
`;

const AnonUserTester: React.FC<AnonUserTesterProps> = ({ onTest }) => {
  const handleTest = async () => {
    const result = await onTest({
      type: 'anon_user',
      params: {
        testType: 'basic_flow'
      }
    });
    console.log('Test result:', result);
  };

  return (
    <Container>
      <Title>Anonymous User Flow Test Panel</Title>
      <Button onClick={handleTest}>Run Anonymous User Flow Test</Button>
    </Container>
  );
};

export default AnonUserTester; 