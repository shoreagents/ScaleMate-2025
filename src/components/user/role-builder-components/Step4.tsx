import React from 'react';
import styled from 'styled-components';
import { FaArrowLeft, FaArrowRight, FaComments, FaClock } from 'react-icons/fa';
import { NavigationButtons, BackButton, ContinueButton } from './sharedStyles';

const Section = styled.section`
  background-color: white;
  border-radius: 0.75rem;
  border: 1px solid #E5E7EB;
  padding: 2rem;
  width: 100%;
  
  @media only screen and (max-width: 1023px) {
    padding: 1.5rem;
  }
  
  @media only screen and (max-width: 767px) {
    padding: 1.25rem;
  }
  
  @media only screen and (max-width: 480px) {
    padding: 1rem;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #0F172A;
  margin-bottom: 0.5rem;
  
  @media only screen and (max-width: 767px) {
    font-size: 1.25rem;
  }
  
  @media only screen and (max-width: 480px) {
    font-size: 1.125rem;
  }
`;

const SectionDescription = styled.p`
  color: rgba(15, 23, 42, 0.7);
  margin-bottom: 2rem;
  
  @media only screen and (max-width: 767px) {
    font-size: 0.9375rem;
    margin-bottom: 1.5rem;
  }
  
  @media only screen and (max-width: 480px) {
    font-size: 0.875rem;
    margin-bottom: 1.25rem;
  }
`;

const Label = styled.label`
  display: block;
  color: #0F172A;
  font-weight: 500;
  margin-bottom: 0.5rem;
  
  @media only screen and (max-width: 767px) {
    font-size: 0.9375rem;
  }
  
  @media only screen and (max-width: 480px) {
    font-size: 0.875rem;
  }
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
  
  @media only screen and (max-width: 767px) {
    padding: 0.625rem 0.875rem;
    font-size: 0.9375rem;
  }
  
  @media only screen and (max-width: 480px) {
    padding: 0.5rem 0.75rem;
    font-size: 0.875rem;
  }
`;

const HoursGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
  
  @media only screen and (max-width: 1023px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media only screen and (max-width: 767px) {
    grid-template-columns: 1fr;
    gap: 0.875rem;
    margin-bottom: 1.5rem;
  }
  
  @media only screen and (max-width: 480px) {
    gap: 0.75rem;
    margin-bottom: 1.25rem;
  }
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
  
  @media only screen and (max-width: 767px) {
    padding: 0.875rem;
  }
  
  @media only screen and (max-width: 480px) {
    padding: 0.75rem;
  }
`;

const HoursHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  
  @media only screen and (max-width: 480px) {
    gap: 0.5rem;
  }
`;

const HoursTitle = styled.span`
  font-weight: 500;
  color: #0F172A;
  
  @media only screen and (max-width: 767px) {
    font-size: 0.9375rem;
  }
  
  @media only screen and (max-width: 480px) {
    font-size: 0.875rem;
  }
`;

const HoursDescription = styled.p`
  font-size: 0.875rem;
  color: rgba(15, 23, 42, 0.7);
  margin-top: 0.5rem;
  
  @media only screen and (max-width: 767px) {
    font-size: 0.8125rem;
    margin-top: 0.375rem;
  }
  
  @media only screen and (max-width: 480px) {
    font-size: 0.75rem;
    margin-top: 0.25rem;
  }
`;

const CommunicationGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
  
  @media only screen and (max-width: 767px) {
    grid-template-columns: 1fr;
    gap: 0.875rem;
    margin-bottom: 1.5rem;
  }
  
  @media only screen and (max-width: 480px) {
    gap: 0.75rem;
    margin-bottom: 1.25rem;
  }
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
  
  @media only screen and (max-width: 767px) {
    padding: 0.875rem;
  }
  
  @media only screen and (max-width: 480px) {
    padding: 0.75rem;
  }
`;

const CommunicationHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  gap: 0.75rem;
  
  @media only screen and (max-width: 480px) {
    gap: 0.5rem;
    margin-bottom: 0.375rem;
  }
`;

const CommunicationInfo = styled.div`
  display: flex;
  align-items: center;
  min-width: 0;
  flex: 1;
`;

const CommunicationIcon = styled.div<{ $selected?: boolean }>`
  font-size: 1.25rem;
  color: ${props => props.$selected ? '#6366F1' : 'rgba(15, 23, 42, 0.7)'};
  margin-right: 0.75rem;
  flex-shrink: 0;
  
  @media only screen and (max-width: 767px) {
    font-size: 1.125rem;
    margin-right: 0.625rem;
  }
  
  @media only screen and (max-width: 480px) {
    font-size: 1rem;
    margin-right: 0.5rem;
  }
`;

const CommunicationTitle = styled.span`
  font-weight: 500;
  color: #0F172A;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  
  @media only screen and (max-width: 767px) {
    font-size: 0.9375rem;
  }
  
  @media only screen and (max-width: 480px) {
    font-size: 0.875rem;
  }
`;

const CommunicationDescription = styled.p`
  font-size: 0.875rem;
  color: rgba(15, 23, 42, 0.7);
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  
  @media only screen and (max-width: 767px) {
    font-size: 0.8125rem;
  }
  
  @media only screen and (max-width: 480px) {
    font-size: 0.75rem;
  }
`;

const RadioCircle = styled.div<{ $selected?: boolean }>`
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 9999px;
  border: 2px solid ${props => props.$selected ? '#6366F1' : '#E5E7EB'};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  
  @media only screen and (max-width: 480px) {
    width: 1.125rem;
    height: 1.125rem;
  }
`;

const RadioDot = styled.div`
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 9999px;
  background-color: #6366F1;
  
  @media only screen and (max-width: 480px) {
    width: 0.625rem;
    height: 0.625rem;
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

      <NavigationButtons>
        <BackButton onClick={onBack}>
          <FaArrowLeft /> Back to Tools
        </BackButton>
        <ContinueButton onClick={onContinue}>
          Generate Role <FaArrowRight />
        </ContinueButton>
      </NavigationButtons>
    </Section>
  );
};

export default Step4; 