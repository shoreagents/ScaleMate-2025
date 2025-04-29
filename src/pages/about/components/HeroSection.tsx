import React from 'react';
import styled from 'styled-components';

const Section = styled.section`
  padding-top: 8rem;
  padding-bottom: 4rem;
  background-color: #F9FAFB;
`;

const Container = styled.div`
  max-width: 1280px;
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
    <Section id="about-hero">
      <Container>
        <Title>Why We Built ScaleMate</Title>
        <Description>We believe every business deserves scaling superpowers.</Description>
      </Container>
    </Section>
  );
} 