import React, { useState } from 'react';
import styled from 'styled-components';
import { FiBell, FiUser, FiLogOut, FiHome } from 'react-icons/fi';
import { useRouter } from 'next/router';

const Header = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 250px;
  height: 4rem;
  background-color: white;
  border-bottom: 1px solid #E5E7EB;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  z-index: 10;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
`;

const HeaderTitle = styled.h1`
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  margin: 0;
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
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
  width: 40px;
  height: 40px;
  padding: 0;
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
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
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

interface UserHeaderProps {
  activeSection: string;
  user: {
    name: string;
    email: string;
    avatar?: string;
  };
}

const getSectionTitle = (section: string): string => {
  switch (section) {
    case 'dashboard':
      return 'My Dashboard';
    case 'role-builder':
      return 'Interactive Role Builder';
    case 'quote-calculator':
      return 'Expanded Quote Calculator';
    case 'team-savings':
      return 'Detailed Team Savings Tool';
    case 'readiness-score':
      return 'Readiness Score Page';
    case 'saved-blueprints':
      return 'Saved Role Blueprints';
    case 'saved-quotes':
      return 'Saved Quotes';
    case 'resource-library':
      return 'Resource Library';
    case 'course-dashboard':
      return 'Course Dashboard';
    case 'ai-tool-library':
      return 'AI Tool Library';
    case 'saved-tool-stack':
      return 'Saved Tool Stack';
    case 'gamified-tracker':
      return 'Gamified Tracker';
    case 'account-settings':
      return 'Account Settings';
    default:
      return 'My Dashboard';
  }
};

const UserHeader: React.FC<UserHeaderProps> = ({ activeSection, user }) => {
  const router = useRouter();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleHomeClick = () => {
    router.push('/');
  };

  return (
    <Header>
      <HeaderLeft>
        <HeaderTitle>{getSectionTitle(activeSection)}</HeaderTitle>
      </HeaderLeft>
      <HeaderRight>
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
            <ProfileIcon $imageUrl={user.avatar}>
              {user.avatar ? (
                <img src={user.avatar} alt="Profile" />
              ) : (
                <FiUser size={20} />
              )}
            </ProfileIcon>
          </IconButton>
          <ProfileDropdown isOpen={isProfileOpen}>
            <DropdownItem onClick={() => router.push('/user/profile')}>
              <FiUser size={16} />
              View Profile
            </DropdownItem>
            <DropdownItem onClick={() => router.push('/user')}>
              <FiLogOut size={16} />
              Logout
            </DropdownItem>
          </ProfileDropdown>
        </ProfileContainer>
      </HeaderRight>
    </Header>
  );
};

export default UserHeader; 