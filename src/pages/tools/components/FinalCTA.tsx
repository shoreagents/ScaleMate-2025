import React, { useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faToolbox, faLayerGroup } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../../hooks/useAuth';
import { ToolsAuthModal } from '../../../components/auth-modals/tools/ToolsAuthModal';

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
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  transition: background-color 0.2s;
  justify-content: center;
  width: 280px;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  min-width: 280px;

  @media (min-width: 768px) {
    width: 280px;
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
  font-size: 1rem;
  min-width: 280px;

  @media (min-width: 768px) {
    width: 280px;
  }

  &:hover {
    background-color: #D91A6B;
  }
`;

export default function FinalCTA() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { user } = useAuth();

  const handleCreateAccount = () => {
    if (!user) {
      setIsAuthModalOpen(true);
    }
  };

  const handleAuthSuccess = () => {
    setIsAuthModalOpen(false);
    // Update UI state to reflect authenticated user
    // No page refresh needed as useAuth hook will update automatically
  };

  return (
    <Section>
      <Container>
        <CTAWrapper>
          <Title>Build Your Perfect Tool Stack</Title>
          <Description>
            Sign up to save tools, get personalized recommendations, and access implementation guides.
          </Description>
          <ButtonGroup>
            <PrimaryButton onClick={handleCreateAccount}>
              Create Free Account
              <FontAwesomeIcon icon={faToolbox} style={{ marginLeft: '0.5rem' }} />
            </PrimaryButton>
            <SecondaryButton href="/sample-stack">
              View Sample Stack
              <FontAwesomeIcon icon={faLayerGroup} style={{ marginLeft: '0.5rem' }} />
            </SecondaryButton>
          </ButtonGroup>
        </CTAWrapper>
      </Container>

      <ToolsAuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />
    </Section>
  );
} 