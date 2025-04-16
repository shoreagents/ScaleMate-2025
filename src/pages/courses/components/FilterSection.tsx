import React from 'react';
import styled from 'styled-components';

const Section = styled.section`
  padding: 2rem 0;
  background: #F9FAFB;
`;

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const ButtonRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
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
  transition: background 0.2s, color 0.2s;
  &:hover {
    background: ${({active}) => (active ? '#2563EB' : '#F9FAFB')};
    color: ${({active}) => (active ? '#fff' : '#0F172A')};
  }
`;

const Divider = styled.div`
  width: 1px;
  height: 2rem;
  background: #E5E7EB;
  align-self: center;
`;

export default function FilterSection() {
  return (
    <Section id="course-filters">
      <Container>
        <ButtonRow>
          <FilterButton active>All Courses</FilterButton>
          <FilterButton>Beginner</FilterButton>
          <FilterButton>Intermediate</FilterButton>
          <FilterButton>Advanced</FilterButton>
          <Divider />
          <FilterButton>AI</FilterButton>
          <FilterButton>Systems</FilterButton>
          <FilterButton>Team</FilterButton>
        </ButtonRow>
      </Container>
    </Section>
  );
} 