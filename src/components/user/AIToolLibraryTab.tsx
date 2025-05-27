import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faRobot, 
  faComments, 
  faTasks, 
  faSearch,
  faBookmark as faBookmarkSolid,
  faBookmark as faBookmarkRegular,
  faChevronDown
} from '@fortawesome/free-solid-svg-icons';

const MainContent = styled.main`
  flex: 1;
  padding: 1.5rem;
  background-color: #F9FAFB;
  
  @media only screen and (max-width: 767px) {
    padding: 1rem;
  }
`;

const FiltersContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;

  @media (max-width: 1002px) {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
  }
`;

const SearchFilterGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 1002px) {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
  }
`;

const FilterSortGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 1002px) {
    width: 100%;
  }
`;

const FilterDropdown = styled.div`
  position: relative;
  min-width: 200px;

  @media (max-width: 1002px) {
    width: 100%;
  }
`;

const DropdownButton = styled.select`
  width: 100%;
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

  &:focus {
    outline: none;
    border-color: #3B82F6;
  }
`;

const SearchContainer = styled.div`
  position: relative;
  width: 16rem;

  @media (max-width: 1002px) {
    width: 100%;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.5rem 1rem 0.5rem 2.5rem;
  border: 1px solid #E5E7EB;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  height: 2.5rem;
  box-sizing: border-box;
  
  &::placeholder {
    color: rgba(15, 23, 42, 0.4);
  }

  &:focus {
    outline: none;
    border-color: #3B82F6;
  }
`;

const SearchIcon = styled.span`
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

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const ToolCard = styled.div`
  background-color: white;
  border-radius: 0.75rem;
  border: 1px solid #E5E7EB;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }
`;

const CardContent = styled.div`
  padding: 1.5rem;
  
  @media only screen and (max-width: 767px) {
    padding: 1rem;
  }
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
  padding: 0.75rem 0;
  background-color: #3B82F6;
  color: white;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  border: none;
  transition: all 0.2s;
  cursor: pointer;
  
  &:hover {
    background-color: rgba(59, 130, 246, 0.9);
  }
`;

const AIToolLibraryTab: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState('All Tools');

  const filterOptions = [
    'All Tools',
    'My Saved Tools',
    'Productivity',
    'Communication',
    'Project Management'
  ];

  const handleFilterSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFilter(event.target.value);
  };

  return (
    <MainContent>
      <FiltersContainer>
        <SearchFilterGroup>
          <SearchContainer>
            <SearchInput type="text" placeholder="Search tools..." />
            <SearchIcon>
              <FontAwesomeIcon icon={faSearch} />
            </SearchIcon>
          </SearchContainer>
        </SearchFilterGroup>
        <FilterSortGroup>
          <FilterDropdown>
            <DropdownButton value={selectedFilter} onChange={handleFilterSelect}>
              {filterOptions.map((filter) => (
                <option key={filter} value={filter}>
                  {filter}
                </option>
              ))}
            </DropdownButton>
          </FilterDropdown>
        </FilterSortGroup>
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