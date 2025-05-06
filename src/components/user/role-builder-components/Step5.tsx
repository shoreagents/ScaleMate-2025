import React from 'react';
import styled from 'styled-components';
import { 
  FaCheck, 
  FaDownload, 
  FaBookmark, 
  FaCalculator, 
  FaCopy,
  FaSalesforce,
  FaLinkedin
} from 'react-icons/fa';

const Section = styled.section`
  background-color: white;
  border-radius: 0.75rem;
  border: 1px solid #E5E7EB;
  padding: 2rem;
  width: 100%;
`;

const BlueprintHeader = styled.section`
  text-align: center;
  margin-bottom: 2rem;
`;

const BlueprintTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #0F172A;
  margin-bottom: 0.5rem;
`;

const BlueprintDescription = styled.p`
  color: rgba(15, 23, 42, 0.7);
`;

const BlueprintGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1.5rem;
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const JobOverview = styled(Section)`
  padding: 1.5rem;
`;

const JobTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #0F172A;
  margin-bottom: 1rem;
`;

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const Tag = styled.span`
  padding: 0.25rem 0.75rem;
  background-color: rgba(99, 102, 241, 0.1);
  color: #6366F1;
  border-radius: 9999px;
  font-size: 0.875rem;
`;

const JobDescription = styled.p`
  color: rgba(15, 23, 42, 0.7);
`;

const TaskBreakdown = styled(Section)`
  padding: 1.5rem;
`;

const TaskTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #0F172A;
  margin-bottom: 1rem;
`;

const TaskList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const TaskItem = styled.div`
  display: flex;
  align-items: center;
`;

const TaskIcon = styled.div`
  color: #6366F1;
  margin-right: 0.75rem;
`;

const TaskText = styled.span`
  color: rgba(15, 23, 42, 0.7);
`;

const ToolsSection = styled(Section)`
  padding: 1.5rem;
`;

const ToolsTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #0F172A;
  margin-bottom: 1rem;
`;

const ToolsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
`;

const ToolCard = styled.div`
  display: flex;
  align-items: center;
  padding: 0.75rem;
  background-color: #F9FAFB;
  border-radius: 0.5rem;
`;

const ToolIcon = styled.div`
  font-size: 1.25rem;
  color: #6366F1;
  margin-right: 0.75rem;
`;

const ToolName = styled.span`
  color: #0F172A;
`;

const ActionPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const CostEstimate = styled(Section)`
  padding: 1.5rem;
`;

const CostTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #0F172A;
  margin-bottom: 1rem;
`;

const CostDisplay = styled.div`
  text-align: center;
  padding: 1rem;
  background-color: #F9FAFB;
  border-radius: 0.5rem;
`;

const CostAmount = styled.div`
  font-size: 1.875rem;
  font-weight: 700;
  color: #0F172A;
  margin-bottom: 0.5rem;
`;

const CostLabel = styled.p`
  color: rgba(15, 23, 42, 0.7);
`;

const ActionButtons = styled(Section)`
  padding: 1.5rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const PrimaryButton = styled.button`
  width: 100%;
  background-color: #3B82F6;
  color: white;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 0.5rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.2s;

  &:hover {
    background-color: rgba(59, 130, 246, 0.9);
  }
`;

const SecondaryButton = styled.button`
  width: 100%;
  border: 2px solid #3B82F6;
  color: #3B82F6;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.2s;

  &:hover {
    background-color: rgba(59, 130, 246, 0.05);
  }
`;

const TertiaryButton = styled.button`
  width: 100%;
  border: 1px solid #E5E7EB;
  color: #0F172A;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.2s;

  &:hover {
    background-color: #F9FAFB;
  }
`;

interface Step5Props {
  onBack: () => void;
}

const Step5: React.FC<Step5Props> = ({ onBack }) => {
  return (
    <div>
      <BlueprintHeader>
        <BlueprintTitle>Your Role Blueprint Is Ready</BlueprintTitle>
        <BlueprintDescription>Here's your AI-generated role with cost, tasks, and tools.</BlueprintDescription>
      </BlueprintHeader>

      <BlueprintGrid>
        <MainContent>
          <JobOverview>
            <JobTitle>Sales Development Representative</JobTitle>
            <TagContainer>
              <Tag>Sales</Tag>
              <Tag>Full-time</Tag>
              <Tag>Synchronous</Tag>
            </TagContainer>
            <JobDescription>
              A results-driven Sales Development Representative responsible for generating and qualifying new business opportunities through outbound prospecting and lead nurturing...
            </JobDescription>
          </JobOverview>

          <TaskBreakdown>
            <TaskTitle>Key Responsibilities</TaskTitle>
            <TaskList>
              <TaskItem>
                <TaskIcon><FaCheck /></TaskIcon>
                <TaskText>Prospect Research & List Building</TaskText>
              </TaskItem>
              <TaskItem>
                <TaskIcon><FaCheck /></TaskIcon>
                <TaskText>Outbound Email Campaigns</TaskText>
              </TaskItem>
              <TaskItem>
                <TaskIcon><FaCheck /></TaskIcon>
                <TaskText>LinkedIn Outreach</TaskText>
              </TaskItem>
            </TaskList>
          </TaskBreakdown>

          <ToolsSection>
            <ToolsTitle>Tools & Systems</ToolsTitle>
            <ToolsGrid>
              <ToolCard>
                <ToolIcon><FaSalesforce /></ToolIcon>
                <ToolName>Salesforce</ToolName>
              </ToolCard>
              <ToolCard>
                <ToolIcon><FaLinkedin /></ToolIcon>
                <ToolName>LinkedIn Sales Navigator</ToolName>
              </ToolCard>
            </ToolsGrid>
          </ToolsSection>
        </MainContent>

        <ActionPanel>
          <CostEstimate>
            <CostTitle>Estimated Cost</CostTitle>
            <CostDisplay>
              <CostAmount>$1,200/mo</CostAmount>
              <CostLabel>Offshore Rate</CostLabel>
            </CostDisplay>
          </CostEstimate>

          <ActionButtons>
            <ButtonContainer>
              <PrimaryButton>
                <FaDownload /> Download PDF
              </PrimaryButton>
              <SecondaryButton>
                <FaBookmark /> Save to My Roles
              </SecondaryButton>
              <TertiaryButton>
                <FaCalculator /> Generate Quote
              </TertiaryButton>
              <TertiaryButton>
                <FaCopy /> Duplicate Role
              </TertiaryButton>
            </ButtonContainer>
          </ActionButtons>
        </ActionPanel>
      </BlueprintGrid>
    </div>
  );
};

export default Step5; 