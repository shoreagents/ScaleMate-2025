import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import NoNavbarLayout from '@/components/layout/NoNavbarLayout';
import DashboardTab from '@/components/user/DashboardTab';
import RoleBuilderTab from '@/components/user/RoleBuilderTab';
import QuoteCalculatorTab from '@/components/user/QuoteCalculatorTab';
import DashboardHeader from '@/components/layout/DashboardHeader';
import DashboardSidebar, { NavItem } from '@/components/layout/DashboardSidebar';
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
  FaGear,
  FaGripVertical
} from 'react-icons/fa6';
import CostSavingsTab from '@/components/user/CostSavingsTab';
import RolesBlueprintTab from '@/components/user/RolesBlueprintTab';
import SavedQuotesTab from '@/components/user/SavedQuotesTab';
import ResourceLibraryTab from '@/components/user/ResourceLibraryTab';
import CourseDashboardTab from '@/components/user/CourseDashboardTab';
import AIToolLibraryTab from '@/components/user/AIToolLibraryTab';
import SavedToolStackTab from '@/components/user/SavedToolStackTab';
import GamifiedTrackerTab from '@/components/user/GamifiedTrackerTab';
import UserProfile from '@/components/user/UserProfile';
import { withRoleProtection } from '@/components/auth/withRoleProtection';
import { useAuth } from '@/contexts/AuthContext';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

const DashboardContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: white;
`;

const MainContent = styled.main`
  flex: 1;
  margin-left: 16rem;
  padding: 2rem;
  padding-top: 5rem;
  background-color: #F9FAFB;
  min-height: 100vh;
`;

interface UserProfileData {
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  gender: string;
  profile_picture: string | null;
  last_password_change: string | null;
  username: string;
  created_at: string;
  updated_at: string;
}

interface DashboardUserData {
  name: string;
  email: string;
  avatar?: string;
}

const DashboardPage = () => {
  const router = useRouter();
  const { user, setUser } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [userData, setUserData] = useState<UserProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAuthCallback, setShowAuthCallback] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error('Session error:', sessionError);
          router.push('/login');
          return;
        }

        if (!session) {
          router.push('/login');
          return;
        }

        const { data: { user }, error: userError } = await supabase.auth.getUser();
        
        if (userError) {
          console.error('User error:', userError);
          router.push('/login');
          return;
        }

        if (!user) {
          router.push('/login');
          return;
        }

        // Get user's profile data
        const { data: profile, error: profileError } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (profileError) {
          console.error('Profile error:', profileError);
          router.push('/login');
          return;
        }

        // Check if user needs setup
        const needsSetup = !profile?.username;
        
        if (needsSetup) {
          router.push('/auth/setup');
        } else {
          setUser(user);
        }

        setLoading(false);
      } catch (err) {
        console.error('Auth check error:', err);
        router.push('/login');
      }
    };

    checkAuth();
  }, [router, setUser]);

  useEffect(() => {
    const { tab } = router.query;
    if (tab && typeof tab === 'string' && ['dashboard', 'role-builder', 'readiness-quiz', 'quote-builder', 'course-library', 'quote-calculator'].includes(tab)) {
      setActiveTab(tab);
    }
  }, [router.query]);

  const handleProfilePictureChange = (newPictureUrl: string) => {
    setProfilePicture(newPictureUrl);
    setUserData(prev => prev ? {
      ...prev,
      profile_picture: newPictureUrl,
      updated_at: new Date().toISOString()
    } : null);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const getTabTitle = (tab: string) => {
    const tabItem = navItems.find(item => item.id === tab);
    return tabItem ? tabItem.label : 'Dashboard';
  };

  const transformUserData = (data: UserProfileData | null): DashboardUserData | undefined => {
    if (!data) return undefined;
    return {
      name: `${data.first_name} ${data.last_name}`,
      email: data.email,
      avatar: data.profile_picture || undefined
    };
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <UserProfile onProfilePictureChange={handleProfilePictureChange} />;
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
        return <DashboardTab user={transformUserData(userData)} />;
    }
  };

  const navItems: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <FaGripVertical /> },
    { id: 'role-builder', label: 'Role Builder', icon: <FaUsersGear /> },
    { id: 'quote-calculator', label: 'Quote Calculator', icon: <FaCalculator /> },
    { id: 'team-savings', label: 'Team Savings', icon: <FaCoins /> },
    { id: 'readiness-score', label: 'Readiness Score', icon: <FaChartSimple /> },
    { id: 'saved-blueprints', label: 'Role Blueprints', icon: <FaBookmark /> },
    { id: 'saved-quotes', label: 'Saved Quotes', icon: <FaFileLines /> },
    { id: 'resource-library', label: 'Resource Library', icon: <FaBook />, isUnlocked: true },
    { id: 'course-dashboard', label: 'Course Manager', icon: <FaGraduationCap /> },
    { id: 'ai-tool-library', label: 'AI Tool Library', icon: <FaRobot /> },
    { id: 'saved-tool-stack', label: 'Tool Stack', icon: <FaLayerGroup /> },
    { id: 'gamified-tracker', label: 'Gamified Tracker', icon: <FaTrophy /> },
    { id: 'account-settings', label: 'System Settings', icon: <FaGear /> }
  ];

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <NoNavbarLayout>
      <DashboardContainer>
        <DashboardSidebar
          logoText="ScaleMate"
          navItems={navItems}
          activeTab={activeTab}
          onTabClick={handleTabClick}
        />
        <MainContent>
          <DashboardHeader
            title={getTabTitle(activeTab)}
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

export default withRoleProtection(DashboardPage, 'user'); 