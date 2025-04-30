import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { supabase } from '@/lib/supabase';
import { FiEye, FiEyeOff, FiX, FiCheck, FiLoader } from 'react-icons/fi';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/router';

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
  color: ${props => props.theme.colors.text.primary};
`;

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
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

const PasswordSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

interface FirstTimeSetupFormProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  currentUsername: string;
}

interface UserProfile {
  username: string;
  user_id: string;
}

export default function FirstTimeSetupForm({ isOpen, onClose, userId, currentUsername }: FirstTimeSetupFormProps) {
  const router = useRouter();
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
  const [usernameExists, setUsernameExists] = useState<boolean | null>(true);
  const [checkingUsername, setCheckingUsername] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [passwordValidation, setPasswordValidation] = useState({
    length: false,
    match: false
  });

  useEffect(() => {
    if (currentUsername) {
      setUsernameExists(true);
    }
  }, [currentUsername]);

  useEffect(() => {
    // Ensure the form is shown when component mounts
    if (isOpen) {
      setShowSuccessModal(false);
    }
  }, [isOpen]);

  const validateUsername = (value: string) => {
    // Allow empty value for backspace
    if (!value) {
      setUsernameError(null);
      setUsernameExists(null);
      return false;
    }
    if (!/^[a-zA-Z0-9._-]*$/.test(value)) {
      setUsernameError('Special characters are not allowed');
      setUsernameExists(null);
      return false;
    }
    setUsernameError(null);
    checkUsernameExists(value);
    return true;
  };

  const checkUsernameExists = async (username: string) => {
    if (!username) {
      setUsernameExists(null);
      setCheckingUsername(false);
      return;
    }

    try {
      setCheckingUsername(true);
      
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
        .select('username, user_id')
        .eq('username', username)
        .limit(1);

      if (error) {
        console.error('Error checking username:', error);
        setUsernameExists(null);
      } else if (data && data.length > 0) {
        // If we found a user with this username, check if it's the same user we're editing
        const foundUser = data[0] as UserProfile;
        if (foundUser.user_id === userId) {
          setUsernameExists(true); // It's the same user's current username
        } else {
          setUsernameExists(true); // Username is taken by another user
        }
      } else {
        setUsernameExists(false); // Username is available
      }
    } catch (error) {
      console.error('Error checking username:', error);
      setUsernameExists(null);
    } finally {
      setCheckingUsername(false);
    }
  };

  const validatePasswords = (password: string, confirmPassword: string): boolean => {
    const validations = {
      length: password.length >= 8,
      match: password === confirmPassword && password !== ''
    };
    setPasswordValidation(validations);
    return validations.length && validations.match;
  };

  const isFormValid = () => {
    return (
      formData.username &&
      !usernameError &&
      !usernameExists &&
      passwordValidation.length &&
      passwordValidation.match
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      // Validate username
      if (usernameExists && formData.username !== currentUsername) {
        throw new Error('Username is already taken');
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

      // Create a client with service role key for admin operations
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

      // Update username and last_password_change using service role client
      const { error: profileError } = await serviceRoleClient
        .from('user_profiles')
        .update({
          username: formData.username
        })
        .eq('user_id', userId);

      if (profileError) {
        // Check for duplicate username error
        if (profileError.code === '23505' && profileError.message.includes('username')) {
          setUsernameExists(true);
          setUsernameError('Username is already taken');
          setIsLoading(false);
          return;
        }
        throw new Error('Failed to update profile: ' + profileError.message);
      }

      // Close the setup modal and redirect to dashboard
      onClose();
    } catch (err) {
      console.error('Setup error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred during setup');
      setIsLoading(false);
      return;
    }
    setIsLoading(false);
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
                pattern="[a-zA-Z0-9._-]*"
                value={formData.username}
                onChange={(e) => {
                  const value = e.target.value;
                  validateUsername(value);
                  if (value === '' || e.target.validity.valid) {
                    setFormData(prev => ({ ...prev, username: value }));
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
              {checkingUsername && (
                <HelperText style={{ color: '#6b7280' }}>
                  <FiLoader size={14} />
                  Checking username...
                </HelperText>
              )}
              {!checkingUsername && !usernameError && usernameExists === false && (
                <HelperText style={{ color: '#059669' }}>
                  <FiCheck size={14} />
                  Username is available
                </HelperText>
              )}
              {!checkingUsername && !usernameError && usernameExists === true && formData.username !== currentUsername && (
                <HelperText style={{ color: '#dc2626' }}>
                  <FiX size={14} />
                  Username is already taken
                </HelperText>
              )}
            </InputWrapper>
          </FormGroup>

          <PasswordSection>
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
                      onChange={(e) => {
                        setFormData(prev => ({ ...prev, password: e.target.value }));
                        validatePasswords(e.target.value, formData.confirmPassword);
                      }}
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
                      onChange={(e) => {
                        setFormData(prev => ({ ...prev, confirmPassword: e.target.value }));
                        validatePasswords(formData.password, e.target.value);
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
                </InputWrapper>
              </FormGroup>
            </FormRow>
            <FormRow>
              <FormGroup>
                <PasswordHelperText>
                  {formData.password && (
                    <HelperText style={{ color: passwordValidation.length ? '#059669' : '#dc2626' }}>
                      {passwordValidation.length ? <FiCheck size={14} /> : <FiX size={14} />}
                      {passwordValidation.length ? 'Password length is valid' : 'Password must be at least 8 characters'}
                    </HelperText>
                  )}
                  {formData.confirmPassword && (
                    passwordValidation.match ? (
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
          </PasswordSection>

          {error && (
            <ErrorMessage>
              <FiX size={16} />
              {error}
            </ErrorMessage>
          )}

          <Button
            type="submit"
            disabled={isLoading || !isFormValid()}
          >
            {isLoading ? 'Saving...' : 'Complete Setup'}
          </Button>
        </Form>
      </ModalContent>
    </ModalOverlay>
  );
} 