import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Modal } from '../ui/Modal';
import { ChartBarIcon } from '@heroicons/react/24/outline';
import SignUpForm from '../auth/SignUpForm';
import AuthForm from '../auth/AuthForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
import { supabase } from '@/lib/supabase';

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
  const [isVerifying, setIsVerifying] = useState(false);
  const router = useRouter();

  // Check URL parameters on mount and after auth redirect
  useEffect(() => {
    if (typeof window !== 'undefined' && router.isReady) {
      const urlParams = new URLSearchParams(window.location.search);
      const fromParam = urlParams.get('from');
      
      if (fromParam === 'readiness-modal') {
        // Remove the parameters from the URL without refreshing
        const newUrl = window.location.pathname;
        router.replace(newUrl, undefined, { 
          shallow: true,
          scroll: false
        });
        
        // Call onAuthSuccess if provided
    if (onAuthSuccess) {
      onAuthSuccess();
    }
      }
    }
  }, [router.isReady, onAuthSuccess]);

  // Get the current URL for OAuth redirect
  const getCurrentUrl = () => {
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      // Add a query parameter to identify this is from the readiness modal
      url.searchParams.set('from', 'readiness-modal');
      // Store the current URL to return to after auth
      const currentPath = window.location.pathname + window.location.search;
      url.searchParams.set('redirectTo', currentPath);
      console.log('OAuth Redirect URL:', url.toString()); // Debug log
      return url.toString();
    }
    return '';
  };

  const handleClose = () => {
    onClose();
    // Reset to initial view after modal is closed
    setTimeout(() => setCurrentView('initial'), 300);
  };

  const handleAuthSuccess = async (message: string) => {
    try {
      console.log('Auth Success:', message); // Debug log
      
      // Call onAuthSuccess if provided
      if (onAuthSuccess) {
        onAuthSuccess();
      }
      
      // Wait for session to be established
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error || !session) {
        console.error('Session not established:', error);
        return;
      }

      console.log('Session established:', session); // Debug log
      
      // Close the auth modal after session is confirmed
      handleClose();
    } catch (err) {
      console.error('Error in handleAuthSuccess:', err);
    }
  };

  const handleAuthError = (error: string | null) => {
    if (error) {
      console.error('Auth error:', error);
    }
  };

  const renderContent = () => {
    switch (currentView) {
      case 'signup':
        return (
          <FormWrapper>
            <SignUpForm 
              onSuccess={handleAuthSuccess} 
              onError={handleAuthError} 
              hideLinks={true} 
              preventRedirect={true}
              redirectUrl={getCurrentUrl()}
              onVerificationStateChange={setIsVerifying}
            />
            {!isVerifying && (
            <BackButton onClick={() => setCurrentView('initial')}>
              <FontAwesomeIcon icon={faArrowLeft} style={{ fontSize: '0.875rem' }} />
                Go Back
            </BackButton>
            )}
          </FormWrapper>
        );
      case 'login':
        return (
          <FormWrapper>
            <AuthForm 
              onSuccess={handleAuthSuccess} 
              onError={handleAuthError} 
              preventRedirect={true} 
              hideLinks={true}
              redirectUrl={getCurrentUrl()}
            />
            <BackButton onClick={() => setCurrentView('initial')}>
              <FontAwesomeIcon icon={faArrowLeft} style={{ fontSize: '0.875rem' }} />
              Go Back
            </BackButton>
          </FormWrapper>
        );
      default:
        return (
          <>
            <Title>Ready to Assess Your Readiness?</Title>
            <Description>
              Create a free account to take the readiness assessment and get personalized recommendations.
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
                Keep exploring
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