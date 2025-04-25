import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faSearch, 
  faPlus, 
  faPen, 
  faEye, 
  faArrowsUpDown,
  faArchive,
  faCloudUpload,
  faTimes
} from '@fortawesome/free-solid-svg-icons';

const Container = styled.div`
  padding: 1.5rem;
`;

const ActionsBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const SearchInput = styled.input`
  padding: 0.5rem 1rem 0.5rem 2.5rem;
  border: 1px solid #E5E7EB;
  border-radius: 0.5rem;
  width: 16rem;
  font-size: 0.875rem;
  
  &::placeholder {
    color: rgba(15, 23, 42, 0.4);
  }
`;

const SearchIcon = styled(FontAwesomeIcon)`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(15, 23, 42, 0.4);
`;

const FilterButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const FilterButton = styled.button`
  padding: 0.375rem 0.75rem;
  border: 1px solid #E5E7EB;
  border-radius: 0.5rem;
  color: rgba(15, 23, 42, 0.7);
  font-size: 0.875rem;
  
  &:hover {
    background-color: #F9FAFB;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.75rem;
`;

const PreviewButton = styled.button`
  padding: 0.5rem 1rem;
  border: 1px solid #E5E7EB;
  color: #3B82F6;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  
  &:hover {
    background-color: #F9FAFB;
  }
`;

const AddQuestionButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #3B82F6;
  color: white;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  border: none;
  
  &:hover {
    background-color: #2563EB;
  }
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1.5rem;
`;

const QuestionsTable = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  border: 1px solid #E5E7EB;
  overflow: hidden;
`;

const Table = styled.table`
  width: 100%;
`;

const TableHead = styled.thead`
  background-color: #F9FAFB;
  border-bottom: 1px solid #E5E7EB;
`;

const TableHeader = styled.th`
  padding: 1rem 1.5rem;
  text-align: left;
  font-size: 0.875rem;
  font-weight: 500;
  color: #0F172A;
`;

const TableBody = styled.tbody`
  & > tr {
    border-bottom: 1px solid #E5E7EB;
    
    &:hover {
      background-color: #F9FAFB;
    }
    
    &:last-child {
      border-bottom: none;
    }
  }
`;

const TableCell = styled.td`
  padding: 1rem 1.5rem;
`;

const QuestionText = styled.div`
  color: #0F172A;
`;

const TypeBadge = styled.span`
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  background-color: rgba(59, 130, 246, 0.1);
  color: #3B82F6;
  font-size: 0.875rem;
`;

const CategoryBadge = styled.span`
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  background-color: rgba(0, 233, 21, 0.1);
  color: #00E915;
  font-size: 0.875rem;
`;

const StatusIndicator = styled.div`
  display: flex;
  align-items: center;
`;

const StatusDot = styled.span`
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 9999px;
  background-color: #00E915;
  margin-right: 0.5rem;
`;

const TableActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ActionButton = styled.button<{ $color?: string }>`
  padding: 0.5rem;
  color: rgba(15, 23, 42, 0.7);
  border-radius: 0.25rem;
  transition: all 0.2s;
  background: none;
  border: none;

  &:hover {
    color: ${props => props.$color || '#0F172A'};
  }
`;

const ScoringPanel = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  border: 1px solid #E5E7EB;
  padding: 1.5rem;
`;

const PanelTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 500;
  color: #0F172A;
  margin-bottom: 1rem;
`;

const Section = styled.div`
  margin-bottom: 1.5rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h4`
  font-size: 0.875rem;
  font-weight: 500;
  color: #0F172A;
  margin-bottom: 0.75rem;
`;

const TierList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const TierItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const TierLabel = styled.span`
  font-size: 0.875rem;
  color: #0F172A;
`;

const TierValue = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
  color: #00E915;
`;

const Divider = styled.div`
  border-top: 1px solid #E5E7EB;
  margin: 1.5rem 0;
`;

const RangeList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const RangeItem = styled.div``;

const RangeHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

const RangeLabel = styled.span`
  font-size: 0.875rem;
  color: #0F172A;
`;

const RangeValue = styled.span`
  font-size: 0.875rem;
  color: rgba(15, 23, 42, 0.7);
`;

const ProgressBar = styled.div<{ $color: string }>`
  height: 0.5rem;
  background-color: ${props => `${props.$color}/20`};
  border-radius: 9999px;
  overflow: hidden;
`;

