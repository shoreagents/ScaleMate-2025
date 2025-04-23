import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faDownload, faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';

const Container = styled.div`
  padding: 1.5rem;
`;

const FiltersContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const SearchFilterGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const SearchContainer = styled.div`
  position: relative;
`;

const SearchInput = styled.input`
  padding: 0.5rem 2.5rem 0.5rem 2.5rem;
  border: 1px solid #E5E7EB;
  border-radius: 0.5rem;
  width: 200px;

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

const FilterButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const FilterButton = styled.button<{ $active?: boolean }>`
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  ${props => props.$active ? `
    background-color: #0098FF;
    color: white;
    border: none;
  ` : `
    background-color: transparent;
    color: rgba(15, 23, 42, 0.7);
    border: 1px solid #E5E7EB;
    
    &:hover {
      background-color: #F9FAFB;
    }
  `}
`;

const SortSelect = styled.select`
  padding: 0.5rem 1rem;
  border: 1px solid #E5E7EB;
  border-radius: 0.5rem;

  &:focus {
    outline: none;
    border-color: #3B82F6;
  }
`;

const ResourceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
`;

const ResourceCard = styled.div`
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

const TagContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const Tag = styled.span<{ $type: 'guide' | 'template' | 'checklist' | 'downloaded' }>`
  font-size: 0.75rem;
  font-weight: 500;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  
  ${props => {
    switch (props.$type) {
      case 'guide':
        return 'background-color: #DBEAFE; color: #3B82F6;';
      case 'template':
        return 'background-color: #F3E8FF; color: #9333EA;';
      case 'checklist':
        return 'background-color: #FFEDD5; color: #EA580C;';
      case 'downloaded':
        return 'background-color: #DCFCE7; color: #16A34A;';
    }
  }}
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Stars = styled.div`
  display: flex;
  color: #FBBF24;
`;

const RatingCount = styled.span`
  margin-left: 0.5rem;
  font-size: 0.875rem;
  color: rgba(15, 23, 42, 0.7);
`;

const ResourceTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #0F172A;
  margin-bottom: 0.5rem;
`;

const ResourceDescription = styled.p`
  font-size: 0.875rem;
  color: rgba(15, 23, 42, 0.7);
  margin-bottom: 1rem;
`;

const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ResourceMeta = styled.span`
  font-size: 0.875rem;
  color: rgba(15, 23, 42, 0.6);
`;

const DownloadButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #3B82F6;
  background: none;
  border: none;
  padding: 0;

  &:hover {
    color: rgba(59, 130, 246, 0.8);
  }
`;

const ResourceLibraryTab: React.FC = () => {
  return (
    <Container>
      <FiltersContainer id="resource-filters">
        <SearchFilterGroup>
          <SearchContainer>
            <SearchInput type="text" placeholder="Search resources..." />
            <SearchIcon>
              <FontAwesomeIcon icon={faSearch} />
            </SearchIcon>
          </SearchContainer>
          <FilterButtons>
            <FilterButton $active>All Resources</FilterButton>
            <FilterButton>Guides</FilterButton>
            <FilterButton>Templates</FilterButton>
            <FilterButton>Checklists</FilterButton>
          </FilterButtons>
        </SearchFilterGroup>
        <SortSelect>
          <option>Most Popular</option>
          <option>Recently Added</option>
          <option>Most Downloaded</option>
        </SortSelect>
      </FiltersContainer>

      <ResourceGrid id="resource-grid">
        {/* Resource Card 1 */}
        <ResourceCard>
          <CardContent>
            <CardHeader>
              <TagContainer>
                <Tag $type="guide">Guide</Tag>
                <Tag $type="downloaded">Downloaded</Tag>
              </TagContainer>
              <RatingContainer>
                <Stars>
                  {[...Array(4)].map((_, i) => (
                    <FontAwesomeIcon key={i} icon={faStarSolid} />
                  ))}
                  <FontAwesomeIcon icon={faStarRegular} />
                </Stars>
                <RatingCount>(24)</RatingCount>
              </RatingContainer>
            </CardHeader>
            <ResourceTitle>Offshore Team Management Guide</ResourceTitle>
            <ResourceDescription>Complete playbook for managing distributed teams effectively.</ResourceDescription>
            <CardFooter>
              <ResourceMeta>12 pages • PDF</ResourceMeta>
              <DownloadButton>
                <FontAwesomeIcon icon={faDownload} />
                <span>Download</span>
              </DownloadButton>
            </CardFooter>
          </CardContent>
        </ResourceCard>

        {/* Resource Card 2 */}
        <ResourceCard>
          <CardContent>
            <CardHeader>
              <TagContainer>
                <Tag $type="template">Template</Tag>
              </TagContainer>
              <RatingContainer>
                <Stars>
                  {[...Array(5)].map((_, i) => (
                    <FontAwesomeIcon key={i} icon={faStarSolid} />
                  ))}
                </Stars>
                <RatingCount>(31)</RatingCount>
              </RatingContainer>
            </CardHeader>
            <ResourceTitle>Role Transition Checklist</ResourceTitle>
            <ResourceDescription>Step-by-step process for seamless role handovers.</ResourceDescription>
            <CardFooter>
              <ResourceMeta>5 pages • PDF</ResourceMeta>
              <DownloadButton>
                <FontAwesomeIcon icon={faDownload} />
                <span>Download</span>
              </DownloadButton>
            </CardFooter>
          </CardContent>
        </ResourceCard>

        {/* Resource Card 3 */}
        <ResourceCard>
          <CardContent>
            <CardHeader>
              <TagContainer>
                <Tag $type="checklist">Checklist</Tag>
                <Tag $type="downloaded">Downloaded</Tag>
              </TagContainer>
              <RatingContainer>
                <Stars>
                  {[...Array(4)].map((_, i) => (
                    <FontAwesomeIcon key={i} icon={faStarSolid} />
                  ))}
                  <FontAwesomeIcon icon={faStarRegular} />
                </Stars>
                <RatingCount>(18)</RatingCount>
              </RatingContainer>
            </CardHeader>
            <ResourceTitle>Communication Guidelines</ResourceTitle>
            <ResourceDescription>Best practices for effective remote team communication.</ResourceDescription>
            <CardFooter>
              <ResourceMeta>8 pages • PDF</ResourceMeta>
              <DownloadButton>
                <FontAwesomeIcon icon={faDownload} />
                <span>Download</span>
              </DownloadButton>
            </CardFooter>
          </CardContent>
        </ResourceCard>
      </ResourceGrid>
    </Container>
  );
};

export default ResourceLibraryTab; 