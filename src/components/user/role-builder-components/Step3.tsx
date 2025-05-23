import React from 'react';
import styled from 'styled-components';
import { FaArrowLeft, FaArrowRight, FaPlus, FaSearch } from 'react-icons/fa';
import { FaSalesforce, FaHubspot, FaSlack, FaGoogle } from 'react-icons/fa';

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

const SearchContainer = styled.div`
  position: relative;
  margin-bottom: 2rem;
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(15, 23, 42, 0.4);
  pointer-events: none;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border: 1px solid #E5E7EB;
  border-radius: 0.5rem;
  outline: none;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
  }
`;

const ToolCategories = styled.div`
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

const ToolGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
`;

const ToolCard = styled.div<{ $selected?: boolean }>`
  border: 2px solid ${props => props.$selected ? '#6366F1' : '#E5E7EB'};
  border-radius: 0.5rem;
  padding: 1rem;
  background-color: ${props => props.$selected ? 'rgba(99, 102, 241, 0.05)' : 'transparent'};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #6366F1;
    background-color: rgba(99, 102, 241, 0.05);
  }
`;

const ToolHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

const ToolInfo = styled.div`
  display: flex;
  align-items: center;
`;

const ToolIcon = styled.div<{ $selected?: boolean }>`
  font-size: 1.5rem;
  color: ${props => props.$selected ? '#6366F1' : 'rgba(15, 23, 42, 0.7)'};
  margin-right: 0.75rem;
`;

const ToolTitle = styled.h4`
  font-weight: 500;
  color: #0F172A;
`;

const ToolDescription = styled.p`
  font-size: 0.875rem;
  color: rgba(15, 23, 42, 0.7);
  margin-top: 0.75rem;
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

const CustomToolContainer = styled.div`
  margin-bottom: 2rem;
`;

const CustomToolInput = styled.div`
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
  color: #6366F1;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: none;
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
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: none;
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

interface Step3Props {
  onBack: () => void;
  onContinue: () => void;
}

const Step3: React.FC<Step3Props> = ({ onBack, onContinue }) => {
  const [selectedCategory, setSelectedCategory] = React.useState<string>('all');
  const [selectedTools, setSelectedTools] = React.useState<string[]>(['salesforce']);
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const [customTool, setCustomTool] = React.useState<string>('');

  const handleToolToggle = (toolId: string) => {
    setSelectedTools(prev => 
      prev.includes(toolId)
        ? prev.filter(id => id !== toolId)
        : [...prev, toolId]
    );
  };

  const handleAddCustomTool = () => {
    if (customTool.trim()) {
      // Add custom tool logic here
      setCustomTool('');
    }
  };

  return (
    <Section>
      <SectionTitle>What tools will they use?</SectionTitle>
      <SectionDescription>Choose tools or platforms your team already uses.</SectionDescription>

      <SearchContainer>
        <SearchIcon>
          <FaSearch />
        </SearchIcon>
        <SearchInput 
          type="text" 
          placeholder="Search for tools..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </SearchContainer>

      <ToolCategories>
        <CategoryButton 
          $active={selectedCategory === 'all'}
          onClick={() => setSelectedCategory('all')}
        >
          All Tools
        </CategoryButton>
        <CategoryButton 
          $active={selectedCategory === 'crm'}
          onClick={() => setSelectedCategory('crm')}
        >
          CRM
        </CategoryButton>
        <CategoryButton 
          $active={selectedCategory === 'email'}
          onClick={() => setSelectedCategory('email')}
        >
          Email
        </CategoryButton>
        <CategoryButton 
          $active={selectedCategory === 'calendar'}
          onClick={() => setSelectedCategory('calendar')}
        >
          Calendar
        </CategoryButton>
        <CategoryButton 
          $active={selectedCategory === 'communication'}
          onClick={() => setSelectedCategory('communication')}
        >
          Communication
        </CategoryButton>
      </ToolCategories>

      <ToolGrid>
        <ToolCard 
          $selected={selectedTools.includes('salesforce')}
          onClick={() => handleToolToggle('salesforce')}
        >
          <ToolHeader>
            <ToolInfo>
              <ToolIcon $selected={selectedTools.includes('salesforce')}>
                <FaSalesforce />
              </ToolIcon>
              <ToolTitle>Salesforce</ToolTitle>
            </ToolInfo>
            <RadioCircle $selected={selectedTools.includes('salesforce')}>
              {selectedTools.includes('salesforce') && <RadioDot />}
            </RadioCircle>
          </ToolHeader>
          <ToolDescription>CRM and sales management platform</ToolDescription>
        </ToolCard>

        <ToolCard 
          $selected={selectedTools.includes('hubspot')}
          onClick={() => handleToolToggle('hubspot')}
        >
          <ToolHeader>
            <ToolInfo>
              <ToolIcon $selected={selectedTools.includes('hubspot')}>
                <FaHubspot />
              </ToolIcon>
              <ToolTitle>HubSpot</ToolTitle>
            </ToolInfo>
            <RadioCircle $selected={selectedTools.includes('hubspot')}>
              {selectedTools.includes('hubspot') && <RadioDot />}
            </RadioCircle>
          </ToolHeader>
          <ToolDescription>Marketing and CRM platform</ToolDescription>
        </ToolCard>

        <ToolCard 
          $selected={selectedTools.includes('slack')}
          onClick={() => handleToolToggle('slack')}
        >
          <ToolHeader>
            <ToolInfo>
              <ToolIcon $selected={selectedTools.includes('slack')}>
                <FaSlack />
              </ToolIcon>
              <ToolTitle>Slack</ToolTitle>
            </ToolInfo>
            <RadioCircle $selected={selectedTools.includes('slack')}>
              {selectedTools.includes('slack') && <RadioDot />}
            </RadioCircle>
          </ToolHeader>
          <ToolDescription>Team communication tool</ToolDescription>
        </ToolCard>

        <ToolCard 
          $selected={selectedTools.includes('google')}
          onClick={() => handleToolToggle('google')}
        >
          <ToolHeader>
            <ToolInfo>
              <ToolIcon $selected={selectedTools.includes('google')}>
                <FaGoogle />
              </ToolIcon>
              <ToolTitle>Google Workspace</ToolTitle>
            </ToolInfo>
            <RadioCircle $selected={selectedTools.includes('google')}>
              {selectedTools.includes('google') && <RadioDot />}
            </RadioCircle>
          </ToolHeader>
          <ToolDescription>Email and productivity suite</ToolDescription>
        </ToolCard>
      </ToolGrid>

      <CustomToolContainer>
        <CustomToolInput>
          <Input 
            type="text" 
            placeholder="Add a custom tool..." 
            value={customTool}
            onChange={(e) => setCustomTool(e.target.value)}
          />
          <AddButton onClick={handleAddCustomTool}>
            <FaPlus /> Add Tool
          </AddButton>
        </CustomToolInput>
      </CustomToolContainer>

      <NavigationContainer>
        <BackButton onClick={onBack}>
          <FaArrowLeft /> Back to Tasks
        </BackButton>
        <ContinueButton onClick={onContinue}>
          Continue to Expectations <FaArrowRight />
        </ContinueButton>
      </NavigationContainer>
    </Section>
  );
};

export default Step3; 