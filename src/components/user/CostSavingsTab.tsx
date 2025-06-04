import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash, faCheck, faTimes, faPiggyBank } from '@fortawesome/free-solid-svg-icons';
import { faFilePdf, faBookmark } from '@fortawesome/free-regular-svg-icons';

const MainContent = styled.main`
  flex: 1;
  padding: 1.5rem;
  background-color: #F9FAFB;
  overflow-x: hidden;
  
  @media only screen and (max-width: 767px) {
    padding: 1rem;
  }
`;

const Section = styled.section`
  background-color: white;
  border-radius: 0.75rem;
  border: 1px solid #E5E7EB;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  overflow-x: hidden;
  
  @media only screen and (max-width: 767px) {
    padding: 1rem;
    margin-bottom: 1rem;
  }
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
  
  @media only screen and (max-width: 767px) {
    margin-bottom: 1rem;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: #0F172A;
  
  @media only screen and (max-width: 767px) {
    font-size: 1.125rem;
  }
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
  
  @media only screen and (max-width: 1023px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media only screen and (max-width: 767px) {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
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
  font-size: 0.875rem;
  height: 2.5rem;
  box-sizing: border-box;
  
  @media only screen and (max-width: 767px) {
    padding: 0.375rem 0.75rem;
  }
`;

const Input = styled.input`
  width: 100%;
  border: 1px solid #E5E7EB;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  height: 2.5rem;
  box-sizing: border-box;
  
  @media only screen and (max-width: 767px) {
    padding: 0.375rem 0.75rem;
  }
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
  
  @media only screen and (max-width: 767px) {
    grid-template-columns: 1fr;
    gap: 1rem;
    margin-top: 1rem;
  }
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
  
  @media only screen and (max-width: 767px) {
    padding: 0.75rem;
    margin-bottom: ${props => !props.$isTotal && '0.75rem'};
  }
`;

const CostRow = styled.div<{ hasMargin?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.hasMargin ? '0.5rem' : '0'};
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const CostLabel = styled.span<{ $isTotal?: boolean }>`
  color: ${props => props.$isTotal ? '#0F172A' : 'rgba(15, 23, 42, 0.7)'};
  font-weight: ${props => props.$isTotal && '600'};
  word-break: break-word;
`;

const CostValue = styled.span<{ $isHighlight?: boolean }>`
  font-weight: ${props => props.$isHighlight ? 'bold' : '600'};
  font-size: ${props => props.$isHighlight && '1.25rem'};
  color: ${props => props.$isHighlight && '#84CC16'};
  white-space: nowrap;
  
  @media only screen and (max-width: 767px) {
    font-size: ${props => props.$isHighlight && '1.125rem'};
  }
`;

const GraphContainer = styled.div`
  height: 12rem;
  display: flex;
  align-items: flex-end;
  gap: 3rem;
  overflow-x: auto;
  padding-bottom: 1rem;
  
  @media only screen and (max-width: 767px) {
    height: 10rem;
    gap: 2rem;
  }
  
  @media only screen and (max-width: 480px) {
    height: 8rem;
    gap: 1.5rem;
  }
`;

const GraphColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  min-width: 4rem;
`;

const GraphBar = styled.div<{ $height: string; $color: string }>`
  width: 100%;
  height: ${props => props.$height};
  background-color: ${props => props.$color};
  border-radius: 0.5rem 0.5rem 0 0;
  min-width: 2rem;
`;

const GraphLabel = styled.div`
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: #0F172A;
  text-align: center;
  word-break: break-word;
  
  @media only screen and (max-width: 480px) {
    font-size: 0.75rem;
  }
`;

const GraphValue = styled.div<{ $color: string }>`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${props => props.$color};
  text-align: center;
  word-break: break-word;
  
  @media only screen and (max-width: 480px) {
    font-size: 0.75rem;
  }
