import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSearch, faShareNodes } from '@fortawesome/free-solid-svg-icons';
import { faFilePdf } from '@fortawesome/free-regular-svg-icons';

const Container = styled.div`
  padding: 1.5rem;
  background-color: #F9FAFB;
  
  @media only screen and (max-width: 767px) {
    padding: 1rem;
  }
`;

const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
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

const TimeSelect = styled.select`
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
`;

const CreateButton = styled.button`
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

  @media (max-width: 1002px) {
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

  @media (max-width: 1002px) {
    display: flex;
  }
`;

const TableContainer = styled.div`
  background-color: white;
  border-radius: 0.75rem;
  border: 1px solid #E5E7EB;

  @media (min-width: 889px) {
    width: 100%;
  }
  @media (max-width: 888px) {
    display: none;
  }
`;

const Table = styled.table`
  width: 100%;
  table-layout: fixed;
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
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  
  @media only screen and (max-width: 767px) {
    padding: 0.75rem 1rem;
  }
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
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  
  @media only screen and (max-width: 767px) {
    padding: 0.75rem 1rem;
  }
`;

const RoleInfo = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
  flex: 1;
`;

const RoleTitle = styled.div`
  font-size: 0.875rem;
  font-weight: 500;
  color: #0F172A;
  word-break: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const RoleId = styled.div`
  font-size: 0.875rem;
  color: rgba(15, 23, 42, 0.7);
  overflow: hidden;
  text-overflow: ellipsis;
`;

const DateText = styled.span`
  font-size: 0.875rem;
  color: rgba(15, 23, 42, 0.7);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CostText = styled.span`
  font-size: 0.875rem;
  color: #0F172A;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const SavingsText = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
  color: #84CC16;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ActionButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.75rem;
  white-space: nowrap;
  min-width: 0;
  flex: 1;
  
  @media only screen and (max-width: 767px) {
    gap: 0.5rem;
  }
`;

const ViewButton = styled.button`
  color: #3B82F6;
  font-size: 0.875rem;
  background: none;
  border: none;
  padding: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover {
    color: rgba(59, 130, 246, 0.8);
  }
`;

const IconButton = styled.button`
  color: rgba(15, 23, 42, 0.4);
  background: none;
  border: none;
  padding: 0.25rem;
  cursor: pointer;
  flex-shrink: 0;
  
  &:hover {
    color: #0F172A;
  }
`;

const CardContainer = styled.div`
  display: none;
  
  @media (max-width: 888px) {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`;

const QuoteCard = styled.div`
  background-color: white;
  border-radius: 0.75rem;
  border: 1px solid #E5E7EB;
  padding: 1.25rem;
  
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
`;

const CardInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const CardTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: #0F172A;
  margin: 0;
  word-break: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CardId = styled.p`
  font-size: 0.875rem;
  color: rgba(15, 23, 42, 0.7);
  margin: 0.25rem 0 0;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CardDate = styled.p`
  font-size: 0.875rem;
  color: rgba(15, 23, 42, 0.7);
  margin: 0.25rem 0 0;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CardContent = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 1rem;
  
  @media only screen and (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
`;

const CostItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-width: 0;
`;

const CostLabel = styled.span`
  font-size: 0.75rem;
  color: rgba(15, 23, 42, 0.7);
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CostValue = styled.span`
  font-size: 0.875rem;
  color: #0F172A;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const SavingsValue = styled.span`
  font-size: 0.875rem;
  color: #84CC16;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 1rem;
  border-top: 1px solid #E5E7EB;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const CardActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-shrink: 0;
  
  @media only screen and (max-width: 767px) {
    gap: 0.5rem;
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

      <FloatingAddButton>
        <FontAwesomeIcon icon={faPlus} />
      </FloatingAddButton>

      <TableContainer id="quotes-table">
        <Table>
          <TableHead>
            <tr>
              <TableHeaderCell style={{ width: '25%' }}>Role</TableHeaderCell>
              <TableHeaderCell style={{ width: '15%' }}>Date Created</TableHeaderCell>
              <TableHeaderCell style={{ width: '15%' }} $align="right">Offshore Cost</TableHeaderCell>
              <TableHeaderCell style={{ width: '15%' }} $align="right">Local Cost</TableHeaderCell>
              <TableHeaderCell style={{ width: '10%' }} $align="right">Savings</TableHeaderCell>
              <TableHeaderCell style={{ width: '20%' }} $align="right">Actions</TableHeaderCell>
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
                  <IconButton title="Download PDF">
                    <FontAwesomeIcon icon={faFilePdf} />
                  </IconButton>
                  <IconButton title="Share">
                    <FontAwesomeIcon icon={faShareNodes} />
                  </IconButton>
                </ActionButtons>
              </TableCell>
            </tr>
          </TableBody>
        </Table>
      </TableContainer>

      <CardContainer>
        <QuoteCard>
          <CardHeader>
            <CardInfo>
              <CardTitle>Senior Sales Manager</CardTitle>
              <CardId>#Q-2025-001</CardId>
              <CardDate>March 15, 2025</CardDate>
            </CardInfo>
          </CardHeader>
          <CardContent>
            <CostItem>
              <CostLabel>Offshore Cost</CostLabel>
              <CostValue>$2,500/mo</CostValue>
            </CostItem>
            <CostItem>
              <CostLabel>Local Cost</CostLabel>
              <CostValue>$7,500/mo</CostValue>
            </CostItem>
            <CostItem>
              <CostLabel>Savings</CostLabel>
              <SavingsValue>67%</SavingsValue>
            </CostItem>
          </CardContent>
          <CardFooter>
            <ViewButton>View Report</ViewButton>
            <CardActions>
              <IconButton title="Download PDF">
                <FontAwesomeIcon icon={faFilePdf} />
              </IconButton>
              <IconButton title="Share">
                <FontAwesomeIcon icon={faShareNodes} />
              </IconButton>
            </CardActions>
          </CardFooter>
        </QuoteCard>

        <QuoteCard>
          <CardHeader>
            <CardInfo>
              <CardTitle>Executive Assistant</CardTitle>
              <CardId>#Q-2025-002</CardId>
              <CardDate>March 10, 2025</CardDate>
            </CardInfo>
          </CardHeader>
          <CardContent>
            <CostItem>
              <CostLabel>Offshore Cost</CostLabel>
              <CostValue>$1,800/mo</CostValue>
            </CostItem>
            <CostItem>
              <CostLabel>Local Cost</CostLabel>
              <CostValue>$5,000/mo</CostValue>
            </CostItem>
            <CostItem>
              <CostLabel>Savings</CostLabel>
              <SavingsValue>64%</SavingsValue>
            </CostItem>
          </CardContent>
          <CardFooter>
            <ViewButton>View Report</ViewButton>
            <CardActions>
              <IconButton title="Download PDF">
                <FontAwesomeIcon icon={faFilePdf} />
              </IconButton>
              <IconButton title="Share">
                <FontAwesomeIcon icon={faShareNodes} />
              </IconButton>
            </CardActions>
          </CardFooter>
        </QuoteCard>
      </CardContainer>
    </Container>
  );
};

export default SavedQuotesTab; 