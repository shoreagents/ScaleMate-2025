import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { supabase } from '@/lib/supabase';
import { FiEye, FiEyeOff, FiLoader, FiCheck, FiX } from 'react-icons/fi';
import { createClient } from '@supabase/supabase-js';

const FormContainer = styled.div`
  max-width: 420px;
  width: 100%;
  display: flex;
  flex-direction: column;

  @media (max-width: 640px) {
    padding: 0;
  }
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

const Divider = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  margin-bottom: 3rem ;
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

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  margin-top: 1.5rem;
  gap: 1rem;
`;

const RequiredAsterisk = styled.span`
  color: #EF4444;
  margin-left: 4px;
`;

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text.primary};
  display: flex;
  align-items: center;
`;

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const PasswordInputWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.875rem 1rem;
  border: 1.5px solid ${props => props.theme.colors.border};
  border-radius: 8px;
  font-size: 0.875rem;
  background: white;
  color: ${props => props.theme.colors.text.primary};
  transition: all 0.2s ease;

  @media (max-width: 640px) {
    width: 100%;
  }

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px ${props => props.theme.colors.primary}15;
  }

  &::placeholder {
    color: ${props => props.theme.colors.text.secondary};
  }
`;

const PasswordToggle = styled.button`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  color: ${props => props.theme.colors.text.secondary};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s ease;
  z-index: 1;

  &:hover {
    color: ${props => props.theme.colors.text.primary};
  }
`;

const HelperText = styled.div`
  font-size: 0.75rem;
  color: #6b7280;
  display: flex;
  align-items: center;
  gap: 4px;
  width: 100%;
`;

const PasswordHelperText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
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
  width: 100%;

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

const SignInLink = styled.div`
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

const FormRow = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;

  @media (max-width: 640px) {
    flex-direction: column;
    gap: 0.875rem;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
  width: 100%;

  @media (max-width: 640px) {
    width: 100%;
  }
`;

const PasswordSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
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

const MessageContainer = styled.div<{ $isSuccess?: boolean }>`
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  gap: 4px;
  color: ${props => props.$isSuccess ? props.theme.colors.success : props.theme.colors.error};
`;

const ErrorMessage = styled.div`
  font-size: 0.75rem;
  color: #EF4444;
  display: flex;
  align-items: center;
  gap: 4px;
  text-align: left;
  width: 100%;
`;

interface SignUpFormProps {
  onSuccess?: (message: string) => void;
  onError?: (error: string | null) => void;
  hideLinks?: boolean;
  preventRedirect?: boolean;
  redirectUrl?: string;
  onVerificationStateChange?: (isVerifying: boolean) => void;
}

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

const isValidEmail = (email: string): boolean => {
  const normalized = normalizeEmail(email);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(normalized);
};

