import React, { useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import NoNavbarLayout from '@/components/layout/NoNavbarLayout';

const AuthContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #F9FAFB;
  align-items: center;
  justify-content: center;
`;

const AuthCard = styled.div`
  width: 100%;
  max-width: 400px;
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
`;

const AuthTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const AuthSubtitle = styled.p`
  color: #6B7280;
  text-align: center;
  margin-bottom: 2rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.5rem;
`;

const Input = styled.input<{ $error?: boolean }>`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${props => props.$error ? '#EF4444' : '#E5E7EB'};
  border-radius: 0.5rem;
  font-size: 0.875rem;
  color: #111827;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #3B82F6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  &::placeholder {
    color: #9CA3AF;
  }
`;

const ErrorMessage = styled.p`
  color: #EF4444;
  font-size: 0.75rem;
  margin-top: 0.5rem;
`;

const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: #3B82F6;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #2563EB;
  }

  &:disabled {
    background-color: #93C5FD;
    cursor: not-allowed;
  }
`;

const ToggleText = styled.p`
  text-align: center;
  margin-top: 1.5rem;
  color: #6B7280;
  font-size: 0.875rem;

  a {
    color: #3B82F6;
    text-decoration: none;
    font-weight: 500;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const UserAuth: React.FC = () => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {
      email: '',
      password: '',
      confirmPassword: '',
    };

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!isLogin) {
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // For demo purposes, we'll just redirect to dashboard
      // In a real app, you'd handle authentication here
      router.push('/user/dashboard');
    }
  };

  return (
    <NoNavbarLayout>
      <AuthContainer>
        <AuthCard>
          <AuthTitle>{isLogin ? 'Welcome Back' : 'Create Account'}</AuthTitle>
          <AuthSubtitle>
            {isLogin 
              ? 'Sign in to your account to continue' 
              : 'Create a new account to get started'}
          </AuthSubtitle>
          
          <form onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                $error={!!errors.email}
              />
              {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
            </FormGroup>

            <FormGroup>
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                $error={!!errors.password}
              />
              {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
            </FormGroup>

            {!isLogin && (
              <FormGroup>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  $error={!!errors.confirmPassword}
                />
                {errors.confirmPassword && <ErrorMessage>{errors.confirmPassword}</ErrorMessage>}
              </FormGroup>
            )}

            <Button type="submit">
              {isLogin ? 'Sign In' : 'Create Account'}
            </Button>
          </form>

          <ToggleText>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <a href="#" onClick={(e) => {
              e.preventDefault();
              setIsLogin(!isLogin);
              setErrors({ email: '', password: '', confirmPassword: '' });
            }}>
              {isLogin ? 'Sign up' : 'Sign in'}
            </a>
          </ToggleText>
        </AuthCard>
      </AuthContainer>
    </NoNavbarLayout>
  );
};

export default UserAuth; 