import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faDownload, faCalendarDays, faEye, faFileLines } from '@fortawesome/free-solid-svg-icons';
import { faFileLines as farFileLines } from '@fortawesome/free-regular-svg-icons';

// General container for the tab content
const TabContainer = styled.div`
  padding: 1.5rem;
`;

const FiltersContainer = styled.div`
  display: flex;
  margin-bottom: 1.5rem;

  @media (min-width: 1339px) { // Desktop
    flex-direction: row;
    align-items: center;
    gap: 1rem;
    justify-content: space-between;
  }

  /* Tablet default: will be managed by children if Tablet Rows are active */
  /* Mobile default: column stacking */
  @media (max-width: 888px) { // Mobile explicit stacking
    flex-direction: column;
    align-items: stretch;
    gap: 1rem; 
  }
  
  /* For Tablet, FiltersContainer will stack TabletFirstFilterRow and TabletSecondFilterRow */
  @media (min-width: 889px) and (max-width: 1338px) {
    flex-direction: column;
    align-items: stretch;
  gap: 1rem;
  }
`;

const SearchContainerStyled = styled.div`
  position: relative;
  /* height: 2.5rem; // REMOVED - height will be derived from SearchInput */

  @media (min-width: 1339px) { // Desktop
  width: 16rem;
  }
  @media (max-width: 888px) { // Mobile
    width: 100%;
  }
  /* For Tablet, width is controlled by parent flex (TabletFirstFilterRow) */
  @media (min-width: 889px) and (max-width: 1338px) {
    width: auto;
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

const SearchIconStyled = styled(FontAwesomeIcon)`
    position: absolute;
    left: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    color: rgba(15, 23, 42, 0.4);
`;

const SelectsRow = styled.div`
  display: flex;
  align-items: center; /* Added to ensure vertical alignment of selects */
  gap: 1rem;
  & > select {
    flex: 1;
    min-width: 0; 
  }

  @media (min-width: 1339px) { /* Desktop: part of main row */ }
  @media (max-width: 888px) { // Mobile
    width: 100%;
  }
  /* For Tablet, width is controlled by parent flex (TabletFirstFilterRow) */
  @media (min-width: 889px) and (max-width: 1338px) {
    width: auto;
  }
`;

const StyledSelect = styled.select`
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

  @media (min-width: 1339px) {
    min-width: 10rem; 
  }
`;

const DatesRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (min-width: 1339px) { /* Desktop: part of main row */ }
  @media (max-width: 888px) { // Mobile
    width: 100%;
    & > .date-input-group-wrapper { flex: 1; min-width: 0; }
    & > .date-separator { flex-grow: 0; flex-shrink: 0; }
  }
  /* For Tablet, width is controlled by parent flex (TabletSecondFilterRow) */
  @media (min-width: 889px) and (max-width: 1338px) {
    width: auto;
    & > .date-input-group-wrapper { flex: 1; min-width: 0; }
    & > .date-separator { flex-grow: 0; flex-shrink: 0; }
  }
`;

const DateInputGroup = styled.div` 
  display: flex; 
  align-items: center;
  /* height: 2.5rem; // REMOVED - height will be derived from StyledDateInput */
  box-sizing: border-box; 
`;

const StyledDateInput = styled.input`
  padding: 0.5rem 1rem;
  border: 1px solid #E5E7EB; 
  border-radius: 0.5rem;
  background-color: white; 
  color: #0F172A;
  font-size: 0.875rem;
  outline: none;
  width: 100%; 
  height: 2.5rem; /* Keep height on the input itself */
  box-sizing: border-box; 

  &::-webkit-calendar-picker-indicator {
    opacity: 0.6;
  cursor: pointer;
  }
`;

const DateSeparator = styled.span`
  color: rgba(15, 23, 42, 0.7); 
`;

const ExportButtonWrapper = styled.div`
  @media (min-width: 1339px) { margin-left: auto; }
  @media (max-width: 888px) { // Mobile 

    width: 100%;
  }
  @media (min-width: 889px) and (max-width: 1338px) {
    width: auto;
  }
`;

