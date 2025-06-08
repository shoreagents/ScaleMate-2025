import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSearch, faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare, faFilePdf, faCopy } from '@fortawesome/free-regular-svg-icons';

const MainContent = styled.main`
  flex: 1;
  padding: 1.5rem;
  background-color: #F9FAFB;
  overflow-x: hidden;
  
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

const DepartmentSelect = styled.select`
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

const RolesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  
  @media only screen and (max-width: 1023px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media only screen and (max-width: 767px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const RoleCard = styled.div`
  background-color: white;
  border-radius: 0.75rem;
  border: 1px solid #E5E7EB;
  padding: 1.5rem;
  transition: all 0.2s;

  &:hover {
    border-color: #3B82F6;
  }
  
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

const RoleInfo = styled.div`
  min-width: 0;
  flex: 1;
`;

const RoleTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #0F172A;
  margin: 0;
  word-break: break-word;
  
  @media only screen and (max-width: 767px) {
    font-size: 1rem;
  }
`;

const RoleDate = styled.p`
  font-size: 0.875rem;
  color: rgba(15, 23, 42, 0.7);
  margin: 0.25rem 0 0;
  
  @media only screen and (max-width: 767px) {
    font-size: 0.8125rem;
  }
`;

const MenuButton = styled.button`
  color: rgba(15, 23, 42, 0.4);
  background: none;
  border: none;
  padding: 0.25rem;
  flex-shrink: 0;
  
  &:hover {
    color: #0F172A;
  }
`;

const TagsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
`;

const Tag = styled.span<{ $type: 'department' | 'status' }>`
  padding: 0.25rem 0.5rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  background-color: ${props => props.$type === 'department' ? 'rgba(0, 152, 255, 0.1)' : 'rgba(132, 204, 22, 0.1)'};
  color: ${props => props.$type === 'department' ? '#0098FF' : '#84CC16'};
  white-space: nowrap;
  
  @media only screen and (max-width: 767px) {
    font-size: 0.8125rem;
    padding: 0.25rem 0.375rem;
  }
`;

const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 1rem;
  border-top: 1px solid #E5E7EB;
  gap: 0.5rem;
  flex-wrap: wrap;
  
  @media only screen and (max-width: 767px) {
    padding-top: 0.75rem;
  }
`;

const ViewDetailsButton = styled.button`
  color: #3B82F6;
  background: none;
  border: none;
  padding: 0;
  font-size: 0.875rem;
  white-space: nowrap;
  
  &:hover {
    color: rgba(59, 130, 246, 0.8);
  }
  
  @media only screen and (max-width: 767px) {
    font-size: 0.8125rem;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-shrink: 0;
  
  @media only screen and (max-width: 767px) {
    gap: 0.5rem;
  }
`;

const ActionButton = styled.button`
  color: rgba(15, 23, 42, 0.4);
  background: none;
  border: none;
  padding: 0.25rem;
  
  &:hover {
    color: #0F172A;
  }
`;

const RolesBlueprintTab: React.FC = () => {
  return (
    <MainContent>
      <ActionsContainer id="roles-actions">
        <SearchFilterGroup>
          <SearchContainer>
            <SearchInput type="text" placeholder="Search roles..." />
            <SearchIcon>
              <FontAwesomeIcon icon={faSearch} />
            </SearchIcon>
          </SearchContainer>
          <DepartmentSelect>
            <option>All Departments</option>
            <option>Sales</option>
            <option>Admin</option>
            <option>Operations</option>
          </DepartmentSelect>
        </SearchFilterGroup>
        <CreateButton>
          <FontAwesomeIcon icon={faPlus} />
          <span>Create New Role</span>
        </CreateButton>
      </ActionsContainer>

      <FloatingAddButton>
        <FontAwesomeIcon icon={faPlus} />
      </FloatingAddButton>

      <RolesGrid id="roles-grid">
        {/* Role Card 1 */}
        <RoleCard id="role-card-1">
          <CardHeader>
            <RoleInfo>
              <RoleTitle>Senior Sales Manager</RoleTitle>
              <RoleDate>Created March 15, 2025</RoleDate>
            </RoleInfo>
            <MenuButton>
              <FontAwesomeIcon icon={faEllipsis} />
            </MenuButton>
          </CardHeader>
          <TagsContainer>
            <Tag $type="department">Sales</Tag>
            <Tag $type="status">Full-time</Tag>
          </TagsContainer>
          <CardFooter>
            <ViewDetailsButton>View Details</ViewDetailsButton>
            <ActionButtons>
              <ActionButton title="Edit">
                <FontAwesomeIcon icon={faPenToSquare} />
              </ActionButton>
              <ActionButton title="Download PDF">
                <FontAwesomeIcon icon={faFilePdf} />
              </ActionButton>
              <ActionButton title="Duplicate">
                <FontAwesomeIcon icon={faCopy} />
              </ActionButton>
            </ActionButtons>
          </CardFooter>
        </RoleCard>

        {/* Role Card 2 */}
        <RoleCard id="role-card-2">
          <CardHeader>
            <RoleInfo>
              <RoleTitle>Executive Assistant</RoleTitle>
              <RoleDate>Created March 10, 2025</RoleDate>
            </RoleInfo>
            <MenuButton>
              <FontAwesomeIcon icon={faEllipsis} />
            </MenuButton>
          </CardHeader>
          <TagsContainer>
            <Tag $type="department">Admin</Tag>
            <Tag $type="status">Part-time</Tag>
          </TagsContainer>
          <CardFooter>
            <ViewDetailsButton>View Details</ViewDetailsButton>
            <ActionButtons>
              <ActionButton title="Edit">
                <FontAwesomeIcon icon={faPenToSquare} />
              </ActionButton>
              <ActionButton title="Download PDF">
                <FontAwesomeIcon icon={faFilePdf} />
              </ActionButton>
              <ActionButton title="Duplicate">
                <FontAwesomeIcon icon={faCopy} />
              </ActionButton>
            </ActionButtons>
          </CardFooter>
        </RoleCard>

        {/* Role Card 3 */}
        <RoleCard id="role-card-3">
          <CardHeader>
            <RoleInfo>
              <RoleTitle>Operations Manager</RoleTitle>
              <RoleDate>Created March 5, 2025</RoleDate>
            </RoleInfo>
            <MenuButton>
              <FontAwesomeIcon icon={faEllipsis} />
            </MenuButton>
          </CardHeader>
          <TagsContainer>
            <Tag $type="department">Operations</Tag>
            <Tag $type="status">Full-time</Tag>
          </TagsContainer>
          <CardFooter>
            <ViewDetailsButton>View Details</ViewDetailsButton>
            <ActionButtons>
              <ActionButton title="Edit">
                <FontAwesomeIcon icon={faPenToSquare} />
              </ActionButton>
              <ActionButton title="Download PDF">
                <FontAwesomeIcon icon={faFilePdf} />
              </ActionButton>
              <ActionButton title="Duplicate">
                <FontAwesomeIcon icon={faCopy} />
              </ActionButton>
            </ActionButtons>
          </CardFooter>
        </RoleCard>
      </RolesGrid>
    </MainContent>
  );
};

export default RolesBlueprintTab; 