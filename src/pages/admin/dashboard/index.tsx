import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import DashboardHeader from '@/components/layout/DashboardHeader';
import DashboardSidebar, { NavItem } from '@/components/layout/DashboardSidebar';
import { supabase } from '@/lib/supabase';
import { 
  FaGripVertical,
  FaUsers, 
  FaUserShield,
  FaChartLine,
  FaGear,
  FaFile, 
  FaBook,
  FaGraduationCap,
  FaRobot,
  FaLayerGroup,
  FaTrophy,
  FaBell,
  FaCircleQuestion, 
  FaDatabase,
  FaHouse,
  FaChartPie,
  FaFileLines,
  FaBookOpen,
  FaBoxArchive,
  FaPen,
  FaMicrochip,
  FaCircleCheck,
  FaStar,
  FaRotate,
  FaXmark,
  FaGrip,
  FaUserPlus,
  FaChartBar,
  FaBriefcase
} from 'react-icons/fa6';
import DashboardTab from '@/components/admin/DashboardTab';
import UserManagementTab from '@/components/admin/UserManagementTab';
import AdminManagementTab from '@/components/admin/AdminManagementTab';
import GenericTab from '@/components/admin/GenericTab';
import Link from 'next/link';
import AdminProfile from '@/components/admin/AdminProfile';
import LeadManagementTab from '@/components/admin/LeadManagementTab';
import QuoteAnalyticsTab from '@/components/admin/QuoteAnalyticsTab';
import RolesBlueprintTab from '@/components/admin/RolesBlueprintTab';
import CourseManagerTab from '@/components/admin/CourseManagerTab';
import ResourceManagerTab from '@/components/admin/ResourceManagerTab';
import BlogTab from '@/components/admin/BlogTab';
import AIToolsTab from '@/components/admin/AIToolsTab';
import QuizManagerTab from '@/components/admin/QuizManagerTab';
import ContentBlocksTab from '@/components/admin/ContentBlocksTab';
import SystemSettingsTab from '@/components/admin/SystemSettingsTab';
import FirstTimeSetupForm from '@/components/forms/FirstTimeSetupForm';
import { FiCheck } from 'react-icons/fi';
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

const Sidebar = styled.aside`
  width: 16rem;
  background-color: white;
  border-right: 1px solid #E5E7EB;
  position: fixed;
  height: 100vh;
  z-index: 20;
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

const Header = styled.header`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const Description = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  width: 100%;
`;

const Card = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid #E5E7EB;
  width: 100%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const CardTitle = styled.h2`
  font-size: 1.125rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text.primary};
  margin-bottom: 1rem;
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const MetricValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: ${props => props.theme.colors.text.primary};
`;

const MetricLabel = styled.div`
  font-size: 0.875rem;
  color: #6B7280;
  margin-bottom: 8px;
`;

const MetricTrend = styled.div<{ $isPositive?: boolean }>`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.875rem;
  color: ${props => props.$isPositive ? '#10B981' : '#EF4444'};
  font-weight: 500;
`;

const MetricCard = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;
`;

const UserList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const UserItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.sm};
  background-color: ${({ theme }) => theme.colors.background.primary};
  border-radius: 0.5rem;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserEmail = styled.span`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const UserRole = styled.span`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const StatusIndicator = styled.div<{ $status: 'up' | 'down' }>`
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 50%;
  background-color: ${({ theme, $status }) => 
    $status === 'up' ? theme.colors.success : theme.colors.error};
`;

const ServiceStatus = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.sm};
  background-color: ${({ theme }) => theme.colors.background.primary};
  border-radius: 0.5rem;
`;

const ServiceName = styled.span`
  font-weight: 500;
`;

const LastChecked = styled.span`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const LogoutButton = styled.button`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.error};
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.error};
    opacity: 0.9;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const AdminForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const FormLabel = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const FormInput = styled.input`
  padding: ${({ theme }) => theme.spacing.sm};
  border: 1.5px solid ${({ theme }) => theme.colors.border};
  border-radius: 0.5rem;
  font-size: 0.875rem;
  background: ${({ theme }) => theme.colors.background.primary};
  color: ${({ theme }) => theme.colors.text.primary};
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}15;
  }
