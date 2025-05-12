import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { supabase } from '@/lib/supabase';
import { FiEye, FiEyeOff, FiX, FiCheck } from 'react-icons/fi';

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

const PasswordHelperContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`;

const PasswordLabelContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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

const BackToSignInButton = styled(SecondaryButton)`
  margin-top: 1rem;
`;

// Add normalizeEmail function
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

interface ResetPasswordProps {
  email: string;
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export default function ResetPassword({ email, onSuccess, onError }: ResetPasswordProps) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordValidation, setPasswordValidation] = useState({
    length: false,
    match: false
  });
  const [verificationCode, setVerificationCode] = useState<string[]>(Array(6).fill(''));
  const [isResending, setIsResending] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(60);
  const [isVerified, setIsVerified] = useState(false);
  const [showBackToSignIn, setShowBackToSignIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Start the countdown when component mounts
    setResendCountdown(60);
  }, []);

  useEffect(() => {
    // Validate password length
    setPasswordValidation(prev => ({
      ...prev,
      length: password.length >= 8
    }));
  }, [password]);

  useEffect(() => {
    // Validate password match
    setPasswordValidation(prev => ({
      ...prev,
      match: password === confirmPassword && password !== ''
    }));
  }, [password, confirmPassword]);

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

  const handleResendCode = async () => {
    if (resendCountdown > 0) return;
    
    setError(null);
    setIsResending(true);

    try {
      // Normalize email before sending
      const normalizedEmail = normalizeEmail(email);

      const { error: resendError } = await supabase.auth.resetPasswordForEmail(normalizedEmail);

      if (resendError) {
        if (resendError.message.includes('rate limit') || resendError.message.includes('For security purposes')) {
          throw new Error('Too many attempts! Please wait a few minutes before trying again.');
        } else {
          throw resendError;
        }
      }

      setResendCountdown(60);
    } catch (err) {
      console.error('Resend error:', err);
      const errorMessage = err instanceof Error ? err.message : 'An error occurred while resending the code';
      setError(errorMessage);
      onError?.(errorMessage);
    } finally {
      setIsResending(false);
    }
  };

  const handleVerificationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      // Join the verification code digits
      const fullCode = verificationCode.join('');

      // Normalize email before verification
      const normalizedEmail = normalizeEmail(email);

      // Verify the OTP code
      const { error: verifyError } = await supabase.auth.verifyOtp({
        email: normalizedEmail,
        token: fullCode,
        type: 'recovery'
      });

      if (verifyError) {
        console.log('Verify error:', verifyError);
        if (verifyError.status === 429 || 
            verifyError.message.toLowerCase().includes('too many requests') ||
            verifyError.message.toLowerCase().includes('rate limit') ||
            verifyError.message.toLowerCase().includes('security')) {
          const rateLimitMessage = 'Too many attempts! Please wait a few minutes before trying again.';
          setError(rateLimitMessage);
          onError?.(rateLimitMessage);
          return;
        }
        if (verifyError.message.toLowerCase().includes('token has expired') ||
            verifyError.message.toLowerCase().includes('invalid token') ||
            verifyError.message.toLowerCase().includes('invalid otp')) {
          setError('Token has expired or is invalid!');
          onError?.('Token has expired or is invalid!');
          return;
        }
        throw verifyError;
      }

      setIsVerified(true);
    } catch (err) {
      console.error('Verification error:', err);
      const errorMessage = err instanceof Error ? err.message : 'An error occurred while verifying code';
      setError(errorMessage);
      onError?.(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      // Validate passwords match
      if (password !== confirmPassword) {
        throw new Error('Passwords do not match!');
      }

      // Validate password length
      if (password.length < 8) {
        throw new Error('Password must be at least 8 characters!');
      }

      const { error: updateError } = await supabase.auth.updateUser({
        password: password
      });

      if (updateError) {
        console.log('Update error:', updateError);
        if (updateError.message?.includes('different from the old password')) {
          setError('Please choose a different password from your current one.');
          setIsLoading(false);
          return; // Return early without calling onError
        }
        if (updateError.message?.includes('Auth session missing')) {
          setShowBackToSignIn(true);
          setError('Your session has expired. Please try resetting your password again.');
          setIsLoading(false);
          return; // Return early after setting the error
        }
        throw updateError;
      }

      // Just call onSuccess without any message
      onSuccess?.();
    } catch (err) {
      console.error('Password update error:', err);
      const errorMessage = err instanceof Error ? err.message : 'An error occurred while updating password';
      setError(errorMessage);
      // Only call onError for non-password-specific errors
      if (!errorMessage.includes('different from your current one')) {
        onError?.(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (!isVerified) {
    return (
      <FormContainer>
        <Title>Verify Your Email</Title>
        <Subtitle>Please enter the verification code sent to your email</Subtitle>
        <Form onSubmit={handleVerificationSubmit}>
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
                <Button 
                  type="submit" 
                  disabled={isLoading || verificationCode.join('').length !== 6}
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
      <Title>Set New Password</Title>
      <Subtitle>Please enter your new password below</Subtitle>
      <Form onSubmit={handlePasswordSubmit}>
        <FormContent>
          <FormFields>
            <InputGroup>
              <Label htmlFor="password">New Password</Label>
              <PasswordInputGroup>
                <PasswordInputContainer>
                  <PasswordInput
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your new password"
                    required
                  />
                  <ViewPasswordButton
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                  </ViewPasswordButton>
                </PasswordInputContainer>
                <PasswordHelperContainer>
                  {password && (
                    <MessageContainer $isSuccess={passwordValidation.length}>
                      {passwordValidation.length ? <FiCheck size={14} /> : <FiX size={14} />}
                      {passwordValidation.length ? 'Password length is valid.' : 'Password must be at least 8 characters.'}
                    </MessageContainer>
                  )}
                  {error && (
                    <MessageContainer>
                      <FiX size={14} />
                      {error}
                    </MessageContainer>
                  )}
                </PasswordHelperContainer>
              </PasswordInputGroup>
            </InputGroup>

            <InputGroup>
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <PasswordInputGroup>
                <PasswordInputContainer>
                  <PasswordInput
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your new password"
                    required
                  />
                  <ViewPasswordButton
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                  </ViewPasswordButton>
                </PasswordInputContainer>
                {confirmPassword && (
                  <MessageContainer $isSuccess={passwordValidation.match}>
                    {passwordValidation.match ? <FiCheck size={14} /> : <FiX size={14} />}
                    {passwordValidation.match ? 'Passwords match!' : 'Passwords do not match!'}
                  </MessageContainer>
                )}
              </PasswordInputGroup>
            </InputGroup>
          </FormFields>
          <FormActions>
            <ButtonContainer>
              <Button 
                type="submit" 
                disabled={isLoading || !passwordValidation.length || !passwordValidation.match}
              >
                {isLoading ? 'Updating Password...' : 'Update Password'}
              </Button>
            </ButtonContainer>
            {showBackToSignIn && (
              <BackToSignInButton type="button" onClick={() => onSuccess?.()}>
                Back to Sign In
              </BackToSignInButton>
            )}
          </FormActions>
        </FormContent>
      </Form>
    </FormContainer>
  );
} 