import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

const HeroSection = styled.section`
  padding: ${({ theme }) => theme.spacing.xl} 0;
  background-color: ${({ theme }) => theme.colors.background.primary};
`;

const Container = styled.div`
  max-width: 72rem;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.md};
`;

const Content = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
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
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  align-items: center;
  justify-content: center;

  @media (min-width: 640px) {
    flex-direction: row;
  }
`;

const PrimaryButton = styled(Link)`
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border-radius: 0.5rem;
  font-weight: 500;
  width: 100%;
  text-align: center;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
  }

  @media (min-width: 640px) {
    width: auto;
  }
`;

const SecondaryButton = styled.button`
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 0.5rem;
  font-weight: 500;
  width: 100%;
  transition: border-color 0.2s;

  &:hover {
    border-color: ${({ theme }) => theme.colors.text.secondary};
  }

  @media (min-width: 640px) {
    width: auto;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  max-width: 56rem;
  margin: 0 auto;
`;

const Image = styled.img`
  width: 100%;
  border-radius: 1rem;
  box-shadow: ${({ theme }) => theme.shadows.lg};
`;

export default function Hero() {
  return (
    <HeroSection>
      <Container>
        <Content>
          <Title>Scale Your Team Without The Burnout</Title>
          <Description>
            Leverage offshore talent and AI tools to grow your business smarter. Trusted by 500+ companies across USA, Australia, and New Zealand.
          </Description>
          <ButtonGroup>
            <PrimaryButton href="/quote">
              Get Your Quick Quote
            </PrimaryButton>
            <SecondaryButton>
              Watch Demo
            </SecondaryButton>
          </ButtonGroup>
        </Content>
        
        <ImageContainer>
          <Image 
            src="https://storage.googleapis.com/uxpilot-auth.appspot.com/3516410965-1302145e2c4037431ea7.png" 
            alt="modern dashboard interface showing staffing management platform with data visualizations and team management features, clean and minimal design"
          />
        </ImageContainer>
      </Container>
    </HeroSection>
  );
} 