import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPlus, faDownload, faStar as faStarRegular, faTrashCan as faTrashCanRegular, faPen } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegularRegular } from '@fortawesome/free-regular-svg-icons';
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';

const TabContainer = styled.div`
  padding: 1.5rem;
`;

const FilterBarContainer = styled.div`
  margin-bottom: 1.5rem; 
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 1167px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto;
    gap: 1rem; 
  }
`;

const SearchContainer = styled.div`
  position: relative;
  width: 16rem;

  @media (max-width: 1167px) {
    width: 100%;
    min-width: 0;
    grid-column: 1 / 2;
    grid-row: 1 / 2;
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
`;

const SearchIcon = styled(FontAwesomeIcon)`
  position: absolute;
  left: 0.75rem; 
  top: 50%;
  transform: translateY(-50%);
  color: rgba(15, 23, 42, 0.4); 
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
  min-width: 12rem;

  @media (max-width: 1167px) {
    min-width: 0;
    width: 100%;
    grid-column: 2 / 3;
    grid-row: 1 / 2;
    padding-right: 2rem;
  }
`;

const StyledButton = styled.button<{ primary?: boolean }>`
  padding: 0.5rem 1rem; 
  border-radius: 0.5rem; 
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem; 
  cursor: pointer;
  height: 2.5rem; 
  box-sizing: border-box; 
  transition: background-color 0.2s, border-color 0.2s;
  white-space: nowrap; 
  width: auto;

  ${props => props.primary ? `
    background-color: #3B82F6;
    color: white;
    border: 1px solid #3B82F6;
    &:hover {
      background-color: #2563EB;
      border-color: #2563EB;
    }
  ` : `
    background-color: white;
    color: #0F172A;
    border: 1px solid #E5E7EB;
    &:hover {
      background-color: #F9FAFB;
    }
  `}

  @media (max-width: 1167px) {
    width: 100%;
    min-width: 0;
  }
`;

const AddButton = styled(StyledButton)`
  @media (max-width: 1167px) {
    grid-column: 1 / 2;
    grid-row: 2 / 3;
  }
  @media (max-width: 423px) {
    white-space: normal;
    text-align: center;
    word-break: break-word;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }
`;

const ExportButton = styled(StyledButton)`
  @media (max-width: 1167px) {
    grid-column: 2 / 3;
    grid-row: 2 / 3;
  }
  @media (max-width: 352px) {
    white-space: normal;
    text-align: center;
    word-break: break-word;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }
`;

const DesktopInputGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 1167px) {
    display: contents;
  }
`;

const DesktopActionButtonsGroup = styled.div`
  display: flex;
  gap: 0.75rem;

  @media (max-width: 1167px) {
    display: contents;
  }
