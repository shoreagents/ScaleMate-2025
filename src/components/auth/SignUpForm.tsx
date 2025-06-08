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

  svg {
    width: 18px;
    height: 18px;
    object-fit: contain;
    display: block;
    flex-shrink: 0;
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

export interface SignUpFormProps {
  onSuccess?: () => Promise<void>;
  onError?: (error: string | null) => void;
  hideLinks?: boolean;
  preventRedirect?: boolean;
  redirectUrl?: string;
}

const SignUpForm: React.FC<SignUpFormProps> = ({
  onSuccess,
  onError,
  hideLinks = false,
  preventRedirect = false,
  redirectUrl = '/user/dashboard'
}) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
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

  const [nameError, setNameError] = useState('');

  // Add isVerificationCodeComplete check
  const isVerificationCodeComplete = verificationCode.every(digit => digit !== '');

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
    // Sanitize input
    const sanitizeInput = (input: string) => {
      return input.trim().replace(/[<>]/g, '');
    };
    
    setFormData(prev => ({ 
      ...prev, 
      [name]: sanitizeInput(value) 
    }));
    setError(''); // Clear general error on change
    setSuccessMessage(''); // Clear success message on change

    // Clear specific field errors on change
    if (name === 'email') setEmailError('');
    if (name === 'password' || name === 'confirmPassword') setPasswordError('');
    if (name === 'firstName' || name === 'lastName') setNameError('');
  };

  // Add Gmail normalization function
  const normalizeGmailAddress = (email: string): string => {
    if (!email) return email;
    
    const [localPart, domain] = email.toLowerCase().split('@');
    if (domain !== 'gmail.com') return email;
    
    // Remove dots and everything after + in the local part
    const normalizedLocalPart = localPart.replace(/\./g, '').split('+')[0];
    return `${normalizedLocalPart}@gmail.com`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setConfirmationMessage('');
    setOtpError('');
    setIsFormSubmitted(true);

    // Basic frontend validation checks
    if (!formData.firstName.trim()) {
      setNameError('First name is required');
      return;
    }
    if (!formData.lastName.trim()) {
      setNameError('Last name is required');
      return;
    }
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

    try {
      // Normalize Gmail address before checking
      const normalizedEmail = normalizeGmailAddress(formData.email);

      // First check if email exists
      const checkResponse = await fetch('/api/auth/[...auth]', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'check-email',
          email: normalizedEmail,
        }),
      });

      const checkData = await checkResponse.json();

      if (!checkResponse.ok) {
        throw new Error(checkData.error || 'Failed to check email');
      }

      if (checkData.exists) {
        if (checkData.status === 'unconfirmed') {
          setEmailError(checkData.message);
        } else {
        setEmailError('Email already exists');
        }
        setLoading(false);
        return;
      }

      // If email doesn't exist, proceed with signup
      const response = await fetch('/api/auth/[...auth]', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'signup',
          email: normalizedEmail,
          password: formData.password,
          firstName: formData.firstName,
          lastName: formData.lastName,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        let errorMsg = data.error;
        
        // Handle specific error cases
        if (errorMsg) {
          if (errorMsg.toLowerCase().includes('weak') || 
              errorMsg.toLowerCase().includes('password')) {
            // Display the exact error message from Supabase
            setPasswordError(errorMsg);
            setUiMode('signup');
            setIsFormSubmitted(false);
            setLoading(false);
            return;
          }
          
          if (errorMsg.toLowerCase().includes('email already exists') ||
              errorMsg.toLowerCase().includes('user already registered') ||
              errorMsg.toLowerCase().includes('email address is already registered') ||
              errorMsg.toLowerCase().includes('already registered')) {
            setEmailError('Email already exists');
            setUiMode('signup');
            setIsFormSubmitted(false);
            setLoading(false);
            return;
          }
          
          if (errorMsg.toLowerCase().includes('invalid email') ||
              errorMsg.toLowerCase().includes('email format')) {
            setEmailError('Invalid email format');
            setUiMode('signup');
            setIsFormSubmitted(false);
            setLoading(false);
            return;
          }
          
          if (errorMsg.toLowerCase().includes('network') || 
              errorMsg.toLowerCase().includes('connection')) {
            throw new Error('Network error. Please check your internet connection and try again.');
          }
          
          if (errorMsg.toLowerCase().includes('rate limit')) {
            throw new Error('Too many attempts. Please try again in a few minutes.');
          }
        }
        
        throw new Error(errorMsg || 'Failed to create account');
      }

      // Email confirmation is needed
      setVerifyingEmail(normalizedEmail);
      setConfirmationMessage(`A verification code has been sent to ${formData.email}. Please enter it below.`);
      setUiMode('verify');
      setResendCooldown(60); // Start cooldown timer immediately when verify UI is shown
      // Clear password fields from formData, keep email for display or resend if needed later
      setFormData(prev => ({ ...prev, password: '', confirmPassword: '' }));
      setIsFormSubmitted(false);
      // Clear previous errors/success messages that are not relevant for OTP screen
      setError('');
      setSuccessMessage('');
      setEmailError('');
      setPasswordError('');
    } catch (err: any) {
      console.error('Signup error:', err);
      setError(err.message || 'Unable to create account. Please try again.');
      if (onError) {
        onError(err.message || 'Unable to create account. Please try again.');
      }
    } finally {
      setLoading(false);
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
  const isFormValid = allPasswordCriteriaMet && 
    passwordsMatch === true && 
    formData.firstName.trim() !== '' && 
    formData.lastName.trim() !== '' &&
    formData.email.trim() !== '';

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

    try {
      // Normalize Gmail address before verification
      const normalizedEmail = normalizeGmailAddress(verifyingEmail);
      
      const { data, error } = await supabase.auth.verifyOtp({
        email: normalizedEmail,
        token: code,
        type: 'signup'
      });

      if (error) {
        throw error;
      }

      if (data?.user) {
        await refreshProfile();
        
        if (onSuccess) {
          await onSuccess();
        }

        if (!preventRedirect) {
          // Use redirectUrl prop if provided, otherwise use role-based paths
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
    setFormData({ email: '', password: '', confirmPassword: '', firstName: '', lastName: '' }); // Reset form
    setResendOtpMessage(''); // Clear resend message when going back
    setResendCooldown(0); // Reset cooldown when going back
  };

  // Handler for Resend OTP
  const handleResendOtp = async () => {
    if (isResendingOtp) return;
    setIsResendingOtp(true);
    setResendOtpMessage('');
    setOtpError(''); // Clear previous OTP field errors

    // Normalize Gmail address before resending
    const normalizedEmail = normalizeGmailAddress(verifyingEmail);

    const { error: resendError } = await supabase.auth.resend({
      type: 'signup',
      email: normalizedEmail,
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
          <InputGroup>
            <Label htmlFor="verification-code-0">Verification Code</Label>
            <VerificationContainer role="group" aria-labelledby="verification-code-label" onPaste={handleOtpPaste}>
              <span id="verification-code-label" className="sr-only">Enter the 6-digit verification code</span>
            {verificationCode.map((digit, index) => (
                  <VerificationInput
                    key={index}
                  ref={el => { otpInputRefs.current[index] = el; }}
                  id={`verification-code-${index}`}
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
              <MessageContainer>
              <FiX size={12} />
              {otpError}
              </MessageContainer>
            )}
          {successMessage && (
            <MessageContainer $isSuccess>
              <FiCheck size={12} />
              {successMessage}
            </MessageContainer>
          )}
          {resendOtpMessage && (
            <MessageContainer $isSuccess={!resendOtpMessage.toLowerCase().includes('fail') && !resendOtpMessage.toLowerCase().includes('error')}>
              {(!resendOtpMessage.toLowerCase().includes('fail') && !resendOtpMessage.toLowerCase().includes('error'))
                ? <FiCheck size={12} />
                : <FiX size={12} />}
              {resendOtpMessage}
            </MessageContainer>
          )}
          </InputGroup>
          <ButtonContainer style={{marginTop: '2rem'}}>
            <SecondaryButton type="button" onClick={switchToSignupMode}>
              Back
            </SecondaryButton>
            <Button type="submit" disabled={isVerifyingOtp || !isVerificationCodeComplete}>
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
      <GoogleButton
        type="button"
        onClick={handleGoogleSignUp}
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
      <Form onSubmit={handleSubmit} noValidate>
        <FormRow>
          <FormGroup>
            <Label htmlFor="firstName">
              First Name
            </Label>
            <Input
              id="firstName"
              name="firstName"
              type="text"
              value={formData.firstName}
              onChange={handleChange}
              required
              autoComplete="given-name"
              placeholder="Enter your first name"
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="lastName">
              Last Name
            </Label>
            <Input
              id="lastName"
              name="lastName"
              type="text"
              value={formData.lastName}
              onChange={handleChange}
              required
              autoComplete="family-name"
              placeholder="Enter your last name"
            />
          </FormGroup>
        </FormRow>
        {nameError && <MessageContainer><FiX size={12} />{nameError}</MessageContainer>}
        
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
          {emailError && <MessageContainer><FiX size={12} />{emailError}</MessageContainer>}
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
            {/* Show both length validation and any password errors */}
            {(formData.password && !passwordValidations.minLength) && (
              <HelperText style={{ color: 'red' }}>
                <FiX size={12} /> Must be at least 8 characters
              </HelperText>
            )}
            {passwordError && (
              <HelperText style={{ color: 'red' }}>
                <FiX size={12} /> {passwordError}
              </HelperText>
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
            {/* Only show error, not success, for passwords match */}
            {formData.confirmPassword && passwordsMatch === false && (
              <HelperText style={{ color: 'red' }}>
                <FiX size={12} /> Passwords do not match
              </HelperText>
            )}
            </FormGroup>
          </FormRow>
        {/* Remove the separate password error display since it's now in the helper text */}
        {error && !emailError && !passwordError && <MessageContainer><FiX size={12} />{error}</MessageContainer>}
        {successMessage && <MessageContainer $isSuccess><FiCheck size={12} />{successMessage}</MessageContainer>}

        <ButtonContainer>
          <Button type="submit" disabled={loading || !isFormValid}>
            {loading ? 'Creating Account' : 'Create Account'}
            {loading && <AnimatedDots />}
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