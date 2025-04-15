import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCalculator, 
  faUsersGear, 
  faClipboardQuestion,
  faArrowRight 
} from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

const Section = styled.section`
  padding: 5rem 0;
  background: ${({ theme }) => theme.colors.background.primary};
  width: 100%;
`;

const Container = styled.div`
  max-width: 72rem;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.md};
`;

const Title = styled.h2`
  font-size: 2.25rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 4rem;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Card = styled.div`
  background-color: ${({ theme }) => theme.colors.background.secondary};
  padding: 1.5rem;
  border-radius: 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const Icon = styled(FontAwesomeIcon)<{ color: string }>`
  font-size: 1.5rem;
  color: ${props => props.color};
  margin-right: 0.75rem;
`;

const CardTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const CardDescription = styled.p`
  color: rgba(15, 23, 42, 0.7);
  margin-bottom: 1rem;
`;

const TryNowLink = styled(Link)`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.primaryDark};
  }
`;

const ArrowIcon = styled(FontAwesomeIcon)`
  margin-left: 0.25rem;
  font-size: 0.875rem;
`;

const tools = [
  {
    icon: faCalculator,
    title: 'Quick Quote',
    description: 'Calculate potential savings with our instant quote generator.',
    color: '#3B82F6',
    link: '/quote'
  },
  {
    icon: faUsersGear,
    title: 'Role Builder',
    description: 'Design custom roles with AI-powered templates and workflows.',
    color: '#EC297B',
    link: '/role-builder'
  },
  {
    icon: faClipboardQuestion,
    title: 'Readiness Quiz',
    description: 'Assess your business\'s readiness for offshore scaling.',
    color: '#00E915',
    link: '/readiness-quiz'
  }
];

export default function ToolHighlights() {
  return (
    <Section>
      <Container>
        <Title>Essential Tools for Scaling</Title>
        <Grid>
          {tools.map((tool, index) => (
            <Card key={index}>
              <CardHeader>
                <Icon icon={tool.icon} color={tool.color} />
                <CardTitle>{tool.title}</CardTitle>
              </CardHeader>
              <CardDescription>{tool.description}</CardDescription>
              <TryNowLink href={tool.link}>
                Try Now <ArrowIcon icon={faArrowRight} />
              </TryNowLink>
            </Card>
          ))}
        </Grid>
      </Container>
    </Section>
  );
} 