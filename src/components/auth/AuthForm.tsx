import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { supabase } from '@/lib/supabase';
import Image from 'next/image';
import { FiEye, FiEyeOff, FiX, FiCheck } from 'react-icons/fi';
import { createClient } from '@supabase/supabase-js';

const FormContainer = styled.div`
  max-width: 420px;
  width: 100%;
  min-height: 500px;
  display: flex;
  flex-direction: column;
  position: relative;
`;


const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${props => props.theme.colors.text.primary};
  text-align: left;
  margin: 0;
`;

const Subtitle = styled.p`
  font-size: 0.875rem;
  color: ${props => props.theme.colors.text.secondary};
  text-align: left;
  margin-bottom: 3rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
`;

const FormContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
  flex: 1;
  min-height: 0;
`;

const FormFields = styled.div`
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 0.875rem;

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
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: auto;
  padding-top: 1rem;
  position: sticky;
  bottom: 0;
  z-index: 1;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text.primary};
  text-align: left;
  display: block;
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
  margin-top: 0.5rem;
  gap: 1rem;
  width: 100%;
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
  border: 1.5px solid #9aa2b3;
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
  cursor: pointer;
  padding: 0;
  transition: color 0.2s ease;

  &:hover {
    color: ${props => props.theme.colors.primaryDark};
  }
`;

const MessageContainer = styled.div<{ $isSuccess?: boolean }>`
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  gap: 4px;
  color: ${props => props.$isSuccess ? props.theme.colors.success : props.theme.colors.error};
`;

const PasswordInputContainer = styled.div`
  position: relative;
  width: 100%;
`;

const PasswordInput = styled(Input)`
  padding-right: 40px;
  width: 100%;
`;

const ViewPasswordButton = styled.button`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #6b7280;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #374151;
  }
`;

const PasswordInputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const PasswordLabelContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SignUpLink = styled.div`
  text-align: center;
  font-size: 0.875rem;
  color: ${props => props.theme.colors.text.secondary};

  a {
    color: ${props => props.theme.colors.primary};
    text-decoration: none;
    font-weight: 500;
    margin-left: 0.25rem;
    transition: color 0.2s ease;

    &:hover {
      color: ${props => props.theme.colors.primaryDark};
    }
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  margin-bottom: 3rem;
  color: ${props => props.theme.colors.text.secondary};
  font-size: 0.875rem;

  &::before,
  &::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid ${props => props.theme.colors.border};
  }

  &::before {
    margin-right: 1rem;
  }

  &::after {
    margin-left: 1rem;
  }
`;

const GoogleButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.875rem;
  background: transparent;
  border: 1.5px solid ${props => props.theme.colors.border};
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text.primary};
  cursor: pointer;
  transition: all 0.2s ease;
  margin-bottom: 1.5rem;

  &:hover {
    background: #F9FAFB;
    border-color: ${props => props.theme.colors.text.primary};
  }

  &:active {
    transform: scale(0.98);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

interface AuthFormProps {
  onSuccess?: (message: string) => void;
  onError?: (error: string) => void;
  preventRedirect?: boolean;
  hideLinks?: boolean;
  redirectUrl?: string;
}

export default function AuthForm({ onSuccess, onError, preventRedirect = false, hideLinks = false, redirectUrl }: AuthFormProps) {
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [showResetForm, setShowResetForm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [showVerification, setShowVerification] = useState(false);
  const router = useRouter();

  const handleVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const { error: verifyError } = await supabase.auth.verifyOtp({
        email: loginIdentifier,
        token: verificationCode,
        type: 'email'
      });

      if (verifyError) {
        throw verifyError;
      }

      setSuccess('Email verified successfully!');
      
      // If we're in the blueprint modal, stay in the modal
      if (preventRedirect) {
        onSuccess?.('Email verified successfully!');
      } else {
        // Otherwise redirect to login
        router.push('/login');
      }
    } catch (err) {
      console.error('Verification error:', err);
      const errorMessage = err instanceof Error ? err.message : 'An error occurred during verification';
      setError(errorMessage);
      onError?.(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsLoading(true);

    try {
      // Check if the input is a valid email
      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginIdentifier);
      
      let loginEmail = loginIdentifier;
      
      // If not an email, try to get the email from the username
      if (!isEmail) {
        const { data: profile } = await supabase
          .from('user_details')
          .select('email')
          .eq('username', loginIdentifier)
          .single();

        if (!profile) {
          throw new Error('Invalid username or email');
        }
        loginEmail = profile.email;
      }

      // Sign in with email and password
      const { data: { user }, error: signInError } = await supabase.auth.signInWithPassword({
        email: loginEmail,
        password
      });

      if (signInError) {
        // Check if the error is due to unconfirmed email
        if (signInError.message.includes('Email not confirmed')) {
          setShowVerification(true);
          setSuccess('Please verify your email address');
          return;
        }
        throw signInError;
      }

      if (!user) {
        throw new Error('No user found');
      }

      // Get user's role
      const { data: roles } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id);

      if (!roles || roles.length === 0) {
        throw new Error('No role assigned to user');
      }

      const userRoles = roles.map(r => r.role);

      setSuccess('Successfully signed in!');
      onSuccess?.('Successfully signed in!');

      // Only redirect if preventRedirect is false
      if (!preventRedirect) {
        // Redirect based on role immediately
        if (userRoles.includes('admin')) {
          router.push('/admin/dashboard');
        } else if (userRoles.includes('moderator')) {
          router.push('/admin/dashboard');
        } else if (userRoles.includes('user')) {
          router.push('/user/dashboard');
        } else {
          throw new Error('User has no valid role assigned. Please contact support.');
        }
      }
    } catch (err) {
      console.error('Login error:', err);
      const errorMessage = err instanceof Error ? err.message : 'An error occurred during sign in';
      setError(errorMessage);
      onError?.(errorMessage);
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
      const { error } = await supabase.auth.resetPasswordForEmail(loginIdentifier, {
        redirectTo: `${window.location.origin}/admin`,
      });

      if (error) {
        throw error;
      }

      setSuccess('Password reset email sent! Please check your inbox.');
      setLoginIdentifier('');
      setPassword('');
      setShowResetForm(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while sending reset email');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setIsGoogleLoading(true);
      setError(null);

      // Always redirect to the callback URL first
      const callbackUrl = `${window.location.origin}/auth/callback`;
      
      // Get the current URL for redirect
      const currentUrl = redirectUrl || window.location.href;
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: callbackUrl,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
            // Pass the original redirect URL as a parameter
            redirectTo: currentUrl,
            // Pass the source modal type
            from: currentUrl.includes('blueprint-modal') ? 'blueprint-modal' :
                  currentUrl.includes('cost-savings-modal') ? 'cost-savings-modal' :
                  currentUrl.includes('tools-modal') ? 'tools-modal' :
                  currentUrl.includes('readiness-modal') ? 'readiness-modal' :
                  currentUrl.includes('resources-modal') ? 'resources-modal' :
                  currentUrl.includes('role-builder-modal') ? 'role-builder-modal' :
                  currentUrl.includes('quote-modal') ? 'quote-modal' :
                  currentUrl.includes('courses-modal') ? 'courses-modal' : ''
          },
          scopes: 'email profile',
        }
      });

      if (error) {
        throw error;
      }
    } catch (err) {
      console.error('Google sign in error:', err);
      const errorMessage = err instanceof Error ? err.message : 'An error occurred during Google sign in';
      setError(errorMessage);
      onError?.(errorMessage);
    } finally {
      setIsGoogleLoading(false);
    }
  };

  // Add this function to check if the form is valid
  const isFormValid = () => {
    return (
      loginIdentifier &&
      password &&
      password.length >= 8
    );
  };

  if (showVerification) {
    return (
      <FormContainer>
        <Title>Verify Your Email</Title>
        <Subtitle>Please enter the verification code sent to your email</Subtitle>
        <Form onSubmit={handleVerification}>
          <FormContent>
            <FormFields>
              <InputGroup>
                <Label htmlFor="verificationCode">Verification Code</Label>
                <Input
                  id="verificationCode"
                  type="text"
                  placeholder="Enter verification code"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  required
                />
                {error && (
                  <MessageContainer>
                    <FiX size={14} />
                    {error}
                  </MessageContainer>
                )}
              </InputGroup>
            </FormFields>
            <FormActions>
              <ButtonContainer>
                <SecondaryButton type="button" onClick={() => setShowVerification(false)}>
                  Back to Sign In
                </SecondaryButton>
                <Button 
                  type="submit" 
                  disabled={isLoading || !verificationCode}
                >
                  {isLoading ? 'Verifying...' : 'Verify Email'}
                </Button>
              </ButtonContainer>
            </FormActions>
          </FormContent>
        </Form>
      </FormContainer>
    );
  }

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
                    placeholder="your@email.com"
                    value={loginIdentifier}
                    onChange={(e) => setLoginIdentifier(e.target.value)}
                    required
                  />
                </InputGroup>
                {error && (
                  <MessageContainer>
                    <FiX size={14} />
                    {error}
                  </MessageContainer>
                )}
              </FormFields>
              <FormActions>
                <ButtonContainer>
                  <SecondaryButton type="button" onClick={() => setShowResetForm(false)}>
                    Back to Sign In
                  </SecondaryButton>
                  <Button 
                    type="submit" 
                    disabled={isLoading || !loginIdentifier}
                  >
                    {isLoading ? 'Sending Reset Link...' : 'Send Reset Link'}
                  </Button>
                </ButtonContainer>
              </FormActions>
            </FormContent>
          </Form>
        </>
      ) : (
        <>
          <Title>Login</Title>
          <Subtitle>Sign in to your account</Subtitle>
          <GoogleButton 
            onClick={handleGoogleSignIn}
            disabled={isGoogleLoading}
          >
            <img src="/google-icon.svg" alt="Google" width={20} height={20} />
            {isGoogleLoading ? 'Connecting...' : 'Continue with Google'}
          </GoogleButton>
          <Divider>or</Divider>
          <Form onSubmit={handleSubmit}>
            <FormContent>
              <FormFields>
                <InputGroup>
                  <Label htmlFor="loginIdentifier">Username or Email</Label>
                  <Input
                    id="loginIdentifier"
                    type="text"
                    placeholder="Enter your username or email"
                    value={loginIdentifier}
                    onChange={(e) => setLoginIdentifier(e.target.value)}
                    required
                  />
                </InputGroup>
                <InputGroup>
                  <PasswordLabelContainer>
                    <Label htmlFor="password">Password</Label>
                    <ForgotPasswordLink type="button" onClick={() => setShowResetForm(true)}>
                      Forgot Your Password?
                    </ForgotPasswordLink>
                  </PasswordLabelContainer>
                  <PasswordInputGroup>
                    <PasswordInputContainer>
                      <PasswordInput
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <ViewPasswordButton
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                      </ViewPasswordButton>
                    </PasswordInputContainer>
                    {error && (
                      <MessageContainer>
                        <FiX size={14} />
                        {error}
                      </MessageContainer>
                    )}
                  </PasswordInputGroup>
                </InputGroup>
              </FormFields>
              <FormActions>
                <ButtonContainer>
                  <Button 
                    type="submit" 
                    disabled={isLoading || !isFormValid()}
                  >
                    {isLoading ? 'Signing in...' : 'Sign In'}
                  </Button>
                </ButtonContainer>
                {!hideLinks && (
                  <SignUpLink>
                    Don't have an account? <a href="/signup">Sign Up Now</a>
                  </SignUpLink>
                )}
              </FormActions>
            </FormContent>
          </Form>
        </>
      )}
    </FormContainer>
  );
} 