export default function SignUpForm({ onSuccess, onError, hideLinks = false, preventRedirect = false, redirectUrl, onVerificationStateChange }: SignUpFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
    firstName: '',
    lastName: ''
  });
  const [verificationCode, setVerificationCode] = useState<string[]>(Array(6).fill(''));
  const [showVerification, setShowVerification] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [usernameExists, setUsernameExists] = useState<boolean | null>(null);
  const [checkingUsername, setCheckingUsername] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [checkingEmail, setCheckingEmail] = useState(false);
  const [emailExists, setEmailExists] = useState<boolean | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [accountExists, setAccountExists] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(0);

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

  const validateUsername = (value: string) => {
    // Allow empty value for backspace
    if (!value) {
      setUsernameError(null);
      setUsernameExists(null);
      return false;
    }
    if (!/^[a-zA-Z0-9._-]*$/.test(value)) {
      setUsernameError('Special characters are not allowed');
      setUsernameExists(null);
      return false;
    }
    setUsernameError(null);
    checkUsernameExists(value);
    return true;
  };

  const checkUsernameExists = async (username: string) => {
    if (!username) {
      setUsernameExists(null);
      setCheckingUsername(false);
      return;
    }

    try {
      setCheckingUsername(true);
      
      const response = await fetch('/api/auth/check-username', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        console.error('Error checking username:', data.error);
        setUsernameExists(null);
      } else {
        setUsernameExists(data.exists);
      }
    } catch (error) {
      console.error('Error checking username:', error);
      setUsernameExists(null);
    } finally {
      setCheckingUsername(false);
    }
  };

  const validatePasswords = (password: string, confirmPassword: string) => {
    if (!confirmPassword) {
      setPasswordError(null);
      return false;
    }
    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match.');
      return false;
    }
    setPasswordError(null);
    return true;
  };

  const checkEmailExists = async (emailToCheck: string): Promise<boolean> => {
    if (!emailToCheck.trim()) {
      setEmailError(null);
      return false;
    }
    setIsLoading(true);
    try {
      const response = await fetch('/api/auth/check-email-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailToCheck }),
      });
      const data = await response.json();
      setIsLoading(false);
      if (!response.ok) {
        setEmailError(data.message || 'Error checking email.');
        return true; // Indicates an error occurred, consider it as potentially existing or failed check
      }
      if (data.exists) {
        setEmailError('This email address is already in use.');
        return true;
      }
      setEmailError(null);
      return false;
    } catch (err) {
      setIsLoading(false);
      setEmailError('Failed to verify email. Please try again.');
      return true; // Network or other error, consider it as potentially existing
    }
  };

  const setShowVerificationWithCallback = (value: boolean) => {
    setShowVerification(value);
    onVerificationStateChange?.(value);
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

  const handleVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isVerifying) return; // Prevent multiple submissions
    
    setError(null);
    setSuccess(null);
    setIsVerifying(true);
    setIsLoading(true);

    try {
      // Validate email format
      if (!isValidEmail(formData.email)) {
        throw new Error('Please enter a valid email address!');
      }

      // Validate verification code
      if (verificationCode.join('').length !== 6) {
        throw new Error('Please enter the complete verification code!');
      }

      // Normalize email before verification
      const normalizedEmail = normalizeEmail(formData.email);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setEmailError(null);
    setUsernameError(null);
    setPasswordError(null);
    setIsLoading(true);

    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    // Explicitly await the email check
    const emailAlreadyExists = await checkEmailExists(formData.email);
    if (emailAlreadyExists) {
      setIsLoading(false);
      // Error message is set by checkEmailExists, ensure it's displayed
      // Optionally, scroll to the email field or error message
      return;
    }
    
    try {
      // Create user with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email.toLowerCase(),
        password: formData.password,
      });

      if (authError) {
        throw authError;
      }

      if (!authData.user) {
        throw new Error('No user data returned from signup');
      }

      // Create user records using the new API endpoint
      const response = await fetch('/api/auth/create-user-records', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: authData.user.id,
          email: formData.email.toLowerCase(),
          username: formData.username.toLowerCase(),
          firstName: formData.firstName.trim(),
          lastName: formData.lastName.trim(),
          fullName: `${formData.firstName.trim()} ${formData.lastName.trim()}`,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create user records');
      }

      // Show success message and verification form
      setSuccess('Account created successfully! Please verify your email.');
      setError(null);
      setEmailError(null);
      setUsernameError(null);
      setPasswordError(null);
      setShowVerificationWithCallback(true);
      setResendCountdown(60);

      // Store current scroll position before showing verification
      if (preventRedirect) {
        sessionStorage.setItem('scrollPosition', window.scrollY.toString());
      }
    } catch (error) {
      console.error('Error in signup:', error);
      setError(error instanceof Error ? error.message : 'An error occurred during signup');
      onError?.(error instanceof Error ? error.message : 'An error occurred during signup');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === 'username') {
      validateUsername(value);
    }

    if (name === 'email') {
      // Remove real-time email validation
      setEmailError(null);
      setEmailExists(null);
    }

    // Check password match when either password field changes
    if (name === 'password' || name === 'confirmPassword') {
      validatePasswords(
        name === 'password' ? value : formData.password,
        name === 'confirmPassword' ? value : formData.confirmPassword
      );
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
    setSuccess(null);
    setIsResending(true);

    try {
      // Validate email format
      if (!isValidEmail(formData.email)) {
        throw new Error('Please enter a valid email address!');
      }

      // Normalize email before sending
      const normalizedEmail = normalizeEmail(formData.email);

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

      setSuccess('New verification code sent!');
      setError(null);
      setResendCountdown(60); // Start countdown
    } catch (err) {
      console.error('Resend error:', err);
      const errorMessage = err instanceof Error ? err.message : 'An error occurred while resending the code';
      setError(errorMessage);
      setSuccess(null);
      onError?.(errorMessage);
    } finally {
      setIsResending(false);
    }
  };

  // Add this function to check if the form is valid
  const isFormValid = () => {
    return (
      formData.email &&
      formData.password &&
      formData.confirmPassword &&
      formData.username &&
      formData.firstName &&
      formData.lastName &&
      !usernameError &&
      !usernameExists &&
      !passwordError &&
      formData.password.length >= 8 &&
      formData.password === formData.confirmPassword
    );
  };

  const validateForm = () => {
    return isFormValid();
  };

  if (showVerification) {
    return (
      <FormContainer>
        <Title>Verify Your Email</Title>
        <Subtitle>Please enter the verification code sent to your email</Subtitle>
        <Form onSubmit={handleVerification}>
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
                  disabled={isVerifying}
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
          <ButtonContainer>
            <Button 
              type="submit" 
              disabled={isVerifying || verificationCode.some(code => !code)}
              style={preventRedirect ? { width: '100%' } : undefined}
            >
              {isVerifying || isLoading ? 'Verifying...' : 'Verify Email'}
            </Button>
          </ButtonContainer>
          <ResendLink>
            {resendCountdown > 0 ? (
              <>Please wait <span className="timer">{resendCountdown}s</span> before requesting a new code</>
            ) : (
              <>Didn't receive the code? <button 
                type="button" 
                onClick={handleResendCode} 
                disabled={isResending || resendCountdown > 0 || isVerifying}
              >
                {isResending ? 'Sending...' : 'Resend Code'}
              </button></>
            )}
          </ResendLink>
        </Form>
      </FormContainer>
    );
  }

  return (
    <FormContainer>
      <Title>Create Account</Title>
      <Subtitle>Sign up to get started with ScaleMate</Subtitle>
      <GoogleButton 
        onClick={handleGoogleSignIn}
        disabled={isGoogleLoading}
      >
        <img src="/google-icon.svg" alt="Google" width={20} height={20} />
        {isGoogleLoading ? 'Connecting...' : 'Continue with Google'}
      </GoogleButton>
      <Divider>or</Divider>
      <Form onSubmit={handleSubmit}>
        <FormRow>
          <FormGroup>
            <Label htmlFor="firstName">
              First Name
              <RequiredAsterisk>*</RequiredAsterisk>
            </Label>
            <Input
              id="firstName"
              name="firstName"
              type="text"
              placeholder="Enter your first name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="lastName">
              Last Name
              <RequiredAsterisk>*</RequiredAsterisk>
            </Label>
            <Input
              id="lastName"
              name="lastName"
              type="text"
              placeholder="Enter your last name"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </FormGroup>
        </FormRow>
        <InputGroup>
          <Label htmlFor="username">
            Username
            <RequiredAsterisk>*</RequiredAsterisk>
          </Label>
          <InputWrapper>
            <Input
              id="username"
              name="username"
              type="text"
              placeholder="Choose a username"
              value={formData.username}
              onChange={handleChange}
              required
              aria-describedby="username-error"
            />
            {usernameError && <ErrorMessage id="username-error"><FiX size={14} /> {usernameError}</ErrorMessage>}
            {checkingUsername && (
              <HelperText style={{ color: '#6b7280' }}>
                <FiLoader size={14} />
                Checking username...
              </HelperText>
            )}
            {!checkingUsername && !usernameError && usernameExists === false && (
              <HelperText style={{ color: '#059669' }}>
                <FiCheck size={14} />
                Username is available!
              </HelperText>
            )}
            {!checkingUsername && !usernameError && usernameExists === true && (
              <HelperText style={{ color: '#dc2626' }}>
                <FiX size={14} />
                Username is already taken!
              </HelperText>
            )}
          </InputWrapper>
        </InputGroup>
        <InputGroup>
          <Label htmlFor="email">
            Email
            <RequiredAsterisk>*</RequiredAsterisk>
          </Label>
          <InputWrapper>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              aria-describedby="email-error"
            />
            {emailError && <ErrorMessage id="email-error"><FiX size={14} /> {emailError}</ErrorMessage>}
            {checkingEmail && (
              <HelperText style={{ color: '#6b7280' }}>
                <FiLoader size={14} />
                Checking email...
              </HelperText>
            )}
            {!checkingEmail && !emailError && emailExists === false && (
              <HelperText style={{ color: '#059669' }}>
                <FiCheck size={14} />
                Email is available
              </HelperText>
            )}
            {!checkingEmail && !emailError && emailExists === true && (
              <HelperText style={{ color: '#dc2626' }}>
                <FiX size={14} />
                Email is already registered
              </HelperText>
            )}
          </InputWrapper>
        </InputGroup>
        <PasswordSection>
          <FormRow>
            <FormGroup>
              <Label htmlFor="password">
                Password
                <RequiredAsterisk>*</RequiredAsterisk>
              </Label>
              <InputWrapper>
                <PasswordInputWrapper>
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    aria-describedby="password-error"
                  />
                  <PasswordToggle
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                  </PasswordToggle>
                </PasswordInputWrapper>
              </InputWrapper>
            </FormGroup>
            <FormGroup>
              <Label htmlFor="confirmPassword">
                Confirm Password
                <RequiredAsterisk>*</RequiredAsterisk>
              </Label>
              <InputWrapper>
                <PasswordInputWrapper>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    aria-describedby="confirm-password-error"
                  />
                  <PasswordToggle
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                  >
                    {showConfirmPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                  </PasswordToggle>
                </PasswordInputWrapper>
              </InputWrapper>
            </FormGroup>
          </FormRow>
          <FormRow>
            <FormGroup>
              <PasswordHelperText>
                {formData.password && (
                  <HelperText style={{ color: formData.password.length >= 8 ? '#059669' : '#dc2626' }}>
                    {formData.password.length >= 8 ? <FiCheck size={14} /> : <FiX size={14} />}
                    {formData.password.length >= 8 ? 'Password length is valid.' : 'Password must be at least 8 characters.'}
                  </HelperText>
                )}
                {formData.confirmPassword && (
                  passwordError ? (
                    <HelperText style={{ color: '#dc2626' }}>
                      <FiX size={14} />
                      {passwordError}
                    </HelperText>
                  ) : (
                    <HelperText style={{ color: '#059669' }}>
                      <FiCheck size={14} />
                      Passwords match!
                    </HelperText>
                  )
                )}
              </PasswordHelperText>
            </FormGroup>
          </FormRow>
        </PasswordSection>
        <ButtonContainer>
          <Button 
            type="submit" 
            disabled={isLoading || !isFormValid()}
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </Button>
        </ButtonContainer>
        {!hideLinks && (
          <SignInLink>
            Already have an account? <a href="/login">Sign In</a>
          </SignInLink>
        )}
      </Form>
    </FormContainer>
  );
} 