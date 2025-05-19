import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPlus, faDownload } from '@fortawesome/free-solid-svg-icons';

const TabContainer = styled.div`
  padding: 1.5rem;
`;

const FilterBarContainer = styled.div`
  margin-bottom: 1.5rem; 
  display: flex;
  align-items: center;
  
  @media (min-width: 1228px) { // Desktop: single row
    justify-content: space-between;
    gap: 1rem; 
  }

  @media (max-width: 1227px) { // Two-row layout
    flex-direction: column;
    gap: 1rem; 
    align-items: stretch; /* Make children (InputGroup, ActionButtonsGroup) full width */
  }
`;

const InputGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem; 

  @media (min-width: 1228px) {
    /* Desktop: takes natural width or flexes if FilterBarContainer allows */
  }

  @media (max-width: 1227px) {
    width: 100%;
  }
`;

const SearchContainer = styled.div`
  position: relative;
  @media (min-width: 1228px) {
    width: 16rem; /* Specific width for desktop */
  }
  @media (max-width: 1227px) {
    flex: 1;
    min-width: 0; /* Allow shrinking */
  }
`;

const SearchInputStyled = styled.input`
  padding: 0.5rem 1rem 0.5rem 2.5rem; 
  border: 1px solid #E5E7EB;
  border-radius: 0.5rem; 

  width: 100%; /* Fills SearchContainer */
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

  @media (min-width: 1228px) {
    min-width: 12rem; /* Example min-width for desktop select */
  }

  @media (max-width: 1227px) {
    flex: 1;
    min-width: 0; /* Allow shrinking */
    /* width: 100%; */ /* Fallback for flex item if parent isn't also flex, but it is */
  }
`;

const ActionButtonsGroup = styled.div`
  display: flex;
  gap: 1rem;

  @media (min-width: 1228px) {
    /* Desktop: takes natural width */
  }
  @media (max-width: 1227px) {
    flex: 1;
    min-width: 0; /* Allow shrinking */
    /* width: 100%; */ /* Fallback for flex item */
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

  @media (max-width: 1227px) {
    flex: 1;
    min-width: 0; /* Allow shrinking */
    /* width: 100%; */ /* Fallback for flex item */
  }
`;

const RolesBlueprintTab: React.FC = () => {
  return (
    <TabContainer>
      <FilterBarContainer id="role-filters">
        <InputGroup>
          <SearchContainer>
            <SearchInputStyled type="text" placeholder="Search roles..." />
            <SearchIconStyled icon={faSearch} />
          </SearchContainer>
          <StyledSelect>
            <option>All Departments</option>
            <option>Engineering</option>
            <option>Product</option>
            <option>Design</option>
          </StyledSelect>
        </InputGroup>
        <ActionButtonsGroup>
          <StyledButton>
            <FontAwesomeIcon icon={faPlus} />
            Add to Templates
          </StyledButton>
          <StyledButton primary>
            <FontAwesomeIcon icon={faDownload} />
            Export Roles
          </StyledButton>
        </ActionButtonsGroup>
      </FilterBarContainer>
      {/* Future content for Roles Blueprint Tab will go here */}
    </TabContainer>
  );
};

export default RolesBlueprintTab; 