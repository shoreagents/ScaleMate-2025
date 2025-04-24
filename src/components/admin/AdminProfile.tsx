import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { supabase } from '@/lib/supabase';
import { FiEdit2, FiSave, FiX, FiLock, FiMail, FiPhone, FiUser, FiCamera, FiEye, FiEyeOff, FiCheck, FiLoader } from 'react-icons/fi';
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

const HelperText = styled.div`
  font-size: 0.75rem;
  color: #6b7280;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const Label = styled.label`
  font-weight: 500;
  color: #374151;
  min-width: 120px;
`;

const Input = styled.input`
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  font-size: 0.875rem;
  color: #111827;
  background: white;
  
  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
  }

  &:disabled {
    background: #f9fafb;
    color: #111827;
  }
`;

const GenderSelectContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
`;

const GenderIcon = styled.div`
  position: absolute;
  right: .5rem;
  top: 50%;
  transform: translateY(-50%);
  color: #6B7280;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
`;

const GenderSelect = styled.select`
  width: 100%;
  padding: 8px 12px;
  padding-right: 0px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 0.875rem;
  background-color: white;
  appearance: none;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #3B82F6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
  }
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;

  &:hover {
    background-color: #2563eb;
  }

  &:disabled {
    background-color: #93c5fd;
    cursor: not-allowed;
  }
`;

interface InfoRowProps {
  $isEditing?: boolean;
}

interface InfoLabelProps {
  $isEditing?: boolean;
}

interface InfoValueProps {
  $isEditing?: boolean;
}

const InfoRow = styled.div<InfoRowProps>`
  display: flex;
  align-items: center;
  gap: 32px;
  padding: 8px 0;
  border-bottom: ${props => props.$isEditing ? 'none' : '1px solid #e5e7eb'};

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
`;

const InfoLabel = styled.span<InfoLabelProps>`
  font-weight: 500;
  color: #374151;
  min-width: 120px;
  display: ${props => props.$isEditing ? 'none' : 'block'};
`;

const InfoValue = styled.div<InfoValueProps>`
  flex: 1;
  color: #6b7280;
  display: ${props => props.$isEditing ? 'none' : 'block'};
`;

const EditButton = styled.button`
  background: none;
  border: none;
  color: #6b7280;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.875rem;

  &:hover {
    color: #374151;
  }
`;

const SuccessMessage = styled.div`
  color: #059669;
  font-size: 0.875rem;
  margin-top: 0;
`;

const ErrorMessage = styled.div`
  color: #dc2626;
  font-size: 0.875rem;
  margin-top: 0;
`;

const PasswordChangeForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0;
  margin-top: 16px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-start;
  margin-top: 32px;
`;

const ModalButton = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ChooseImageButton = styled(ModalButton)`
  background: transparent;
  border: 1.5px solid #9aa2b3;
  color: ${props => props.theme.colors.text.primary};

  &:hover {
    background: ${props => props.theme.colors.background.secondary};
    border-color: ${props => props.theme.colors.text.primary};
  }
`;

const SaveButton = styled(ModalButton)`
  background-color: #3B82F6;
  color: white;

  &:hover {
    background-color: #2563EB;
  }

  &:disabled {
    background-color: #93C5FD;
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

const ProfileModal = styled.div<{ $isOpen: boolean }>`
  display: ${props => props.$isOpen ? 'block' : 'none'};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  padding: 20px;
  overflow-y: auto;
`;

const ProfileModalContent = styled.div`
  background: white;
  border-radius: 8px;
  padding: 24px;
  max-width: 350px;
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  ${ButtonGroup} {
    justify-content: center;
  }
`;

const ModalHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 24px;
  position: relative;
`;

const ModalTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  margin: 0;
  text-align: left;
`;

const ModalDescription = styled.p`
  font-size: 0.875rem;
  color: #6B7280;
  text-align: left;
  margin: 8px 0 0;
  line-height: 1.5;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #6B7280;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 0;
  top: 0;
  
  &:hover {
    color: #111827;
  }
`;

const ImagePreview = styled.div`
  width: 250px;
  height: 250px;
  border-radius: 50%;
  background-color: #f3f4f6;
  margin: 0 auto 24px;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

const FileInput = styled.input`
  display: none;
`;

const UploadLabel = styled.label`
  display: block;
  padding: 8px 16px;
  background-color: #3b82f6;
  color: white;
  border-radius: 6px;
  cursor: pointer;
  text-align: center;
  margin-bottom: 16px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #2563eb;
  }
`;

const PasswordInputContainer = styled.div`
  position: relative;
  width: 100%;
