import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { supabase } from '@/lib/supabase';
import Image from 'next/image';
import { FiEye, FiEyeOff, FiX, FiCheck } from 'react-icons/fi';
import { createClient } from '@supabase/supabase-js';
import ResetPasswordForm from './ResetPasswordForm';

const FormContainer = styled.div`
  max-width: 420px;
  width: 100%;
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
  gap: 1rem;
  flex: 1;
  min-height: 0;
`;

const FormFields = styled.div`
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;

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
  padding-top: 1.5rem;
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

const MessageContainer = styled.div<{ $isSuccess?: boolean }>`
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  gap: 4px;
  color: ${props => props.$isSuccess ? props.theme.colors.success : props.theme.colors.error};
`;

// Add ResetPasswordInputGroup after MessageContainer
const ResetPasswordInputGroup = styled(InputGroup)`
  gap: 0.5rem;


`;

const ButtonContainer = styled.div`
  display: flex;
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
  onSuccess?: (message?: string) => void;
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
  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [verificationCode, setVerificationCode] = useState<string[]>(Array(6).fill(''));
  const [showVerification, setShowVerification] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(0);
  const [isVerifying, setIsVerifying] = useState(false);
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
    if (isVerifying) return; // Prevent multiple submissions
    
    setError(null);
    setSuccess(null);
    setIsVerifying(true);
    setIsLoading(true);

    try {
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

      let emailToUse = loginIdentifier;

      // If the identifier is not an email, try to find the email by username
      if (!isValidEmail(loginIdentifier)) {
        // Query the user_profiles table to get the user_id
        const { data: profileData, error: profileError } = await serviceRoleClient
          .from('user_profiles')
          .select('user_id')
          .eq('username', loginIdentifier)
          .single();

        if (profileError || !profileData) {
          throw new Error('Invalid login credentials');
        }

        // Query the users table to get the email
        const { data: userData, error: userError } = await serviceRoleClient
          .from('users')
          .select('email')
          .eq('id', profileData.user_id)
          .single();

        if (userError || !userData) {
          throw new Error('Invalid login credentials');
        }

        emailToUse = userData.email;
      }

      // Validate verification code
      if (verificationCode.join('').length !== 6) {
        throw new Error('Please enter the complete verification code!');
      }

      // Normalize email before verification
      const normalizedEmail = normalizeEmail(emailToUse);

      // Join the verification code digits
      const fullCode = verificationCode.join('');

      // Verify OTP and sign in in one step
      const { data, error: verifyError } = await supabase.auth.verifyOtp({
        email: normalizedEmail,
        token: fullCode,
        type: 'email'
      });

      if (verifyError) {
        // Handle specific error cases
        if (verifyError.message.includes('Invalid OTP')) {
          throw new Error('Token has expired or is invalid!');
        } else if (verifyError.message.includes('expired')) {
          throw new Error('Token has expired or is invalid!');
        } else {
        throw verifyError;
      }
      }

      if (!data.user) {
        throw new Error('No user data returned from verification');
      }

      // Get the current URL and its parameters
      const currentUrl = redirectUrl || window.location.pathname;
      const url = new URL(currentUrl, window.location.origin);
      
      // When preventRedirect is true, we want to go back to the original page
      // that opened the modal, not the current page
      const redirectTo = preventRedirect 
        ? url.searchParams.get('redirectTo') || window.location.pathname
        : window.location.pathname;

      // Preserve the specific modal type if it exists, otherwise use 'modal' for preventRedirect
      const fromParam = url.searchParams.get('from') || 'role-builder-modal';

      if (preventRedirect) {
        // For modal flow, update URL parameters and close modal
        const url = new URL(window.location.href);
        url.searchParams.set('showModal', fromParam);
        url.searchParams.set('authSuccess', 'true');
        
        // Store current scroll position before redirect
        sessionStorage.setItem('scrollPosition', window.scrollY.toString());
        
        // Update URL and trigger success callback
        await router.replace(url.toString(), undefined, { shallow: true });
        onSuccess?.('Email verified successfully');
      } else {
        // For direct flow, redirect to dashboard
        router.push('/user/dashboard');
      }

      return; // Don't reset states since we're redirecting
    } catch (err) {
      console.error('Verification error:', err);
      const errorMessage = err instanceof Error ? err.message : 'An error occurred during verification';
      setError(errorMessage);
      onError?.(errorMessage);
      setVerificationCode(Array(6).fill(''));
      // Only reset states on error
      setIsVerifying(false);
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
          .eq('username', loginIdentifier.toLowerCase())
          .single();

        if (profileError || !profileData) {
          throw new Error('Invalid login credentials');
        }

        // Query the users table to get the email
        const { data: userData, error: userError } = await serviceRoleClient
          .from('users')
          .select('email')
          .eq('id', profileData.user_id)
          .single();

        if (userError || !userData) {
          throw new Error('Invalid login credentials');
        }

        emailToUse = userData.email;
      }

      // Normalize email before sign in
      const normalizedEmail = normalizeEmail(emailToUse);

      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: normalizedEmail,
        password
      });

      if (signInError) {
        // If email is not confirmed, show verification form
        if (signInError.message.includes('Email not confirmed')) {
          setShowVerification(true);
          // Automatically trigger resend of verification code
          await supabase.auth.resend({
            type: 'signup',
            email: normalizedEmail,
          });
          setResendCountdown(60); // Start countdown
          return;
        }
        throw signInError;
      }

      if (!data.user) {
        throw new Error('No user data returned from sign in');
      }

      // Get the current URL and its parameters
      const currentUrl = redirectUrl || window.location.pathname;
      const url = new URL(currentUrl, window.location.origin);
      
      // When preventRedirect is true, we want to go back to the original page
      // that opened the modal, not the current page
      const redirectTo = preventRedirect 
        ? url.searchParams.get('redirectTo') || window.location.pathname
        : window.location.pathname;

      // Preserve the specific modal type if it exists, otherwise use 'modal' for preventRedirect
      const fromParam = url.searchParams.get('from') || 'role-builder-modal';

      if (preventRedirect) {
        // For modal flow, update URL parameters and close modal
        const url = new URL(window.location.href);
        url.searchParams.set('showModal', fromParam);
        url.searchParams.set('authSuccess', 'true');
        
        // Store current scroll position before redirect
        sessionStorage.setItem('scrollPosition', window.scrollY.toString());
        
        // Update URL and trigger success callback
        await router.replace(url.toString(), undefined, { shallow: true });
        onSuccess?.('Signed in successfully');
        } else {
        // For direct flow, redirect to dashboard
        router.push('/user/dashboard');
        }

      return; // Don't reset states since we're redirecting
    } catch (err) {
      console.error('Sign in error:', err);
      const errorMessage = err instanceof Error ? err.message : 'An error occurred during sign in';
      setError(errorMessage);
      onError?.(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    setError(null);

    try {
      // Get the current URL and its parameters
      const currentUrl = redirectUrl || window.location.pathname;
      const url = new URL(currentUrl, window.location.origin);
      
      // When preventRedirect is true, we want to go back to the original page
      // that opened the modal, not the current page
      const redirectTo = preventRedirect 
        ? url.searchParams.get('redirectTo') || window.location.pathname
        : window.location.pathname;

      // Preserve the specific modal type if it exists, otherwise use 'modal' for preventRedirect
      const fromParam = url.searchParams.get('from') || 'role-builder-modal';

      // Choose callback based on context
      const callbackBase = preventRedirect ? '/auth/callback/modal' : '/auth/callback/direct';
      const callbackUrl = new URL(`${window.location.origin}${callbackBase}`);
      
      if (preventRedirect) {
        callbackUrl.searchParams.set('from', fromParam);
        callbackUrl.searchParams.set('redirectTo', redirectTo);
        // Store current scroll position before redirect
        sessionStorage.setItem('scrollPosition', window.scrollY.toString());
      }

      // Add email normalization state to the callback URL
      callbackUrl.searchParams.set('normalizeEmail', 'true');

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: callbackUrl.toString(),
          queryParams: {
            access_type: 'offline',
            prompt: 'consent'
          },
          scopes: 'email profile openid'
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

      let emailToUse = loginIdentifier;

      // If the identifier is not an email, try to find the email by username
      if (!isValidEmail(loginIdentifier)) {
        // Query the user_profiles table to get the user_id
        const { data: profileData, error: profileError } = await serviceRoleClient
          .from('user_profiles')
          .select('user_id')
          .eq('username', loginIdentifier)
          .single();

        if (profileError || !profileData) {
          throw new Error('Invalid login credentials');
        }

        // Query the users table to get the email
        const { data: userData, error: userError } = await serviceRoleClient
          .from('users')
          .select('email')
          .eq('id', profileData.user_id)
          .single();

        if (userError || !userData) {
          throw new Error('Invalid login credentials');
        }

        emailToUse = userData.email;
      }

      // Normalize email before sending
      const normalizedEmail = normalizeEmail(emailToUse);

      const { error: resendError } = await supabase.auth.resend({
        type: 'signup',
        email: normalizedEmail,
      });

      if (resendError) {
        // Handle specific error cases
        if (resendError.message.includes('rate limit') || resendError.message.includes('For security purposes')) {
          throw new Error('Please wait a few minutes before requesting a new code.');
        } else {
        throw resendError;
        }
      }

      // Remove success message since we're redirecting
      onSuccess?.('Verification code sent');
      setError(null);
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

  // Add the handleResetPassword function
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      // Validate email format
      if (!isValidEmail(loginIdentifier)) {
        throw new Error('Please enter a valid email address!');
      }

      // Normalize email before sending reset
      const normalizedEmail = normalizeEmail(loginIdentifier);

      const { error } = await supabase.auth.resetPasswordForEmail(normalizedEmail);

      if (error) {
        console.log('Reset password error:', error);
        if (error.status === 429 || 
            error.message.toLowerCase().includes('too many requests') ||
            error.message.toLowerCase().includes('rate limit') ||
            error.message.toLowerCase().includes('security')) {
          const rateLimitMessage = 'Too many attempts! Please wait a few minutes before trying again.';
          setError(rateLimitMessage);
          onError?.(rateLimitMessage);
          return;
        }
        throw error;
      }

      // Show success message
      onSuccess?.('Reset email sent');
      
      // Store email and show reset password modal
      setResetEmail(normalizedEmail);
      setShowResetForm(false);
      setShowResetPasswordModal(true);
      setResendCountdown(60); // Start countdown timer
    } catch (err) {
      console.error('Reset password error:', err);
      const errorMessage = err instanceof Error ? err.message : 'An error occurred while sending reset email';
      if (errorMessage.toLowerCase().includes('too many requests') ||
          errorMessage.toLowerCase().includes('rate limit') ||
          errorMessage.toLowerCase().includes('security')) {
        const rateLimitMessage = 'Too many attempts! Please wait a few minutes before trying again.';
        setError(rateLimitMessage);
        onError?.(rateLimitMessage);
      } else {
        setError(errorMessage);
        onError?.(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToSignIn = () => {
    setShowResetForm(false);
    setError(null);
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
                {!preventRedirect && (
                  <SecondaryButton type="button" onClick={() => {
                    setShowVerification(false);
                    setError(null);
                    setVerificationCode(Array(6).fill(''));
                  }}>
                  Back to Sign In
                </SecondaryButton>
                )}
                <Button 
                  type="submit" 
                  disabled={isLoading || verificationCode.join('').length !== 6 || isVerifying}
                  style={preventRedirect ? { width: '100%' } : undefined}
                >
                  {isVerifying || isLoading ? 'Verifying...' : 'Verify Email'}
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
          <Subtitle>Enter your email to receive a verification code</Subtitle>
          <Form onSubmit={handleResetPassword}>
            <FormContent>
              <FormFields>
                <ResetPasswordInputGroup>
                  <Label htmlFor="loginIdentifier">Email</Label>
                  <Input
                    id="loginIdentifier"
                    type="text"
                    placeholder="Enter your email"
                    value={loginIdentifier}
                    onChange={(e) => setLoginIdentifier(e.target.value)}
                    required
                  />
                  {(error || success) && (
                    <MessageContainer $isSuccess={!!success}>
                      {success ? <FiCheck size={14} /> : <FiX size={14} />}
                      {success || error}
                  </MessageContainer>
                )}
                </ResetPasswordInputGroup>
              </FormFields>
              <FormActions>
                <ButtonContainer>
                  <SecondaryButton type="button" onClick={handleBackToSignIn}>
                    Back to Sign In
                  </SecondaryButton>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? 'Sending...' : 'Send Reset Link'}
                  </Button>
                </ButtonContainer>
              </FormActions>
            </FormContent>
          </Form>
        </>
      ) : showResetPasswordModal ? (
        <ResetPasswordForm 
          email={resetEmail}
          onSuccess={() => {
            setShowResetPasswordModal(false);
            setSuccess('Password updated successfully!');
            onSuccess?.();
          }}
          onError={(error) => {
            setError(error);
            onError?.(error);
          }}
        />
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
                    onChange={(e) => {
                      setLoginIdentifier(e.target.value);
                      setSuccess(null);
                    }}
                    required
                  />
                </InputGroup>
                <InputGroup>
                  <PasswordLabelContainer>
                    <Label htmlFor="password">Password</Label>
                    <ForgotPasswordLink type="button" onClick={() => {
                      setShowResetForm(true);
                      setError(null);
                      setSuccess(null);
                    }}>
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
                        onChange={(e) => {
                          setPassword(e.target.value);
                          setSuccess(null);
                        }}
                        required
                      />
                      <ViewPasswordButton
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                      </ViewPasswordButton>
                    </PasswordInputContainer>
                  </PasswordInputGroup>
                  {(error || success) && (
                    <MessageContainer $isSuccess={!!success}>
                      {success ? <FiCheck size={14} /> : <FiX size={14} />}
                      {success || error}
                      </MessageContainer>
                    )}
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