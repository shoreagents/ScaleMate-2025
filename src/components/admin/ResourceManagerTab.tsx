import React from 'react';
import styled from 'styled-components';
import { FaSearch, FaUpload, FaChevronDown, FaFilePdf, FaFileWord, FaPen, FaArchive, FaStar } from 'react-icons/fa';

const Container = styled.div`
  padding: 1.5rem;
`;

const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;

  @media (max-width: 1088px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto;
    gap: 1rem;
  }
`;

const FilterGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 1088px) {
    display: contents;
  }
`;

const SearchInput = styled.div`
  position: relative;
  width: 16rem;

  input {
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
  }

  svg {
    position: absolute;
    left: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    color: rgba(15, 23, 42, 0.4);
  }

  @media (max-width: 1088px) {
    width: 100%;
    grid-column: 1 / 2;
    grid-row: 1 / 2;
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

  @media (max-width: 1088px) {
    width: 100%;
  }
`;

const UploadButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0 1rem;
  background-color: #3B82F6;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  height: 2.5rem;
  box-sizing: border-box;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #2563EB;
  }

  @media (max-width: 1088px) {
    width: 100%;
    justify-content: center;
    text-align: center;
  }
`;

const TagFilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  width: 100%;
`;

const TagLabel = styled.span`
  font-size: 0.875rem;
  color: rgba(15, 23, 42, 0.7);
  margin-right: 0.25rem;
`;

const TagButton = styled.button`
  padding: 0.25rem 0.75rem;
  background-color: rgba(0, 152, 255, 0.1);
  color: #0098FF;
  border: none;
  border-radius: 9999px;
  font-size: 0.875rem;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    background-color: rgba(0, 152, 255, 0.2);
  }
`;

const TableContainer = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  border: 1px solid #E5E7EB;
  overflow: hidden;

  @media (min-width: 889px) {
    overflow-x: auto;
  }
  @media (max-width: 888px) {
    display: none;
  }
`;

const Table = styled.table`
  width: 100%;
`;

const TableHeader = styled.thead`
  background-color: #F9FAFB;
  border-bottom: 1px solid #E5E7EB;
`;

const TableHeaderCell = styled.th`
  padding: 1rem 1.5rem;
  text-align: left;
  font-size: 0.875rem;
  font-weight: 500;
  color: #0F172A;
`;

const TableBody = styled.tbody`
  tr {
    &:hover {
      background-color: #F9FAFB;
    }
  }
`;

const TableRow = styled.tr`
  border-bottom: 1px solid #E5E7EB;

  &:last-child {
    border-bottom: none;
  }
`;

const TableCell = styled.td`
  padding: 1rem 1.5rem;
`;

const ResourceTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #0F172A;
`;

const StatusTag = styled.span<{ $color: string }>`
  padding: 0.25rem 0.75rem;
  background-color: ${props => `${props.$color}10`};
  color: ${props => props.$color};
  border-radius: 9999px;
  font-size: 0.875rem;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const IconButton = styled.button<{ $color?: string }>`
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

const CardListContainer = styled.div`
  display: none;
  margin-top: 1.5rem;
  @media (max-width: 888px) {
    display: block;
  }
`;

const ResourceCard = styled.div`
  background-color: white;
  border-radius: 0.75rem;
  border: 1px solid #E5E7EB;
  padding: 1rem;
  margin-bottom: 1rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.75rem;
`;

const CardTitleGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const CardResourceTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: #0F172A;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const CardDate = styled.span`
  font-size: 0.875rem;
  color: rgba(15, 23, 42, 0.7);
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const CardDetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.875rem;
`;

const CardLabel = styled.span`
  font-weight: 500;
  color: #0F172A;
`;

const CardValue = styled.span`
  color: rgba(15, 23, 42, 0.7);
  text-align: left;
  &.font-medium {
    font-weight: 500;
    color: #0F172A;
  }
`;

const CardActions = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 0.5rem;
  border-top: 1px solid #E5E7EB;
  padding-top: 0.75rem;
`;

