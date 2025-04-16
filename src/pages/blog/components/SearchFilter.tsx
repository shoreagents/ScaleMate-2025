import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const Section = styled.section`
  padding: 2rem 0;
  border-bottom: 1px solid #E5E7EB;
`;

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

const SearchWrapper = styled.div`
  width: 100%;
  position: relative;

  @media (min-width: 768px) {
    width: 50%;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 3rem;
  border: 1px solid #E5E7EB;
  border-radius: 0.5rem;
  outline: none;

  &:focus {
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
  }
`;

const SearchIcon = styled(FontAwesomeIcon)`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(30, 41, 59, 0.5);
`;

const FilterButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const FilterButton = styled.button<{ active?: boolean }>`
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  background-color: ${props => props.active ? '#3B82F6' : 'transparent'};
  color: ${props => props.active ? '#fff' : '#0F172A'};
  border: 1px solid #E5E7EB;
  transition: all 0.2s;

  &:hover {
    background-color: ${props => props.active ? '#2563EB' : '#3B82F6'};
    color: #fff;
  }
`;

export default function SearchFilter() {
  return (
    <Section id="blog-search">
      <Container>
        <ContentWrapper>
          <SearchWrapper>
            <SearchInput type="text" placeholder="Search articles..." />
            <SearchIcon icon={faMagnifyingGlass} />
          </SearchWrapper>
          <FilterButtons>
            <FilterButton active>All</FilterButton>
            <FilterButton>Scaling</FilterButton>
            <FilterButton>AI Tools</FilterButton>
            <FilterButton>Operations</FilterButton>
          </FilterButtons>
        </ContentWrapper>
      </Container>
    </Section>
  );
} 