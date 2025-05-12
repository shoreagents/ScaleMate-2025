import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { supabase } from '@/lib/supabase';
import { FiEye, FiEyeOff, FiLoader, FiCheck, FiX } from 'react-icons/fi';
import { createClient } from '@supabase/supabase-js';

const FormContainer = styled.div`
  max-width: 420px;
  width: 100%;
  display: flex;
  flex-direction: column;

  @media (max-width: 640px) {
    padding: 0;
  }
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

const Divider = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  margin-bottom: 3rem ;
  color: ${props => props.theme.colors.text.secondary};
  font-size: 0.875rem;

  &::before,
  &::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid ${props => props.theme.colors.border};
  }

  &::before {
    margin-right: 1rem;
  }

  &::after {
    margin-left: 1rem;
  }
`;

const GoogleButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.875rem;
  background: transparent;
  border: 1.5px solid ${props => props.theme.colors.border};
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text.primary};
  cursor: pointer;
  transition: all 0.2s ease;
  margin-bottom: 1.5rem;

  &:hover {
    background: #F9FAFB;
    border-color: ${props => props.theme.colors.text.primary};
  }

  &:active {
    transform: scale(0.98);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
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

const ButtonContainer = styled.div`
  display: flex;
  margin-top: 1.5rem;
  gap: 1rem;
`;

const RequiredAsterisk = styled.span`
  color: #EF4444;
  margin-left: 4px;
`;

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text.primary};
  display: flex;
  align-items: center;
`;

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const PasswordInputWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
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

  @media (max-width: 640px) {
    width: 100%;
  }

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px ${props => props.theme.colors.primary}15;
  }

  &::placeholder {
    color: ${props => props.theme.colors.text.secondary};
  }
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
  transition: color 0.2s ease;
  z-index: 1;

  &:hover {
    color: ${props => props.theme.colors.text.primary};
  }
`;

const HelperText = styled.div`
  font-size: 0.75rem;
  color: #6b7280;
  display: flex;
  align-items: center;
  gap: 4px;
  width: 100%;
`;

const PasswordHelperText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
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

const SignInLink = styled.div`
  text-align: center;
  font-size: 0.875rem;
  color: ${props => props.theme.colors.text.secondary};

  a {
    color: ${props => props.theme.colors.primary};
    text-decoration: none;
    font-weight: 500;
    margin-left: 0.25rem;
    transition: color 0.2s ease;

    &:hover {
      color: ${props => props.theme.colors.primaryDark};
    }
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

const FormRow = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;

  @media (max-width: 640px) {
    flex-direction: column;
    gap: 0.875rem;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
  width: 100%;

  @media (max-width: 640px) {
    width: 100%;
  }
`;

const PasswordSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
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

const MessageContainer = styled.div<{ $isSuccess?: boolean }>`
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  gap: 4px;
  color: ${props => props.$isSuccess ? props.theme.colors.success : props.theme.colors.error};
`;

interface SignUpFormProps {
  onSuccess?: (message: string) => void;
  onError?: (error: string | null) => void;
  hideLinks?: boolean;
  preventRedirect?: boolean;
  redirectUrl?: string;
  onVerificationStateChange?: (isVerifying: boolean) => void;
}

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

const isValidEmail = (email: string): boolean => {
  const normalized = normalizeEmail(email);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(normalized);
};

