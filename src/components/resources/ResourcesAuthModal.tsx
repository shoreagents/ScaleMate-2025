import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileArrowDown } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../hooks/useAuth';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  width: 90%;
  max-width: 32rem;
  position: relative;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #6B7280;
  padding: 0.5rem;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.375rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: #F3F4F6;
  }
`;

const IconWrapper = styled.div`
  width: 3rem;
  height: 3rem;
  background-color: #F472B6;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
`;

const Icon = styled(FontAwesomeIcon)`
  font-size: 1.5rem;
  color: white;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #0F172A;
  text-align: center;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  color: rgba(15, 23, 42, 0.7);
  text-align: center;
  margin-bottom: 2rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Button = styled.button<{ primary?: boolean }>`
  width: 100%;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border: 1px solid ${({ primary }) => (primary ? '#F472B6' : '#E5E7EB')};
  background-color: ${({ primary }) => (primary ? '#F472B6' : 'white')};
  color: ${({ primary }) => (primary ? 'white' : '#0F172A')};

  &:hover {
    background-color: ${({ primary }) => (primary ? '#EC4899' : '#F9FAFB')};
    border-color: ${({ primary }) => (primary ? '#EC4899' : '#D1D5DB')};
  }
`;

const ErrorMessage = styled.div`
  color: #DC2626;
  text-align: center;
  margin-top: 1rem;
  font-size: 0.875rem;
`;

interface ResourcesAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess?: () => void;
}

export const ResourcesAuthModal: React.FC<ResourcesAuthModalProps> = ({
  isOpen,
  onClose,
  onAuthSuccess
}) => {
  const [view, setView] = useState<'initial' | 'signup' | 'login'>('initial');
  const [error, setError] = useState<string | null>(null);
  const { signUp, signIn } = useAuth();

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      await signUp(email, password);
      onAuthSuccess?.();
      onClose();
    } catch (err) {
      setError('Failed to create account. Please try again.');
    }
  };

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      await signIn(email, password);
      onAuthSuccess?.();
      onClose();
    } catch (err) {
      setError('Invalid email or password.');
    }
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <CloseButton onClick={onClose}>×</CloseButton>
        
        <IconWrapper>
          <Icon icon={faFileArrowDown} />
        </IconWrapper>

        {view === 'initial' && (
          <>
            <Title>Unlock Premium Resources</Title>
            <Description>
              Create a free account to access our complete library of templates, guides, and playbooks.
            </Description>
            <ButtonGroup>
              <Button primary onClick={() => setView('signup')}>
                Create Free Account
              </Button>
              <Button onClick={() => setView('login')}>
                Sign In
              </Button>
            </ButtonGroup>
          </>
        )}

        {view === 'signup' && (
          <form onSubmit={handleSignUp}>
            <Title>Create Your Account</Title>
            <Description>
              Get instant access to all our premium resources.
            </Description>
            <ButtonGroup>
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  borderRadius: '0.5rem',
                  border: '1px solid #E5E7EB',
                  marginBottom: '1rem'
                }}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                required
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  borderRadius: '0.5rem',
                  border: '1px solid #E5E7EB',
                  marginBottom: '1rem'
                }}
              />
              <Button primary type="submit">
                Create Account
              </Button>
              <Button type="button" onClick={() => setView('login')}>
                Already have an account? Sign In
              </Button>
            </ButtonGroup>
            {error && <ErrorMessage>{error}</ErrorMessage>}
          </form>
        )}

        {view === 'login' && (
          <form onSubmit={handleSignIn}>
            <Title>Welcome Back</Title>
            <Description>
              Sign in to access your resources.
            </Description>
            <ButtonGroup>
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  borderRadius: '0.5rem',
                  border: '1px solid #E5E7EB',
                  marginBottom: '1rem'
                }}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                required
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  borderRadius: '0.5rem',
                  border: '1px solid #E5E7EB',
                  marginBottom: '1rem'
                }}
              />
              <Button primary type="submit">
                Sign In
              </Button>
              <Button type="button" onClick={() => setView('signup')}>
                Need an account? Sign Up
              </Button>
            </ButtonGroup>
            {error && <ErrorMessage>{error}</ErrorMessage>}
          </form>
        )}
      </ModalContent>
    </ModalOverlay>
  );
}; 