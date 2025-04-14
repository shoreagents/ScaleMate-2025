import React, { useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const Section = styled.section`
  padding: 5rem 0;
  background-color: white;
  position: relative;
  width: 100%;
  display: block;
  margin-bottom: 0;
`;

const Container = styled.div`
  max-width: 72rem;
  margin: 0 auto;
  padding: 0 1rem;
`;

const Calculator = styled.div`
  max-width: 48rem;
  margin: 0 auto;
  background-color: #F9FAFB;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  border: 1px solid #E5E7EB;
`;

const Title = styled.h2`
  font-size: 1.875rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 2rem;
  color: #0F172A;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Label = styled.label`
  display: block;
  color: #0F172A;
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid #E5E7EB;
  background-color: white;
  color: #0F172A;
`;

const ResultsSection = styled.div`
  background-color: white;
  padding: 1.5rem;
  border-radius: 0.75rem;
  border: 1px solid #E5E7EB;
`;

const CostRow = styled.div`
  margin-bottom: 1rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const CostHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

const CostLabel = styled.span`
  color: #0F172A;
`;

const CostValue = styled.span<{ color: string }>`
  font-weight: 700;
  color: ${props => props.color};
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 0.5rem;
  background-color: #E5E7EB;
  border-radius: 9999px;
`;

const ProgressFill = styled.div<{ width: string; color: string }>`
  height: 100%;
  border-radius: 9999px;
  background-color: ${props => props.color};
  width: ${props => props.width};
`;

const SavingsBox = styled.div`
  margin-top: 1.5rem;
  padding: 1rem;
  background-color: rgba(59, 130, 246, 0.1);
  border-radius: 0.5rem;
`;

const MonthlySavings = styled.p`
  color: #3B82F6;
  font-weight: 600;
`;

const AnnualSavings = styled.p`
  color: rgba(15, 23, 42, 0.6);
  font-size: 0.875rem;
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
  const [role, setRole] = useState('customer-service');
  const [experience, setExperience] = useState('entry');

  console.log('QuoteCalculator rendering'); // Debug log

  return (
    <Section id="quote-calculator">
      <Container>
        <Calculator>
          <Title>Calculate Your Savings</Title>
          <Grid>
            <FormSection>
              <div>
                <Label>Select Role</Label>
                <Select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="customer-service">Customer Service Representative</option>
                  <option value="virtual-assistant">Virtual Assistant</option>
                  <option value="digital-marketing">Digital Marketing Specialist</option>
                </Select>
              </div>
              <div>
                <Label>Experience Level</Label>
                <Select value={experience} onChange={(e) => setExperience(e.target.value)}>
                  <option value="entry">Entry Level (1-2 years)</option>
                  <option value="mid">Mid Level (3-5 years)</option>
                  <option value="senior">Senior Level (5+ years)</option>
                </Select>
              </div>
            </FormSection>
            
            <ResultsSection>
              <CostRow>
                <CostHeader>
                  <CostLabel>Local Cost</CostLabel>
                  <CostValue color="#EC297B">$5,500/mo</CostValue>
                </CostHeader>
                <ProgressBar>
                  <ProgressFill width="100%" color="#EC297B" />
                </ProgressBar>
              </CostRow>
              
              <CostRow>
                <CostHeader>
                  <CostLabel>Offshore Cost</CostLabel>
                  <CostValue color="#00E915">$780/mo</CostValue>
                </CostHeader>
                <ProgressBar>
                  <ProgressFill width="15%" color="#00E915" />
                </ProgressBar>
              </CostRow>
              
              <SavingsBox>
                <MonthlySavings>Monthly Savings: $4,720</MonthlySavings>
                <AnnualSavings>Annual Savings: $56,640</AnnualSavings>
              </SavingsBox>
            </ResultsSection>
          </Grid>
        </Calculator>
      </Container>
    </Section>
  );
} 