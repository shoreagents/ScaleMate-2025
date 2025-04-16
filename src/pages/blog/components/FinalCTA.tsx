import React from 'react';
import styled from 'styled-components';

const Section = styled.section`
  padding: 3rem 0;
`;

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const CTABox = styled.div`
  background-color: #3B82F6;
  border-radius: 1rem;
  padding: 2rem;
  text-align: center;

  @media (min-width: 768px) {
    padding: 3rem;
  }
`;

const Title = styled.h2`
  font-size: 1.875rem;
  font-weight: 700;
  color: white;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 2rem;
`;

const Button = styled.button`
  background-color: white;
  color: #3B82F6;
  padding: 0.75rem 2rem;
  border-radius: 0.5rem;
  font-weight: 500;
  transition: background-color 0.2s;
  border: none;

  &:hover {
    background-color: rgba(255, 255, 255, 0.9);
  }
`;

export default function FinalCTA() {
  return (
    <Section id="blog-cta">
      <Container>
        <CTABox>
          <Title>Ready to Start Your Scaling Journey?</Title>
          <Description>Try our Role Builder tool and create your perfect offshore team structure.</Description>
          <Button>Try Role Builder Free</Button>
        </CTABox>
      </Container>
    </Section>
  );
} 