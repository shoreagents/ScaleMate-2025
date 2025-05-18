import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Modal } from '../../ui/Modal';
import { WrenchScrewdriverIcon } from '@heroicons/react/24/outline';
import SignUpForm from '../../auth/SignUpForm';
import SignInForm from '../../auth/SignInForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
import { supabase } from '@/lib/supabase';

interface ToolsAuthModalProps {
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
  background-color: rgba(74, 222, 128, 0.1);
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
  color: #4ADE80;

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
  background: #4ADE80;
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
    background: #22C55E;
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
  color: #4ADE80;
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
      color: #22C55E;
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
  color: #4ADE80;
  font-weight: 500;
  font-size: 0.875rem;
  text-decoration: none;
  transition: color 0.2s ease;
  &:hover {
    color: #22C55E;
  }
`;

export const ToolsAuthModal = ({ isOpen, onClose, onAuthSuccess }: ToolsAuthModalProps) => {
  const [currentView, setCurrentView] = useState<ModalView>('initial');
  const router = useRouter();

  // Check URL parameters on mount and after auth redirect
  useEffect(() => {
    if (typeof window !== 'undefined' && router.isReady) {
      const urlParams = new URLSearchParams(window.location.search);
      const showModal = urlParams.get('showModal');
      const authSuccess = urlParams.get('authSuccess');
      
      // If we have both showModal and authSuccess parameters
      if (showModal === 'tools-modal' && authSuccess === 'true') {
        // Remove the parameters from the URL
        const newUrl = window.location.pathname;
        router.replace(newUrl, undefined, { shallow: true });
        
        // Call onAuthSuccess if provided
        if (onAuthSuccess) {
          onAuthSuccess();
        }
      }
    }
  }, [router.isReady, router.query, onAuthSuccess]);

  const handleClose = () => {
    onClose();
  };

  // Get the current URL for OAuth redirect
  const getCurrentUrl = () => {
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      // Add a query parameter to identify this is from the tools modal
      url.searchParams.set('from', 'tools-modal');
      // Store the current URL to return to after auth
      const currentPath = window.location.pathname + window.location.search;
      url.searchParams.set('redirectTo', currentPath);
      return url.toString();
    }
    return '';
  };

  const handleAuthSuccess = async () => {
    try {
      // Wait for session to be established
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        console.error('No session found after auth success');
        return;
      }

      // Set URL parameters
      const url = new URL(window.location.href);
      url.searchParams.set('showModal', 'tools-modal');
      url.searchParams.set('authSuccess', 'true');
      
      // Update URL and close modal
      await router.replace(url.toString(), undefined, { shallow: true });
      onClose();
      
      // Call onAuthSuccess if provided
      if (onAuthSuccess) {
        onAuthSuccess();
      }
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
            />
            <BackButton onClick={() => setCurrentView('initial')}>
              <FontAwesomeIcon icon={faArrowLeft} style={{ fontSize: '0.875rem' }} />
              Go Back
            </BackButton>
          </FormWrapper>
        );
      case 'login':
        return (
          <FormWrapper>
            <SignInForm
              onSuccess={handleAuthSuccess}
              onError={handleAuthError}
              hideLinks={true}
              preventRedirect={true}
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
              Create a free account to unlock our full suite of AI-powered tools and resources.
            </Description>

            <IconContainer>
              <IconWrapper>
                <WrenchScrewdriverIcon style={{ width: '2.5rem', height: '2.5rem' }} />
              </IconWrapper>
              <IconText>AI Tools Suite</IconText>
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