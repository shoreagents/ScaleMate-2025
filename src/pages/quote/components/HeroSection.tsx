import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalculator } from '@fortawesome/free-solid-svg-icons';

const Section = styled.section`
  padding-top: 8rem;
  padding-bottom: 4rem;
`;

const Container = styled.div`
  max-width: 72rem;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.md};
  text-align: center;
`;

const Badge = styled.div`
  display: inline-flex;
  align-items: center;
  background-color: #3B82F6;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  margin-bottom: 1.5rem;
`;

const BadgeIcon = styled(FontAwesomeIcon)`
  margin-right: 0.5rem;
  color: white;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  color: #0F172A;
  margin-bottom: 1.5rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 3.75rem;
  }
`;

const Description = styled.p`
  font-size: 1.25rem;
  color: rgba(15, 23, 42, 0.7);
  max-width: 42rem;
  margin: 0 auto;
`;

export default function QuoteHeroSection() {
  return (
    <Section id="quote-hero">
      <Container>
        <Badge>
          <BadgeIcon icon={faCalculator} />
          Quick Quote Calculator
        </Badge>
        <Title>What Would This Role Cost Offshore?</Title>
        <Description>
          Try our instant quote tool to see how much you could save with offshore talent.
        </Description>
      </Container>
    </Section>
  );
} 