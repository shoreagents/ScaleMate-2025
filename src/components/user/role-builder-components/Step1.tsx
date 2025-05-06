import React from 'react';
import styled from 'styled-components';
import { 
  FaBriefcase, 
  FaUsers, 
  FaGears, 
  FaArrowRight, 
  FaRegBookmark, 
  FaRegCopy 
} from 'react-icons/fa6';

const Section = styled.section`
  background-color: white;
  border-radius: 0.75rem;
  border: 1px solid #E5E7EB;
  padding: 2rem;
  width: 100%;
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
  border: none;
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

interface Step1Props {
  selectedDepartment: string;
  onDepartmentSelect: (department: string) => void;
  onContinue: () => void;
}

const Step1: React.FC<Step1Props> = ({ selectedDepartment, onDepartmentSelect, onContinue }) => {
  return (
    <Section>
      <SectionTitle>Pick a Department</SectionTitle>
      <DepartmentGrid>
        <DepartmentCard 
          $selected={selectedDepartment === 'sales'}
          onClick={() => onDepartmentSelect('sales')}
        >
          <CardHeader>
            <IconContainer $selected={selectedDepartment === 'sales'}>
              <FaBriefcase />
            </IconContainer>
            <RadioCircle $selected={selectedDepartment === 'sales'}>
              {selectedDepartment === 'sales' && <RadioDot />}
            </RadioCircle>
          </CardHeader>
          <CardTitle>Sales</CardTitle>
          <CardDescription>Sales, Business Development, Account Management</CardDescription>
        </DepartmentCard>

        <DepartmentCard 
          $selected={selectedDepartment === 'admin'}
          onClick={() => onDepartmentSelect('admin')}
        >
          <CardHeader>
            <IconContainer $selected={selectedDepartment === 'admin'}>
              <FaUsers />
            </IconContainer>
            <RadioCircle $selected={selectedDepartment === 'admin'}>
              {selectedDepartment === 'admin' && <RadioDot />}
            </RadioCircle>
          </CardHeader>
          <CardTitle>Administration</CardTitle>
          <CardDescription>HR, Finance, Operations, Executive</CardDescription>
        </DepartmentCard>

        <DepartmentCard 
          $selected={selectedDepartment === 'tech'}
          onClick={() => onDepartmentSelect('tech')}
        >
          <CardHeader>
            <IconContainer $selected={selectedDepartment === 'tech'}>
              <FaGears />
            </IconContainer>
            <RadioCircle $selected={selectedDepartment === 'tech'}>
              {selectedDepartment === 'tech' && <RadioDot />}
            </RadioCircle>
          </CardHeader>
          <CardTitle>Technology</CardTitle>
          <CardDescription>Engineering, IT, Product, Design</CardDescription>
        </DepartmentCard>
      </DepartmentGrid>

      <ButtonContainer>
        <ContinueButton onClick={onContinue}>
          Continue to Tasks <FaArrowRight />
        </ContinueButton>
      </ButtonContainer>
    </Section>
  );
};

export default Step1; 