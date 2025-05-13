import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { supabase } from '@/lib/supabase';
import { FiX, FiCheck } from 'react-icons/fi';

const FormContainer = styled.div`
  max-width: 420px;
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
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
  margin-bottom: 2rem;
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

const MessageContainer = styled.div<{ $isSuccess?: boolean }>`
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  gap: 4px;
  color: ${props => props.$isSuccess ? props.theme.colors.success : props.theme.colors.error};
`;

const UsernameHelperContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

interface UpdateUsernameFormProps {
  userId: string;
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export default function UpdateUsernameForm({ userId, onSuccess, onError }: UpdateUsernameFormProps) {
  const [username, setUsername] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [usernameValidation, setUsernameValidation] = useState({
    length: false,
    format: false,
    available: false
  });

  // Username validation rules
  const validateUsername = (value: string) => {
    const lengthValid = value.length >= 3 && value.length <= 20;
    const formatValid = /^[a-zA-Z0-9_-]+$/.test(value);
    
    setUsernameValidation(prev => ({
      ...prev,
      length: lengthValid,
      format: formatValid
    }));

    return lengthValid && formatValid;
  };

  // Check username availability
  const checkUsernameAvailability = async (value: string) => {
    if (!validateUsername(value)) return;

    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('username')
        .eq('username', value)
        .neq('user_id', userId) // Exclude current user
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 is "no rows returned"
        throw error;
      }

      setUsernameValidation(prev => ({
        ...prev,
        available: !data // true if username is available
      }));

      return !data;
    } catch (err) {
      console.error('Error checking username:', err);
      return false;
    }
  };

  // Debounced username availability check
  useEffect(() => {
    const timer = setTimeout(() => {
      if (username) {
        checkUsernameAvailability(username);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [username]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsLoading(true);

    try {
      // Final validation
      if (!usernameValidation.length || !usernameValidation.format) {
        throw new Error('Please enter a valid username');
      }

      // Final availability check
      const isAvailable = await checkUsernameAvailability(username);
      if (!isAvailable) {
        throw new Error('This username is already taken');
      }

      // Update username in user_profiles
      const { error: updateError } = await supabase
        .from('user_profiles')
        .update({ username })
        .eq('user_id', userId);

      if (updateError) {
        throw updateError;
      }

      setSuccess('Username updated successfully!');
      onSuccess?.();
    } catch (err) {
      console.error('Update username error:', err);
      const errorMessage = err instanceof Error ? err.message : 'An error occurred while updating username';
      setError(errorMessage);
      onError?.(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormContainer>
      <Title>Update Username</Title>
      <Subtitle>
        Your username is already taken. Please choose a different one to continue.
      </Subtitle>
      <Form onSubmit={handleSubmit}>
        <InputGroup>
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Choose a username"
            required
            autoFocus
          />
          <UsernameHelperContainer>
            {username && (
              <>
                <MessageContainer $isSuccess={usernameValidation.length}>
                  {usernameValidation.length ? <FiCheck size={14} /> : <FiX size={14} />}
                  {usernameValidation.length ? 'Username length is valid (3-20 characters)' : 'Username must be between 3 and 20 characters'}
                </MessageContainer>
                <MessageContainer $isSuccess={usernameValidation.format}>
                  {usernameValidation.format ? <FiCheck size={14} /> : <FiX size={14} />}
                  {usernameValidation.format ? 'Username format is valid' : 'Username can only contain letters, numbers, underscores, and hyphens'}
                </MessageContainer>
                {usernameValidation.length && usernameValidation.format && (
                  <MessageContainer $isSuccess={usernameValidation.available}>
                    {usernameValidation.available ? <FiCheck size={14} /> : <FiX size={14} />}
                    {usernameValidation.available ? 'Username is available' : 'This username is already taken'}
                  </MessageContainer>
                )}
              </>
            )}
            {(error || success) && (
              <MessageContainer $isSuccess={!!success}>
                {success ? <FiCheck size={14} /> : <FiX size={14} />}
                {success || error}
              </MessageContainer>
            )}
          </UsernameHelperContainer>
        </InputGroup>
        <Button 
          type="submit" 
          disabled={isLoading || !usernameValidation.length || !usernameValidation.format || !usernameValidation.available}
        >
          {isLoading ? 'Updating...' : 'Update Username'}
        </Button>
      </Form>
    </FormContainer>
  );
} 