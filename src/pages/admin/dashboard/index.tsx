import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import NoNavbarLayout from '@/components/layout/NoNavbarLayout';
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
  color: #111827;
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
  color: #111827;
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

const SuccessMessage = styled.span`
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
  color: #111827;
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
  color: #111827;
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
    color: #111827;
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
    color: #111827;
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

const DashboardPage = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(true);
  const [profilePicture, setProfilePicture] = useState<string | null>(null);

  useEffect(() => {
    const checkUserRole = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          router.push('/login');
          return;
        }

        // Fetch user profile to get profile picture
        const { data: profile, error: profileError } = await supabase
          .from('user_profiles')
          .select('profile_picture')
          .eq('user_id', user.id)
          .single();

        if (profile?.profile_picture) {
          setProfilePicture(profile.profile_picture);
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

        if (!roles || !roles.some(r => r.role === 'admin')) {
          console.error('User does not have admin role:', roles);
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
    if (tab && typeof tab === 'string' && [
      'dashboard',
      'user-management',
      'role-management',
      'admin-management',
      'analytics',
      'system-settings',
      'content-management',
      'resource-library',
      'course-management',
      'ai-tools',
      'tool-stacks',
      'achievements',
      'notifications',
      'help-center',
      'database'
    ].includes(tab)) {
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
    router.push(`/admin/dashboard?tab=${tab}`, undefined, { shallow: true });
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardTab />;
      case 'user-management':
        return <UserManagementTab />;
      case 'role-management':
        return <RolesBlueprintTab />;
      case 'admin-management':
        return <AdminManagementTab />;
      case 'analytics':
        return <QuoteAnalyticsTab />;
      case 'system-settings':
        return <GenericTab title="System Settings" />;
      case 'content-management':
        return <GenericTab title="Content Management" />;
      case 'resource-library':
        return <ResourceManagerTab />;
      case 'course-management':
        return <CourseManagerTab />;
      case 'ai-tools':
        return <GenericTab title="AI Tools Management" />;
      case 'tool-stacks':
        return <GenericTab title="Tool Stacks Management" />;
      case 'achievements':
        return <GenericTab title="Achievements Management" />;
      case 'notifications':
        return <GenericTab title="Notifications Management" />;
      case 'help-center':
        return <GenericTab title="Help Center Management" />;
      case 'database':
        return <GenericTab title="Database Management" />;
      case 'profile':
        return <AdminProfile />;
      default:
        return <DashboardTab />;
    }
  };

  const navItems: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <FaGripVertical /> },
    { id: 'user-management', label: 'User Management', icon: <FaUsers /> },
    { id: 'role-management', label: 'Role Management', icon: <FaUserShield /> },
    { id: 'admin-management', label: 'Admin Management', icon: <FaUserShield /> },
    { id: 'analytics', label: 'Analytics', icon: <FaChartLine /> },
    { id: 'system-settings', label: 'System Settings', icon: <FaGear /> },
    { id: 'content-management', label: 'Content Management', icon: <FaFile /> },
    { id: 'resource-library', label: 'Resource Library', icon: <FaBook /> },
    { id: 'course-management', label: 'Course Management', icon: <FaGraduationCap /> },
    { id: 'ai-tools', label: 'AI Tools', icon: <FaRobot /> },
    { id: 'tool-stacks', label: 'Tool Stacks', icon: <FaLayerGroup /> },
    { id: 'achievements', label: 'Achievements', icon: <FaTrophy /> },
    { id: 'notifications', label: 'Notifications', icon: <FaBell /> },
    { id: 'help-center', label: 'Help Center', icon: <FaCircleQuestion /> },
    { id: 'database', label: 'Database', icon: <FaDatabase /> }
  ];

  const getTabTitle = (tab: string) => {
    const tabItem = navItems.find(item => item.id === tab);
    return tabItem ? tabItem.label : 'Dashboard';
  };

  return (
    <NoNavbarLayout>
      <DashboardContainer>
        <DashboardSidebar
          logoText="ScaleMate Admin"
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

export default DashboardPage; 