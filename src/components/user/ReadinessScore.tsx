import React from 'react';
import styled from 'styled-components';
import { FaCheck, FaArrowTrendUp, FaFilePdf, FaGraduationCap, FaBook, FaFileLines, FaArrowLeft } from 'react-icons/fa6';

const ScoreSummary = styled.section`
  background-color: white;
  border-radius: 0.75rem;
  border: 1px solid #E5E7EB;
  padding: 2rem;
  margin-bottom: 1.5rem;
  @media (max-width: 767px) {
    padding: 1rem;
    margin-bottom: 1rem;
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    margin-bottom: 1rem;
  }
`;

const TitleContainer = styled.div``;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #0F172A;
  word-break: break-word;
  @media (max-width: 600px) {
    font-size: 1.15rem;
  }
`;

const Subtitle = styled.p`
  color: rgba(15, 23, 42, 0.7);
  margin-top: 0.25rem;
  word-break: break-word;
  font-size: 1rem;
  @media (max-width: 600px) {
    font-size: 0.95rem;
  }
`;

const ScoreContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-shrink: 0;
  @media (max-width: 600px) {
    gap: 0.5rem;
    font-size: 1.25rem;
  }
`;

const Score = styled.span`
  font-size: 2.25rem;
  font-weight: 700;
  color: #84CC16;
  word-break: break-word;
  @media (max-width: 600px) {
    font-size: 1.5rem;
  }
`;

const StatusBadge = styled.span`
  padding: 0.25rem 1rem;
  background-color: rgba(0, 233, 21, 0.1);
  color: #00E915;
  border-radius: 9999px;
  font-weight: 500;
  font-size: 0.95rem;
  word-break: break-word;
  @media (max-width: 600px) {
    font-size: 0.85rem;
    padding: 0.15rem 0.7rem;
  }
`;

const ProgressGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  @media (max-width: 1023px) {
    grid-template-columns: 1fr;
    gap: 1rem;
    margin-bottom: 1rem;
  }
`;

const ProgressItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ProgressHeader = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;
  flex-wrap: wrap;
  gap: 0.25rem;
  @media (max-width: 600px) {
    font-size: 0.8rem;
  }
`;

const ProgressLabel = styled.span`
  color: rgba(15, 23, 42, 0.7);
  word-break: break-word;
`;

const ProgressValue = styled.span`
  font-weight: 500;
  word-break: break-word;
`;

const ProgressBar = styled.div`
  height: 0.5rem;
  background-color: #F9FAFB;
  border-radius: 9999px;
  overflow: hidden;
  min-width: 0;
`;

const ProgressFill = styled.div<{ $width: number }>`
  height: 100%;
  background-color: #84CC16;
  border-radius: 9999px;
  width: ${props => props.$width}%;
  min-width: 0;
`;

const AnalysisGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  @media (max-width: 1023px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const AnalysisSection = styled.section`
  background-color: white;
  border-radius: 0.75rem;
  border: 1px solid #E5E7EB;
  padding: 1.5rem;
`;

const SectionTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #0F172A;
  margin-bottom: 1rem;
`;

const AnalysisBox = styled.div<{ $type: 'strength' | 'improvement' }>`
  padding: 1rem;
  background-color: ${props => props.$type === 'strength' ? 'rgba(132, 204, 22, 0.05)' : 'rgba(59, 130, 246, 0.05)'};
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  word-break: break-word;
  @media (max-width: 600px) {
    padding: 0.75rem;
  }
`;

const BoxTitle = styled.h4`
  font-weight: 500;
  color: #0F172A;
  margin-bottom: 0.5rem;
  word-break: break-word;
  font-size: 1rem;
  @media (max-width: 600px) {
    font-size: 0.95rem;
  }
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  color: rgba(15, 23, 42, 0.7);
  word-break: break-word;
  font-size: 1rem;
  @media (max-width: 600px) {
    font-size: 0.95rem;
  }
`;

const ListItem = styled.li`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  word-break: break-word;
  font-size: 1rem;
  @media (max-width: 600px) {
    font-size: 0.95rem;
    gap: 0.35rem;
  }
`;

const ActionPlanHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  gap: 0.5rem;
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
  }
`;

const DownloadButton = styled.button`
  color: #3B82F6;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  &:hover {
    color: rgba(59, 130, 246, 0.8);
  }
`;

const ActionItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 0.75rem;
  border-radius: 0.5rem;
  &:hover {
    background-color: #F9FAFB;
  }
  word-break: break-word;
  @media (max-width: 600px) {
    gap: 0.5rem;
    padding: 0.5rem;
  }
`;

const ActionNumber = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  background-color: rgba(59, 130, 246, 0.1);
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #3B82F6;
  font-size: 1rem;
  flex-shrink: 0;
  @media (max-width: 600px) {
    width: 1.1rem;
    height: 1.1rem;
    font-size: 0.85rem;
  }
`;

const ActionContent = styled.div``;

const ActionTitle = styled.h4`
  font-weight: 500;
  color: #0F172A;
  word-break: break-word;
  font-size: 1rem;
  @media (max-width: 600px) {
    font-size: 0.95rem;
  }
`;

const ActionDescription = styled.p`
  font-size: 0.875rem;
  color: rgba(15, 23, 42, 0.7);
  word-break: break-word;
  @media (max-width: 600px) {
    font-size: 0.8rem;
  }
`;

const ResourcesSection = styled.section`
  margin-top: 1.5rem;
  background-color: white;
  border-radius: 0.75rem;
  border: 1px solid #E5E7EB;
  padding: 1.5rem;
  @media (max-width: 767px) {
    margin-top: 1rem;
    padding: 1rem;
  }
`;

const ResourcesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  @media (max-width: 1023px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const ResourceCard = styled.div`
  padding: 1rem;
  border: 1px solid #E5E7EB;
  border-radius: 0.5rem;
  cursor: pointer;
  &:hover {
    border-color: #3B82F6;
  }
  word-break: break-word;
  min-width: 0;
  @media (max-width: 600px) {
    padding: 0.75rem;
  }
`;

const ResourceHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
  flex-wrap: wrap;
  @media (max-width: 600px) {
    gap: 0.5rem;
    margin-bottom: 0.5rem;
  }
`;

const ResourceTitle = styled.span`
  font-weight: 500;
  color: #0F172A;
  word-break: break-word;
  font-size: 1rem;
  @media (max-width: 600px) {
    font-size: 0.95rem;
  }
`;

const ResourceDescription = styled.p`
  font-size: 0.875rem;
  color: rgba(15, 23, 42, 0.7);
  word-break: break-word;
  @media (max-width: 600px) {
    font-size: 0.8rem;
  }
`;

const ActionButtons = styled.div`
  margin-top: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 767px) {
    flex-direction: column;
    gap: 1rem;
    margin-top: 1rem;
    width: 100%;
  }
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: 1px solid #E5E7EB;
  border-radius: 0.5rem;
  &:hover {
    background-color: #F9FAFB;
  }
`;

const ScheduleButton = styled.button`
  background-color: #3B82F6;
  color: white;
  padding: 0.5rem 1.5rem;
  border-radius: 0.5rem;
  &:hover {
    background-color: rgba(59, 130, 246, 0.9);
  }
`;

// Button styles from RolesBlueprintTab
const PrimaryButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0 1rem;
  background-color: #3B82F6;
  color: white;
  border-radius: 0.5rem;
  border: none;
  font-size: 0.875rem;
  height: 2.5rem;
  box-sizing: border-box;
  cursor: pointer;
  transition: all 0.2s;
  justify-content: center;

  &:hover {
    background-color: #2563EB;
  }
`;

const SecondaryButton = styled.button`
  color: #3B82F6;
  background: none;
  border: none;
  padding: 0;
  font-size: 0.875rem;
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    color: rgba(59, 130, 246, 0.8);
  }
`;

// Add MainContent styled component from RolesBlueprintTab
const MainContent = styled.main`
  flex: 1;
  padding: 1.5rem;
  background-color: #F9FAFB;
  overflow-x: hidden;
  @media only screen and (max-width: 767px) {
    padding: 1rem;
  }
`;

const ReadinessScore: React.FC = () => {
  return (
    <MainContent>
      <ScoreSummary>
        <HeaderContainer>
          <TitleContainer>
            <Title>Your Readiness Score</Title>
            <Subtitle>Completed on March 15, 2025</Subtitle>
          </TitleContainer>
          <ScoreContainer>
            <Score>85</Score>
            <StatusBadge>Almost Ready</StatusBadge>
          </ScoreContainer>
        </HeaderContainer>
        
        <ProgressGrid>
          <ProgressItem>
            <ProgressHeader>
              <ProgressLabel>Process Readiness</ProgressLabel>
              <ProgressValue>90%</ProgressValue>
            </ProgressHeader>
            <ProgressBar>
              <ProgressFill $width={90} />
            </ProgressBar>
          </ProgressItem>
          <ProgressItem>
            <ProgressHeader>
              <ProgressLabel>Team Structure</ProgressLabel>
              <ProgressValue>75%</ProgressValue>
            </ProgressHeader>
            <ProgressBar>
              <ProgressFill $width={75} />
            </ProgressBar>
          </ProgressItem>
          <ProgressItem>
            <ProgressHeader>
              <ProgressLabel>Tool Implementation</ProgressLabel>
              <ProgressValue>85%</ProgressValue>
            </ProgressHeader>
            <ProgressBar>
              <ProgressFill $width={85} />
            </ProgressBar>
          </ProgressItem>
        </ProgressGrid>
      </ScoreSummary>

      <AnalysisGrid>
        <AnalysisSection>
          <SectionTitle>Analysis</SectionTitle>
          <AnalysisBox $type="strength">
            <BoxTitle>Strengths</BoxTitle>
            <List>
              <ListItem>
                <FaCheck color="#84CC16" />
                <span>Clear documentation process</span>
              </ListItem>
              <ListItem>
                <FaCheck color="#84CC16" />
                <span>Strong communication tools</span>
              </ListItem>
              <ListItem>
                <FaCheck color="#84CC16" />
                <span>Defined role requirements</span>
              </ListItem>
            </List>
          </AnalysisBox>
          <AnalysisBox $type="improvement">
            <BoxTitle>Areas for Improvement</BoxTitle>
            <List>
              <ListItem>
                <FaArrowTrendUp color="#3B82F6" />
                <span>Team training protocols</span>
              </ListItem>
              <ListItem>
                <FaArrowTrendUp color="#3B82F6" />
                <span>KPI tracking system</span>
              </ListItem>
            </List>
          </AnalysisBox>
        </AnalysisSection>

        <AnalysisSection>
          <ActionPlanHeader>
            <SectionTitle>Recommended Action Plan</SectionTitle>
            <SecondaryButton>
              <FaFilePdf />
              <span>Download PDF</span>
            </SecondaryButton>
          </ActionPlanHeader>
          <div>
            <ActionItem>
              <ActionNumber>1</ActionNumber>
              <ActionContent>
                <ActionTitle>Complete Team Structure Course</ActionTitle>
                <ActionDescription>Learn best practices for remote team organization</ActionDescription>
              </ActionContent>
            </ActionItem>
            <ActionItem>
              <ActionNumber>2</ActionNumber>
              <ActionContent>
                <ActionTitle>Set Up KPI Dashboard</ActionTitle>
                <ActionDescription>Implement recommended tracking metrics</ActionDescription>
              </ActionContent>
            </ActionItem>
            <ActionItem>
              <ActionNumber>3</ActionNumber>
              <ActionContent>
                <ActionTitle>Review Training Materials</ActionTitle>
                <ActionDescription>Access our resource library for templates</ActionDescription>
              </ActionContent>
            </ActionItem>
          </div>
        </AnalysisSection>
      </AnalysisGrid>

      <ResourcesSection>
        <SectionTitle>Recommended Resources</SectionTitle>
        <ResourcesGrid>
          <ResourceCard>
            <ResourceHeader>
              <FaGraduationCap color="#3B82F6" />
              <ResourceTitle>Team Structure Course</ResourceTitle>
            </ResourceHeader>
            <ResourceDescription>30-minute course on remote team organization</ResourceDescription>
          </ResourceCard>
          <ResourceCard>
            <ResourceHeader>
              <FaBook color="#3B82F6" />
              <ResourceTitle>KPI Setup Guide</ResourceTitle>
            </ResourceHeader>
            <ResourceDescription>Step-by-step guide to tracking metrics</ResourceDescription>
          </ResourceCard>
          <ResourceCard>
            <ResourceHeader>
              <FaFileLines color="#3B82F6" />
              <ResourceTitle>Training Templates</ResourceTitle>
            </ResourceHeader>
            <ResourceDescription>Ready-to-use training documents</ResourceDescription>
          </ResourceCard>
        </ResourcesGrid>
      </ResourcesSection>

      <ActionButtons>
        <PrimaryButton>
          Schedule Strategy Call
        </PrimaryButton>
      </ActionButtons>
    </MainContent>
  );
};

export default ReadinessScore; 