import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenNib } from '@fortawesome/free-solid-svg-icons';

const Section = styled.section`
  padding: 3rem 0;
`;

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const CTAWrapper = styled.div`
  background-color: #3B82F6;
  border-radius: 1rem;
  padding: 3rem;
  text-align: center;
  color: white;
`;

const Title = styled.h2`
  font-size: 2.25rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
`;

const Description = styled.p`
  font-size: 1.25rem;
  margin-bottom: 2rem;
  max-width: 42rem;
  margin-left: auto;
  margin-right: auto;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const PrimaryButton = styled(Link)`
  background-color: white;
  color: #3B82F6;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  transition: background-color 0.2s;
  justify-content: center;
  width: 280px;

  @media (min-width: 768px) {
    width: auto;
  }

  &:hover {
    background-color: #F9FAFB;
  }
`;

export default function FinalCTA() {
  return (
    <Section id="blog-cta">
      <Container>
        <CTAWrapper>
          <Title>Ready to Start Your Scaling Journey?</Title>
          <Description>Try our Role Builder tool and create your perfect offshore team structure.</Description>
          <ButtonGroup>
            <PrimaryButton href="/role-builder">
              Try Role Builder Free
              <FontAwesomeIcon icon={faPenNib} style={{ marginLeft: '0.5rem' }} />
            </PrimaryButton>
          </ButtonGroup>
        </CTAWrapper>
      </Container>
    </Section>
  );
} 