const ExportButton = styled.button`
  padding: 0.5rem 1rem; 
    background-color: #3B82F6;
    color: white;
  border-radius: 0.5rem; 
    border: none;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  justify-content: center; 
  gap: 0.5rem; 
  cursor: pointer;
  height: 2.5rem; 
  box-sizing: border-box; 
  transition: background-color 0.2s;

    &:hover {
      background-color: #2563EB;
    }

  @media (max-width: 888px) { // Mobile
    width: 100%;
  }
  /* For Tablet, width controlled by parent (ExportButtonWrapper) which is flex child */
  @media (min-width: 889px) and (max-width: 1338px) {
    width: 100%; /* Button fills its wrapper */
  }
`;

const TabletFirstFilterRow = styled.div`
  display: contents; /* Default for mobile and desktop */

  @media (min-width: 889px) and (max-width: 1338px) { // Tablet specific layout
  display: flex;
    width: 100%;
    gap: 1rem;
  align-items: center;

    & > ${SearchContainerStyled} {
      flex: 1; 
      min-width: 0;
    }
    & > ${SelectsRow} {
      flex: 2; /* Changed from 1.5 to 2 */
      min-width: 0;
    }
  }
`;

const TabletSecondFilterRow = styled.div`
  display: contents; /* Default for mobile and desktop */

  @media (min-width: 889px) and (max-width: 1338px) { 
  display: flex;
    width: 100%;
    gap: 1rem;
    align-items: center;

    & > ${DatesRow} {
      flex: 2.2; /* Increased to make DatesRow wider */
      min-width: 0;
    }
    & > ${ExportButtonWrapper} {
      flex: 0.8; /* Decreased to make ExportButtonWrapper narrower */
      min-width: 0;
    }
  }
`;

// --- Table Styled Components --- 
const TableWrapper = styled.div`
  background-color: white;
  border-radius: 0.75rem; /* rounded-xl */
  border: 1px solid #E5E7EB;
  overflow: hidden; /* For rounded corners on table */
  margin-top: 1.5rem;

  @media (min-width: 889px) { /* Desktop and Tablet */
    overflow-x: auto; /* Enable horizontal scrolling */
  }

  @media (max-width: 888px) { /* Mobile */
    display: none; /* Hide table on mobile */
  }
`;

const StyledTable = styled.table`
  width: 100%;
`;

const TableHeadStyled = styled.thead`
  background-color: #F9FAFB;
  border-bottom: 1px solid #E5E7EB;
`;

const TableBodyStyled = styled.tbody`
  /* For divide-y effect */
  & > tr:not(:first-child) {
    border-top: 1px solid #E5E7EB;
  }
  & > tr:hover {
    background-color: #F9FAFB;
  }
`;

const TableRowStyled = styled.tr`
  cursor: pointer;
`;

const TableHeaderCellStyled = styled.th`
  padding: 1rem 1.5rem; /* px-6 py-4 */
  text-align: left;
  font-size: 0.875rem; /* text-sm */
  font-weight: 600; /* font-semibold */
  color: #0F172A;

  &.text-right {
    text-align: right;
  }
`;

const TableCellStyled = styled.td`
  padding: 1rem 1.5rem; /* px-6 py-4 */
  color: rgba(15, 23, 42, 0.7); /* Default text-[#0F172A]/70 */

  &.main-text {
    color: #0F172A;
  }
  &.font-medium {
    font-weight: 500;
  }
`;

const UserCellContainer = styled.div`
  display: flex;
  align-items: center;
`;

const AvatarStyled = styled.img`
  width: 2rem; /* w-8 */
  height: 2rem; /* h-8 */
  border-radius: 9999px; /* rounded-full */
  margin-right: 0.5rem; /* mr-2 */
`;

const ActionButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.75rem; /* space-x-3 */
`;

const ActionButtonStyled = styled.button`
  color: rgba(15, 23, 42, 0.7); /* text-[#0F172A]/70 */
  background: none;
  border: none;
  padding: 0.25rem;
  cursor: pointer;
  font-size: 1rem; /* Adjust icon size if needed */

  &:hover {
  color: #0F172A;
  }
  &.hover-primary:hover {
    color: #3B82F6;
  }
`;

// --- Mobile Card Styled Components --- 
const CardListContainer = styled.div`
  display: none; /* Hidden by default */
  margin-top: 1.5rem;

  @media (max-width: 888px) { /* Mobile */
    display: block;
  }
`;

const QuoteCardStyled = styled.div`
  background-color: white;
  border-radius: 0.75rem;
  border: 1px solid #E5E7EB;
  padding: 1rem;
  margin-bottom: 1rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
`;

const CardHeaderStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start; /* Align items to start for multi-line title/date */
  margin-bottom: 0.75rem;
`;

const CardTitleGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const CardRoleTitle = styled.h3`
  font-size: 1rem; /* text-base or slightly larger */
  font-weight: 600;
  color: #0F172A;
  margin: 0;
`;

const CardDate = styled.span`
  font-size: 0.875rem;
  color: rgba(15, 23, 42, 0.7);
`;

const CardContentStyled = styled.div`
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

const CardLabelStyled = styled.span`
  font-weight: 500;
  color: #0F172A;
`;

const CardValueStyled = styled.span`
  color: rgba(15, 23, 42, 0.7);
  text-align: left;
  &.font-medium {
    font-weight: 500;
    color: #0F172A;
  }
`;

const CardUserDetailStyled = styled.div`
  display: flex;
  align-items: center;
  /* Use AvatarStyled directly here */
`;

const CardActionsStyled = styled.div`
    display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 0.5rem;
    border-top: 1px solid #E5E7EB;
  padding-top: 0.75rem;
