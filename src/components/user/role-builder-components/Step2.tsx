import React from 'react';
import styled from 'styled-components';
import { FaArrowLeft, FaArrowRight, FaPlus } from 'react-icons/fa';

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
  margin-bottom: 0.5rem;
`;

const SectionDescription = styled.p`
  color: rgba(15, 23, 42, 0.7);
  margin-bottom: 2rem;
`;

const TaskCategories = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const CategoryButton = styled.button<{ $active?: boolean }>`
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  background-color: ${props => props.$active ? '#6366F1' : 'transparent'};
  color: ${props => props.$active ? 'white' : '#0F172A'};
  border: ${props => props.$active ? 'none' : '1px solid #E5E7EB'};
  transition: all 0.2s;

  &:hover {
    background-color: ${props => props.$active ? '#6366F1' : '#F9FAFB'};
  }
`;

const TaskGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
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
`;

const TaskContent = styled.div`
  flex: 1;
`;

const TaskTitle = styled.h4`
  font-weight: 500;
  color: #0F172A;
`;

const TaskDescription = styled.p`
  font-size: 0.875rem;
  color: rgba(15, 23, 42, 0.7);
  margin-top: 0.25rem;
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

const CustomTaskContainer = styled.div`
  margin-bottom: 2rem;
`;

const CustomTaskInput = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Input = styled.input`
  flex: 1;
  padding: 0.5rem 1rem;
  border: 1px solid #E5E7EB;
  border-radius: 0.5rem;
  outline: none;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
  }
`;

const AddButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  color: #6366F1;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s;

  &:hover {
    background-color: rgba(99, 102, 241, 0.05);
  }
`;

const NavigationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const BackButton = styled.button`
  padding: 0.75rem 1.5rem;
  color: #0F172A;
  border-radius: 0.5rem;
  border: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s;

  &:hover {
    background-color: #F9FAFB;
  }
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
  border: none;
  transition: all 0.2s;

  &:hover {
    background-color: rgba(59, 130, 246, 0.9);
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

      <NavigationContainer>
        <BackButton onClick={onBack}>
          <FaArrowLeft /> Back to Department
        </BackButton>
        <ContinueButton onClick={onContinue}>
          Continue to Tools <FaArrowRight />
        </ContinueButton>
      </NavigationContainer>
    </Section>
  );
};

export default Step2; 