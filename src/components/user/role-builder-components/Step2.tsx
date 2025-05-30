import React from 'react';
import styled from 'styled-components';
import { FaArrowLeft, FaArrowRight, FaPlus } from 'react-icons/fa';
import { NavigationButtons, BackButton, ContinueButton, PrimaryButton } from './sharedStyles';

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
  margin-bottom: 0.5rem;
  
  @media only screen and (max-width: 767px) {
    font-size: 1.25rem;
  }
  
  @media only screen and (max-width: 480px) {
    font-size: 1.125rem;
  }
`;

const SectionDescription = styled.p`
  color: rgba(15, 23, 42, 0.7);
  margin-bottom: 2rem;
  
  @media only screen and (max-width: 767px) {
    font-size: 0.9375rem;
    margin-bottom: 1.5rem;
  }
  
  @media only screen and (max-width: 480px) {
    font-size: 0.875rem;
    margin-bottom: 1.25rem;
  }
`;

const TaskCategories = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  
  @media only screen and (max-width: 767px) {
    gap: 0.75rem;
    margin-bottom: 1.25rem;
  }
  
  @media only screen and (max-width: 480px) {
    gap: 0.5rem;
    margin-bottom: 1rem;
  }
`;

const CategoryButton = styled.button<{ $active?: boolean }>`
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  background-color: ${props => props.$active ? '#6366F1' : 'transparent'};
  color: ${props => props.$active ? 'white' : '#0F172A'};
  border: ${props => props.$active ? 'none' : '1px solid #E5E7EB'};
  transition: all 0.2s;
  white-space: nowrap;

  &:hover {
    background-color: ${props => props.$active ? '#6366F1' : '#F9FAFB'};
  }
  
  @media only screen and (max-width: 767px) {
    padding: 0.375rem 0.875rem;
    font-size: 0.9375rem;
  }
  
  @media only screen and (max-width: 480px) {
    padding: 0.25rem 0.75rem;
    font-size: 0.875rem;
  }
`;

const TaskGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
  
  @media only screen and (max-width: 767px) {
    grid-template-columns: 1fr;
    gap: 0.875rem;
    margin-bottom: 1.5rem;
  }
  
  @media only screen and (max-width: 480px) {
    gap: 0.75rem;
    margin-bottom: 1.25rem;
  }
`;

const TaskCard = styled.div<{ $selected?: boolean }>`
  border: 2px solid ${props => props.$selected ? '#6366F1' : '#E5E7EB'};
  border-radius: 0.5rem;
  padding: 1rem;
  background-color: ${props => props.$selected ? 'rgba(99, 102, 241, 0.05)' : 'transparent'};
  display: flex;
  align-items: flex-start;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #6366F1;
    background-color: rgba(99, 102, 241, 0.05);
  }
  
  @media only screen and (max-width: 767px) {
    padding: 0.875rem;
  }
  
  @media only screen and (max-width: 480px) {
    padding: 0.75rem;
  }
`;

const TaskContent = styled.div`
  flex: 1;
  min-width: 0;
`;

const TaskTitle = styled.h4`
  font-weight: 500;
  color: #0F172A;
  
  @media only screen and (max-width: 767px) {
    font-size: 0.9375rem;
  }
  
  @media only screen and (max-width: 480px) {
    font-size: 0.875rem;
  }
`;

const TaskDescription = styled.p`
  font-size: 0.875rem;
  color: rgba(15, 23, 42, 0.7);
  margin-top: 0.25rem;
  
  @media only screen and (max-width: 767px) {
    font-size: 0.8125rem;
  }
  
  @media only screen and (max-width: 480px) {
    font-size: 0.75rem;
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
  flex-shrink: 0;
  
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

const CustomTaskContainer = styled.div`
  margin-bottom: 2rem;
  
  @media only screen and (max-width: 767px) {
    margin-bottom: 1.5rem;
  }
  
  @media only screen and (max-width: 480px) {
    margin-bottom: 1.25rem;
  }
`;

const CustomTaskInput = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  
  @media only screen and (max-width: 767px) {
    gap: 0.75rem;
  }
  
  @media only screen and (max-width: 480px) {
    gap: 0.5rem;
    flex-direction: column;
    width: 100%;
  }
`;

const Input = styled.input`
  flex: 1;
  padding: 0.5rem 1rem;
  border: 1px solid #E5E7EB;
  border-radius: 0.5rem;
  outline: none;
  min-width: 0;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
  }
  
  @media only screen and (max-width: 767px) {
    padding: 0.375rem 0.875rem;
    font-size: 0.9375rem;
  }
  
  @media only screen and (max-width: 480px) {
    width: 100%;
    padding: 0.5rem 0.75rem;
    font-size: 0.875rem;
  }
