import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Modal } from '../ui/Modal';
import { DocumentIcon } from '@heroicons/react/24/outline';
import SignUpForm from '../auth/SignUpForm';
import AuthForm from '../auth/AuthForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useDownloadModal } from './QuoteDownloadModal';
import { useRouter } from 'next/router';
import { supabase } from '../../lib/supabase';

interface QuoteAuthModalProps {
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
  background-color: rgba(59, 130, 246, 0.1);
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
  color: #3B82F6;

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
  background: #3B82F6;
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
    background: #2563EB;
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
  color: #3B82F6;
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
      color: #2563EB;
    }
  }
`;

const ExploreText = styled.span`
  color: #6B7280;
  font-size: 0.875rem;
  margin-right: 0.25rem;

  @media (min-width: 640px) {
  }
`;

const ExploreContainer = styled.div`
  margin-top: 0rem;
`;

const ExploreLink = styled.a`
  color: #3B82F6;
  font-weight: 500;
  font-size: 0.875rem;
  text-decoration: none;
  transition: color 0.2s ease;
  &:hover {
    color: #2563EB;
  }
`;

export const QuoteAuthModal = ({ isOpen, onClose, onAuthSuccess }: QuoteAuthModalProps) => {
  const [currentView, setCurrentView] = useState<ModalView>('initial');
  const [isVerifying, setIsVerifying] = useState(false);
  const { openModal } = useDownloadModal();
  const router = useRouter();

  // Get the current URL for OAuth redirect
  const getCurrentUrl = () => {
    // Get the current URL without any query parameters
    const baseUrl = window.location.href.split('?')[0];
    // Store the current path to return to after auth
    const currentPath = window.location.pathname + window.location.search;
    // Add the callback URL as a query parameter
    return `${baseUrl}?from=blueprint-modal&callback=${encodeURIComponent(currentPath)}`;
  };

  useEffect(() => {
    if (isOpen) {
      // Check for URL parameters when modal opens
      const url = new URL(window.location.href);
      const fromParam = url.searchParams.get('from');
      const callbackUrl = url.searchParams.get('callback');

      if (fromParam === 'blueprint-modal') {
        // Remove the parameters from the URL
        url.searchParams.delete('from');
        url.searchParams.delete('callback');
        router.replace(url.toString());

        // If we have a callback URL, check if it's from login/signup
        if (callbackUrl) {
          const decodedCallback = decodeURIComponent(callbackUrl);
          const path = decodedCallback.split('?')[0]; // Get path without query params

          // If coming from login or signup, redirect to dashboard based on role
          if (path === '/login' || path === '/signup') {
            // Get user role from session
            supabase.auth.getSession().then(({ data: { session } }) => {
              if (session?.user) {
                // Get user role from user_metadata
                const role = session.user.user_metadata?.role || 'user';
                // Redirect to appropriate dashboard
                router.push(`/user/${role}-dashboard`);
              }
            });
          } else {
            // For other pages, redirect back to the original page
            router.push(decodedCallback);
          }
        }
      }
    }
  }, [isOpen, router]);

  const handleGoogleSignIn = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: getCurrentUrl(),
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });

      if (error) throw error;
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  const handleClose = () => {
    onClose();
  };

  const handleDownloadModalClose = () => {
    onClose();
  };

  const handleAuthSuccess = async (message: string) => {
    try {
      console.log('Auth Success:', message); // Debug log
      
      // Close the auth modal first
      onClose();
      
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

      // Show download modal after session is confirmed
      openModal(handleDownloadModalClose);
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
    <>
      <Modal isOpen={isOpen} onClose={handleClose}>
        <Container>
          {renderContent()}
        </Container>
      </Modal>
    </>
  );
};