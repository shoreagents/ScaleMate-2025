import React from 'react';
import styled from 'styled-components';
import QuoteCalculator from '@/pages/home/components/QuoteCalculator';

const PricingPage = styled.div`
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
`;

const Description = styled.p`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  max-width: 32rem;
  margin: 0 auto ${({ theme }) => theme.spacing.lg};
`;

const PricingSection = styled.section`
  padding: ${({ theme }) => theme.spacing.xl} 0;
  background-color: ${({ theme }) => theme.colors.background.secondary};
`;

const PricingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: ${({ theme }) => theme.spacing.lg};
  max-width: 64rem;
  margin: 0 auto;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const PricingCard = styled.div`
  background-color: ${({ theme }) => theme.colors.background.primary};
  border-radius: 1rem;
  padding: ${({ theme }) => theme.spacing.xl};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  text-align: center;
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const CardPrice = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const CardDescription = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 ${({ theme }) => theme.spacing.lg};
  text-align: left;
`;

const FeatureItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.text.secondary};

  &::before {
    content: "✓";
    color: ${({ theme }) => theme.colors.primary};
    margin-right: ${({ theme }) => theme.spacing.sm};
  }
`;

const Button = styled.button`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border-radius: 0.5rem;
  font-weight: 500;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
  }
`;

export default function Pricing() {
  return (
    <PricingPage>
      <Container>
        <Content>
          <Title>Simple, Transparent Pricing</Title>
          <Description>
            Choose the plan that fits your needs. All plans include access to our core tools and resources.
          </Description>
        </Content>

        <PricingSection>
          <PricingGrid>
            <PricingCard>
              <CardTitle>Starter</CardTitle>
              <CardPrice>Free</CardPrice>
              <CardDescription>
                Perfect for small teams just getting started with offshore staffing.
              </CardDescription>
              <FeatureList>
                <FeatureItem>Access to basic tools</FeatureItem>
                <FeatureItem>Limited role builder usage</FeatureItem>
                <FeatureItem>Basic cost calculator</FeatureItem>
                <FeatureItem>Community support</FeatureItem>
              </FeatureList>
              <Button>Get Started</Button>
            </PricingCard>

            <PricingCard>
              <CardTitle>Professional</CardTitle>
              <CardPrice>$99/mo</CardPrice>
              <CardDescription>
                For growing teams that need more advanced features and support.
              </CardDescription>
              <FeatureList>
                <FeatureItem>All Starter features</FeatureItem>
                <FeatureItem>Unlimited role builder</FeatureItem>
                <FeatureItem>Advanced cost calculator</FeatureItem>
                <FeatureItem>Priority support</FeatureItem>
                <FeatureItem>Team collaboration</FeatureItem>
              </FeatureList>
              <Button>Start Free Trial</Button>
            </PricingCard>

            <PricingCard>
              <CardTitle>Enterprise</CardTitle>
              <CardPrice>Custom</CardPrice>
              <CardDescription>
                For large organizations with complex staffing needs.
              </CardDescription>
              <FeatureList>
                <FeatureItem>All Professional features</FeatureItem>
                <FeatureItem>Custom integrations</FeatureItem>
                <FeatureItem>Dedicated account manager</FeatureItem>
                <FeatureItem>Advanced analytics</FeatureItem>
                <FeatureItem>Custom training</FeatureItem>
              </FeatureList>
              <Button>Contact Sales</Button>
            </PricingCard>
          </PricingGrid>
        </PricingSection>

   
      </Container>
    </PricingPage>
  );
} 