`;

const SubmitButton = styled.button`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: ${({ theme }) => theme.spacing.sm};

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    background: ${({ theme }) => theme.colors.disabled};
    cursor: not-allowed;
    transform: none;
  }
`;

const ErrorMessage = styled.span`
  color: ${({ theme }) => theme.colors.error};
  font-size: 0.875rem;
`;

const FormSuccessMessage = styled.span`
  color: ${({ theme }) => theme.colors.success};
  font-size: 0.875rem;
`;

const PasswordStrength = styled.div`
  margin-top: ${({ theme }) => theme.spacing.xs};
`;

const StrengthIndicator = styled.div<{ $strength: number }>`
  height: 4px;
  background: ${({ theme, $strength }) => {
    if ($strength === 0) return theme.colors.error;
    if ($strength === 1) return theme.colors.error;
    if ($strength === 2) return '#FFA500';
    if ($strength === 3) return theme.colors.success;
    return theme.colors.success;
  }};
  width: ${({ $strength }) => ($strength * 25)}%;
  border-radius: 2px;
  transition: all 0.3s ease;
`;

const StrengthLabel = styled.span<{ $strength: number }>`
  font-size: 0.75rem;
  color: ${({ theme, $strength }) => {
    if ($strength === 0) return theme.colors.error;
    if ($strength === 1) return theme.colors.error;
    if ($strength === 2) return '#FFA500';
    if ($strength === 3) return theme.colors.success;
    return theme.colors.success;
  }};
  margin-top: ${({ theme }) => theme.spacing.xs};
  display: block;
`;

const RequirementsList = styled.ul`
  margin-top: ${({ theme }) => theme.spacing.sm};
  padding-left: 0;
  list-style: none;
`;

const RequirementItem = styled.li<{ $met: boolean }>`
  font-size: 0.75rem;
  color: ${({ theme, $met }) => $met ? theme.colors.success : theme.colors.text.secondary};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  margin-bottom: ${({ theme }) => theme.spacing.xs};

  &::before {
    content: '${({ $met }) => $met ? '✓' : '✗'}';
    color: ${({ theme, $met }) => $met ? theme.colors.success : theme.colors.error};
  }
`;

const TabContent = styled.div<{ $active: boolean }>`
  display: ${props => props.$active ? 'block' : 'none'};
`;

const ActionButton = styled.button`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 0.875rem;
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.9;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.sm};
`;

const LogoIcon = styled.span`
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.primary};
`;

const MetricIcon = styled.div<{ $color: string }>`
  font-size: 1.5rem;
  color: ${props => props.$color};
  margin-bottom: 16px;
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: ${props => `${props.$color}1A`};
`;

const ActivityItem = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px 0;
  border-bottom: 1px solid #E5E7EB;

  &:last-child {
    border-bottom: none;
  }
`;

const ActivityIcon = styled.div<{ $color: string }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.$color};
  background-color: ${props => `${props.$color}1A`};
  font-size: 1.25rem;
`;

const ActivityContent = styled.div`
  flex: 1;
`;

const ActivityTitle = styled.div`
  font-weight: 500;
  color: ${props => props.theme.colors.text.primary};
`;

const ActivityTime = styled.div`
  font-size: 0.875rem;
  color: #6B7280;
`;

const QuickAction = styled.button`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background-color: #F9FAFB;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  width: 100%;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #F3F4F6;
  }
`;

const ActionIcon = styled.div`
  color: #6B7280;
`;

const ActionText = styled.div`
  font-weight: 500;
  color: ${props => props.theme.colors.text.primary};
  text-align: left;
`;

const SystemStatusCard = styled(Card)`
  .status-row {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 0;
    border-bottom: 1px solid #E5E7EB;

    &:last-child {
      border-bottom: none;
      padding-bottom: 0;
    }
  }
