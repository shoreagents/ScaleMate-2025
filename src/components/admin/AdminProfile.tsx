import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { supabase } from '@/lib/supabase';
import { FiEdit2, FiSave, FiX, FiLock, FiMail, FiPhone, FiUser, FiCamera } from 'react-icons/fi';
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
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  position: absolute;
  top: 0;
  left: 0;
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
  transform: translate(-70%, -10%);
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
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const FormGroup = styled.div`
  margin-bottom: 0;
`;

const Label = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 4px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  font-size: 0.875rem;
  color: #6b7280;
  background: white;
  
  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
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

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;
  padding: 8px 0;
  border-bottom: 1px solid #e5e7eb;

  &:last-child {
    border-bottom: none;
  }
`;

const InfoLabel = styled.span`
  font-weight: 500;
  color: #374151;
  min-width: 120px;
`;

const InfoValue = styled.div`
  flex: 1;
  color: #6b7280;
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

const PasswordChangeForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 16px;
`;

const SuccessMessage = styled.div`
  color: #059669;
  font-size: 0.875rem;
  margin-top: 8px;
`;

const ErrorMessage = styled.div`
  color: #dc2626;
  font-size: 0.875rem;
  margin-top: 8px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-start;
  margin-top: 24px;
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
  border: 1px solid rgb(59, 130, 246);
  color: rgb(59, 130, 246);
  background-color: transparent;
  transition: all 0.2s ease;

  &:hover {
    background-color: rgb(59, 130, 246);
    color: white;
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

interface AdminProfileData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  gender: string;
  profile_picture?: string;
  last_password_change?: string;
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
    last_password_change: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingContact, setIsEditingContact] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [basicInfoError, setBasicInfoError] = useState<string | null>(null);
  const [basicInfoSuccess, setBasicInfoSuccess] = useState<string | null>(null);
  const [contactError, setContactError] = useState<string | null>(null);
  const [contactSuccess, setContactSuccess] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: profile, error: profileError } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (profileError) throw profileError;

      setProfileData({
        first_name: profile.first_name || '',
        last_name: profile.last_name || '',
        email: user.email || '',
        phone: profile.phone || '',
        gender: profile.gender || '',
        profile_picture: profile.profile_picture || '',
        last_password_change: profile.last_password_change || ''
      });
    } catch (error) {
      console.error('Error fetching profile:', error);
      setBasicInfoError('Failed to load profile data');
    } finally {
      setLoading(false);
    }
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
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id);

      if (updateError) throw updateError;

      if (isEditing) {
        setBasicInfoSuccess('Profile updated successfully');
        setIsEditing(false);
        setTimeout(() => setBasicInfoSuccess(null), 500);
      }
      if (isEditingContact) {
        setContactSuccess('Profile updated successfully');
        setIsEditingContact(false);
        setTimeout(() => setContactSuccess(null), 500);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      const errorMessage = 'Failed to update profile';
      if (isEditing) {
        setBasicInfoError(errorMessage);
      }
      if (isEditingContact) {
        setContactError(errorMessage);
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
      setIsEditingPassword(false);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => setPasswordSuccess(null), 3000);
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
        setBasicInfoError('Please select an image file');
        setTimeout(() => setBasicInfoError(null), 3000);
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setBasicInfoError('Image size should be less than 5MB');
        setTimeout(() => setBasicInfoError(null), 3000);
        return;
      }

      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Add useEffect to set initial preview image when modal opens
  useEffect(() => {
    if (isProfileModalOpen && profileData.profile_picture) {
      setPreviewImage(profileData.profile_picture);
    } else if (isProfileModalOpen) {
      setPreviewImage(null);
    }
  }, [isProfileModalOpen, profileData.profile_picture]);

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
      setBasicInfoSuccess('Profile picture updated successfully');
      setIsProfileModalOpen(false);
      setPreviewImage(null);
      setSelectedFile(null);
      
      // Notify parent component of the change
      if (onProfilePictureChange) {
        onProfilePictureChange(publicUrl);
      }

      setTimeout(() => setBasicInfoSuccess(null), 3000);

    } catch (error) {
      console.error('Error updating profile picture:', error);
      setBasicInfoError(error instanceof Error ? error.message : 'Failed to update profile picture');
      setTimeout(() => setBasicInfoError(null), 3000);
    }
  };

  if (loading) {
    return <Container>Loading...</Container>;
  }

  return (
    <Container>
      <ProfileSection>
        <ProfileInfo>
          <SectionTitle>
            Basic Info
          </SectionTitle>
          {isEditing ? (
            <>
              <InfoRow>
                <InfoLabel>First Name</InfoLabel>
                <InfoValue>
                  <Input
                    type="text"
                    pattern="[A-Za-z ]+"
                    value={profileData.first_name}
                    onChange={(e) => {
                      if (e.target.validity.valid) {
                        setProfileData({ ...profileData, first_name: e.target.value });
                      }
                    }}
                  />
                </InfoValue>
              </InfoRow>
              <InfoRow>
                <InfoLabel>Last Name</InfoLabel>
                <InfoValue>
                  <Input
                    type="text"
                    pattern="[A-Za-z ]+"
                    value={profileData.last_name}
                    onChange={(e) => {
                      if (e.target.validity.valid) {
                        setProfileData({ ...profileData, last_name: e.target.value });
                      }
                    }}
                  />
                </InfoValue>
              </InfoRow>
              <InfoRow style={{ borderBottom: 'none' }}>
                <InfoLabel>Gender</InfoLabel>
                <InfoValue>
                  <GenderSelectContainer>
                    <GenderSelect
                      value={profileData.gender}
                      onChange={(e) => setProfileData({ ...profileData, gender: e.target.value })}
                    >
                      <option value="">Select gender</option>
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
                </InfoValue>
              </InfoRow>
              <ButtonGroup>
                <ChooseImageButton
                  type="button"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </ChooseImageButton>
                <SaveButton onClick={handleProfileUpdate}>
                  Save Changes
                </SaveButton>
              </ButtonGroup>
              {basicInfoError && <ErrorMessage>{basicInfoError}</ErrorMessage>}
              {basicInfoSuccess && <SuccessMessage>{basicInfoSuccess}</SuccessMessage>}
            </>
          ) : (
            <>
              <InfoRow>
                <InfoLabel>First Name</InfoLabel>
                <InfoValue>{profileData.first_name || '-'}</InfoValue>
              </InfoRow>
              <InfoRow>
                <InfoLabel>Last Name</InfoLabel>
                <InfoValue>{profileData.last_name || '-'}</InfoValue>
              </InfoRow>
              <InfoRow style={{ borderBottom: 'none' }}>
                <InfoLabel>Gender</InfoLabel>
                <InfoValue>{profileData.gender ? capitalizeFirstLetter(profileData.gender) : '-'}</InfoValue>
              </InfoRow>
              <div style={{ marginTop: '16px' }}>
                <EditButton onClick={() => setIsEditing(true)}>
                  <FiEdit2 />
                  Edit Basic Info
                </EditButton>
              </div>
              {basicInfoSuccess && <SuccessMessage>{basicInfoSuccess}</SuccessMessage>}
            </>
          )}
        </ProfileInfo>
        <ProfilePicture>
          {profileData.profile_picture ? (
            <ProfileImage src={profileData.profile_picture} alt="Profile" />
          ) : (
            <FiUser size={80} color="#6b7280" />
          )}
          <UploadButton onClick={() => setIsProfileModalOpen(true)}>
            <FiEdit2 size={16} />
          </UploadButton>
        </ProfilePicture>
      </ProfileSection>

      <Section>
        <SectionTitle>
          Contact Info
        </SectionTitle>
        {isEditingContact ? (
          <>
            <InfoRow>
              <InfoLabel>Email</InfoLabel>
              <InfoValue>
                <Input 
                  value={profileData.email}
                  disabled
                  style={{ 
                    backgroundColor: '#f9fafb',
                    color: '#6b7280'
                  }}
                />
                <div style={{ 
                  fontSize: '0.75rem',
                  color: '#6b7280',
                  marginTop: '4px'
                }}>
                  Email cannot be changed
                </div>
              </InfoValue>
            </InfoRow>
            <InfoRow style={{ borderBottom: 'none' }}>
              <InfoLabel>Phone</InfoLabel>
              <InfoValue>
                <Input
                  type="tel"
                  pattern="[0-9]*"
                  value={profileData.phone}
                  onChange={(e) => {
                    if (e.target.validity.valid) {
                      setProfileData({ ...profileData, phone: e.target.value });
                    }
                  }}
                />
              </InfoValue>
            </InfoRow>
            <ButtonGroup>
              <ChooseImageButton
                type="button"
                onClick={() => setIsEditingContact(false)}
              >
                Cancel
              </ChooseImageButton>
              <SaveButton onClick={() => {
                handleProfileUpdate();
                setIsEditingContact(false);
              }}>
                Save Changes
              </SaveButton>
            </ButtonGroup>
            {contactError && <ErrorMessage>{contactError}</ErrorMessage>}
            {contactSuccess && <SuccessMessage>{contactSuccess}</SuccessMessage>}
          </>
        ) : (
          <>
            <InfoRow>
              <InfoLabel>Email</InfoLabel>
              <InfoValue>{profileData.email}</InfoValue>
            </InfoRow>
            <InfoRow style={{ borderBottom: 'none' }}>
              <InfoLabel>Phone</InfoLabel>
              <InfoValue>{profileData.phone || '-'}</InfoValue>
            </InfoRow>
            <div style={{ marginTop: '16px' }}>
              <EditButton onClick={() => setIsEditingContact(true)}>
                <FiEdit2 />
                Edit Contact Info
              </EditButton>
            </div>
            {contactSuccess && <SuccessMessage>{contactSuccess}</SuccessMessage>}
          </>
        )}
      </Section>

      <Section>
        <SectionTitle>
          Password
        </SectionTitle>
        {isEditingPassword ? (
          <PasswordChangeForm onSubmit={handlePasswordChange}>
            <FormGroup>
              <Label>Current Password</Label>
              <Input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>New Password</Label>
              <Input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>Confirm New Password</Label>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </FormGroup>
            <ButtonGroup>
              <ChooseImageButton
                type="button"
                onClick={() => setIsEditingPassword(false)}
              >
                Cancel
              </ChooseImageButton>
              <SaveButton type="submit">
                Change Password
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
              <EditButton onClick={() => setIsEditingPassword(true)}>
                <FiEdit2 />
                Change Password
              </EditButton>
            </div>
            {passwordSuccess && <SuccessMessage>{passwordSuccess}</SuccessMessage>}
          </>
        )}
      </Section>

      <ProfileModal $isOpen={isProfileModalOpen}>
        <ProfileModalContent>
          <ModalHeader>
            <ModalTitle>Profile Picture</ModalTitle>
            <ModalDescription>
              A picture helps people recognize you and lets you know when you're signed in to your account.
            </ModalDescription>
            <CloseButton onClick={() => {
              setIsProfileModalOpen(false);
              setPreviewImage(null);
              setSelectedFile(null);
            }}>
              <FiX size={20} />
            </CloseButton>
          </ModalHeader>

          <ImagePreview>
            {previewImage ? (
              <PreviewImage src={previewImage} alt="Preview" />
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

export default AdminProfile; 