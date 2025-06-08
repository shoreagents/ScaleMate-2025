import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf, faBookmark } from '@fortawesome/free-regular-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const MainContent = styled.main`
  flex: 1;
  padding: 1.5rem;
  background-color: #F9FAFB;
`;

const Section = styled.section`
  background-color: white;
  border-radius: 0.75rem;
  border: 1px solid #E5E7EB;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: #0F172A;
`;

const AddButton = styled.button`
  color: #3B82F6;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;

  &:hover {
    color: rgba(59, 130, 246, 0.8);
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
`;

const CostGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-top: 1.5rem;
`;

interface CostSectionProps {
  $span?: number;
}

const CostSection = styled.section<CostSectionProps>`
  background-color: white;
  border-radius: 0.75rem;
  border: 1px solid #E5E7EB;
  padding: 1.5rem;
  grid-column: ${props => `span ${props.$span || 1}`};
`;

const CostList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

interface CostItemProps {
  $isTotal?: boolean;
}

const CostItem = styled.div<CostItemProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: ${props => props.$isTotal ? 'rgba(59, 130, 246, 0.05)' : '#F9FAFB'};
  border-radius: 0.5rem;
`;

interface CostLabelProps {
  $isBold?: boolean;
}

const CostLabel = styled.span<CostLabelProps>`
  color: #0F172A;
  ${props => props.$isBold && 'font-weight: 600;'}
`;

interface CostValueProps {
  $isTotal?: boolean;
  $isGreen?: boolean;
}

const CostValue = styled.span<CostValueProps>`
  font-weight: ${props => props.$isTotal ? 'bold' : '600'};
  font-size: ${props => props.$isTotal ? '1.25rem' : 'inherit'};
  color: ${props => props.$isTotal ? '#3B82F6' : props.$isGreen ? '#00E915' : 'inherit'};
`;

const ComparisonGroup = styled.div`
  margin-bottom: 1rem;
`;

const ComparisonLabel = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #0F172A;
  margin-bottom: 0.5rem;
`;

const ComparisonSelect = styled.select`
  width: 100%;
  border: 1px solid #E5E7EB;
  border-radius: 0.5rem;
  padding: 0.625rem 1rem;
`;

interface ComparisonBoxProps {
  $isGreen?: boolean;
}

const ComparisonBox = styled.div<ComparisonBoxProps>`
  padding: 1rem;
  background-color: ${props => props.$isGreen ? 'rgba(0, 233, 21, 0.05)' : '#F9FAFB'};
  border-radius: 0.5rem;
  margin-bottom: ${props => !props.$isGreen && '1rem'};
`;

const ComparisonLabel2 = styled.label`
  display: block;
  font-size: 0.875rem;
  color: rgba(15, 23, 42, 0.7);
  margin-bottom: 0.5rem;
`;

interface ComparisonValueProps {
  $isGreen?: boolean;
}

const ComparisonValue = styled.div<ComparisonValueProps>`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${props => props.$isGreen ? '#00E915' : '#0F172A'};
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #0F172A;
  margin-bottom: 0.5rem;
`;

const Select = styled.select`
  width: 100%;
  border: 1px solid #E5E7EB;
  border-radius: 0.5rem;
  padding: 0.625rem 1rem;
  font-size: 0.875rem;
`;

const ExperienceButtons = styled.div`
  display: flex;
  gap: 1rem;
`;

const ExperienceButton = styled.button<{ $active?: boolean }>`
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid ${props => props.$active ? '#3B82F6' : '#E5E7EB'};
  background-color: ${props => props.$active ? 'rgba(59, 130, 246, 0.05)' : 'transparent'};
  color: ${props => props.$active ? '#3B82F6' : '#64748B'};

  &:hover {
    border-color: #3B82F6;
    background-color: rgba(59, 130, 246, 0.05);
  }
`;

const TasksContainer = styled.div`
  border: 1px solid #E5E7EB;
  border-radius: 0.5rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const TaskItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Checkbox = styled.input`
  color: #3B82F6;
`;

const TaskText = styled.span`
  font-size: 0.875rem;
  color: #0F172A;
`;

const ActionBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.5rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: 1px solid #E5E7EB;
  border-radius: 0.5rem;
  color: #0F172A;

  &:hover {
    background-color: #F9FAFB;
  }

  svg {
    color: rgba(15, 23, 42, 0.7);
  }
`;

const ConsultButton = styled.button`
  background-color: #3B82F6;
  color: white;
  padding: 0.5rem 1.5rem;
  border-radius: 0.5rem;
  border: none;

  &:hover {
    background-color: rgba(59, 130, 246, 0.9);
  }
`;

const QuoteCalculatorTab: React.FC = () => {
  return (
    <MainContent>
      <Section id="quote-input">
        <SectionHeader>
          <SectionTitle>Role Details</SectionTitle>
          <AddButton>
            <FontAwesomeIcon icon={faPlus} />
            <span>Add Another Role</span>
          </AddButton>
        </SectionHeader>

        <Grid>
          <Column>
            <FormGroup>
              <Label htmlFor="role-title">Role Title</Label>
              <Select id="role-title" name="role-title">
                <option>Select Role</option>
                <option>Sales Development Representative</option>
                <option>Account Manager</option>
                <option>Operations Manager</option>
              </Select>
            </FormGroup>
            <FormGroup>
              <Label htmlFor="experience-level">Experience Level</Label>
              <ExperienceButtons role="group" aria-labelledby="experience-level">
                <ExperienceButton type="button" $active id="experience-junior" name="experience-level" value="junior">Junior</ExperienceButton>
                <ExperienceButton type="button" id="experience-mid" name="experience-level" value="mid">Mid-Level</ExperienceButton>
                <ExperienceButton type="button" id="experience-senior" name="experience-level" value="senior">Senior</ExperienceButton>
              </ExperienceButtons>
            </FormGroup>
          </Column>
          <Column>
            <FormGroup>
              <Label htmlFor="key-tasks">Key Tasks</Label>
              <TasksContainer role="group" aria-labelledby="key-tasks">
                <TaskItem>
                  <Checkbox type="checkbox" id="task-lead-gen" name="task-lead-gen" defaultChecked />
                  <TaskText>Lead Generation</TaskText>
                </TaskItem>
                <TaskItem>
                  <Checkbox type="checkbox" id="task-cold-outreach" name="task-cold-outreach" defaultChecked />
                  <TaskText>Cold Outreach</TaskText>
                </TaskItem>
                <TaskItem>
                  <Checkbox type="checkbox" id="task-client-mgmt" name="task-client-mgmt" />
                  <TaskText>Client Management</TaskText>
                </TaskItem>
              </TasksContainer>
            </FormGroup>
          </Column>
        </Grid>
      </Section>

      <CostGrid>
        <CostSection id="offshore-cost" $span={2}>
          <SectionTitle>Offshore Cost Breakdown</SectionTitle>
          <CostList>
            <CostItem>
              <CostLabel>Base Salary</CostLabel>
              <CostValue>$24,000/year</CostValue>
            </CostItem>
            <CostItem>
              <CostLabel>Benefits & Insurance</CostLabel>
              <CostValue>$4,800/year</CostValue>
            </CostItem>
            <CostItem>
              <CostLabel>Management Fee</CostLabel>
              <CostValue>$2,400/year</CostValue>
            </CostItem>
            <CostItem $isTotal>
              <CostLabel $isBold>Total Cost</CostLabel>
              <CostValue $isTotal>$31,200/year</CostValue>
            </CostItem>
          </CostList>
        </CostSection>

        <CostSection id="local-comparison">
          <SectionTitle>Local Comparison</SectionTitle>
          <ComparisonGroup>
            <ComparisonLabel htmlFor="location">Your Location</ComparisonLabel>
            <ComparisonSelect id="location" name="location">
              <option>United States</option>
              <option>United Kingdom</option>
              <option>Australia</option>
            </ComparisonSelect>
          </ComparisonGroup>
          <ComparisonBox>
            <ComparisonLabel2 htmlFor="local-salary">Average Local Salary</ComparisonLabel2>
            <ComparisonValue id="local-salary" role="text" aria-labelledby="local-salary-label">$65,000/year</ComparisonValue>
          </ComparisonBox>
          <ComparisonBox $isGreen>
            <ComparisonLabel2 htmlFor="potential-savings">Potential Savings</ComparisonLabel2>
            <ComparisonValue id="potential-savings" role="text" aria-labelledby="potential-savings-label" $isGreen>$33,800/year</ComparisonValue>
          </ComparisonBox>
        </CostSection>
      </CostGrid>

      <ActionBar>
        <ButtonGroup>
          <ActionButton>
            <FontAwesomeIcon icon={faFilePdf} />
            <span>Download PDF</span>
          </ActionButton>
          <ActionButton>
            <FontAwesomeIcon icon={faBookmark} />
            <span>Save Quote</span>
          </ActionButton>
        </ButtonGroup>
        <ConsultButton>
          Schedule Consultation
        </ConsultButton>
      </ActionBar>
    </MainContent>
  );
};

export default QuoteCalculatorTab; 