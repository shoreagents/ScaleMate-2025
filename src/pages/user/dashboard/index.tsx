import React, { useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import NoNavbarLayout from '@/components/layout/NoNavbarLayout';
import { MyDashboardTab, RoleBuilderTab, UserHeader } from '@/components/user';
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
  const [activeSection, setActiveSection] = useState(() => {
    // Get initial section from URL path
    const path = router.asPath;
    if (path.includes('/role-builder')) return 'role-builder';
    return 'dashboard';
  });

  const handleLogout = () => {
    router.push('/user');
  };

  const handleNavClick = async (section: string) => {
    setActiveSection(section);
    
    // Update URL based on section
    if (section === 'role-builder') {
      await router.push('/user/dashboard/role-builder');
    } else if (section === 'dashboard') {
      await router.push('/user/dashboard');
    } else {
      // For other sections, we'll keep them in the base dashboard for now
      await router.push('/user/dashboard');
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'role-builder':
        return <RoleBuilderTab />;
      default:
        return (
          <MyDashboardTab 
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
              <NavLink href="#" $active={activeSection === 'dashboard'} onClick={() => handleNavClick('dashboard')}>
                <NavIcon><FaHouse /></NavIcon>
                <NavText>My Dashboard</NavText>
              </NavLink>
              <NavLink href="#" $active={activeSection === 'role-builder'} onClick={() => handleNavClick('role-builder')}>
                <NavIcon><FaUsersGear /></NavIcon>
                <NavText>Interactive Role Builder</NavText>
              </NavLink>
              <NavLink href="#" onClick={() => handleNavClick('quote-calculator')}>
                <NavIcon><FaCalculator /></NavIcon>
                <NavText>Expanded Quote Calculator</NavText>
              </NavLink>
              <NavLink href="#" onClick={() => handleNavClick('team-savings')}>
                <NavIcon><FaCoins /></NavIcon>
                <NavText>Detailed Team Savings Tool</NavText>
              </NavLink>
              <NavLink href="#" onClick={() => handleNavClick('readiness-score')}>
                <NavIcon><FaChartSimple /></NavIcon>
                <NavText>Readiness Score Page</NavText>
              </NavLink>
              <NavLink href="#" onClick={() => handleNavClick('saved-blueprints')}>
                <NavIcon><FaBookmark /></NavIcon>
                <NavText>Saved Role Blueprints</NavText>
              </NavLink>
              <NavLink href="#" onClick={() => handleNavClick('saved-quotes')}>
                <NavIcon><FaFileLines /></NavIcon>
                <NavText>Saved Quotes</NavText>
              </NavLink>
              <NavLink href="#" onClick={() => handleNavClick('resource-library')}>
                <NavIcon><FaBook /></NavIcon>
                <NavText>Resource Library</NavText>
                <UnlockedBadge>Unlocked</UnlockedBadge>
              </NavLink>
              <NavLink href="#" onClick={() => handleNavClick('course-dashboard')}>
                <NavIcon><FaGraduationCap /></NavIcon>
                <NavText>Course Dashboard</NavText>
              </NavLink>
              <NavLink href="#" onClick={() => handleNavClick('ai-tool-library')}>
                <NavIcon><FaRobot /></NavIcon>
                <NavText>AI Tool Library</NavText>
              </NavLink>
              <NavLink href="#" onClick={() => handleNavClick('saved-tool-stack')}>
                <NavIcon><FaLayerGroup /></NavIcon>
                <NavText>Saved Tool Stack</NavText>
              </NavLink>
              <NavLink href="#" onClick={() => handleNavClick('gamified-tracker')}>
                <NavIcon><FaTrophy /></NavIcon>
                <NavText>Gamified Tracker</NavText>
              </NavLink>
              <NavLink href="#" onClick={() => handleNavClick('account-settings')}>
                <NavIcon><FaGear /></NavIcon>
                <NavText>Account Settings</NavText>
              </NavLink>
            </Nav>
          </SidebarContent>
        </Sidebar>
        <MainContent>
          <UserHeader 
            activeSection={activeSection}
            user={{
              name: "Alex",
              email: "alex@example.com",
              avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg"
            }}
          />
          {renderContent()}
        </MainContent>
      </DashboardContainer>
    </NoNavbarLayout>
  );
};

export default DashboardPage; 