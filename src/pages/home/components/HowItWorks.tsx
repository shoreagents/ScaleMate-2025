import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faClipboardList, faRocket } from '@fortawesome/free-solid-svg-icons';

const DEBUG_MODE = process.env.NODE_ENV === 'development';

const Section = styled.section`
  padding: 5rem 0;
  background: #F9FAFB;
  width: 100%;
  position: relative;
  z-index: 1;
`;

const Container = styled.div`
  max-width: 72rem;
  margin: 0 auto;
  padding: 0 1rem;
`;

const Title = styled.h2`
  font-size: 2.25rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 4rem;
  color: #0F172A;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Card = styled.div`
  background-color: #FFFFFF;
  padding: 2rem;
  border-radius: 0.75rem;
  border: 1px solid #E5E7EB;
`;

const IconWrapper = styled.div<{ $bgColor: string }>`
  width: 4rem;
  height: 4rem;
  background-color: ${props => props.$bgColor};
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #0F172A;
`;

const CardDescription = styled.p`
  color: rgba(15, 23, 42, 0.7);
`;

const steps = [
  {
    icon: faMagnifyingGlass,
    title: '1. Discover',
    description: 'Explore roles, tools, and cost comparisons to find the perfect fit for your business needs.',
    colors: {
      bg: 'rgba(59, 130, 246, 0.1)',
      icon: '#3B82F6'
    }
  },
  {
    icon: faClipboardList,
    title: '2. Plan',
    description: 'Create detailed role blueprints and automated training flows for seamless onboarding.',
    colors: {
      bg: 'rgba(236, 41, 123, 0.1)',
      icon: '#EC297B'
    }
  },
  {
    icon: faRocket,
    title: '3. Execute',
    description: 'Delegate with confidence and track progress using our smart management tools.',
    colors: {
      bg: 'rgba(0, 233, 21, 0.1)',
      icon: '#00E915'
    }
  }
];

export default function HowItWorks() {
  if (DEBUG_MODE) {
    console.log('HowItWorks component rendering');
  }

  return (
    <Section id="how-it-works">
      <Container>
        <Title>How ScaleMate Works</Title>
        <Grid>
          {steps.map((step, index) => (
            <Card key={index}>
              <IconWrapper $bgColor={step.colors.bg}>
                <FontAwesomeIcon 
                  icon={step.icon} 
                  style={{ 
                    fontSize: '1.5rem',
                    color: step.colors.icon
                  }} 
                />
              </IconWrapper>
              <CardTitle>{step.title}</CardTitle>
              <CardDescription>{step.description}</CardDescription>
            </Card>
          ))}
        </Grid>
      </Container>
    </Section>
  );
} 