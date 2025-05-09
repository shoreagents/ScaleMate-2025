import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { supabase } from '@/lib/supabase';
import { FiEye, FiEyeOff, FiX, FiCheck } from 'react-icons/fi';

const Container = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing.lg};
`;

const Form = styled.form`
  background: white;
  padding: ${props => props.theme.spacing.lg};
  border-radius: 8px;
  box-shadow: ${props => props.theme.shadows.md};
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text.primary};
  margin-bottom: ${props => props.theme.spacing.sm};
  text-align: center;
`;

const Subtitle = styled.p`
  font-size: 0.875rem;
  color: ${props => props.theme.colors.text.secondary};
  margin-bottom: ${props => props.theme.spacing.lg};
  text-align: center;
`;

const FormGroup = styled.div`
  margin-bottom: ${props => props.theme.spacing.md};
`;

const Label = styled.label`
  display: block;
  margin-bottom: ${props => props.theme.spacing.sm};
  color: ${props => props.theme.colors.text.secondary};
  font-size: 0.9rem;
`;

const RequiredAsterisk = styled.span`
  color: #dc2626;
  margin-left: 0.25rem;
`;

const InputWrapper = styled.div`
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  padding: ${props => props.theme.spacing.sm};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 4px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const PasswordInputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const PasswordToggle = styled.button`
  position: absolute;
  right: ${props => props.theme.spacing.sm};
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  color: ${props => props.theme.colors.text.secondary};
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: ${props => props.theme.colors.text.primary};
  }
`;

const Button = styled.button`
  width: 100%;
  padding: ${props => props.theme.spacing.sm};
  background-color: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const MessageContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: ${props => props.theme.spacing.sm};
  border-radius: 4px;
  margin-top: ${props => props.theme.spacing.sm};
  font-size: 0.875rem;
`;

const ErrorMessage = styled(MessageContainer)`
  background-color: #fee2e2;
  color: #dc2626;
`;

const SuccessMessage = styled(MessageContainer)`
  background-color: #dcfce7;
  color: #059669;
`;

const HelperText = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.75rem;
  margin-top: 0.25rem;
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
  margin-top: ${props => props.theme.spacing.md};

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

interface ResetPasswordProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export default function ResetPassword({ onSuccess, onError }: ResetPasswordProps) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordValidation, setPasswordValidation] = useState({
    length: false,
    match: false
  });
  const [verificationCode, setVerificationCode] = useState<string[]>(Array(6).fill(''));
  const [isResending, setIsResending] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(0);
  const router = useRouter();
  const { token } = router.query;

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
    setSuccess(null);
    setIsResending(true);

    try {
      // Get the email from the token
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError || !user) {
        throw new Error('Unable to get user information. Please try again.');
      }

      const { error: resendError } = await supabase.auth.resend({
        type: 'signup',
        email: user.email!
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
      onSuccess?.();
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsLoading(true);

    try {
      // Validate password length
      if (password.length < 8) {
        throw new Error('Password must be at least 8 characters long');
      }

      // Validate password match
      if (password !== confirmPassword) {
        throw new Error('Passwords do not match');
      }

      // Join the verification code digits
      const fullCode = verificationCode.join('');

      // Verify the OTP code
      const { error: verifyError } = await supabase.auth.verifyOtp({
        token_hash: token as string,
        type: 'recovery',
        token: fullCode
      });

      if (verifyError) {
        console.log('Verify error:', verifyError); // Debug log
        if (verifyError.status === 429 || 
            verifyError.message.toLowerCase().includes('too many requests') ||
            verifyError.message.toLowerCase().includes('rate limit') ||
            verifyError.message.toLowerCase().includes('security')) {
          setError('Too many attempts. Please wait a few minutes before trying again.');
          onError?.('Too many attempts. Please wait a few minutes before trying again.');
          return;
        }
        throw verifyError;
      }

      // Update the password
      const { error: updateError } = await supabase.auth.updateUser({
        password: password
      });

      if (updateError) {
        throw updateError;
      }

      setSuccess('Password updated successfully!');
      onSuccess?.();

      // Redirect to login page after a short delay
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } catch (err) {
      console.error('Reset password error:', err);
      const errorMessage = err instanceof Error ? err.message : 'An error occurred while resetting password';
      setError(errorMessage);
      onError?.(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // If no token is present, show error
  if (!token) {
    return (
      <Container>
        <Form>
          <ErrorMessage>
            <FiX size={14} />
            Invalid or expired reset link. Please request a new password reset link.
          </ErrorMessage>
          <Button onClick={() => router.push('/login')}>
            Return to Login
          </Button>
        </Form>
      </Container>
    );
  }

  return (
    <Container>
      <Title>Reset Password</Title>
      <Subtitle>Please enter the verification code sent to your email and your new password below.</Subtitle>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
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
        </FormGroup>

        <FormGroup>
          <Label htmlFor="password">
            New Password
            <RequiredAsterisk>*</RequiredAsterisk>
          </Label>
          <InputWrapper>
            <PasswordInputWrapper>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your new password"
                required
              />
              <PasswordToggle
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </PasswordToggle>
            </PasswordInputWrapper>
            {password && (
              <HelperText style={{ color: passwordValidation.length ? '#059669' : '#dc2626' }}>
                {passwordValidation.length ? <FiCheck size={14} /> : <FiX size={14} />}
                {passwordValidation.length ? 'Password length is valid' : 'Password must be at least 8 characters'}
              </HelperText>
            )}
          </InputWrapper>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="confirmPassword">
            Confirm New Password
            <RequiredAsterisk>*</RequiredAsterisk>
          </Label>
          <InputWrapper>
            <PasswordInputWrapper>
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your new password"
                required
              />
              <PasswordToggle
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
              >
                {showConfirmPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </PasswordToggle>
            </PasswordInputWrapper>
            {confirmPassword && (
              <HelperText style={{ color: passwordValidation.match ? '#059669' : '#dc2626' }}>
                {passwordValidation.match ? <FiCheck size={14} /> : <FiX size={14} />}
                {passwordValidation.match ? 'Passwords match' : 'Passwords do not match'}
              </HelperText>
            )}
          </InputWrapper>
        </FormGroup>

        {error && (
          <ErrorMessage>
            <FiX size={14} />
            {error}
          </ErrorMessage>
        )}
        {success && (
          <SuccessMessage>
            <FiCheck size={14} />
            {success}
          </SuccessMessage>
        )}

        <Button 
          type="submit" 
          disabled={isLoading || !passwordValidation.length || !passwordValidation.match || verificationCode.join('').length !== 6}
        >
          {isLoading ? 'Updating Password...' : 'Update Password'}
        </Button>

        <ResendLink>
          {resendCountdown > 0 ? (
            <>Please wait <span className="timer">{resendCountdown}s</span> before requesting a new code</>
          ) : (
            <>Didn't receive the code? <button type="button" onClick={handleResendCode} disabled={isResending || resendCountdown > 0}>{isResending ? 'Sending...' : 'Resend Code'}</button></>
          )}
        </ResendLink>
      </Form>
    </Container>
  );
} 