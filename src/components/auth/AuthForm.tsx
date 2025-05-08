import React, { useState, useEffect } from 'react';
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

const VerificationContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: space-between;
  margin-top: 1rem;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
`;

const VerificationInput = styled.input`
  flex: 1;
  height: 3.5rem;
  text-align: center;
  font-size: 1.25rem;
  font-weight: 600;
  border: 1.5px solid ${props => props.theme.colors.border};
  border-radius: 8px;
  background: white;
  color: ${props => props.theme.colors.text.primary};
  transition: all 0.2s ease;
  padding: 0;
  min-width: 0;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px ${props => props.theme.colors.primary}15;
  }

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  @media (max-width: 640px) {
    height: 3rem;
    font-size: 1.125rem;
  }
`;

const ResendLink = styled.div`
  text-align: center;
  font-size: 0.875rem;
  color: ${props => props.theme.colors.text.secondary};

  button {
    color: ${props => props.theme.colors.primary};
    text-decoration: none;
    font-weight: 500;
    margin-left: 0.25rem;
    transition: color 0.2s ease;
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;

    &:hover {
      color: ${props => props.theme.colors.primaryDark};
    }

    &:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
  }

  .timer {
    color: ${props => props.theme.colors.primary};
    font-weight: 500;
  }
`;

interface AuthFormProps {
  onSuccess?: (message: string) => void;
  onError?: (error: string) => void;
  preventRedirect?: boolean;
  hideLinks?: boolean;
  redirectUrl?: string;
}

// Add this function at the top level of the file, before the component
const normalizeEmail = (email: string): string => {
    if (!email) return '';
    
    // Convert to lowercase and trim
    const normalized = email.toLowerCase().trim();
    
    // Split into local and domain parts
    const [localPart, domain] = normalized.split('@');
    
    if (!domain) return normalized;
    
    // Handle Gmail addresses
    if (domain === 'gmail.com') {
        // Remove dots and everything after + in the local part
        const cleanLocal = localPart.replace(/\./g, '').split('+')[0];
        return `${cleanLocal}@gmail.com`;
    }
    
    return normalized;
};

// Add email validation function
const isValidEmail = (email: string): boolean => {
    const normalized = normalizeEmail(email);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(normalized);
};

export default function AuthForm({ onSuccess, onError, preventRedirect = false, hideLinks = false, redirectUrl }: AuthFormProps) {
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [showResetForm, setShowResetForm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [verificationCode, setVerificationCode] = useState<string[]>(Array(6).fill(''));
  const [showVerification, setShowVerification] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(0);
  const router = useRouter();

  // Add useEffect for countdown
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (resendCountdown > 0) {
      timer = setInterval(() => {
        setResendCountdown(prev => prev - 1);
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [resendCountdown]);

  const handleVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      let emailToUse = loginIdentifier;

      // If the identifier is not an email, try to find the email by username
      if (!isValidEmail(loginIdentifier)) {
        // Create a client with service role key for admin access
        const serviceRoleClient = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!,
          {
            auth: {
              autoRefreshToken: false,
              persistSession: false
            }
          }
        );

        // Query the user_profiles table to get the user_id
        const { data: profileData, error: profileError } = await serviceRoleClient
          .from('user_profiles')
          .select('user_id')
          .eq('username', loginIdentifier)
          .single();

        if (profileError || !profileData) {
          throw new Error('Invalid username or email');
        }

        // Query the users table to get the email
        const { data: userData, error: userError } = await serviceRoleClient
          .from('users')
          .select('email')
          .eq('id', profileData.user_id)
          .single();

        if (userError || !userData) {
          throw new Error('Invalid username or email');
        }

        emailToUse = userData.email;
      }

      // Normalize email before verification
      const normalizedEmail = normalizeEmail(emailToUse);

      // Join the verification code digits
      const fullCode = verificationCode.join('');

      const { error: verifyError } = await supabase.auth.verifyOtp({
        email: normalizedEmail,
        token: fullCode,
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

  const handleVerificationCodeChange = (index: number, value: string) => {
    // Only allow numbers
    if (!/^\d*$/.test(value)) return;

    // Update the verification code array
    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);

    // Auto-focus next input if value is entered
    if (value && index < 5) {
      const nextInput = document.getElementById(`verification-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleVerificationKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
      const prevInput = document.getElementById(`verification-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsLoading(true);

    try {
      let emailToUse = loginIdentifier;

      // Create a client with service role key for admin access
      const serviceRoleClient = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!,
        {
          auth: {
            autoRefreshToken: false,
            persistSession: false
          }
        }
      );

      // If the identifier is not an email, try to find the email by username
      if (!isValidEmail(loginIdentifier)) {
        // Query the user_profiles table to get the user_id
        const { data: profileData, error: profileError } = await serviceRoleClient
          .from('user_profiles')
          .select('user_id')
          .eq('username', loginIdentifier)
          .single();

        if (profileError || !profileData) {
          throw new Error('Invalid username or email');
        }

        // Query the users table to get the email
        const { data: userData, error: userError } = await serviceRoleClient
          .from('users')
          .select('email')
          .eq('id', profileData.user_id)
          .single();

        if (userError || !userData) {
          throw new Error('Invalid username or email');
        }

        emailToUse = userData.email;
      } else {
        // Check if email exists in users table
        const { data: userData, error: userError } = await serviceRoleClient
          .from('users')
          .select('id')
          .eq('email', normalizeEmail(loginIdentifier))
          .single();

        if (userError || !userData) {
          throw new Error('Invalid username or email');
        }
      }

      // Normalize email before sign in
      const normalizedEmail = normalizeEmail(emailToUse);

      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: normalizedEmail,
        password
      });

      if (signInError) {
        // Check if error is due to unconfirmed email
        if (signInError.message.includes('Email not confirmed')) {
          // Show verification form without error message
          setShowVerification(true);
          return;
        }
        // If we got here, the email/username exists but password is wrong
        throw new Error('Incorrect password');
      }

      if (!data.user) {
        throw new Error('Invalid username or email');
      }

      // Get user's role
      const { data: roles } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', data.user.id);

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
      console.error('Sign in error:', err);
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
      // Validate email format
      if (!isValidEmail(loginIdentifier)) {
        throw new Error('Please enter a valid email address');
      }

      // Normalize email before sending reset
      const normalizedEmail = normalizeEmail(loginIdentifier);

      const { error } = await supabase.auth.resetPasswordForEmail(normalizedEmail, {
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
      
      // Parse the current URL to get the from parameter
      const url = new URL(currentUrl);
      const fromParam = url.searchParams.get('from');
      
      // Create the callback URL with parameters
      const callbackWithParams = new URL(callbackUrl);
      callbackWithParams.searchParams.set('from', fromParam || '');
      callbackWithParams.searchParams.set('redirectTo', currentUrl);

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: callbackWithParams.toString(),
          queryParams: {
            access_type: 'offline',
            prompt: 'consent'
          },
          scopes: 'email profile'
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

  const handleResendCode = async () => {
    if (resendCountdown > 0) return;
    
    setError(null);
    setIsResending(true);

    try {
      // Validate email format
      if (!isValidEmail(loginIdentifier)) {
        throw new Error('Please enter a valid email address');
      }

      // Normalize email before sending
      const normalizedEmail = normalizeEmail(loginIdentifier);

      const { error: resendError } = await supabase.auth.resend({
        type: 'signup',
        email: normalizedEmail,
      });

      if (resendError) {
        throw resendError;
      }

      setSuccess('New verification code sent!');
      setResendCountdown(60); // Start countdown
    } catch (err) {
      console.error('Resend error:', err);
      const errorMessage = err instanceof Error ? err.message : 'An error occurred while resending the code';
      setError(errorMessage);
      onError?.(errorMessage);
    } finally {
      setIsResending(false);
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
                <VerificationContainer>
                  {[...Array(6)].map((_, index) => (
                    <VerificationInput
                      key={index}
                      id={`verification-${index}`}
                  type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={1}
                      value={verificationCode[index] || ''}
                      onChange={(e) => handleVerificationCodeChange(index, e.target.value)}
                      onKeyDown={(e) => handleVerificationKeyDown(index, e)}
                      autoFocus={index === 0}
                    />
                  ))}
                </VerificationContainer>
              </InputGroup>
            </FormFields>
            <FormActions>
              <ButtonContainer>
                {!preventRedirect && (
                <SecondaryButton type="button" onClick={() => setShowVerification(false)}>
                  Back to Sign In
                </SecondaryButton>
                )}
                <Button 
                  type="submit" 
                  disabled={isLoading || verificationCode.join('').length !== 6}
                  style={preventRedirect ? { width: '100%' } : undefined}
                >
                  {isLoading ? 'Verifying...' : 'Verify Email'}
                </Button>
              </ButtonContainer>
              <ResendLink>
                {resendCountdown > 0 ? (
                  <>Please wait <span className="timer">{resendCountdown}s</span> before requesting a new code</>
                ) : (
                  <>Didn't receive the code? <button type="button" onClick={handleResendCode} disabled={isResending || resendCountdown > 0}>{isResending ? 'Sending...' : 'Resend Code'}</button></>
                )}
              </ResendLink>
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