import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faSearch, 
  faPlus, 
  faPen, 
  faCopy, 
  faTrash,
  faCube,
  faClock,
  faCloudUpload,
  faTimes
} from '@fortawesome/free-solid-svg-icons';

const Container = styled.div`
  padding: 1.5rem;
  background-color: #F9FAFB;
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

  @media (max-width: 1054px) {
    display: none;
  }
`;

const SearchInput = styled.input`
  padding: 0.5rem 1rem 0.5rem 2.5rem;
  border: 1px solid #E5E7EB;
  border-radius: 0.5rem;
  width: 16rem;
  font-size: 0.875rem;
  background-color: white;
  height: 2.5rem;
  box-sizing: border-box;
  
  &::placeholder {
    color: rgba(15, 23, 42, 0.4);
  }

  @media (max-width: 1054px) {
    width: 100%;
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

  @media (max-width: 1054px) {
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

  @media (max-width: 1054px) {
    display: flex;
  }
`;

const ResponsiveFilters = styled.div`
  display: none;

  @media (max-width: 1054px) {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    margin-bottom: 1.5rem;
  }
`;

const ResponsiveFilterRow = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;
`;

const ResponsiveFilterButton = styled(FilterButton)`
  width: 100%;
`;

const ResponsiveSearchWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const NewBlockButton = styled.button`
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

  @media (max-width: 1054px) {
    display: none;
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

const BlocksTable = styled.div`
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

const BlockInfo = styled.div`
  display: flex;
  align-items: center;
`;

const BlockIcon = styled(FontAwesomeIcon)`
  color: #3B82F6;
  margin-right: 0.75rem;
`;

const BlockName = styled.span`
  color: #0F172A;
`;

const UseCaseBadge = styled.span`
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  background-color: rgba(59, 130, 246, 0.1);
  color: #3B82F6;
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

const LastUpdated = styled.span`
  font-size: 0.875rem;
  color: rgba(15, 23, 42, 0.7);
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

const UsageLogPanel = styled.div`
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

const UsageList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const UsageItem = styled.div`
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: #F9FAFB;
  border: 1px solid #E5E7EB;
`;

const UsageHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

const UsagePath = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
  color: #0F172A;
`;

const UsageSection = styled.span`
  font-size: 0.75rem;
  color: rgba(15, 23, 42, 0.7);
`;

const UsageTime = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  color: rgba(15, 23, 42, 0.7);
`;

const UsageIcon = styled(FontAwesomeIcon)`
  margin-right: 0.5rem;
`;

const Divider = styled.div`
  border-top: 1px solid #E5E7EB;
  margin: 1rem 0;
  padding-top: 1rem;
`;

const PerformanceSection = styled.div``;

const PerformanceTitle = styled.h4`
  font-size: 0.875rem;
  font-weight: 500;
  color: #0F172A;
  margin-bottom: 0.75rem;
`;

const PerformanceList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const PerformanceItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.875rem;
`;

const PerformanceLabel = styled.span`
  color: rgba(15, 23, 42, 0.7);
`;

const PerformanceValue = styled.span`
  color: #0F172A;
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

const BlockCard = styled.div`
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
  gap: 0.75rem;
`;

const CardBlockName = styled.span`
  color: #0F172A;
  font-weight: 500;
`;

const CardMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const CardMetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const CardLabel = styled.span`
  color: #64748B;
  font-size: 0.875rem;
  min-width: 70px;
`;

const CardBadge = styled.span`
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  background-color: rgba(59, 130, 246, 0.1);
  color: #3B82F6;
  font-size: 0.875rem;
`;

const CardStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const CardLastUpdated = styled.span`
  font-size: 0.875rem;
  color: rgba(15, 23, 42, 0.7);
`;

const CardActions = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
  justify-content: center;
`;

const ContentBlocksTab: React.FC = () => {
  return (
    <Container>
      <ActionsBar>
        {/* Desktop filters */}
        <SearchContainer>
          <div style={{ position: 'relative' }}>
            <SearchInput type="text" placeholder="Search blocks..." />
            <SearchIcon icon={faSearch} />
          </div>
          <FilterButtons>
            <FilterButton>All Types</FilterButton>
            <FilterButton>Published Only</FilterButton>
          </FilterButtons>
        </SearchContainer>
        <NewBlockButton>
          <FontAwesomeIcon icon={faPlus} />
          New Block
        </NewBlockButton>
        {/* Mobile filters */}
        <ResponsiveFilters>
          <ResponsiveSearchWrapper>
            <SearchInput type="text" placeholder="Search blocks..." />
            <SearchIcon icon={faSearch} />
          </ResponsiveSearchWrapper>
          <ResponsiveFilterRow>
            <ResponsiveFilterButton>All Types</ResponsiveFilterButton>
            <ResponsiveFilterButton>Published Only</ResponsiveFilterButton>
          </ResponsiveFilterRow>
        </ResponsiveFilters>
        <FloatingAddButton>
          <FontAwesomeIcon icon={faPlus} />
        </FloatingAddButton>
      </ActionsBar>

      <ContentGrid>
        <>
          <BlocksTable>
            <Table>
              <TableHead>
                <tr>
                  <TableHeader>Block Name</TableHeader>
                  <TableHeader>Use Case</TableHeader>
                  <TableHeader>Status</TableHeader>
                  <TableHeader>Last Updated</TableHeader>
                  <TableHeader>Actions</TableHeader>
                </tr>
              </TableHead>
              <TableBody>
                <tr>
                  <TableCell>
                    <BlockInfo>
                      <BlockIcon icon={faCube} />
                      <BlockName>Homepage Hero</BlockName>
                    </BlockInfo>
                  </TableCell>
                  <TableCell>
                    <UseCaseBadge>Hero</UseCaseBadge>
                  </TableCell>
                  <TableCell>
                    <StatusIndicator>
                      <StatusDot />
                      Published
                    </StatusIndicator>
                  </TableCell>
                  <TableCell>
                    <LastUpdated>2 days ago</LastUpdated>
                  </TableCell>
                  <TableCell>
                    <TableActionButtons>
                      <ActionButton>
                        <FontAwesomeIcon icon={faPen} />
                      </ActionButton>
                      <ActionButton>
                        <FontAwesomeIcon icon={faCopy} />
                      </ActionButton>
                      <ActionButton $color="#EC297B">
                        <FontAwesomeIcon icon={faTrash} />
                      </ActionButton>
                    </TableActionButtons>
                  </TableCell>
                </tr>
              </TableBody>
            </Table>
          </BlocksTable>
          {/* Card view for mobile/tablet */}
          <CardListContainer>
            <BlockCard>
              <CardHeader>
                <BlockIcon icon={faCube} />
                <CardBlockName>Homepage Hero</CardBlockName>
              </CardHeader>
              <CardMeta>
                <CardMetaRow>
                  <CardLabel>Use Case:</CardLabel>
                  <CardBadge>Hero</CardBadge>
                </CardMetaRow>
                <CardMetaRow>
                  <CardLabel>Status:</CardLabel>
                  <CardStatus>
                    <StatusDot />
                    Published
                  </CardStatus>
                </CardMetaRow>
                <CardMetaRow>
                  <CardLabel>Last Updated:</CardLabel>
                  <CardLastUpdated>2 days ago</CardLastUpdated>
                </CardMetaRow>
              </CardMeta>
              <CardActions>
                <ActionButton>
                  <FontAwesomeIcon icon={faPen} />
                </ActionButton>
                <ActionButton>
                  <FontAwesomeIcon icon={faCopy} />
                </ActionButton>
                <ActionButton $color="#EC297B">
                  <FontAwesomeIcon icon={faTrash} />
                </ActionButton>
              </CardActions>
            </BlockCard>
          </CardListContainer>
        </>
        <UsageLogPanel>
          <PanelTitle>Block Usage</PanelTitle>
          
          <UsageList>
            <UsageItem>
              <UsageHeader>
                <UsagePath>/homepage</UsagePath>
                <UsageSection>Hero Section</UsageSection>
              </UsageHeader>
              <UsageTime>
                <UsageIcon icon={faClock} />
                Last rendered: 5 min ago
              </UsageTime>
            </UsageItem>

            <UsageItem>
              <UsageHeader>
                <UsagePath>/pricing</UsagePath>
                <UsageSection>CTA Section</UsageSection>
              </UsageHeader>
              <UsageTime>
                <UsageIcon icon={faClock} />
                Last rendered: 1 hour ago
              </UsageTime>
            </UsageItem>

            <Divider />

            <PerformanceSection>
              <PerformanceTitle>Performance</PerformanceTitle>
              <PerformanceList>
                <PerformanceItem>
                  <PerformanceLabel>Avg. Load Time</PerformanceLabel>
                  <PerformanceValue>245ms</PerformanceValue>
                </PerformanceItem>
                <PerformanceItem>
                  <PerformanceLabel>Cache Hit Rate</PerformanceLabel>
                  <PerformanceValue>98.5%</PerformanceValue>
                </PerformanceItem>
              </PerformanceList>
            </PerformanceSection>
          </UsageList>
        </UsageLogPanel>
      </ContentGrid>
    </Container>
  );
};

export default ContentBlocksTab; 