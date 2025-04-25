import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faSearch, 
  faPlus, 
  faPen, 
  faEyeSlash, 
  faStar as faStarSolid,
  faStar as faStarRegular,
  faRobot,
  faWandMagicSparkles,
  faCloudUpload,
  faTimes
} from '@fortawesome/free-solid-svg-icons';

const Container = styled.div`
  padding: 1.5rem;
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
`;

const SearchInput = styled.input`
  padding: 0.5rem 1rem 0.5rem 2.5rem;
  border: 1px solid #E5E7EB;
  border-radius: 0.5rem;
  width: 16rem;
  font-size: 0.875rem;
  
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

const FilterButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const FilterButton = styled.button`
  padding: 0.375rem 0.75rem;
  border: 1px solid #E5E7EB;
  border-radius: 0.5rem;
  color: rgba(15, 23, 42, 0.7);
  font-size: 0.875rem;
  
  &:hover {
    background-color: #F9FAFB;
  }
`;

const AddToolButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #3B82F6;
  color: white;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  border: none;
  
  &:hover {
    background-color: #2563EB;
  }
`;

const ToolsTable = styled.div`
  background-color: white;
  border-radius: 0.5rem;
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

const ToolInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const ToolIcon = styled.div<{ $color: string }>`
  width: 2rem;
  height: 2rem;
  border-radius: 0.5rem;
  background-color: ${props => `${props.$color}/10`};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.$color};
`;

const ToolDetails = styled.div``;

const ToolName = styled.div`
  font-weight: 500;
  color: #0F172A;
`;

const ToolVersion = styled.div`
  font-size: 0.875rem;
  color: rgba(15, 23, 42, 0.6);
`;

const CategoryTag = styled.span`
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  background-color: rgba(0, 152, 255, 0.1);
  color: #0098FF;
  font-size: 0.875rem;
`;

const AccessLevelTag = styled.span<{ $color: string }>`
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  background-color: ${props => `${props.$color}/10`};
  color: ${props => props.$color};
  font-size: 0.875rem;
`;

const ActionButtons = styled.div`
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

const AIToolsTab: React.FC = () => {
  return (
    <Container>
      <ActionsBar>
        <SearchContainer>
          <div style={{ position: 'relative' }}>
            <SearchInput type="text" placeholder="Search tools..." />
            <SearchIcon icon={faSearch} />
          </div>
          <FilterButtons>
            <FilterButton>AI Tools</FilterButton>
            <FilterButton>Automation</FilterButton>
            <FilterButton>Marketing</FilterButton>
          </FilterButtons>
        </SearchContainer>
        <AddToolButton>
          <FontAwesomeIcon icon={faPlus} />
          Add New Tool
        </AddToolButton>
      </ActionsBar>

      <ToolsTable>
        <Table>
          <TableHead>
            <tr>
              <TableHeader>Tool</TableHeader>
              <TableHeader>Category</TableHeader>
              <TableHeader>Description</TableHeader>
              <TableHeader>Access Level</TableHeader>
              <TableHeader>Actions</TableHeader>
            </tr>
          </TableHead>
          <TableBody>
            <tr>
              <TableCell>
                <ToolInfo>
                  <ToolIcon $color="#3B82F6">
                    <FontAwesomeIcon icon={faRobot} />
                  </ToolIcon>
                  <ToolDetails>
                    <ToolName>Role Copilot</ToolName>
                    <ToolVersion>v2.1.0</ToolVersion>
                  </ToolDetails>
                </ToolInfo>
              </TableCell>
              <TableCell>
                <CategoryTag>AI Assistant</CategoryTag>
              </TableCell>
              <TableCell>
                <span style={{ color: 'rgba(15, 23, 42, 0.7)' }}>
                  AI-powered role description generator
                </span>
              </TableCell>
              <TableCell>
                <AccessLevelTag $color="#00E915">Premium</AccessLevelTag>
              </TableCell>
              <TableCell>
                <ActionButtons>
                  <ActionButton>
                    <FontAwesomeIcon icon={faPen} />
                  </ActionButton>
                  <ActionButton>
                    <FontAwesomeIcon icon={faEyeSlash} />
                  </ActionButton>
                  <ActionButton $color="#EC297B">
                    <FontAwesomeIcon icon={faStarSolid} />
                  </ActionButton>
                </ActionButtons>
              </TableCell>
            </tr>
            <tr>
              <TableCell>
                <ToolInfo>
                  <ToolIcon $color="#3B82F6">
                    <FontAwesomeIcon icon={faWandMagicSparkles} />
                  </ToolIcon>
                  <ToolDetails>
                    <ToolName>Smart Quotes</ToolName>
                    <ToolVersion>v1.5.2</ToolVersion>
                  </ToolDetails>
                </ToolInfo>
              </TableCell>
              <TableCell>
                <CategoryTag>Automation</CategoryTag>
              </TableCell>
              <TableCell>
                <span style={{ color: 'rgba(15, 23, 42, 0.7)' }}>
                  Automated quote generation system
                </span>
              </TableCell>
              <TableCell>
                <AccessLevelTag $color="#00E915">Free</AccessLevelTag>
              </TableCell>
              <TableCell>
                <ActionButtons>
                  <ActionButton>
                    <FontAwesomeIcon icon={faPen} />
                  </ActionButton>
                  <ActionButton>
                    <FontAwesomeIcon icon={faEyeSlash} />
                  </ActionButton>
                  <ActionButton>
                    <FontAwesomeIcon icon={faStarRegular} />
                  </ActionButton>
                </ActionButtons>
              </TableCell>
            </tr>
          </TableBody>
        </Table>
      </ToolsTable>
    </Container>
  );
};

export default AIToolsTab; 