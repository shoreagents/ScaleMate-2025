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

  @media (max-width: 1236px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 1236px) {
    display: none;
  }
`;

const SearchWrapper = styled.div`
  position: relative;
  width: 16rem;

  @media (max-width: 1236px) {
    width: 100%;
  }
`;

const SearchInput = styled.input`
  padding: 0.5rem 1rem 0.5rem 2.5rem;
  border: 1px solid #E5E7EB;
  border-radius: 0.5rem;
  width: 100%;
  font-size: 0.875rem;
  height: 2.5rem;
  box-sizing: border-box;
  
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
  gap: 1rem;

  @media (max-width: 1236px) {
    display: none;
  }
`;

const FilterButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 2rem 0.5rem 1rem;
  border: 1px solid #E5E7EB;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  color: #0F172A;
  background-color: white;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 1em;
  height: 2.5rem;
  box-sizing: border-box;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #F9FAFB;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.75rem;

  @media (max-width: 1236px) {
    display: none;
  }
`;

const PreviewButton = styled.button`
  padding: 0.5rem 1rem;
  border: 1px solid #E5E7EB;
  color: #0F172A;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  height: 2.5rem;
  box-sizing: border-box;
  background-color: white;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #F9FAFB;
  }

  @media (max-width: 1236px) {
    width: 100%;
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
  height: 2.5rem;
  box-sizing: border-box;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #2563EB;
  }

  @media (max-width: 1236px) {
    display: none;
  }
`;

const FloatingAddButton = styled.button`
  display: none;
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 3.5rem;
  height: 3.5rem;
  background-color: #3B82F6;
  color: white;
  border: none;
  border-radius: 50%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 1000;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s, transform 0.2s;

  &:hover {
    background-color: #2563EB;
    transform: scale(1.05);
  }

  @media (max-width: 1236px) {
    display: flex;
  }
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1.5rem;

  @media (max-width: 1366px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto;
  }
`;

const QuestionsTable = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  border: 1px solid #E5E7EB;
  overflow: hidden;

  @media (max-width: 1024px) {
    display: none;
  }
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

// Add a new wrapper for mobile layout
const MobileActionsGrid = styled.div`
  display: none;

  @media (max-width: 1236px) {
    display: grid;
    width: 100%;
    gap: 1rem;
    grid-template-rows: repeat(2, 1fr);
  }
`;

const MobileRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

const CardListContainer = styled.div`
  display: none;

  @media (max-width: 1024px) {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }
`;

const QuestionCard = styled.div`
  background: white;
  border-radius: 0.5rem;
  border: 1px solid #E5E7EB;
  padding: 1.25rem 1rem;
  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.03);
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CardQuestionText = styled.div`
  color: #0F172A;
  font-weight: 500;
`;

const CardMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const CardMetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const CardLabel = styled.span`
  color: #64748B;
  font-size: 0.875rem;
  min-width: 70px;
`;

const CardBadge = styled.span<{ $color: string; $bg: string }>`
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  background-color: ${props => props.$bg};
  color: ${props => props.$color};
  font-size: 0.875rem;
`;

const CardStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const CardActions = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
  justify-content: center;
`;

const QuizManagerTab: React.FC = () => {
  return (
    <Container>
      <ActionsBar>
        {/* Desktop layout (≥1237px) - unchanged */}
        <SearchContainer>
          <SearchWrapper>
            <SearchInput type="text" placeholder="Search questions..." />
            <SearchIcon icon={faSearch} />
          </SearchWrapper>
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
        {/* Mobile layout (≤1236px) - two rows, equal width */}
        <MobileActionsGrid>
          <MobileRow>
            <SearchWrapper>
              <SearchInput type="text" placeholder="Search questions..." />
              <SearchIcon icon={faSearch} />
            </SearchWrapper>
            <FilterButton>All Categories</FilterButton>
          </MobileRow>
          <MobileRow>
            <FilterButton>Active Only</FilterButton>
            <PreviewButton>
              <FontAwesomeIcon icon={faEye} />
              Preview Quiz
            </PreviewButton>
          </MobileRow>
        </MobileActionsGrid>
      </ActionsBar>

      <ContentGrid>
        <>
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
          {/* Card view for mobile/tablet */}
          <CardListContainer>
            <QuestionCard>
              <CardHeader>
                <CardQuestionText>How many years of management experience do you have?</CardQuestionText>
              </CardHeader>
              <CardMeta>
                <CardMetaRow>
                  <CardLabel>Type:</CardLabel>
                  <CardBadge $color="#3B82F6" $bg="rgba(59,130,246,0.1)">Slider</CardBadge>
                </CardMetaRow>
                <CardMetaRow>
                  <CardLabel>Category:</CardLabel>
                  <CardBadge $color="#00E915" $bg="rgba(0,233,21,0.1)">Experience</CardBadge>
                </CardMetaRow>
                <CardMetaRow>
                  <CardLabel>Status:</CardLabel>
                  <CardStatus>
                    <StatusDot />
                    Active
                  </CardStatus>
                </CardMetaRow>
              </CardMeta>
              <CardActions>
                <ActionButton>
                  <FontAwesomeIcon icon={faPen} />
                </ActionButton>
                <ActionButton>
                  <FontAwesomeIcon icon={faArrowsUpDown} />
                </ActionButton>
                <ActionButton $color="#EC297B">
                  <FontAwesomeIcon icon={faArchive} />
                </ActionButton>
              </CardActions>
            </QuestionCard>
          </CardListContainer>
        </>
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

      <FloatingAddButton>
        <FontAwesomeIcon icon={faPlus} />
      </FloatingAddButton>
    </Container>
  );
};

export default QuizManagerTab; 