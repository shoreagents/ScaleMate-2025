import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { useTheme } from 'styled-components';
import { supabase } from '@/lib/supabase';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
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
  padding-left: 4rem;
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
  padding: 2rem;
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
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 8px;
`;

const ButtonContainer = styled.div`
  display: flex;
  margin-top: 2rem;
  gap: 1rem;
`;

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text.primary};
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

const SignInLink = styled.div`
  text-align: center;
  margin-top: 1rem;
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
    username: ''
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      if (formData.password !== formData.confirmPassword) {
        throw new Error('Passwords do not match');
      }

      const { data: { user }, error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (signUpError) throw signUpError;

      if (user) {
        // Create user profile with username
        const { error: profileError } = await supabase
          .from('user_profiles')
          .insert([
            {
              user_id: user.id,
              username: formData.username,
              email: formData.email
            }
          ]);

        if (profileError) throw profileError;

        // Assign user role
        const { error: roleError } = await supabase
          .from('user_roles')
          .insert([
            {
              user_id: user.id,
              role: 'user'
            }
          ]);

        if (roleError) throw roleError;

        router.push('/user/dashboard');
      }
    } catch (err) {
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
              <InputGroup>
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Choose a username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </InputGroup>
              <InputGroup>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </InputGroup>
              <InputGroup>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </InputGroup>
              <InputGroup>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </InputGroup>
              {error && <div style={{ color: 'red', fontSize: '0.875rem' }}>{error}</div>}
              <ButtonContainer>
                <Button type="submit" disabled={isLoading}>
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