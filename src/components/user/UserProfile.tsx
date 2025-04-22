import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { supabase } from '@/lib/supabase';
import { FiEdit2, FiSave, FiX, FiLock, FiMail, FiPhone, FiUser, FiCamera, FiEye, FiEyeOff } from 'react-icons/fi';
import { FaMale, FaFemale, FaTransgender, FaQuestion } from 'react-icons/fa';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 24px;
`;

const Section = styled.div`
  background: white;
  border-radius: 12px;
  padding: 10px 24px 24px 24px;
  border: 1px solid #E5E7EB;
  margin-bottom: 24px;
`;

const ProfileSection = styled(Section)`
  display: flex;
  gap: 48px;
  align-items: flex-start;
`;

const ProfileInfo = styled.div`
  flex: 1;
`;

const ProfilePicture = styled.div`
  width: 200px;
  height: 200px;
  margin-top: 20px;
  border-radius: 50%;
  background-color: #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: visible;
  flex-shrink: 0;
  margin-left: auto;
  align-self: center;
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  position: absolute;
  top: 0;
  left: 0;
  object-position: center;
`;

const UploadButton = styled.button`
  position: absolute;
  bottom: 0;
  right: 0;
  background: white;
  color: #6b7280;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid #e5e7eb;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  transform: translate(-50%, -50%);
  z-index: 10;

  &:hover {
    background: #f3f4f6;
    color: #111827;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const FormGroup = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 32px;
  margin-bottom: 16px;
`;

const InputWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
`;

const Input = styled.input`
  padding: 8px 12px;
  border: 1px solid #E5E7EB;
  border-radius: 6px;
  font-size: 0.875rem;
  color: #111827;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #3B82F6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const Button = styled.button`
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const PrimaryButton = styled(Button)`
  background-color: #3B82F6;
  color: white;
  border: none;

  &:hover {
    background-color: #2563EB;
  }
`;

const SecondaryButton = styled(Button)`
  background-color: white;
  color: #374151;
  border: 1px solid #E5E7EB;

  &:hover {
    background-color: #F9FAFB;
  }
`;

const ErrorMessage = styled.div`
  color: #DC2626;
  font-size: 0.875rem;
  margin-top: 8px;
`;

const SuccessMessage = styled.div`
  color: #059669;
  font-size: 0.875rem;
  margin-top: 8px;
`;

interface UserProfileData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  gender: string;
  profile_picture: string;
  username: string;
}

interface UserProfileProps {
  onProfilePictureChange?: (newPictureUrl: string) => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ onProfilePictureChange }) => {
  const [profileData, setProfileData] = useState<UserProfileData>({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    gender: '',
    profile_picture: '',
    username: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: profile, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error) throw error;

      setProfileData({
        first_name: profile.first_name || '',
        last_name: profile.last_name || '',
        email: user.email || '',
        phone: profile.phone || '',
        gender: profile.gender || '',
        profile_picture: profile.profile_picture || '',
        username: profile.username || '',
      });
      setLoading(false);
    } catch (error) {
      console.error('Error fetching profile:', error);
      setError('Failed to load profile data');
      setLoading(false);
    }
  };

  const handleProfileUpdate = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from('user_profiles')
        .update({
          first_name: profileData.first_name,
          last_name: profileData.last_name,
          phone: profileData.phone,
          gender: profileData.gender,
          username: profileData.username,
        })
        .eq('user_id', user.id);

      if (error) throw error;

      setSuccess('Profile updated successfully');
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Failed to update profile');
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) throw error;

      setSuccess('Password updated successfully');
      setIsEditingPassword(false);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      console.error('Error updating password:', error);
      setError('Failed to update password');
    }
  };

  return (
    <Container>
      <ProfileSection>
        <ProfileInfo>
          <SectionTitle>Profile Information</SectionTitle>
          <FormGroup>
            <InputWrapper>
              <Label>First Name</Label>
              <Input
                type="text"
                value={profileData.first_name}
                onChange={(e) => setProfileData({ ...profileData, first_name: e.target.value })}
                disabled={!isEditing}
              />
            </InputWrapper>
            <InputWrapper>
              <Label>Last Name</Label>
              <Input
                type="text"
                value={profileData.last_name}
                onChange={(e) => setProfileData({ ...profileData, last_name: e.target.value })}
                disabled={!isEditing}
              />
            </InputWrapper>
          </FormGroup>
          <FormGroup>
            <InputWrapper>
              <Label>Email</Label>
              <Input
                type="email"
                value={profileData.email}
                disabled
              />
            </InputWrapper>
            <InputWrapper>
              <Label>Phone</Label>
              <Input
                type="tel"
                value={profileData.phone}
                onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                disabled={!isEditing}
              />
            </InputWrapper>
          </FormGroup>
          <FormGroup>
            <InputWrapper>
              <Label>Username</Label>
              <Input
                type="text"
                value={profileData.username}
                onChange={(e) => setProfileData({ ...profileData, username: e.target.value })}
                disabled={!isEditing}
              />
            </InputWrapper>
            <InputWrapper>
              <Label>Gender</Label>
              <Input
                type="text"
                value={profileData.gender}
                onChange={(e) => setProfileData({ ...profileData, gender: e.target.value })}
                disabled={!isEditing}
              />
            </InputWrapper>
          </FormGroup>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          {success && <SuccessMessage>{success}</SuccessMessage>}
          <FormGroup>
            {!isEditing ? (
              <PrimaryButton onClick={() => setIsEditing(true)}>
                <FiEdit2 /> Edit Profile
              </PrimaryButton>
            ) : (
              <>
                <PrimaryButton onClick={handleProfileUpdate}>
                  <FiSave /> Save Changes
                </PrimaryButton>
                <SecondaryButton onClick={() => setIsEditing(false)}>
                  <FiX /> Cancel
                </SecondaryButton>
              </>
            )}
          </FormGroup>
        </ProfileInfo>
        <ProfilePicture>
          {profileData.profile_picture ? (
            <ProfileImage src={profileData.profile_picture} alt="Profile" />
          ) : (
            <FiUser size={64} color="#6B7280" />
          )}
          {isEditing && (
            <UploadButton>
              <FiCamera />
            </UploadButton>
          )}
        </ProfilePicture>
      </ProfileSection>

      <Section>
        <SectionTitle>Change Password</SectionTitle>
        {!isEditingPassword ? (
          <PrimaryButton onClick={() => setIsEditingPassword(true)}>
            <FiLock /> Change Password
          </PrimaryButton>
        ) : (
          <form onSubmit={handlePasswordChange}>
            <FormGroup>
              <InputWrapper>
                <Label>Current Password</Label>
                <Input
                  type={showCurrentPassword ? 'text' : 'password'}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
                <Button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  {showCurrentPassword ? <FiEyeOff /> : <FiEye />}
                </Button>
              </InputWrapper>
            </FormGroup>
            <FormGroup>
              <InputWrapper>
                <Label>New Password</Label>
                <Input
                  type={showNewPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <Button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? <FiEyeOff /> : <FiEye />}
                </Button>
              </InputWrapper>
              <InputWrapper>
                <Label>Confirm New Password</Label>
                <Input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <Button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                </Button>
              </InputWrapper>
            </FormGroup>
            <FormGroup>
              <PrimaryButton type="submit">
                <FiSave /> Update Password
              </PrimaryButton>
              <SecondaryButton type="button" onClick={() => setIsEditingPassword(false)}>
                <FiX /> Cancel
              </SecondaryButton>
            </FormGroup>
          </form>
        )}
      </Section>
    </Container>
  );
};

export default UserProfile; 