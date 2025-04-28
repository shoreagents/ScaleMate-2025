import React, { useState } from 'react';
import styled from 'styled-components';
import { supabase } from '@/lib/supabase';
import { FiEye, FiEyeOff, FiX, FiCheck, FiLoader } from 'react-icons/fi';

const ModalOverlay = styled.div`
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

const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  width: 100%;
  max-width: 480px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
`;

const ModalHeader = styled.div`
  margin-bottom: 2.5rem;
`;

const Title = styled.h2`
  font-size: 1.75rem;
  font-weight: 700;
  color: #1F2937;
  margin: 0;
`;

const Description = styled.p`
  font-size: 0.875rem;
  color: #6B7280;
  margin: 0;
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
  flex: 1;
`;

const FormRow = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;
`;

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
`;

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.875rem 1rem;
  border: 1.5px solid #E5E7EB;
  border-radius: 8px;
  font-size: 0.875rem;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #3B82F6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
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
  color: #6B7280;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #374151;
  }
`;

const HelperText = styled.div`
  font-size: 0.75rem;
  color: #6B7280;
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const ErrorMessage = styled.div`
  font-size: 0.875rem;
  color: #DC2626;
  background-color: #FEE2E2;
  padding: 0.75rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const SuccessMessage = styled.div`
  font-size: 0.875rem;
  color: #059669;
  background-color: #D1FAE5;
  padding: 0.75rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Button = styled.button`
  padding: 0.875rem;
  background-color: #3B82F6;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  width: 100%;
  margin-top: 1.5rem;

  &:hover {
    background-color: #2563EB;
  }

  &:disabled {
    background-color: #93C5FD;
    cursor: not-allowed;
  }
`;

const RequiredAsterisk = styled.span`
  color: #DC2626;
  margin-left: 4px;
`;

interface FirstTimeSetupFormProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  currentUsername: string;
}

export default function FirstTimeSetupForm({ isOpen, onClose, userId, currentUsername }: FirstTimeSetupFormProps) {
  const [formData, setFormData] = useState({
    username: currentUsername,
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [checkingUsername, setCheckingUsername] = useState(false);

  const validateUsername = async (username: string) => {
    // Clear previous errors
    setUsernameError(null);

    // Basic validation
    if (!username) {
      setUsernameError('Username is required');
      return false;
    }

    // Check for special characters
    if (!/^[a-zA-Z0-9._-]*$/.test(username)) {
      setUsernameError('Special characters are not allowed');
      return false;
    }

    // If username is the same as current, it's valid
    if (username === currentUsername) {
      return true;
    }

    // Check if username exists
    setCheckingUsername(true);
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('username')
        .eq('username', username)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          // No rows found - username is available
          return true;
        }
        throw error;
      }

      if (data) {
        setUsernameError('Username is already taken');
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error checking username:', error);
      setUsernameError('Error checking username availability');
      return false;
    } finally {
      setCheckingUsername(false);
    }
  };

  const validatePasswords = (password: string, confirmPassword: string): boolean => {
    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return false;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsLoading(true);

    try {
      // Validate username
      const isUsernameValid = await validateUsername(formData.username);
      if (!isUsernameValid) {
        throw new Error('Please fix the username errors');
      }

      // Validate password
      const isPasswordValid = validatePasswords(formData.password, formData.confirmPassword);
      if (!isPasswordValid) {
        throw new Error('Please fix the password errors');
      }

      // Update password
      const { error: passwordError } = await supabase.auth.updateUser({
        password: formData.password
      });

      if (passwordError) {
        throw new Error('Failed to update password: ' + passwordError.message);
      }

      // Update username and last_password_change
      const { error: profileError } = await supabase
        .from('user_profiles')
        .update({
          username: formData.username,
          last_password_change: new Date().toISOString()
        })
        .eq('user_id', userId);

      if (profileError) {
        throw new Error('Failed to update profile: ' + profileError.message);
      }

      setSuccess('Setup completed successfully!');
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (err) {
      console.error('Setup error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred during setup');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalHeader>
          <Title>Complete Your Setup</Title>
          <Description>
            Set your password and update your username to complete your account setup.
          </Description>
        </ModalHeader>

        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="username">
              Username
              <RequiredAsterisk>*</RequiredAsterisk>
            </Label>
            <InputWrapper>
              <Input
                id="username"
                type="text"
                value={formData.username}
                onChange={(e) => {
                  setFormData(prev => ({ ...prev, username: e.target.value }));
                  validateUsername(e.target.value);
                }}
                placeholder="Choose a username"
                required
              />
              {checkingUsername && (
                <HelperText>
                  <FiLoader size={14} />
                  Checking username...
                </HelperText>
              )}
              {usernameError && (
                <HelperText style={{ color: '#DC2626' }}>
                  <FiX size={14} />
                  {usernameError}
                </HelperText>
              )}
            </InputWrapper>
          </FormGroup>

          <FormRow>
            <FormGroup>
              <Label htmlFor="password">
                Password
                <RequiredAsterisk>*</RequiredAsterisk>
              </Label>
              <PasswordInputWrapper>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                  placeholder="Create a password"
                  required
                />
                <PasswordToggle
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </PasswordToggle>
              </PasswordInputWrapper>
              {formData.password && (
                <HelperText style={{ color: formData.password.length >= 8 ? '#059669' : '#DC2626' }}>
                  {formData.password.length >= 8 ? <FiCheck size={14} /> : <FiX size={14} />}
                  Password must be at least 8 characters
                </HelperText>
              )}
            </FormGroup>

            <FormGroup>
              <Label htmlFor="confirmPassword">
                Confirm Password
                <RequiredAsterisk>*</RequiredAsterisk>
              </Label>
              <PasswordInputWrapper>
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
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
              {formData.confirmPassword && (
                <HelperText style={{ color: formData.password === formData.confirmPassword ? '#059669' : '#DC2626' }}>
                  {formData.password === formData.confirmPassword ? <FiCheck size={14} /> : <FiX size={14} />}
                  Passwords {formData.password === formData.confirmPassword ? 'match' : 'do not match'}
                </HelperText>
              )}
            </FormGroup>
          </FormRow>

          {error && (
            <ErrorMessage>
              <FiX size={16} />
              {error}
            </ErrorMessage>
          )}

          {success && (
            <SuccessMessage>
              <FiCheck size={16} />
              {success}
            </SuccessMessage>
          )}

          <Button
            type="submit"
            disabled={isLoading || !formData.username || !formData.password || !formData.confirmPassword}
          >
            {isLoading ? 'Saving...' : 'Complete Setup'}
          </Button>
        </Form>
      </ModalContent>
    </ModalOverlay>
  );
} 