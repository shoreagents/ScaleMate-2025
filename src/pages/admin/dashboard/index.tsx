import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';
import DashboardTab from '@/components/admin/DashboardTab';
import UserManagementTab from '@/components/admin/UserManagementTab';
import AdminManagementTab from '@/components/admin/AdminManagementTab';
import GenericTab from '@/components/admin/GenericTab';
import { 
  FiHome, 
  FiUsers, 
  FiPieChart, 
  FiFileText, 
  FiBook, 
  FiFolder, 
  FiFile, 
  FiTool, 
  FiHelpCircle, 
  FiGrid, 
  FiSettings,
  FiUserPlus,
  FiTrendingUp,
  FiBriefcase,
  FiBookOpen,
  FiArchive,
  FiEdit,
  FiCpu,
  FiCheckCircle,
  FiLayers,
  FiServer,
  FiBarChart2,
  FiActivity,
  FiAward,
  FiStar,
  FiBell,
  FiUser,
  FiRefreshCw,
  FiLogOut
} from 'react-icons/fi';
import AdminManagement from '@/components/admin/AdminManagementTab';

// Initialize Supabase client properly
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

const DashboardContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: white;
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
  gap: ${({ theme }) => theme.spacing.lg};
  width: 100%;
`;

const Card = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 10px 24px 24px 24px ;
  border: 1px solid #E5E7EB;
  width: 100%;
`;

const CardTitle = styled.h2`
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 16px;
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
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

const Sidebar = styled.div`
  width: 250px;
  background-color: white;
  padding: ${({ theme }) => theme.spacing.lg};
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

const SidebarFooter = styled.div`
  margin-top: auto;
  padding-top: ${({ theme }) => theme.spacing.lg};
`;

const MainContent = styled.div`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.xl};
  padding-top: calc(${({ theme }) => theme.spacing.xl} + 72px);
  margin-left: 250px;
  background-color: #F9FAFB;
`;

const ContentHeader = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 250px;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  padding: ${({ theme }) => theme.spacing.lg};
  background-color: white;
  border-bottom: 1px solid #E5E7EB;
  z-index: 100;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ContentTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
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

const NavTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.text.primary};
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

const LogoText = styled.span`
  font-size: 1.5rem;
  font-weight: 700;
  color: #000000;
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

const ProfileDropdown = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 8px;
  background-color: white;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  display: ${props => props.$isOpen ? 'block' : 'none'};
  min-width: 200px;
  z-index: 1000;
`;

const DropdownItem = styled.div`
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  color: #374151;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #F3F4F6;
    color: #111827;
  }

  &:first-child {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }

  &:last-child {
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
  }
`;

const ProfileContainer = styled.div`
  position: relative;
`;

