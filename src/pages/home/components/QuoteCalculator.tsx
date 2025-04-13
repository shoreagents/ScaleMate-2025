import React, { useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const CalculatorSection = styled.section`
  padding: ${({ theme }) => theme.spacing.xl} 0;
  background-color: ${({ theme }) => theme.colors.background.secondary};
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

const Title = styled.h2`
  font-size: 2.25rem;
  font-weight: 700;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const Description = styled.p`
  font-size: 1.125rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  max-width: 32rem;
  margin: 0 auto ${({ theme }) => theme.spacing.lg};
`;

const CalculatorCard = styled.div`
  background-color: ${({ theme }) => theme.colors.background.primary};
  border-radius: 1rem;
  padding: ${({ theme }) => theme.spacing.xl};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  max-width: 64rem;
  margin: 0 auto;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: ${({ theme }) => theme.spacing.md};

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const FormGroup = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const Label = styled.label`
  display: block;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.colors.text.primary};
  font-weight: 500;
`;

const Select = styled.select`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.colors.background.primary};
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const ResultsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.lg};

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const ResultCard = styled.div`
  background-color: ${({ theme }) => theme.colors.background.secondary};
  border-radius: 0.5rem;
  padding: ${({ theme }) => theme.spacing.md};
  text-align: center;
`;

const ResultTitle = styled.div`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 0.875rem;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const ResultValue = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const SavingsCard = styled(ResultCard)`
  background-color: ${({ theme }) => theme.colors.success};
  color: white;
`;

const Button = styled.button`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border-radius: 0.5rem;
  font-weight: 500;
  margin-top: ${({ theme }) => theme.spacing.md};
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
  }
`;

const Visualization = styled.div`
  margin-top: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.background.secondary};
  border-radius: 0.5rem;
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export default function QuoteCalculator() {
  const [industry, setIndustry] = useState('technology');
  const [role, setRole] = useState('developer');
  const [experience, setExperience] = useState('mid');
  const [location, setLocation] = useState('us');
  const [teamSize, setTeamSize] = useState('1-5');

  const calculateCosts = () => {
    // Base prices for offshore talent
    const offshoreBasePrices = {
      '1-5': 2500,
      '6-10': 2250,
      '11-20': 2000,
      '21-50': 1750,
      '51+': 1500
    };

    // Role multipliers
    const roleMultipliers = {
      developer: 1,
      designer: 0.9,
      marketer: 0.8,
      'customer-support': 0.7
    };

    // Experience multipliers
    const experienceMultipliers = {
      junior: 0.8,
      mid: 1,
      senior: 1.2
    };

    // Location multipliers for local costs
    const locationMultipliers = {
      us: 1.5,
      uk: 1.3,
      au: 1.4,
      nz: 1.2
    };

    const offshoreBasePrice = offshoreBasePrices[teamSize as keyof typeof offshoreBasePrices];
    const roleMultiplier = roleMultipliers[role as keyof typeof roleMultipliers];
    const experienceMultiplier = experienceMultipliers[experience as keyof typeof experienceMultipliers];
    const locationMultiplier = locationMultipliers[location as keyof typeof locationMultipliers];

    const offshoreCost = Math.round(offshoreBasePrice * roleMultiplier * experienceMultiplier);
    const localCost = Math.round(offshoreCost * locationMultiplier);
    const savings = localCost - offshoreCost;
    const roi = Math.round((savings / offshoreCost) * 100);

    return {
      offshoreCost,
      localCost,
      savings,
      roi
    };
  };

  const { offshoreCost, localCost, savings, roi } = calculateCosts();

  return (
    <CalculatorSection>
      <Container>
        <Content>
          <Title>Quick Quote Calculator</Title>
          <Description>
            Get an instant estimate of your potential savings with ScaleMate's offshore talent solutions.
          </Description>
        </Content>

        <CalculatorCard>
          <FormGrid>
            <FormGroup>
              <Label>Industry</Label>
              <Select value={industry} onChange={(e) => setIndustry(e.target.value)}>
                <option value="technology">Technology</option>
                <option value="finance">Finance</option>
                <option value="healthcare">Healthcare</option>
                <option value="retail">Retail</option>
                <option value="manufacturing">Manufacturing</option>
              </Select>
            </FormGroup>

            <FormGroup>
              <Label>Role Type</Label>
              <Select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="developer">Developer</option>
                <option value="designer">Designer</option>
                <option value="marketer">Marketer</option>
                <option value="customer-support">Customer Support</option>
              </Select>
            </FormGroup>

            <FormGroup>
              <Label>Experience Level</Label>
              <Select value={experience} onChange={(e) => setExperience(e.target.value)}>
                <option value="junior">Junior</option>
                <option value="mid">Mid-level</option>
                <option value="senior">Senior</option>
              </Select>
            </FormGroup>

            <FormGroup>
              <Label>Location</Label>
              <Select value={location} onChange={(e) => setLocation(e.target.value)}>
                <option value="us">United States</option>
                <option value="uk">United Kingdom</option>
                <option value="au">Australia</option>
                <option value="nz">New Zealand</option>
              </Select>
            </FormGroup>

            <FormGroup>
              <Label>Team Size</Label>
              <Select value={teamSize} onChange={(e) => setTeamSize(e.target.value)}>
                <option value="1-5">1-5 team members</option>
                <option value="6-10">6-10 team members</option>
                <option value="11-20">11-20 team members</option>
                <option value="21-50">21-50 team members</option>
                <option value="51+">51+ team members</option>
              </Select>
            </FormGroup>
          </FormGrid>

          <ResultsGrid>
            <ResultCard>
              <ResultTitle>Local Cost</ResultTitle>
              <ResultValue>${localCost}</ResultValue>
            </ResultCard>

            <ResultCard>
              <ResultTitle>Offshore Cost</ResultTitle>
              <ResultValue>${offshoreCost}</ResultValue>
            </ResultCard>

            <SavingsCard>
              <ResultTitle>Monthly Savings</ResultTitle>
              <ResultValue>${savings}</ResultValue>
            </SavingsCard>

            <ResultCard>
              <ResultTitle>ROI</ResultTitle>
              <ResultValue>{roi}%</ResultValue>
            </ResultCard>
          </ResultsGrid>

          <Visualization>
            Cost Comparison Visualization (Coming Soon)
          </Visualization>

          <Button as={Link} href="/quote">
            Get Detailed Quote
          </Button>
        </CalculatorCard>
      </Container>
    </CalculatorSection>
  );
} 