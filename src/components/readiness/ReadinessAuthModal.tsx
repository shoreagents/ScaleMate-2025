import React, { useState } from 'react';
import styled from 'styled-components';
import { Modal } from '../ui/Modal';
import { ChartBarIcon } from '@heroicons/react/24/outline';
import SignUpForm from '../auth/SignUpForm';
import AuthForm from '../auth/AuthForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

interface ReadinessAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess?: () => void;
}

type ModalView = 'initial' | 'signup' | 'login';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 1rem;
  width: 100%;

  @media (max-width: 640px) {
    padding: 0.75rem;
  }
`;

const FormWrapper = styled.div`
  width: 100%;
  max-width: 100%;
  margin: 0 auto;

  @media (max-width: 640px) {
    padding: 0;
  }

  /* Override form container max-width */
  > div {
    max-width: 100% !important;
    width: 100% !important;
  }
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;
  margin: 0rem;
  color: rgb(31, 41, 55);
`;

const Description = styled.p`
  color: rgba(15, 23, 42, 0.7);
  margin-bottom: 3rem;
  max-width: 32rem;
  font-size: 0.875rem;
`;

const IconContainer = styled.div`
  width: 100%;
  background-color: rgba(99, 102, 241, 0.1);
  border-radius: 0.75rem;
  padding: 1.5rem;
  margin-bottom: 3rem;
  text-align: center;
  border: 1px solid #E5E7EB;
`;

const IconWrapper = styled.div`
  width: 3rem;
  height: 3rem;
  margin: 0 auto 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6366F1;

  @media (min-width: 640px) {
    width: 4rem;
    height: 4rem;
    margin-bottom: 1rem;
  }
`;

const IconText = styled.p`
  color: #0F172A;
  font-weight: 600;
  font-size: 1.125rem;

  @media (min-width: 640px) {
    font-size: 1.25rem;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 0.75rem;
  width: 100%;
  margin-bottom: 1.25rem;

  @media (max-width: 640px) {
    flex-direction: column;
    gap: 0.875rem;
  }

  @media (min-width: 640px) {
    margin-bottom: 1.5rem;
  }
`;

const SignUpButton = styled.button`
  flex: 1;
  background: #6366F1;
  color: white;
  padding: 0.875rem;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  width: 100%;

  @media (max-width: 640px) {
    width: 100%;
  }

  &:hover {
    background: #4F46E5;
  }

  &:active {
    transform: scale(0.98);
  }

  &:disabled {
    background: #9CA3AF;
    cursor: not-allowed;
  }
`;

const LoginButton = styled.button`
  flex: 1;
  background: transparent;
  border: 1.5px solid #9aa2b3;
  color: #1F2937;
  padding: 0.875rem;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  width: 100%;

  @media (max-width: 640px) {
    width: 100%;
  }

  &:hover {
    background: #F9FAFB;
    border-color: #1F2937;
  }

  &:active {
    transform: scale(0.98);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const BackButton = styled.button`
  color: #6366F1;
  background: none;
  border: none;
  cursor: pointer;
  font-weight: 500;
  font-size: 0.875rem;
  margin-top: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  border-radius: 0.375rem;
  margin-left: auto;
  margin-right: auto;

  @media (min-width: 640px) {
    margin-top: 1rem;

    &:hover {
      color: #4F46E5;
    }
  }
`;

const ExploreText = styled.span`
  color: #6B7280;
  font-size: 0.875rem;
  margin-right: 0.25rem;
`;

const ExploreContainer = styled.div`
  margin-top: 0rem;
`;

const ExploreLink = styled.a`
  color: #6366F1;
  font-weight: 500;
  font-size: 0.875rem;
  text-decoration: none;
  transition: color 0.2s ease;
  &:hover {
    color: #4F46E5;
  }
`;

export const ReadinessAuthModal = ({ isOpen, onClose, onAuthSuccess }: ReadinessAuthModalProps) => {
  const [currentView, setCurrentView] = useState<ModalView>('initial');

  const handleAuthSuccess = (message: string) => {
    if (onAuthSuccess) {
      onAuthSuccess();
    }
    // Close the modal after successful auth
    handleClose();
  };

  const handleAuthError = (error: string | null) => {
    if (error) {
      console.error('Auth error:', error);
    }
  };

  const handleClose = () => {
    onClose();
    // Reset to initial view after modal is closed
    setTimeout(() => setCurrentView('initial'), 300);
  };

  const renderContent = () => {
    switch (currentView) {
      case 'signup':
        return (
          <FormWrapper>
            <SignUpForm onSuccess={handleAuthSuccess} onError={handleAuthError} />
            <BackButton onClick={() => setCurrentView('initial')}>
              <FontAwesomeIcon icon={faArrowLeft} style={{ fontSize: '0.875rem' }} />
              Go Back
            </BackButton>
          </FormWrapper>
        );
      case 'login':
        return (
          <FormWrapper>
            <AuthForm onSuccess={handleAuthSuccess} onError={handleAuthError} />
            <BackButton onClick={() => setCurrentView('initial')}>
              <FontAwesomeIcon icon={faArrowLeft} style={{ fontSize: '0.875rem' }} />
              Go Back
            </BackButton>
          </FormWrapper>
        );
      default:
        return (
          <>
            <Title>Almost there!</Title>
            
            <Description>
              Create a free account to unlock the full Readiness Quiz, including AI-powered assessment and personalized recommendations.
            </Description>

            <IconContainer>
              <IconWrapper>
                <ChartBarIcon style={{ width: '2.5rem', height: '2.5rem' }} />
              </IconWrapper>
              <IconText>Readiness Assessment</IconText>
            </IconContainer>

            <ButtonContainer>
              <LoginButton onClick={() => setCurrentView('login')}>
                Log In
              </LoginButton>

              <SignUpButton onClick={() => setCurrentView('signup')}>
                Sign Up for Free
              </SignUpButton>
            </ButtonContainer>

            <ExploreContainer>
              <ExploreText>Not ready yet?</ExploreText>
              <ExploreLink href="#" onClick={(e) => { e.preventDefault(); handleClose(); }}>
                Keep exploring tools
              </ExploreLink>
            </ExploreContainer>
          </>
        );
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <Container>
        {renderContent()}
      </Container>
    </Modal>
  );
}; 