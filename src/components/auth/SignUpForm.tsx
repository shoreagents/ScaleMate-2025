import React, { useState } from 'react';
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
  background: white;
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

const FormRow = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
`;

const PasswordSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

interface SignUpFormProps {
  onSuccess?: (message: string) => void;
  onError?: (error: string | null) => void;
}

export default function SignUpForm({ onSuccess, onError }: SignUpFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
    firstName: '',
    lastName: ''
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsLoading(true);

    try {
      // Validate passwords
      if (!validatePasswords(formData.password, formData.confirmPassword)) {
        throw new Error('Passwords do not match');
      }

      // Validate username
      if (usernameExists) {
        throw new Error('Username is already taken');
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        throw new Error('Please enter a valid email address');
      }

      // Check if email exists
      if (emailExists) {
        onError?.('An account with this email already exists');
        return;
      }

      // Validate password length
      if (formData.password.length < 8) {
        throw new Error('Password must be at least 8 characters long');
      }

      // Validate first name and last name
      if (!formData.firstName.trim()) {
        throw new Error('First name is required');
      }
      if (!formData.lastName.trim()) {
        throw new Error('Last name is required');
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

      // 1. Sign up with Supabase Auth
      const { data: { user }, error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: `${formData.firstName.trim()} ${formData.lastName.trim()}`,
            first_name: formData.firstName.trim(),
            last_name: formData.lastName.trim()
          }
        }
      });

      if (signUpError) {
        console.error('Sign up error:', signUpError);
        throw new Error(signUpError.message || 'Failed to create account');
      }

      if (!user) {
        throw new Error('Failed to create user account');
      }

      // 2. Check if user already exists in users table
      const { data: existingUser, error: checkError } = await serviceRoleClient
        .from('users')
        .select('id')
        .eq('id', user.id)
        .single();

      if (checkError && checkError.code !== 'PGRST116') { // PGRST116 is "no rows returned"
        console.error('Error checking existing user:', checkError);
        throw new Error('Failed to check existing user');
      }

      // Only insert if user doesn't exist
      if (!existingUser) {
      const { error: userError } = await serviceRoleClient
        .from('users')
        .insert({
          id: user.id,
          email: formData.email,
          full_name: `${formData.firstName.trim()} ${formData.lastName.trim()}`,
          is_active: true
        });

      if (userError) {
        console.error('User creation error:', userError);
        // If user creation fails, try to delete the auth user to maintain consistency
        await supabase.auth.admin.deleteUser(user.id);
        throw new Error('Failed to create user record: ' + userError.message);
      }
      }

      // 3. Check if profile exists
      const { data: existingProfile, error: profileCheckError } = await serviceRoleClient
        .from('user_profiles')
        .select('user_id')
        .eq('user_id', user.id)
        .single();

      if (profileCheckError && profileCheckError.code !== 'PGRST116') {
        console.error('Error checking existing profile:', profileCheckError);
        throw new Error('Failed to check existing profile');
      }

      // Only insert if profile doesn't exist
      if (!existingProfile) {
      const { error: profileError } = await serviceRoleClient
        .from('user_profiles')
        .insert({
          user_id: user.id,
          username: formData.username,
          first_name: formData.firstName.trim(),
          last_name: formData.lastName.trim(),
          phone: null,
          gender: null,
          last_password_change: new Date().toISOString()
        });

      if (profileError) {
        console.error('Profile creation error:', profileError);
        // If profile creation fails, try to delete the auth user and user record
        await serviceRoleClient.from('users').delete().eq('id', user.id);
        await supabase.auth.admin.deleteUser(user.id);
        throw new Error('Failed to create user profile: ' + profileError.message);
      }
      }

      // 4. Check if role exists
      const { data: existingRole, error: roleCheckError } = await serviceRoleClient
        .from('user_roles')
        .select('user_id')
        .eq('user_id', user.id)
        .single();

      if (roleCheckError && roleCheckError.code !== 'PGRST116') {
        console.error('Error checking existing role:', roleCheckError);
        throw new Error('Failed to check existing role');
      }

      // Only insert if role doesn't exist
      if (!existingRole) {
      const { error: roleError } = await serviceRoleClient
        .from('user_roles')
        .insert({
          user_id: user.id,
          role: 'user'
        });

      if (roleError) {
        console.error('Role assignment error:', roleError);
        // If role assignment fails, try to clean up
        await serviceRoleClient.from('user_profiles').delete().eq('user_id', user.id);
        await serviceRoleClient.from('users').delete().eq('id', user.id);
        await supabase.auth.admin.deleteUser(user.id);
        throw new Error('Failed to assign user role: ' + roleError.message);
        }
      }

      setSuccess('Account created successfully!');
      onSuccess?.('Account created successfully!');
      // Wait for 1 second before redirecting to login page
      setTimeout(() => {
        router.push('/login');
      }, 1000);
    } catch (err) {
      console.error('Sign up error:', err);
      const errorMessage = err instanceof Error ? err.message : 'An error occurred during sign up';
      setError(errorMessage);
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
      // Only check if email exists, no format validation
      checkEmailExists(value);
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
    try {
      setIsGoogleLoading(true);
      setError(null);

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
          scopes: 'email profile',
        }
      });

      if (error) {
        throw error;
      }

      // The user will be redirected to Google's OAuth page
      // After successful authentication, they'll be redirected back to the callback URL
      // The callback will handle the user creation and profile setup
    } catch (err) {
      console.error('Google sign in error:', err);
      const errorMessage = err instanceof Error ? err.message : 'An error occurred during Google sign in';
      setError(errorMessage);
      onError?.(errorMessage);
      setIsGoogleLoading(false);
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
        {error && (
          <div style={{ 
            color: '#dc2626', 
            fontSize: '0.875rem',
            padding: '0.75rem',
            backgroundColor: '#fee2e2',
            borderRadius: '8px',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <FiX size={16} />
            {error}
          </div>
        )}
        <ButtonContainer>
          <Button 
            type="submit" 
            disabled={isLoading || !isFormValid()}
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </Button>
        </ButtonContainer>
        <SignInLink>
          Already have an account? <a href="/login">Sign In</a>
        </SignInLink>
      </Form>
    </FormContainer>
  );
} 