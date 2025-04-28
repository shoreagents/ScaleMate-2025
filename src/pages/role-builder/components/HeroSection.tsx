import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWandMagicSparkles, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FaUsers } from 'react-icons/fa6';

const Section = styled.section`
  padding: 8rem 0 4rem;
`;

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem;
  text-align: center;
`;

const Badge = styled.div`
  display: inline-flex;
  align-items: center;
  background-color: #4ADE80;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  margin-bottom: 1.5rem;
`;

const BadgeIcon = styled(FaUsers)`
  margin-right: 0.5rem;
  color: white;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  color: #0F172A;
  margin-bottom: 1.5rem;
  line-height: 1.2;
`;

const Description = styled.p`
  font-size: 1.25rem;
  color: rgba(15, 23, 42, 0.7);
  max-width: 42rem;
  margin: 0 auto 2rem;
  line-height: 1.6;
`;

const Button = styled.button`
  background-color: #3B82F6;
  color: white;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  transition: background-color 0.2s;
  border: none;
  font-size: 1.125rem;
  margin: 0 auto;
  &:hover {
    background-color: #2563EB;
  }
`;

const ButtonIcon = styled(FontAwesomeIcon)`
  margin-left: 0.5rem;
`;

export default function RoleBuilderHeroSection() {
  return (
    <Section id="role-builder-hero">
      <Container>
        <Badge>
          <BadgeIcon />
          AI-Powered Role Builder
        </Badge>
        <Title>Build the Perfect Offshore Role with AI</Title>
        <Description>
          Use our wizard to create a ready-to-hire role with job description, tasks, tools, and KPIs.
        </Description>
        <Button>
          Try Role Builder
          <ButtonIcon icon={faArrowRight} />
        </Button>
      </Container>
    </Section>
  );
} 