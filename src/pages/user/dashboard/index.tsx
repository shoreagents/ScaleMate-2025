import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { createClient } from '@supabase/supabase-js';
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
import FirstTimeSetupForm from '@/components/forms/FirstTimeSetupForm';
import { FiCheck } from 'react-icons/fi';
import { useDownloadModal } from '@/hooks/useDownloadModal';
import DashboardSidebar, { NavItem } from '@/components/layout/DashboardSidebar';
import DashboardHeader from '@/components/layout/DashboardHeader';
import DashboardTab from '@/components/user/DashboardTab';
import RoleBuilderTab from '@/components/user/RoleBuilderTab';
import QuoteCalculatorTab from '@/components/user/QuoteCalculatorTab';
import WithRoleProtection from '@/components/auth/withRoleProtection';

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

  @media (max-width: 768px) {
    margin-left: 0;
    padding: 1rem;
    padding-top: 4rem;
  }
`;

const ErrorMessage = styled.div`
  color: #dc2626;
  text-align: center;
  max-width: 400px;
  padding: 1rem;
  background: #fee2e2;
  border-radius: 0.5rem;
  border: 1px solid #fecaca;
`;

interface UserProfileData {
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  gender: string;
  profile_picture_url: string | null;
  last_password_change: string | null;
  username: string;
  created_at: string;
  updated_at: string;
}

interface DashboardData {
  profile: {
    name: string;
    email: string;
    created_at: string;
  };
  progress: {
    completed_tools: number;
    total_tools: number;
    xp_points: number;
  };
  recent_activity: Array<{
    id: string;
    type: string;
    description: string;
    created_at: string;
  }>;
}

const DashboardPage = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [userData, setUserData] = useState<any>(null);
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [showSetupForm, setShowSetupForm] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Initial data fetch - runs immediately without waiting for user
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          const { data: profile, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();

          if (error) {
            setError(error.message);
            return;
          }

          if (profile) {
            setUserData(profile);
            if (!profile.username) {
              setShowSetupForm(true);
            }
          }
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      }
    };

    fetchInitialData();
  }, []);

  // Real-time updates for profile
  useEffect(() => {
    if (!userData?.id) return;

    const profileSubscription = supabase
      .channel('profile-changes')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'profiles',
          filter: `id=eq.${userData.id}`
        },
        async (payload) => {
          const { data: { session } } = await supabase.auth.getSession();
          if (session) {
            const { data: profile, error } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .single();

            if (error) return;

            if (profile) {
              setUserData(profile);
            }
          }
        }
      )
      .subscribe();

    return () => {
      profileSubscription.unsubscribe();
    };
  }, [userData?.id]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const handleModalStateChange = (isOpen: boolean) => {
    setIsModalOpen(isOpen);
  };

  const handleSetupComplete = () => {
    setShowSetupForm(false);
  };

  const navItems: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <FaGripVertical /> },
    { id: 'role-builder', label: 'Role Builder', icon: <FaUsersGear /> },
    { id: 'quote-calculator', label: 'Quote Calculator', icon: <FaCalculator /> },
    { id: 'cost-savings', label: 'Cost Savings', icon: <FaCoins /> },
    { id: 'roles-blueprint', label: 'Roles Blueprint', icon: <FaChartSimple /> },
    { id: 'saved-quotes', label: 'Saved Quotes', icon: <FaBookmark /> },
    { id: 'resource-library', label: 'Resource Library', icon: <FaFileLines /> },
    { id: 'courses', label: 'Courses', icon: <FaGraduationCap /> },
    { id: 'ai-tool-library', label: 'AI Tool Library', icon: <FaRobot /> },
    { id: 'saved-tool-stack', label: 'Saved Tool Stack', icon: <FaLayerGroup /> },
    { id: 'gamified-tracker', label: 'Gamified Tracker', icon: <FaTrophy /> },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <UserProfile />;
      case 'dashboard':
        return <DashboardTab user={userData} activeTab={activeTab} />;
      case 'role-builder':
        return <RoleBuilderTab />;
      case 'quote-calculator':
        return <QuoteCalculatorTab />;
      case 'cost-savings':
        return <CostSavingsTab />;
      case 'roles-blueprint':
        return <RolesBlueprintTab />;
      case 'saved-quotes':
        return <SavedQuotesTab />;
      case 'resource-library':
        return <ResourceLibraryTab />;
      case 'courses':
        return <CourseDashboardTab />;
      case 'ai-tool-library':
        return <AIToolLibraryTab />;
      case 'saved-tool-stack':
        return <SavedToolStackTab />;
      case 'gamified-tracker':
        return <GamifiedTrackerTab />;
      default:
        return <DashboardTab user={userData} activeTab={activeTab} />;
    }
  };

  return (
    <DashboardContainer>
      <DashboardSidebar
        logoText="ScaleMate"
        navItems={navItems}
        activeTab={activeTab}
        onTabClick={handleTabClick}
        isModalOpen={showSetupForm || isModalOpen}
      />
      <MainContent>
        <DashboardHeader
          title={activeTab === 'dashboard' ? 'Dashboard' : 
                 activeTab === 'role-builder' ? 'Role Builder' :
                 activeTab === 'quote-calculator' ? 'Quote Calculator' :
                 activeTab === 'cost-savings' ? 'Cost Savings' :
                 activeTab === 'roles-blueprint' ? 'Roles Blueprint' :
                 activeTab === 'saved-quotes' ? 'Saved Quotes' :
                 activeTab === 'resource-library' ? 'Resource Library' :
                 activeTab === 'courses' ? 'Courses' :
                 activeTab === 'ai-tool-library' ? 'AI Tool Library' :
                 activeTab === 'saved-tool-stack' ? 'Saved Tool Stack' :
                 activeTab === 'gamified-tracker' ? 'Gamified Tracker' : 'Dashboard'}
          onLogout={handleLogout}
          onProfileClick={() => setActiveTab('profile')}
          showProfile={activeTab === 'profile'}
        />
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {renderContent()}
      </MainContent>

      {showSetupForm && userData && (
        <FirstTimeSetupForm
          isOpen={showSetupForm}
          onClose={() => setShowSetupForm(false)}
          userId={userData.id}
          currentUsername={userData.username || ''}
          onSetupComplete={handleSetupComplete}
        />
      )}
    </DashboardContainer>
  );
};

const ProtectedDashboard = () => (
  <WithRoleProtection allowedRoles={['user']}>
    <DashboardPage />
  </WithRoleProtection>
);

export default ProtectedDashboard; 