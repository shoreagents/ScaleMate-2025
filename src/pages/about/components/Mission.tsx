import React from 'react';
import styled from 'styled-components';

const Section = styled.section`
  padding: 4rem 0;
  background-color: #fff;
`;

const Container = styled.div`
  max-width: 72rem;
  margin: 0 auto;
  padding: 0 1rem;
`;

const Content = styled.div`
  max-width: 48rem;
  margin: 0 auto;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 1.875rem;
  font-weight: 700;
  color: #0F172A;
  margin-bottom: 2rem;
`;

const Description = styled.p`
  font-size: 1.25rem;
  color: #1E293B;
  line-height: 1.75;
`;

export default function Mission() {
  return (
    <Section id="mission">
      <Container>
        <Content>
          <Title>Our Mission</Title>
          <Description>
            To democratize business scaling by making world-class talent and AI tools accessible to companies of all sizes. We're building the bridge between ambitious businesses and transformative growth.
          </Description>
        </Content>
      </Container>
    </Section>
  );
} 