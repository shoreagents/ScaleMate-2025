import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FiUser, FiLogOut, FiChevronDown, FiMenu, FiX } from 'react-icons/fi';
import { FaCalculator, FaChartLine, FaUsers, FaGraduationCap, FaDownload, FaToolbox, FaRegNewspaper, FaRegCircle, FaUser } from 'react-icons/fa6';
import { FaGripVertical } from 'react-icons/fa6';
import { FaHome } from 'react-icons/fa';
import { supabase } from '@/lib/supabase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const HeaderContainer = styled.header`
  position: fixed;
  width: 100%;
  background-color: white;
  backdrop-filter: blur(4px);
  z-index: 50;
  border-bottom: 1px solid #E5E7EB;
`;

const Container = styled.div`
  margin: 0 auto;
  padding: 0 1.5rem;
  @media (min-width: 1200px) {
    padding: 0 1.5rem;
  }
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 4rem;
  padding-right: 0;
`;

const Logo = styled.span`
  font-size: 1.5rem;
  font-weight: 700;
  color: #0F172A;
  text-decoration: none;
`;

const Nav = styled.nav`
  display: none;
  gap: 2rem;

  @media (min-width: 995px) {
    display: flex;
  }
`;

const NavItem = styled.span`
  color: #0F172A;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: #3B82F6;
  }
`;

const AuthSection = styled.div`
  display: none;
  align-items: center;
  gap: 1rem;

  @media (min-width: 995px) {
    display: flex;
  }
`;

const LoginButton = styled.button`
  color: #0F172A;
  cursor: pointer;
  transition: color 0.2s;
  text-decoration: none;
  background: none;
  border: none;
  padding: 0;
  font-size: inherit;

  &:hover {
    color: #3B82F6;
  }
`;

const SignUpButton = styled.button`
  background-color: #3B82F6;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.2s;
  text-decoration: none;
  border: none;
  font-size: inherit;

  &:hover {
    background-color: #2563EB;
  }
`;

const MenuItem = styled.div`
  color: #0F172A;
  cursor: pointer;
  transition: color 0.2s;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;

  &:hover {
    color: #3B82F6;
    background-color: #F3F4F6;
  }
`;

const ProfileContainer = styled.div`
  position: relative;
`;

const ProfileDropdown = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border-radius: 8px;
  border: 1px solid #E5E7EB;
  width: 200px;
  display: ${props => props.$isOpen ? 'block' : 'none'};
  z-index: 50;
  overflow: hidden;
`;

const DropdownItem = styled.div<{ $isLogout?: boolean }>`
  padding: 12px 16px;
  color: ${props => props.$isLogout ? '#EF4444' : '#374151'};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 4px;
  width: calc(100% - 8px);
  border-radius: 6px;

  &:hover {
    background-color: #f3f4f6;
  }

  &:first-child {
    margin-top: 4px;
  }

  &:last-child {
    margin-bottom: 4px;
  }
`;

const IconButton = styled.button`
  background-color: #F3F4F6;
  border: none;
  cursor: pointer;
  color: #6B7280;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  padding: 0;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #EAECF0;
  }
`;

const Spinner = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid rgba(59, 130, 246, 0.1);
  border-radius: 50%;
  border-top-color: #3B82F6;
  animation: spin 1s ease-in-out infinite;

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const SolutionsDropdown = styled.div`
  position: fixed;
  top: 4rem;
  left: 0;
  right: 0;
  width: 100vw;
  min-width: unset;
  background: #fff;
  border: 1px solid #E5E7EB;
  border-radius: 0 0 1rem 1rem;
  box-shadow: 0 4px 24px rgba(0,0,0,0.08);
  padding: 2rem 0;
  z-index: 9999;
  display: flex;
  justify-content: center;
  gap: 2rem;

  @media (max-width: 1280px) {
    padding: 1.5rem 0;
    gap: 1rem;
  }
`;

const SolutionsNavItem = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
  &:hover > div {
    display: flex;
  }
`;

const SolutionCard = styled.div`
  background: #fff;
  border-radius: 0.75rem;
  border: 1px solid #E5E7EB;
  padding: 1.5rem 1.25rem 1.25rem 1.25rem;
  min-width: 300px;
  max-width: 380px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 0 0.5vw;
  box-shadow: 0 2px 8px rgba(59,130,246,0.04);

  @media (max-width: 1280px) {
    width: calc(50% - 1rem);
    min-width: unset;
    max-width: unset;
    margin: 0;
  }

  @media (max-width: 640px) {
    width: 100%;
  }
`;

const SolutionIcon = styled.div<{$bg: string}>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${props => props.$bg};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;

  svg {
    width: 20px;
    height: 20px;
    color: white;
  }
`;

const SolutionTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #0F172A;
  margin: 0 0 0.5rem 0;
`;

const SolutionDescription = styled.p`
  font-size: 0.875rem;
  color: #64748B;
  margin: 0 0 1rem 0;
  line-height: 1.5;
`;

const SolutionLink = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #3B82F6;
  font-size: 0.875rem;
  font-weight: 500;
  margin-top: auto;

  svg {
    width: 12px;
    height: 12px;
  }
`;

const MobileMenuButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  color: #0F172A;
  padding: 0.5rem;

  @media (min-width: 995px) {
    display: none;
  }
`;

const MobileMenu = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 4rem;
  left: 0;
  right: 0;
  bottom: 0;
  background: white;
  z-index: 40;
  padding: 1rem;
  display: ${props => props.$isOpen ? 'block' : 'none'};
  overflow-y: auto;
`;

const MobileMenuItem = styled.div`
  padding: 1rem;
  border-bottom: 1px solid #E5E7EB;
  color: #0F172A;
  cursor: pointer;

  &:hover {
    background-color: #F3F4F6;
  }
`;

const ProfileIcon = styled.div`
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const AvatarSpinner = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid rgba(59, 130, 246, 0.1);
  border-radius: 50%;
  border-top-color: #3B82F6;
  animation: spin 1s ease-in-out infinite;

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const Header = () => {
  const router = useRouter();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);
  const [isLearnOpen, setIsLearnOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
          }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async (preventRedirect = false) => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) throw error;
      
      setIsAuthenticated(!!session);
      setIsLoading(false);

      if (!session && !preventRedirect && router.pathname.startsWith('/user/dashboard')) {
        router.push('/login');
      }
    } catch (error) {
      console.error('Auth check error:', error);
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
    router.push('/');
  };

  const handleDashboardClick = async () => {
    if (!isAuthenticated) {
      router.push('/login');
          return;
        }

    try {
      const { data: { session }, error } = await supabase.auth.getSession();

      if (error) throw error;
      
      if (session) {
            router.push('/user/dashboard');
      } else {
        router.push('/login');
      }
    } catch (error) {
      console.error('Dashboard navigation error:', error);
      router.push('/login');
    }
  };

  const handleSolutionsEnter = () => {
    setIsSolutionsOpen(true);
  };

  const handleSolutionsLeave = () => {
    setIsSolutionsOpen(false);
  };

  const handleLearnEnter = () => {
    setIsLearnOpen(true);
  };

  const handleLearnLeave = () => {
    setIsLearnOpen(false);
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMobileNavClick = (path: string) => {
    router.push(path);
    setIsMobileMenuOpen(false);
  };

  return (
    <HeaderContainer>
      <Container>
        <HeaderContent>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <Logo>ScaleMate</Logo>
          </Link>
          
          <Nav>
            <SolutionsNavItem onMouseEnter={handleSolutionsEnter} onMouseLeave={handleSolutionsLeave}>
              <NavItem>
                Solutions <FiChevronDown size={14} style={{ marginLeft: 4 }} />
              </NavItem>
              {isSolutionsOpen && (
                <SolutionsDropdown>
                    <SolutionCard>
                    <SolutionIcon $bg="#3B82F6">
                      <FaCalculator />
                    </SolutionIcon>
                    <SolutionTitle>Quote Calculator</SolutionTitle>
                    <SolutionDescription>
                      Get instant, accurate quotes for your staffing needs with our AI-powered calculator.
                    </SolutionDescription>
                    <SolutionLink>
                      Learn More <FontAwesomeIcon icon={faArrowRight} />
                    </SolutionLink>
                    </SolutionCard>
                  
                    <SolutionCard>
                    <SolutionIcon $bg="#10B981">
                      <FaChartLine />
                    </SolutionIcon>
                    <SolutionTitle>Role Builder</SolutionTitle>
                    <SolutionDescription>
                      Create detailed job descriptions and role specifications with AI assistance.
                    </SolutionDescription>
                    <SolutionLink>
                      Learn More <FontAwesomeIcon icon={faArrowRight} />
                    </SolutionLink>
                    </SolutionCard>
                  
                    <SolutionCard>
                    <SolutionIcon $bg="#8B5CF6">
                      <FaUsers />
                    </SolutionIcon>
                    <SolutionTitle>Team Management</SolutionTitle>
                    <SolutionDescription>
                      Streamline your team management with our comprehensive tools and analytics.
                    </SolutionDescription>
                    <SolutionLink>
                      Learn More <FontAwesomeIcon icon={faArrowRight} />
                    </SolutionLink>
                    </SolutionCard>
                </SolutionsDropdown>
              )}
              </SolutionsNavItem>

            <SolutionsNavItem onMouseEnter={handleLearnEnter} onMouseLeave={handleLearnLeave}>
              <NavItem>
                Learn <FiChevronDown size={14} style={{ marginLeft: 4 }} />
              </NavItem>
              {isLearnOpen && (
                <SolutionsDropdown>
                    <SolutionCard>
                    <SolutionIcon $bg="#F59E0B">
                      <FaGraduationCap />
                    </SolutionIcon>
                    <SolutionTitle>Courses</SolutionTitle>
                    <SolutionDescription>
                      Access our comprehensive library of courses on staffing and team management.
                    </SolutionDescription>
                    <SolutionLink>
                      Learn More <FontAwesomeIcon icon={faArrowRight} />
                    </SolutionLink>
                    </SolutionCard>
                  
                    <SolutionCard>
                    <SolutionIcon $bg="#EC4899">
                      <FaDownload />
                    </SolutionIcon>
                    <SolutionTitle>Resources</SolutionTitle>
                    <SolutionDescription>
                      Download guides, templates, and tools to enhance your staffing process.
                    </SolutionDescription>
                    <SolutionLink>
                      Learn More <FontAwesomeIcon icon={faArrowRight} />
                    </SolutionLink>
                    </SolutionCard>
                  
                    <SolutionCard>
                    <SolutionIcon $bg="#6366F1">
                      <FaToolbox />
                    </SolutionIcon>
                    <SolutionTitle>Tools</SolutionTitle>
                    <SolutionDescription>
                      Explore our suite of tools designed to optimize your staffing workflow.
                    </SolutionDescription>
                    <SolutionLink>
                      Learn More <FontAwesomeIcon icon={faArrowRight} />
                    </SolutionLink>
                    </SolutionCard>
                </SolutionsDropdown>
              )}
            </SolutionsNavItem>

            <Link href="/pricing" style={{ textDecoration: 'none' }}>
              <NavItem>Pricing</NavItem>
            </Link>
            
            <Link href="/about" style={{ textDecoration: 'none' }}>
              <NavItem>About</NavItem>
            </Link>
          </Nav>

          <AuthSection>
            {isLoading ? (
              <Spinner />
            ) : isAuthenticated ? (
              <ProfileContainer ref={profileRef}>
                <IconButton onClick={() => setIsProfileOpen(!isProfileOpen)}>
                  <ProfileIcon>
                    <FaUser size={20} color="#9CA3AF" />
                  </ProfileIcon>
                </IconButton>
                <ProfileDropdown $isOpen={isProfileOpen}>
                  <DropdownItem onClick={handleDashboardClick}>
                    <FaHome size={16} color="#6B7280" />
                    Dashboard
                  </DropdownItem>
                  <DropdownItem onClick={handleLogout} $isLogout>
                    <FiLogOut size={16} />
                    Logout
                  </DropdownItem>
                </ProfileDropdown>
              </ProfileContainer>
            ) : (
              <>
                <Link href="/login" style={{ textDecoration: 'none' }}>
                  <LoginButton type="button">Log in</LoginButton>
                </Link>
                <Link href="/signup" style={{ textDecoration: 'none' }}>
                  <SignUpButton type="button">Sign up</SignUpButton>
                </Link>
              </>
            )}
          </AuthSection>

          <MobileMenuButton onClick={handleMobileMenuToggle}>
            {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </MobileMenuButton>
        </HeaderContent>
      </Container>

      <MobileMenu $isOpen={isMobileMenuOpen}>
        <MobileMenuItem onClick={() => handleMobileNavClick('/solutions')}>
          Solutions
        </MobileMenuItem>
        <MobileMenuItem onClick={() => handleMobileNavClick('/learn')}>
          Learn
        </MobileMenuItem>
        <MobileMenuItem onClick={() => handleMobileNavClick('/pricing')}>
          Pricing
        </MobileMenuItem>
        <MobileMenuItem onClick={() => handleMobileNavClick('/about')}>
          About
        </MobileMenuItem>
        {isAuthenticated ? (
          <>
            <MobileMenuItem onClick={handleDashboardClick}>
                Dashboard
            </MobileMenuItem>
            <MobileMenuItem onClick={handleLogout}>
              Logout
            </MobileMenuItem>
          </>
          ) : (
          <>
            <MobileMenuItem onClick={() => handleMobileNavClick('/login')}>
              Log in
            </MobileMenuItem>
            <MobileMenuItem onClick={() => handleMobileNavClick('/signup')}>
              Sign up
            </MobileMenuItem>
          </>
          )}
      </MobileMenu>
    </HeaderContainer>
  );
};

export default Header; 