import React, { useState } from 'react';
import styled from 'styled-components';
import { supabase } from '@/lib/supabase';
import { FiEye, FiEyeOff, FiX, FiCheck, FiLoader } from 'react-icons/fi';
import { Dialog } from '@headlessui/react';

const Modal = styled.div<{ $isOpen: boolean }>`
  display: ${props => props.$isOpen ? 'block' : 'none'};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  padding: 20px;
  overflow-y: auto;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 8px;
  padding: 24px;
  max-width: 500px;
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const ModalHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 24px;
  position: relative;
`;

const ModalTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  margin: 0;
  text-align: left;
`;

const ModalDescription = styled.p`
  font-size: 0.875rem;
  color: #6B7280;
  text-align: left;
  margin: 8px 0 0;
  line-height: 1.5;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #6B7280;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 0;
  top: 0;
  
  &:hover {
    color: #111827;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-weight: 500;
  color: #374151;
  font-size: 0.875rem;
`;

const RequiredAsterisk = styled.span`
  color: #EF4444;
  margin-left: 4px;
`;

const Input = styled.input`
  padding: 8px 12px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  font-size: 0.875rem;
  color: #111827;
  background: white;
  width: 100%;
  
  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
  }
`;

const PasswordInputContainer = styled.div`
  position: relative;
  width: 100%;
`;

const PasswordInput = styled(Input)`
  padding-right: 40px;
`;

const ViewPasswordButton = styled.button`
  position: absolute;
  right: .5rem;
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

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 8px;
`;

const Button = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const CancelButton = styled(Button)`
  background: transparent;
  border: 1.5px solid #9aa2b3;
  color: ${props => props.theme.colors.text.primary};

  &:hover {
    background: ${props => props.theme.colors.background.secondary};
    border-color: ${props => props.theme.colors.text.primary};
  }
`;

const SaveButton = styled(Button)`
  background-color: #3B82F6;
  color: white;
  min-width: 100px;
  justify-content: center;

  &:hover {
    background-color: #2563EB;
  }

  &:disabled {
    background-color: #93C5FD;
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

const ErrorMessage = styled.div`
  color: #dc2626;
  font-size: 0.875rem;
  margin-top: 4px;
`;

const SuccessMessage = styled.div`
  color: #059669;
  font-size: 0.875rem;
  margin-top: 4px;
`;

const PasswordMatchIndicator = styled.div<{ $matches: boolean }>`
  font-size: 0.75rem;
  color: ${props => props.$matches ? '#059669' : '#dc2626'};
  display: flex;
  align-items: center;
  gap: 4px;
`;

const SpinningIcon = styled(FiLoader)`
  animation: spin 3s linear infinite;
  
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

interface FirstLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
  email: string;
}

export default function FirstLoginModal({ isOpen, onClose, onComplete, email }: FirstLoginModalProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [usernameExists, setUsernameExists] = useState<boolean | null>(null);
  const [checkingUsername, setCheckingUsername] = useState(false);
  const [passwordLength, setPasswordLength] = useState<boolean | null>(null);
  const [passwordsMatch, setPasswordsMatch] = useState<boolean | null>(null);

  const validateUsername = (value: string) => {
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

  const checkUsernameExists = async (value: string) => {
    if (!value) {
      setUsernameExists(null);
      setCheckingUsername(false);
      return;
    }

    try {
      setCheckingUsername(true);
      const { data, error } = await supabase
        .from('user_profiles')
        .select('username')
        .eq('username', value)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error checking username:', error);
        setUsernameExists(null);
      } else if (data) {
        setUsernameExists(true);
      } else {
        setUsernameExists(false);
      }
    } catch (error) {
      console.error('Error checking username:', error);
      setUsernameExists(null);
    } finally {
      setCheckingUsername(false);
    }
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUsername(value);
    validateUsername(value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordLength(value.length >= 8);
    if (confirmPassword) {
      setPasswordsMatch(value === confirmPassword);
    }
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setConfirmPassword(value);
    if (password) {
      setPasswordsMatch(value === password);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsLoading(true);

    try {
      // Validate username
      if (!username) {
        throw new Error('Username is required');
      }
      if (usernameError) {
        throw new Error(usernameError);
      }
      if (usernameExists) {
        throw new Error('Username is already taken');
      }

      // Validate password
      if (!password) {
        throw new Error('Password is required');
      }
      if (password.length < 8) {
        throw new Error('Password must be at least 8 characters long');
      }
      if (password !== confirmPassword) {
        throw new Error('Passwords do not match');
      }

      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('User not found');
      }

      // Update username in user_profiles
      const { error: profileError } = await supabase
        .from('user_profiles')
        .update({
          username: username,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id);

      if (profileError) {
        throw new Error('Failed to update username: ' + profileError.message);
      }

      // Set password
      const { error: passwordError } = await supabase.auth.updateUser({
        password: password,
        data: {
          has_set_password: true
        }
      });

      if (passwordError) {
        throw new Error('Failed to set password: ' + passwordError.message);
      }

      // Update last_password_change in user_profiles
      const { error: updateError } = await supabase
        .from('user_profiles')
        .update({
          last_password_change: new Date().toISOString()
        })
        .eq('user_id', user.id);

      if (updateError) {
        throw new Error('Failed to update profile: ' + updateError.message);
      }

      setSuccess('Profile updated successfully');
      setTimeout(() => {
        onComplete();
      }, 1000);
    } catch (error) {
      console.error('Error updating profile:', error);
      setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = () => {
    return username &&
           !usernameError &&
           !usernameExists &&
           password &&
           password.length >= 8 &&
           confirmPassword &&
           password === confirmPassword;
  };

  return (
    <Dialog
      open={isOpen}
      onClose={() => {}}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-sm rounded-lg bg-white p-6 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <Dialog.Title className="text-lg font-medium text-gray-900">
              Set Your Password
            </Dialog.Title>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                disabled
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-gray-50"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                New Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Enter your new password"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Confirm your new password"
              />
            </div>

            {error && (
              <div className="text-sm text-red-600">
                {error}
              </div>
            )}

            <div className="mt-5">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {isLoading ? 'Updating...' : 'Set Password'}
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
} 