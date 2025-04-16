import React from 'react';
import styled from 'styled-components';

const Section = styled.section`
  padding: 5rem 0;
`;

const Container = styled.div`
  max-width: 72rem;
  margin: 0 auto;
  padding: 0 1rem;
`;

const CTAWrapper = styled.div`
  background-color: #3B82F6;
  border-radius: 1rem;
  padding: 3rem;
  text-align: center;
  color: white;
`;

const Title = styled.h2`
  font-size: 2.25rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: white;
`;

const Description = styled.p`
  font-size: 1.25rem;
  margin-bottom: 2rem;
  max-width: 42rem;
  margin-left: auto;
  margin-right: auto;
  color: white;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
`;

const PrimaryButton = styled.button`
  background-color: white;
  color: #3B82F6;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  transition: background-color 0.2s;
  border: none;
  font-size: 1.1rem;
  &:hover {
    background-color: #F9FAFB;
  }
`;

export default function FinalCTA() {
  return (
    <Section>
      <Container>
        <CTAWrapper>
          <Title>Ready to Start Learning?</Title>
          <Description>
            Create your free account to track progress, earn XP, and unlock premium content
          </Description>
          <ButtonGroup>
            <PrimaryButton>
              Start Learning now
            </PrimaryButton>
          </ButtonGroup>
        </CTAWrapper>
      </Container>
    </Section>
  );
} 