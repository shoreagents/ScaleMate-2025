import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { supabase } from '@/lib/supabase';
import { FiEdit2, FiSave, FiX, FiLock, FiMail, FiPhone, FiUser, FiCamera, FiEye, FiEyeOff, FiCheck, FiLoader, FiActivity, FiClock, FiUsers, FiShield } from 'react-icons/fi';
import { FaMale, FaFemale, FaTransgender, FaQuestion, FaHistory, FaUserPlus, FaUserEdit, FaUserMinus, FaUserCog, FaShieldAlt, FaKey, FaUserCircle } from 'react-icons/fa';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.5rem;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Section = styled.div`
  background: white;
  border-radius: 12px;
  padding: 10px 24px 24px 24px;
  border: 1px solid #E5E7EB;
  margin-bottom: 24px;
  width: 100%;
  box-sizing: border-box;
`;

const ProfileSection = styled(Section)`
  display: flex;
  gap: 48px;
  align-items: flex-start;
  width: 100%;
  box-sizing: border-box;
`;

const ProfileInfo = styled.div`
  flex: 1;
  width: 100%;
  box-sizing: border-box;
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

const DefaultProfileIcon = styled(FiUser)`
  width: 80px;
  height: 80px;
  color: #6b7280;
  opacity: 0.5;
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
    color: ${props => props.theme.colors.text.primary};
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text.primary};
  display: flex;
  align-items: center;
  gap: 8px;
`;

const FormGroup = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 32px;
  margin-bottom: 16px;
  width: 100%;
`;

const InputWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
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
  color: ${props => props.theme.colors.text.primary};
  min-width: 120px;
  width: 120px;
`;

const Input = styled.input`
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  font-size: 0.875rem;
  color: ${props => props.theme.colors.text.primary};
  background: white;
  width: 100%;
  
  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
  }

  &:disabled {
    background: #f9fafb;
    color: ${props => props.theme.colors.text.primary};
  }
`;

const GenderSelectContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  flex: 1;
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
  min-width: 100px;
  justify-content: center;

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
  color: ${props => props.theme.colors.text.primary};
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
    color: ${props => props.theme.colors.text.primary};
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

const SpinningIcon = styled(FiLoader)`
  animation: spin 3s linear infinite;
  
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-top: 16px;
`;

const StatCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 16px;
  border: 1px solid #E5E7EB;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text.primary};
`;

const StatLabel = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const ActivityList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ActivityGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ActivityDate = styled.div`
  font-size: 0.875rem;
  font-weight: 500;
  color: #6B7280;
  padding: 0.5rem 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  user-select: none;

  &:hover {
    color: #374151;
  }
`;

const ActivityItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 0.75rem;
  background: #F9FAFB;
  border-radius: 0.5rem;
  transition: background-color 0.2s;

  &:hover {
    background: #F3F4F6;
  }
`;

const ActivityIcon = styled.div`
  width: 2rem;
  height: 2rem;
  border-radius: 0.5rem;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6B7280;
  flex-shrink: 0;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
`;

const ActivityContent = styled.div`
  flex: 1;
  min-width: 0;
`;

const ActivityTitle = styled.div`
  font-weight: 500;
  color: #1F2937;
  margin-bottom: 0.25rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ActivityTime = styled.div`
  font-size: 0.75rem;
  color: #6B7280;
`;

const ShowMoreButton = styled.button`
  background: none;
  border: none;
  color: #3B82F6;
  font-size: 0.875rem;
  padding: 0.5rem;
  cursor: pointer;
  text-align: left;
  width: 100%;
  border-radius: 0.375rem;
  transition: background-color 0.2s;

  &:hover {
    background: #F3F4F6;
  }
`;

interface UserProfileData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  gender: string;
  profile_picture: string;
  last_password_change: string;
  username: string;
}

interface PerformanceStats {
  total_courses: number;
  completed_courses: number;
  total_quizzes: number;
  last_activity: string;
}

