import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FiUser, FiLogOut, FiChevronDown, FiMenu, FiX } from 'react-icons/fi';
import { FaCalculator, FaChartLine, FaUsers, FaGraduationCap, FaDownload, FaToolbox, FaRegNewspaper, FaRegCircle } from 'react-icons/fa6';
import { supabase } from '@/lib/supabase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const HeaderContainer = styled.header`
  position: fixed;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(4px);
  z-index: 50;
  border-bottom: 1px solid #E5E7EB;
`;

const Container = styled.div`
  margin: 0 auto;
  padding: 0 12vw;
  @media (min-width: 1200px) {
    padding: 0 14rem;
  }
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 4rem;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: 700;
  color: #0F172A;
  text-decoration: none;
`;

const Nav = styled.nav`
  display: none;
  gap: 2rem;

  @media (min-width: 768px) {
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

  @media (min-width: 1024px) {
    display: flex;
  }
`;

const LoginButton = styled(Link)`
  color: #0F172A;
  cursor: pointer;
  transition: color 0.2s;
  text-decoration: none;

  &:hover {
    color: #3B82F6;
  }
`;

const SignUpButton = styled.span`
  background-color: #3B82F6;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #2563EB;
  }
`;

const ProfileContainer = styled.div`
  position: relative;
`;

const ProfileDropdown = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border-radius: 8px;
  border: 1px solid #E5E7EB;
  width: 200px;
  display: ${props => props.isOpen ? 'block' : 'none'};
  z-index: 50;
  overflow: hidden;
`;

const DropdownItem = styled.div`
  padding: 12px 16px;
  color: #374151;
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

const ProfileIcon = styled.div<{ $imageUrl?: string | null }>`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: ${props => props.$imageUrl ? 'transparent' : '#f3f4f6'};
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

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #6B7280;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  padding: 0;
  transition: all 0.2s ease;

  &:hover {
    background-color: #F3F4F6;
    color: #111827;
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
const SolutionIcon = styled.div<{ bg: string }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${props => props.bg};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.5rem;
  color: #fff;
  font-size: 1.5rem;
`;
const SolutionTitle = styled.div`
  font-weight: 600;
  color: #0F172A;
  margin-bottom: 0.25rem;
`;
const SolutionSubtitle = styled.div`
  font-size: 0.95rem;
  color: #64748B;
  margin-bottom: 0.5rem;
`;
const SolutionLink = styled.a`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  transition: color 0.2s;
  font-size: 0.98rem;
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.colors.primaryDark};
    text-decoration: none;
  }
`;

const ArrowIcon = styled(FontAwesomeIcon)`
  margin-left: 0.25rem;
  font-size: 0.875rem;
`;

const SolutionsDropdownWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const LearnDropdown = styled(SolutionsDropdown)``;

const DropdownContent = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  max-width: 1600px;
  margin: 0 auto;
  width: 100%;
  padding: 0 1rem;
  flex-wrap: nowrap;

  @media (max-width: 1280px) {
    flex-wrap: wrap;
    gap: 1rem;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  color: #0F172A;
  padding: 0.5rem;
  border-radius: 0.5rem;
  transition: background-color 0.2s;

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &:hover {
    background-color: #F3F4F6;
  }
`;

const MobileMenu = styled.div<{ isOpen: boolean }>`
  display: none;
  position: fixed;
  top: 4rem;
  left: 0;
  right: 0;
  background: white;
  border-bottom: 1px solid #E5E7EB;
  padding: 1rem;
  z-index: 40;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    display: ${props => props.isOpen ? 'block' : 'none'};
  }
`;

const MobileNav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const MobileNavItem = styled.div`
  color: #0F172A;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.5rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: #F3F4F6;
  }
`;

const MobileAuthSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #E5E7EB;
`;

const MobileLoginButton = styled(Link)`
  color: #0F172A;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.5rem;
  text-decoration: none;
  transition: all 0.2s;
  text-align: center;
  width: 100%;
  border: 1px solid #E5E7EB;
  background-color: #F9FAFB;

  &:hover {
    background-color: #F3F4F6;
    border-color: #D1D5DB;
  }
`;

const MobileSignUpButton = styled.span`
  background-color: #3B82F6;
  color: white;
  padding: 0.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
  text-align: center;
  transition: background-color 0.2s;

  &:hover {
    background-color: #2563EB;
  }
