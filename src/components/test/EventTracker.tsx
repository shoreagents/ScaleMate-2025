import React from 'react';
import styled from 'styled-components';

interface EventTrackerProps {
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

const EventTracker: React.FC<EventTrackerProps> = ({ onTest }) => {
  const handleTest = async () => {
    const result = await onTest({
      type: 'event_tracking',
      params: {
        testType: 'basic_tracking'
      }
    });
    console.log('Test result:', result);
  };

  return (
    <Container>
      <Title>Event Tracking Test Panel</Title>
      <Button onClick={handleTest}>Run Event Tracking Test</Button>
    </Container>
  );
};

export default EventTracker; 