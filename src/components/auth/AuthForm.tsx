import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { supabase } from '@/lib/supabase';
import Image from 'next/image';

const FormContainer = styled.div`
  max-width: 420px;
  width: 100%;
  height: 500px;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  animation: fadeIn 0.3s ease-out;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translate(-50%, -40%);
    }
    to {
      opacity: 1;
      transform: translate(-50%, -50%);
    }
  }
`;

const LogoContainer = styled.div`
  text-align: center;
  margin-bottom: 2.5rem;
`;

const Title = styled.h1`
  font-size: 1.75rem;
  font-weight: 700;
  color: ${props => props.theme.colors.text.primary};
  text-align: center;
  margin: 0;
`;

const Subtitle = styled.p`
  font-size: 0.875rem;
  color: ${props => props.theme.colors.text.secondary};
  text-align: center;
  margin-bottom: 2rem;
  line-height: 1.5;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
`;

const FormContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 0;
`;

const FormFields = styled.div`
  flex: 1;
  overflow-y: auto;
  padding-right: 0.5rem;
  margin-bottom: 0.5rem;
  max-height: calc(100% - 100px);

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: ${props => props.theme.colors.border};
    border-radius: 2px;
  }
`;

const FormActions = styled.div`
  margin-top: auto;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`;

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text.primary};
`;

const Input = styled.input`
  padding: 0.875rem 1rem;
  border: 1.5px solid ${props => props.theme.colors.border};
  border-radius: 8px;
  font-size: 0.875rem;
  background: white;
  color: ${props => props.theme.colors.text.primary};
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px ${props => props.theme.colors.primary}15;
  }

  &::placeholder {
    color: ${props => props.theme.colors.text.secondary};
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const Button = styled.button`
  padding: 0.875rem;
  background: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  flex: 1;

  &:hover {
    background: ${props => props.theme.colors.primaryDark};
  }

  &:active {
    transform: scale(0.98);
  }

  &:disabled {
    background: ${props => props.theme.colors.disabled};
    cursor: not-allowed;
  }
`;

const SecondaryButton = styled(Button)`
  background: transparent;
  border: 1.5px solid ${props => props.theme.colors.border};
  color: ${props => props.theme.colors.text.primary};
  margin-top: 0;

  &:hover {
    background: ${props => props.theme.colors.background.secondary};
    border-color: ${props => props.theme.colors.text.primary};
  }
`;

const ForgotPasswordLink = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.primary};
  font-size: 0.875rem;
  font-weight: 500;
  text-align: center;
  cursor: pointer;
  padding: 0.5rem 0;
  width: 100%;
  transition: color 0.2s ease;
  margin-top: 0.5rem;

  &:hover {
    color: ${props => props.theme.colors.primaryDark};
    text-decoration: underline;
  }
`;

const MessageContainer = styled.div`
  padding: 0.75rem;
  border-radius: 8px;
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const ErrorMessage = styled.div`
  color: ${props => props.theme.colors.error};
  font-size: 0.75rem;
  padding: 0.25rem 0;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  line-height: 1.2;
  margin-top: -0.25rem;

  &::before {
    content: "✕";
    font-size: 0.75rem;
    font-weight: bold;
  }
`;

const SuccessMessage = styled.div`
  color: ${props => props.theme.colors.success};
  font-size: 0.75rem;
  padding: 0.25rem 0;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  line-height: 1.2;
  margin-top: -0.25rem;

  &::before {
    content: "✓";
    font-size: 0.75rem;
    font-weight: bold;
  }
`;

interface AuthFormProps {
  onSuccess?: () => void;
}

export default function AuthForm({ onSuccess }: AuthFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showResetForm, setShowResetForm] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      setSuccess('Successfully signed in!');
      onSuccess?.();
      router.push('/admin/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during sign in');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/admin`,
      });

      if (error) {
        throw error;
      }

      setSuccess('Password reset email sent! Please check your inbox.');
      setEmail('');
      setPassword('');
      setShowResetForm(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while sending reset email');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormContainer>
      {showResetForm ? (
        <>
          <Title>Reset Password</Title>
          <Subtitle>Enter your email address and we'll send you a link to reset your password.</Subtitle>
          <Form onSubmit={handleResetPassword}>
            <FormContent>
              <FormFields>
                <InputGroup>
                  <Label htmlFor="reset-email">Email Address</Label>
                  <Input
                    id="reset-email"
                    type="email"
                    placeholder="you@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </InputGroup>
                {success && <SuccessMessage>{success}</SuccessMessage>}
              </FormFields>
              <FormActions>
                <ButtonContainer>
                  <SecondaryButton type="button" onClick={() => setShowResetForm(false)}>
                    Back to Sign In
                  </SecondaryButton>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? 'Sending Reset Link...' : 'Send Reset Link'}
                  </Button>
                </ButtonContainer>
              </FormActions>
            </FormContent>
          </Form>
        </>
      ) : (
        <>
          <Title>Admin</Title>
          <Subtitle>Sign in to access the ScaleMate admin dashboard</Subtitle>
          <Form onSubmit={handleSubmit}>
            <FormContent>
              <FormFields>
                <InputGroup>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </InputGroup>
                <InputGroup>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </InputGroup>
                {error && <ErrorMessage>{error}</ErrorMessage>}
                {success && <SuccessMessage>{success}</SuccessMessage>}
              </FormFields>
              <FormActions>
                <ButtonContainer>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? 'Signing in...' : 'Sign In'}
                  </Button>
                </ButtonContainer>
                <ForgotPasswordLink type="button" onClick={() => setShowResetForm(true)}>
                  Forgot your password?
                </ForgotPasswordLink>
              </FormActions>
            </FormContent>
          </Form>
        </>
      )}
    </FormContainer>
  );
} 