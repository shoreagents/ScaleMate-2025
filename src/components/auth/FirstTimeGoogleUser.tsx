import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { supabase } from '@/lib/supabase';
import { FiEye, FiEyeOff } from 'react-icons/fi';

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

const FormGroup = styled.div`
  margin-bottom: ${props => props.theme.spacing.md};
`;

const Label = styled.label`
  display: block;
  margin-bottom: ${props => props.theme.spacing.sm};
  color: ${props => props.theme.colors.text.secondary};
  font-size: 0.9rem;
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

const Button = styled.button`
  width: 100%;
  padding: ${props => props.theme.spacing.sm};
  background-color: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  color: #dc2626;
  font-size: 0.9rem;
  margin-top: ${props => props.theme.spacing.sm};
`;

const SuccessMessage = styled.div`
  color: #059669;
  font-size: 0.9rem;
  margin-top: ${props => props.theme.spacing.sm};
`;

const PasswordInputContainer = styled.div`
  position: relative;
`;

const ViewPasswordButton = styled.button`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: ${props => props.theme.colors.text.secondary};
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const PasswordStrengthIndicator = styled.div<{ $strength: 'weak' | 'medium' | 'strong' }>`
  margin-top: ${props => props.theme.spacing.xs};
  font-size: 0.8rem;
  color: ${props => {
    switch (props.$strength) {
      case 'weak': return '#dc2626';
      case 'medium': return '#f59e0b';
      case 'strong': return '#059669';
      default: return props.theme.colors.text.secondary;
    }
  }};
`;

const UsernameInputContainer = styled.div`
  position: relative;
`;

const UsernameStatus = styled.div<{ $status: 'checking' | 'available' | 'taken' | null }>`
  margin-top: ${props => props.theme.spacing.xs};
  font-size: 0.8rem;
  color: ${props => {
    switch (props.$status) {
      case 'checking': return props.theme.colors.text.secondary;
      case 'available': return '#059669';
      case 'taken': return '#dc2626';
      default: return props.theme.colors.text.secondary;
    }
  }};
`;

interface FirstTimeGoogleUserProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export default function FirstTimeGoogleUser({ onSuccess, onError }: FirstTimeGoogleUserProps) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [usernameStatus, setUsernameStatus] = useState<'checking' | 'available' | 'taken' | null>(null);
  const [checkingUsername, setCheckingUsername] = useState(false);
  const router = useRouter();

  // Fetch current username when component mounts
  useEffect(() => {
    const fetchCurrentUsername = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { data: profile } = await supabase
          .from('user_profiles')
          .select('username')
          .eq('user_id', user.id)
          .single();

        if (profile?.username) {
          setUsername(profile.username);
        }
      } catch (error) {
        console.error('Error fetching username:', error);
      }
    };

    fetchCurrentUsername();
  }, []);

  const checkUsername = async (value: string) => {
    if (!value) {
      setUsernameStatus(null);
      return;
    }

    setCheckingUsername(true);
    setUsernameStatus('checking');

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: existingUsername } = await supabase
        .from('user_profiles')
        .select('username')
        .eq('username', value)
        .neq('user_id', user.id)
        .single();

      setUsernameStatus(existingUsername ? 'taken' : 'available');
    } catch (error) {
      setUsernameStatus(null);
    } finally {
      setCheckingUsername(false);
    }
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUsername(value);
    checkUsername(value);
  };

  const getPasswordStrength = (password: string): 'weak' | 'medium' | 'strong' => {
    if (password.length < 8) return 'weak';
    if (password.length < 12) return 'medium';
    if (/[A-Z]/.test(password) && /[a-z]/.test(password) && /[0-9]/.test(password)) {
      return 'strong';
    }
    return 'medium';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    if (password !== confirmPassword) {
      const errorMessage = 'Passwords do not match';
      setError(errorMessage);
      onError?.(errorMessage);
      setIsLoading(false);
      return;
    }

    if (password.length < 8) {
      const errorMessage = 'Password must be at least 8 characters long';
      setError(errorMessage);
      onError?.(errorMessage);
      setIsLoading(false);
      return;
    }

    if (usernameStatus === 'taken') {
      const errorMessage = 'Username is already taken';
      setError(errorMessage);
      onError?.(errorMessage);
      setIsLoading(false);
      return;
    }

    try {
      // Update the password
      const { error: updateError } = await supabase.auth.updateUser({
        password: password
      });

      if (updateError) throw updateError;

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('User not found');
      }

      // Update the last_password_change timestamp and username
      const { error: profileError } = await supabase
        .from('user_profiles')
        .update({
          last_password_change: new Date().toISOString(),
          username: username
        })
        .eq('user_id', user.id);

      if (profileError) throw profileError;

      const successMessage = 'Account setup completed successfully!';
      setSuccess(successMessage);
      onSuccess?.();
      
      // Redirect to dashboard after successful setup
      setTimeout(() => {
        router.push('/user/dashboard');
      }, 2000);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred while setting up your account';
      setError(errorMessage);
      onError?.(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="username">Choose Your Username</Label>
          <UsernameInputContainer>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={handleUsernameChange}
              required
              placeholder="Enter your username"
              disabled={isLoading}
            />
          </UsernameInputContainer>
          {username && (
            <UsernameStatus $status={usernameStatus}>
              {usernameStatus === 'checking' && 'Checking username...'}
              {usernameStatus === 'available' && 'Username is available'}
              {usernameStatus === 'taken' && 'Username is already taken'}
            </UsernameStatus>
          )}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="password">Set Your Password</Label>
          <PasswordInputContainer>
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your new password"
            />
            <ViewPasswordButton
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
            </ViewPasswordButton>
          </PasswordInputContainer>
          {password && (
            <PasswordStrengthIndicator $strength={getPasswordStrength(password)}>
              Password strength: {getPasswordStrength(password)}
            </PasswordStrengthIndicator>
          )}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <PasswordInputContainer>
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="Confirm your new password"
            />
            <ViewPasswordButton
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
            </ViewPasswordButton>
          </PasswordInputContainer>
        </FormGroup>

        {error && <ErrorMessage>{error}</ErrorMessage>}
        {success && <SuccessMessage>{success}</SuccessMessage>}

        <Button 
          type="submit" 
          disabled={isLoading || usernameStatus === 'taken' || checkingUsername}
        >
          {isLoading ? 'Setting Up Account...' : 'Complete Setup'}
        </Button>
      </Form>
    </Container>
  );
} 