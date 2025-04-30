import React, { useState } from 'react';
import styled from 'styled-components';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/router';
import { useAuth } from '@/contexts/AuthContext';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { FiEye, FiEyeOff, FiX, FiCheck } from 'react-icons/fi';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Modal = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 1001;
`;

const Title = styled.h2`
  margin-bottom: 1.5rem;
  color: #1a1a1a;
  font-size: 1.5rem;
  font-weight: 600;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 0.875rem;
  color: #4a5568;
  font-weight: 500;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #3182ce;
    box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.1);
  }
`;

const Button = styled.button`
  background-color: #3182ce;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #2c5282;
  }

  &:disabled {
    background-color: #a0aec0;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  color: #e53e3e;
  font-size: 0.875rem;
  margin-top: 0.5rem;
`;

const SuccessMessage = styled.div`
  color: #38a169;
  font-size: 0.875rem;
  margin-top: 0.5rem;
`;

const PasswordInputWrapper = styled.div`
  position: relative;
  width: 100%;
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
  color: #4a5568;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #2d3748;
  }
`;

const HelperText = styled.div`
  font-size: 0.75rem;
  color: #4a5568;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  margin-top: 0.25rem;
`;

const PasswordHelperText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-top: 0.25rem;
`;

interface FirstTimeSetupFormProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  currentUsername: string;
}

const FirstTimeSetupForm: React.FC<FirstTimeSetupFormProps> = ({
  isOpen,
  onClose,
  userId,
  currentUsername
}) => {
  const [username, setUsername] = useState(currentUsername);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordValidation, setPasswordValidation] = useState({
    length: false,
    match: false
  });
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const router = useRouter();
  const { setUser } = useAuth();

  const validateUsername = (value: string) => {
    // Allow empty value for backspace
    if (!value) {
      setUsernameError(null);
      return false;
    }
    if (!/^[a-zA-Z0-9._-]*$/.test(value)) {
      setUsernameError('Special characters are not allowed');
      return false;
    }
    setUsernameError(null);
    return true;
  };

  const validatePasswords = (password: string, confirmPassword: string): boolean => {
    const validations = {
      length: password.length >= 8,
      match: password === confirmPassword && password !== ''
    };
    setPasswordValidation(validations);
    return validations.length && validations.match;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      // Validate username
      if (!username) {
        setError('Username is required');
        setLoading(false);
        return;
      }

      if (!validateUsername(username)) {
        setError('Username contains invalid characters');
        setLoading(false);
        return;
      }

      // Check if username is already taken
      const { data: existingUser, error: checkError } = await supabase
        .from('user_profiles')
        .select('username')
        .eq('username', username)
        .neq('user_id', userId)
        .single();

      if (checkError && checkError.code !== 'PGRST116') {
        throw new Error('Failed to check username availability');
      }

      if (existingUser) {
        setError('Username is already taken');
        setLoading(false);
        return;
      }

      // Validate password
      if (!password || password.length < 8) {
        setError('Password must be at least 8 characters long');
        setLoading(false);
        return;
      }

      if (password !== confirmPassword) {
        setError('Passwords do not match');
        setLoading(false);
        return;
      }

      // Update user profile
      const { error: profileError } = await supabase
        .from('user_profiles')
        .update({
          username,
          last_password_change: new Date().toISOString()
        })
        .eq('user_id', userId);

      if (profileError) {
        throw new Error('Failed to update profile');
      }

      // Update user's password
      const { error: passwordError } = await supabase.auth.updateUser({
        password: password
      });

      if (passwordError) {
        throw new Error('Failed to update password');
      }

      // Refresh user session
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError) {
        throw new Error('Failed to refresh user session');
      }

      if (user) {
        setUser(user);
      }

      setSuccess('Profile updated successfully');
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = () => {
    return (
      username &&
      !usernameError &&
      passwordValidation.length &&
      passwordValidation.match
    );
  };

  if (!isOpen) return null;

  return (
    <Overlay>
      <Modal>
        <Title>Complete Your Profile</Title>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              pattern="[a-zA-Z0-9._-]*"
              value={username}
              onChange={(e) => {
                const value = e.target.value;
                validateUsername(value);
                if (value === '' || e.target.validity.valid) {
                  setUsername(value);
                }
              }}
              placeholder="Choose a username"
              required
            />
            {usernameError && (
              <HelperText style={{ color: '#dc2626' }}>
                <FiX size={14} />
                {usernameError}
              </HelperText>
            )}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="password">Password</Label>
            <PasswordInputWrapper>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  validatePasswords(e.target.value, confirmPassword);
                }}
                placeholder="Enter your password"
                required
              />
              <PasswordToggle
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </PasswordToggle>
            </PasswordInputWrapper>
            <PasswordHelperText>
              {password && (
                <HelperText style={{ color: passwordValidation.length ? '#38a169' : '#e53e3e' }}>
                  {passwordValidation.length ? <FiCheck size={14} /> : <FiX size={14} />}
                  {passwordValidation.length ? 'Password length is valid' : 'Password must be at least 8 characters'}
                </HelperText>
              )}
            </PasswordHelperText>
          </FormGroup>

          <FormGroup>
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <PasswordInputWrapper>
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  validatePasswords(password, e.target.value);
                }}
                placeholder="Confirm your password"
                required
              />
              <PasswordToggle
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </PasswordToggle>
            </PasswordInputWrapper>
            <PasswordHelperText>
              {confirmPassword && (
                <HelperText style={{ color: passwordValidation.match ? '#38a169' : '#e53e3e' }}>
                  {passwordValidation.match ? <FiCheck size={14} /> : <FiX size={14} />}
                  {passwordValidation.match ? 'Passwords match' : 'Passwords do not match'}
                </HelperText>
              )}
            </PasswordHelperText>
          </FormGroup>

          {error && <ErrorMessage>{error}</ErrorMessage>}
          {success && <SuccessMessage>{success}</SuccessMessage>}

          <Button type="submit" disabled={loading || !isFormValid()}>
            {loading ? <LoadingSpinner /> : 'Complete Setup'}
          </Button>
        </Form>
      </Modal>
    </Overlay>
  );
};

export default FirstTimeSetupForm; 