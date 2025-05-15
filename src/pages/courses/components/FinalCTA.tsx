import React, { useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../../../hooks/useAuth';
import { CoursesAuthModal } from '../../../components/courses/CoursesAuthModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons';

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

const PrimaryButton = styled.button`
  background-color: white;
  color: #3B82F6;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 1.125rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  width: 280px;

  @media (min-width: 768px) {
    width: auto;
  }

  &:hover {
    background-color: #F9FAFB;
    transform: translateY(-1px);
  }
`;

export default function FinalCTA() {
  const { user } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleStartLearning = () => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }
    // Handle navigation for authenticated users
    // TODO: Implement navigation logic
  };

  const handleAuthSuccess = () => {
    setIsAuthModalOpen(false);
    // Update UI state to reflect authenticated user
    // No page refresh needed as useAuth hook will update automatically
  };

  return (
    <>
      <Section>
        <Container>
          <CTAWrapper>
            <Title>Ready to Start Learning?</Title>
            <Description>
              Create your free account to track progress, earn XP, and unlock premium content
            </Description>
            <ButtonGroup>
              <PrimaryButton onClick={handleStartLearning}>
                Start Learning now
                <FontAwesomeIcon icon={faGraduationCap} />
              </PrimaryButton>
            </ButtonGroup>
          </CTAWrapper>
        </Container>
      </Section>

      <CoursesAuthModal
        $isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />
    </>
  );
}