`;

const MobileMenuSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const MobileMenuSectionTitle = styled.div`
  font-weight: 600;
  color: #6B7280;
  font-size: 0.875rem;
  padding: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const Header = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showSolutions, setShowSolutions] = useState(false);
  const [showLearn, setShowLearn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  let closeTimeout: NodeJS.Timeout | null = null;
  let learnCloseTimeout: NodeJS.Timeout | null = null;

  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
      try {
        const { data: { user } } = await supabase.auth.getUser();
        setIsLoggedIn(!!user);

        if (user) {
          const { data: profile } = await supabase
            .from('user_profiles')
            .select('profile_picture')
            .eq('user_id', user.id)
            .single();

          if (profile?.profile_picture) {
            setProfilePicture(profile.profile_picture);
          }
        }
      } catch (error) {
        console.error('Error checking auth:', error);
        setIsLoggedIn(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session?.user);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  const handleDashboardClick = async () => {
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
    } else {
      router.push('/login');
    }
  };

  const handleSolutionsEnter = () => {
    if (closeTimeout) clearTimeout(closeTimeout);
    setShowSolutions(true);
  };
  const handleSolutionsLeave = () => {
    closeTimeout = setTimeout(() => setShowSolutions(false), 120);
  };

  const handleLearnEnter = () => {
    if (learnCloseTimeout) clearTimeout(learnCloseTimeout);
    setShowLearn(true);
  };
  const handleLearnLeave = () => {
    learnCloseTimeout = setTimeout(() => setShowLearn(false), 120);
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
          <Logo href="/">ScaleMate</Logo>
          <Nav>
            <NavItem onClick={() => router.push('/')}>Home</NavItem>
            <SolutionsDropdownWrapper
              onMouseEnter={handleSolutionsEnter}
              onMouseLeave={handleSolutionsLeave}
              tabIndex={0}
              aria-haspopup="true"
              aria-expanded={showSolutions}
            >
              <SolutionsNavItem>
                Solutions <FiChevronDown style={{ marginLeft: 4 }} />
              </SolutionsNavItem>
              {showSolutions && (
                <SolutionsDropdown>
                  <DropdownContent>
                    <SolutionCard>
                      <SolutionIcon bg="#3B82F6"><FaCalculator /></SolutionIcon>
                      <SolutionTitle>Quick Quote Calculator</SolutionTitle>
                      <SolutionSubtitle>Instantly estimate offshore staff costs</SolutionSubtitle>
                      <SolutionLink onClick={() => router.push('/quote')}>Get a Quick Quote <ArrowIcon icon={faArrowRight} /></SolutionLink>
                    </SolutionCard>
                    <SolutionCard>
                      <SolutionIcon bg="#F472B6"><FaChartLine /></SolutionIcon>
                      <SolutionTitle>Cost Savings Calculator</SolutionTitle>
                      <SolutionSubtitle>Compare local vs offshore teams</SolutionSubtitle>
                      <SolutionLink onClick={() => router.push('/cost-savings')}>Compare Savings <ArrowIcon icon={faArrowRight} /></SolutionLink>
                    </SolutionCard>
                    <SolutionCard>
                      <SolutionIcon bg="#4ADE80"><FaUsers /></SolutionIcon>
                      <SolutionTitle>AI-Powered Role Builder</SolutionTitle>
                      <SolutionSubtitle>Build offshore job blueprints with AI</SolutionSubtitle>
                      <SolutionLink onClick={() => router.push('/role-builder')}>Build a Role <ArrowIcon icon={faArrowRight} /></SolutionLink>
                    </SolutionCard>
                    <SolutionCard>
                      <SolutionIcon bg="#6366F1"><FaRegCircle /></SolutionIcon>
                      <SolutionTitle>Readiness Quiz</SolutionTitle>
                      <SolutionSubtitle>Assess your offshore and AI readiness</SolutionSubtitle>
                      <SolutionLink onClick={() => router.push('/readiness')}>Take the Quiz <ArrowIcon icon={faArrowRight} /></SolutionLink>
                    </SolutionCard>
                  </DropdownContent>
                </SolutionsDropdown>
              )}
            </SolutionsDropdownWrapper>
            <SolutionsDropdownWrapper
              onMouseEnter={handleLearnEnter}
              onMouseLeave={handleLearnLeave}
              tabIndex={0}
              aria-haspopup="true"
              aria-expanded={showLearn}
            >
              <SolutionsNavItem>
                Learn <FiChevronDown style={{ marginLeft: 4 }} />
              </SolutionsNavItem>
              {showLearn && (
                <LearnDropdown>
                  <DropdownContent>
                    <SolutionCard>
                      <SolutionIcon bg="#3B82F6"><FaGraduationCap /></SolutionIcon>
                      <SolutionTitle>Course Library</SolutionTitle>
                      <SolutionSubtitle>Build skills with free and premium training.</SolutionSubtitle>
                      <SolutionLink onClick={() => router.push('/courses')}>Browse Courses <ArrowIcon icon={faArrowRight} /></SolutionLink>
                    </SolutionCard>
                    <SolutionCard>
                      <SolutionIcon bg="#F472B6"><FaDownload /></SolutionIcon>
                      <SolutionTitle>Resource Library</SolutionTitle>
                      <SolutionSubtitle>Access checklists, templates, and guides.</SolutionSubtitle>
                      <SolutionLink onClick={() => router.push('/resources')}>View Resources <ArrowIcon icon={faArrowRight} /></SolutionLink>
                    </SolutionCard>
                    <SolutionCard>
                      <SolutionIcon bg="#4ADE80"><FaToolbox /></SolutionIcon>
                      <SolutionTitle>Tool Library</SolutionTitle>
                      <SolutionSubtitle>Discover top AI and automation tools.</SolutionSubtitle>
                      <SolutionLink onClick={() => router.push('/tools')}>Explore Tools <ArrowIcon icon={faArrowRight} /></SolutionLink>
                    </SolutionCard>
                    <SolutionCard>
                      <SolutionIcon bg="#3B82F6"><FaRegNewspaper /></SolutionIcon>
                      <SolutionTitle>Blog & Insights</SolutionTitle>
                      <SolutionSubtitle>Read insights, strategies, and scaling tips.</SolutionSubtitle>
                      <SolutionLink onClick={() => router.push('/blog')}>Read the Blog <ArrowIcon icon={faArrowRight} /></SolutionLink>
                    </SolutionCard>
                  </DropdownContent>
                </LearnDropdown>
              )}
            </SolutionsDropdownWrapper>
            <NavItem onClick={() => router.push('/about')}>About</NavItem>
            <NavItem onClick={() => router.push('/contact')}>Contact</NavItem>
          </Nav>
          <AuthSection>
            {isLoading ? (
              <Spinner />
            ) : isLoggedIn ? (
              <ProfileContainer id="profile-menu">
                <IconButton onClick={() => setIsProfileOpen(!isProfileOpen)}>
                  <ProfileIcon $imageUrl={profilePicture}>
                    {profilePicture ? (
                      <img src={profilePicture} alt="Profile" />
                    ) : (
                      <FiUser size={20} />
                    )}
                  </ProfileIcon>
                </IconButton>
                <ProfileDropdown isOpen={isProfileOpen}>
                  <DropdownItem onClick={handleDashboardClick}>
                    <FiUser size={16} />
                    Dashboard
                  </DropdownItem>
                  <DropdownItem onClick={handleLogout}>
                    <FiLogOut size={16} />
                    Logout
                  </DropdownItem>
                </ProfileDropdown>
              </ProfileContainer>
            ) : (
              <>
                <LoginButton href="/login">Login</LoginButton>
                <SignUpButton onClick={() => router.push('/signup')}>Sign Up</SignUpButton>
              </>
            )}
          </AuthSection>
          <MobileMenuButton onClick={handleMobileMenuToggle}>
            {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </MobileMenuButton>
        </HeaderContent>
      </Container>
      <MobileMenu isOpen={isMobileMenuOpen}>
        <MobileNav>
          <MobileMenuSection>
            <MobileNavItem onClick={() => handleMobileNavClick('/')}>Home</MobileNavItem>
          </MobileMenuSection>

          <MobileMenuSection>
            <MobileMenuSectionTitle>Solutions</MobileMenuSectionTitle>
            <MobileNavItem onClick={() => handleMobileNavClick('/quote')}>Quick Quote Calculator</MobileNavItem>
            <MobileNavItem onClick={() => handleMobileNavClick('/cost-savings')}>Cost Savings Calculator</MobileNavItem>
            <MobileNavItem onClick={() => handleMobileNavClick('/role-builder')}>AI-Powered Role Builder</MobileNavItem>
            <MobileNavItem onClick={() => handleMobileNavClick('/readiness')}>Readiness Quiz</MobileNavItem>
          </MobileMenuSection>

          <MobileMenuSection>
            <MobileMenuSectionTitle>Learn</MobileMenuSectionTitle>
            <MobileNavItem onClick={() => handleMobileNavClick('/courses')}>Course Library</MobileNavItem>
            <MobileNavItem onClick={() => handleMobileNavClick('/resources')}>Resource Library</MobileNavItem>
            <MobileNavItem onClick={() => handleMobileNavClick('/tools')}>Tool Library</MobileNavItem>
            <MobileNavItem onClick={() => handleMobileNavClick('/blog')}>Blog & Insights</MobileNavItem>
          </MobileMenuSection>

          <MobileMenuSection>
            <MobileNavItem onClick={() => handleMobileNavClick('/about')}>About</MobileNavItem>
            <MobileNavItem onClick={() => handleMobileNavClick('/contact')}>Contact</MobileNavItem>
          </MobileMenuSection>
        </MobileNav>
        <MobileAuthSection>
          {isLoading ? (
            <Spinner />
          ) : isLoggedIn ? (
            <>
              <MobileNavItem onClick={handleDashboardClick}>Dashboard</MobileNavItem>
              <MobileNavItem onClick={handleLogout}>Logout</MobileNavItem>
            </>
          ) : (
            <>
              <MobileLoginButton href="/login">Login</MobileLoginButton>
              <MobileSignUpButton onClick={() => handleMobileNavClick('/signup')}>Sign Up</MobileSignUpButton>
            </>
          )}
        </MobileAuthSection>
      </MobileMenu>
    </HeaderContainer>
  );
};

export default Header; 