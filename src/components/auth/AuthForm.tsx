import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { supabase } from '@/lib/supabase';
import Image from 'next/image';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { createClient } from '@supabase/supabase-js';

const FormContainer = styled.div`
  max-width: 420px;
  width: 100%;
  height: 500px;
  padding: 2rem;
  background: white;
  border: 1px solid #E5E7EB;
  border-radius: 12px;
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

interface AuthFormProps {
  onSuccess?: () => void;
}

export default function AuthForm({ onSuccess }: AuthFormProps) {
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showResetForm, setShowResetForm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsLoading(true);

    try {
      // Check if the input is a valid email
      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginIdentifier);
      
      let loginEmail = loginIdentifier;
      
      // If it's not an email, try to find the user by username
      if (!isEmail) {
        console.log('Attempting to find user by username:', loginIdentifier);
        
        // Check if service role key is available
        if (!process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY) {
          throw new Error('Service role key is not configured. Please contact support.');
        }

        console.log('Service role key is configured, creating client...');
        
        // Create a service role client for the lookup
        const serviceRoleClient = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY,
          {
            auth: {
              autoRefreshToken: false,
              persistSession: false
            }
          }
        );

        console.log('Querying user_profiles table...');
        // First get the user_id from user_profiles
        const { data: userProfile, error: profileError } = await serviceRoleClient
          .from('user_profiles')
          .select('user_id')
          .eq('username', loginIdentifier)
          .maybeSingle();

        if (profileError) {
          console.error('Profile lookup error:', {
            message: profileError.message,
            details: profileError.details,
            hint: profileError.hint,
            code: profileError.code
          });
          throw new Error('Error looking up username');
        }

        if (!userProfile) {
          console.log('No profile found for username:', loginIdentifier);
          throw new Error('Username not found');
        }

        console.log('Found user profile:', userProfile);

        // Get the user's email using the admin API
        console.log('Getting user email from admin API...');
        const { data: { user }, error: adminError } = await serviceRoleClient.auth.admin.getUserById(userProfile.user_id);

        if (adminError) {
          console.error('Admin API error:', adminError);
          throw new Error('Error looking up user');
        }

        if (!user?.email) {
          console.log('No email found for user_id:', userProfile.user_id);
          throw new Error('User not found');
        }

        console.log('Found user email:', user.email);
        loginEmail = user.email;
      }

      console.log('Attempting to sign in with email:', loginEmail);
      const { error } = await supabase.auth.signInWithPassword({
        email: loginEmail,
        password,
      });

      if (error) {
        console.error('Sign in error:', error);
        throw error;
      }

      setSuccess('Successfully signed in!');
      onSuccess?.();
      router.push('/admin/dashboard');
    } catch (err) {
      console.error('Login error:', err);
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
                  <Label htmlFor="password">Password</Label>
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