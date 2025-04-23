import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { useTheme } from 'styled-components';
import { supabase } from '@/lib/supabase';
import { FiChevronLeft, FiChevronRight, FiLoader, FiCheck, FiX, FiEye, FiEyeOff } from 'react-icons/fi';
import { FaQuoteLeft } from 'react-icons/fa';
import Link from 'next/link';

const SignUpContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #F9FAFB;
  flex-direction: column;

  @media (min-width: 1024px) {
    flex-direction: row;
  }
`;

const AuthColumn = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  min-height: 50vh;
  background-color: white;

  @media (min-width: 1024px) {
    width: 38.5%;
    min-height: 100vh;
  }
`;

const TestimonialsColumn = styled.div`
  width: 100%;
  background-color: #0F172A;
  color: white;
  padding: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  overflow: hidden;
  min-height: 50vh;

  @media (min-width: 1024px) {
    width: 61.5%;
    min-height: 100vh;
    padding: 8rem;
  }
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: 700;
  color: #0F172A;
  text-decoration: none;
  margin-bottom: 2rem;
  padding-left: 1rem;

  @media (min-width: 1024px) {
    padding-left: 0;
  }
`;

const AuthFormContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;

  @media (min-width: 1024px) {
    padding: 0;
  }
`;

const FormContainer = styled.div`
  max-width: 420px;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: 1.75rem;
  font-weight: 700;
  color: ${props => props.theme.colors.text.primary};
  text-align: left;
  margin: 0;
  line-height: 1.2;
`;

const Subtitle = styled.p`
  font-size: 0.875rem;
  color: ${props => props.theme.colors.text.secondary};
  text-align: left;
  margin-bottom: 2rem;
  line-height: 1.2;
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
`;

const Input = styled.input`
  padding: 0.875rem 1rem;
  border: 1.5px solid ${props => props.theme.colors.border};
  border-radius: 8px;
  font-size: 0.875rem;
  background: white;
  color: ${props => props.theme.colors.text.primary};
  transition: all 0.2s ease;
  width: 100%;

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

const QuoteIcon = styled.div`
  margin-bottom: 2rem;
  
  svg {
    font-size: 2.25rem;
    color: rgba(59, 130, 246, 0.3);
    transform: rotate(180deg);
  }
`;

const TestimonialContainer = styled.div<{ $isVisible: boolean }>`
  opacity: ${props => props.$isVisible ? 1 : 0};
  transform: translateY(${props => props.$isVisible ? '0' : '20px'});
  transition: all 0.5s ease-in-out;
`;

const TestimonialText = styled.blockquote`
  font-size: 1.8rem;
  font-weight: 500;
  color: white;
  margin: 0 0 2rem 0;
  line-height: 1.6;
`;

const ClientInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Avatar = styled.img`
  width: 3rem;
  height: 3rem;
  border-radius: 9999px;
`;

const ClientDetails = styled.div``;

const ClientName = styled.div`
  font-weight: 500;
  color: white;
`;

const ClientHandle = styled.div`
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.6);
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

const ErrorMessage = styled.div`
  position: absolute;
  top: 2rem;
  right: 2rem;
  background-color: #FEE2E2;
  color: #DC2626;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  animation: slideIn 0.3s ease-out;
  z-index: 10;

  &::before {
    content: "✕";
    font-size: 1rem;
    font-weight: bold;
  }

  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;

const SuccessMessage = styled.div`
  position: absolute;
  top: 2rem;
  right: 2rem;
  background-color: #D1FAE5;
  color: #059669;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  animation: slideIn 0.3s ease-out;
  z-index: 10;

  &::before {
    content: "✓";
    font-size: 1rem;
    font-weight: bold;
  }

  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;

const AccountExistsMessage = styled.div`
  position: absolute;
  top: 2rem;
  right: 2rem;
  background-color: #FEF3C7;
  color: #D97706;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  animation: slideIn 0.3s ease-out;
  z-index: 10;

  &::before {
    content: "!";
    font-size: 1rem;
    font-weight: bold;
  }

  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;

const PasswordSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const testimonials = [
  {
    id: 1,
    name: "Michael Chen",
    handle: "@mchen_dev",
    avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg",
    text: "ScaleMate transformed how we build our remote teams. The AI-powered tools saved us countless hours in hiring and onboarding."
  },
  {
    id: 2,
    name: "Sarah Johnson",
    handle: "@sarahj",
    avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg",
    text: "The role templates and training flows helped us scale from 2 to 20 offshore staff in just 3 months."
  },
  {
    id: 3,
    name: "David Kim",
    handle: "@dkim",
    avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg",
    text: "We've cut costs by 70% while maintaining the same quality of work. The AI tools are game-changing."
  }
];

const SignUpPage = () => {
  const router = useRouter();
  const theme = useTheme();
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
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

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        router.push('/user/dashboard');
      }
    };

    checkAuth();
  }, [router]);

  // Add auto-rotation effect with animation
  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setActiveTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
        setIsVisible(true);
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

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
      
      // Query the user_details view
      const { data, error } = await supabase
        .from('user_details')
        .select('username, user_id')
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
      
      // Query the user_details view
      const { data, error } = await supabase
        .from('user_details')
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
        setAccountExists(true);
        setTimeout(() => setAccountExists(false), 2000);
        return;
      }

      // Validate password strength
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

      // Sign up with Supabase
      const { data: { user }, error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (signUpError) {
        console.error('Sign up error:', signUpError);
        throw new Error(signUpError.message || 'Failed to create account');
      }

      if (!user) {
        throw new Error('Failed to create user account');
      }

      // Create user profile using the update_user_profile_v2 function
      const { error: profileError } = await supabase.rpc('update_user_profile_v2', {
        p_user_id: user.id,
        p_username: formData.username,
        p_first_name: formData.firstName.trim(),
        p_last_name: formData.lastName.trim(),
        p_phone: null,
        p_gender: null
      });

      if (profileError) {
        console.error('Profile creation error:', profileError);
        // If profile creation fails, try to delete the auth user to maintain consistency
        await supabase.auth.admin.deleteUser(user.id);
        throw new Error('Failed to create user profile: ' + profileError.message);
      }

      setSuccess('Account created successfully!');
      // Wait for 1 second before redirecting to login page
      setTimeout(() => {
        router.push('/login');
      }, 1000);
    } catch (err) {
      console.error('Sign up error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred during sign up');
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

  return (
    <SignUpContainer>
      <AuthColumn>
        <Logo href="/">ScaleMate</Logo>
        <AuthFormContainer>
          <FormContainer>
            <Title>Create Account</Title>
            <Subtitle>Sign up to get started with ScaleMate</Subtitle>
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
                <Button type="submit" disabled={isLoading || !!passwordError}>
                  {isLoading ? 'Creating Account...' : 'Create Account'}
                </Button>
              </ButtonContainer>
              <SignInLink>
                Already have an account? <a href="/login">Sign In</a>
              </SignInLink>
            </Form>
          </FormContainer>
        </AuthFormContainer>
      </AuthColumn>
      <TestimonialsColumn>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {success && <SuccessMessage>{success}</SuccessMessage>}
        {accountExists && <AccountExistsMessage>An account with this email already exists</AccountExistsMessage>}
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <QuoteIcon>
            <FaQuoteLeft />
          </QuoteIcon>
          <TestimonialContainer $isVisible={isVisible}>
            <TestimonialText>
              "{testimonials[activeTestimonial].text}"
            </TestimonialText>
            <ClientInfo>
              <Avatar src={testimonials[activeTestimonial].avatar} alt={testimonials[activeTestimonial].name} />
              <ClientDetails>
                <ClientName>{testimonials[activeTestimonial].name}</ClientName>
                <ClientHandle>{testimonials[activeTestimonial].handle}</ClientHandle>
              </ClientDetails>
            </ClientInfo>
          </TestimonialContainer>
        </div>
      </TestimonialsColumn>
    </SignUpContainer>
  );
};

export default SignUpPage; 