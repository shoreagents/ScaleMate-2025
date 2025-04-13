import React from 'react';
import styled from 'styled-components';

interface PageCreatorPanelProps {
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

const PageCreatorPanel: React.FC<PageCreatorPanelProps> = ({ onTest }) => {
  const handleTest = async () => {
    const result = await onTest({
      type: 'page_creator',
      params: {
        testType: 'basic_creation'
      }
    });
    console.log('Test result:', result);
  };

  return (
    <Container>
      <Title>Page Creator Test Panel</Title>
      <Button onClick={handleTest}>Run Page Creation Test</Button>
    </Container>
  );
};

export default PageCreatorPanel; 