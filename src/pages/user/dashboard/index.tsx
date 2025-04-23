import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import NoNavbarLayout from '@/components/layout/NoNavbarLayout';
import DashboardTab from '@/components/user/DashboardTab';
import RoleBuilderTab from '@/components/user/RoleBuilderTab';
import QuoteCalculatorTab from '@/components/user/QuoteCalculatorTab';
import DashboardHeader from '@/components/layout/DashboardHeader';
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
import CostSavingsTab from '@/components/user/CostSavingsTab';
import RolesBlueprintTab from '@/components/user/RolesBlueprintTab';
import SavedQuotesTab from '@/components/user/SavedQuotesTab';
import ResourceLibraryTab from '@/components/user/ResourceLibraryTab';
import CourseDashboardTab from '@/components/user/CourseDashboardTab';
import AIToolLibraryTab from '@/components/user/AIToolLibraryTab';
import SavedToolStackTab from '@/components/user/SavedToolStackTab';
import GamifiedTrackerTab from '@/components/user/GamifiedTrackerTab';

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

const DashboardPage = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(true);
  const [profilePicture, setProfilePicture] = useState('https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg');

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

  useEffect(() => {
    const { tab } = router.query;
    if (tab && typeof tab === 'string' && ['dashboard', 'role-builder', 'readiness-quiz', 'quote-builder', 'course-library', 'quote-calculator'].includes(tab)) {
      setActiveTab(tab);
    }
  }, [router.query]);

  if (isLoading) {
    return null; // Or a loading spinner
  }

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    router.push(`/user/dashboard?tab=${tab}`, undefined, { shallow: true });
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'role-builder':
        return <RoleBuilderTab />;
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
              <NavLink $active={activeTab === 'quote-calculator'} onClick={() => handleTabClick('quote-calculator')}>
                <NavIcon><FaCalculator /></NavIcon>
                <NavText>Expanded Quote Calculator</NavText>
              </NavLink>
              <NavLink $active={activeTab === 'team-savings'} onClick={() => handleTabClick('team-savings')}>
                <NavIcon><FaCoins /></NavIcon>
                <NavText>Detailed Team Savings Tool</NavText>
              </NavLink>
              <NavLink onClick={() => handleTabClick('readiness-score')}>
                <NavIcon><FaChartSimple /></NavIcon>
                <NavText>Readiness Score Page</NavText>
              </NavLink>
              <NavLink 
                $active={activeTab === 'saved-blueprints'} 
                onClick={() => handleTabClick('saved-blueprints')}
              >
                <NavIcon><FaBookmark /></NavIcon>
                <NavText>Saved Role Blueprints</NavText>
              </NavLink>
              <NavLink 
                $active={activeTab === 'saved-quotes'} 
                onClick={() => handleTabClick('saved-quotes')}
              >
                <NavIcon><FaFileLines /></NavIcon>
                <NavText>Saved Quotes</NavText>
              </NavLink>
              <NavLink 
                $active={activeTab === 'resource-library'} 
                onClick={() => handleTabClick('resource-library')}
              >
                <NavIcon><FaBook /></NavIcon>
                <NavText>Resource Library</NavText>
                <UnlockedBadge>Unlocked</UnlockedBadge>
              </NavLink>
              <NavLink 
                $active={activeTab === 'course-dashboard'} 
                onClick={() => handleTabClick('course-dashboard')}
              >
                <NavIcon><FaGraduationCap /></NavIcon>
                <NavText>Course Dashboard</NavText>
              </NavLink>
              <NavLink 
                $active={activeTab === 'ai-tool-library'} 
                onClick={() => handleTabClick('ai-tool-library')}
              >
                <NavIcon><FaRobot /></NavIcon>
                <NavText>AI Tool Library</NavText>
              </NavLink>
              <NavLink 
                $active={activeTab === 'saved-tool-stack'} 
                onClick={() => handleTabClick('saved-tool-stack')}
              >
                <NavIcon><FaLayerGroup /></NavIcon>
                <NavText>Saved Tool Stack</NavText>
              </NavLink>
              <NavLink 
                $active={activeTab === 'gamified-tracker'} 
                onClick={() => handleTabClick('gamified-tracker')}
              >
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
          <DashboardHeader
            title={activeTab === 'profile' ? 'Profile' : 'Dashboard'}
            profilePicture={profilePicture}
            onLogout={handleLogout}
            onProfileClick={() => setActiveTab('profile')}
            showProfile={activeTab === 'profile'}
          />
          {renderContent()}
        </MainContent>
      </DashboardContainer>
    </NoNavbarLayout>
  );
};

export default DashboardPage; 