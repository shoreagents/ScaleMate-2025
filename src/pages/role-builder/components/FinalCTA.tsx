import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWandMagicSparkles, faEye } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { RoleBuilderAuthModal } from '../../../components/role-builder/RoleBuilderAuthModal';
import { useRouter } from 'next/router';
import { useAuth } from '../../../hooks/useAuth';

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

const ButtonIcon = styled(FontAwesomeIcon)`
  margin-left: 0.5rem;
`;

export default function FinalCTA() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const router = useRouter();
  const { user } = useAuth();

  const handleTryRoleBuilder = () => {
    if (user) {
      // If user is logged in, navigate to the role builder
      router.push('/role-builder/create');
    } else {
      // If user is not logged in, show the auth modal
      setIsAuthModalOpen(true);
    }
  };

  const handleAuthSuccess = () => {
    setIsAuthModalOpen(false);
    router.push('/role-builder/create');
  };

  return (
    <Section>
      <Container>
        <CTAWrapper>
          <Title>Ready to Build Your Perfect Role?</Title>
          <Description>
            Start with our AI-powered Role Builder or explore sample templates to get inspired.
          </Description>
          <ButtonGroup>
            <PrimaryButton onClick={handleTryRoleBuilder}>
              Try Role Builder
              <FontAwesomeIcon icon={faWandMagicSparkles} />
            </PrimaryButton>
            <SecondaryButton href="#">
              See Sample Role
              <FontAwesomeIcon icon={faEye} />
            </SecondaryButton>
          </ButtonGroup>
        </CTAWrapper>
      </Container>

      <RoleBuilderAuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />
    </Section>
  );
} 