export default function SignUpForm({ onSuccess, onError, hideLinks = false, preventRedirect = false, redirectUrl, onVerificationStateChange }: SignUpFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
    firstName: '',
    lastName: ''
  });
  const [verificationCode, setVerificationCode] = useState<string[]>(Array(6).fill(''));
  const [showVerification, setShowVerification] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [usernameExists, setUsernameExists] = useState<boolean | null>(null);
  const [checkingUsername, setCheckingUsername] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [checkingEmail, setCheckingEmail] = useState(false);
  const [emailExists, setEmailExists] = useState<boolean | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [accountExists, setAccountExists] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(0);

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
        .select('username')
        .eq('username', username)
        .limit(1);

      if (error) {
        console.error('Error checking username:', error);
        setUsernameExists(null);
      } else if (data && data.length > 0) {
        setUsernameExists(true); // Username is taken
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

  const validatePasswords = (password: string, confirmPassword: string) => {
    if (!confirmPassword) {
      setPasswordError(null);
      return false;
    }
    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return false;
    }
    setPasswordError(null);
    return true;
  };

  const checkEmailExists = async (email: string) => {
    if (!email) {
      setEmailExists(null);
      setCheckingEmail(false);
      return;
    }

    try {
      setCheckingEmail(true);
      
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
      
      // Query the users table with service role
      const { data, error } = await serviceRoleClient
        .from('users')
        .select('email')
        .eq('email', email)
        .limit(1);

      if (error) {
        console.error('Error checking email:', error);
        setEmailExists(null);
      } else if (data && data.length > 0) {
        setEmailExists(true); // Email is taken
      } else {
        setEmailExists(false); // Email is available
      }
    } catch (error) {
      console.error('Error checking email:', error);
      setEmailExists(null);
    } finally {
      setCheckingEmail(false);
    }
  };

  const setShowVerificationWithCallback = (value: boolean) => {
    setShowVerification(value);
    onVerificationStateChange?.(value);
  };

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

  const handleVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsLoading(true);

    try {
      // Validate email format
      if (!isValidEmail(formData.email)) {
        throw new Error('Please enter a valid email address!');
      }

      // Validate verification code
      if (verificationCode.join('').length !== 6) {
        throw new Error('Please enter the complete verification code!');
      }

      // Normalize email before verification
      const normalizedEmail = normalizeEmail(formData.email);

      // Join the verification code digits
      const fullCode = verificationCode.join('');

      const { error: verifyError } = await supabase.auth.verifyOtp({
        email: normalizedEmail,
        token: fullCode,
        type: 'email'
      });

      if (verifyError) {
        // Handle specific error cases
        if (verifyError.message.includes('Invalid OTP')) {
          throw new Error('Token has expired or is invalid!');
        } else if (verifyError.message.includes('expired')) {
          throw new Error('Token has expired or is invalid!');
        } else {
          throw verifyError;
        }
      }

      // Sign in the user after successful verification
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email: normalizedEmail,
        password: formData.password
      });

      if (signInError) {
        throw new Error('Failed to sign in after verification. Please try signing in manually.');
      }

      // Wait for session to be established
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError || !session) {
        throw new Error('Failed to establish session. Please try signing in manually.');
      }

      // Use the callback URL for redirection
      const callbackUrl = `${window.location.origin}/auth/callback`;
      const currentUrl = redirectUrl || window.location.href;
      
      // Parse the current URL to get the from parameter
      const url = new URL(currentUrl);
      const fromParam = url.searchParams.get('from');
      
      // Create the callback URL with parameters
      const callbackWithParams = new URL(callbackUrl);
      callbackWithParams.searchParams.set('from', fromParam || '');
      callbackWithParams.searchParams.set('redirectTo', currentUrl);
      
      // Always redirect to callback to ensure profile/role creation
      router.push(callbackWithParams.toString());
    } catch (err) {
      console.error('Verification error:', err);
      const errorMessage = err instanceof Error ? err.message : 'An error occurred during verification';
      setError(errorMessage);
      setSuccess(null);
      onError?.(errorMessage);
      // Clear verification code on error
      setVerificationCode(Array(6).fill(''));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsLoading(true);

    try {
      // Validate email format
      if (!isValidEmail(formData.email)) {
        setError('Please enter a valid email address!');
        setEmailError('Please enter a valid email address!');
        onError?.('Please enter a valid email address!');
        setIsLoading(false);
        return;
      }

      // Validate username
      if (!formData.username || formData.username.length < 3) {
        setError('Username must be at least 3 characters long!');
        setUsernameError('Username must be at least 3 characters long!');
        onError?.('Username must be at least 3 characters long!');
        setIsLoading(false);
        return;
      }

      // Validate password
      if (!formData.password || formData.password.length < 8) {
        setError('Password must be at least 8 characters long!');
        setPasswordError('Password must be at least 8 characters long!');
        onError?.('Password must be at least 8 characters long!');
        setIsLoading(false);
        return;
      }

      // Validate password match
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match!');
        setPasswordError('Passwords do not match!');
        onError?.('Passwords do not match!');
        setIsLoading(false);
        return;
      }

      // Normalize email before sign up
      const normalizedEmail = normalizeEmail(formData.email);

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

      // Check if user exists in users table
      const { data: existingUser, error: checkError } = await serviceRoleClient
        .from('users')
        .select('id')
        .eq('email', normalizedEmail)
        .single();

      if (checkError && checkError.code !== 'PGRST116') {
        console.error('Error checking existing user:', checkError);
        setError('An error occurred while checking for existing accounts.');
        setEmailError('An error occurred while checking for existing accounts.');
        onError?.('An error occurred while checking for existing accounts.');
        setIsLoading(false);
        return;
      }

      if (existingUser) {
        setError('An account with this email already exists!');
        setEmailError('An account with this email already exists!');
        setSuccess(null);
        onError?.('An account with this email already exists!');
        setIsLoading(false);
        return;
      }

      // Check if username exists
      const { data: existingUsername, error: usernameCheckError } = await serviceRoleClient
        .from('user_profiles')
        .select('username')
        .eq('username', formData.username.toLowerCase())
        .single();

      if (usernameCheckError && usernameCheckError.code !== 'PGRST116') {
        console.error('Error checking existing username:', usernameCheckError);
        setError('An error occurred while checking for existing usernames.');
        setUsernameError('An error occurred while checking for existing usernames.');
        onError?.('An error occurred while checking for existing usernames.');
        setIsLoading(false);
        return;
      }

      if (existingUsername) {
        setError('This username is already taken!');
        setUsernameError('This username is already taken!');
        setSuccess(null);
        onError?.('This username is already taken!');
        setIsLoading(false);
        return;
      }

      // First, create the auth user with metadata
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: normalizedEmail,
        password: formData.password,
        options: {
          data: {
            username: formData.username.toLowerCase(),
            full_name: `${formData.firstName.trim()} ${formData.lastName.trim()}`,
            first_name: formData.firstName.trim(),
            last_name: formData.lastName.trim()
          }
        }
      });

      if (signUpError) {
        console.error('Sign up error:', signUpError);
        if (signUpError.message.includes('User already registered') || 
            signUpError.message.includes('already exists') ||
            signUpError.message.includes('already registered')) {
          setError('An account with this email already exists!');
          setEmailError('An account with this email already exists!');
          setSuccess(null);
          onError?.('An account with this email already exists!');
          setIsLoading(false);
          return;
        } else {
          setError(signUpError.message);
          onError?.(signUpError.message);
          setIsLoading(false);
          return;
        }
      }

      if (!data.user) {
        setError('Failed to create account. Please try again!');
        onError?.('Failed to create account. Please try again!');
        setIsLoading(false);
        return;
      }

      try {
        // Insert into users table with full user data
        const { error: userError } = await serviceRoleClient
          .from('users')
          .insert({
            id: data.user.id,
            email: normalizedEmail,
            full_name: `${formData.firstName.trim()} ${formData.lastName.trim()}`,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            is_active: true
          });

        if (userError) throw userError;

        // Insert into user_profiles table with complete profile data
        const { error: profileError } = await serviceRoleClient
          .from('user_profiles')
          .insert({
            user_id: data.user.id,
            username: formData.username.toLowerCase(),
            first_name: formData.firstName.trim(),
            last_name: formData.lastName.trim(),
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          });

        if (profileError) throw profileError;

        // Insert into user_roles table
        const { error: roleError } = await serviceRoleClient
          .from('user_roles')
          .insert({
            user_id: data.user.id,
            role: 'user',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          });

        if (roleError) throw roleError;

        // If we get here, everything was successful
        setSuccess('Account created successfully! Please verify your email.');
        setError(null);
        setEmailError(null);
        setUsernameError(null);
        setPasswordError(null);
        setShowVerificationWithCallback(true);
        setResendCountdown(60);
        onSuccess?.('Account created successfully! Please verify your email.');
      } catch (dbError) {
        console.error('Database error:', dbError);
        // If database operations fail, we should still show the verification form
        // since the auth user was created successfully
        setSuccess('Account created! Please verify your email.');
        setError(null);
        setEmailError(null);
        setUsernameError(null);
        setPasswordError(null);
        setShowVerificationWithCallback(true);
        setResendCountdown(60);
        onSuccess?.('Account created! Please verify your email.');
      }
    } catch (err) {
      console.error('Sign up error:', err);
      const errorMessage = err instanceof Error ? err.message : 'An error occurred during sign up';
      setError(errorMessage);
      setSuccess(null);
      onError?.(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === 'username') {
      validateUsername(value);
    }

    if (name === 'email') {
      // Remove real-time email validation
      setEmailError(null);
      setEmailExists(null);
    }

    // Check password match when either password field changes
    if (name === 'password' || name === 'confirmPassword') {
      validatePasswords(
        name === 'password' ? value : formData.password,
        name === 'confirmPassword' ? value : formData.confirmPassword
      );
    }
  };

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    setError(null);

    try {
      // Always redirect to the callback URL first
      const callbackUrl = `${window.location.origin}/auth/callback`;
      
      // Get the current URL for redirect
      const currentUrl = redirectUrl || window.location.href;
      
      // Parse the current URL to get the from parameter
      const url = new URL(currentUrl);
      const fromParam = url.searchParams.get('from');
      
      // Create the callback URL with parameters
      const callbackWithParams = new URL(callbackUrl);
      callbackWithParams.searchParams.set('from', fromParam || '');
      callbackWithParams.searchParams.set('redirectTo', currentUrl);
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: callbackWithParams.toString(),
          queryParams: {
            access_type: 'offline',
            prompt: 'consent'
          },
          scopes: 'email profile openid'
        }
      });

      if (error) {
        throw error;
      }
    } catch (err) {
      console.error('Google sign in error:', err);
      const errorMessage = err instanceof Error ? err.message : 'An error occurred during Google sign in';
      setError(errorMessage);
      onError?.(errorMessage);
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (resendCountdown > 0) return;
    
    setError(null);
    setSuccess(null);
    setIsResending(true);

    try {
      // Validate email format
      if (!isValidEmail(formData.email)) {
        throw new Error('Please enter a valid email address!');
      }

      // Normalize email before sending
      const normalizedEmail = normalizeEmail(formData.email);

      const { error: resendError } = await supabase.auth.resend({
        type: 'signup',
        email: normalizedEmail,
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

  // Add this function to check if the form is valid
  const isFormValid = () => {
    return (
      formData.email &&
      formData.password &&
      formData.confirmPassword &&
      formData.username &&
      formData.firstName &&
      formData.lastName &&
      !usernameError &&
      !usernameExists &&
      !passwordError &&
      formData.password.length >= 8 &&
      formData.password === formData.confirmPassword
    );
  };

  if (showVerification) {
    return (
      <FormContainer>
        <Title>Verify Your Email</Title>
        <Subtitle>Please enter the verification code sent to your email</Subtitle>
        <Form onSubmit={handleVerification}>
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
          <ButtonContainer>
            <Button 
              type="submit" 
              disabled={isLoading || verificationCode.some(code => !code)}
              style={preventRedirect ? { width: '100%' } : undefined}
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
        </Form>
      </FormContainer>
    );
  }

  return (
    <FormContainer>
      <Title>Create Account</Title>
      <Subtitle>Sign up to get started with ScaleMate</Subtitle>
      <GoogleButton 
        onClick={handleGoogleSignIn}
        disabled={isGoogleLoading}
      >
        <img src="/google-icon.svg" alt="Google" width={20} height={20} />
        {isGoogleLoading ? 'Connecting...' : 'Continue with Google'}
      </GoogleButton>
      <Divider>or</Divider>
      <Form onSubmit={handleSubmit}>
        <FormRow>
          <FormGroup>
            <Label htmlFor="firstName">
              First Name
              <RequiredAsterisk>*</RequiredAsterisk>
            </Label>
            <Input
              id="firstName"
              name="firstName"
              type="text"
              placeholder="Enter your first name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="lastName">
              Last Name
              <RequiredAsterisk>*</RequiredAsterisk>
            </Label>
            <Input
              id="lastName"
              name="lastName"
              type="text"
              placeholder="Enter your last name"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </FormGroup>
        </FormRow>
        <InputGroup>
          <Label htmlFor="username">
            Username
            <RequiredAsterisk>*</RequiredAsterisk>
          </Label>
          <InputWrapper>
            <Input
              id="username"
              name="username"
              type="text"
              placeholder="Choose a username"
              value={formData.username}
              onChange={handleChange}
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
            {!checkingUsername && !usernameError && usernameExists === true && (
              <HelperText style={{ color: '#dc2626' }}>
                <FiX size={14} />
                Username is already taken
              </HelperText>
            )}
          </InputWrapper>
        </InputGroup>
        <InputGroup>
          <Label htmlFor="email">
            Email
            <RequiredAsterisk>*</RequiredAsterisk>
          </Label>
          <InputWrapper>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {emailError && (
              <HelperText style={{ color: '#dc2626' }}>
                <FiX size={14} />
                {emailError}
              </HelperText>
            )}
            {checkingEmail && (
              <HelperText style={{ color: '#6b7280' }}>
                <FiLoader size={14} />
                Checking email...
              </HelperText>
            )}
            {!checkingEmail && !emailError && emailExists === false && (
              <HelperText style={{ color: '#059669' }}>
                <FiCheck size={14} />
                Email is available
              </HelperText>
            )}
            {!checkingEmail && !emailError && emailExists === true && (
              <HelperText style={{ color: '#dc2626' }}>
                <FiX size={14} />
                Email is already registered
              </HelperText>
            )}
          </InputWrapper>
        </InputGroup>
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
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleChange}
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
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
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
                  passwordError ? (
                    <HelperText style={{ color: '#dc2626' }}>
                      <FiX size={14} />
                      Passwords do not match
                    </HelperText>
                  ) : (
                    <HelperText style={{ color: '#059669' }}>
                      <FiCheck size={14} />
                      Passwords match
                    </HelperText>
                  )
                )}
              </PasswordHelperText>
            </FormGroup>
          </FormRow>
        </PasswordSection>
        <ButtonContainer>
          <Button 
            type="submit" 
            disabled={isLoading || !isFormValid()}
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </Button>
        </ButtonContainer>
        {!hideLinks && (
          <SignInLink>
            Already have an account? <a href="/login">Sign In</a>
          </SignInLink>
        )}
      </Form>
    </FormContainer>
  );
} 