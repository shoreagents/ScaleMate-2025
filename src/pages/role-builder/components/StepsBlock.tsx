import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBuilding, 
  faListCheck, 
  faToolbox, 
  faFileLines 
} from '@fortawesome/free-solid-svg-icons';

const Section = styled.section`
  padding: 4rem 0;
`;

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const InnerContainer = styled.div`
  max-width: 64rem;
  margin: 0 auto;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const StepWrapper = styled.div<{ isVisible: boolean; delay: number }>`
  position: relative;
  opacity: 0;
  animation: ${fadeIn} 0.5s ease-out forwards;
  animation-delay: ${props => props.delay}s;
  visibility: ${props => props.isVisible ? 'visible' : 'hidden'};
`;

const StepCard = styled.div`
  background: white;
  border-radius: 0.75rem;
  padding: 1.5rem;
  border: 1px solid #E5E7EB;
  height: 100%;
`;

const IconWrapper = styled.div`
  width: 3rem;
  height: 3rem;
  background-color: rgba(99, 102, 241, 0.1);
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
`;

const StepIcon = styled(FontAwesomeIcon)`
  font-size: 1.25rem;
  color: #6366F1;
`;

const StepBadge = styled.div`
  position: absolute;
  top: -0.75rem;
  left: 1rem;
  background-color: #6366F1;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
`;

const StepTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
  color: #0F172A;
`;

const StepDescription = styled.p`
  color: rgba(15, 23, 42, 0.7);
`;

interface StepData {
  icon: any;
  title: string;
  description: string;
}

const steps: StepData[] = [
  {
    icon: faBuilding,
    title: 'Select Department',
    description: 'Choose from pre-built department templates or create custom.'
  },
  {
    icon: faListCheck,
    title: 'Choose Tasks',
    description: 'Select from common tasks or add custom responsibilities.'
  },
  {
    icon: faToolbox,
    title: 'Add Tools',
    description: 'Specify required software and tools for the role.'
  },
  {
    icon: faFileLines,
    title: 'Generate Blueprint',
    description: 'Get AI-generated role description and KPIs.'
  }
];

export default function StepsBlock() {
  const [visibleSteps, setVisibleSteps] = useState<boolean[]>([false, false, false, false]);

  useEffect(() => {
    steps.forEach((_, index) => {
      setTimeout(() => {
        setVisibleSteps(prev => {
          const newState = [...prev];
          newState[index] = true;
          return newState;
        });
      }, (index + 1) * 500); // 500ms delay between each step
    });
  }, []);

  return (
    <Section id="steps-block">
      <Container>
        <InnerContainer>
          <Grid>
            {steps.map((step, index) => (
              <StepWrapper 
                key={index} 
                isVisible={visibleSteps[index]}
                delay={(index + 1) * 0.5}
              >
                <StepCard>
                  <IconWrapper>
                    <StepIcon icon={step.icon} />
                  </IconWrapper>
                  <StepBadge>Step {index + 1}</StepBadge>
                  <StepTitle>{step.title}</StepTitle>
                  <StepDescription>{step.description}</StepDescription>
                </StepCard>
              </StepWrapper>
            ))}
          </Grid>
        </InnerContainer>
      </Container>
    </Section>
  );
} 