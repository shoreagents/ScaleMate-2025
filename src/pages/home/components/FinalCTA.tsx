import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalculator, faCalendarCheck } from '@fortawesome/free-solid-svg-icons';

const Section = styled.section`
  padding: 5rem 0;
`;

const Container = styled.div`
  max-width: 72rem;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.md};
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
`;

const Description = styled.p`
  font-size: 1.25rem;
  margin-bottom: 2rem;
  max-width: 42rem;
  margin-left: auto;
  margin-right: auto;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

const PrimaryButton = styled(Link)`
  background-color: white;
  color: #3B82F6;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  transition: background-color 0.2s;

  &:hover {
    background-color: #F9FAFB;
  }
`;

const SecondaryButton = styled(Link)`
  background-color: #EC297B;
  color: white;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  transition: background-color 0.2s;

  &:hover {
    background-color: #D91A6B;
  }
`;

export default function FinalCTA() {
  return (
    <Section id="final-cta">
      <Container>
        <CTAWrapper>
          <Title>Start Building Your Offshore Strategy</Title>
          <Description>
            Join thousands of businesses that are scaling smarter with ScaleMate's AI-powered offshore solutions.
          </Description>
          <ButtonGroup>
            <PrimaryButton href="#">
              Get My Free Quote
              <FontAwesomeIcon icon={faCalculator} />
            </PrimaryButton>
            <SecondaryButton href="#">
              Book a Strategy Call
              <FontAwesomeIcon icon={faCalendarCheck} />
            </SecondaryButton>
          </ButtonGroup>
        </CTAWrapper>
      </Container>
    </Section>
  );
} 