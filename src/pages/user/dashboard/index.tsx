import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import NoNavbarLayout from '@/components/layout/NoNavbarLayout';
import DashboardTab from '@/components/user/DashboardTab';
import RoleBuilderTab from '@/components/user/RoleBuilderTab';
import UserHeader from '@/components/layout/UserHeader';
import { supabase } from '@/lib/supabase';
import { 
  FaHouse, 
  FaUsersGear, 
  FaCalculator, 
  FaCoins, 
  FaChartSimple,
  FaBookmark,
  FaFileLines,
  FaBook,
  FaGraduationCap,
  FaRobot,
  FaLayerGroup,
  FaTrophy,
  FaGear
} from 'react-icons/fa6';

const DashboardContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: white;
`;

const Sidebar = styled.aside`
  width: 16rem;
  background-color: white;
  border-right: 1px solid #E5E7EB;
  position: fixed;
  height: 100vh;
`;

const SidebarContent = styled.div`
  padding: 1.5rem;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
`;

const LogoText = styled.span`
  font-size: 1.5rem;
  font-weight: 700;
  color: #0F172A;
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const NavLink = styled.a<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  border-radius: 0.5rem;
  color: ${props => props.$active ? '#3B82F6' : 'rgba(15, 23, 42, 0.7)'};
  background-color: ${props => props.$active ? 'rgba(59, 130, 246, 0.1)' : 'transparent'};
  text-decoration: none;
  transition: all 0.2s;

  &:hover {
    background-color: ${props => props.$active ? 'rgba(59, 130, 246, 0.1)' : '#F9FAFB'};
  }
`;

const NavIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.25rem;
  height: 1.25rem;
`;

const NavText = styled.span`
  font-size: 0.875rem;
`;

const UnlockedBadge = styled.span`
  margin-left: 0.25rem;
  font-size: 0.75rem;
  color: #84CC16;
`;

const MainContent = styled.main`
  flex: 1;
  margin-left: 16rem;
  padding: 2rem;
  background-color: #F9FAFB;
`;

const DashboardPage: React.FC = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkUserRole = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          router.push('/login');
          return;
        }

        const { data: roles, error: rolesError } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', user.id);

        if (rolesError) {
          console.error('Error fetching user roles:', rolesError);
          router.push('/login');
          return;
        }

        if (!roles || !roles.some(r => r.role === 'user')) {
          console.error('User does not have user role:', roles);
          router.push('/login');
          return;
        }

        setIsLoading(false);
      } catch (error) {
        console.error('Error checking user role:', error);
        router.push('/login');
      }
    };

    checkUserRole();
  }, [router]);

  if (isLoading) {
    return null; // Or a loading spinner
  }

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'role-builder':
        return <RoleBuilderTab />;
      default:
        return (
          <DashboardTab 
            user={{
              name: "Alex",
              email: "alex@example.com",
              avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg"
            }}
          />
        );
    }
  };

  return (
    <NoNavbarLayout>
      <DashboardContainer>
        <Sidebar>
          <SidebarContent>
            <LogoContainer>
              <LogoText>ScaleMate</LogoText>
            </LogoContainer>
            <Nav>
              <NavLink $active={activeTab === 'dashboard'} onClick={() => handleTabClick('dashboard')}>
                <NavIcon><FaHouse /></NavIcon>
                <NavText>My Dashboard</NavText>
              </NavLink>
              <NavLink $active={activeTab === 'role-builder'} onClick={() => handleTabClick('role-builder')}>
                <NavIcon><FaUsersGear /></NavIcon>
                <NavText>Interactive Role Builder</NavText>
              </NavLink>
              <NavLink onClick={() => handleTabClick('quote-calculator')}>
                <NavIcon><FaCalculator /></NavIcon>
                <NavText>Expanded Quote Calculator</NavText>
              </NavLink>
              <NavLink onClick={() => handleTabClick('team-savings')}>
                <NavIcon><FaCoins /></NavIcon>
                <NavText>Detailed Team Savings Tool</NavText>
              </NavLink>
              <NavLink onClick={() => handleTabClick('readiness-score')}>
                <NavIcon><FaChartSimple /></NavIcon>
                <NavText>Readiness Score Page</NavText>
              </NavLink>
              <NavLink onClick={() => handleTabClick('saved-blueprints')}>
                <NavIcon><FaBookmark /></NavIcon>
                <NavText>Saved Role Blueprints</NavText>
              </NavLink>
              <NavLink onClick={() => handleTabClick('saved-quotes')}>
                <NavIcon><FaFileLines /></NavIcon>
                <NavText>Saved Quotes</NavText>
              </NavLink>
              <NavLink onClick={() => handleTabClick('resource-library')}>
                <NavIcon><FaBook /></NavIcon>
                <NavText>Resource Library</NavText>
                <UnlockedBadge>Unlocked</UnlockedBadge>
              </NavLink>
              <NavLink onClick={() => handleTabClick('course-dashboard')}>
                <NavIcon><FaGraduationCap /></NavIcon>
                <NavText>Course Dashboard</NavText>
              </NavLink>
              <NavLink onClick={() => handleTabClick('ai-tool-library')}>
                <NavIcon><FaRobot /></NavIcon>
                <NavText>AI Tool Library</NavText>
              </NavLink>
              <NavLink onClick={() => handleTabClick('saved-tool-stack')}>
                <NavIcon><FaLayerGroup /></NavIcon>
                <NavText>Saved Tool Stack</NavText>
              </NavLink>
              <NavLink onClick={() => handleTabClick('gamified-tracker')}>
                <NavIcon><FaTrophy /></NavIcon>
                <NavText>Gamified Tracker</NavText>
              </NavLink>
              <NavLink onClick={() => handleTabClick('account-settings')}>
                <NavIcon><FaGear /></NavIcon>
                <NavText>Account Settings</NavText>
              </NavLink>
            </Nav>
          </SidebarContent>
        </Sidebar>
        <MainContent>
          <UserHeader 
            title="Dashboard"
            profilePicture="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg"
            onLogout={handleLogout}
            showProfile={true}
          />
          {renderContent()}
        </MainContent>
      </DashboardContainer>
    </NoNavbarLayout>
  );
};

export default DashboardPage; 