import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { createClient } from '@supabase/supabase-js';
import { FiHome, FiUsers, FiPieChart, FiFileText, FiBook, FiFolder, FiFile, FiTool, FiHelpCircle, FiGrid, FiSettings, FiUserPlus } from 'react-icons/fi';
import AdminProfile from '@/components/admin/AdminProfile';

// Initialize Supabase client properly
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

const DashboardContainer = styled.div`
  padding: 2rem;
  margin-top: 0px;
  min-height: calc(100vh - 80px);
  background-color: #F9FAFB;
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

const MainContent = styled.div`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.xl};
  padding-top: calc(${({ theme }) => theme.spacing.xl} + 72px);
  margin-left: 250px;
  background-color: #F9FAFB;
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

const UserProfile: React.FC = () => {
  const router = useRouter();
  const { username } = router.query;
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [profilePicture, setProfilePicture] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Get user profile by username
        const { data: profile, error: profileError } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('username', username)
          .single();

        if (profileError) {
          console.error('Error fetching user profile:', profileError);
          router.push('/404');
          return;
        }

        // Get user auth data
        const { data: { user: authUser }, error: authError } = await supabase.auth.getUser();
        
        if (authError) {
          console.error('Error fetching auth user:', authError);
          router.push('/admin');
          return;
        }

        setUser(authUser);
        setProfilePicture(profile.profile_picture);
        setLoading(false);
      } catch (error) {
        console.error('Error in fetchUserData:', error);
        router.push('/404');
      }
    };

    if (username) {
      fetchUserData();
    }
  }, [username, router]);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      router.push('/admin');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  if (loading) {
    return <DashboardContainer>Loading...</DashboardContainer>;
  }

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
        </SidebarContent>
      </Sidebar>
      <MainContent>
        <AdminProfile onProfilePictureChange={(newPictureUrl) => setProfilePicture(newPictureUrl)} />
      </MainContent>
    </DashboardContainer>
  );
};

export default UserProfile; 