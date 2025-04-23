import React, { useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import Link from 'next/link';
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
<<<<<<< Updated upstream
=======
import CostSavingsTab from '@/components/user/CostSavingsTab';
import RolesBlueprintTab from '@/components/user/RolesBlueprintTab';
import SavedQuotesTab from '@/components/user/SavedQuotesTab';
import ResourceLibraryTab from '@/components/user/ResourceLibraryTab';
import CourseDashboardTab from '@/components/user/CourseDashboardTab';
import AIToolLibraryTab from '@/components/user/AIToolLibraryTab';
import SavedToolStackTab from '@/components/user/SavedToolStackTab';
import GamifiedTrackerTab from '@/components/user/GamifiedTrackerTab';
import AccountSettingsTab from '@/components/user/AccountSettingsTab';
>>>>>>> Stashed changes

const DashboardContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #F9FAFB;
`;

const Sidebar = styled.aside`
  width: 250px;
  background-color: white;
  padding: 0;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  overflow-y: auto;
  border-right: 1px solid #E5E7EB;
  display: flex;
  flex-direction: column;
`;

const SidebarContent = styled.div`
  flex: 1;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.lg};
  border-bottom: 1px solid #E5E7EB;
`;

const LogoText = styled.span`
  font-size: 1.5rem;
  font-weight: 700;
  color: #000000;
`;

const NavItem = styled.div<{ $active?: boolean }>`
  padding: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  background-color: ${({ theme, $active }) => 
    $active ? theme.colors.primary + '15' : 'transparent'};
  color: ${({ theme, $active }) => 
    $active ? theme.colors.primary : theme.colors.text.primary};

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary + '15'};
  }
`;

const NavIcon = styled.span`
  font-size: 1.25rem;
  display: flex;
  align-items: center;
`;

const NavText = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
  color: inherit;
`;

const UnlockedBadge = styled.span`
  margin-left: ${({ theme }) => theme.spacing.xs};
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.success};
  font-weight: 500;
  background-color: ${({ theme }) => `${theme.colors.success}15`};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  border-radius: ${({ theme }) => theme.borderRadius.md};
`;

const MainContent = styled.main`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.xl};
  padding-top: calc(${({ theme }) => theme.spacing.xl} + 72px);
  margin-left: 250px;
  background-color: #F9FAFB;
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.lg};
`;

