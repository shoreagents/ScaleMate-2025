import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { FiEye, FiEyeOff, FiLoader, FiCheck, FiX } from 'react-icons/fi';
import { supabase } from '@/lib/supabase'; // Keep for type consistency if needed, or remove if fully unlinked
import { useAuth } from '@/contexts/AuthContext';

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
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  gap: 4px;
  color: ${props => props.$isSuccess ? props.theme.colors.success : props.theme.colors.error};
`;

// Define SecondaryButton outside the component to avoid re-creation on render
const SecondaryButton = styled(Button)`
  background: transparent;
  border: 1.5px solid ${props => props.theme.colors.border || '#D1D5DB'}; // Fallback border color
  color: ${props => props.theme.colors.text.primary || '#1F2937'}; // Fallback text color

  &:hover {
    background: ${props => props.theme.colors.background.secondary || '#F3F4F6'}; // Fallback hover bg
    border-color: ${props => props.theme.colors.text.primary || '#1F2937'};
  }
`;

const SignUpForm: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [passwordValidations, setPasswordValidations] = useState({
    minLength: false,
  });
  const [passwordsMatch, setPasswordsMatch] = useState<boolean | null>(null);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState('');

  // New states for OTP verification
  const [uiMode, setUiMode] = useState<'signup' | 'verify'>('signup');
  const [verificationCode, setVerificationCode] = useState<string[]>(Array(6).fill(''));
  const [verifyingEmail, setVerifyingEmail] = useState('');
  const [otpError, setOtpError] = useState('');
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // New states for Resend OTP
  const [isResendingOtp, setIsResendingOtp] = useState(false);
  const [resendOtpMessage, setResendOtpMessage] = useState('');
  const [resendCooldown, setResendCooldown] = useState(0); // Added for cooldown timer

  const { profile, refreshProfile } = useAuth();

  useEffect(() => {
    if (formData.password) {
      setPasswordValidations({
        minLength: formData.password.length >= 8,
      });
      } else {
      setPasswordValidations({
        minLength: false,
      });
    }
    if (formData.password && formData.confirmPassword) {
      setPasswordsMatch(formData.password === formData.confirmPassword);
      } else {
      setPasswordsMatch(null);
    }
  }, [formData.password, formData.confirmPassword]);

  // useEffect for Resend OTP Cooldown Timer
  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    if (resendCooldown > 0) {
      timer = setInterval(() => {
        setResendCooldown((prevCooldown) => prevCooldown - 1);
      }, 1000);
    }
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [resendCooldown]);

  // REMOVED: validateUsername, checkUsernameExists, validatePasswords, checkEmailExists
  // These functions involved backend calls or complex logic not needed for a pure frontend demo.
  // Basic frontend validation will be kept or simulated.

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(''); // Clear general error on change
    setSuccessMessage(''); // Clear success message on change

    // Clear specific field errors on change
    if (name === 'email') setEmailError('');
    if (name === 'password' || name === 'confirmPassword') setPasswordError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setConfirmationMessage('');
    setOtpError('');
    setIsFormSubmitted(true);

    // Basic frontend validation checks
    if (!formData.email) {
      setEmailError('Email is required.');
        return;
      }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setEmailError('Invalid email format');
        return;
      }
    if (!formData.password) {
      setPasswordError('Password is required');
        return;
      }
    if (!formData.confirmPassword) {
      setPasswordError('Confirm password is required');
      return;
    }
      if (formData.password !== formData.confirmPassword) {
      setPasswordError('Passwords do not match');
        return;
      }

    if (!passwordValidations.minLength) {
      setPasswordError('Password must be at least 8 characters.');
        return;
      }

    setLoading(true);
    
      const { data, error: signUpError } = await supabase.auth.signUp({
      email: formData.email,
        password: formData.password,
    });

    setLoading(false);

      if (signUpError) {
      if (signUpError.message.toLowerCase().includes('user already registered') || 
          signUpError.message.toLowerCase().includes('email address is already registered')) {
        setError('This email address is already registered. Please try logging in or use a different email.');
      } else {
        setError(signUpError.message);
      }
    } else if (data.user && data.user.identities && data.user.identities.length === 0) {
      setError('Email in use or pending confirmation. Try logging in or check your email.');
    } else if (data.user && !data.session) {
      // Email confirmation is needed
      setVerifyingEmail(formData.email);
      setConfirmationMessage(`A verification code has been sent to ${formData.email}. Please enter it below.`);
      setUiMode('verify');
      setResendCooldown(60); // Start cooldown timer immediately when verify UI is shown
      // Clear password fields from formData, keep email for display or resend if needed later
      setFormData(prev => ({ ...prev, password: '', confirmPassword: '' }));
      setIsFormSubmitted(false); // Reset for the OTP form
      // Clear previous errors/success messages that are not relevant for OTP screen
      setError('');
      setSuccessMessage('');
      setEmailError('');
      setPasswordError('');
    } else if (data.user && data.session) {
      await refreshProfile();
      // Role-based redirect
      if (profile?.role === 'admin') {
        router.push('/admin/dashboard');
      } else if (profile?.role === 'user') {
        router.push('/user/dashboard');
      }
      setSuccessMessage('Sign up successful! You are now logged in.');
      setConfirmationMessage('');
      setTimeout(() => {
        setFormData({ email: '', password: '', confirmPassword: '' });
        setSuccessMessage('Sign up complete! Form cleared.');
        setIsFormSubmitted(false);
        setPasswordValidations({ minLength: false });
        setPasswordsMatch(null);
        // router.push('/dashboard');
      }, 2000);
    } else {
      setError('An unexpected error occurred. Please try again.');
    }
  };

  const handleGoogleSignUp = () => {
    setIsGoogleLoading(true);
    setError('');
    setSuccessMessage('');
    // Simulate API call
    setTimeout(() => {
      setIsGoogleLoading(false);
      setSuccessMessage('Demo only: Google sign-up is not connected.');
      // Optionally, redirect or clear form after a delay
       setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    }, 800);
  };
  
  const allPasswordCriteriaMet = passwordValidations.minLength;

  // OTP Input Change Handler
  const handleOtpChange = (index: number, value: string) => {
    if (!/^[0-9]?$/.test(value)) return; // Only allow single digits or empty

    const newVerificationCode = [...verificationCode];
    newVerificationCode[index] = value;
    setVerificationCode(newVerificationCode);
    setOtpError(''); // Clear OTP error on change

    // Move to next input if a digit is entered
    if (value && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  // OTP KeyDown Handler (for backspace)
  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      e.preventDefault(); // Prevent default backspace behavior
      const newVerificationCode = [...verificationCode];
      if (newVerificationCode[index]) {
        newVerificationCode[index] = ''; // Clear current input
        setVerificationCode(newVerificationCode);
      } else if (index > 0) {
        newVerificationCode[index - 1] = ''; // Clear previous input and focus it
        setVerificationCode(newVerificationCode);
        otpInputRefs.current[index - 1]?.focus();
      }
    }
  };
  
  // OTP Paste Handler
  const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').replace(/[^0-9]/g, ''); // Sanitize: only digits
    if (pasteData.length === 6) {
      setVerificationCode(pasteData.split(''));
      otpInputRefs.current[5]?.focus(); // Focus last input after paste
    } else if (pasteData.length > 0) {
      // If pasted data is not 6 digits but has some digits, try to fill from current input
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
      setSuccessMessage('Email verified successfully! You are now logged in.');
      setConfirmationMessage('');
      setOtpError('');
      setUiMode('signup');
      setFormData({ email: '', password: '', confirmPassword: '' });
      setVerificationCode(Array(6).fill(''));
      setResendCooldown(0);
      // router.push('/dashboard');
    } else {
      // This case should ideally not be hit if OTP is correct and leads to a session
      setOtpError('Verification failed. Please try again or resend the code.');
    }
  };
  
  // Function to switch back to signup form (e.g. if user wants to use different email)
  const switchToSignupMode = () => {
    setUiMode('signup');
    setVerifyingEmail('');
    setVerificationCode(Array(6).fill(''));
    setError('');
    setSuccessMessage('');
    setConfirmationMessage('');
    setOtpError('');
    setEmailError('');
    setPasswordError('');
    setFormData({ email: '', password: '', confirmPassword: ''}); // Reset form
    setResendOtpMessage(''); // Clear resend message when going back
    setResendCooldown(0); // Reset cooldown when going back
  };

  // Handler for Resend OTP
  const handleResendOtp = async () => {
    if (isResendingOtp) return;
    setIsResendingOtp(true);
    setResendOtpMessage('');
    setOtpError(''); // Clear previous OTP field errors

      const { error: resendError } = await supabase.auth.resend({
        type: 'signup',
      email: verifyingEmail,
      });

    setIsResendingOtp(false);

      if (resendError) {
      setResendOtpMessage(resendError.message); // Or a more user-friendly error
        } else {
      setResendOtpMessage(`New verification code sent`);
      setResendCooldown(60); // Start 60-second cooldown
    }
  };

  if (uiMode === 'verify') {
    return (
      <FormContainer>
        <Title>Email Confirmation</Title>
        <Subtitle>
          We sent a verification code to <strong style={{color: '#4A5568'}}>{verifyingEmail}</strong>. 
          Enter the code below to complete your sign up.
        </Subtitle>
        <Form onSubmit={handleVerifyOtpSubmit}>
          <VerificationContainer onPaste={handleOtpPaste}>
            {verificationCode.map((digit, index) => (
                  <VerificationInput
                    key={index}
                ref={el => { otpInputRefs.current[index] = el; } }
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
          {/* Conditionally adjust marginTop for specific OTP error */}
          {otpError && (
            <MessageContainer 
              style={{
                marginTop: '0', // Always 0 when otpError is present
              }}
            >
              {otpError}
              </MessageContainer>
              )}
          {/* Moved Resend OTP Message - show only if no otpError */}
          {!otpError && resendOtpMessage && (
            <MessageContainer 
              $isSuccess={!resendOtpMessage.toLowerCase().includes('fail') && !resendOtpMessage.toLowerCase().includes('error')} 
              style={{ marginTop: '0' }}
            >
              {resendOtpMessage}
            </MessageContainer>
          )}
          <ButtonContainer style={{marginTop: '2rem'}}>
            <SecondaryButton type="button" onClick={switchToSignupMode}>
              Back
            </SecondaryButton>
            <Button type="submit" disabled={isVerifyingOtp}>
              {isVerifyingOtp ? 'Verifying...' : 'Verify Code'}
            </Button>
          </ButtonContainer>
        </Form>
        <ResendLink style={{marginTop: '1.5rem'}}>
          Didn't receive the code? 
          <button type="button" onClick={handleResendOtp} disabled={isResendingOtp || resendCooldown > 0}>
            {isResendingOtp ? 'Sending...' : (resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend Code')}
          </button>
        </ResendLink>
      </FormContainer>
    );
  }

  // Original Signup Form
  return (
    <FormContainer>
      <Title>Create Account</Title>
      <Subtitle>Sign up to get started with ScaleMate</Subtitle>
      <GoogleButton onClick={handleGoogleSignUp} disabled={isGoogleLoading} type="button">
        <img src="/google-icon.svg" alt="Google" width={20} height={20} />
        {isGoogleLoading ? 'Connecting...' : 'Sign up with Google'}
      </GoogleButton>
      <Divider>or</Divider>
      <Form onSubmit={handleSubmit} noValidate>
        <InputGroup>
          <Label htmlFor="email">
            Email
          </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            autoComplete="email"
            placeholder="Enter your email"
          />
          {emailError && <HelperText style={{color: 'red'}}>{emailError}</HelperText>}
        </InputGroup>
          <FormRow>
            <FormGroup>
            <Label htmlFor="password">Password</Label>
              <InputWrapper>
                  <Input
                    id="password"
                    name="password"
                type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleChange}
                    required
                autoComplete="new-password"
                placeholder="Create a password"
                aria-describedby="password-helper"
                  />
                  <PasswordToggle
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                  </PasswordToggle>
              </InputWrapper>
            {/* Conditionally render based on formData.password having a value */}
            {formData.password && (
              <PasswordHelperText id="password-helper">
                <HelperText style={{ color: passwordValidations.minLength ? 'green' : '#6B7280' }}>
                  {passwordValidations.minLength ? <FiCheck size={12} /> : <FiX size={12} />} Must be at least 8 characters
                </HelperText>
              </PasswordHelperText>
            )}
            </FormGroup>
            <FormGroup>
            <Label htmlFor="confirmPassword">Confirm Password</Label>
              <InputWrapper>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                autoComplete="new-password"
                placeholder="Confirm your password"
                  />
                  <PasswordToggle
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                  >
                    {showConfirmPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                  </PasswordToggle>
              </InputWrapper>
            {formData.confirmPassword && passwordsMatch === false && (
              <HelperText style={{ color: 'red' }}>
                <FiX size={12} /> Passwords do not match
                  </HelperText>
                )}
            {formData.confirmPassword && passwordsMatch === true && (
              <HelperText style={{ color: 'green' }}>
                <FiCheck size={12} /> Passwords match
                    </HelperText>
                )}
            </FormGroup>
          </FormRow>
        {/* Display field-specific errors first */}
        {emailError && <MessageContainer>{emailError}</MessageContainer>}
        {passwordError && <MessageContainer>{passwordError}</MessageContainer>}
        
        {/* Display general errors or success/confirmation messages */}
        {error && !emailError && !passwordError && <MessageContainer>{error}</MessageContainer>}
        {successMessage && <MessageContainer $isSuccess>{successMessage}</MessageContainer>}

        <ButtonContainer>
          <Button type="submit" disabled={loading || !allPasswordCriteriaMet || passwordsMatch === false}>
            {loading ? (
              <>
                <FiLoader style={{ animation: 'spin 1s linear infinite', marginRight: '8px' }} />
                Creating Account...
              </>
            ) : (
              'Create Account'
            )}
          </Button>
        </ButtonContainer>
      </Form>
      <SignInLink style={{ marginTop: '1.5rem' }}>
        Already have an account?
        <a href="/login"> Sign In</a>
      </SignInLink>
    </FormContainer>
  );
};

export default SignUpForm; 