`;

const PasswordInput = styled(Input)`
  padding-right: 40px;
  width: 100%;
`;

const ViewPasswordButton = styled.button`
  position: absolute;
  right: .5rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #6b7280;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #374151;
  }
`;

const PasswordRow = styled.div`
  display: flex;
  gap: 16px;
  width: 100%;
`;

const PasswordColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 16px;
`;

const PasswordMatchIndicator = styled.div<{ $matches: boolean }>`
  font-size: 0.75rem;
  color: ${props => props.$matches ? '#059669' : '#dc2626'};
  display: flex;
  align-items: center;
  gap: 4px;
`;

const RequiredAsterisk = styled.span`
  color: #EF4444;
  margin-left: 4px;
`;

const PasswordValidations = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`;

interface AdminProfileData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  gender: string;
  profile_picture: string;
  last_password_change: string;
  username: string;
}

interface AdminProfileProps {
  onProfilePictureChange?: (newPictureUrl: string) => void;
}

const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const AdminProfile: React.FC<AdminProfileProps> = ({ onProfilePictureChange }) => {
  const [profileData, setProfileData] = useState<AdminProfileData>({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    gender: '',
    profile_picture: '',
    last_password_change: '',
    username: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [usernameError, setUsernameError] = useState('');
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [usernameSuccess, setUsernameSuccess] = useState('');

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: profile } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (profile) {
        setProfileData({
          first_name: profile.first_name || '',
          last_name: profile.last_name || '',
          email: user.email || '',
          phone: profile.phone || '',
          gender: profile.gender || '',
          profile_picture: profile.profile_picture || '',
          last_password_change: profile.last_password_change || '',
          username: profile.username || ''
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleCancel = () => {
    setProfileData({
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      gender: '',
      profile_picture: '',
      last_password_change: '',
      username: ''
    });
    setIsEditing(false);
    setIsPasswordModalOpen(false);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setPasswordError('');
    setPasswordSuccess('');
    setIsUploading(false);
    setSelectedFile(null);
    setUsernameError('');
    setIsCheckingUsername(false);
    setUsernameSuccess('');
  };

  const handleProfileUpdate = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error: updateError } = await supabase
        .from('user_profiles')
        .update({
          first_name: profileData.first_name,
          last_name: profileData.last_name,
          phone: profileData.phone,
          gender: profileData.gender,
          username: profileData.username,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id);

      if (updateError) throw updateError;

      if (isEditing) {
        setUsernameSuccess('Profile updated successfully');
        setIsEditing(false);
        setTimeout(() => setUsernameSuccess(null), 500);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      const errorMessage = 'Failed to update profile';
      if (isEditing) {
        setUsernameError(errorMessage);
      }
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setPasswordError('New passwords do not match');
      return;
    }

    try {
      // First verify the current password
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: profileData.email,
        password: currentPassword
      });

      if (signInError) {
        setPasswordError('Current password is incorrect');
        return;
      }

      // Update the password
      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (updateError) throw updateError;

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error: profileError } = await supabase
        .from('user_profiles')
        .update({
          last_password_change: new Date().toISOString()
        })
        .eq('user_id', user.id);

      if (profileError) throw profileError;

      setPasswordSuccess('Password updated successfully');
      setIsPasswordModalOpen(false);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => setPasswordSuccess(null), 500);
    } catch (error) {
      console.error('Error changing password:', error);
      setPasswordError('Failed to change password');
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setUsernameError('Please select an image file');
        setTimeout(() => setUsernameError(null), 3000);
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setUsernameError('Image size should be less than 5MB');
        setTimeout(() => setUsernameError(null), 3000);
        return;
      }

      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData(prev => ({ ...prev, profile_picture: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfilePictureUpload = async () => {
    if (!selectedFile) return;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Create a more secure file path structure
      const fileExt = selectedFile.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      // First, try to delete any existing profile picture
      if (profileData.profile_picture) {
        const existingPath = profileData.profile_picture.split('/').pop();
        if (existingPath) {
          await supabase.storage
            .from('profile-pictures')
            .remove([`${user.id}/${existingPath}`]);
        }
      }

      // Upload the new profile picture
      const { error: uploadError, data } = await supabase.storage
        .from('profile-pictures')
        .upload(filePath, selectedFile, {
          cacheControl: '3600',
          upsert: true
        });

      if (uploadError) {
        console.error('Upload error:', uploadError);
        throw new Error(`Upload failed: ${uploadError.message}`);
      }

      // Get the public URL
      const { data: { publicUrl } } = supabase.storage
        .from('profile-pictures')
        .getPublicUrl(filePath);

      // Update the user profile with the new picture URL
      const { error: updateError } = await supabase
        .from('user_profiles')
        .update({ 
          profile_picture: publicUrl,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id);

      if (updateError) {
        console.error('Profile update error:', updateError);
        throw new Error(`Profile update failed: ${updateError.message}`);
      }

      // Update local state
      setProfileData(prev => ({ ...prev, profile_picture: publicUrl }));
      setUsernameSuccess('Profile picture updated successfully');
      setIsPasswordModalOpen(false);
      setSelectedFile(null);
      
      // Notify parent component of the change
      if (onProfilePictureChange) {
        onProfilePictureChange(publicUrl);
      }

      setTimeout(() => setUsernameSuccess(null), 500);

    } catch (error) {
      console.error('Error updating profile picture:', error);
      setUsernameError(error instanceof Error ? error.message : 'Failed to update profile picture');
      setTimeout(() => setUsernameError(null), 3000);
    }
  };

  const isPasswordFormValid = () => {
    return currentPassword.trim() !== '' && 
           newPassword.trim() !== '' && 
           confirmPassword.trim() !== '' &&
           !usernameError;
  };

  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewPassword(value);
    setPasswordError('');
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setConfirmPassword(value);
    setPasswordError('');
  };

  const checkUsernameExists = async (username: string) => {
    if (!username) {
      setUsernameError('');
      setIsCheckingUsername(false);
      return;
    }

    try {
      setIsCheckingUsername(true);

      // Get the profile of the current user from user_details view
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: userProfile } = await supabase
        .from('user_details')
        .select('username')
        .eq('user_id', user.id)
        .single();

      // If username is the same as the current user, set exists to true and return early
      if (userProfile?.username === username) {
        setUsernameError('This is your current username');
        setIsCheckingUsername(false);
        return;
      }
      
      // Query the user_details view
      const { data, error } = await supabase
        .from('user_details')
        .select('username, user_id')
        .eq('username', username)
        .limit(1);

      if (error) {
        console.error('Error checking username:', error);
        setUsernameError('Failed to check username');
      } else if (data && data.length > 0) {
        // If we found a user with this username, check if it's the same user
        const foundUser = data[0];
        if (foundUser.user_id === user.id) {
          setUsernameError('Username is already taken');
        } else {
          setUsernameError('Username is available');
        }
      } else {
        setUsernameError('Username is available');
      }
    } catch (error) {
      console.error('Error checking username:', error);
      setUsernameError('Failed to check username');
    } finally {
      setIsCheckingUsername(false);
    }
  };

  const validateUsername = (value: string) => {
    // Allow empty value for backspace
    if (!value) {
      setUsernameError('');
      return false;
    }
    if (!/^[a-zA-Z0-9._-]*$/.test(value)) {
      setUsernameError('Special characters are not allowed');
      return false;
    }
    setUsernameError('');
    checkUsernameExists(value);
    return true;
  };

  const isBasicInfoValid = () => {
    return profileData.first_name.trim() !== '' && 
           profileData.last_name.trim() !== '' &&
           !usernameError;
  };

  const handleModalClose = () => {
    setIsPasswordModalOpen(false);
    setSelectedFile(null);
    setUsernameError('');
    setUsernameSuccess('');
  };

  return (
    <Container>
      <ProfileSection>
        <ProfileInfo>
          <SectionTitle>
            Basic Info
          </SectionTitle>
          {isEditing ? (
            <>
              <FormGroup>
                <Label>
                  Username
                  <RequiredAsterisk>*</RequiredAsterisk>
                </Label>
                <InputWrapper>
                  <Input
                    type="text"
                    pattern="[a-zA-Z0-9._-]*"
                    value={profileData.username}
                    onChange={(e) => {
                      const value = e.target.value;
                      validateUsername(value);
                      if (value === '' || e.target.validity.valid) {
                        setProfileData({ ...profileData, username: value });
                      }
                    }}
                    placeholder="Enter username"
                  />
                  {usernameError && (
                    <HelperText style={{ color: '#dc2626' }}>
                      {usernameError}
                    </HelperText>
                  )}
                  {isCheckingUsername && (
                    <HelperText style={{ color: '#6b7280' }}>
                      <FiLoader size={14} />
                      Checking username...
                    </HelperText>
                  )}
                  {usernameSuccess && <SuccessMessage>{usernameSuccess}</SuccessMessage>}
                </InputWrapper>
              </FormGroup>
              <FormGroup>
                <Label>
                  First Name
                  <RequiredAsterisk>*</RequiredAsterisk>
                </Label>
                <Input
                  type="text"
                  pattern="[A-Za-z ]+"
                  value={profileData.first_name}
                  onChange={(e) => {
                    if (e.target.validity.valid) {
                      setProfileData({ ...profileData, first_name: e.target.value });
                    }
                  }}
                  placeholder="Enter your first name"
                />
              </FormGroup>
              <FormGroup>
                <Label>
                  Last Name
                  <RequiredAsterisk>*</RequiredAsterisk>
                </Label>
                <Input
                  type="text"
                  pattern="[A-Za-z ]+"
                  value={profileData.last_name}
                  onChange={(e) => {
                    if (e.target.validity.valid) {
                      setProfileData({ ...profileData, last_name: e.target.value });
                    }
                  }}
                  placeholder="Enter your last name"
                />
              </FormGroup>
              <FormGroup>
                <Label>Gender</Label>
                <GenderSelectContainer>
                  <GenderSelect
                    value={profileData.gender}
                    onChange={(e) => setProfileData({ ...profileData, gender: e.target.value })}
                  >
                    <option value="">Select your gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </GenderSelect>
                  <GenderIcon>
                    {profileData.gender === 'male' ? <FaMale size={18} /> :
                     profileData.gender === 'female' ? <FaFemale size={18} /> :
                     profileData.gender === 'other' ? <FaTransgender size={18} /> :
                     profileData.gender === 'prefer-not-to-say' ? <FaQuestion size={18} /> :
                     <FaQuestion size={18} />}
                  </GenderIcon>
                </GenderSelectContainer>
              </FormGroup>
              <ButtonGroup>
                <ChooseImageButton
                  type="button"
                  onClick={handleCancel}
                >
                  Cancel
                </ChooseImageButton>
                <SaveButton 
                  onClick={handleProfileUpdate}
                  disabled={!isBasicInfoValid()}
                >
                  Save Changes
                </SaveButton>
              </ButtonGroup>
              {usernameError && <ErrorMessage>{usernameError}</ErrorMessage>}
            </>
          ) : (
            <>
              <InfoRow $isEditing={isEditing}>
                <InfoLabel $isEditing={isEditing}>Username</InfoLabel>
                <InfoValue $isEditing={isEditing}>{profileData.username || '-'}</InfoValue>
              </InfoRow>
              <InfoRow $isEditing={isEditing}>
                <InfoLabel $isEditing={isEditing}>First Name</InfoLabel>
                <InfoValue $isEditing={isEditing}>{profileData.first_name || '-'}</InfoValue>
              </InfoRow>
              <InfoRow $isEditing={isEditing}>
                <InfoLabel $isEditing={isEditing}>Last Name</InfoLabel>
                <InfoValue $isEditing={isEditing}>{profileData.last_name || '-'}</InfoValue>
              </InfoRow>
              <InfoRow $isEditing={isEditing} style={{ borderBottom: 'none' }}>
                <InfoLabel $isEditing={isEditing}>Gender</InfoLabel>
                <InfoValue $isEditing={isEditing}>{profileData.gender ? capitalizeFirstLetter(profileData.gender) : '-'}</InfoValue>
              </InfoRow>
              <div style={{ marginTop: '16px' }}>
                <EditButton onClick={() => setIsEditing(true)}>
                  <FiEdit2 />
                  Edit Basic Info
                </EditButton>
              </div>
              {usernameSuccess && <SuccessMessage>{usernameSuccess}</SuccessMessage>}
            </>
          )}
        </ProfileInfo>
        <ProfilePicture>
          {profileData.profile_picture ? (
            <ProfileImage src={profileData.profile_picture} alt="Profile" />
          ) : (
            <FiUser size={80} color="#6b7280" />
          )}
          {isEditing && (
            <UploadButton onClick={() => setIsPasswordModalOpen(true)}>
              <FiEdit2 size={16} />
            </UploadButton>
          )}
        </ProfilePicture>
      </ProfileSection>

      <Section>
        <SectionTitle>
          Contact Info
        </SectionTitle>
        <InfoRow $isEditing={isEditing}>
          <InfoLabel $isEditing={isEditing}>Email</InfoLabel>
          <InfoValue $isEditing={isEditing}>{profileData.email}</InfoValue>
        </InfoRow>
        <InfoRow $isEditing={isEditing} style={{ borderBottom: 'none' }}>
          <InfoLabel $isEditing={isEditing}>Phone</InfoLabel>
          <InfoValue $isEditing={isEditing}>{profileData.phone || '-'}</InfoValue>
        </InfoRow>
        <div style={{ marginTop: '16px' }}>
          <EditButton onClick={() => setIsEditing(true)}>
            <FiEdit2 />
            Edit Contact Info
          </EditButton>
        </div>
      </Section>

      <Section>
        <SectionTitle>
          Password
        </SectionTitle>
        {isPasswordModalOpen ? (
          <PasswordChangeForm onSubmit={handlePasswordChange}>
            <PasswordColumn>
              <Label>
                Current Password
                <RequiredAsterisk>*</RequiredAsterisk>
              </Label>
              <PasswordInputContainer>
                <PasswordInput
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter your current password"
                />
                <ViewPasswordButton
                  type="button"
                  onClick={() => setIsPasswordModalOpen(false)}
                >
                  <FiEye size={18} />
                </ViewPasswordButton>
              </PasswordInputContainer>
            </PasswordColumn>

            <PasswordRow>
              <PasswordColumn>
                <Label>
                  New Password
                  <RequiredAsterisk>*</RequiredAsterisk>
                </Label>
                <PasswordInputContainer>
                  <PasswordInput
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter your new password"
                  />
                  <ViewPasswordButton
                    type="button"
                    onClick={() => setIsPasswordModalOpen(false)}
                  >
                    <FiEye size={18} />
                  </ViewPasswordButton>
                </PasswordInputContainer>
              </PasswordColumn>

              <PasswordColumn>
                <Label>
                  Confirm New Password
                  <RequiredAsterisk>*</RequiredAsterisk>
                </Label>
                <PasswordInputContainer>
                  <PasswordInput
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your new password"
                  />
                  <ViewPasswordButton
                    type="button"
                    onClick={() => setIsPasswordModalOpen(false)}
                  >
                    <FiEye size={18} />
                  </ViewPasswordButton>
                </PasswordInputContainer>
              </PasswordColumn>
            </PasswordRow>

            <ButtonGroup>
              <ChooseImageButton
                type="button"
                onClick={handleCancel}
              >
                Cancel
              </ChooseImageButton>
              <SaveButton 
                type="submit"
                disabled={!isPasswordFormValid()}
              >
                Save Changes
              </SaveButton>
            </ButtonGroup>
            {passwordError && <ErrorMessage>{passwordError}</ErrorMessage>}
            {passwordSuccess && <SuccessMessage>{passwordSuccess}</SuccessMessage>}
          </PasswordChangeForm>
        ) : (
          <>
            <InfoRow style={{ borderBottom: 'none' }}>
              <InfoLabel>Last Changed</InfoLabel>
              <InfoValue>
                {profileData.last_password_change
                  ? new Date(profileData.last_password_change).toLocaleDateString()
                  : 'Never'}
              </InfoValue>
            </InfoRow>
            <div style={{ marginTop: '16px' }}>
              <EditButton onClick={() => setIsPasswordModalOpen(true)}>
                <FiEdit2 />
                Change Password
              </EditButton>
            </div>
            {passwordSuccess && <SuccessMessage>{passwordSuccess}</SuccessMessage>}
          </>
        )}
      </Section>

      <ProfileModal $isOpen={isPasswordModalOpen}>
        <ProfileModalContent>
          <ModalHeader>
            <ModalTitle>Profile Picture</ModalTitle>
            <ModalDescription>
              A picture helps people recognize you and lets you know when you're signed in to your account.
            </ModalDescription>
            <CloseButton onClick={handleModalClose}>
              <FiX size={20} />
            </CloseButton>
          </ModalHeader>

          <ImagePreview>
            {profileData.profile_picture ? (
              <PreviewImage src={profileData.profile_picture} alt="Preview" />
            ) : (
              <FiUser size={80} color="#6b7280" />
            )}
          </ImagePreview>

          <FileInput
            type="file"
            id="profile-picture"
            accept="image/*"
            onChange={handleFileSelect}
          />

          <ButtonGroup>
            <ChooseImageButton
              onClick={() => document.getElementById('profile-picture')?.click()}
            >
              Choose Image
            </ChooseImageButton>
            <SaveButton
              onClick={handleProfilePictureUpload}
              disabled={!selectedFile}
            >
              Save Changes
            </SaveButton>
          </ButtonGroup>
        </ProfileModalContent>
      </ProfileModal>
    </Container>
  );
};

// Add debounce utility function
const debounce = (func: Function, wait: number) => {
  let timeout: NodeJS.Timeout;
  return function executedFunction(...args: any[]) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export default AdminProfile; 