<<<<<<< Updated upstream
const DashboardPage: React.FC = () => {
=======
const DashboardPage = () => {
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
=======
      case 'quote-calculator':
        return <QuoteCalculatorTab />;
      case 'team-savings':
        return <CostSavingsTab />;
      case 'saved-blueprints':
        return <RolesBlueprintTab />;
      case 'saved-quotes':
        return <SavedQuotesTab />;
      case 'resource-library':
        return <ResourceLibraryTab />;
      case 'course-dashboard':
        return <CourseDashboardTab />;
      case 'ai-tool-library':
        return <AIToolLibraryTab />;
      case 'saved-tool-stack':
        return <SavedToolStackTab />;
      case 'gamified-tracker':
        return <GamifiedTrackerTab />;
      case 'account-settings':
        return <AccountSettingsTab />;
>>>>>>> Stashed changes
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
            <Logo>
              <LogoText>ScaleMate</LogoText>
            </Logo>
            <Nav>
<<<<<<< Updated upstream
              <NavItem $active={activeSection === 'dashboard'} onClick={() => handleNavClick('dashboard')}>
                <NavIcon><FaHouse /></NavIcon>
                <NavText>My Dashboard</NavText>
              </NavItem>
              <NavItem $active={activeSection === 'role-builder'} onClick={() => handleNavClick('role-builder')}>
                <NavIcon><FaUsersGear /></NavIcon>
                <NavText>Interactive Role Builder</NavText>
              </NavItem>
              <NavItem onClick={() => handleNavClick('quote-calculator')}>
                <NavIcon><FaCalculator /></NavIcon>
                <NavText>Expanded Quote Calculator</NavText>
              </NavItem>
              <NavItem onClick={() => handleNavClick('team-savings')}>
                <NavIcon><FaCoins /></NavIcon>
                <NavText>Detailed Team Savings Tool</NavText>
              </NavItem>
              <NavItem onClick={() => handleNavClick('readiness-score')}>
                <NavIcon><FaChartSimple /></NavIcon>
                <NavText>Readiness Score Page</NavText>
              </NavItem>
              <NavItem onClick={() => handleNavClick('saved-blueprints')}>
                <NavIcon><FaBookmark /></NavIcon>
                <NavText>Saved Role Blueprints</NavText>
              </NavItem>
              <NavItem onClick={() => handleNavClick('saved-quotes')}>
                <NavIcon><FaFileLines /></NavIcon>
                <NavText>Saved Quotes</NavText>
              </NavItem>
              <NavItem onClick={() => handleNavClick('resource-library')}>
=======
              <NavItem $active={activeTab === 'dashboard'} onClick={() => handleTabClick('dashboard')}>
                <NavIcon><FaHouse /></NavIcon>
                <NavText>My Dashboard</NavText>
              </NavItem>
              <NavItem $active={activeTab === 'role-builder'} onClick={() => handleTabClick('role-builder')}>
                <NavIcon><FaUsersGear /></NavIcon>
                <NavText>Interactive Role Builder</NavText>
              </NavItem>
              <NavItem $active={activeTab === 'quote-calculator'} onClick={() => handleTabClick('quote-calculator')}>
                <NavIcon><FaCalculator /></NavIcon>
                <NavText>Expanded Quote Calculator</NavText>
              </NavItem>
              <NavItem $active={activeTab === 'team-savings'} onClick={() => handleTabClick('team-savings')}>
                <NavIcon><FaCoins /></NavIcon>
                <NavText>Detailed Team Savings Tool</NavText>
              </NavItem>
              <NavItem $active={activeTab === 'readiness-score'} onClick={() => handleTabClick('readiness-score')}>
                <NavIcon><FaChartSimple /></NavIcon>
                <NavText>Readiness Score Page</NavText>
              </NavItem>
              <NavItem 
                $active={activeTab === 'saved-blueprints'} 
                onClick={() => handleTabClick('saved-blueprints')}
              >
                <NavIcon><FaBookmark /></NavIcon>
                <NavText>Saved Role Blueprints</NavText>
              </NavItem>
              <NavItem 
                $active={activeTab === 'saved-quotes'} 
                onClick={() => handleTabClick('saved-quotes')}
              >
                <NavIcon><FaFileLines /></NavIcon>
                <NavText>Saved Quotes</NavText>
              </NavItem>
              <NavItem 
                $active={activeTab === 'resource-library'} 
                onClick={() => handleTabClick('resource-library')}
              >
>>>>>>> Stashed changes
                <NavIcon><FaBook /></NavIcon>
                <NavText>Resource Library</NavText>
                <UnlockedBadge>Unlocked</UnlockedBadge>
              </NavItem>
<<<<<<< Updated upstream
              <NavItem onClick={() => handleNavClick('course-dashboard')}>
                <NavIcon><FaGraduationCap /></NavIcon>
                <NavText>Course Dashboard</NavText>
              </NavItem>
              <NavItem onClick={() => handleNavClick('ai-tool-library')}>
                <NavIcon><FaRobot /></NavIcon>
                <NavText>AI Tool Library</NavText>
              </NavItem>
              <NavItem onClick={() => handleNavClick('saved-tool-stack')}>
                <NavIcon><FaLayerGroup /></NavIcon>
                <NavText>Saved Tool Stack</NavText>
              </NavItem>
              <NavItem onClick={() => handleNavClick('gamified-tracker')}>
                <NavIcon><FaTrophy /></NavIcon>
                <NavText>Gamified Tracker</NavText>
              </NavItem>
              <NavItem onClick={() => handleNavClick('account-settings')}>
=======
              <NavItem 
                $active={activeTab === 'course-dashboard'} 
                onClick={() => handleTabClick('course-dashboard')}
              >
                <NavIcon><FaGraduationCap /></NavIcon>
                <NavText>Course Dashboard</NavText>
              </NavItem>
              <NavItem 
                $active={activeTab === 'ai-tool-library'} 
                onClick={() => handleTabClick('ai-tool-library')}
              >
                <NavIcon><FaRobot /></NavIcon>
                <NavText>AI Tool Library</NavText>
              </NavItem>
              <NavItem 
                $active={activeTab === 'saved-tool-stack'} 
                onClick={() => handleTabClick('saved-tool-stack')}
              >
                <NavIcon><FaLayerGroup /></NavIcon>
                <NavText>Saved Tool Stack</NavText>
              </NavItem>
              <NavItem 
                $active={activeTab === 'gamified-tracker'} 
                onClick={() => handleTabClick('gamified-tracker')}
              >
                <NavIcon><FaTrophy /></NavIcon>
                <NavText>Gamified Tracker</NavText>
              </NavItem>
              <NavItem 
                $active={activeTab === 'account-settings'} 
                onClick={() => handleTabClick('account-settings')}
              >
>>>>>>> Stashed changes
                <NavIcon><FaGear /></NavIcon>
                <NavText>Account Settings</NavText>
              </NavItem>
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