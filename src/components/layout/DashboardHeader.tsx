import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FiBell, FiUser, FiLogOut } from 'react-icons/fi';
import { FaHome, FaBell, FaUser } from 'react-icons/fa';
import { useRouter } from 'next/router';
import { useProfile } from '@/contexts/ProfileContext';

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
  height: 4rem;

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

const IconButton = styled.button`
  background-color: #F3F4F6;
  border: none;
  cursor: pointer;
  color: #6B7280;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  padding: 0;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #EAECF0;
  }
`;

const ProfileContainer = styled.div`
  position: relative;
`;

const ProfileDropdown = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border-radius: 8px;
  border: 1px solid #E5E7EB;
  width: 200px;
  display: ${props => props.$isOpen ? 'block' : 'none'};
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

const ProfileIcon = styled.div`
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  overflow: hidden;
  border-radius: 50%;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

interface DashboardHeaderProps {
  title: string;
  onLogout: () => void;
  onProfileClick: () => void;
  showProfile?: boolean;
  isLoading?: boolean;
  onNotificationClick?: () => void;
  hasNotifications?: boolean;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  title,
  onLogout,
  onProfileClick,
  showProfile = false,
  isLoading = false,
  onNotificationClick,
  hasNotifications = false
}) => {
  const router = useRouter();
  const { profilePicture } = useProfile();
  const [isMobile, setIsMobile] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleHomeClick = () => {
    router.push('/');
    setIsProfileOpen(false);
  };

  const handleProfileClick = () => {
    if (onProfileClick) {
      onProfileClick();
      setIsProfileOpen(false);
    }
  };

  return (
    <ContentHeader>
      <ContentTitle>{title}</ContentTitle>
      <HeaderActions>
        {hasNotifications && (
          <NotificationBadge>
            <IconButton onClick={onNotificationClick}>
              <FaBell size={20} />
            </IconButton>
          </NotificationBadge>
        )}
        <ProfileContainer>
          <IconButton onClick={() => setIsProfileOpen(!isProfileOpen)}>
            <ProfileIcon>
              {profilePicture ? (
                <img src={profilePicture} alt="Profile" />
              ) : (
                <FaUser size={20} color="#9CA3AF" />
              )}
            </ProfileIcon>
          </IconButton>
          <ProfileDropdown $isOpen={isProfileOpen}>
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