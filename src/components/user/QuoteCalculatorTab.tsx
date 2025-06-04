import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf, faBookmark, faPlus, faDownload, faCalendarCheck, faCheck, faTimes, faXmark } from '@fortawesome/free-solid-svg-icons';

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

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  
  @media only screen and (max-width: 767px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const CostGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-top: 1.5rem;
  
  @media only screen and (max-width: 1023px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media only screen and (max-width: 767px) {
    grid-template-columns: 1fr;
    gap: 1rem;
    margin-top: 1rem;
  }
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
  overflow-x: hidden;
  
  @media only screen and (max-width: 767px) {
    padding: 1rem;
  }
  
  @media only screen and (max-width: 1023px) {
    grid-column: span 1;
  }
`;

const CostList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  
  @media only screen and (max-width: 767px) {
    gap: 0.75rem;
  }
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
  flex-wrap: wrap;
  gap: 0.5rem;
  
  @media only screen and (max-width: 767px) {
    padding: 0.75rem;
  }
`;

interface CostLabelProps {
  $isBold?: boolean;
}

const CostLabel = styled.span<CostLabelProps>`
  color: #0F172A;
  ${props => props.$isBold && 'font-weight: 600;'}
  word-break: break-word;
`;

interface CostValueProps {
  $isTotal?: boolean;
  $isGreen?: boolean;
}

const CostValue = styled.span<CostValueProps>`
  font-weight: ${props => props.$isTotal ? 'bold' : '600'};
  font-size: ${props => props.$isTotal ? '1.25rem' : 'inherit'};
  color: ${props => props.$isTotal ? '#3B82F6' : props.$isGreen ? '#00E915' : 'inherit'};
  white-space: nowrap;
  
  @media only screen and (max-width: 767px) {
    font-size: ${props => props.$isTotal ? '1.125rem' : 'inherit'};
  }
`;

const ComparisonGroup = styled.div`
  margin-bottom: 1rem;
  
  @media only screen and (max-width: 767px) {
    margin-bottom: 0.75rem;
  }
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
  
  @media only screen and (max-width: 767px) {
    padding: 0.5rem 0.75rem;
    font-size: 0.875rem;
  }
`;

interface ComparisonBoxProps {
  $isGreen?: boolean;
}

const ComparisonBox = styled.div<ComparisonBoxProps>`
  padding: 1rem;
  background-color: ${props => props.$isGreen ? 'rgba(0, 233, 21, 0.05)' : '#F9FAFB'};
  border-radius: 0.5rem;
  margin-bottom: ${props => !props.$isGreen && '1rem'};
  
  @media only screen and (max-width: 767px) {
    padding: 0.75rem;
    margin-bottom: ${props => !props.$isGreen && '0.75rem'};
  }
`;

const ComparisonLabel2 = styled.div`
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
  
  @media only screen and (max-width: 767px) {
    font-size: 1.125rem;
  }
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
  flex-wrap: wrap;
  
  @media only screen and (max-width: 767px) {
    gap: 0.5rem;
  }
`;

const ExperienceButton = styled.button<{ $active?: boolean }>`
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid ${props => props.$active ? '#3B82F6' : '#E5E7EB'};
  background-color: ${props => props.$active ? 'rgba(59, 130, 246, 0.05)' : 'transparent'};
  color: ${props => props.$active ? '#3B82F6' : '#64748B'};
  white-space: nowrap;

  &:hover {
    border-color: #3B82F6;
    background-color: rgba(59, 130, 246, 0.05);
  }
  
  @media only screen and (max-width: 767px) {
    padding: 0.375rem 0.75rem;
    font-size: 0.875rem;
  }
`;

const TasksContainer = styled.div`
  border: 1px solid #E5E7EB;
  border-radius: 0.5rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  
  @media only screen and (max-width: 767px) {
    padding: 0.75rem;
  }
`;

const TaskItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const Checkbox = styled.input`
  color: #3B82F6;
`;

const TaskText = styled.span`
  font-size: 0.875rem;
  color: #0F172A;
  word-break: break-word;
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
  
  @media only screen and (max-width: 551px) {
    flex-direction: column;
    width: 100%;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  
  @media only screen and (max-width: 767px) {
    gap: 0.5rem;
  }
  
  @media only screen and (max-width: 551px) {
    width: 100%;
    gap: 0.5rem;
  }
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: white;
  color: #0F172A;
  border: 1px solid #E5E7EB;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  height: 2.5rem;
  box-sizing: border-box;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;

  &:hover {
    background-color: #F9FAFB;
    border-color: #D1D5DB;
  }

  svg {
    color: rgba(15, 23, 42, 0.7);
  }
  
  @media only screen and (max-width: 551px) {
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
  
  @media only screen and (max-width: 551px) {
    width: 100%;
    justify-content: center;
  }
`;

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

const ModalContent = styled.div<{ $variant?: 'pdf' | 'consult' | 'success' }>`
  width: 100%;
  max-width: ${props => props.$variant === 'success' ? '24rem' : '28rem'};
  background-color: ${props => props.$variant === 'pdf' ? '#F9FAFB' : 'white'};
  border-radius: 0.75rem;
  border: 1px solid #E5E7EB;
  margin: 0 1rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
`;

const ModalHeader = styled.div<{ $variant?: 'pdf' | 'consult' | 'success' }>`
  padding: ${props => props.$variant === 'consult' ? '1.5rem' : '2rem'};
  ${props => props.$variant === 'consult' && 'border-bottom: 1px solid #E5E7EB;'}
  text-align: ${props => props.$variant === 'pdf' || props.$variant === 'success' ? 'center' : 'left'};
`;

const IconWrapper = styled.div<{ $color: string }>`
  width: 4rem;
  height: 4rem;
  background-color: ${props => `${props.$color}/10`};
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  
  svg {
    font-size: 1.5rem;
    color: ${props => props.$color};
  }
`;

const ModalTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #0F172A;
  margin-bottom: 0.5rem;
`;

const ModalSubtitle = styled.p`
  font-size: 0.875rem;
  color: rgba(15, 23, 42, 0.7);
  margin-bottom: 1.5rem;
`;

const ModalFormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ModalButtonGroup = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-top: 0.5rem;
`;

const ModalForm = styled.form`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormLabel = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: #0F172A;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 0.625rem 0.75rem;
  border: 1px solid #E5E7EB;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  color: #0F172A;
  background: white;
  
  &:focus {
    outline: none;
    border-color: #3B82F6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
  }
`;

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 0.625rem 0.75rem;
  border: 1px solid #E5E7EB;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  color: #0F172A;
  background: white;
  resize: none;
  min-height: 6rem;
  
  &:focus {
    outline: none;
    border-color: #3B82F6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
  }
`;

const PrimaryButton = styled.button`
  flex: 1;
  padding: 0.625rem 1rem;
  background-color: #3B82F6;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #2563EB;
  }
`;

const SecondaryButton = styled.button`
  flex: 1;
  padding: 0.625rem 1rem;
  background-color: white;
  color: rgba(15, 23, 42, 0.7);
  border: 1px solid #E5E7EB;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: #F9FAFB;
  }
