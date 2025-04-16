import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faToolbox } from '@fortawesome/free-solid-svg-icons';

const Section = styled.section`
  padding-top: 8rem;
  padding-bottom: 4rem;
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
  font-size: 1rem;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  color: #0F172A;
  margin-bottom: 1.5rem;
`;

const Description = styled.p`
  font-size: 1.25rem;
  color: rgba(15, 23, 42, 0.7);
  max-width: 42rem;
  margin: 0 auto 2rem;
`;

const Icon = styled(FontAwesomeIcon)`
  margin-right: 0.5rem;
`;

export default function HeroSection() {
  return (
    <Section id="tools-hero">
      <Container>
        <Badge>
          <Icon icon={faToolbox} />
          Tool Library
        </Badge>
        <Title>Your Business Scaling Toolbox</Title>
        <Description>
          Browse AI tools, automation helpers, and delegation stack essentials.
        </Description>
      </Container>
    </Section>
  );
} 