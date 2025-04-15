import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const Section = styled.section`
  padding: 3rem 0;
`;

const Container = styled.div`
  max-width: 72rem;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.md};
`;

const Grid = styled.div`
  max-width: 5xl;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const FormCard = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 0.75rem;
  border: 1px solid #E5E7EB;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: #0F172A;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  color: #0F172A;
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid #E5E7EB;
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid #E5E7EB;
`;

const CheckboxGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
`;

const Checkbox = styled.input`
  margin-right: 0.5rem;
  color: #3B82F6;
  border-radius: 0.25rem;
`;

const Divider = styled.div`
  padding-top: 1rem;
  border-top: 1px solid #E5E7EB;
`;

const SummaryCard = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 0.75rem;
  border: 1px solid #E5E7EB;
`;

const CostBar = styled.div`
  width: 100%;
  background-color: #E5E7EB;
  border-radius: 9999px;
  height: 0.5rem;
  margin-bottom: 1.5rem;
`;

const CostFill = styled.div<{ width: string; color: string }>`
  height: 100%;
  border-radius: 9999px;
  background-color: ${props => props.color};
  width: ${props => props.width};
`;

const SavingsCard = styled.div`
  background-color: rgba(59, 130, 246, 0.1);
  padding: 1rem;
  border-radius: 0.5rem;
`;

const CTACard = styled.div`
  background-color: #EC297B;
  padding: 2rem;
  border-radius: 0.75rem;
  color: white;
`;

const Button = styled.button<{ variant: 'primary' | 'secondary' }>`
  width: 100%;
  padding: 0.75rem;
  border-radius: 0.5rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  
  ${props => props.variant === 'primary' && `
    background-color: white;
    color: #EC297B;
  `}
  
  ${props => props.variant === 'secondary' && `
    background-color: transparent;
    border: 1px solid white;
    color: white;
  `}
`;

const SummaryContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export default function FormSection() {
  return (
    <Section id="quote-form">
      <Container>
        <Grid>
          {/* Input Form */}
          <FormCard>
            <Title>Role Details</Title>
            <div className="space-y-6">
              <FormGroup>
                <Label>Role Title</Label>
                <Input type="text" placeholder="e.g. Marketing Manager" />
              </FormGroup>
              <FormGroup>
                <Label>Experience Level</Label>
                <Select>
                  <option>Entry Level (1-2 years)</option>
                  <option>Mid Level (3-5 years)</option>
                  <option>Senior Level (5+ years)</option>
                </Select>
              </FormGroup>
              <FormGroup>
                <Label>Key Tasks</Label>
                <CheckboxGroup>
                  <CheckboxLabel>
                    <Checkbox type="checkbox" />
                    <span>Project Management</span>
                  </CheckboxLabel>
                  <CheckboxLabel>
                    <Checkbox type="checkbox" />
                    <span>Content Creation</span>
                  </CheckboxLabel>
                  <CheckboxLabel>
                    <Checkbox type="checkbox" />
                    <span>Data Analysis</span>
                  </CheckboxLabel>
                </CheckboxGroup>
              </FormGroup>
              <FormGroup>
                <Label>Team Size</Label>
                <Select>
                  <option>1-5 employees</option>
                  <option>6-20 employees</option>
                  <option>21-50 employees</option>
                  <option>50+ employees</option>
                </Select>
              </FormGroup>
              <FormGroup>
                <Label>Currency</Label>
                <Select>
                  <option>USD ($)</option>
                  <option>AUD ($)</option>
                  <option>NZD ($)</option>
                </Select>
              </FormGroup>
              <Divider>
                <h3 className="font-medium mb-4">Optional Add-ons</h3>
                <CheckboxLabel>
                  <Checkbox type="checkbox" />
                  <span>AI Tool Access (+$99/mo)</span>
                </CheckboxLabel>
                <CheckboxLabel>
                  <Checkbox type="checkbox" />
                  <span>Training Library (+$49/mo)</span>
                </CheckboxLabel>
              </Divider>
            </div>
          </FormCard>

          {/* Output Summary */}
          <SummaryContainer>
            <SummaryCard>
              <Title>Cost Comparison</Title>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-[#0F172A]">Local Cost</span>
                    <span className="text-[#EC297B] font-bold">$7,500/mo</span>
                  </div>
                  <CostBar>
                    <CostFill width="100%" color="#EC297B" />
                  </CostBar>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-[#0F172A]">Offshore Cost</span>
                    <span className="text-[#00E915] font-bold">$2,250/mo</span>
                  </div>
                  <CostBar>
                    <CostFill width="30%" color="#00E915" />
                  </CostBar>
                </div>
                <SavingsCard>
                  <div className="flex justify-between items-center">
                    <span className="text-[#3B82F6] font-bold">Total Monthly Savings</span>
                    <span className="text-[#3B82F6] font-bold text-2xl">$5,250</span>
                  </div>
                  <div className="text-sm text-[#3B82F6]/70 mt-1">70% cost reduction</div>
                </SavingsCard>
              </div>
            </SummaryCard>

            {/* CTA Area */}
            <CTACard>
              <h3 className="text-xl font-bold mb-4">Want the Complete Blueprint?</h3>
              <p className="mb-6">Get our detailed guide on how to successfully transition this role offshore.</p>
              <Button variant="primary">
                Download Blueprint
                <FontAwesomeIcon icon={faLock} className="ml-2" />
              </Button>
              <Button variant="secondary">
                View Sample Kit
                <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
              </Button>
            </CTACard>
          </SummaryContainer>
        </Grid>
      </Container>
    </Section>
  );
} 