`;

const QuoteReference = styled.div`
  padding: 0.75rem;
  background-color: #F9FAFB;
  border: 1px solid #E5E7EB;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const StatusDot = styled.span`
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 9999px;
  background-color: #00E915;
`;

const ReferenceText = styled.span`
  font-size: 0.875rem;
  color: rgba(15, 23, 42, 0.7);
`;

const ReferenceValue = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
  color: #0F172A;
`;

const DateTimeGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
`;

const CloseModalButton = styled.button`
  position: absolute;
  top: 1.25rem;
  right: 1.5rem;
  color: rgba(15, 23, 42, 0.4);
  font-size: 1.5rem;
  background: none;
  border: none;
  padding: 0.25rem;
  cursor: pointer;
  transition: color 0.2s;
  &:hover {
    color: #0F172A;
  }
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const HeaderIcon = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  background-color: rgba(59, 130, 246, 0.1);
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    color: #3B82F6;
  }
`;

const QuoteCalculatorTab: React.FC = () => {
  const [isPdfModalOpen, setIsPdfModalOpen] = React.useState(false);
  const [isConsultModalOpen, setIsConsultModalOpen] = React.useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = React.useState(false);
  const [consultDate, setConsultDate] = React.useState('');
  const [consultTime, setConsultTime] = React.useState('');
  const [consultNotes, setConsultNotes] = React.useState('');

  const handleOpenPdfModal = () => setIsPdfModalOpen(true);
  const handleClosePdfModal = () => setIsPdfModalOpen(false);
  const handleOpenConsultModal = () => setIsConsultModalOpen(true);
  const handleCloseConsultModal = () => setIsConsultModalOpen(false);
  const handleOpenSuccessModal = () => setIsSuccessModalOpen(true);
  const handleCloseSuccessModal = () => setIsSuccessModalOpen(false);

  const handleConsultSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCloseConsultModal();
    handleOpenSuccessModal();
  };

  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isSuccessModalOpen) handleCloseSuccessModal();
        else if (isConsultModalOpen) handleCloseConsultModal();
        else if (isPdfModalOpen) handleClosePdfModal();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isPdfModalOpen, isConsultModalOpen, isSuccessModalOpen]);

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
              <Label>Role Title</Label>
              <Select>
                <option>Select Role</option>
                <option>Sales Development Representative</option>
                <option>Account Manager</option>
                <option>Operations Manager</option>
              </Select>
            </FormGroup>
            <FormGroup>
              <Label>Experience Level</Label>
              <ExperienceButtons>
                <ExperienceButton $active>Junior</ExperienceButton>
                <ExperienceButton>Mid-Level</ExperienceButton>
                <ExperienceButton>Senior</ExperienceButton>
              </ExperienceButtons>
            </FormGroup>
          </Column>
          <Column>
            <FormGroup>
              <Label>Key Tasks</Label>
              <TasksContainer>
                <TaskItem>
                  <Checkbox type="checkbox" defaultChecked />
                  <TaskText>Lead Generation</TaskText>
                </TaskItem>
                <TaskItem>
                  <Checkbox type="checkbox" defaultChecked />
                  <TaskText>Cold Outreach</TaskText>
                </TaskItem>
                <TaskItem>
                  <Checkbox type="checkbox" />
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
            <ComparisonLabel>Your Location</ComparisonLabel>
            <ComparisonSelect>
              <option>United States</option>
              <option>United Kingdom</option>
              <option>Australia</option>
            </ComparisonSelect>
          </ComparisonGroup>
          <ComparisonBox>
            <ComparisonLabel2>Average Local Salary</ComparisonLabel2>
            <ComparisonValue>$65,000/year</ComparisonValue>
          </ComparisonBox>
          <ComparisonBox $isGreen>
            <ComparisonLabel2>Potential Savings</ComparisonLabel2>
            <ComparisonValue $isGreen>$33,800/year</ComparisonValue>
          </ComparisonBox>
        </CostSection>
      </CostGrid>

      <ActionBar>
        <ButtonGroup>
          <ActionButton onClick={handleOpenPdfModal}>
            <FontAwesomeIcon icon={faFilePdf} />
            <span>Download PDF</span>
          </ActionButton>
          <ActionButton>
            <FontAwesomeIcon icon={faBookmark} />
            <span>Save Quote</span>
          </ActionButton>
        </ButtonGroup>
        <ConsultButton onClick={handleOpenConsultModal}>
          Schedule Consultation
        </ConsultButton>
      </ActionBar>

      <ModalOverlay $isOpen={isPdfModalOpen} onClick={handleClosePdfModal}>
        <ModalContent $variant="pdf" onClick={e => e.stopPropagation()}>
          <ModalHeader $variant="pdf">
            <IconWrapper $color="#0098FF">
              <FontAwesomeIcon icon={faFilePdf} />
            </IconWrapper>
            <ModalTitle>Your custom quote is ready</ModalTitle>
            <ModalSubtitle>
              Download your personalized quote report with detailed cost breakdown and savings analysis.
            </ModalSubtitle>
            <ModalButtonGroup>
              <PrimaryButton onClick={handleClosePdfModal}>
                <FontAwesomeIcon icon={faDownload} />
                Download Quote PDF
              </PrimaryButton>
              <SecondaryButton onClick={handleClosePdfModal}>
                Go Back to Edit
              </SecondaryButton>
            </ModalButtonGroup>
          </ModalHeader>
        </ModalContent>
      </ModalOverlay>

      <ModalOverlay $isOpen={isConsultModalOpen} onClick={handleCloseConsultModal}>
        <ModalContent $variant="consult" onClick={e => e.stopPropagation()}>
          <CloseModalButton onClick={handleCloseConsultModal} aria-label="Close modal">
            <FontAwesomeIcon icon={faXmark} />
          </CloseModalButton>
          <ModalHeader $variant="consult">
            <HeaderContent>
              <HeaderIcon>
                <FontAwesomeIcon icon={faCalendarCheck} />
              </HeaderIcon>
              <div>
                <ModalTitle>Book Consultation</ModalTitle>
                <ModalSubtitle>Schedule a one-on-one strategy call</ModalSubtitle>
              </div>
            </HeaderContent>
          </ModalHeader>
          <ModalForm onSubmit={handleConsultSubmit}>
            <ModalFormGroup>
              <FormLabel>Preferred Date & Time</FormLabel>
              <DateTimeGrid>
                <FormInput
                  type="date"
                  value={consultDate}
                  onChange={e => setConsultDate(e.target.value)}
                  required
                />
                <FormInput
                  type="time"
                  value={consultTime}
                  onChange={e => setConsultTime(e.target.value)}
                  required
                />
              </DateTimeGrid>
            </ModalFormGroup>
            <ModalFormGroup>
              <FormLabel>
                Notes or Questions <span style={{ color: 'rgba(15, 23, 42, 0.5)' }}>(Optional)</span>
              </FormLabel>
              <FormTextarea
                value={consultNotes}
                onChange={e => setConsultNotes(e.target.value)}
                placeholder="Tell us about your specific needs or questions..."
              />
            </ModalFormGroup>
            <QuoteReference>
              <StatusDot />
              <ReferenceText>Quote Reference:</ReferenceText>
              <ReferenceValue>SDR-JR-001</ReferenceValue>
            </QuoteReference>
            <ModalButtonGroup>
              <SecondaryButton type="button" onClick={handleCloseConsultModal}>
                Cancel
              </SecondaryButton>
              <PrimaryButton type="submit">
                Confirm Booking
              </PrimaryButton>
            </ModalButtonGroup>
          </ModalForm>
        </ModalContent>
      </ModalOverlay>

      <ModalOverlay $isOpen={isSuccessModalOpen} onClick={handleCloseSuccessModal}>
        <ModalContent $variant="success" onClick={e => e.stopPropagation()}>
          <ModalHeader $variant="success">
            <IconWrapper $color="#00E915">
              <FontAwesomeIcon icon={faCheck} />
            </IconWrapper>
            <ModalTitle>Booking Confirmed!</ModalTitle>
            <ModalSubtitle>
              Your consultation has been scheduled. You'll receive a confirmation email shortly.
            </ModalSubtitle>
            <PrimaryButton onClick={handleCloseSuccessModal}>
              Got it
            </PrimaryButton>
          </ModalHeader>
        </ModalContent>
      </ModalOverlay>
    </MainContent>
  );
};

export default QuoteCalculatorTab; 