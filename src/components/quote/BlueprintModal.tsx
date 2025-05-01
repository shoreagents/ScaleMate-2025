import React, { useState } from 'react';
import styled from 'styled-components';
import { Modal } from '../ui/Modal';
import { DocumentIcon } from '@heroicons/react/24/outline';
import SignUpForm from '../auth/SignUpForm';
import AuthForm from '../auth/AuthForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

interface BlueprintModalProps {
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
`;

const Title = styled.h2`
  font-size: 2.25rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 1.5rem;
  color: #0F172A;
`;

const Description = styled.p`
  color: rgba(15, 23, 42, 0.7);
  margin-bottom: 2rem;
  font-size: 1.125rem;
  max-width: 32rem;
`;

const IconContainer = styled.div`
  width: 100%;
  background-color: rgba(59, 130, 246, 0.1);
  border-radius: 0.75rem;
  padding: 2rem;
  margin-bottom: 2rem;
  text-align: center;
  border: 1px solid #E5E7EB;
`;

const IconWrapper = styled.div`
  width: 4rem;
  height: 4rem;
  margin: 0 auto 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #3B82F6;
`;

const IconText = styled.p`
  color: #0F172A;
  font-weight: 600;
  font-size: 1.25rem;
`;

const SignUpButton = styled.button`
  width: 100%;
  background-color: #3B82F6;
  color: white;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 1.125rem;
  margin-bottom: 1rem;
  border: none;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #2563EB;
    transform: translateY(-1px);
  }
`;

const LoginButton = styled.button`
  width: 100%;
  background-color: white;
  color: #0F172A;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 1.125rem;
  margin-bottom: 1.5rem;
  border: 1px solid #E5E7EB;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #F9FAFB;
    border-color: #D1D5DB;
  }
`;

const BackButton = styled.button`
  color: #3B82F6;
  background: none;
  border: none;
  cursor: pointer;
  font-weight: 500;
  font-size: 1rem;
  margin-top: 1rem;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  border-radius: 0.375rem;

  &:hover {
    color: #2563EB;
    background-color: rgba(59, 130, 246, 0.1);
  }
`;

const ExploreLink = styled.button`
  color: #3B82F6;
  background: none;
  border: none;
  cursor: pointer;
  font-weight: 500;
  font-size: 1rem;
  margin-top: 1rem;
  transition: all 0.2s;

  &:hover {
    color: #2563EB;
    transform: translateY(-1px);
  }
`;

export const BlueprintModal = ({ isOpen, onClose, onAuthSuccess }: BlueprintModalProps) => {
  const [currentView, setCurrentView] = useState<ModalView>('initial');

  const handleAuthSuccess = (message: string) => {
    if (onAuthSuccess) {
      onAuthSuccess();
    }
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
          <>
            <SignUpForm onSuccess={handleAuthSuccess} onError={handleAuthError} />
            <BackButton onClick={() => setCurrentView('initial')}>
              <FontAwesomeIcon icon={faArrowLeft} style={{ fontSize: '0.875rem' }} />
              Back to options
            </BackButton>
          </>
        );
      case 'login':
        return (
          <>
            <AuthForm onSuccess={handleAuthSuccess} onError={handleAuthError} />
            <BackButton onClick={() => setCurrentView('initial')}>
              <FontAwesomeIcon icon={faArrowLeft} style={{ fontSize: '0.875rem' }} />
              Back to options
            </BackButton>
          </>
        );
      default:
        return (
          <>
            <Title>Almost there!</Title>
            
            <Description>
              Create a free account to unlock the full job blueprint, including salary breakdowns, tools, and task lists.
            </Description>

            <IconContainer>
              <IconWrapper>
                <DocumentIcon style={{ width: '2.5rem', height: '2.5rem' }} />
              </IconWrapper>
              <IconText>Complete Job Blueprint</IconText>
            </IconContainer>

            <SignUpButton onClick={() => setCurrentView('signup')}>
              Sign Up Free
            </SignUpButton>

            <LoginButton onClick={() => setCurrentView('login')}>
              Log In
            </LoginButton>

            <ExploreLink onClick={handleClose}>
              Not ready yet? Keep exploring tools
            </ExploreLink>
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