interface RecentActivity {
  id: string;
  type: string;
  description: string;
  timestamp: string;
  date: string;
  time: string;
}

interface UserProfileProps {
  onProfilePictureChange?: (url: string) => void;
}

const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const UserProfile: React.FC<UserProfileProps> = ({ onProfilePictureChange }) => {
  const [profileData, setProfileData] = useState<UserProfileData>({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    gender: '',
    profile_picture: '',
    last_password_change: '',
    username: ''
  });
  const [originalProfileData, setOriginalProfileData] = useState<UserProfileData>({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    gender: '',
    profile_picture: '',
    last_password_change: '',
    username: ''
  });
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingContact, setIsEditingContact] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null);
  const [basicInfoError, setBasicInfoError] = useState<string | null>(null);
  const [basicInfoSuccess, setBasicInfoSuccess] = useState<string | null>(null);
  const [contactError, setContactError] = useState<string | null>(null);
  const [contactSuccess, setContactSuccess] = useState<string | null>(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [passwordLength, setPasswordLength] = useState<boolean | null>(null);
  const [isUpdatingProfilePicture, setIsUpdatingProfilePicture] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState<boolean | null>(null);
  const [currentPasswordValid, setCurrentPasswordValid] = useState<boolean | null>(null);
  const [validatingCurrentPassword, setValidatingCurrentPassword] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [performanceStats, setPerformanceStats] = useState<PerformanceStats>({
    total_courses: 0,
    completed_courses: 0,
    total_quizzes: 0,
    last_activity: ''
  });
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [isLoadingStats, setIsLoadingStats] = useState(true);
  const [isLoadingActivities, setIsLoadingActivities] = useState(true);
  const [visibleDates, setVisibleDates] = useState<Record<string, boolean>>({});
  const [visibleItems, setVisibleItems] = useState<Record<string, number>>({});

  useEffect(() => {
    fetchProfileData();
    fetchPerformanceStats();
    fetchRecentActivities();
  }, []);

  const fetchProfileData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error) throw error;

      const profileData = {
        first_name: profile.first_name || '',
        last_name: profile.last_name || '',
        email: user.email || '',
        phone: profile.phone || '',
        gender: profile.gender || '',
        profile_picture: profile.profile_picture || '',
        last_password_change: profile.last_password_change || '',
        username: profile.username || ''
      };

      setProfileData(profileData);
      setOriginalProfileData(profileData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching profile:', error);
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setIsEditingContact(false);
    setIsEditingPassword(false);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setPasswordLength(null);
    setPasswordError(null);
    setPasswordSuccess(null);
  };

  const handleProfileUpdate = async () => {
    try {
      setIsUpdating(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Track changes for activity logging
      const changes: string[] = [];
      if (profileData.first_name !== originalProfileData.first_name) {
        changes.push(`Changed First Name from "${originalProfileData.first_name || 'Not Set'}" to "${profileData.first_name}"`);
      }
      if (profileData.last_name !== originalProfileData.last_name) {
        changes.push(`Changed Last Name from "${originalProfileData.last_name || 'Not Set'}" to "${profileData.last_name}"`);
      }
      if (profileData.username !== originalProfileData.username) {
        changes.push(`Changed Username from "${originalProfileData.username || 'Not Set'}" to "${profileData.username}"`);
      }
      if (profileData.gender !== originalProfileData.gender) {
        changes.push(profileData.gender ? 
          (originalProfileData.gender ? 
            `Changed Gender from "${capitalizeFirstLetter(originalProfileData.gender)}" to "${capitalizeFirstLetter(profileData.gender)}"` :
            `Set Gender to "${capitalizeFirstLetter(profileData.gender)}"`) : 
          'Removed Gender');
      }
      if (profileData.phone !== originalProfileData.phone) {
        changes.push(profileData.phone ? 
          (originalProfileData.phone ? 
            `Changed Phone from "${originalProfileData.phone}" to "${profileData.phone}"` :
            `Added Phone: "${profileData.phone}"`) : 
          'Removed Phone');
      }

      // Update profile
      const { error: updateError } = await supabase
        .from('profiles')
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

      // Log each change as a separate activity
      for (const change of changes) {
        let activityType = 'profile';
        if (change.includes('Username')) {
          activityType = 'username';
        } else if (change.includes('First Name') || change.includes('Last Name')) {
          activityType = 'name';
        } else if (change.includes('Profile Picture')) {
          activityType = 'profile_picture_change';
        } else if (change.includes('Phone')) {
          activityType = 'phone';
        } else if (change.includes('Gender')) {
          activityType = 'gender_change';
        }

        await supabase.rpc('log_profile_change', {
          p_user_id: user.id,
          p_type: activityType,
          p_description: change
        });
      }

      // Refresh profile data from server
      await fetchProfileData();

      if (isEditing) {
        setBasicInfoSuccess('Profile updated successfully');
        setIsEditing(false);
        setTimeout(() => setBasicInfoSuccess(null), 3000);
      }
      if (isEditingContact) {
        setContactSuccess('Profile updated successfully');
        setIsEditingContact(false);
        setTimeout(() => setContactSuccess(null), 3000);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      const errorMessage = 'Failed to update profile';
      if (isEditing) {
        setBasicInfoError(errorMessage);
        setTimeout(() => setBasicInfoError(null), 3000);
      }
      if (isEditingContact) {
        setContactError(errorMessage);
        setTimeout(() => setContactError(null), 3000);
      }
    } finally {
      setIsUpdating(false);
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

      if (updateError) {
        console.error('Password update error:', updateError);
        setPasswordError(updateError.message);
        return;
      }

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setPasswordError('User not found');
        return;
      }

      // Store the previous password change date before updating
      const previousPasswordChange = profileData.last_password_change || 'Never';

      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          last_password_change: new Date().toISOString()
        })
        .eq('user_id', user.id);

      if (profileError) {
        console.error('Profile update error:', profileError);
        setPasswordError('Failed to update profile');
        return;
      }

      // Log the password change with the previous date
      await supabase.rpc('log_profile_change', {
        p_user_id: user.id,
        p_type: 'password_change',
        p_description: 'Changed Password (Last changed: ' + (previousPasswordChange === 'Never' ? 'Never' : new Date(previousPasswordChange).toLocaleString()) + ')'
      });

      setPasswordSuccess('Password updated successfully');
      setIsEditingPassword(false);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => setPasswordSuccess(null), 500);
    } catch (error) {
      console.error('Error changing password:', error);
      setPasswordError(error instanceof Error ? error.message : 'Failed to change password');
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
      setIsUpdatingProfilePicture(true);
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
        .from('profiles')
        .update({ 
          profile_picture: publicUrl,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id);

      if (updateError) {
        console.error('Profile update error:', updateError);
        throw new Error(`Profile update failed: ${updateError.message}`);
      }

      // Log the profile picture change
      await supabase.rpc('log_profile_change', {
        p_user_id: user.id,
        p_type: 'profile_picture_change',
        p_description: profileData.profile_picture ? 
          'Changed Profile Picture' : 
          'Set Profile Picture for the first time'
      });

      // Update local state and notify parent component
      setProfileData(prev => ({ ...prev, profile_picture: publicUrl }));
      setIsProfileModalOpen(false);
      setPreviewImage(null);
      setSelectedFile(null);
      
      if (onProfilePictureChange) {
        onProfilePictureChange(publicUrl);
      }
    } catch (error) {
      console.error('Error updating profile picture:', error);
      setBasicInfoError(error instanceof Error ? error.message : 'Failed to update profile picture');
      setTimeout(() => setBasicInfoError(null), 3000);
    } finally {
      setIsUpdatingProfilePicture(false);
    }
  };

  const isPasswordFormValid = () => {
    return currentPassword.trim() !== '' && 
           newPassword.trim() !== '' && 
           confirmPassword.trim() !== '' &&
           passwordLength === true;
  };

  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewPassword(value);
    setPasswordLength(value.length >= 8);
    if (confirmPassword) {
      setPasswordsMatch(value === confirmPassword);
    }
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setConfirmPassword(value);
    if (newPassword) {
      setPasswordsMatch(value === newPassword);
    }
  };

  const isBasicInfoValid = () => {
    return profileData.first_name.trim() !== '' && 
           profileData.last_name.trim() !== '';
  };

  const handleModalClose = () => {
    setIsProfileModalOpen(false);
    setPreviewImage(null);
    setSelectedFile(null);
    setBasicInfoError(null);
    setBasicInfoSuccess(null);
    setContactError(null);
    setContactSuccess(null);
    setPasswordError(null);
    setPasswordSuccess(null);
  };

  const validateCurrentPassword = async (password: string) => {
    if (!password) {
      setCurrentPasswordValid(null);
      return;
    }

    setValidatingCurrentPassword(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: profileData.email,
        password: password
      });
      setCurrentPasswordValid(!error);
    } catch (error) {
      setCurrentPasswordValid(false);
    } finally {
      setValidatingCurrentPassword(false);
    }
  };

  const handleCurrentPasswordChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCurrentPassword(value);
    await validateCurrentPassword(value);
  };

  const fetchPerformanceStats = async () => {
    try {
      setIsLoadingStats(true);
      
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Fetch total courses enrolled
      const { count: totalCourses } = await supabase
        .from('user_courses')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id);

      // Fetch completed courses
      const { count: completedCourses } = await supabase
        .from('user_courses')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id)
        .eq('status', 'completed');

      // Fetch total quizzes taken
      const { count: totalQuizzes } = await supabase
        .from('user_quizzes')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id);

      // Get last activity
      const { data: lastActivity } = await supabase
        .from('user_activity')
        .select('created_at')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      setPerformanceStats({
        total_courses: totalCourses || 0,
        completed_courses: completedCourses || 0,
        total_quizzes: totalQuizzes || 0,
        last_activity: lastActivity?.created_at || ''
      });
    } catch (error) {
      console.error('Error fetching performance stats:', error);
    } finally {
      setIsLoadingStats(false);
    }
  };

  const fetchRecentActivities = async () => {
    try {
      setIsLoadingActivities(true);
      
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: activity, error } = await supabase
        .from('user_activity')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formattedActivities = activity.map(item => {
        const date = new Date(item.created_at);
        return {
          id: item.id,
          type: item.type,
          description: item.description,
          timestamp: date.toLocaleString(),
          date: date.toLocaleDateString(),
          time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
      });

      setRecentActivity(formattedActivities);
    } catch (error) {
      console.error('Error fetching recent activity:', error);
    } finally {
      setIsLoadingActivities(false);
    }
  };

  // Group activities by date
  const groupedActivities = React.useMemo(() => {
    return recentActivity.reduce((groups, activity) => {
      const date = activity.date;
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(activity);
      return groups;
    }, {} as Record<string, typeof recentActivity>);
  }, [recentActivity]);

  // Initialize visible dates when activities are loaded
  React.useEffect(() => {
    const dates = Object.keys(groupedActivities);
    const initialVisibility = dates.reduce((acc, date) => {
      acc[date] = false;
      return acc;
    }, {} as Record<string, boolean>);
    setVisibleDates(initialVisibility);
  }, [groupedActivities]);

  // Initialize visible items when activities are loaded
  React.useEffect(() => {
    const dates = Object.keys(groupedActivities);
    const initialVisibility = dates.reduce((acc, date) => {
      acc[date] = 5; // Show first 5 items initially
      return acc;
    }, {} as Record<string, number>);
    setVisibleItems(initialVisibility);
  }, [groupedActivities]);

  const toggleDateVisibility = (date: string) => {
    setVisibleDates(prev => ({
      ...prev,
      [date]: !prev[date]
    }));
  };

  const showMoreItems = (date: string) => {
    setVisibleItems(prev => ({
      ...prev,
      [date]: prev[date] + 5
    }));
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'course_start':
        return <FaUserPlus />;
      case 'course_complete':
        return <FaUserEdit />;
      case 'quiz_taken':
        return <FaUserCog />;
      case 'profile_picture_change':
        return <FaUserCircle />;
      default:
        return <FaHistory />;
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Container>
      <LeftColumn>
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
                  <Input
                    type="text"
                    pattern="[a-zA-Z0-9._-]*"
                    value={profileData.username}
                    onChange={(e) => {
                      if (e.target.validity.valid) {
                        setProfileData({ ...profileData, username: e.target.value });
                      }
                    }}
                    placeholder="Enter username"
                  />
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
                    disabled={!isBasicInfoValid() || isUpdating}
                  >
                    {isUpdating ? (
                      <>
                        <SpinningIcon size={16} />
                        Updating...
                      </>
                    ) : (
                      'Save Changes'
                    )}
                  </SaveButton>
                </ButtonGroup>
                {basicInfoError && <ErrorMessage>{basicInfoError}</ErrorMessage>}
                {basicInfoSuccess && <SuccessMessage>{basicInfoSuccess}</SuccessMessage>}
              </>
            ) : (
              <>
                <FormGroup>
                  <Label>Username</Label>
                  <div>{profileData.username || '-'}</div>
                </FormGroup>
                <FormGroup>
                  <Label>First Name</Label>
                  <div>{profileData.first_name || '-'}</div>
                </FormGroup>
                <FormGroup>
                  <Label>Last Name</Label>
                  <div>{profileData.last_name || '-'}</div>
                </FormGroup>
                <FormGroup>
                  <Label>Gender</Label>
                  <div>{profileData.gender ? capitalizeFirstLetter(profileData.gender) : '-'}</div>
                </FormGroup>
                <div style={{ marginTop: '16px' }}>
                  <EditButton onClick={() => {
                    setIsEditing(true);
                    setIsEditingContact(false);
                    setIsEditingPassword(false);
                  }}>
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
              <ProfileImage 
                src={profileData.profile_picture} 
                alt={`${profileData.first_name}'s profile`}
                onError={(e) => {
                  const target = e.currentTarget;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    const svg = parent.querySelector('svg');
                    if (svg) {
                      svg.style.display = 'block';
                    }
                  }
                }}
              />
            ) : (
              <FiUser size={80} color="#6b7280" />
            )}
            {isEditing && (
              <UploadButton onClick={() => setIsProfileModalOpen(true)}>
                <FiEdit2 size={16} />
              </UploadButton>
            )}
          </ProfilePicture>
        </ProfileSection>

        <Section>
          <SectionTitle>
            Contact Info
          </SectionTitle>
          {isEditingContact ? (
            <>
              <FormGroup>
                <Label>Email</Label>
                <InputWrapper>
                  <Input
                    value={profileData.email}
                    disabled
                    style={{ 
                      backgroundColor: '#f9fafb',
                      color: '#6b7280'
                    }}
                  />
                  <HelperText>
                    Email cannot be changed
                  </HelperText>
                </InputWrapper>
              </FormGroup>
              <FormGroup>
                <Label>Phone</Label>
                <InputWrapper>
                  <Input
                    type="tel"
                    pattern="[0-9]*"
                    value={profileData.phone}
                    onChange={(e) => {
                      if (e.target.validity.valid) {
                        setProfileData({ ...profileData, phone: e.target.value });
                      }
                    }}
                    placeholder="Enter your phone number"
                  />
                </InputWrapper>
              </FormGroup>
              <ButtonGroup>
                <ChooseImageButton
                  type="button"
                  onClick={handleCancel}
                >
                  Cancel
                </ChooseImageButton>
                <SaveButton onClick={handleProfileUpdate}>
                  {isUpdating ? (
                    <>
                      <SpinningIcon size={16} />
                      Updating...
                    </>
                  ) : (
                    'Save Changes'
                  )}
                </SaveButton>
              </ButtonGroup>
              {contactError && <ErrorMessage>{contactError}</ErrorMessage>}
              {contactSuccess && <SuccessMessage>{contactSuccess}</SuccessMessage>}
            </>
          ) : (
            <>
              <FormGroup>
                <Label>Email</Label>
                <div>{profileData.email}</div>
              </FormGroup>
              <FormGroup>
                <Label>Phone</Label>
                <div>{profileData.phone || '-'}</div>
              </FormGroup>
              <div style={{ marginTop: '16px' }}>
                <EditButton onClick={() => {
                  setIsEditingContact(true);
                  setIsEditing(false);
                  setIsEditingPassword(false);
                }}>
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
              <PasswordColumn>
                <Label>
                  Current Password
                  <RequiredAsterisk>*</RequiredAsterisk>
                </Label>
                <PasswordInputContainer>
                  <PasswordInput
                    type={showCurrentPassword ? "text" : "password"}
                    value={currentPassword}
                    onChange={handleCurrentPasswordChange}
                    placeholder="Enter your current password"
                  />
                  <ViewPasswordButton
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  >
                    {showCurrentPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                  </ViewPasswordButton>
                </PasswordInputContainer>
                {validatingCurrentPassword ? (
                  <PasswordMatchIndicator $matches={true}>
                    <FiLoader size={14} />
                    Verifying...
                  </PasswordMatchIndicator>
                ) : currentPasswordValid !== null && (
                  <PasswordMatchIndicator $matches={currentPasswordValid}>
                    {currentPasswordValid ? (
                      <>
                        <FiCheck size={14} />
                        Current password is correct
                      </>
                    ) : (
                      <>
                        <FiX size={14} />
                        Current password is incorrect
                      </>
                    )}
                  </PasswordMatchIndicator>
                )}
              </PasswordColumn>

              <PasswordRow>
                <PasswordColumn>
                  <Label>
                    New Password
                    <RequiredAsterisk>*</RequiredAsterisk>
                  </Label>
                  <PasswordInputContainer>
                    <PasswordInput
                      type={showNewPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={handleNewPasswordChange}
                      placeholder="Enter your new password"
                    />
                    <ViewPasswordButton
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                    </ViewPasswordButton>
                  </PasswordInputContainer>
                  <PasswordValidations>
                    {newPassword && (
                      <PasswordMatchIndicator $matches={passwordLength === true}>
                        {passwordLength ? (
                          <>
                            <FiCheck size={14} />
                            Password length is valid
                          </>
                        ) : (
                          <>
                            <FiX size={14} />
                            Password must be at least 8 characters
                          </>
                        )}
                      </PasswordMatchIndicator>
                    )}
                    {passwordsMatch !== null && (
                      <PasswordMatchIndicator $matches={passwordsMatch}>
                        {passwordsMatch ? (
                          <>
                            <FiCheck size={14} />
                            Passwords match
                          </>
                        ) : (
                          <>
                            <FiX size={14} />
                            Passwords do not match
                          </>
                        )}
                      </PasswordMatchIndicator>
                    )}
                  </PasswordValidations>
                </PasswordColumn>

                <PasswordColumn>
                  <Label>
                    Confirm New Password
                    <RequiredAsterisk>*</RequiredAsterisk>
                  </Label>
                  <PasswordInputContainer>
                    <PasswordInput
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={handleConfirmPasswordChange}
                      placeholder="Confirm your new password"
                    />
                    <ViewPasswordButton
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
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
                  disabled={!passwordsMatch || !currentPasswordValid || !passwordLength}
                >
                  {isUpdating ? (
                    <>
                      <SpinningIcon size={16} />
                      Updating...
                    </>
                  ) : (
                    'Save Changes'
                  )}
                </SaveButton>
              </ButtonGroup>
            </PasswordChangeForm>
          ) : (
            <>
              <FormGroup>
                <Label>Last Changed</Label>
                <div>
                  {profileData.last_password_change
                    ? new Date(profileData.last_password_change).toLocaleDateString()
                    : 'Never'}
                </div>
              </FormGroup>
              <div style={{ marginTop: '16px' }}>
                <EditButton onClick={() => {
                  setIsEditingPassword(true);
                  setIsEditing(false);
                  setIsEditingContact(false);
                }}>
                  <FiEdit2 />
                  Change Password
                </EditButton>
              </div>
              {passwordSuccess && <SuccessMessage>{passwordSuccess}</SuccessMessage>}
            </>
          )}
        </Section>
      </LeftColumn>

      <RightColumn>
        <Section>
          <SectionTitle>
            <FiActivity />
            Performance Stats
          </SectionTitle>
          {isLoadingStats ? (
            <LoadingSpinner />
          ) : (
            <StatsGrid>
              <StatCard>
                <StatValue>{performanceStats.total_courses}</StatValue>
                <StatLabel>
                  <FiUsers />
                  Total Courses
                </StatLabel>
              </StatCard>
              <StatCard>
                <StatValue>{performanceStats.completed_courses}</StatValue>
                <StatLabel>
                  <FiUser />
                  Completed Courses
                </StatLabel>
              </StatCard>
              <StatCard>
                <StatValue>{performanceStats.total_quizzes}</StatValue>
                <StatLabel>
                  <FiShield />
                  Quizzes Taken
                </StatLabel>
              </StatCard>
              <StatCard>
                <StatValue>
                  {performanceStats.last_activity ? new Date(performanceStats.last_activity).toLocaleDateString() : 'N/A'}
                </StatValue>
                <StatLabel>
                  <FiClock />
                  Last Activity
                </StatLabel>
              </StatCard>
            </StatsGrid>
          )}
        </Section>

        <Section>
          <SectionTitle>
            <FaHistory />
            Recent Activities
          </SectionTitle>
          {isLoadingActivities ? (
            <LoadingSpinner />
          ) : recentActivity.length === 0 ? (
            <div style={{ padding: '1rem', color: '#6B7280', textAlign: 'center' }}>
              No recent activities found
            </div>
          ) : (
            <ActivityList>
              {Object.entries(groupedActivities).map(([date, activities]) => (
                <ActivityGroup key={date}>
                  <ActivityDate onClick={() => toggleDateVisibility(date)}>
                    {date}
                  </ActivityDate>
                  {visibleDates[date] && activities
                    .slice(0, visibleItems[date])
                    .map((activity) => (
                      <ActivityItem key={activity.id}>
                        <ActivityIcon>
                          {getActivityIcon(activity.type)}
                        </ActivityIcon>
                        <ActivityContent>
                          <ActivityTitle>{activity.description}</ActivityTitle>
                          <ActivityTime>{activity.time}</ActivityTime>
                        </ActivityContent>
                      </ActivityItem>
                    ))}
                  {visibleDates[date] && activities.length > visibleItems[date] && (
                    <ShowMoreButton onClick={() => showMoreItems(date)}>
                      Show more activities
                    </ShowMoreButton>
                  )}
                </ActivityGroup>
              ))}
            </ActivityList>
          )}
        </Section>
      </RightColumn>

      <ProfileModal $isOpen={isProfileModalOpen}>
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
              disabled={isUpdatingProfilePicture}
            >
              Choose Image
            </ChooseImageButton>
            <SaveButton
              onClick={handleProfilePictureUpload}
              disabled={!selectedFile || isUpdatingProfilePicture}
            >
              {isUpdatingProfilePicture ? (
                <SpinningIcon size={16} />
              ) : (
                'Update'
              )}
            </SaveButton>
          </ButtonGroup>
        </ProfileModalContent>
      </ProfileModal>
    </Container>
  );
};

export default UserProfile; 