`;

const StatusDot = styled.div<{ $status: 'up' | 'down' | 'warning' }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${props => {
    switch (props.$status) {
      case 'up': return '#00E915';
      case 'warning': return '#FFA500';
      case 'down': return '#EF4444';
      default: return '#6B7280';
    }
  }};
`;

const StatusText = styled.div<{ $status: 'up' | 'down' | 'warning' }>`
  font-size: 0.875rem;
  color: ${props => {
    switch (props.$status) {
      case 'up': return '#00E915';
      case 'warning': return '#FFA500';
      case 'down': return '#EF4444';
      default: return '#6B7280';
    }
  }};
`;

const IconButton = styled.button`
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  color: #6B7280;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background-color: #F3F4F6;
    color: ${props => props.theme.colors.text.primary};
  }
`;

const NotificationBadge = styled.div`
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 8px;
    height: 8px;
    background-color: #EF4444;
    border-radius: 50%;
    border: 2px solid white;
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
  margin-top: 8px;
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

const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  cursor: pointer;
  color: #6B7280;
  padding: 8px;
  
  &:hover {
    color: ${props => props.theme.colors.text.primary};
  }
`;

const ProfileIcon = styled.div<{ $imageUrl?: string | null }>`
  width: 32px;
  height: 32px;
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

interface AdminDashboardData {
  users: Array<{
    id: string;
    email: string;
    role: string;
    created_at: string;
    last_sign_in: string;
  }>;
  analytics: {
    total_users: number;
    active_users: number;
    total_leads: number;
    qualified_leads: number;
  };
  recent_leads: Array<{
    id: string;
    user_id: string;
    score: number;
    status: string;
    created_at: string;
  }>;
}

async function fetchAdminDashboardData(): Promise<AdminDashboardData> {
  const { data: users } = await supabase
    .from('users')
    .select('*')
    .order('created_at', { ascending: false });

  const { data: analytics } = await supabase
    .from('analytics')
    .select('*')
    .single();

  const { data: recent_leads } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(5);

  return {
    users: users || [],
    analytics: analytics || {
      total_users: 0,
      active_users: 0,
      total_leads: 0,
      qualified_leads: 0,
    },
    recent_leads: recent_leads || [],
  };
}

const DashboardPage = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [userData, setUserData] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSetupForm, setShowSetupForm] = useState(false);
  const [dashboardData, setDashboardData] = useState<AdminDashboardData | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Initial data fetch
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAdminDashboardData();
        setDashboardData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      }
    };

    fetchData();
  }, []);

  // Real-time updates for dashboard data
  useEffect(() => {
    if (!dashboardData) return;

    // Set up real-time subscriptions for different tables
    const usersSubscription = supabase
      .channel('users-changes')
      .on(
        'postgres_changes',
        {
          event: '*', // Listen to all events (INSERT, UPDATE, DELETE)
          schema: 'public',
          table: 'users'
        },
        async () => {
          // Refetch users data when changes occur
          const { data: users } = await supabase
            .from('users')
            .select('*')
            .order('created_at', { ascending: false });

          if (users && dashboardData) {
            setDashboardData({
              ...dashboardData,
              users: users
            });
          }
        }
      )
      .subscribe();

    const analyticsSubscription = supabase
      .channel('analytics-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'analytics'
        },
        async () => {
          // Refetch analytics data when changes occur
          const { data: analytics } = await supabase
            .from('analytics')
            .select('*')
            .single();

          if (analytics && dashboardData) {
            setDashboardData({
              ...dashboardData,
              analytics: analytics
            });
          }
        }
      )
      .subscribe();

    const leadsSubscription = supabase
      .channel('leads-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'leads'
        },
        async () => {
          // Refetch recent leads when changes occur
          const { data: recent_leads } = await supabase
            .from('leads')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(5);

          if (recent_leads && dashboardData) {
            setDashboardData({
              ...dashboardData,
              recent_leads: recent_leads
            });
          }
        }
      )
      .subscribe();

    // Cleanup subscriptions
    return () => {
      usersSubscription.unsubscribe();
      analyticsSubscription.unsubscribe();
      leadsSubscription.unsubscribe();
    };
  }, [dashboardData]);

  // Profile data fetch and real-time updates
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          const { data: userProfile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();

          if (userProfile) {
            setUserData(userProfile);
            if (!userProfile.username) {
              setShowSetupForm(true);
            }
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();

    // Set up real-time subscription for profile updates
    const profileSubscription = supabase
      .channel('profile-changes')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'profiles',
          filter: `id=eq.${userData?.id}`
        },
        async () => {
          // Refetch profile data when changes occur
          const { data: { session } } = await supabase.auth.getSession();
          if (session) {
            const { data: userProfile } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .single();

            if (userProfile) {
              setUserData(userProfile);
            }
          }
        }
      )
      .subscribe();

    return () => {
      profileSubscription.unsubscribe();
    };
  }, [userData?.id]);

  const handleProfilePictureChange = (newPictureUrl: string) => {
    // This function is no longer needed since DashboardHeader handles profile picture internally
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

  const handleModalStateChange = (isOpen: boolean) => {
    if (activeTab === 'admin-management') {
      setIsModalOpen(isOpen);
    }
  };

  const handleSetupComplete = () => {
    setShowSetupForm(false);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <AdminProfile onProfilePictureChange={handleProfilePictureChange} onModalStateChange={handleModalStateChange} />;
      case 'dashboard':
        return <DashboardTab />;
      case 'lead-management':
        return <LeadManagementTab />;
      case 'user-management':
        return <UserManagementTab />;
      case 'role-management':
        return <RolesBlueprintTab />;
      case 'admin-management':
        return <AdminManagementTab onModalStateChange={handleModalStateChange} />;
      case 'analytics':
        return <QuoteAnalyticsTab />;
      case 'system-settings':
        return <SystemSettingsTab />;
      case 'content-management':
        return <BlogTab />;
      case 'resource-library':
        return <ResourceManagerTab />;
      case 'course-management':
        return <CourseManagerTab />;
      case 'ai-tools':
        return <AIToolsTab />;
      case 'quiz-management':
        return <QuizManagerTab />;
      case 'content-blocks':
        return <ContentBlocksTab />;
      default:
        return <DashboardTab />;
    }
  };

  const navItems: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <FaGripVertical /> },
    { id: 'lead-management', label: 'Lead Management', icon: <FaUserPlus /> },
    { id: 'user-management', label: 'User Management', icon: <FaUsers /> },
    { id: 'analytics', label: 'Quote Analytics', icon: <FaChartLine /> },
    { id: 'role-management', label: 'Role Blueprints', icon: <FaUserShield /> },
    { id: 'course-management', label: 'Course Manager', icon: <FaGraduationCap /> },
    { id: 'resource-library', label: 'Resource Library', icon: <FaBook /> },
    { id: 'content-management', label: 'Blog Management', icon: <FaFile /> },
    { id: 'ai-tools', label: 'AI Tool Library', icon: <FaRobot /> },
    { id: 'quiz-management', label: 'Quiz Management', icon: <FaCircleQuestion /> },
    { id: 'content-blocks', label: 'Content Blocks', icon: <FaFileLines /> },
    { id: 'admin-management', label: 'Admin Management', icon: <FaUserShield /> },
  ];

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">Error loading dashboard data</div>
      </div>
    );
  }

  return (
    <WithRoleProtection allowedRoles={['admin']}>
      <DashboardContainer>
        <DashboardSidebar
          logoText="ScaleMate"
          navItems={navItems}
          activeTab={activeTab}
          onTabClick={handleTabClick}
          isModalOpen={showSetupForm || (activeTab === 'admin-management' && isModalOpen)}
        />
        <MainContent>
          <DashboardHeader
            title={getTabTitle(activeTab)}
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
    </WithRoleProtection>
  );
};

export default DashboardPage; 