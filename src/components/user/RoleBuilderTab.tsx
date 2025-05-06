import React from 'react';
import styled from 'styled-components';
import Step1 from './role-builder-components/Step1';
import Step2 from './role-builder-components/Step2';
import Step3 from './role-builder-components/Step3';
import Step4 from './role-builder-components/Step4';
import Step5 from './role-builder-components/Step5';
import { 
  FaBriefcase, 
  FaUsers, 
  FaGears, 
  FaArrowRight, 
  FaRegBookmark, 
  FaRegCopy 
} from 'react-icons/fa6';

const MainContent = styled.main`
  flex: 1;
  padding: 1.5rem;
  background-color: #F9FAFB;
`;

const Container = styled.div`
  max-width: 100%;
  margin: 0 auto;
`;

const ProgressSteps = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const StepContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;

  &:last-child {
    flex: 0;
  }
`;

const StepCircle = styled.div<{ $active?: boolean }>`
  width: 2rem;
  height: 2rem;
  border-radius: 9999px;
  background-color: ${props => props.$active ? '#6366F1' : '#E5E7EB'};
  color: ${props => props.$active ? 'white' : '#0F172A'};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StepLine = styled.div<{ $active?: boolean }>`
  flex: 1;
  height: 0.25rem;
  margin: 0 1rem;
  background-color: ${props => props.$active ? '#6366F1' : '#E5E7EB'};
`;

const Section = styled.section`
  background-color: white;
  border-radius: 0.75rem;
  border: 1px solid #E5E7EB;
  padding: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #0F172A;
  margin-bottom: 1.5rem;
`;

const DepartmentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
`;

const DepartmentCard = styled.div<{ $selected?: boolean }>`
  border: 2px solid ${props => props.$selected ? '#6366F1' : '#E5E7EB'};
  border-radius: 0.75rem;
  padding: 1.5rem;
  cursor: pointer;
  background-color: ${props => props.$selected ? 'rgba(99, 102, 241, 0.05)' : 'transparent'};
  transition: all 0.2s;

  &:hover {
    border-color: #6366F1;
    background-color: rgba(99, 102, 241, 0.05);
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const IconContainer = styled.div<{ $selected?: boolean }>`
  font-size: 1.5rem;
  color: ${props => props.$selected ? '#6366F1' : 'rgba(15, 23, 42, 0.7)'};
`;

const RadioCircle = styled.div<{ $selected?: boolean }>`
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 9999px;
  border: 2px solid ${props => props.$selected ? '#6366F1' : '#E5E7EB'};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RadioDot = styled.div`
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 9999px;
  background-color: #6366F1;
`;

const CardTitle = styled.h3`
  font-weight: 600;
  color: #0F172A;
`;

const CardDescription = styled.p`
  font-size: 0.875rem;
  color: rgba(15, 23, 42, 0.7);
  margin-top: 0.5rem;
`;

const ButtonContainer = styled.div`
  margin-top: 2rem;
`;

const ContinueButton = styled.button`
  background-color: #3B82F6;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s;

  &:hover {
    background-color: rgba(59, 130, 246, 0.9);
  }
`;

const PreviewPanel = styled(Section)`
  margin-top: 1.5rem;
  padding: 1.5rem;
`;

const PreviewHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const PreviewTitle = styled.h3`
  font-weight: 600;
  color: #0F172A;
`;

const ActionButtons = styled.div`
  display: flex;
  align-items: center;
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

const PreviewContent = styled.div`
  padding: 1rem;
  background-color: #F9FAFB;
  border-radius: 0.5rem;
`;

const PreviewText = styled.p`
  font-size: 0.875rem;
  color: rgba(15, 23, 42, 0.7);
`;

const RoleBuilderTab: React.FC = () => {
  const [selectedDepartment, setSelectedDepartment] = React.useState<string>('sales');
  const [currentStep, setCurrentStep] = React.useState<number>(1);

  const handleContinue = () => {
    setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  return (
    <MainContent>
      <Container>
        <ProgressSteps>
          <StepContainer>
            <StepCircle $active={currentStep >= 1}>1</StepCircle>
            <StepLine $active={currentStep >= 2} />
          </StepContainer>
          <StepContainer>
            <StepCircle $active={currentStep >= 2}>2</StepCircle>
            <StepLine $active={currentStep >= 3} />
          </StepContainer>
          <StepContainer>
            <StepCircle $active={currentStep >= 3}>3</StepCircle>
            <StepLine $active={currentStep >= 4} />
          </StepContainer>
          <StepContainer>
            <StepCircle $active={currentStep >= 4}>4</StepCircle>
            <StepLine $active={currentStep >= 5} />
          </StepContainer>
          <StepCircle $active={currentStep >= 5}>5</StepCircle>
        </ProgressSteps>

        {currentStep === 1 && (
          <Step1
            selectedDepartment={selectedDepartment}
            onDepartmentSelect={setSelectedDepartment}
            onContinue={handleContinue}
          />
        )}

        {currentStep === 2 && (
          <Step2
            onBack={handleBack}
            onContinue={handleContinue}
          />
        )}

        {currentStep === 3 && (
          <Step3
            onBack={handleBack}
            onContinue={handleContinue}
          />
        )}

        {currentStep === 4 && (
          <Step4
            onBack={handleBack}
            onContinue={handleContinue}
          />
        )}

        {currentStep === 5 && (
          <Step5
            onBack={handleBack}
          />
        )}
      </Container>

      {currentStep !== 5 && (
        <PreviewPanel>
          <PreviewHeader>
            <PreviewTitle>Role Preview</PreviewTitle>
            <ActionButtons>
              <ActionButton>
                <FaRegBookmark />
                <span>Save Draft</span>
              </ActionButton>
              <ActionButton>
                <FaRegCopy />
                <span>Duplicate</span>
              </ActionButton>
            </ActionButtons>
          </PreviewHeader>
          <PreviewContent>
            <PreviewText>Complete all steps to generate your full role blueprint...</PreviewText>
          </PreviewContent>
        </PreviewPanel>
      )}
    </MainContent>
  );
};

export default RoleBuilderTab; 