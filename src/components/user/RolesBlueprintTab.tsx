import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSearch, faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare, faFilePdf, faCopy } from '@fortawesome/free-regular-svg-icons';

const MainContent = styled.main`
  flex: 1;
  padding: 1.5rem;
  background-color: #F9FAFB;
`;

const ActionsContainer = styled.div`
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

const DepartmentSelect = styled.select`
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

const RolesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
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
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

const RoleInfo = styled.div``;

const RoleTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #0F172A;
`;

const RoleDate = styled.p`
  font-size: 0.875rem;
  color: rgba(15, 23, 42, 0.7);
`;

const MenuButton = styled.button`
  color: rgba(15, 23, 42, 0.4);
  background: none;
  border: none;
  padding: 0;
  
  &:hover {
    color: #0F172A;
  }
`;

const TagsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const Tag = styled.span<{ $type: 'department' | 'status' }>`
  padding: 0.25rem 0.5rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  background-color: ${props => props.$type === 'department' ? 'rgba(0, 152, 255, 0.1)' : 'rgba(132, 204, 22, 0.1)'};
  color: ${props => props.$type === 'department' ? '#0098FF' : '#84CC16'};
`;

const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 1rem;
  border-top: 1px solid #E5E7EB;
`;

const ViewDetailsButton = styled.button`
  color: #3B82F6;
  background: none;
  border: none;
  padding: 0;
  
  &:hover {
    color: rgba(59, 130, 246, 0.8);
  }
`;

const ActionButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const ActionButton = styled.button`
  color: rgba(15, 23, 42, 0.4);
  background: none;
  border: none;
  padding: 0;
  
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