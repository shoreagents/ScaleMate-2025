import React from 'react';
import styled from 'styled-components';

interface UserProfileProps {
  name: string;
  email: string;
  avatarUrl?: string;
}

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  gap: 1rem;
`;

const Avatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
`;

const UserInfo = styled.div`
  text-align: center;
`;

const UserName = styled.h2`
  margin: 0;
  color: var(--text-primary);
`;

const UserEmail = styled.p`
  margin: 0;
  color: var(--text-secondary);
`;

export const UserProfile: React.FC<UserProfileProps> = ({ name, email, avatarUrl }) => {
  return (
    <ProfileContainer>
      {avatarUrl && <Avatar src={avatarUrl} alt={`${name}'s avatar`} />}
      <UserInfo>
        <UserName>{name}</UserName>
        <UserEmail>{email}</UserEmail>
      </UserInfo>
    </ProfileContainer>
  );
}; 