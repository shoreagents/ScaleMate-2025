import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen } from '@fortawesome/free-solid-svg-icons';

const Section = styled.section`
  padding-top: 8rem;
  padding-bottom: 4rem;
  background-color: #fff;
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
  background-color: rgba(59, 130, 246, 0.1);
  color: #3B82F6;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  margin-bottom: 1.5rem;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  color: #0F172A;
  margin-bottom: 1.5rem;
`;

const Description = styled.p`
  font-size: 1.25rem;
  color: #1E293B;
  max-width: 42rem;
  margin: 0 auto;
`;

const Icon = styled(FontAwesomeIcon)`
  margin-right: 0.5rem;
`;

export default function BlogHeroSection() {
  return (
    <Section id="blog-hero">
      <Container>
        <Badge>
          <Icon icon={faBookOpen} />
          Blog & Insights
        </Badge>
        <Title>Explore Smart Scaling Insights</Title>
        <Description>
          Tips, guides, case studies, and playbooks
        </Description>
      </Container>
    </Section>
  );
} 