`;

const AddButton = styled(PrimaryButton)`
  padding: 0.5rem 1rem;
  
  @media only screen and (max-width: 767px) {
    padding: 0.375rem 0.875rem;
    font-size: 0.9375rem;
  }

  @media only screen and (max-width: 480px) {
    padding: 0.25rem 0.75rem;
    font-size: 0.875rem;
  }
`;

interface Step2Props {
  onBack: () => void;
  onContinue: () => void;
}

const Step2: React.FC<Step2Props> = ({ onBack, onContinue }) => {
  const [selectedCategory, setSelectedCategory] = React.useState<string>('all');
  const [selectedTasks, setSelectedTasks] = React.useState<string[]>(['prospect-research']);
  const [customTask, setCustomTask] = React.useState<string>('');

  const handleTaskToggle = (taskId: string) => {
    setSelectedTasks(prev => 
      prev.includes(taskId)
        ? prev.filter(id => id !== taskId)
        : [...prev, taskId]
    );
  };

  const handleAddCustomTask = () => {
    if (customTask.trim()) {
      // Add custom task logic here
      setCustomTask('');
    }
  };

  return (
    <Section>
      <SectionTitle>What will this role handle?</SectionTitle>
      <SectionDescription>Select from popular tasks or add your own custom responsibilities.</SectionDescription>

      <TaskCategories>
        <CategoryButton 
          $active={selectedCategory === 'all'}
          onClick={() => setSelectedCategory('all')}
        >
          All Tasks
        </CategoryButton>
        <CategoryButton 
          $active={selectedCategory === 'lead-generation'}
          onClick={() => setSelectedCategory('lead-generation')}
        >
          Lead Generation
        </CategoryButton>
        <CategoryButton 
          $active={selectedCategory === 'client-management'}
          onClick={() => setSelectedCategory('client-management')}
        >
          Client Management
        </CategoryButton>
        <CategoryButton 
          $active={selectedCategory === 'sales-operations'}
          onClick={() => setSelectedCategory('sales-operations')}
        >
          Sales Operations
        </CategoryButton>
      </TaskCategories>

      <TaskGrid>
        <TaskCard 
          $selected={selectedTasks.includes('prospect-research')}
          onClick={() => handleTaskToggle('prospect-research')}
        >
          <TaskContent>
            <TaskTitle>Prospect Research & List Building</TaskTitle>
            <TaskDescription>Identify and research potential clients using various tools</TaskDescription>
          </TaskContent>
          <RadioCircle $selected={selectedTasks.includes('prospect-research')}>
            {selectedTasks.includes('prospect-research') && <RadioDot />}
          </RadioCircle>
        </TaskCard>

        <TaskCard 
          $selected={selectedTasks.includes('cold-email')}
          onClick={() => handleTaskToggle('cold-email')}
        >
          <TaskContent>
            <TaskTitle>Cold Email Outreach</TaskTitle>
            <TaskDescription>Write and send personalized cold emails to prospects</TaskDescription>
          </TaskContent>
          <RadioCircle $selected={selectedTasks.includes('cold-email')}>
            {selectedTasks.includes('cold-email') && <RadioDot />}
          </RadioCircle>
        </TaskCard>

        <TaskCard 
          $selected={selectedTasks.includes('linkedin')}
          onClick={() => handleTaskToggle('linkedin')}
        >
          <TaskContent>
            <TaskTitle>LinkedIn Prospecting</TaskTitle>
            <TaskDescription>Connect and engage with potential clients on LinkedIn</TaskDescription>
          </TaskContent>
          <RadioCircle $selected={selectedTasks.includes('linkedin')}>
            {selectedTasks.includes('linkedin') && <RadioDot />}
          </RadioCircle>
        </TaskCard>

        <TaskCard 
          $selected={selectedTasks.includes('lead-qualification')}
          onClick={() => handleTaskToggle('lead-qualification')}
        >
          <TaskContent>
            <TaskTitle>Lead Qualification</TaskTitle>
            <TaskDescription>Screen and qualify leads based on set criteria</TaskDescription>
          </TaskContent>
          <RadioCircle $selected={selectedTasks.includes('lead-qualification')}>
            {selectedTasks.includes('lead-qualification') && <RadioDot />}
          </RadioCircle>
        </TaskCard>
      </TaskGrid>

      <CustomTaskContainer>
        <CustomTaskInput>
          <Input 
            type="text" 
            placeholder="Add a custom task..." 
            value={customTask}
            onChange={(e) => setCustomTask(e.target.value)}
          />
          <AddButton onClick={handleAddCustomTask}>
            <FaPlus /> Add Task
          </AddButton>
        </CustomTaskInput>
      </CustomTaskContainer>

      <NavigationButtons>
        <BackButton onClick={onBack}>
          <FaArrowLeft /> Back to Department
        </BackButton>
        <ContinueButton onClick={onContinue}>
          Continue to Tools <FaArrowRight />
        </ContinueButton>
      </NavigationButtons>
    </Section>
  );
};

export default Step2; 