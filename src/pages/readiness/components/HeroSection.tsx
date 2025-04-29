import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartSimple, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import QuizInterface from './QuizInterface';
import { FaRegCircle } from 'react-icons/fa6';

const Section = styled.section`
  padding-top: 8rem;
  padding-bottom: 4rem;
  background-color: #F9FAFB;
`;

const Container = styled.div`
  max-width: 72rem;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.md};
  display: flex;
  align-items: flex-start;
  gap: 4rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    gap: 2rem;
    align-items: center;
  }
`;

const ContentContainer = styled.div`
  flex: 1;
  max-width: 36rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    max-width: 100%;
    text-align: center;
  }
`;

const Badge = styled.div`
  display: inline-flex;
  align-items: center;
  background-color: #6366F1;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  margin-bottom: 1.5rem;
`;

const BadgeIcon = styled(FaRegCircle)`
  margin-right: 0.5rem;
  color: white;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  color: #0F172A;
  margin-bottom: 1.5rem;
  text-align: left;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 3.75rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    text-align: center;
  }
`;

const Description = styled.p`
  font-size: 1.25rem;
  color: rgba(15, 23, 42, 0.7);
  max-width: 42rem;
  margin: 0 auto 2rem;
  text-align: left;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    text-align: center;
  }
`;

const Button = styled.button`
  background-color: #3B82F6;
  color: white;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  font-size: 1.125rem;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  transition: background-color 0.2s;
  border: none;

  &:hover {
    background-color: #2563EB;
  }
`;

const ButtonIcon = styled(FontAwesomeIcon)`
  margin-left: 0.5rem;
`;

const QuizContainer = styled.div`
  flex: 1;
  max-width: 48rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    max-width: 100%;
    width: 100%;
  }
`;

export default function ReadinessHeroSection() {
  return (
    <Section id="readiness-hero">
      <Container>
        <ContentContainer>
          <Badge>
            <BadgeIcon />
            Readiness Quiz
          </Badge>
          <Title>How Ready Are You to Scale Offshore?</Title>
          <Description>
            Answer a few quick questions and get your Readiness Score.
          </Description>
          <Button>
            Sign Up to Start the Quiz
            <ButtonIcon icon={faArrowRight} />
          </Button>
        </ContentContainer>
        <QuizContainer>
          <QuizInterface />
        </QuizContainer>
      </Container>
    </Section>
  );
} 