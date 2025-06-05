import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faDownload, faStar as faStarSolid, faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import { ModalOverlay, ModalContent, ModalSecondaryButton, ModalPrimaryButton } from '../ui/Modal';

const Container = styled.div`
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

const FilterSelect = styled.select`
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
  width: auto;

  @media (max-width: 1002px) {
    width: 100%;
  }

  &:focus {
    outline: none;
    border-color: #3B82F6;
  }
`;

const SortSelect = styled.select`
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
  width: auto;

  @media (max-width: 1002px) {
    width: 100%;
  }

  &:focus {
    outline: none;
    border-color: #3B82F6;
  }
`;

const ResourceGrid = styled.div`
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

const ResourceCard = styled.div`
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
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const TagContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const Tag = styled.span<{ $type: 'guide' | 'template' | 'checklist' | 'downloaded' }>`
  font-size: 0.75rem;
  font-weight: 500;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  white-space: nowrap;
  
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
  flex-shrink: 0;
`;

const Stars = styled.div`
  display: flex;
  color: #FBBF24;
  gap: 0.25rem;
`;

const RatingCount = styled.span`
  margin-left: 0.5rem;
  font-size: 0.875rem;
  color: rgba(15, 23, 42, 0.7);
  white-space: nowrap;
`;

const ResourceTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #0F172A;
  margin-bottom: 0.5rem;
  word-break: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ResourceDescription = styled.p`
  font-size: 0.875rem;
  color: rgba(15, 23, 42, 0.7);
  margin-bottom: 1rem;
  word-break: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const ResourceMeta = styled.span`
  font-size: 0.875rem;
  color: rgba(15, 23, 42, 0.6);
  white-space: nowrap;
`;

const DownloadButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #3B82F6;
  background: none;
  border: none;
  padding: 0.5rem;
  font-size: 0.875rem;
  cursor: pointer;
  transition: color 0.2s;
  white-space: nowrap;

  &:hover {
    color: rgba(59, 130, 246, 0.8);
  }
`;

const DownloadModalOverlay = styled(ModalOverlay)``;
const DownloadModalContent = styled(ModalContent)`
  max-width: 28rem;
  text-align: center;
`;

const DownloadModalHeader = styled.div`
  margin-bottom: 1.5rem;
`;

const DownloadIconContainer = styled.div`
  width: 4rem;
  height: 4rem;
  background-color: rgba(59, 130, 246, 0.1);
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
`;

const DownloadIcon = styled.div`
  color: #3B82F6;
  font-size: 1.5rem;
`;

const DownloadModalTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: #0F172A;
  margin-bottom: 0.5rem;
`;

const DownloadModalDescription = styled.p`
  color: rgba(15, 23, 42, 0.7);
  margin-bottom: 1rem;
`;

const DownloadInfoContainer = styled.div`
  background-color: #F9FAFB;
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 1.5rem;
`;

const DownloadInfoContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const DownloadInfoLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const DownloadFileName = styled.p`
  font-weight: 500;
  color: #0F172A;
  text-align: left;
`;

const DownloadFileType = styled.p`
  font-size: 0.875rem;
  color: rgba(15, 23, 42, 0.6);
  text-align: left;
`;

const PremiumTag = styled.span<{ $show: boolean }>`
  display: ${props => props.$show ? 'inline-block' : 'none'};
  font-size: 0.75rem;
  font-weight: 500;
  background-color: rgba(236, 41, 123, 0.1);
  color: #EC297B;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
`;

const DownloadButtonGroup = styled.div`
  display: flex;
  gap: 0.75rem;
`;

const DownloadCancelButton = styled(ModalSecondaryButton)`
  flex: 1;
`;

const DownloadConfirmButton = styled(ModalPrimaryButton)`
  flex: 1;
`;

const ResourceLibraryTab: React.FC = () => {
  const [isDownloadModalOpen, setIsDownloadModalOpen] = React.useState(false);
  const [selectedResource, setSelectedResource] = React.useState<{
    name: string;
    type: string;
    isPremium: boolean;
  } | null>(null);

  const handleDownload = (resource: { name: string; type: string; isPremium: boolean }) => {
    setSelectedResource(resource);
    setIsDownloadModalOpen(true);
  };

  const handleOverlayClick = React.useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setIsDownloadModalOpen(false);
    }
  }, []);

  const handleModalContentClick = React.useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  }, []);

  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isDownloadModalOpen) setIsDownloadModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isDownloadModalOpen]);

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
          <FilterSortGroup>
            <FilterSelect>
              <option>All Resources</option>
              <option>Guides</option>
              <option>Templates</option>
              <option>Checklists</option>
            </FilterSelect>
            <SortSelect>
              <option>Most Popular</option>
              <option>Recently Added</option>
              <option>Most Downloaded</option>
            </SortSelect>
          </FilterSortGroup>
        </SearchFilterGroup>
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
              <DownloadButton onClick={() => handleDownload({
                name: "Offshore Team Management Guide",
                type: "PDF Document",
                isPremium: false
              })}>
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
              <DownloadButton onClick={() => handleDownload({
                name: "Role Transition Checklist",
                type: "PDF Document",
                isPremium: false
              })}>
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
              <DownloadButton onClick={() => handleDownload({
                name: "Communication Guidelines",
                type: "PDF Document",
                isPremium: false
              })}>
                <FontAwesomeIcon icon={faDownload} />
                <span>Download</span>
              </DownloadButton>
            </CardFooter>
          </CardContent>
        </ResourceCard>
      </ResourceGrid>

      <DownloadModalOverlay 
        $isOpen={isDownloadModalOpen} 
        onClick={handleOverlayClick}
      >
        <DownloadModalContent onClick={handleModalContentClick}>
          <DownloadModalHeader>
            <DownloadIconContainer>
              <DownloadIcon>
                <FontAwesomeIcon icon={faFilePdf} />
              </DownloadIcon>
            </DownloadIconContainer>
            <DownloadModalTitle>Download Resource</DownloadModalTitle>
            <DownloadModalDescription>
              Ready to download your selected resource?
            </DownloadModalDescription>
          </DownloadModalHeader>

          <DownloadInfoContainer>
            <DownloadInfoContent>
              <DownloadInfoLeft>
                <FontAwesomeIcon icon={faFilePdf} style={{ color: '#3B82F6' }} />
                <div>
                  <DownloadFileName>{selectedResource?.name}</DownloadFileName>
                  <DownloadFileType>{selectedResource?.type}</DownloadFileType>
                </div>
              </DownloadInfoLeft>
              <PremiumTag $show={selectedResource?.isPremium || false}>
                Premium Resource
              </PremiumTag>
            </DownloadInfoContent>
          </DownloadInfoContainer>

          <DownloadButtonGroup>
            <DownloadCancelButton onClick={() => setIsDownloadModalOpen(false)}>
              Cancel
            </DownloadCancelButton>
            <DownloadConfirmButton onClick={() => {
              // Add download logic here
              setIsDownloadModalOpen(false);
            }}>
              Download
            </DownloadConfirmButton>
          </DownloadButtonGroup>
        </DownloadModalContent>
      </DownloadModalOverlay>
    </Container>
  );
};

export default ResourceLibraryTab; 