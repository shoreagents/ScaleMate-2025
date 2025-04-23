import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faRobot, 
  faComments, 
  faTasks, 
  faSearch,
  faBookmark as faBookmarkSolid,
  faBookmark as faBookmarkRegular
} from '@fortawesome/free-solid-svg-icons';

const MainContent = styled.main`
  flex: 1;
  padding: 1.5rem;
  background-color: #F9FAFB;
`;

const FiltersContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
`;

const FilterButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const FilterButton = styled.button<{ $active?: boolean }>`
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  
  ${props => props.$active ? `
    background-color: #0098FF;
    color: white;
    border: none;
  ` : `
    background-color: white;
    color: #0F172A;
    border: 1px solid #E5E7EB;
    
    &:hover {
      background-color: #F9FAFB;
    }
  `}
`;

const SearchContainer = styled.div`
  position: relative;
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

const ToolsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
`;

const ToolCard = styled.div`
  background-color: white;
  border-radius: 0.75rem;
  border: 1px solid #E5E7EB;
  overflow: hidden;
`;

const CardContent = styled.div`
  padding: 1.5rem;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

const ToolInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ToolIcon = styled(FontAwesomeIcon)`
  font-size: 1.5rem;
  color: #0098FF;
`;

const ToolTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #0F172A;
`;

const BookmarkButton = styled.button<{ $saved?: boolean }>`
  color: ${props => props.$saved ? '#00E915' : '#3B82F6'};
  font-size: 1.25rem;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  
  &:hover {
    opacity: 0.8;
  }
`;

const ToolDescription = styled.p`
  font-size: 0.875rem;
  color: rgba(15, 23, 42, 0.7);
  margin-bottom: 1rem;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const Tag = styled.span`
  font-size: 0.75rem;
  background-color: rgba(0, 152, 255, 0.1);
  color: #0098FF;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
`;

const LearnMoreButton = styled.button`
  width: 100%;
  padding: 0.5rem 0;
  background-color: #3B82F6;
  color: white;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  border: none;
  
  &:hover {
    background-color: rgba(59, 130, 246, 0.9);
  }
`;

const AIToolLibraryTab: React.FC = () => {
  return (
    <MainContent>
      <FiltersContainer>
        <FilterButtons>
          <FilterButton $active>All Tools</FilterButton>
          <FilterButton>My Saved Tools</FilterButton>
          <FilterButton>Productivity</FilterButton>
          <FilterButton>Communication</FilterButton>
          <FilterButton>Project Management</FilterButton>
        </FilterButtons>
        <SearchContainer>
          <SearchInput type="text" placeholder="Search tools..." />
          <SearchIcon icon={faSearch} />
        </SearchContainer>
      </FiltersContainer>

      <ToolsGrid>
        {/* Tool Card 1 */}
        <ToolCard>
          <CardContent>
            <CardHeader>
              <ToolInfo>
                <ToolIcon icon={faRobot} />
                <ToolTitle>AI Assistant Pro</ToolTitle>
              </ToolInfo>
              <BookmarkButton>
                <FontAwesomeIcon icon={faBookmarkRegular} />
              </BookmarkButton>
            </CardHeader>
            <ToolDescription>
              Advanced AI assistant for team management and task automation.
            </ToolDescription>
            <TagsContainer>
              <Tag>Productivity</Tag>
              <Tag>Automation</Tag>
            </TagsContainer>
            <LearnMoreButton>Learn More</LearnMoreButton>
          </CardContent>
        </ToolCard>

        {/* Tool Card 2 */}
        <ToolCard>
          <CardContent>
            <CardHeader>
              <ToolInfo>
                <ToolIcon icon={faComments} />
                <ToolTitle>Team Chat AI</ToolTitle>
              </ToolInfo>
              <BookmarkButton $saved>
                <FontAwesomeIcon icon={faBookmarkSolid} />
              </BookmarkButton>
            </CardHeader>
            <ToolDescription>
              Smart communication platform with built-in translation and scheduling.
            </ToolDescription>
            <TagsContainer>
              <Tag>Communication</Tag>
              <Tag>Teams</Tag>
            </TagsContainer>
            <LearnMoreButton>Learn More</LearnMoreButton>
          </CardContent>
        </ToolCard>

        {/* Tool Card 3 */}
        <ToolCard>
          <CardContent>
            <CardHeader>
              <ToolInfo>
                <ToolIcon icon={faTasks} />
                <ToolTitle>Project AI Manager</ToolTitle>
              </ToolInfo>
              <BookmarkButton>
                <FontAwesomeIcon icon={faBookmarkRegular} />
              </BookmarkButton>
            </CardHeader>
            <ToolDescription>
              AI-powered project management with smart task distribution.
            </ToolDescription>
            <TagsContainer>
              <Tag>Project Management</Tag>
              <Tag>Planning</Tag>
            </TagsContainer>
            <LearnMoreButton>Learn More</LearnMoreButton>
          </CardContent>
        </ToolCard>
      </ToolsGrid>
    </MainContent>
  );
};

export default AIToolLibraryTab; 