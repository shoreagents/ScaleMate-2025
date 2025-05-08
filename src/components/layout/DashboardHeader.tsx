import React, { useState } from 'react';
import styled from 'styled-components';
import { FiBell, FiUser, FiLogOut } from 'react-icons/fi';
import { FaHome, FaBell, FaUser } from 'react-icons/fa';
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

  @media (max-width: 768px) {
    font-size: 1.25rem;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1;
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
    background-color: ${props => props.$isLogout ? '#FEE2E2' : '#f3f4f6'};
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
        <NotificationBadge>
          <IconButton>
            <FaBell size={20} />
          </IconButton>
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
            <DropdownItem onClick={handleHomeClick}>
              <FaHome size={16} color="#6B7280" />
              Home
            </DropdownItem>
            <DropdownItem onClick={handleProfileClick}>
              <FaUser size={16} color="#6B7280" />
              Profile
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