const AdminDashboard: React.FC = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [user, setUser] = useState<any>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [hasAdminPermissions, setHasAdminPermissions] = useState<boolean>(false);
  const [debugInfo, setDebugInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [databaseStatus, setDatabaseStatus] = useState<'up' | 'down' | 'warning'>('down');
  const [lastChecked, setLastChecked] = useState<Date>(new Date());
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      router.push('/admin');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  useEffect(() => {
    const checkPermissions = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          router.push('/admin');
          return;
        }
        setUser(user);

        // Get user's role and permissions
        const { data: roleData, error: roleError } = await supabase
          .from('user_roles')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (roleError) {
          console.error('Error fetching user role:', roleError);
          setDebugInfo({
            error: roleError,
            userId: user.id,
            email: user.email
          });
          return;
        }

        setUserRole(roleData?.role || 'user');
        setHasAdminPermissions(roleData?.role === 'admin' && roleData?.permissions?.includes('*'));
        setDebugInfo({
          userId: user.id,
          email: user.email,
          role: roleData?.role,
          permissions: roleData?.permissions
        });
      } catch (error) {
        console.error('Error checking permissions:', error);
        setDebugInfo({ error });
      } finally {
        setLoading(false);
      }
    };

    checkPermissions();
  }, [router]);

  // Improved database connection check with simpler query
  useEffect(() => {
    const checkDatabaseConnection = async () => {
      try {
        // First verify Supabase configuration
        if (!supabaseUrl || !supabaseKey) {
          console.error('Supabase configuration missing');
          setDatabaseStatus('down');
          setConnectionError('Supabase configuration missing');
          return;
        }

        // Use a simple health check query that doesn't involve policies
        const { data, error } = await supabase
          .from('user_roles')
          .select('count')
          .single();

        if (error) {
          console.error('Database connection error:', error.message);
          // Check specifically for recursion error
          if (error.message.includes('infinite recursion')) {
            setDatabaseStatus('warning');
            setConnectionError('Policy configuration issue - contact administrator');
          } else {
            setDatabaseStatus('down');
            setConnectionError(error.message);
          }
        } else {
          console.log('Database connection successful');
          setDatabaseStatus('up');
          setConnectionError(null);
        }
      } catch (error) {
        console.error('Database connection error:', error);
        setDatabaseStatus('down');
        setConnectionError(error instanceof Error ? error.message : 'Unknown error');
      }
      setLastChecked(new Date());
    };

    // Check immediately
    checkDatabaseConnection();

    // Check every 15 seconds
    const interval = setInterval(checkDatabaseConnection, 15000);

    return () => clearInterval(interval);
  }, []);

  // Make checkDatabaseConnection available to the component
  const handleDatabaseCheck = () => {
    const checkDatabaseConnection = async () => {
      try {
        const { data, error } = await supabase
          .from('user_roles')
          .select('count')
          .single();

        if (error) {
          if (error.message.includes('infinite recursion')) {
            setDatabaseStatus('warning');
            setConnectionError('Policy configuration issue - contact administrator');
          } else {
            setDatabaseStatus('down');
            setConnectionError(error.message);
          }
        } else {
          setDatabaseStatus('up');
          setConnectionError(null);
        }
      } catch (error) {
        setDatabaseStatus('down');
        setConnectionError(error instanceof Error ? error.message : 'Unknown error');
      }
      setLastChecked(new Date());
    };
    
    checkDatabaseConnection();
  };

  // Update metrics state to include new fields
  const [metrics, setMetrics] = useState({
    totalLeads: 0,
    activeUsers: 0,
    newRolesGenerated: 0,
    topRoles: 0
  });

  useEffect(() => {
    // Update mock data with new metrics
    setMetrics({
      totalLeads: 1250,
      activeUsers: 850,
      newRolesGenerated: 45,
      topRoles: 12
    });

    setRecentUsers([
      { email: 'user1@example.com', role: 'admin' },
      { email: 'user2@example.com', role: 'user' },
      { email: 'user3@example.com', role: 'premium' },
    ]);
  }, []);

  const [recentUsers, setRecentUsers] = useState<any[]>([]);
  const [services, setServices] = useState([
    { name: 'API', status: 'up' as const, lastChecked: new Date() },
    { name: 'Database', status: 'up' as const, lastChecked: new Date() },
    { name: 'Auth Service', status: 'up' as const, lastChecked: new Date() }
  ]);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <FiHome /> },
    { id: 'lead-management', label: 'Lead Management', icon: <FiUsers /> },
    { id: 'user-management', label: 'User Management', icon: <FiUsers /> },
    { id: 'quote-analytics', label: 'Quote Analytics', icon: <FiPieChart /> },
    { id: 'role-blueprints', label: 'Role Blueprints', icon: <FiFileText /> },
    { id: 'course-manager', label: 'Course Manager', icon: <FiBook /> },
    { id: 'resource-library', label: 'Resource Library', icon: <FiFolder /> },
    { id: 'blog-management', label: 'Blog Management', icon: <FiFile /> },
    { id: 'ai-tool-library', label: 'AI Tool Library', icon: <FiTool /> },
    { id: 'quiz-management', label: 'Quiz Management', icon: <FiHelpCircle /> },
    { id: 'content-blocks', label: 'Content Blocks', icon: <FiGrid /> },
    { id: 'admin-management', label: 'Admin Management', icon: <FiUserPlus /> },
    { id: 'system-settings', label: 'System Settings', icon: <FiSettings /> }
  ];

  // Add click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('#profile-menu')) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const renderTabContent = () => {
    const currentTab = navItems.find(item => item.id === activeTab);
    if (!currentTab) return null;

    switch (activeTab) {
      case 'dashboard':
        return (
          <>
            <Grid>
              <MetricCard>
                <MetricIcon $color="#3B82F6">
                  <FiBarChart2 />
                </MetricIcon>
                <MetricValue>{metrics.totalLeads}</MetricValue>
                <MetricLabel>Total Leads</MetricLabel>
                <MetricTrend $isPositive={true}>
                  ↑ 12% vs last week
                </MetricTrend>
              </MetricCard>
              <MetricCard>
                <MetricIcon $color="#EC297B">
                  <FiUsers />
                </MetricIcon>
                <MetricValue>{metrics.activeUsers}</MetricValue>
                <MetricLabel>Active Users</MetricLabel>
                <MetricTrend $isPositive={true}>
                  ↑ 8% vs last week
                </MetricTrend>
              </MetricCard>
              <MetricCard>
                <MetricIcon $color="#00E915">
                  <FiActivity />
                </MetricIcon>
                <MetricValue>{metrics.newRolesGenerated}</MetricValue>
                <MetricLabel>New Roles Generated</MetricLabel>
                <MetricTrend $isPositive={true}>
                  ↑ 15% vs last week
                </MetricTrend>
              </MetricCard>
              <MetricCard>
                <MetricIcon $color="#8B5CF6">
                  <FiStar />
                </MetricIcon>
                <MetricValue>{metrics.topRoles}</MetricValue>
                <MetricLabel>Top Roles</MetricLabel>
                <MetricTrend $isPositive={true}>
                  ↑ 5% vs last week
                </MetricTrend>
              </MetricCard>
            </Grid>
            <Grid style={{ marginTop: '24px', gridTemplateColumns: '2fr 1fr' }}>
              <Card>
                <CardTitle>Recent Activity</CardTitle>
                <CardContent>
                  <ActivityItem>
                    <ActivityIcon $color="#3B82F6">
                      <FiUserPlus />
                    </ActivityIcon>
                    <ActivityContent>
                      <ActivityTitle>New Lead Created</ActivityTitle>
                      <ActivityTime>2 minutes ago</ActivityTime>
                    </ActivityContent>
                  </ActivityItem>
                  <ActivityItem>
                    <ActivityIcon $color="#00E915">
                      <FiBriefcase />
                    </ActivityIcon>
                    <ActivityContent>
                      <ActivityTitle>Role Template Generated</ActivityTitle>
                      <ActivityTime>1 hour ago</ActivityTime>
                    </ActivityContent>
                  </ActivityItem>
                  <ActivityItem>
                    <ActivityIcon $color="#EC297B">
                      <FiUsers />
                    </ActivityIcon>
                    <ActivityContent>
                      <ActivityTitle>New User Registration</ActivityTitle>
                      <ActivityTime>3 hours ago</ActivityTime>
                    </ActivityContent>
                  </ActivityItem>
                </CardContent>
              </Card>
              <Card>
                <CardTitle>Quick Actions</CardTitle>
                <CardContent>
                  <QuickAction>
                    <ActionIcon>
                      <FiUserPlus />
                    </ActionIcon>
                    <ActionText>Add New Lead</ActionText>
                  </QuickAction>
                  <QuickAction style={{ marginTop: '12px' }}>
                    <ActionIcon>
                      <FiBriefcase />
                    </ActionIcon>
                    <ActionText>Create Role Template</ActionText>
                  </QuickAction>
                  <QuickAction style={{ marginTop: '12px' }}>
                    <ActionIcon>
                      <FiEdit />
                    </ActionIcon>
                    <ActionText>Write Blog Post</ActionText>
                  </QuickAction>
                </CardContent>
              </Card>
            </Grid>
            <Grid style={{ marginTop: '24px', gridTemplateColumns: '1fr' }}>
              <SystemStatusCard>
                <CardTitle>System Health</CardTitle>
                <CardContent>
                  <div className="status-row">
                    <StatusDot $status={databaseStatus} />
                    <div style={{ flex: 1 }}>
                      Database
                      {connectionError && (
                        <div style={{ 
                          fontSize: '0.75rem', 
                          color: '#EF4444',
                          marginTop: '2px' 
                        }}>
                          {connectionError}
                        </div>
                      )}
                    </div>
                    <StatusText $status={databaseStatus}>
                      {databaseStatus === 'up' ? 'Connected' : 
                       databaseStatus === 'warning' ? 'Policy Issue' : 'Disconnected'}
                    </StatusText>
                    <div style={{ 
                      fontSize: '0.75rem', 
                      color: '#6B7280', 
                      marginLeft: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px' 
                    }}>
                      {lastChecked.toLocaleTimeString()}
                      <button 
                        onClick={handleDatabaseCheck}
                        style={{
                          background: 'none',
                          border: 'none',
                          padding: '4px',
                          cursor: 'pointer',
                          color: '#6B7280',
                          display: 'flex',
                          alignItems: 'center'
                        }}
                      >
                        <FiRefreshCw size={14} />
                      </button>
                    </div>
                  </div>
                </CardContent>
              </SystemStatusCard>
            </Grid>
          </>
        );
      case 'admin-management':
        return <AdminManagementTab />;
      case 'user-management':
        return (
          <Grid>
            <Card>
              <CardTitle>User List</CardTitle>
              <CardContent>
                {recentUsers.map((user, index) => (
                  <UserItem key={index}>
                    <UserInfo>
                      <UserEmail>{user.email}</UserEmail>
                      <UserRole>{user.role}</UserRole>
                    </UserInfo>
                  </UserItem>
                ))}
              </CardContent>
            </Card>
          </Grid>
        );
      case 'lead-management':
        return (
          <Grid>
            <Card>
              <CardTitle>Lead Overview</CardTitle>
              <CardContent>
                <MetricValue>0</MetricValue>
                <MetricLabel>Total Leads</MetricLabel>
              </CardContent>
            </Card>
            <Card>
              <CardTitle>Lead Sources</CardTitle>
              <CardContent>
                <MetricValue>0</MetricValue>
                <MetricLabel>Active Sources</MetricLabel>
              </CardContent>
            </Card>
          </Grid>
        );
      case 'quote-analytics':
        return (
          <Grid>
            <Card>
              <CardTitle>Quote Statistics</CardTitle>
              <CardContent>
                <MetricValue>0</MetricValue>
                <MetricLabel>Total Quotes</MetricLabel>
              </CardContent>
            </Card>
            <Card>
              <CardTitle>Average Quote Value</CardTitle>
              <CardContent>
                <MetricValue>$0</MetricValue>
                <MetricLabel>Per Quote</MetricLabel>
              </CardContent>
            </Card>
          </Grid>
        );
      case 'role-blueprints':
        return (
          <Grid>
            <Card>
              <CardTitle>Role Templates</CardTitle>
              <CardContent>
                <MetricValue>0</MetricValue>
                <MetricLabel>Available Templates</MetricLabel>
              </CardContent>
            </Card>
          </Grid>
        );
      case 'course-manager':
        return (
          <Grid>
            <Card>
              <CardTitle>Course Overview</CardTitle>
              <CardContent>
                <MetricValue>0</MetricValue>
                <MetricLabel>Total Courses</MetricLabel>
              </CardContent>
            </Card>
            <Card>
              <CardTitle>Course Progress</CardTitle>
              <CardContent>
                <MetricValue>0%</MetricValue>
                <MetricLabel>Average Completion</MetricLabel>
              </CardContent>
            </Card>
          </Grid>
        );
      case 'resource-library':
        return (
          <Grid>
            <Card>
              <CardTitle>Resource Overview</CardTitle>
              <CardContent>
                <MetricValue>0</MetricValue>
                <MetricLabel>Total Resources</MetricLabel>
              </CardContent>
            </Card>
          </Grid>
        );
      case 'blog-management':
        return (
          <Grid>
            <Card>
              <CardTitle>Blog Statistics</CardTitle>
              <CardContent>
                <MetricValue>0</MetricValue>
                <MetricLabel>Total Posts</MetricLabel>
              </CardContent>
            </Card>
            <Card>
              <CardTitle>Blog Performance</CardTitle>
              <CardContent>
                <MetricValue>0</MetricValue>
                <MetricLabel>Average Views</MetricLabel>
              </CardContent>
            </Card>
          </Grid>
        );
      case 'ai-tool-library':
        return (
          <Grid>
            <Card>
              <CardTitle>AI Tools</CardTitle>
              <CardContent>
                <MetricValue>0</MetricValue>
                <MetricLabel>Available Tools</MetricLabel>
              </CardContent>
            </Card>
          </Grid>
        );
      case 'quiz-management':
        return (
          <Grid>
            <Card>
              <CardTitle>Quiz Overview</CardTitle>
              <CardContent>
                <MetricValue>0</MetricValue>
                <MetricLabel>Total Quizzes</MetricLabel>
              </CardContent>
            </Card>
            <Card>
              <CardTitle>Quiz Performance</CardTitle>
              <CardContent>
                <MetricValue>0%</MetricValue>
                <MetricLabel>Average Score</MetricLabel>
              </CardContent>
            </Card>
          </Grid>
        );
      case 'content-blocks':
        return (
          <Grid>
            <Card>
              <CardTitle>Content Blocks</CardTitle>
              <CardContent>
                <MetricValue>0</MetricValue>
                <MetricLabel>Available Blocks</MetricLabel>
              </CardContent>
            </Card>
          </Grid>
        );
      case 'system-settings':
        return (
          <Grid>
            <Card>
              <CardTitle>System Status</CardTitle>
              <CardContent>
                {services.map((service, index) => (
                  <ServiceStatus key={index}>
                    <ServiceName>{service.name}</ServiceName>
                    <StatusIndicator $status={service.status} />
                    <LastChecked>
                      Last checked: {service.lastChecked.toLocaleTimeString()}
                    </LastChecked>
                  </ServiceStatus>
                ))}
              </CardContent>
            </Card>
          </Grid>
        );
      default:
        return null;
    }
  };

  if (!user) {
    return null;
  }

  return (
    <DashboardContainer>
      <Sidebar>
        <SidebarContent>
          <Logo>
            <LogoText>ScaleMate</LogoText>
          </Logo>
          {navItems.map((item) => (
            <NavItem
              key={item.id}
              $active={activeTab === item.id}
              onClick={() => setActiveTab(item.id)}
            >
              <NavIcon>{item.icon}</NavIcon>
              {item.label}
            </NavItem>
          ))}
        </SidebarContent>
      </Sidebar>
      <MainContent>
        <ContentHeader>
          <ContentTitle>{navItems.find(item => item.id === activeTab)?.label}</ContentTitle>
          <HeaderActions>
            <NotificationBadge>
              <IconButton>
                <FiBell size={20} />
              </IconButton>
            </NotificationBadge>
            <ProfileContainer id="profile-menu">
              <IconButton onClick={() => setIsProfileOpen(!isProfileOpen)}>
                <FiUser size={20} />
              </IconButton>
              <ProfileDropdown $isOpen={isProfileOpen}>
                <DropdownItem onClick={() => router.push('/admin/profile')}>
                  <FiUser size={16} />
                  View Profile
                </DropdownItem>
                <DropdownItem onClick={handleLogout}>
                  <FiLogOut size={16} />
                  Logout
                </DropdownItem>
              </ProfileDropdown>
            </ProfileContainer>
          </HeaderActions>
        </ContentHeader>
        {renderTabContent()}
      </MainContent>
    </DashboardContainer>
  );
};

export default AdminDashboard; 