const ResourceManagerTab: React.FC = () => {
  return (
    <Container>
      <ActionsContainer>
        <FilterGroup>
          <SearchInput>
            <FaSearch />
            <input type="text" placeholder="Search resources..." />
          </SearchInput>
          <FilterButton>
            All Types
          </FilterButton>
          <FilterButton>
            Access Level
          </FilterButton>
        </FilterGroup>
        <UploadButton>
          <FaUpload />
          Upload Resource
        </UploadButton>
      </ActionsContainer>

      <TagFilterContainer>
        <TagLabel>Popular Tags:</TagLabel>
        <TagButton>Onboarding</TagButton>
        <TagButton>Delegation</TagButton>
        <TagButton>Leadership</TagButton>
        <TagButton>Templates</TagButton>
      </TagFilterContainer>

      {/* Desktop/Tablet Table */}
      <TableContainer>
        <Table>
          <TableHeader>
            <tr>
              <TableHeaderCell>Title</TableHeaderCell>
              <TableHeaderCell>Type</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Last Updated</TableHeaderCell>
              <TableHeaderCell>Actions</TableHeaderCell>
            </tr>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>
                <ResourceTitle>
                  <FaFilePdf style={{ color: '#EC297B' }} />
                  Team Scaling Guide 2025
                </ResourceTitle>
              </TableCell>
              <TableCell>PDF</TableCell>
              <TableCell>
                <StatusTag $color="#EC297B">Premium</StatusTag>
              </TableCell>
              <TableCell>Jan 15, 2025</TableCell>
              <TableCell>
                <ActionButtons>
                  <IconButton $color="#3B82F6" title="Edit">
                    <FaPen />
                  </IconButton>
                  <IconButton $color="#EC297B" title="Archive">
                    <FaArchive />
                  </IconButton>
                  <IconButton $color="#0098FF" title="Star">
                    <FaStar />
                  </IconButton>
                </ActionButtons>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <ResourceTitle>
                  <FaFileWord style={{ color: '#0098FF' }} />
                  Onboarding Checklist
                </ResourceTitle>
              </TableCell>
              <TableCell>DOC</TableCell>
              <TableCell>
                <StatusTag $color="#00E915">Free</StatusTag>
              </TableCell>
              <TableCell>Jan 10, 2025</TableCell>
              <TableCell>
                <ActionButtons>
                  <IconButton $color="#3B82F6" title="Edit">
                    <FaPen />
                  </IconButton>
                  <IconButton $color="#EC297B" title="Archive">
                    <FaArchive />
                  </IconButton>
                  <IconButton $color="#0098FF" title="Star">
                    <FaStar />
                  </IconButton>
                </ActionButtons>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {/* Mobile Card View */}
      <CardListContainer>
        <ResourceCard>
          <CardHeader>
            <CardTitleGroup>
              <CardResourceTitle>
                <FaFilePdf style={{ color: '#EC297B' }} />
                Team Scaling Guide 2025
              </CardResourceTitle>
              <CardDate>Jan 15, 2025</CardDate>
            </CardTitleGroup>
          </CardHeader>
          <CardContent>
            <CardDetailRow>
              <CardLabel>Type:</CardLabel>
              <CardValue>PDF</CardValue>
            </CardDetailRow>
            <CardDetailRow>
              <CardLabel>Status:</CardLabel>
              <CardValue>
                <StatusTag $color="#EC297B">Premium</StatusTag>
              </CardValue>
            </CardDetailRow>
            <CardActions>
              <IconButton $color="#3B82F6" title="Edit">
                <FaPen />
              </IconButton>
              <IconButton $color="#EC297B" title="Archive">
                <FaArchive />
              </IconButton>
              <IconButton $color="#0098FF" title="Star">
                <FaStar />
              </IconButton>
            </CardActions>
          </CardContent>
        </ResourceCard>

        <ResourceCard>
          <CardHeader>
            <CardTitleGroup>
              <CardResourceTitle>
                <FaFileWord style={{ color: '#0098FF' }} />
                Onboarding Checklist
              </CardResourceTitle>
              <CardDate>Jan 10, 2025</CardDate>
            </CardTitleGroup>
          </CardHeader>
          <CardContent>
            <CardDetailRow>
              <CardLabel>Type:</CardLabel>
              <CardValue>DOC</CardValue>
            </CardDetailRow>
            <CardDetailRow>
              <CardLabel>Status:</CardLabel>
              <CardValue>
                <StatusTag $color="#00E915">Free</StatusTag>
              </CardValue>
            </CardDetailRow>
            <CardActions>
              <IconButton $color="#3B82F6" title="Edit">
                <FaPen />
              </IconButton>
              <IconButton $color="#EC297B" title="Archive">
                <FaArchive />
              </IconButton>
              <IconButton $color="#0098FF" title="Star">
                <FaStar />
              </IconButton>
            </CardActions>
          </CardContent>
        </ResourceCard>
      </CardListContainer>
    </Container>
  );
};

export default ResourceManagerTab; 