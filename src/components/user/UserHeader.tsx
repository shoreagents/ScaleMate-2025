import React from 'react';
import styled from 'styled-components';
import { FaRegBell } from 'react-icons/fa6';

interface UserHeaderProps {
  activeSection: string;
  user: {
    name: string;
    email: string;
    avatar?: string;
  };
}

const Header = styled.header`
  position: fixed;
  top: 0;
  right: 0;
  left: 16rem; /* Account for sidebar width */
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
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const NotificationButton = styled.button`
  background: none;
  border: none;
  color: #6B7280;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.375rem;
  transition: all 0.2s;

  &:hover {
    background-color: #F3F4F6;
  }
`;

const UserAvatar = styled.img`
  width: 2rem;
  height: 2rem;
  border-radius: 9999px;
  object-fit: cover;
`;

const getSectionTitle = (section: string): string => {
  switch (section) {
    case 'dashboard':
      return 'My Dashboard';
    case 'role-builder':
      return 'Interactive Role Builder';
    case 'quote-calculator':
      return 'Expanded Quote Calculator';
    // Add more cases as needed
    default:
      return 'My Dashboard';
  }
};

const UserHeader: React.FC<UserHeaderProps> = ({ activeSection, user }) => {
  return (
    <Header>
      <HeaderLeft>
        <HeaderTitle>{getSectionTitle(activeSection)}</HeaderTitle>
      </HeaderLeft>
      <HeaderRight>
        <NotificationButton>
          <FaRegBell size={20} />
        </NotificationButton>
        <UserAvatar 
          src={user.avatar || "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg"} 
          alt={`${user.name}'s avatar`}
        />
      </HeaderRight>
    </Header>
  );
};

export default UserHeader; 