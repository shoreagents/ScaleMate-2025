import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import DashboardTab from '@/components/admin/DashboardTab';
import UserManagementTab from '@/components/admin/UserManagementTab';
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
  FiSettings 
} from 'react-icons/fi';

const DashboardContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #F9FAFB;
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
  grid-template-columns: repeat(1, 1fr);
  gap: ${({ theme }) => theme.spacing.lg};

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Card = styled.div`
  background-color: ${({ theme }) => theme.colors.background.secondary};
  border-radius: 1rem;
  padding: ${({ theme }) => theme.spacing.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};
`;

const CardTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const Metric = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const MetricValue = styled.span`
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
`;

const MetricLabel = styled.span`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.text.secondary};
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
  gap: ${({ theme }) => theme.spacing.md};
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
  margin-left: 250px;
  background-color: #F9FAFB;
`;

const ContentHeader = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  padding: ${({ theme }) => theme.spacing.lg};
  background-color: white;
  border-bottom: 1px solid #E5E7EB;
  margin-left: -${({ theme }) => theme.spacing.xl};
  margin-right: -${({ theme }) => theme.spacing.xl};
  margin-top: -${({ theme }) => theme.spacing.xl};
`;

const ContentTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
`;

const ContentDescription = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: ${({ theme }) => theme.spacing.xs} 0 0;
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

const AdminDashboard: React.FC = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [user, setUser] = useState<any>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [hasAdminPermissions, setHasAdminPermissions] = useState<boolean>(false);
  const [debugInfo, setDebugInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);

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

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      router.push('/admin');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  // Mock data for now - replace with actual API calls
  const [metrics, setMetrics] = useState({
    totalUsers: 0,
    activeUsers: 0,
    conversionRate: 0,
  });
  const [recentUsers, setRecentUsers] = useState<any[]>([]);
  const [services, setServices] = useState([
    { name: 'API', status: 'up' as const, lastChecked: new Date() },
    { name: 'Database', status: 'up' as const, lastChecked: new Date() },
    { name: 'Auth Service', status: 'up' as const, lastChecked: new Date() }
  ]);

  useEffect(() => {
    setMetrics({
      totalUsers: 1250,
      activeUsers: 850,
      conversionRate: 68,
    });

    setRecentUsers([
      { email: 'user1@example.com', role: 'admin' },
      { email: 'user2@example.com', role: 'user' },
      { email: 'user3@example.com', role: 'premium' },
    ]);
  }, []);

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
    { id: 'system-settings', label: 'System Settings', icon: <FiSettings /> }
  ];

  const renderTabContent = () => {
    const currentTab = navItems.find(item => item.id === activeTab);
    if (!currentTab) return null;

    switch (activeTab) {
      case 'dashboard':
        return (
          <DashboardTab
            metrics={metrics}
            recentUsers={recentUsers}
            services={services}
          />
        );
      case 'user-management':
        return <UserManagementTab users={recentUsers} />;
      default:
        return <GenericTab title={currentTab.label} />;
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
        <SidebarFooter>
          <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
        </SidebarFooter>
      </Sidebar>
      <MainContent>
        <ContentHeader>
          <ContentTitle>{navItems.find(item => item.id === activeTab)?.label}</ContentTitle>
          <ContentDescription>Manage and monitor your {navItems.find(item => item.id === activeTab)?.label.toLowerCase()}</ContentDescription>
        </ContentHeader>
        {renderTabContent()}
      </MainContent>
    </DashboardContainer>
  );
};

export default AdminDashboard; 