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
import { NavigationButtons, ContinueButton } from '../RoleBuilderTab';

const Section = styled.section`
  background-color: white;
  border-radius: 0.75rem;
  border: 1px solid #E5E7EB;
  padding: 2rem;
  width: 100%;
  
  @media only screen and (max-width: 1023px) {
    padding: 1.5rem;
  }
  
  @media only screen and (max-width: 767px) {
    padding: 1.25rem;
  }
  
  @media only screen and (max-width: 480px) {
    padding: 1rem;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #0F172A;
  margin-bottom: 1.5rem;
  
  @media only screen and (max-width: 767px) {
    font-size: 1.25rem;
    margin-bottom: 1.25rem;
  }
  
  @media only screen and (max-width: 480px) {
    font-size: 1.125rem;
    margin-bottom: 1rem;
  }
`;

const DepartmentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  
  @media only screen and (max-width: 1023px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media only screen and (max-width: 767px) {
    grid-template-columns: 1fr;
    gap: 0.875rem;
  }
  
  @media only screen and (max-width: 480px) {
    gap: 0.75rem;
  }
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
  
  @media only screen and (max-width: 767px) {
    padding: 1.25rem;
  }
  
  @media only screen and (max-width: 480px) {
    padding: 1rem;
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  
  @media only screen and (max-width: 480px) {
    margin-bottom: 0.75rem;
  }
`;

const IconContainer = styled.div<{ $selected?: boolean }>`
  font-size: 1.5rem;
  color: ${props => props.$selected ? '#6366F1' : 'rgba(15, 23, 42, 0.7)'};
  
  @media only screen and (max-width: 767px) {
    font-size: 1.25rem;
  }
  
  @media only screen and (max-width: 480px) {
    font-size: 1.125rem;
  }
`;

const RadioCircle = styled.div<{ $selected?: boolean }>`
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 9999px;
  border: 2px solid ${props => props.$selected ? '#6366F1' : '#E5E7EB'};
  display: flex;
  align-items: center;
  justify-content: center;
  
  @media only screen and (max-width: 480px) {
    width: 1.125rem;
    height: 1.125rem;
  }
`;

const RadioDot = styled.div`
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 9999px;
  background-color: #6366F1;
  
  @media only screen and (max-width: 480px) {
    width: 0.625rem;
    height: 0.625rem;
  }
`;

const CardTitle = styled.h3`
  font-weight: 600;
  color: #0F172A;
  
  @media only screen and (max-width: 767px) {
    font-size: 0.9375rem;
  }
  
  @media only screen and (max-width: 480px) {
    font-size: 0.875rem;
  }
`;

const CardDescription = styled.p`
  font-size: 0.875rem;
  color: rgba(15, 23, 42, 0.7);
  margin-top: 0.5rem;
  
  @media only screen and (max-width: 767px) {
    font-size: 0.8125rem;
    margin-top: 0.375rem;
  }
  
  @media only screen and (max-width: 480px) {
    font-size: 0.75rem;
    margin-top: 0.25rem;
  }
`;

const ButtonContainer = styled.div`
  margin-top: 2rem;
  
  @media only screen and (max-width: 767px) {
    margin-top: 1.5rem;
  }
  
  @media only screen and (max-width: 480px) {
    margin-top: 1.25rem;
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

      <NavigationButtons>
        <ContinueButton onClick={onContinue}>
          Continue to Tasks <FaArrowRight />
        </ContinueButton>
      </NavigationButtons>
    </Section>
  );
};

export default Step1; 