`;

const ActionBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
  
  @media only screen and (max-width: 767px) {
    margin-top: 1rem;
  }
  
  @media only screen and (max-width: 582px) {
    flex-direction: column;
    width: 100%;
    
    > button {
      width: 100%;
    }
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  
  @media only screen and (max-width: 767px) {
    gap: 0.5rem;
  }
  
  @media only screen and (max-width: 582px) {
    width: 100%;
    gap: 0.5rem;
  }
`;

const ActionButton = styled.button<{ $primary?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: ${props => props.$primary ? '#3B82F6' : 'white'};
  color: ${props => props.$primary ? 'white' : '#0F172A'};
  border: ${props => props.$primary ? 'none' : '1px solid #E5E7EB'};
  border-radius: 0.5rem;
  font-size: 0.875rem;
  height: 2.5rem;
  box-sizing: border-box;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;

  &:hover {
    background-color: ${props => props.$primary ? '#2563EB' : '#F9FAFB'};
    border-color: ${props => !props.$primary && '#D1D5DB'};
  }

  svg {
    color: ${props => !props.$primary && 'rgba(15, 23, 42, 0.7)'};
  }
  
  @media only screen and (max-width: 582px) {
    flex: 1;
    justify-content: center;
  }
`;

const ConsultButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0 1rem;
  background-color: #3B82F6;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  height: 2.5rem;
  box-sizing: border-box;
  cursor: pointer;
  transition: background-color 0.2s;
  white-space: nowrap;
  
  &:hover {
    background-color: #2563EB;
  }
  
  @media only screen and (max-width: 582px) {
    width: 100%;
    justify-content: center;
  }
`;

// Modal styled components
const ModalOverlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  inset: 0;
  background-color: rgba(15, 23, 42, 0.4);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.2s;
  opacity: ${props => props.$isOpen ? 1 : 0};
  pointer-events: ${props => props.$isOpen ? 'auto' : 'none'};
`;

const ModalContent = styled.div`
  width: 100%;
  max-width: 28rem;
  background-color: white;
  border-radius: 1rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  padding: 2rem;
  position: relative;
  z-index: 2001;

  @media (max-width: 640px) {
    max-width: 95vw;
    padding: 1rem;
    border-radius: 0.75rem;
  }
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;

  @media (max-width: 640px) {
    margin-bottom: 1rem;
  }
`;

const ModalTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: #0F172A;

  @media (max-width: 640px) {
    font-size: 1.05rem;
  }
`;

const CloseModalButton = styled.button`
  color: rgba(15, 23, 42, 0.4);
  font-size: 1.5rem;
  background: none;
  border: none;
  padding: 0.25rem;
  cursor: pointer;
  transition: color 0.2s;
  &:hover { color: #0F172A; }
`;

const ModalSection = styled.div`
  background: #F9FAFB;
  border-radius: 0.75rem;
  padding: 1.25rem 1rem;
  margin-bottom: 1.25rem;

  @media (max-width: 640px) {
    padding: 0.75rem 0.5rem;
    margin-bottom: 1rem;
  }
`;

const ModalSectionTitle = styled.h4`
  font-weight: 600;
  color: #0F172A;
  margin-bottom: 0.75rem;
  font-size: 1rem;

  @media (max-width: 640px) {
    font-size: 0.95rem;
    margin-bottom: 0.5rem;
  }
`;

const ModalSummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.95rem;
  margin-bottom: 0.5rem;

  @media (max-width: 640px) {
    font-size: 0.9rem;
    margin-bottom: 0.35rem;
  }
`;

const ModalSummaryLabel = styled.span`
  color: rgba(15, 23, 42, 0.7);
`;

const ModalSummaryValue = styled.span`
  color: #0F172A;
  font-weight: 500;
`;

const ModalSummaryHighlight = styled.span<{ $color: string }>`
  padding: 0.25rem 0.75rem;
  background: ${props => props.$color}1A;
  color: ${props => props.$color};
  border-radius: 9999px;
  font-size: 0.95rem;
  font-weight: 600;

  @media (max-width: 640px) {
    font-size: 0.9rem;
    padding: 0.2rem 0.5rem;
  }
`;

const ModalChecklist = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  @media (max-width: 640px) {
    gap: 0.35rem;
  }
`;

const ModalChecklistItem = styled.li`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: rgba(15, 23, 42, 0.7);
  font-size: 0.95rem;

  @media (max-width: 640px) {
    font-size: 0.9rem;
    gap: 0.35rem;
  }
`;

const ModalButtonGroup = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-top: 1.5rem;

  @media (max-width: 640px) {
    flex-direction: column;
    gap: 0.5rem;
    margin-top: 1rem;
  }
`;

const ModalPrimaryButton = styled.button`
  flex: 1;
  padding: 0.75rem 1rem;
  background-color: #3B82F6;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: background-color 0.2s;
  &:hover { background-color: #2563EB; }

  @media (max-width: 640px) {
    font-size: 0.9rem;
    padding: 0.6rem 0.75rem;
  }
`;

const ModalSecondaryButton = styled.button`
  flex: 1;
  padding: 0.75rem 1rem;
  background-color: white;
  color: #0F172A;
  border: 1px solid #E5E7EB;
  border-radius: 0.5rem;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  &:hover { background-color: #F9FAFB; }

  @media (max-width: 640px) {
    font-size: 0.9rem;
    padding: 0.6rem 0.75rem;
  }
`;

const SavingsBadge = styled.div`
  background: #84CC161A;
  border: 1px solid #84CC1633;
  border-radius: 0.75rem;
  padding: 1rem;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  @media (max-width: 640px) {
    padding: 0.6rem;
    margin-bottom: 1rem;
    font-size: 0.9rem;
  }
`;

const SavingsBadgeText = styled.span`
  color: #84CC16;
  font-size: 0.95rem;
  font-weight: 500;
`;

const ModalForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ModalFormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const ModalFormLabel = styled.label`
  font-size: 0.95rem;
  font-weight: 500;
  color: #0F172A;

  @media (max-width: 640px) {
    font-size: 0.9rem;
  }
`;

const ModalFormInput = styled.input`
  width: 100%;
  border: 1px solid #E5E7EB;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  font-size: 0.95rem;
  color: #0F172A;
  background: white;
  &:focus {
    outline: none;
    border-color: #3B82F6;
  }

  @media (max-width: 640px) {
    font-size: 0.9rem;
    padding: 0.4rem 0.75rem;
  }
`;

const ModalFormSelect = styled.select`
  width: 100%;
  border: 1px solid #E5E7EB;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  font-size: 0.95rem;
  color: #0F172A;
  background: white;
  &:focus {
    outline: none;
    border-color: #3B82F6;
  }

  @media (max-width: 640px) {
    font-size: 0.9rem;
    padding: 0.4rem 0.75rem;
  }
`;

const CostSavingsTab: React.FC = () => {
  const [isExportModalOpen, setIsExportModalOpen] = React.useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = React.useState(false);
  const [scheduleDate, setScheduleDate] = React.useState('');
  const [scheduleTime, setScheduleTime] = React.useState('9:00 AM');
  const [companyName, setCompanyName] = React.useState('');

  // Accessibility: close modal on escape
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isExportModalOpen) setIsExportModalOpen(false);
        if (isScheduleModalOpen) setIsScheduleModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isExportModalOpen, isScheduleModalOpen]);

  // Click outside to close
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, closeFn: () => void) => {
    if (e.target === e.currentTarget) closeFn();
  };

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
                <Label>Role Title</Label>
                <Select>
                  <option>Sales Development Rep</option>
                  <option>Account Manager</option>
                  <option>Operations Manager</option>
                </Select>
              </FormGroup>
              <FormGroup>
                <Label>Local Salary</Label>
                <Input type="text" placeholder="$65,000" />
              </FormGroup>
              <FormGroup>
                <Label>Team Size</Label>
                <Input type="number" defaultValue="2" />
              </FormGroup>
              <DeleteButtonContainer>
                <DeleteButton>
                  <FontAwesomeIcon icon={faTrash} />
                </DeleteButton>
              </DeleteButtonContainer>
            </RoleGrid>
          </RoleCard>

          <RoleCard id="role-entry-2">
            <RoleGrid>
              <FormGroup>
                <Label>Role Title</Label>
                <Select>
                  <option>Account Manager</option>
                  <option>Sales Development Rep</option>
                  <option>Operations Manager</option>
                </Select>
              </FormGroup>
              <FormGroup>
                <Label>Local Salary</Label>
                <Input type="text" placeholder="$85,000" />
              </FormGroup>
              <FormGroup>
                <Label>Team Size</Label>
                <Input type="number" defaultValue="1" />
              </FormGroup>
              <DeleteButtonContainer>
                <DeleteButton>
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
          <ActionButton onClick={() => setIsExportModalOpen(true)}>
            <FontAwesomeIcon icon={faFilePdf} />
            <span>Export Report</span>
          </ActionButton>
          <ActionButton>
            <FontAwesomeIcon icon={faBookmark} />
            <span>Save Calculation</span>
          </ActionButton>
        </ButtonGroup>
        <ConsultButton onClick={() => setIsScheduleModalOpen(true)}>
          Schedule Team Review
        </ConsultButton>
      </ActionBar>

      {/* Export Report Modal */}
      <ModalOverlay $isOpen={isExportModalOpen} onClick={e => handleOverlayClick(e, () => setIsExportModalOpen(false))}>
        <ModalContent onClick={e => e.stopPropagation()}>
          <ModalHeader>
            <ModalTitle>Export Your Team Savings Report</ModalTitle>
            <CloseModalButton onClick={() => setIsExportModalOpen(false)} aria-label="Close modal">
              <FontAwesomeIcon icon={faTimes} />
            </CloseModalButton>
          </ModalHeader>
          <ModalSection>
            <ModalSectionTitle>Report Summary</ModalSectionTitle>
            <ModalSummaryRow>
              <ModalSummaryLabel>Local Team Cost</ModalSummaryLabel>
              <ModalSummaryValue>$215,000/year</ModalSummaryValue>
            </ModalSummaryRow>
            <ModalSummaryRow>
              <ModalSummaryLabel>Offshore Team Cost</ModalSummaryLabel>
              <ModalSummaryValue>$93,600/year</ModalSummaryValue>
            </ModalSummaryRow>
            <div style={{ borderTop: '1px solid #E5E7EB', paddingTop: '0.75rem', marginTop: '0.75rem' }}>
              <ModalSummaryRow>
                <span style={{ fontWeight: 600, color: '#0F172A' }}>Annual Savings</span>
                <ModalSummaryHighlight $color="#00E915">$121,400</ModalSummaryHighlight>
              </ModalSummaryRow>
              <ModalSummaryRow style={{ marginTop: '0.5rem' }}>
                <span style={{ fontWeight: 600, color: '#0F172A' }}>Monthly Savings</span>
                <ModalSummaryHighlight $color="#0098FF">$10,116</ModalSummaryHighlight>
              </ModalSummaryRow>
            </div>
          </ModalSection>
          <ModalSection>
            <ModalSectionTitle>Report Includes</ModalSectionTitle>
            <ModalChecklist>
              <ModalChecklistItem>
                <FontAwesomeIcon icon={faCheck} color="#84CC16" style={{ fontSize: '1rem' }} />
                <span>Detailed role breakdown</span>
              </ModalChecklistItem>
              <ModalChecklistItem>
                <FontAwesomeIcon icon={faCheck} color="#84CC16" style={{ fontSize: '1rem' }} />
                <span>Cost comparison charts</span>
              </ModalChecklistItem>
              <ModalChecklistItem>
                <FontAwesomeIcon icon={faCheck} color="#84CC16" style={{ fontSize: '1rem' }} />
                <span>ROI analysis</span>
              </ModalChecklistItem>
              <ModalChecklistItem>
                <FontAwesomeIcon icon={faCheck} color="#84CC16" style={{ fontSize: '1rem' }} />
                <span>Implementation recommendations</span>
              </ModalChecklistItem>
            </ModalChecklist>
          </ModalSection>
          <ModalButtonGroup>
            <ModalSecondaryButton onClick={() => setIsExportModalOpen(false)}>
              Cancel
            </ModalSecondaryButton>
            <ModalPrimaryButton onClick={() => setIsExportModalOpen(false)}>
              <FontAwesomeIcon icon={faFilePdf} />
              <span>Download PDF Report</span>
            </ModalPrimaryButton>
          </ModalButtonGroup>
        </ModalContent>
      </ModalOverlay>

      {/* Schedule Team Review Modal */}
      <ModalOverlay $isOpen={isScheduleModalOpen} onClick={e => handleOverlayClick(e, () => setIsScheduleModalOpen(false))}>
        <ModalContent onClick={e => e.stopPropagation()}>
          <ModalHeader>
            <ModalTitle>Schedule Team Review</ModalTitle>
            <CloseModalButton onClick={() => setIsScheduleModalOpen(false)} aria-label="Close modal">
              <FontAwesomeIcon icon={faTimes} />
            </CloseModalButton>
          </ModalHeader>
          <SavingsBadge>
            <FontAwesomeIcon icon={faPiggyBank} color="#84CC16" />
            <SavingsBadgeText>You could be saving $10,116/month</SavingsBadgeText>
          </SavingsBadge>
          <ModalForm onSubmit={e => { e.preventDefault(); setIsScheduleModalOpen(false); }}>
            <ModalFormGroup>
              <ModalFormLabel>
                Company Name <span style={{ color: 'rgba(15,23,42,0.5)', fontSize: '0.85em' }}>(optional)</span>
              </ModalFormLabel>
              <ModalFormInput
                type="text"
                placeholder="Enter your company name"
                value={companyName}
                onChange={e => setCompanyName(e.target.value)}
              />
            </ModalFormGroup>
            <ModalFormGroup>
              <ModalFormLabel>Team Size</ModalFormLabel>
              <ModalFormInput
                type="text"
                value="3 roles"
                readOnly
                style={{ background: '#F9FAFB', color: 'rgba(15,23,42,0.7)' }}
              />
            </ModalFormGroup>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', ...(window.innerWidth <= 640 ? { gridTemplateColumns: '1fr', gap: '0.75rem' } : {}) }}>
              <ModalFormGroup>
                <ModalFormLabel>Preferred Date</ModalFormLabel>
                <ModalFormInput
                  type="date"
                  value={scheduleDate}
                  onChange={e => setScheduleDate(e.target.value)}
                />
              </ModalFormGroup>
              <ModalFormGroup>
                <ModalFormLabel>Preferred Time</ModalFormLabel>
                <ModalFormSelect
                  value={scheduleTime}
                  onChange={e => setScheduleTime(e.target.value)}
                >
                  <option>9:00 AM</option>
                  <option>10:00 AM</option>
                  <option>11:00 AM</option>
                  <option>2:00 PM</option>
                  <option>3:00 PM</option>
                  <option>4:00 PM</option>
                </ModalFormSelect>
              </ModalFormGroup>
            </div>
            <ModalButtonGroup>
              <ModalSecondaryButton type="button" onClick={() => setIsScheduleModalOpen(false)}>
                Cancel
              </ModalSecondaryButton>
              <ModalPrimaryButton type="submit">
                Confirm
              </ModalPrimaryButton>
            </ModalButtonGroup>
          </ModalForm>
        </ModalContent>
      </ModalOverlay>
    </MainContent>
  );
};

export default CostSavingsTab; 