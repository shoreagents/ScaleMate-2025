import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { FiEye, FiEyeOff, FiCheck, FiX, FiLoader } from 'react-icons/fi';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

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

const SignInForm: React.FC<SignInFormProps> = ({
  onSuccess,
  onError,
  hideLinks = false,
  preventRedirect = false,
  redirectUrl = '/user/dashboard'
}) => {
  const router = useRouter();
  const { profile, refreshProfile } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [error, setError] = useState('');
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [verifyingEmail, setVerifyingEmail] = useState('');
  const [otpError, setOtpError] = useState('');
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [verificationCode, setVerificationCode] = useState<string[]>(Array(6).fill(''));
  const [isResendingOtp, setIsResendingOtp] = useState(false);
  const [resendOtpMessage, setResendOtpMessage] = useState('');
  const [resendCooldown, setResendCooldown] = useState(0);
  const [uiMode, setUiMode] = useState<'signin' | 'verify'>('signin');
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

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

  // Add Gmail normalization function
  const normalizeGmailAddress = (email: string): string => {
    if (!email) return email;
    
    const [localPart, domain] = email.toLowerCase().split('@');
    if (domain !== 'gmail.com') return email;
    
    // Remove dots and everything after + in the local part
    const normalizedLocalPart = localPart.replace(/\./g, '').split('+')[0];
    return `${normalizedLocalPart}@gmail.com`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Sanitize input
    const sanitizeInput = (input: string) => {
      return input.trim().replace(/[<>]/g, '');
    };
    
    if (name === 'email') {
      const sanitizedEmail = sanitizeInput(value);
      setEmail(sanitizedEmail);
      setError(''); // Clear general error on change
    } else if (name === 'password') {
      setPassword(sanitizeInput(value));
      setError(''); // Clear general error on change
    }
  };

  const handleSubmit = async () => {
    if (loading) return;
    setLoading(true);
    setError('');
    setConfirmationMessage('');

    try {
      // Normalize Gmail address before sending
      const normalizedEmail = normalizeGmailAddress(email);
      
      // First try to sign in with Supabase
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email: normalizedEmail,
        password
      });

      if (signInError) {
        // If email needs confirmation
        if (signInError.message.toLowerCase().includes('email not confirmed')) {
          setIsFormSubmitted(true);
          setVerifyingEmail(normalizedEmail);
          setConfirmationMessage('');
          setError('');
          setVerificationCode(Array(6).fill(''));
          setResendCooldown(60);
          setLoading(false); // Reset loading here since we're switching to verification mode
          return;
        }
        // Customize error message for invalid credentials
        if (signInError.message.toLowerCase().includes('invalid login credentials')) {
          throw new Error('Incorrect email or password');
        }
        throw signInError;
      }

      if (signInData.user) {
        await refreshProfile();
        if (onSuccess) {
          await onSuccess();
        }
        if (!preventRedirect) {
          const redirectPath = redirectUrl || 
            (signInData.user.user_metadata?.role === 'admin' ? '/admin/dashboard' : '/user/dashboard');
          // Keep loading state active during redirect
          router.replace(redirectPath);
          return; // Don't reset loading state here
        }
      }
    } catch (err: any) {
      setError(err.message || 'Unable to sign in. Please check your credentials and try again.');
      if (onError) {
        onError(err.message || 'Unable to sign in. Please check your credentials and try again.');
      }
      setLoading(false); // Reset loading on error
    }
    // Only reset loading if we're not redirecting
    if (preventRedirect) {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    setError('');
    setConfirmationMessage('');

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
    const newOtp = [...verificationCode];
    newOtp[index] = value;
    setVerificationCode(newOtp);
    setOtpError('');
    if (value && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    const newOtp = [...verificationCode];
    for (let i = 0; i < pastedData.length; i++) {
      if (i < 6) {
        newOtp[i] = pastedData[i];
      }
    }
    setVerificationCode(newOtp);
    otpInputRefs.current[pastedData.length - 1]?.focus();
  };

  const handleVerifyOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setOtpError('');
    setResendOtpMessage('');
    const otpString = verificationCode.join('');
    if (otpString.length !== 6) {
      setOtpError('Please enter a valid 6-digit verification code.');
      return;
    }

    setIsVerifyingOtp(true);

    try {
      // Normalize Gmail address before verification
      const normalizedEmail = normalizeGmailAddress(verifyingEmail);
      
      const { data, error: verifyError } = await supabase.auth.verifyOtp({
        email: normalizedEmail,
        token: otpString,
        type: 'signup'
      });

      if (verifyError) {
        setOtpError(verifyError.message);
        setIsVerifyingOtp(false);
      } else if (data?.user && data?.session) {
        await refreshProfile();
        if (!preventRedirect) {
          const redirectPath = redirectUrl || 
            (data.user.user_metadata?.role === 'admin' ? '/admin/dashboard' : '/user/dashboard');
          router.replace(redirectPath);
          return; // Don't reset verifying state
        }
        setIsVerifyingOtp(false);
      }
    } catch (err: any) {
      setOtpError(err.message || 'Failed to verify code');
      if (onError) {
        onError(err.message || 'Failed to verify code');
      }
      setIsVerifyingOtp(false);
    }
  };

  const handleResendOtp = async () => {
    if (isResendingOtp) return;
    setIsResendingOtp(true);
    setResendOtpMessage('');
    setOtpError('');
    try {
      // Normalize Gmail address before resending
      const normalizedEmail = normalizeGmailAddress(verifyingEmail);
      
      const { error: resendError } = await supabase.auth.resend({
        type: 'signup',
        email: normalizedEmail,
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
    setIsFormSubmitted(false);
    setVerificationCode(Array(6).fill(''));
    setError('');
    setConfirmationMessage('');
  };

  if (isFormSubmitted) {
    return (
      <FormContainer>
        <Title>Email Confirmation</Title>
        <Subtitle>
          We sent a verification code to <strong style={{color: '#4A5568'}}>{verifyingEmail}</strong>.<br />
          Enter the code below to verify your email and sign in.
        </Subtitle>
        <Form onSubmit={handleVerifyOtpSubmit} noValidate>
          <VerificationContainer onPaste={handleOtpPaste}>
            {verificationCode.map((digit, index) => (
              <VerificationInput
                key={index}
                ref={el => { otpInputRefs.current[index] = el; }}
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
          {confirmationMessage && (
            <MessageContainer $isSuccess><FiCheck size={12} />{confirmationMessage}</MessageContainer>
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
            <SecondaryButton type="button" onClick={() => setIsFormSubmitted(false)}>
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
      <Title>Welcome Back</Title>
      <Subtitle>Sign in to continue to ScaleMate</Subtitle>
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
      <Form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} noValidate>
        <InputGroup>
          <Label htmlFor="email">
            Email
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={handleChange}
            required
            autoComplete="email"
            placeholder="Enter your email"
          />
        </InputGroup>

        <InputGroup>
          <Label htmlFor="password">Password</Label>
          <InputWrapper>
            <Input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={handleChange}
              required
              autoComplete="current-password"
              placeholder="Enter your password"
            />
            <PasswordToggle
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
            </PasswordToggle>
          </InputWrapper>
        </InputGroup>

        {error && (
          <MessageContainer>
            <FiX size={12} />
            {error}
          </MessageContainer>
        )}

        {confirmationMessage && (
          <MessageContainer $isSuccess>
            <FiCheck size={12} />
            {confirmationMessage}
          </MessageContainer>
        )}

        <ButtonContainer>
          <Button 
            type="submit" 
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? 'Signing In' : 'Sign In'}
            {loading && <AnimatedDots />}
          </Button>
        </ButtonContainer>
      </Form>
      <SignInLink style={{ marginTop: '1.5rem' }}>
        Don't have an account?
        <a href="/signup"> Sign Up</a>
      </SignInLink>
    </FormContainer>
  );
};

export default SignInForm; 