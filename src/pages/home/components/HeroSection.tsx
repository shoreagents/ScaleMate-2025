import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faPlay } from '@fortawesome/free-solid-svg-icons';

const HeroSection = styled.section`
  padding: 4rem 0;
  background-color: #F9FAFB;
`;

const Container = styled.div`
  max-width: 72rem;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.md};
`;

const Content = styled.div`
  text-align: center;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.text.primary};

  @media (min-width: 768px) {
    font-size: 3.75rem;
  }
`;

const Description = styled.p`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  max-width: 32rem;
  margin: 0 auto ${({ theme }) => theme.spacing.lg};
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: center;
`;

const PrimaryButton = styled(Link)`
  background-color: #3B82F6;
  color: white;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  font-weight: 600;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;

  &:hover {
    background-color: #2563EB;
  }
`;

const SecondaryButton = styled(Link)`
  border: 1px solid #3B82F6;
  color: #3B82F6;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  font-weight: 600;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;

  &:hover {
    background-color: #3B82F6;
    color: white;
  }
`;

export default function Hero() {
  return (
    <HeroSection>
      <Container>
        <Content>
          <Title>Smart Scaling Starts Here</Title>
          <Description>
            Design your offshore team, inject AI into operations, and delegate like a pro.
          </Description>
          <ButtonGroup>
            <PrimaryButton href="#quote-calculator">
              Try the Quick Quote
              <FontAwesomeIcon icon={faArrowRight} />
            </PrimaryButton>
            <SecondaryButton href="#">
              Watch Demo
              <FontAwesomeIcon icon={faPlay} />
            </SecondaryButton>
          </ButtonGroup>
        </Content>
      </Container>
    </HeroSection>
  );
} 