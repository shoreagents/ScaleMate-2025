import React, { useState } from 'react';
import styled from 'styled-components';
import { FiBell, FiUser, FiLogOut, FiHome } from 'react-icons/fi';
import { useRouter } from 'next/router';

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
`;

const ContentTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
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

const ProfileIcon = styled.div<{ $imageUrl?: string | null }>`
  width: 36px;
  height: 36px;
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

interface DashboardHeaderProps {
  title: string;
  profilePicture?: string | null;
  onLogout: () => void;
  onProfileClick: () => void;
  showProfile?: boolean;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  title,
  profilePicture,
  onLogout,
  onProfileClick,
  showProfile = false
}) => {
  const router = useRouter();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleProfileClick = () => {
    if (onProfileClick) {
      onProfileClick();
      setIsProfileOpen(false);
    }
  };

  const handleHomeClick = () => {
    router.push('/');
  };

  return (
    <ContentHeader>
      <ContentTitle>{title}</ContentTitle>
      <HeaderActions>
        <IconButton onClick={handleHomeClick}>
          <FiHome size={20} />
        </IconButton>
        <NotificationBadge>
          <IconButton>
            <FiBell size={20} />
          </IconButton>
        </NotificationBadge>
        <ProfileContainer id="profile-menu">
          <IconButton onClick={() => setIsProfileOpen(!isProfileOpen)}>
            <ProfileIcon $imageUrl={profilePicture}>
              {profilePicture ? (
                <img src={profilePicture} alt="Profile" />
              ) : (
                <FiUser size={20} />
              )}
            </ProfileIcon>
          </IconButton>
          <ProfileDropdown isOpen={isProfileOpen}>
            <DropdownItem onClick={handleProfileClick}>
              <FiUser size={16} />
              Profile
            </DropdownItem>
            <DropdownItem onClick={onLogout}>
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