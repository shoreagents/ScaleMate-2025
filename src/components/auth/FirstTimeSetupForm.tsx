import React, { useState } from 'react';
import styled from 'styled-components';
import { supabase } from '@/lib/supabase';
import { FiEye, FiEyeOff, FiX, FiCheck, FiLoader } from 'react-icons/fi';
import { createClient } from '@supabase/supabase-js';

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
  margin-bottom: 3rem;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${props => props.theme.colors.text.primary};
  margin: 0;
`;

const Description = styled.p`
  font-size: 0.875rem;
  color: ${props => props.theme.colors.text.secondary};
  margin-bottom: 3rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
`;

const FormRow = styled.div`
  display: flex;
  gap: 0.875rem;
  width: 100%;
`;

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text.primary};
`;

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
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

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px ${props => props.theme.colors.primary}15;
  }

  &::placeholder {
    color: ${props => props.theme.colors.text.secondary};
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
  color: ${props => props.theme.colors.text.secondary};
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: ${props => props.theme.colors.text.primary};
  }
`;

const HelperText = styled.div`
  font-size: 0.75rem;
  color: ${props => props.theme.colors.text.secondary};
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const ErrorMessage = styled.div`
  font-size: 0.875rem;
  color: ${props => props.theme.colors.error};
  background-color: ${props => props.theme.colors.error}15;
  padding: 0.75rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
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
  margin-top: 1.5rem;

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

const RequiredAsterisk = styled.span`
  color: ${props => props.theme.colors.error};
  margin-left: 4px;
`;

const PasswordInputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 8px;
`;

const MessageContainer = styled.div<{ $isSuccess?: boolean }>`
  padding: 0.75rem;
  border-radius: 8px;
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
  color: ${props => props.$isSuccess ? props.theme.colors.success : props.theme.colors.error};
  background-color: ${props => props.$isSuccess ? `${props.theme.colors.success}15` : `${props.theme.colors.error}15`};
`;

const SuccessModal = styled.div<{ $isOpen: boolean }>`
  display: ${props => props.$isOpen ? 'flex' : 'none'};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  z-index: 1001;
`;

const SuccessModalContent = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 12px;
  width: 100%;
  max-width: 400px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const SuccessIcon = styled.div`
  width: 48px;
  height: 48px;
  background-color: ${props => props.theme.colors.success}15;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  color: ${props => props.theme.colors.success};
`;

const SuccessTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text.primary};
  margin-bottom: 0.5rem;
`;

const SuccessMessage = styled.p`
  font-size: 0.875rem;
  color: ${props => props.theme.colors.text.secondary};
  margin-bottom: 1.5rem;
`;

const SuccessButton = styled.button`
  padding: 0.875rem 1.5rem;
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
`;

const PasswordHelperText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
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
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [checkingUsername, setCheckingUsername] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

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
      // Create a client with service role key for admin access
      const serviceRoleClient = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!,
        {
          auth: {
            autoRefreshToken: false,
            persistSession: false
          }
        }
      );
      
      // Query the user_profiles table with service role
      const { data, error } = await serviceRoleClient
        .from('user_profiles')
        .select('username')
        .eq('username', username)
        .limit(1);

      if (error) {
        console.error('Error checking username:', error);
        setUsernameError('Error checking username availability');
        return false;
      }

      if (data && data.length > 0) {
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

      // Show success modal
      setShowSuccessModal(true);
    } catch (err) {
      console.error('Setup error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred during setup');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
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
                <InputWrapper>
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
                </InputWrapper>
              </FormGroup>

              <FormGroup>
                <Label htmlFor="confirmPassword">
                  Confirm Password
                  <RequiredAsterisk>*</RequiredAsterisk>
                </Label>
                <InputWrapper>
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
                </InputWrapper>
              </FormGroup>
            </FormRow>

            <FormRow>
              <FormGroup>
                <PasswordHelperText>
                  {formData.password && (
                    <HelperText style={{ color: formData.password.length >= 8 ? '#059669' : '#dc2626' }}>
                      {formData.password.length >= 8 ? <FiCheck size={14} /> : <FiX size={14} />}
                      {formData.password.length >= 8 ? 'Password length is valid' : 'Password must be at least 8 characters'}
                    </HelperText>
                  )}
                  {formData.confirmPassword && (
                    formData.password === formData.confirmPassword ? (
                      <HelperText style={{ color: '#059669' }}>
                        <FiCheck size={14} />
                        Passwords match
                      </HelperText>
                    ) : (
                      <HelperText style={{ color: '#dc2626' }}>
                        <FiX size={14} />
                        Passwords do not match
                      </HelperText>
                    )
                  )}
                </PasswordHelperText>
              </FormGroup>
            </FormRow>

            {error && (
              <ErrorMessage>
                <FiX size={16} />
                {error}
              </ErrorMessage>
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

      <SuccessModal $isOpen={showSuccessModal}>
        <SuccessModalContent>
          <SuccessIcon>
            <FiCheck size={24} />
          </SuccessIcon>
          <SuccessTitle>Setup Completed</SuccessTitle>
          <SuccessMessage>
            Your account has been successfully set up. You can now use your new credentials to log in.
          </SuccessMessage>
          <SuccessButton onClick={() => {
            setShowSuccessModal(false);
            onClose();
          }}>
            Continue
          </SuccessButton>
        </SuccessModalContent>
      </SuccessModal>
    </>
  );
} 