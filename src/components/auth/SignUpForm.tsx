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
  const [isVerifying, setIsVerifying] = useState(false);
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
      setUsernameError(null); // Also clear usernameError if username is empty
      setUsernameExists(null);
      setCheckingUsername(false);
      return;
    }

    // Basic client-side validation before hitting the API (optional, but good practice)
    if (!/^[a-zA-Z0-9._-]*$/.test(username)) {
      setUsernameError('Special characters are not allowed');
      setUsernameExists(null);
      setCheckingUsername(false);
      return;
    } else {
      setUsernameError(null); // Clear error if format is now valid
    }

    setCheckingUsername(true);
    try {
      const response = await fetch('/api/auth/check-username', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: username.toLowerCase() }), // Send username to API
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle API errors (e.g., 500 from your API route)
        console.error('API error checking username:', data.error || response.statusText);
        setUsernameExists(null); // Or set to true to be safe, preventing use of a possibly taken name
        setUsernameError(data.error || 'Could not verify username.');
      } else {
        // API call was successful
        if (data.exists) {
          setUsernameExists(true);
          setUsernameError('Username is already taken!'); // Set error if taken
        } else {
          setUsernameExists(false);
          setUsernameError(null); // Clear error if available
        }
      }
    } catch (error) {
      console.error('Network error checking username:', error);
      setUsernameExists(null); // Or set to true to be safe
      setUsernameError('Network error. Could not verify username.');
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
      setPasswordError('Passwords do not match.');
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
    if (isVerifying) return; // Prevent multiple submissions
    
    setError(null);
    setSuccess(null);
    setIsVerifying(true);
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

      // Verify OTP and sign in in one step
      const { data, error: verifyError } = await supabase.auth.verifyOtp({
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

      if (!data.user) {
        throw new Error('No user data returned from verification');
      }

      // Get the current URL and its parameters
      const currentUrl = redirectUrl || window.location.pathname;
      const url = new URL(currentUrl, window.location.origin);
      
      // When preventRedirect is true, we want to go back to the original page
      // that opened the modal, not the current page
      const redirectTo = preventRedirect 
        ? url.searchParams.get('redirectTo') || window.location.pathname
        : window.location.pathname;

      // Preserve the specific modal type if it exists, otherwise use 'modal' for preventRedirect
      const fromParam = url.searchParams.get('from') || 'role-builder-modal';

      if (preventRedirect) {
        // For modal flow, update URL parameters and close modal
        const url = new URL(window.location.href);
        url.searchParams.set('showModal', fromParam);
        url.searchParams.set('authSuccess', 'true');
        
        // Store current scroll position before redirect
        sessionStorage.setItem('scrollPosition', window.scrollY.toString());
        
        // Update URL and trigger success callback
        await router.replace(url.toString(), undefined, { shallow: true });
        onSuccess?.('Email verified successfully');
      } else {
        // For direct flow, redirect to dashboard
        router.push('/user/dashboard');
      }

      return; // Don't reset states since we're redirecting
    } catch (err) {
      console.error('Verification error:', err);
      const errorMessage = err instanceof Error ? err.message : 'An error occurred during verification';
      setError(errorMessage);
      onError?.(errorMessage);
      setVerificationCode(Array(6).fill(''));
      // Only reset states on error
      setIsVerifying(false);
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Clear previous main errors
    setSuccess(null); // Clear previous success messages
    // Consider having a separate state for secondary errors, e.g., setProfileError(null)
    setIsLoading(true);

    try {
      // --- Start: Initial Client-Side Validations ---
      if (!isValidEmail(formData.email)) {
        setError('Please enter a valid email address!');
        // setEmailError('Please enter a valid email address!'); // If you have specific field errors
        // onError?.('Please enter a valid email address!'); // If you have a prop for this
        setIsLoading(false); // Stop here
        return;
      }
      // Add other client-side validations for username, password, password match etc.
      // For example:
      if (!formData.username || formData.username.length < 3) {
        setError('Username must be at least 3 characters long!');
        // setUsernameError('Username must be at least 3 characters long!');
        // onError?.('Username must be at least 3 characters long!');
        setIsLoading(false);
        return;
      }
      if (!formData.password || formData.password.length < 8) {
        setError('Password must be at least 8 characters long!');
        // setPasswordError('Password must be at least 8 characters long!');
        // onError?.('Password must be at least 8 characters long!');
        setIsLoading(false);
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match!');
        // setPasswordError('Passwords do not match!');
        // onError?.('Passwords do not match!');
        setIsLoading(false);
        return;
      }
      // --- End: Initial Client-Side Validations ---

      const normalizedEmail = normalizeEmail(formData.email);

      // --- Optional: Call your /api/auth/check-email-signup ---
      try {
        const emailCheckResponse = await fetch('/api/auth/check-email-signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: normalizedEmail }),
        });
        const emailCheckData = await emailCheckResponse.json();
        if (!emailCheckResponse.ok || emailCheckData.exists) {
          setError(emailCheckData.error || 'Email already exists or check failed.');
          setIsLoading(false);
          return;
        }
      } catch (emailCheckError) {
        console.error('Email check API error:', emailCheckError);
        setError('Could not verify email availability. Please try again.');
        setIsLoading(false);
        return;
      }
      // --- End: Email Check ---


      // --- Step 1: Core Supabase Authentication ---
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: normalizedEmail,
        password: formData.password,
        options: {
          data: { // Data to be stored in auth.users.raw_user_meta_data
            username: formData.username.toLowerCase(),
            full_name: `${formData.firstName.trim()} ${formData.lastName.trim()}`,
            first_name: formData.firstName.trim(),
            last_name: formData.lastName.trim(),
          },
          // emailRedirectTo: `${window.location.origin}/auth/callback` // If needed
        },
      });

      if (signUpError) {
        console.error('Supabase sign up error:', signUpError);
        setError(signUpError.message || 'Failed to initiate sign up with authentication service.');
        // onError?.(signUpError.message);
        setIsLoading(false); // Stop here
        return;
      }

      if (!signUpData.user) {
        console.error('Supabase sign up did not return a user object.');
        setError('Sign up process did not complete as expected. Please try again.');
        // onError?.('Sign up process did not complete as expected.');
        setIsLoading(false); // Stop here
        return;
      }

      console.log('Supabase auth user created successfully:', signUpData.user.id);

      // --- Step 2: Create User Records via your API (Best Effort) ---
      try {
        const createUserRecordsResponse = await fetch('/api/auth/create-user-records', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: signUpData.user.id,
            email: normalizedEmail, // Ensure this is the same email used for signUp
            username: formData.username.toLowerCase(),
            firstName: formData.firstName.trim(),
            lastName: formData.lastName.trim(),
            fullName: `${formData.firstName.trim()} ${formData.lastName.trim()}`
          }),
        });

        if (!createUserRecordsResponse.ok) {
          // API returned an HTTP error (e.g., 500)
          const errorData = await createUserRecordsResponse.json();
          console.error('API /create-user-records failed (HTTP error):', errorData.error || createUserRecordsResponse.statusText);
          // You might want to set a non-blocking warning here, e.g.,
          // setProfileError('Account created, but profile setup faced an issue. Please verify email.');
        } else {
          const result = await createUserRecordsResponse.json();
          if (!result.success) {
            // API returned 200 OK, but indicated logical failure
            console.error('API /create-user-records indicated failure:', result.message);
            // setProfileError('Account created, but profile setup faced an issue. Please verify email.');
          } else {
            console.log('Successfully called /api/auth/create-user-records:', result.message);
          }
        }
      } catch (recordsApiError) {
        // Network error or other issue calling /api/auth/create-user-records
        console.error('Error calling /api/auth/create-user-records:', recordsApiError);
        // setProfileError('Account created, but profile setup faced a network issue. Please verify email.');
      }

      // --- Step 3: Proceed to Email Verification ---
      // This section is reached if supabase.auth.signUp() was successful,
      // regardless of the outcome of /api/auth/create-user-records.
      setSuccess('Account created! Please check your email to verify your account.');
      setError(null); // Clear any previous main errors
      // setEmailError(null); // Clear specific field errors if you use them
      // setUsernameError(null);
      // setPasswordError(null);

      if (preventRedirect) { // Assuming preventRedirect is a prop
        sessionStorage.setItem('scrollPosition', window.scrollY.toString());
      }

      setShowVerificationWithCallback(true); // This is the key call to switch UI
      setResendCountdown(60); // Start OTP resend countdown

    } catch (err) {
      // This outer catch handles errors from initial validations, email check API, or unexpected errors
      // It should NOT catch errors from supabase.auth.signUp() or /api/auth/create-user-records
      // if they are handled and returned from within the try block as shown above.
      // However, if signUpError or an unhandled exception from those phases occurs, it ends up here.
      console.error('General sign up processing error:', err);
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred during sign up.';
      setError(errorMessage);
      setSuccess(null);
      // onError?.(errorMessage);
    } finally {
      setIsLoading(false); // This will now correctly execute AFTER setShowVerification has (or should have) been set
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
      // Get the current URL and its parameters
      const currentUrl = redirectUrl || window.location.pathname;
      const url = new URL(currentUrl, window.location.origin);
      
      // When preventRedirect is true, we want to go back to the original page
      // that opened the modal, not the current page
      const redirectTo = preventRedirect 
        ? url.searchParams.get('redirectTo') || window.location.pathname
        : window.location.pathname;

      // Preserve the specific modal type if it exists, otherwise use 'modal' for preventRedirect
      const fromParam = url.searchParams.get('from') || 'role-builder-modal';

      // Choose callback based on context
      const callbackBase = preventRedirect ? '/auth/callback/modal' : '/auth/callback/direct';
      const callbackUrl = new URL(`${window.location.origin}${callbackBase}`);
      
      if (preventRedirect) {
        callbackUrl.searchParams.set('from', fromParam);
        callbackUrl.searchParams.set('redirectTo', redirectTo);
        // Store current scroll position before redirect
        sessionStorage.setItem('scrollPosition', window.scrollY.toString());
      }

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: callbackUrl.toString(),
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
                  disabled={isVerifying}
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
              disabled={isVerifying || verificationCode.some(code => !code)}
              style={preventRedirect ? { width: '100%' } : undefined}
            >
              {isVerifying || isLoading ? 'Verifying...' : 'Verify Email'}
            </Button>
          </ButtonContainer>
          <ResendLink>
            {resendCountdown > 0 ? (
              <>Please wait <span className="timer">{resendCountdown}s</span> before requesting a new code</>
            ) : (
              <>Didn't receive the code? <button 
                type="button" 
                onClick={handleResendCode} 
                disabled={isResending || resendCountdown > 0 || isVerifying}
              >
                {isResending ? 'Sending...' : 'Resend Code'}
              </button></>
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
                Username is available!
              </HelperText>
            )}
            {!checkingUsername && !usernameError && usernameExists === true && (
              <HelperText style={{ color: '#dc2626' }}>
                <FiX size={14} />
                Username is already taken!
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
                    {formData.password.length >= 8 ? 'Password length is valid.' : 'Password must be at least 8 characters.'}
                  </HelperText>
                )}
                {formData.confirmPassword && (
                  passwordError ? (
                    <HelperText style={{ color: '#dc2626' }}>
                      <FiX size={14} />
                      Passwords do not match!
                    </HelperText>
                  ) : (
                    <HelperText style={{ color: '#059669' }}>
                      <FiCheck size={14} />
                      Passwords match!
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