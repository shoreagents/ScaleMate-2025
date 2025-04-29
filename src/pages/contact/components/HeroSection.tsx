import React from 'react';
import styled from 'styled-components';

const Section = styled.section`
  padding-top: 8rem;
  padding-bottom: 4rem;
`;

const Container = styled.div`
  max-width: 72rem;
  margin: 0 auto;
  padding: 0 1rem;
  text-align: center;
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

export default function HeroSection() {
  return (
    <Section id="contact-hero">
      <Container>
        <Title>Talk to a Real Human</Title>
        <Description>Book a session or send us a message.</Description>
      </Container>
    </Section>
  );
} 