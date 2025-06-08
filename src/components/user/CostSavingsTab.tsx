import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { faFilePdf, faBookmark } from '@fortawesome/free-regular-svg-icons';

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

const RolesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const RoleCard = styled.div`
  border: 1px solid #E5E7EB;
  border-radius: 0.5rem;
  padding: 1rem;
`;

const RoleGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
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
  padding: 0.5rem 1rem;
`;

const Input = styled.input`
  width: 100%;
  border: 1px solid #E5E7EB;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
`;

const DeleteButton = styled.button`
  color: rgba(15, 23, 42, 0.5);
  padding: 0.5rem;
  background: none;
  border: none;

  &:hover {
    color: #0F172A;
  }
`;

const DeleteButtonContainer = styled.div`
  display: flex;
  align-items: flex-end;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-top: 1.5rem;
`;

const SummarySection = styled.section`
  background-color: white;
  border-radius: 0.75rem;
  border: 1px solid #E5E7EB;
  padding: 1.5rem;
`;

const CostBox = styled.div<{ $isTotal?: boolean }>`
  padding: 1rem;
  background-color: ${props => props.$isTotal ? 'rgba(132, 204, 22, 0.05)' : '#F9FAFB'};
  border-radius: 0.5rem;
  margin-bottom: ${props => !props.$isTotal && '1rem'};
`;

const CostRow = styled.div<{ hasMargin?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.hasMargin ? '0.5rem' : '0'};
`;

const CostLabel = styled.span<{ $isTotal?: boolean }>`
  color: ${props => props.$isTotal ? '#0F172A' : 'rgba(15, 23, 42, 0.7)'};
  font-weight: ${props => props.$isTotal && '600'};
`;

const CostValue = styled.span<{ $isHighlight?: boolean }>`
  font-weight: ${props => props.$isHighlight ? 'bold' : '600'};
  font-size: ${props => props.$isHighlight && '1.25rem'};
  color: ${props => props.$isHighlight && '#84CC16'};
`;

const GraphContainer = styled.div`
  height: 12rem;
  display: flex;
  align-items: flex-end;
  gap: 3rem;
`;

const GraphColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
`;

const GraphBar = styled.div<{ $height: string; $color: string }>`
  width: 100%;
  height: ${props => props.$height};
  background-color: ${props => props.$color};
  border-radius: 0.5rem 0.5rem 0 0;
`;

const GraphLabel = styled.div`
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: #0F172A;
`;

const GraphValue = styled.div<{ $color: string }>`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${props => props.$color};
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

const ActionButton = styled.button<{ $primary?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: ${props => props.$primary ? 'none' : '1px solid #E5E7EB'};
  border-radius: 0.5rem;
  background-color: ${props => props.$primary ? '#3B82F6' : 'transparent'};
  color: ${props => props.$primary ? 'white' : '#0F172A'};

  &:hover {
    background-color: ${props => props.$primary ? 'rgba(59, 130, 246, 0.9)' : '#F9FAFB'};
  }

  svg {
    color: ${props => !props.$primary && 'rgba(15, 23, 42, 0.7)'};
  }
`;

const CostSavingsTab: React.FC = () => {
  return (
    <MainContent>
      <Section id="team-input">
        <SectionHeader>
          <SectionTitle>Team Composition</SectionTitle>
          <AddButton>
            <FontAwesomeIcon icon={faPlus} />
            <span>Add Role</span>
          </AddButton>
        </SectionHeader>

        <RolesList>
          <RoleCard id="role-entry-1">
            <RoleGrid>
              <FormGroup>
                <Label htmlFor="role-title-1">Role Title</Label>
                <Select id="role-title-1" name="role-title-1">
                  <option>Sales Development Rep</option>
                  <option>Account Manager</option>
                  <option>Operations Manager</option>
                </Select>
              </FormGroup>
              <FormGroup>
                <Label htmlFor="local-salary-1">Local Salary</Label>
                <Input 
                  id="local-salary-1" 
                  name="local-salary-1" 
                  type="text" 
                  placeholder="$65,000" 
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="team-size-1">Team Size</Label>
                <Input 
                  id="team-size-1" 
                  name="team-size-1" 
                  type="number" 
                  defaultValue="2" 
                />
              </FormGroup>
              <DeleteButtonContainer>
                <DeleteButton type="button" aria-label="Delete role entry">
                  <FontAwesomeIcon icon={faTrash} />
                </DeleteButton>
              </DeleteButtonContainer>
            </RoleGrid>
          </RoleCard>

          <RoleCard id="role-entry-2">
            <RoleGrid>
              <FormGroup>
                <Label htmlFor="role-title-2">Role Title</Label>
                <Select id="role-title-2" name="role-title-2">
                  <option>Account Manager</option>
                  <option>Sales Development Rep</option>
                  <option>Operations Manager</option>
                </Select>
              </FormGroup>
              <FormGroup>
                <Label htmlFor="local-salary-2">Local Salary</Label>
                <Input 
                  id="local-salary-2" 
                  name="local-salary-2" 
                  type="text" 
                  placeholder="$85,000" 
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="team-size-2">Team Size</Label>
                <Input 
                  id="team-size-2" 
                  name="team-size-2" 
                  type="number" 
                  defaultValue="1" 
                />
              </FormGroup>
              <DeleteButtonContainer>
                <DeleteButton type="button" aria-label="Delete role entry">
                  <FontAwesomeIcon icon={faTrash} />
                </DeleteButton>
              </DeleteButtonContainer>
            </RoleGrid>
          </RoleCard>
        </RolesList>
      </Section>

      <Grid>
        <SummarySection id="cost-summary">
          <SectionTitle>Cost Summary</SectionTitle>
          <CostBox>
            <CostRow hasMargin>
              <CostLabel>Local Team Cost</CostLabel>
              <CostValue>$215,000/year</CostValue>
            </CostRow>
            <CostRow>
              <CostLabel>Offshore Team Cost</CostLabel>
              <CostValue>$93,600/year</CostValue>
            </CostRow>
          </CostBox>
          <CostBox $isTotal>
            <CostRow>
              <CostLabel $isTotal>Total Savings</CostLabel>
              <CostValue $isHighlight>$121,400/year</CostValue>
            </CostRow>
          </CostBox>
        </SummarySection>

        <SummarySection id="roi-graph">
          <SectionTitle>Cost Comparison</SectionTitle>
          <GraphContainer>
            <GraphColumn>
              <GraphBar $height="160px" $color="rgba(59, 130, 246, 0.2)" />
              <GraphLabel>Local</GraphLabel>
              <GraphValue $color="#3B82F6">$215K</GraphValue>
            </GraphColumn>
            <GraphColumn>
              <GraphBar $height="70px" $color="rgba(132, 204, 22, 0.2)" />
              <GraphLabel>Offshore</GraphLabel>
              <GraphValue $color="#84CC16">$93.6K</GraphValue>
            </GraphColumn>
          </GraphContainer>
        </SummarySection>
      </Grid>

      <ActionBar>
        <ButtonGroup>
          <ActionButton>
            <FontAwesomeIcon icon={faFilePdf} />
            <span>Export Report</span>
          </ActionButton>
          <ActionButton>
            <FontAwesomeIcon icon={faBookmark} />
            <span>Save Calculation</span>
          </ActionButton>
        </ButtonGroup>
        <ActionButton $primary>
          Schedule Team Review
        </ActionButton>
      </ActionBar>
    </MainContent>
  );
};

export default CostSavingsTab; 