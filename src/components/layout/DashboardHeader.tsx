import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FiBell, FiUser, FiLogOut } from 'react-icons/fi';
import { FaHome, FaBell, FaUser, FaUserPlus } from 'react-icons/fa';
import { useRouter } from 'next/router';
import { supabase } from '@/lib/supabase';

const ContentHeader = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 16rem;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  padding: .25rem 1.5rem;
  background-color: white;
  border-bottom: 1px solid #E5E7EB;
  z-index: 10;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 3.5rem;

  @media (max-width: 768px) {
    left: 0;
    padding: .25rem 1rem;
    justify-content: space-between;
  }
`;

const ContentTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
  text-align: left;

  @media (max-width: 768px) {
    font-size: 1.25rem;
    padding-left: 56px;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
    padding-left: 56px;
  }
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  @media (max-width: 768px) {
    display: flex;
    gap: 12px;
    margin-left: auto;
    position: relative;
    z-index: 2;
  }
`;

const NotificationBadge = styled.div<{ showDot?: boolean }>`
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
    display: ${props => props.showDot ? 'block' : 'none'};
  }
`;

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #6B7280;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  padding: 0;
  transition: all 0.2s ease;

  &:hover {
    background-color: #F3F4F6;
    color: ${props => props.theme.colors.text.primary};
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
  overflow: hidden;
`;

const DropdownItem = styled.div<{ $isLogout?: boolean }>`
  padding: 12px 16px;
  color: ${props => props.$isLogout ? '#EF4444' : '#374151'};
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

const ProfileIcon = styled.div<{ $imageUrl?: string | null; $isLoading?: boolean }>`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #f1f1f1;
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

  @media (min-width: 769px) {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: transparent;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const AvatarSpinner = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid rgba(59, 130, 246, 0.1);
  border-radius: 50%;
  border-top-color: #3B82F6;
  animation: spin 1s ease-in-out infinite;

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

// Add UserActivity type and getTimeAgo function
interface UserActivity {
  id: string;
  full_name: string;
  email: string;
  created_at: string;
}

function getTimeAgo(date: string | Date) {
  const now = new Date();
  const activityDate = typeof date === 'string' ? new Date(date) : date;
  const diffInSeconds = Math.floor((now.getTime() - activityDate.getTime()) / 1000);
  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  return `${Math.floor(diffInSeconds / 86400)} days ago`;
}

const NotificationDropdown = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 120%;
  right: 0;
  background: white;
  border-radius: 8px;
  border: 1px solid #E5E7EB;
  width: 320px;
  box-shadow: 0 8px 24px rgba(15,23,42,0.08);
  display: ${props => props.isOpen ? 'block' : 'none'};
  z-index: 100;
  padding: 0.5rem 0;
`;

const NotificationList = styled.div`
  max-height: 320px;
  overflow-y: auto;
`;

const NotificationItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #F3F4F6;
  &:last-child { border-bottom: none; }
`;

const NotificationText = styled.div`
  flex: 1;
  color: #0F172A;
  font-size: 0.95rem;
`;

const NotificationTime = styled.div`
  font-size: 0.8rem;
  color: #6B7280;
  margin-top: 0.25rem;
`;

const ViewAllLink = styled.a`
  display: block;
  text-align: center;
  color: #3B82F6;
  font-weight: 500;
  padding: 0.75rem 0;
  cursor: pointer;
  text-decoration: none;
  border-top: 1px solid #F3F4F6;
  &:hover { background: #F3F4F6; }
`;

interface DashboardHeaderProps {
  title: string;
  profilePicture?: string | null;
  onLogout: () => void;
  onProfileClick: () => void;
  showProfile?: boolean;
  isLoading?: boolean;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  title,
  profilePicture,
  onLogout,
  onProfileClick,
  showProfile = false,
  isLoading = false
}) => {
  const router = useRouter();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [recentActivities, setRecentActivities] = useState<UserActivity[]>([]);
  const [hasUnseenActivity, setHasUnseenActivity] = useState(false);
  const notifRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    async function fetchRecentActivities() {
      const { data: activities, error } = await supabase
        .from('users')
        .select('id, full_name, email, created_at')
        .order('created_at', { ascending: false })
        .limit(5);
      if (!error && activities) {
        if (activities.length > 0 && JSON.stringify(activities) !== JSON.stringify(recentActivities)) {
          setHasUnseenActivity(true);
        }
        setRecentActivities(activities);
      }
    }
    fetchRecentActivities();
    const interval = setInterval(fetchRecentActivities, 60000);
    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isNotifOpen) {
      setHasUnseenActivity(false);
    }
  }, [isNotifOpen]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setIsNotifOpen(false);
      }
    }
    if (isNotifOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isNotifOpen]);

  const handleProfileClick = () => {
    if (onProfileClick) {
      onProfileClick();
      setIsProfileOpen(false);
    }
  };

  const handleHomeClick = () => {
    router.push('/');
    setIsProfileOpen(false);
  };

  return (
    <ContentHeader>
      <ContentTitle>{title}</ContentTitle>
      <HeaderActions>
        <NotificationBadge ref={notifRef} style={{ position: 'relative' }} showDot={hasUnseenActivity}>
          <IconButton onClick={() => setIsNotifOpen(v => !v)}>
            <FaBell size={20} />
          </IconButton>
          <NotificationDropdown isOpen={isNotifOpen}>
            <NotificationList>
              {recentActivities.length === 0 ? (
                <NotificationItem>
                  <NotificationText>No recent activities</NotificationText>
                </NotificationItem>
              ) : (
                recentActivities.map(activity => (
                  <NotificationItem key={activity.id}>
                    <span style={{ marginTop: 2 }}>
                      <FaUserPlus color="#EC297B" />
                    </span>
                    <div>
                      <NotificationText>
                        New user: <strong>{activity.full_name}</strong>
                        <br />
                        <span style={{ fontSize: '0.875rem', color: 'rgba(15, 23, 42, 0.6)' }}>
                          {activity.email}
                        </span>
                      </NotificationText>
                      <NotificationTime>{getTimeAgo(activity.created_at)}</NotificationTime>
                    </div>
                  </NotificationItem>
                ))
              )}
            </NotificationList>
            <ViewAllLink href="#">View All</ViewAllLink>
          </NotificationDropdown>
        </NotificationBadge>
        <ProfileContainer id="profile-menu">
          <IconButton onClick={() => setIsProfileOpen(!isProfileOpen)}>
            <ProfileIcon $imageUrl={profilePicture} $isLoading={isLoading}>
              {isLoading ? (
                <AvatarSpinner />
              ) : profilePicture ? (
                <img src={profilePicture} alt="Profile" />
              ) : (
                <FaUser size={20} color="#6B7280" />
              )}
            </ProfileIcon>
          </IconButton>
          <ProfileDropdown isOpen={isProfileOpen}>
            <DropdownItem onClick={handleProfileClick}>
              <FaUser size={16} color="#6B7280" />
              Profile
            </DropdownItem>
            <DropdownItem onClick={handleHomeClick}>
              <FaHome size={16} color="#6B7280" />
              Homepage
            </DropdownItem>
            <DropdownItem onClick={onLogout} $isLogout>
              <FiLogOut size={16} />
              Logout
            </DropdownItem>
          </ProfileDropdown>
        </ProfileContainer>
      </HeaderActions>
    </ContentHeader>
  );
};

export default DashboardHeader; 