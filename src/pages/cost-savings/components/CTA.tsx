import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faPhone } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

const Section = styled.section`
  padding: 5rem 0;
`;

const Container = styled.div`
  max-width: 72rem;
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
  color: white;
`;

const Description = styled.p`
  font-size: 1.25rem;
  margin-bottom: 2rem;
  max-width: 42rem;
  margin-left: auto;
  margin-right: auto;
  color: white;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
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

  &:hover {
    background-color: #F9FAFB;
  }
`;

const SecondaryButton = styled(Link)`
  background-color: #EC297B;
  color: white;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  transition: background-color 0.2s;

  &:hover {
    background-color: #D91A6B;
  }
`;

export default function CTA() {
  return (
    <Section>
      <Container>
        <CTAWrapper>
          <Title>Ready to Start Saving?</Title>
          <Description>
            Download your savings report or schedule a call to discuss your needs
          </Description>
          <ButtonGroup>
            <PrimaryButton href="#">
              Download Report
              <FontAwesomeIcon icon={faDownload} style={{ marginLeft: '0.5rem' }} />
            </PrimaryButton>
            <SecondaryButton href="#">
              Book Strategy Call
              <FontAwesomeIcon icon={faPhone} style={{ marginLeft: '0.5rem' }} />
            </SecondaryButton>
          </ButtonGroup>
        </CTAWrapper>
      </Container>
    </Section>
  );
} 