`;


const QuoteAnalyticsTab: React.FC = () => {
  const exampleQuote = {
    id: 'quote1',
    date: 'Mar 15, 2025',
    role: 'Senior Product Manager',
    currency: 'USD',
    offshoreCost: '$45,000',
    localCost: '$120,000',
    user: {
      name: 'Alex J.', // Not in original HTML, but good for alt text or future use
      email: 'alex.j@example.com',
      avatarUrl: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg',
    },
  };

  return (
    <TabContainer>
      <FiltersContainer id="quote-filters">
        <TabletFirstFilterRow>
          <SearchContainerStyled>
            <SearchInput type="text" placeholder="Search roles..." />
            <SearchIconStyled icon={faSearch} />
          </SearchContainerStyled>
          <SelectsRow>
            <StyledSelect>
              <option>All Regions</option>
              <option>North America</option>
              <option>Europe</option>
              <option>Asia Pacific</option>
            </StyledSelect>
            <StyledSelect>
              <option>All Status</option>
              <option>Saved</option>
              <option>Abandoned</option>
            </StyledSelect>
          </SelectsRow>
        </TabletFirstFilterRow>

        <TabletSecondFilterRow>
          <DatesRow>
            <DateInputGroup className="date-input-group-wrapper">
              <StyledDateInput type="date" />
            </DateInputGroup>
            <DateSeparator className="date-separator">to</DateSeparator> 
            <DateInputGroup className="date-input-group-wrapper">
              <StyledDateInput type="date" />
            </DateInputGroup>
          </DatesRow>
          <ExportButtonWrapper>
            <ExportButton>
              <FontAwesomeIcon icon={faDownload} />
              Export CSV
            </ExportButton>
          </ExportButtonWrapper>
        </TabletSecondFilterRow>
          </FiltersContainer>

      {/* Desktop/Tablet Table */}
      <TableWrapper id="quote-table">
        <StyledTable>
          <TableHeadStyled>
            <TableRowStyled>
              <TableHeaderCellStyled>Date</TableHeaderCellStyled>
              <TableHeaderCellStyled>Role</TableHeaderCellStyled>
              <TableHeaderCellStyled>Currency</TableHeaderCellStyled>
              <TableHeaderCellStyled>Offshore Cost</TableHeaderCellStyled>
              <TableHeaderCellStyled>Local Cost</TableHeaderCellStyled>
              <TableHeaderCellStyled>User</TableHeaderCellStyled>
              <TableHeaderCellStyled className="text-right">Actions</TableHeaderCellStyled>
            </TableRowStyled>
          </TableHeadStyled>
          <TableBodyStyled>
            <TableRowStyled>
              <TableCellStyled>{exampleQuote.date}</TableCellStyled>
              <TableCellStyled className="main-text">{exampleQuote.role}</TableCellStyled>
              <TableCellStyled className="main-text">{exampleQuote.currency}</TableCellStyled>
              <TableCellStyled className="font-medium main-text">{exampleQuote.offshoreCost}</TableCellStyled>
              <TableCellStyled className="font-medium main-text">{exampleQuote.localCost}</TableCellStyled>
              <TableCellStyled>
                <UserCellContainer>
                  <AvatarStyled src={exampleQuote.user.avatarUrl} alt={exampleQuote.user.name || 'User'} />
                  <span>{exampleQuote.user.email}</span>
                </UserCellContainer>
              </TableCellStyled>
              <TableCellStyled>
                <ActionButtonsContainer>
                  <ActionButtonStyled title="View Details">
                    <FontAwesomeIcon icon={faEye} />
                  </ActionButtonStyled>
                  <ActionButtonStyled title="View Document" className="hover-primary">
                    <FontAwesomeIcon icon={faFileLines} />
                  </ActionButtonStyled>
                </ActionButtonsContainer>
              </TableCellStyled>
            </TableRowStyled>
            {/* Add more rows as needed */}
          </TableBodyStyled>
        </StyledTable>
      </TableWrapper>

      {/* Mobile Card View */}
      <CardListContainer>
        <QuoteCardStyled>
          <CardHeaderStyled>
            <CardTitleGroup>
              <CardRoleTitle>{exampleQuote.role}</CardRoleTitle>
              <CardDate>{exampleQuote.date}</CardDate>
            </CardTitleGroup>
            {/* No toggle icon needed as details are always open */}
          </CardHeaderStyled>
          <CardContentStyled>
            <CardDetailRow>
              <CardLabelStyled>User:</CardLabelStyled>
              <CardUserDetailStyled>
                <AvatarStyled src={exampleQuote.user.avatarUrl} alt={exampleQuote.user.name || 'User'} style={{width: '1.5rem', height: '1.5rem', marginRight: '0.25rem'}}/>
                <CardValueStyled>{exampleQuote.user.email}</CardValueStyled>
              </CardUserDetailStyled>
            </CardDetailRow>
            <CardDetailRow>
              <CardLabelStyled>Currency:</CardLabelStyled>
              <CardValueStyled>{exampleQuote.currency}</CardValueStyled>
            </CardDetailRow>
            <CardDetailRow>
              <CardLabelStyled>Offshore Cost:</CardLabelStyled>
              <CardValueStyled className="font-medium">{exampleQuote.offshoreCost}</CardValueStyled>
            </CardDetailRow>
            <CardDetailRow>
              <CardLabelStyled>Local Cost:</CardLabelStyled>
              <CardValueStyled className="font-medium">{exampleQuote.localCost}</CardValueStyled>
            </CardDetailRow>
            <CardActionsStyled>
              <ActionButtonStyled title="View Details">
                <FontAwesomeIcon icon={faEye} />
              </ActionButtonStyled>
              <ActionButtonStyled title="View Document" className="hover-primary">
                <FontAwesomeIcon icon={faFileLines} />
              </ActionButtonStyled>
            </CardActionsStyled>
          </CardContentStyled>
        </QuoteCardStyled>
        {/* Add more cards as needed */}
      </CardListContainer>

    </TabContainer>
  );
};

export default QuoteAnalyticsTab; 