`;

const TableWrapper = styled.div`
  background-color: white;
  border-radius: 0.75rem;
  border: 1px solid #E5E7EB;
  overflow: hidden;
  margin-top: 1.5rem;

  @media (min-width: 889px) {
    overflow-x: auto;
  }
  @media (max-width: 888px) {
    display: none;
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
  padding: 1rem 1.5rem;
  text-align: left;
  font-size: 0.875rem;
  font-weight: 600;
  color: #0F172A;
  &.text-right {
    text-align: right;
  }
`;

const TableCellStyled = styled.td`
  padding: 1rem 1.5rem;
  color: rgba(15, 23, 42, 0.7);
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
  width: 2rem;
  height: 2rem;
  border-radius: 9999px;
  margin-right: 0.5rem;
`;

const ActionButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.75rem;
`;

const ActionButtonStyled = styled.button`
  color: rgba(15, 23, 42, 0.7);
  background: none;
  border: none;
  padding: 0.25rem;
  cursor: pointer;
  font-size: 1rem;
  &:hover { color: #0F172A; }
  &.hover-primary:hover { color: #3B82F6; }
  &.hover-danger:hover { color: #EC297B; }
`;

const CardListContainer = styled.div`
  display: none;
  margin-top: 1.5rem;
  @media (max-width: 888px) {
    display: block;
  }
`;

const RoleCardStyled = styled.div`
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
  align-items: flex-start;
  margin-bottom: 0.75rem;
`;

const CardTitleGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const CardRoleTitle = styled.h3`
  font-size: 1rem;
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

  &.created-by-row {
    @media (max-width: 411px) {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.25rem;
    }
  }
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
  flex-direction: row;

  @media (max-width: 411px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
    img {
      margin-right: 0 !important;
    }
    span {
      display: block;
      width: 100%;
    }
  }
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

const FeaturedBadge = styled.span`
  margin-left: 0.5rem;
  padding: 0.25rem 0.5rem;
  background: rgba(236, 41, 123, 0.1);
  color: #EC297B;
  font-size: 0.75rem;
  border-radius: 9999px;
  font-weight: 500;
`;

const StatusBadge = styled.span`
  padding: 0.25rem 0.5rem;
  background: rgba(0, 233, 21, 0.1);
  color: #00E915;
  border-radius: 9999px;
  font-size: 0.9em;
  font-weight: 500;
`;

const UserCell = styled.div`
  display: flex;
  align-items: center;
`;

const ActionGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.75rem;
`;

const ActionButton = styled.button`
  color: rgba(15, 23, 42, 0.7);
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.1rem;
  padding: 0.25rem;
  transition: color 0.2s;

  &:hover {
    color: #0F172A;
  }

  &[data-action='edit']:hover {
    color: #3B82F6;
  }
  &[data-action='delete']:hover {
    color: #EC297B;
  }
`;

const RolesBlueprintTab: React.FC = () => {
  // Example data (replace with real data as needed)
  const exampleRole = {
    title: 'Senior Product Manager',
    department: 'Product',
    featured: true,
    createdBy: {
      email: 'michael.s@example.com',
      avatarUrl: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg',
    },
    date: 'Mar 15, 2025',
    status: 'Active',
  };

  return (
    <TabContainer>
      <FilterBarContainer id="role-filters">
        <DesktopInputGroup>
          <SearchContainer>
            <SearchInput type="text" placeholder="Search roles..." />
            <SearchIcon icon={faSearch} />
          </SearchContainer>
          <StyledSelect>
            <option>All Departments</option>
            <option>Engineering</option>
            <option>Product</option>
            <option>Design</option>
          </StyledSelect>
        </DesktopInputGroup>
        <DesktopActionButtonsGroup>
          <AddButton>
            <FontAwesomeIcon icon={faPlus} />
            Add to Templates
          </AddButton>
          <ExportButton primary>
            <FontAwesomeIcon icon={faDownload} />
            Export Roles
          </ExportButton>
        </DesktopActionButtonsGroup>
      </FilterBarContainer>
      {/* Desktop/Tablet Table */}
      <TableWrapper id="roles-table">
        <StyledTable>
          <TableHeadStyled>
            <TableRowStyled>
              <TableHeaderCellStyled>Role Title</TableHeaderCellStyled>
              <TableHeaderCellStyled>Department</TableHeaderCellStyled>
              <TableHeaderCellStyled>Created By</TableHeaderCellStyled>
              <TableHeaderCellStyled>Date</TableHeaderCellStyled>
              <TableHeaderCellStyled>Status</TableHeaderCellStyled>
              <TableHeaderCellStyled className="text-right">Actions</TableHeaderCellStyled>
            </TableRowStyled>
          </TableHeadStyled>
          <TableBodyStyled>
            <TableRowStyled>
              <TableCellStyled>
                <span className="font-medium main-text">{exampleRole.title}</span>
                {exampleRole.featured && (
                  <span style={{ marginLeft: '0.5rem', padding: '0.25rem 0.5rem', background: 'rgba(236, 41, 123, 0.1)', color: '#EC297B', fontSize: '0.75rem', borderRadius: '9999px', fontWeight: 500 }}>Featured</span>
                )}
              </TableCellStyled>
              <TableCellStyled>{exampleRole.department}</TableCellStyled>
              <TableCellStyled>
                <UserCellContainer>
                  <AvatarStyled src={exampleRole.createdBy.avatarUrl} alt="User" />
                  <span>{exampleRole.createdBy.email}</span>
                </UserCellContainer>
              </TableCellStyled>
              <TableCellStyled>{exampleRole.date}</TableCellStyled>
              <TableCellStyled>
                <span style={{ padding: '0.25rem 0.5rem', background: 'rgba(0, 233, 21, 0.1)', color: '#00E915', borderRadius: '9999px', fontSize: '0.9em', fontWeight: 500 }}>{exampleRole.status}</span>
              </TableCellStyled>
              <TableCellStyled>
                <ActionButtonsContainer>
                  <ActionButtonStyled title="Favorite">
                    <FontAwesomeIcon icon={faStarRegular} />
                  </ActionButtonStyled>
                  <ActionButtonStyled className="hover-primary" title="Edit">
                    <FontAwesomeIcon icon={faPen} />
                  </ActionButtonStyled>
                  <ActionButtonStyled className="hover-danger" title="Delete">
                    <FontAwesomeIcon icon={faTrashCanRegular} />
                  </ActionButtonStyled>
                </ActionButtonsContainer>
              </TableCellStyled>
            </TableRowStyled>
            {/* More role rows can be added here */}
          </TableBodyStyled>
        </StyledTable>
      </TableWrapper>
      {/* Mobile Card View */}
      <CardListContainer>
        <RoleCardStyled>
          <CardHeaderStyled>
            <CardTitleGroup>
              <CardRoleTitle>{exampleRole.title}</CardRoleTitle>
              <CardDate>{exampleRole.date}</CardDate>
            </CardTitleGroup>
          </CardHeaderStyled>
          <CardContentStyled>
            <CardDetailRow>
              <CardLabelStyled>Department:</CardLabelStyled>
              <CardValueStyled>{exampleRole.department}</CardValueStyled>
            </CardDetailRow>
            <CardDetailRow className="created-by-row">
              <CardLabelStyled>Created By:</CardLabelStyled>
              <CardUserDetailStyled>
                <AvatarStyled src={exampleRole.createdBy.avatarUrl} alt="User" />
                <CardValueStyled>{exampleRole.createdBy.email}</CardValueStyled>
              </CardUserDetailStyled>
            </CardDetailRow>
            <CardDetailRow>
              <CardLabelStyled>Status:</CardLabelStyled>
              <CardValueStyled>{exampleRole.status}</CardValueStyled>
            </CardDetailRow>
            <CardActionsStyled>
              <ActionButtonStyled title="Favorite">
                <FontAwesomeIcon icon={faStarRegular} />
              </ActionButtonStyled>
              <ActionButtonStyled className="hover-primary" title="Edit">
                <FontAwesomeIcon icon={faPen} />
              </ActionButtonStyled>
              <ActionButtonStyled className="hover-danger" title="Delete">
                <FontAwesomeIcon icon={faTrashCanRegular} />
              </ActionButtonStyled>
            </CardActionsStyled>
          </CardContentStyled>
        </RoleCardStyled>
        {/* More cards can be added here */}
      </CardListContainer>
    </TabContainer>
  );
};

export default RolesBlueprintTab; 