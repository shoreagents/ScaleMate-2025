import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { useTheme } from 'styled-components';
import { supabase } from '@/lib/supabase';
import SignInForm from '@/components/auth/SignInForm';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { FaQuoteLeft } from 'react-icons/fa';
import Link from 'next/link';

const LoginContainer = styled.div`
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

const QuoteIcon = styled.div`
  margin-bottom: 2rem;
  
  svg {
    font-size: 2.25rem;
    color: rgba(59, 130, 246, 0.3);
    transform: rotate(180deg);
  }
`;

const TestimonialText = styled.blockquote`
  font-size: 1.8rem;
  font-weight: 500;
  color: white;
  margin:  0 0 2rem 0 ;
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

const TestimonialContainer = styled.div<{ $isVisible: boolean }>`
  opacity: ${props => props.$isVisible ? 1 : 0};
  transform: translateY(${props => props.$isVisible ? '0' : '20px'});
  transition: all 0.5s ease-in-out;
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

const LoginPage = () => {
  const router = useRouter();
  const theme = useTheme();
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        // Get user's role
        const { data: roles } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', user.id);

        if (roles && roles.length > 0) {
          const userRoles = roles.map(r => r.role);
          if (userRoles.includes('admin') || userRoles.includes('moderator')) {
            router.push('/admin/dashboard');
          } else if (userRoles.includes('user')) {
            router.push('/user/dashboard');
          }
        }
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
      }, 500); // Wait for fade out before changing content
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <LoginContainer>
      <AuthColumn>
        <Logo href="/">ScaleMate</Logo>
        <AuthFormContainer>
          <SignInForm />
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
    </LoginContainer>
  );
};

export default LoginPage; 