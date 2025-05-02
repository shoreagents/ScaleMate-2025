import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faToolbox, faTimes, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../hooks/useAuth';
import { supabase } from '@/lib/supabase';
import { Modal } from '../ui/Modal';

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

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`;

const Input = styled.input`
  padding: 0.75rem 1rem;
  border: 1px solid #E5E7EB;
  border-radius: 0.5rem;
  font-size: 1rem;
  width: 100%;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #3B82F6;
  }
`;

const ErrorMessage = styled.div`
  color: #EF4444;
  font-size: 0.875rem;
  margin-top: 0.5rem;
  text-align: center;
`;

interface ToolsAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: () => void;
}

export const ToolsAuthModal: React.FC<ToolsAuthModalProps> = ({ isOpen, onClose, onAuthSuccess }) => {
  const [view, setView] = useState<'initial' | 'signup' | 'login'>('initial');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { user } = useAuth();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) throw error;
      onAuthSuccess();
    } catch (err) {
      setError('Failed to create account. Please try again.');
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      onAuthSuccess();
    } catch (err) {
      setError('Invalid email or password.');
    }
  };

  const handleClose = () => {
    onClose();
    // Reset to initial view after modal is closed
    setTimeout(() => setView('initial'), 300);
  };

  const renderContent = () => {
    switch (view) {
      case 'signup':
        return (
          <>
            <Title>Create Your Account</Title>
            <Description>
              Join ScaleMate to start building your perfect tool stack.
            </Description>
            <Form onSubmit={handleSignUp}>
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <SignUpButton type="submit">
                Create Account
              </SignUpButton>
              {error && <ErrorMessage>{error}</ErrorMessage>}
            </Form>
            <BackButton onClick={() => setView('initial')}>
              <FontAwesomeIcon icon={faArrowLeft} style={{ fontSize: '0.875rem' }} />
              Back to options
            </BackButton>
          </>
        );
      case 'login':
        return (
          <>
            <Title>Welcome Back</Title>
            <Description>
              Log in to access your saved tools and recommendations.
            </Description>
            <Form onSubmit={handleSignIn}>
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <SignUpButton type="submit">
                Log In
              </SignUpButton>
              {error && <ErrorMessage>{error}</ErrorMessage>}
            </Form>
            <BackButton onClick={() => setView('initial')}>
              <FontAwesomeIcon icon={faArrowLeft} style={{ fontSize: '0.875rem' }} />
              Back to options
            </BackButton>
          </>
        );
      default:
        return (
          <>
            <Title>Build Your Tool Stack</Title>
            <Description>
              Create an account to save tools, get personalized recommendations, and access implementation guides.
            </Description>

            <IconContainer>
              <IconWrapper>
                <FontAwesomeIcon icon={faToolbox} style={{ width: '2.5rem', height: '2.5rem' }} />
              </IconWrapper>
              <IconText>Tool Stack Builder</IconText>
            </IconContainer>

            <SignUpButton onClick={() => setView('signup')}>
              Sign Up Free
            </SignUpButton>

            <LoginButton onClick={() => setView('login')}>
              Log In
            </LoginButton>

            <BackButton onClick={handleClose}>
              Not ready yet? Keep exploring the tools
            </BackButton>
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