const ProgressFill = styled.div<{ $color: string; $width: string }>`
  height: 100%;
  background-color: ${props => props.$color};
  border-radius: 9999px;
  width: ${props => props.$width};
`;

const QuizManagerTab: React.FC = () => {
  return (
    <Container>
      <ActionsBar>
        <SearchContainer>
          <div style={{ position: 'relative' }}>
            <SearchInput type="text" placeholder="Search questions..." />
            <SearchIcon icon={faSearch} />
          </div>
          <FilterButtons>
            <FilterButton>All Categories</FilterButton>
            <FilterButton>Active Only</FilterButton>
          </FilterButtons>
        </SearchContainer>
        <ActionButtons>
          <PreviewButton>
            <FontAwesomeIcon icon={faEye} />
            Preview Quiz
          </PreviewButton>
          <AddQuestionButton>
            <FontAwesomeIcon icon={faPlus} />
            Add Question
          </AddQuestionButton>
        </ActionButtons>
      </ActionsBar>

      <ContentGrid>
        <QuestionsTable>
          <Table>
            <TableHead>
              <tr>
                <TableHeader>Question</TableHeader>
                <TableHeader>Type</TableHeader>
                <TableHeader>Category</TableHeader>
                <TableHeader>Status</TableHeader>
                <TableHeader>Actions</TableHeader>
              </tr>
            </TableHead>
            <TableBody>
              <tr>
                <TableCell>
                  <QuestionText>How many years of management experience do you have?</QuestionText>
                </TableCell>
                <TableCell>
                  <TypeBadge>Slider</TypeBadge>
                </TableCell>
                <TableCell>
                  <CategoryBadge>Experience</CategoryBadge>
                </TableCell>
                <TableCell>
                  <StatusIndicator>
                    <StatusDot />
                    Active
                  </StatusIndicator>
                </TableCell>
                <TableCell>
                  <TableActionButtons>
                    <ActionButton>
                      <FontAwesomeIcon icon={faPen} />
                    </ActionButton>
                    <ActionButton>
                      <FontAwesomeIcon icon={faArrowsUpDown} />
                    </ActionButton>
                    <ActionButton $color="#EC297B">
                      <FontAwesomeIcon icon={faArchive} />
                    </ActionButton>
                  </TableActionButtons>
                </TableCell>
              </tr>
            </TableBody>
          </Table>
        </QuestionsTable>

        <ScoringPanel>
          <PanelTitle>Scoring Logic</PanelTitle>
          
          <Section>
            <SectionTitle>Experience Tiers</SectionTitle>
            <TierList>
              <TierItem>
                <TierLabel>Junior (0-2 years)</TierLabel>
                <TierValue>+10 XP</TierValue>
              </TierItem>
              <TierItem>
                <TierLabel>Mid-Level (3-5 years)</TierLabel>
                <TierValue>+20 XP</TierValue>
              </TierItem>
              <TierItem>
                <TierLabel>Senior (6+ years)</TierLabel>
                <TierValue>+30 XP</TierValue>
              </TierItem>
            </TierList>
          </Section>

          <Divider />

          <Section>
            <SectionTitle>Outcome Ranges</SectionTitle>
            <RangeList>
              <RangeItem>
                <RangeHeader>
                  <RangeLabel>Ready to Lead</RangeLabel>
                  <RangeValue>80-100 points</RangeValue>
                </RangeHeader>
                <ProgressBar $color="#00E915">
                  <ProgressFill $color="#00E915" $width="100%" />
                </ProgressBar>
              </RangeItem>
              <RangeItem>
                <RangeHeader>
                  <RangeLabel>Almost There</RangeLabel>
                  <RangeValue>50-79 points</RangeValue>
                </RangeHeader>
                <ProgressBar $color="#3B82F6">
                  <ProgressFill $color="#3B82F6" $width="75%" />
                </ProgressBar>
              </RangeItem>
              <RangeItem>
                <RangeHeader>
                  <RangeLabel>Need Training</RangeLabel>
                  <RangeValue>0-49 points</RangeValue>
                </RangeHeader>
                <ProgressBar $color="#EC297B">
                  <ProgressFill $color="#EC297B" $width="45%" />
                </ProgressBar>
              </RangeItem>
            </RangeList>
          </Section>
        </ScoringPanel>
      </ContentGrid>
    </Container>
  );
};

export default QuizManagerTab; 