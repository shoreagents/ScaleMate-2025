import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faChevronDown } from '@fortawesome/free-solid-svg-icons';

const Section = styled.section`
  padding: 2rem 0;
`;

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const Inner = styled.div`
  max-width: 64rem;
  margin: 0 auto;
`;

const SearchWrapper = styled.div`
  position: relative;
  margin-bottom: 1.5rem;
`;

const SearchInput = styled.input`
  width: 100%;
  background: #fff;
  border: 1px solid #E5E7EB;
  border-radius: 0.5rem;
  padding: 0.75rem 1rem 0.75rem 3rem;
  font-size: 1rem;
  outline: none;
  transition: box-shadow 0.2s;
  &:focus {
    box-shadow: 0 0 0 2px #3B82F6;
    border-color: #3B82F6;
  }
`;

const SearchIcon = styled(FontAwesomeIcon)`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(15, 23, 42, 0.4);
  font-size: 1.1rem;
`;

const ButtonRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
`;

const FilterButton = styled.button<{active?: boolean}>`
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-size: 1rem;
  border: 1px solid #E5E7EB;
  background: ${({active}) => (active ? '#3B82F6' : '#fff')};
  color: ${({active}) => (active ? '#fff' : '#0F172A')};
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: background 0.2s, color 0.2s;
  &:hover {
    background: ${({active}) => (active ? '#2563EB' : '#F9FAFB')};
    color: ${({active}) => (active ? '#fff' : '#0F172A')};
  }
`;

export default function FilterSection() {
  return (
    <Section id="search-filter">
      <Container>
        <Inner>
          <SearchWrapper>
            <SearchInput type="text" placeholder="Search tools..." />
            <SearchIcon icon={faSearch} />
          </SearchWrapper>
          <ButtonRow>
            <FilterButton active>All Tools</FilterButton>
            <FilterButton>AI Tools</FilterButton>
            <FilterButton>Operations</FilterButton>
            <FilterButton>Marketing</FilterButton>
            <FilterButton>
              Complexity
              <FontAwesomeIcon icon={faChevronDown} style={{marginLeft: '0.5rem'}} />
            </FilterButton>
          </ButtonRow>
        </Inner>
      </Container>
    </Section>
  );
} 