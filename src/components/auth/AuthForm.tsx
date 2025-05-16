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

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;
`;

const SignInLink = styled.div`
  text-align: center;
  font-size: 0.875rem;
  color: ${props => props.theme.colors.text.secondary};
  margin-top: 1.5rem;
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

// OTP Specific Styled Components
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
`;

const ResendLink = styled.div`
  text-align: center;
  font-size: 0.875rem;
  color: ${props => props.theme.colors.text.secondary};
  margin-top: 1.5rem;

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

const AuthForm: React.FC = () => {
  const router = useRouter();
  const [mode, setMode] = useState<'login'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  // States for OTP verification (adapted from SignUpForm)
  const [uiMode, setUiMode] = useState<'login' | 'verify'>('login');
  const [verificationCode, setVerificationCode] = useState<string[]>(Array(6).fill(''));
  const [verifyingEmail, setVerifyingEmail] = useState(''); // To store the email for OTP process
  const [otpError, setOtpError] = useState('');
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [isResendingOtp, setIsResendingOtp] = useState(false);
  const [resendOtpMessage, setResendOtpMessage] = useState('');
  const [resendCooldown, setResendCooldown] = useState(0);
  const [otpInfoMessage, setOtpInfoMessage] = useState('');

  const { profile, refreshProfile } = useAuth();

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    if (resendCooldown > 0) {
      timer = setInterval(() => {
        setResendCooldown((prevCooldown) => prevCooldown - 1);
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [resendCooldown]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      await refreshProfile();
      setSuccess('Login successful!');
    }
  };

  const handleGoogleSignIn = () => {
    setIsGoogleLoading(true);
    setTimeout(() => {
      setIsGoogleLoading(false);
      setSuccess('Demo only: Google sign-in is not connected.');
    }, 800);
  };

  const handleResendOtp = async (emailToResend: string) => {
    if (isResendingOtp || resendCooldown > 0) return;
    setIsResendingOtp(true);
    setResendOtpMessage('');
    setOtpError('');
    setOtpInfoMessage('');

    const { error: resendError } = await supabase.auth.resend({
      type: 'signup', // 'signup' type is used for verifying email for new accounts
      email: emailToResend,
    });

    setIsResendingOtp(false);

    if (resendError) {
      setResendOtpMessage(resendError.message); // Or a more user-friendly error
    } else {
      setResendOtpMessage(`New verification code sent`);
      setResendCooldown(60); // Start 60-second cooldown
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    setLoading(false);
    if (signInError) {
      if (signInError.message.toLowerCase().includes('email not confirmed')) {
        setError('');
        setVerifyingEmail(email);
        setOtpInfoMessage(`Your email ${email} is not confirmed. We\'ve sent a new verification code. Please check your inbox (and spam folder).`);
        setUiMode('verify');
        setResendCooldown(60);
        await handleResendOtp(email);
      } else {
        setError(signInError.message);
      }
    } else if (data.session) {
      await refreshProfile();
      // Role-based redirect
      if (profile?.role === 'admin') {
        router.push('/admin/dashboard');
      } else if (profile?.role === 'user') {
        router.push('/user/dashboard');
      }
      setSuccess('Login successful! Redirecting...');
      console.log('Login successful, session:', data.session);
      setTimeout(() => {
        setSuccess('');
        setEmail('');
        setPassword('');
      }, 2000);
    } else {
      setError('An unexpected error occurred. Please try again.');
    }
  };

  // OTP Input Change Handler
  const handleOtpChange = (index: number, value: string) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newVerificationCode = [...verificationCode];
    newVerificationCode[index] = value;
    setVerificationCode(newVerificationCode);
    setOtpError('');
    setResendOtpMessage('');
    setOtpInfoMessage('');

    if (value && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  // OTP KeyDown Handler (for backspace)
  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      e.preventDefault();
      const newVerificationCode = [...verificationCode];
      if (newVerificationCode[index]) {
        newVerificationCode[index] = '';
        setVerificationCode(newVerificationCode);
      } else if (index > 0) {
        newVerificationCode[index - 1] = '';
        setVerificationCode(newVerificationCode);
        otpInputRefs.current[index - 1]?.focus();
      }
    }
  };
  
  // OTP Paste Handler
  const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').replace(/[^0-9]/g, '');
    if (pasteData.length === 6) {
      setVerificationCode(pasteData.split(''));
      otpInputRefs.current[5]?.focus();
    } else if (pasteData.length > 0) {
      const currentFocusIndex = otpInputRefs.current.findIndex(ref => ref === document.activeElement);
      const newCode = [...verificationCode];
      let k = 0;
      for (let i = currentFocusIndex; i < 6 && k < pasteData.length; i++) {
        newCode[i] = pasteData[k];
        k++;
      }
      setVerificationCode(newCode);
      if (currentFocusIndex + k < 6) {
        otpInputRefs.current[currentFocusIndex + k]?.focus();
      } else {
         otpInputRefs.current[5]?.focus();
      }
    }
  };

  // Verify OTP Handler
  const handleVerifyOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setOtpError('');
    setResendOtpMessage('');
    setOtpInfoMessage('');
    const code = verificationCode.join('');
    if (code.length !== 6) {
      setOtpError('Please enter a valid 6-digit verification code.');
      return;
    }
    setIsVerifyingOtp(true);
    const { data, error: verifyError } = await supabase.auth.verifyOtp({
      email: verifyingEmail,
      token: code,
      type: 'signup',
    });
    setIsVerifyingOtp(false);
    if (verifyError) {
      setOtpError(verifyError.message);
    } else if (data.user && data.session) {
      await refreshProfile();
      // Role-based redirect
      if (profile?.role === 'admin') {
        router.push('/admin/dashboard');
      } else if (profile?.role === 'user') {
        router.push('/user/dashboard');
      }
      setSuccess('Email verified successfully! You are now logged in.');
      setUiMode('login');
      setEmail('');
      setPassword('');
      setVerificationCode(Array(6).fill(''));
      setVerifyingEmail('');
      setResendCooldown(0);
      console.log('OTP verification successful, session:', data.session);
    } else {
      setOtpError('Verification failed. Please try again or resend the code.');
    }
  };
  
  const switchToLoginMode = () => {
    setUiMode('login');
    setVerifyingEmail('');
    setVerificationCode(Array(6).fill(''));
    setOtpError('');
    setResendOtpMessage('');
    setResendCooldown(0);
    setOtpInfoMessage('');
    setError(''); // Clear general login errors too
    setSuccess('');
  };

  if (uiMode === 'verify') {
    return (
      <FormContainer>
        <Title>Email Confirmation</Title>
        <Subtitle>
          {otpInfoMessage ? otpInfoMessage : (`We sent a verification code to ${verifyingEmail}. Enter it below.`)}
        </Subtitle>
        <Form onSubmit={handleVerifyOtpSubmit}>
          <VerificationContainer onPaste={handleOtpPaste}>
            {verificationCode.map((digit, index) => (
              <VerificationInput
                key={index}
                ref={el => { otpInputRefs.current[index] = el; }}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleOtpKeyDown(index, e)}
                required
                aria-label={`Digit ${index + 1} of verification code`}
              />
            ))}
          </VerificationContainer>
          
          {otpError && (
            <MessageContainer style={{ marginTop: '0' }}>{otpError}</MessageContainer>
          )}
          {!otpError && resendOtpMessage && (
            <MessageContainer 
              $isSuccess={!resendOtpMessage.toLowerCase().includes('fail') && !resendOtpMessage.toLowerCase().includes('error')} 
              style={{ marginTop: '0' }}
            >
              {resendOtpMessage}
            </MessageContainer>
          )}

          <ButtonContainer style={{ marginTop: '2rem' }}>
            <SecondaryButton type="button" onClick={switchToLoginMode}>
              Back to Login
            </SecondaryButton>
            <Button type="submit" disabled={isVerifyingOtp || verificationCode.join('').length !== 6}>
              {isVerifyingOtp ? 'Verifying...' : 'Verify Code'}
            </Button>
          </ButtonContainer>
        </Form>
        <ResendLink>
          Didn't receive the code?
          <button 
            type="button" 
            onClick={() => handleResendOtp(verifyingEmail)} 
            disabled={isResendingOtp || resendCooldown > 0}
          >
            {isResendingOtp ? 'Sending...' : (resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend Code')}
          </button>
        </ResendLink>
      </FormContainer>
    );
  }

  // Login Form UI
  return (
    <FormContainer>
      <Title>Welcome Back</Title>
      <Subtitle>Sign in to continue to ScaleMate</Subtitle>
      <GoogleButton onClick={handleGoogleSignIn} disabled={isGoogleLoading} type="button">
        <img src="/google-icon.svg" alt="Google" width={20} height={20} />
        {isGoogleLoading ? 'Connecting...' : 'Continue with Google'}
      </GoogleButton>
      <Divider>or</Divider>
      <Form onSubmit={handleLoginSubmit} noValidate>
        <FormContent>
          <FormFields>
            <InputGroup>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                autoComplete="email"
                placeholder="Enter your email"
              />
            </InputGroup>
            <FormRow>
              <InputGroup style={{ flex: 1 }}>
                <PasswordLabelContainer>
                  <Label htmlFor="password">Password</Label>
                </PasswordLabelContainer>
                <InputWrapper>
                  <PasswordInputWrapper>
                    <PasswordInput
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={e => setPassword(e.target.value)}
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
                  </PasswordInputWrapper>
                </InputWrapper>
              </InputGroup>
            </FormRow>
            {(error || success) && (
              <MessageContainer $isSuccess={!!success}>
                {success || error}
              </MessageContainer>
            )}
          </FormFields>
          <FormActions>
            <ButtonContainer>
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <FiLoader style={{ animation: 'spin 1s linear infinite', marginRight: '8px' }} />
                    Signing In...
                  </>
                ) : (
                  'Sign In'
                )}
              </Button>
            </ButtonContainer>
            <SignInLink>
              Don&apos;t have an account?
              <a href="/signup"> Sign up</a>
            </SignInLink>
          </FormActions>
        </FormContent>
      </Form>
    </FormContainer>
  );
};

export default AuthForm; 