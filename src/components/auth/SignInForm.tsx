import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { FiEye, FiEyeOff, FiCheck, FiX, FiLoader } from 'react-icons/fi';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

// Define protected routes and their required roles
const PROTECTED_ROUTES = {
  '/admin': ['admin'],
  '/admin/dashboard': ['admin'],
  '/user/dashboard': ['user', 'admin'],
  '/profile': ['user', 'admin'],
  '/settings': ['user', 'admin'],
} as const;

const FormContainer = styled.div`
  max-width: 420px;
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;

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

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
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
  margin-top: auto;
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
  border: 1.5px solid ${props => props.theme.colors.border || '#D1D5DB'};
  color: ${props => props.theme.colors.text.primary || '#1F2937'};

  &:hover {
    background: ${props => props.theme.colors.background.secondary || '#F3F4F6'};
    border-color: ${props => props.theme.colors.text.primary || '#1F2937'};
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

const FormRow = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;
  @media (max-width: 640px) {
    flex-direction: column;
    gap: 0.875rem;
  }
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

const PasswordToggle = styled.button`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
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

  svg {
    width: 18px;
    height: 18px;
    object-fit: contain;
    display: block;
    flex-shrink: 0;
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

const ButtonContainer = styled.div`
  display: flex;
  margin-top: 1.5rem;
  gap: 1rem;
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
    background: none;
    border: none;
    cursor: pointer;
    transition: color 0.2s ease;

    &:hover {
      color: ${props => props.theme.colors.primaryDark};
    }
    &:disabled {
      color: ${props => props.theme.colors.text.secondary};
      cursor: not-allowed;
    }
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

const AnimatedDots = styled.span`
  @keyframes ellipsis {
    0% { content: '. '; }
    33% { content: '. . '; }
    66% { content: '. . . '; }
    100% { content: '. '; }
  }
  &::after {
    content: '. ';
    animation: ellipsis 1.5s infinite;
    display: inline-block;
    width: 2em;
    text-align: left;
    margin-left: 0.25em;
  }
`;

export interface SignInFormProps {
  onSuccess?: () => Promise<void>;
  onError?: (error: string | null) => void;
  hideLinks?: boolean;
  preventRedirect?: boolean;
  redirectUrl?: string;
}

const SignInForm = ({
  onSuccess,
  onError,
  hideLinks = false,
  preventRedirect = false,
  redirectUrl = '/dashboard'
}: SignInFormProps): React.ReactElement => {
  const router = useRouter();
  const { refreshProfile } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const otpInputs = useRef<(HTMLInputElement | null)[]>([]);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [verifyingEmail, setVerifyingEmail] = useState('');
  const [otpError, setOtpError] = useState('');
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [isResendingOtp, setIsResendingOtp] = useState(false);
  const [resendOtpMessage, setResendOtpMessage] = useState('');
  const [resendCooldown, setResendCooldown] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    if (resendCooldown > 0) {
      timer = setInterval(() => {
        setResendCooldown((prev) => prev - 1);
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [resendCooldown]);

  const handleSubmit = async () => {
    if (isLoading) return;
    setIsLoading(true);
    setError(null);
    setSuccess(null);
    setOtpError('');
    setResendOtpMessage('');

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        if (error.message.toLowerCase().includes('confirm')) {
          setIsOtpSent(true);
          setVerifyingEmail(email);
          setSuccess(null);
          setError(null);
          setOtp(['', '', '', '', '', '']);
          setResendCooldown(60);
          return;
        }
        throw error;
      }

      if (data.session) {
        setSuccess('Successfully signed in!');
        await refreshProfile();
        
        if (onSuccess) {
          await onSuccess();
        }

        if (!preventRedirect) {
          // Get user's role from profiles table
          const { data: userData, error: roleError } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', data.user.id)
            .single();

          if (roleError) {
            console.error('Error fetching user role:', roleError);
            throw new Error('Error fetching user role');
          }

          // Get the redirectTo parameter from the URL if it exists
          const redirectTo = router.query.redirectTo as string;
          
          // If we have a redirectTo parameter and the user has the right role, use it
          if (redirectTo) {
            const route = Object.keys(PROTECTED_ROUTES).find(route => 
              redirectTo.startsWith(route)
            );
            
            if (route && PROTECTED_ROUTES[route as keyof typeof PROTECTED_ROUTES].includes(userData?.role || '')) {
              router.push(redirectTo);
              return;
            }
          }

          // Otherwise, redirect based on role
          if (userData?.role === 'admin') {
            router.push('/admin/dashboard');
          } else {
            router.push('/user/dashboard');
          }
        }
      } else {
        throw new Error('Sign in failed');
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
      if (onError) {
        onError(err.message || 'An unexpected error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    setError('');
    setSuccess('');

    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}`
        }
      });

      if (error) {
        setError(error.message);
        if (onError) {
          onError(error.message);
        }
      }
    } catch (err: any) {
      setError('An unexpected error occurred. Please try again.');
      if (onError) {
        onError(err.message || 'An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) value = value.slice(0, 1);
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setOtpError('');
    if (value && index < 5) {
      otpInputs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpInputs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    const newOtp = [...otp];
    for (let i = 0; i < pastedData.length; i++) {
      if (i < 6) {
        newOtp[i] = pastedData[i];
      }
    }
    setOtp(newOtp);
    otpInputs.current[pastedData.length - 1]?.focus();
  };

  const handleVerifyOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifyingOtp(true);
    setOtpError('');
    setResendOtpMessage('');
    const otpString = otp.join('');
    if (otpString.length !== 6) {
      setOtpError('Please enter a valid 6-digit verification code.');
      setIsVerifyingOtp(false);
      return;
    }
    try {
      const { data, error: verifyError } = await supabase.auth.verifyOtp({
        email: verifyingEmail,
        token: otpString,
        type: 'signup',
      });
      if (verifyError) {
        setOtpError(verifyError.message);
      } else if (data.user && data.session) {
        setSuccess('Email verified! You are now signed in.');
        await refreshProfile();
        
        if (!preventRedirect) {
          // Get user's role from profiles table
          const { data: userData, error: roleError } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', data.user.id)
            .single();

          if (roleError) {
            console.error('Error fetching user role:', roleError);
            throw new Error('Error fetching user role');
          }

          // Get the redirectTo parameter from the URL if it exists
          const redirectTo = router.query.redirectTo as string;
          
          // If we have a redirectTo parameter and the user has the right role, use it
          if (redirectTo) {
            const route = Object.keys(PROTECTED_ROUTES).find(route => 
              redirectTo.startsWith(route)
            );
            
            if (route && PROTECTED_ROUTES[route as keyof typeof PROTECTED_ROUTES].includes(userData?.role || '')) {
              router.push(redirectTo);
              return;
            }
          }

          // Otherwise, redirect based on role
          if (userData?.role === 'admin') {
            router.push('/admin/dashboard');
          } else {
            router.push('/user/dashboard');
          }
        }
      } else {
        setOtpError('Verification failed. Please try again or resend the code.');
      }
    } catch (err: any) {
      setOtpError(err.message || 'An unexpected error occurred');
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  const handleResendOtp = async () => {
    if (isResendingOtp) return;
    setIsResendingOtp(true);
    setResendOtpMessage('');
    setOtpError('');
    try {
      const { error: resendError } = await supabase.auth.resend({
        type: 'signup',
        email: verifyingEmail,
      });
      if (resendError) {
        setResendOtpMessage(resendError.message);
      } else {
        setResendOtpMessage('New verification code sent');
        setResendCooldown(60);
      }
    } catch (err: any) {
      setResendOtpMessage(err.message || 'Failed to resend code');
    } finally {
      setIsResendingOtp(false);
    }
  };

  const switchToLoginMode = () => {
    setIsOtpSent(false);
    setOtp(['', '', '', '', '', '']);
    setError(null);
    setSuccess(null);
  };

  if (isOtpSent) {
    return (
      <FormContainer>
        <Title>Email Confirmation</Title>
        <Subtitle>
          We sent a verification code to <strong style={{color: '#4A5568'}}>{verifyingEmail}</strong>.<br />
          Enter the code below to verify your email and sign in.
        </Subtitle>
        <Form onSubmit={handleVerifyOtpSubmit} noValidate>
          <VerificationContainer onPaste={handleOtpPaste}>
            {otp.map((digit, index) => (
              <VerificationInput
                key={index}
                ref={el => { otpInputs.current[index] = el; }}
                type="text"
                maxLength={1}
                value={digit}
                onChange={e => handleOtpChange(index, e.target.value)}
                onKeyDown={e => handleOtpKeyDown(index, e)}
                required
                aria-label={`Digit ${index + 1} of verification code`}
              />
            ))}
          </VerificationContainer>
          {otpError && (
            <MessageContainer><FiX size={12} />{otpError}</MessageContainer>
          )}
          {success && (
            <MessageContainer $isSuccess><FiCheck size={12} />{success}</MessageContainer>
          )}
          {resendOtpMessage && (
            <MessageContainer $isSuccess={!resendOtpMessage.toLowerCase().includes('fail') && !resendOtpMessage.toLowerCase().includes('error')}>
              {(!resendOtpMessage.toLowerCase().includes('fail') && !resendOtpMessage.toLowerCase().includes('error'))
                ? <FiCheck size={12} />
                : <FiX size={12} />}
              {resendOtpMessage}
            </MessageContainer>
          )}
          <ButtonContainer style={{marginTop: '2rem'}}>
            <SecondaryButton type="button" onClick={() => setIsOtpSent(false)}>
              Back
            </SecondaryButton>
            <Button type="submit" disabled={isVerifyingOtp}>
              {isVerifyingOtp ? 'Verifying...' : 'Verify Code'}
            </Button>
          </ButtonContainer>
        </Form>
        <ResendLink style={{ marginTop: '1.5rem' }}>
          Didn't receive the code?
          <button
            type="button"
            onClick={handleResendOtp}
            disabled={isResendingOtp || resendCooldown > 0}
          >
            {isResendingOtp
              ? 'Sending...'
              : resendCooldown > 0
                ? `Resend in ${resendCooldown}s`
                : 'Resend Code'}
          </button>
        </ResendLink>
      </FormContainer>
    );
  }

  return (
    <FormContainer>
      <Title>Welcome back</Title>
      <Subtitle>Sign in to your account to continue</Subtitle>

      <GoogleButton
        type="button"
        onClick={handleGoogleSignIn}
        disabled={isGoogleLoading}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="18" height="18">
          <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
          <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
          <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
          <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
        </svg>
        {isGoogleLoading ? 'Connecting...' : 'Continue with Google'}
      </GoogleButton>
      <Divider>or</Divider>

      <Form onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}>
        <FormContent>
          <FormFields>
            <InputGroup>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                autoComplete="email"
              />
            </InputGroup>

            <InputGroup>
              <PasswordLabelContainer>
                <Label htmlFor="password">Password</Label>
                <ForgotPasswordLink type="button">Forgot password?</ForgotPasswordLink>
              </PasswordLabelContainer>
              <PasswordInputContainer>
                <PasswordInput
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  autoComplete="current-password"
                />
                <ViewPasswordButton
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </ViewPasswordButton>
              </PasswordInputContainer>
              {error && (
                <MessageContainer>
                  <FiX size={12} />
                  {error}
                </MessageContainer>
              )}
            </InputGroup>

            {success && (
              <MessageContainer $isSuccess>
                <FiCheck size={12} />
                {success}
              </MessageContainer>
            )}
          </FormFields>

          <ButtonContainer>
            <Button 
              type="button" 
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? 'Signing In' : 'Sign In'}
              {isLoading && <AnimatedDots />}
            </Button>
          </ButtonContainer>
        </FormContent>
      </Form>
      {!hideLinks && (
        <SignInLink style={{ marginTop: '1.5rem' }}>
          Don't have an account?
          <a href="/signup"> Sign Up</a>
        </SignInLink>
      )}
    </FormContainer>
  );
};

export default SignInForm; 