import React, { useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalculator, faCalendarCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

const Section = styled.section`
  padding: 5rem 0;
`;

const Container = styled.div`
  max-width: 72rem;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.md};
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
  justify-content: center;
  width: 280px;

  @media (min-width: 768px) {
    width: auto;
  }

  &:hover {
    background-color: #D91A6B;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 1rem;
  position: relative;
  width: 95%;
  max-width: 1200px;
  margin: 2rem;
  height: 80vh;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: #6B7280;
  cursor: pointer;
  font-size: 1.5rem;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s;
  z-index: 1;

  &:hover {
    color: #1F2937;
  }
`;

const CalendlyContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 0.5rem;
  overflow: hidden;

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
  }
`;

export default function FinalCTA() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBookStrategyClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  return (
    <>
      <Section id="final-cta">
        <Container>
          <CTAWrapper>
            <Title>Start Building Your Offshore Strategy</Title>
            <Description>
              Join thousands of businesses that are scaling smarter with ScaleMate's AI-powered offshore solutions.
            </Description>
            <ButtonGroup>
              <PrimaryButton href="/quote">
                Get My Free Quote
                <FontAwesomeIcon icon={faCalculator} />
              </PrimaryButton>
              <SecondaryButton href="#" onClick={handleBookStrategyClick}>
                Book a Strategy Call
                <FontAwesomeIcon icon={faCalendarCheck} />
              </SecondaryButton>
            </ButtonGroup>
          </CTAWrapper>
        </Container>
      </Section>

      {isModalOpen && (
        <ModalOverlay onClick={() => setIsModalOpen(false)}>
          <ModalContent onClick={e => e.stopPropagation()}>
            <CloseButton onClick={() => setIsModalOpen(false)}>
              <FontAwesomeIcon icon={faTimes} />
            </CloseButton>
            <CalendlyContainer>
              <iframe
                src="https://calendly.com/shoreagents-discovery-sessions-with-mark-nobleza/45min"
                title="Book a Strategy Call"
                style={{ width: '100%', height: '100%' }}
              />
            </CalendlyContainer>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
} 