import React from 'react';
import styled from 'styled-components';
import { FaArrowLeft, FaArrowRight, FaComments, FaClock } from 'react-icons/fa';

const Section = styled.section`
  background-color: white;
  border-radius: 0.75rem;
  border: 1px solid #E5E7EB;
  padding: 2rem;
  width: 100%;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #0F172A;
  margin-bottom: 0.5rem;
`;

const SectionDescription = styled.p`
  color: rgba(15, 23, 42, 0.7);
  margin-bottom: 2rem;
`;

const Label = styled.label`
  display: block;
  color: #0F172A;
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #E5E7EB;
  border-radius: 0.5rem;
  outline: none;
  resize: vertical;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
  }
`;

const HoursGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
`;

const HoursCard = styled.div<{ $selected?: boolean }>`
  border: 2px solid ${props => props.$selected ? '#6366F1' : '#E5E7EB'};
  border-radius: 0.5rem;
  padding: 1rem;
  background-color: ${props => props.$selected ? 'rgba(99, 102, 241, 0.05)' : 'transparent'};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #6366F1;
    background-color: rgba(99, 102, 241, 0.05);
  }
`;

const HoursHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const HoursTitle = styled.span`
  font-weight: 500;
  color: #0F172A;
`;

const HoursDescription = styled.p`
  font-size: 0.875rem;
  color: rgba(15, 23, 42, 0.7);
  margin-top: 0.5rem;
`;

const CommunicationGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
`;

const CommunicationCard = styled.div<{ $selected?: boolean }>`
  border: 2px solid ${props => props.$selected ? '#6366F1' : '#E5E7EB'};
  border-radius: 0.5rem;
  padding: 1rem;
  background-color: ${props => props.$selected ? 'rgba(99, 102, 241, 0.05)' : 'transparent'};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #6366F1;
    background-color: rgba(99, 102, 241, 0.05);
  }
`;

const CommunicationHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

const CommunicationInfo = styled.div`
  display: flex;
  align-items: center;
`;

const CommunicationIcon = styled.div<{ $selected?: boolean }>`
  font-size: 1.25rem;
  color: ${props => props.$selected ? '#6366F1' : 'rgba(15, 23, 42, 0.7)'};
  margin-right: 0.75rem;
`;

const CommunicationTitle = styled.span`
  font-weight: 500;
  color: #0F172A;
`;

const CommunicationDescription = styled.p`
  font-size: 0.875rem;
  color: rgba(15, 23, 42, 0.7);
`;

const RadioCircle = styled.div<{ $selected?: boolean }>`
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 9999px;
  border: 2px solid ${props => props.$selected ? '#6366F1' : '#E5E7EB'};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RadioDot = styled.div`
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 9999px;
  background-color: #6366F1;
`;

const NavigationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const BackButton = styled.button`
  padding: 0.75rem 1.5rem;
  color: #0F172A;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: none;
  transition: all 0.2s;

  &:hover {
    background-color: #F9FAFB;
  }
`;

const ContinueButton = styled.button`
  background-color: #3B82F6;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: none;
  transition: all 0.2s;

  &:hover {
    background-color: rgba(59, 130, 246, 0.9);
  }
`;

interface Step4Props {
  onBack: () => void;
  onContinue: () => void;
}

const Step4: React.FC<Step4Props> = ({ onBack, onContinue }) => {
  const [expectedOutcomes, setExpectedOutcomes] = React.useState<string>('');
  const [selectedHours, setSelectedHours] = React.useState<string>('full-time');
  const [selectedCommunication, setSelectedCommunication] = React.useState<string>('synchronous');

  return (
    <Section>
      <SectionTitle>Set expectations</SectionTitle>
      <SectionDescription>Tell us how this role should perform.</SectionDescription>

      <div>
        <Label>Expected Outcomes</Label>
        <TextArea 
          rows={4} 
          placeholder="List the key results you expect from this role..."
          value={expectedOutcomes}
          onChange={(e) => setExpectedOutcomes(e.target.value)}
        />
      </div>

      <div>
        <Label>Working Hours</Label>
        <HoursGrid>
          <HoursCard 
            $selected={selectedHours === 'full-time'}
            onClick={() => setSelectedHours('full-time')}
          >
            <HoursHeader>
              <HoursTitle>Full-time</HoursTitle>
              <RadioCircle $selected={selectedHours === 'full-time'}>
                {selectedHours === 'full-time' && <RadioDot />}
              </RadioCircle>
            </HoursHeader>
            <HoursDescription>40 hours/week</HoursDescription>
          </HoursCard>

          <HoursCard 
            $selected={selectedHours === 'part-time'}
            onClick={() => setSelectedHours('part-time')}
          >
            <HoursHeader>
              <HoursTitle>Part-time</HoursTitle>
              <RadioCircle $selected={selectedHours === 'part-time'}>
                {selectedHours === 'part-time' && <RadioDot />}
              </RadioCircle>
            </HoursHeader>
            <HoursDescription>20-30 hours/week</HoursDescription>
          </HoursCard>

          <HoursCard 
            $selected={selectedHours === 'flexible'}
            onClick={() => setSelectedHours('flexible')}
          >
            <HoursHeader>
              <HoursTitle>Flexible</HoursTitle>
              <RadioCircle $selected={selectedHours === 'flexible'}>
                {selectedHours === 'flexible' && <RadioDot />}
              </RadioCircle>
            </HoursHeader>
            <HoursDescription>Variable hours</HoursDescription>
          </HoursCard>
        </HoursGrid>
      </div>

      <div>
        <Label>Communication Preference</Label>
        <CommunicationGrid>
          <CommunicationCard 
            $selected={selectedCommunication === 'synchronous'}
            onClick={() => setSelectedCommunication('synchronous')}
          >
            <CommunicationHeader>
              <CommunicationInfo>
                <CommunicationIcon $selected={selectedCommunication === 'synchronous'}>
                  <FaComments />
                </CommunicationIcon>
                <CommunicationTitle>Synchronous</CommunicationTitle>
              </CommunicationInfo>
              <RadioCircle $selected={selectedCommunication === 'synchronous'}>
                {selectedCommunication === 'synchronous' && <RadioDot />}
              </RadioCircle>
            </CommunicationHeader>
            <CommunicationDescription>Real-time communication during work hours</CommunicationDescription>
          </CommunicationCard>

          <CommunicationCard 
            $selected={selectedCommunication === 'asynchronous'}
            onClick={() => setSelectedCommunication('asynchronous')}
          >
            <CommunicationHeader>
              <CommunicationInfo>
                <CommunicationIcon $selected={selectedCommunication === 'asynchronous'}>
                  <FaClock />
                </CommunicationIcon>
                <CommunicationTitle>Asynchronous</CommunicationTitle>
              </CommunicationInfo>
              <RadioCircle $selected={selectedCommunication === 'asynchronous'}>
                {selectedCommunication === 'asynchronous' && <RadioDot />}
              </RadioCircle>
            </CommunicationHeader>
            <CommunicationDescription>Flexible response times, documentation-first</CommunicationDescription>
          </CommunicationCard>
        </CommunicationGrid>
      </div>

      <NavigationContainer>
        <BackButton onClick={onBack}>
          <FaArrowLeft /> Back to Tools
        </BackButton>
        <ContinueButton onClick={onContinue}>
          Generate Role <FaArrowRight />
        </ContinueButton>
      </NavigationContainer>
    </Section>
  );
};

export default Step4; 