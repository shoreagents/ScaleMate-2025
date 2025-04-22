import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSearch, faShareNodes } from '@fortawesome/free-solid-svg-icons';
import { faFilePdf } from '@fortawesome/free-regular-svg-icons';

const Container = styled.div`
  padding: 1.5rem;
`;

const ActionsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 4rem;
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

const TimeSelect = styled.select`
  padding: 0.5rem 1rem;
  border: 1px solid #E5E7EB;
  border-radius: 0.5rem;

  &:focus {
    outline: none;
    border-color: #3B82F6;
  }
`;

const CreateButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #3B82F6;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: none;

  &:hover {
    background-color: rgba(59, 130, 246, 0.9);
  }
`;

const TableContainer = styled.div`
  background-color: white;
  border-radius: 0.75rem;
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

const TableHeaderCell = styled.th<{ $align?: string }>`
  padding: 1rem 1.5rem;
  text-align: ${props => props.$align || 'left'};
  font-size: 0.875rem;
  font-weight: 600;
  color: #0F172A;
`;

const TableBody = styled.tbody`
  & > tr {
    border-bottom: 1px solid #E5E7EB;
    
    &:hover {
      background-color: #F9FAFB;
    }
  }
`;

const TableCell = styled.td<{ $align?: string }>`
  padding: 1rem 1.5rem;
  text-align: ${props => props.$align || 'left'};
`;

const RoleInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const RoleTitle = styled.div`
  font-size: 0.875rem;
  font-weight: 500;
  color: #0F172A;
`;

const RoleId = styled.div`
  font-size: 0.875rem;
  color: rgba(15, 23, 42, 0.7);
`;

const DateText = styled.span`
  font-size: 0.875rem;
  color: rgba(15, 23, 42, 0.7);
`;

const CostText = styled.span`
  font-size: 0.875rem;
  color: #0F172A;
`;

const SavingsText = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
  color: #84CC16;
`;

const ActionButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.75rem;
`;

const ViewButton = styled.button`
  color: #3B82F6;
  font-size: 0.875rem;
  background: none;
  border: none;
  padding: 0;

  &:hover {
    color: rgba(59, 130, 246, 0.8);
  }
`;

const IconButton = styled.button`
  color: rgba(15, 23, 42, 0.4);
  background: none;
  border: none;
  padding: 0;

  &:hover {
    color: #0F172A;
  }
`;

const SavedQuotesTab: React.FC = () => {
  return (
    <Container>
      <ActionsContainer id="quotes-actions">
        <SearchFilterGroup>
          <SearchContainer>
            <SearchInput type="text" placeholder="Search quotes..." />
            <SearchIcon>
              <FontAwesomeIcon icon={faSearch} />
            </SearchIcon>
          </SearchContainer>
          <TimeSelect>
            <option>All Time</option>
            <option>Last 30 Days</option>
            <option>Last 90 Days</option>
          </TimeSelect>
        </SearchFilterGroup>
        <CreateButton>
          <FontAwesomeIcon icon={faPlus} />
          <span>New Quote</span>
        </CreateButton>
      </ActionsContainer>

      <TableContainer id="quotes-table">
        <Table>
          <TableHead>
            <tr>
              <TableHeaderCell>Role</TableHeaderCell>
              <TableHeaderCell>Date Created</TableHeaderCell>
              <TableHeaderCell $align="right">Offshore Cost</TableHeaderCell>
              <TableHeaderCell $align="right">Local Cost</TableHeaderCell>
              <TableHeaderCell $align="right">Savings</TableHeaderCell>
              <TableHeaderCell $align="right">Actions</TableHeaderCell>
            </tr>
          </TableHead>
          <TableBody>
            <tr>
              <TableCell>
                <RoleInfo>
                  <RoleTitle>Senior Sales Manager</RoleTitle>
                  <RoleId>#Q-2025-001</RoleId>
                </RoleInfo>
              </TableCell>
              <TableCell>
                <DateText>March 15, 2025</DateText>
              </TableCell>
              <TableCell $align="right">
                <CostText>$2,500/mo</CostText>
              </TableCell>
              <TableCell $align="right">
                <CostText>$7,500/mo</CostText>
              </TableCell>
              <TableCell $align="right">
                <SavingsText>67%</SavingsText>
              </TableCell>
              <TableCell>
                <ActionButtons>
                  <ViewButton>View Report</ViewButton>
                  <IconButton>
                    <FontAwesomeIcon icon={faFilePdf} />
                  </IconButton>
                  <IconButton>
                    <FontAwesomeIcon icon={faShareNodes} />
                  </IconButton>
                </ActionButtons>
              </TableCell>
            </tr>

            <tr>
              <TableCell>
                <RoleInfo>
                  <RoleTitle>Executive Assistant</RoleTitle>
                  <RoleId>#Q-2025-002</RoleId>
                </RoleInfo>
              </TableCell>
              <TableCell>
                <DateText>March 10, 2025</DateText>
              </TableCell>
              <TableCell $align="right">
                <CostText>$1,800/mo</CostText>
              </TableCell>
              <TableCell $align="right">
                <CostText>$5,000/mo</CostText>
              </TableCell>
              <TableCell $align="right">
                <SavingsText>64%</SavingsText>
              </TableCell>
              <TableCell>
                <ActionButtons>
                  <ViewButton>View Report</ViewButton>
                  <IconButton>
                    <FontAwesomeIcon icon={faFilePdf} />
                  </IconButton>
                  <IconButton>
                    <FontAwesomeIcon icon={faShareNodes} />
                  </IconButton>
                </ActionButtons>
              </TableCell>
            </tr>
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default SavedQuotesTab; 