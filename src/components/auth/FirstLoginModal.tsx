import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { FiEye, FiEyeOff, FiLoader } from 'react-icons/fi';
import { Dialog } from '@headlessui/react';

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
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={handleUsernameChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Choose a username"
              />
              {usernameError && (
                <p className="mt-1 text-sm text-red-600">{usernameError}</p>
              )}
              {checkingUsername && (
                <p className="mt-1 text-sm text-gray-500">Checking username...</p>
              )}
              {usernameExists && (
                <p className="mt-1 text-sm text-red-600">Username is already taken</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm pr-10"
                  placeholder="Enter your new password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? <FiEyeOff className="h-5 w-5 text-gray-400" /> : <FiEye className="h-5 w-5 text-gray-400" />}
                </button>
              </div>
              {passwordLength === false && (
                <p className="mt-1 text-sm text-red-600">Password must be at least 8 characters long</p>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm pr-10"
                  placeholder="Confirm your new password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showConfirmPassword ? <FiEyeOff className="h-5 w-5 text-gray-400" /> : <FiEye className="h-5 w-5 text-gray-400" />}
                </button>
              </div>
              {passwordsMatch === false && (
                <p className="mt-1 text-sm text-red-600">Passwords do not match</p>
              )}
            </div>

            {error && (
              <div className="text-sm text-red-600">
                {error}
              </div>
            )}

            {success && (
              <div className="text-sm text-green-600">
                {success}
              </div>
            )}

            <div className="mt-5">
              <button
                type="submit"
                disabled={isLoading || !isFormValid()}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {isLoading ? (
                  <FiLoader className="animate-spin h-5 w-5" />
                ) : (
                  'Set Password'
                )}
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
} 