import React, { useState, useEffect, useCallback, useRef } from 'react';
import styled from 'styled-components';
import { supabase } from '@/lib/supabase';
import { FiEdit2, FiSave, FiX, FiLock, FiMail, FiPhone, FiUser, FiCamera, FiEye, FiEyeOff, FiCheck, FiLoader, FiActivity, FiClock, FiUsers, FiShield } from 'react-icons/fi';
import { FaMale, FaFemale, FaTransgender, FaQuestion, FaHistory, FaUserPlus, FaUserEdit, FaUserMinus, FaUserCog, FaShieldAlt, FaKey } from 'react-icons/fa';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { countries } from '@/lib/constants/countries';
import { Modal } from '@/components/ui/Modal';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.5rem;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  
  @media (max-width: 1227px) {
    grid-template-columns: 1fr;
  }
  
  @media (max-width: 1024px) {
    padding: 1.25rem;
    gap: 20px;
  }
  
  @media (max-width: 884px) {
    padding: 1rem;
    gap: 16px;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 1rem;
    gap: 16px;
  }
  
  @media (max-width: 480px) {
    padding: 0.75rem;
    gap: 12px;
  }
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  
  @media (max-width: 884px) {
    gap: 16px;
  }
`;

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  
  @media (max-width: 884px) {
    gap: 16px;
  }
`;

const Section = styled.div`
  background: white;
  border-radius: 12px;
  padding: 10px 24px 24px 24px;
  border: 1px solid #E5E7EB;
  
  @media (max-width: 884px) {
    padding: 10px 20px 20px 20px;
  }
  
  @media (max-width: 768px) {
    padding: 10px 20px 20px 20px;
  }
  
  @media (max-width: 480px) {
    padding: 8px 16px 16px 16px;
  }
`;

const ProfileSection = styled(Section)`
  display: flex;
  gap: 48px;
  align-items: flex-start;
  
  @media (max-width: 884px) {
    flex-direction: column-reverse;
    align-items: flex-start;
    gap: 24px;
  }
  
  @media (max-width: 640px) {
    flex-direction: column-reverse;
    align-items: flex-start;
    gap: 24px;
  }
`;

const ProfileInfo = styled.div`
  flex: 1;
  
  @media (max-width: 884px) {
    width: 100%;
  }
  
  @media (max-width: 640px) {
    width: 100%;
  }
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
  flex-shrink: 0;
  margin-left: auto;
  align-self: center;
  
  @media (max-width: 884px) {
    margin-left: 0;
    align-self: flex-start;
    width: 160px;
    height: 160px;
  }
  
  @media (max-width: 768px) {
    width: 180px;
    height: 180px;
  }
  
  @media (max-width: 640px) {
    margin-left: 0;
    align-self: flex-start;
    width: 150px;
    height: 150px;
  }
  
  @media (max-width: 480px) {
    width: 120px;
    height: 120px;
  }
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
  
  @media (max-width: 884px) {
    font-size: 1.125rem;
  }
  
  @media (max-width: 768px) {
    font-size: 1.125rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const FormGroup = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 32px;
  margin-bottom: 16px;
  
  @media (max-width: 884px) {
    flex-direction: column;
    gap: 8px;
  }
  
  @media (max-width: 640px) {
    flex-direction: column;
    gap: 8px;
  }
  
  @media (max-width: 480px) {
    margin-bottom: 12px;
  }
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
  font-size: 0.875rem;
  font-weight: 500;
  color: ${props => props.theme.colors.text.primary};
  min-width: 120px;
  
  @media (max-width: 884px) {
    min-width: 100px;
  }
  
  @media (max-width: 640px) {
    min-width: 100px;
  }
  
  @media (max-width: 480px) {
    min-width: unset;
    width: 100%;
  }
`;

const Input = styled.input`
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  font-size: 0.875rem;
  color: ${props => props.theme.colors.text.primary};
  background: white;
  
  &:focus {
    outline: none;
    border-color: #3b82f6;
  }

  &:disabled {
    background: #f9fafb;
    color: ${props => props.theme.colors.text.primary};
  }
  
  @media (max-width: 480px) {
    padding: 6px 10px;
    font-size: 0.75rem;
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
  }
`;

const Button = styled.button`
  padding: 0.875rem;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  transition: all 0.2s ease;
  cursor: pointer;
  flex: 1;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  &:active {
    transform: scale(0.98);
  }
`;

const CancelButton = styled(Button)`
  background: transparent;
  border: 1.5px solid ${props => props.theme.colors.border};
  color: ${props => props.theme.colors.text.primary};

  &:hover:not(:disabled) {
    background: ${props => props.theme.colors.background.secondary};
    border-color: ${props => props.theme.colors.text.primary};
  }

  &:disabled {
    background: transparent;
    border-color: ${props => props.theme.colors.border};
    color: ${props => props.theme.colors.text.secondary};
  }
`;

const SubmitButton = styled(Button)`
  background-color: ${props => props.theme.colors.primary};
  border: none;
  color: white;

  &:hover:not(:disabled) {
    background-color: ${props => props.theme.colors.primaryDark};
  }

  &:disabled {
    background: ${props => props.theme.colors.disabled};
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
  
  @media (max-width: 884px) {
    gap: 16px;
  }
  
  @media (max-width: 640px) {
    gap: 16px;
  }
  
  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }
`;

const InfoLabel = styled.span<InfoLabelProps>`
  font-weight: 500;
  font-size: 0.875rem;
  color: ${props => props.theme.colors.text.primary};
  min-width: 120px;
  display: ${props => props.$isEditing ? 'none' : 'block'};
  
  @media (max-width: 884px) {
    min-width: 100px;
  }
  
  @media (max-width: 640px) {
    min-width: 100px;
  }
  
  @media (max-width: 480px) {
    min-width: unset;
    width: 100%;
  }
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
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 1rem;
`;

const ModalButton = styled.button`
font-size: 0.875rem;
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

const CancelButtonV2 = styled(ModalButton)`
  font-size: 0.875rem;
  background: transparent;
  border: 1.5px solid ${props => props.theme.colors.border};
  color: ${props => props.theme.colors.text.primary};

  &:hover:not(:disabled) {
    background: ${props => props.theme.colors.background.secondary};
    border-color: ${props => props.theme.colors.text.primary};
  }

  &:disabled {
    background: transparent;
    border-color: ${props => props.theme.colors.border};
    color: ${props => props.theme.colors.text.secondary};
  }
  
  @media (max-width: 480px) {
    width: 100%;
  }
`;

const SubmitButtonV2 = styled(ModalButton)`
  font-size: 0.875rem;
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
  
  @media (max-width: 480px) {
    width: 100%;
  }
`;

const ImagePreview = styled.div`
  width: 100%;
  aspect-ratio: 1;
  margin: 0 auto 24px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 50%;
  background-color: #f3f4f6;
  
  @media (max-width: 480px) {
    margin-bottom: 16px;
  }
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
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
  
  @media (max-width: 640px) {
    flex-direction: column;
    gap: 12px;
  }
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
  
  @media (max-width: 1227px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 884px) {
    grid-template-columns: 1fr;
    gap: 12px;
  }
  
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 12px;
  }
`;

const StatCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 16px;
  border: 1px solid #E5E7EB;
  display: flex;
  flex-direction: column;
  gap: 8px;
  
  @media (max-width: 884px) {
    padding: 14px;
  }
  
  @media (max-width: 480px) {
    padding: 12px;
  }
`;

const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text.primary};
  
  @media (max-width: 884px) {
    font-size: 1.25rem;
  }
`;

const StatLabel = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
  display: flex;
  align-items: center;
  gap: 6px;
  
  @media (max-width: 884px) {
    font-size: 0.8125rem;
    gap: 4px;
  }
`;

const AccountInfoCard = styled(StatCard)`
  grid-column: 1 / -1;
  padding: 20px;
  
  @media (max-width: 884px) {
    padding: 16px;
  }
`;

const AccountInfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 12px;
  }
`;

const AccountInfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const AccountInfoLabel = styled.div`
  font-size: 0.75rem;
  color: #6b7280;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const AccountInfoValue = styled.div`
  font-size: 0.875rem;
  color: ${props => props.theme.colors.text.primary};
  font-weight: 500;
`;

const PhoneInputWrapper = styled.div`
  position: relative;
  z-index: 1000;

  .react-tel-input {
    .form-control {
      width: 100%;
      padding: 8px 12px 8px 48px;
      border: 1px solid #e5e7eb;
      border-radius: 6px;
      font-size: 0.875rem;
      background: white;
      color: ${props => props.theme.colors.text.primary};
      transition: all 0.2s ease;

      &:focus {
        outline: none;
        border-color: #3b82f6;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
      }
    }

    .flag-dropdown {
      border: 1px solid #e5e7eb;
      border-radius: 6px 0 0 6px;
      background-color: white;
    }

    .selected-flag {
      border-radius: 6px 0 0 6px;
      &:hover, &:focus {
        background-color: #f3f4f6;
      }
    }

    .country-list {
      position: absolute;
      z-index: 1001;
      max-height: 200px;
      overflow-y: auto;
      width: 300px;
      margin: 0;
      padding: 0;
      list-style: none;
      background-color: white;
      border: 1px solid #e5e7eb;
      border-radius: 6px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }

    .country {
      padding: 0.5rem 1rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;

      &:hover {
        background-color: #f3f4f6;
      }

      &.highlight {
        background-color: #f3f4f6;
      }
    }

    .search-box {
      padding: 0.75rem;
      border-bottom: 1px solid #e5e7eb;
    }
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  font-size: 0.875rem;
  background-color: white;
  color: ${props => props.theme.colors.text.primary};
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

// Add a new styled component for the credentials card
const CredentialsCard = styled(StatCard)`
  grid-column: 1 / -1;
  padding: 20px;
  
  @media (max-width: 884px) {
    padding: 16px;
  }
`;

// Add these styled components after the other styled components and before the interfaces
const UsernameValidationContainer = styled.div`
  min-height: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
  
  &:empty {
    display: none;
  }
`;

const ValidationMessage = styled.div<{ $type: 'error' | 'success' | 'loading' | 'info' }>`
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  gap: 4px;
  color: ${props => 
    props.$type === 'error' ? '#dc2626' :  // red-600
    props.$type === 'success' ? '#059669' : // green-600
    props.$type === 'info' ? '#6B7280' :    // gray-500 for info/current username
    '#6B7280'  // gray-500 for loading
  };
  min-height: 0;
  position: relative;
  z-index: 1;
  background: white;
`;

interface Profile {
  id: string;
  first_name: string;
  last_name: string;
  gender: string;
  profile_picture_url: string;
  last_password_change: string;
  role: string;
  created_at: string;
  updated_at: string;
  location: string;
  phone_number: string;
  email: string;
  username: string;
}

interface AdminProfileProps {
  onProfilePictureChange?: (url: string) => void;
  onModalStateChange?: (isOpen: boolean) => void;
}

const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const AdminProfile: React.FC<AdminProfileProps> = ({ onProfilePictureChange, onModalStateChange }) => {
  const [originalProfileData, setOriginalProfileData] = useState<Profile>({
    id: '',
    first_name: '',
    last_name: '',
    gender: '',
    profile_picture_url: '',
    last_password_change: '',
    role: '',
    created_at: '',
    updated_at: '',
    location: '',
    phone_number: '',
    email: '',
    username: ''
  });
  const [profileData, setProfileData] = useState<Profile>({
    id: '',
    first_name: '',
    last_name: '',
    gender: '',
    profile_picture_url: '',
    last_password_change: '',
    role: '',
    created_at: '',
    updated_at: '',
    location: '',
    phone_number: '',
    email: '',
    username: ''
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
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState<boolean | null>(null);
  const [currentPasswordValid, setCurrentPasswordValid] = useState<boolean | null>(null);
  const [validatingCurrentPassword, setValidatingCurrentPassword] = useState(false);
  const [passwordLength, setPasswordLength] = useState<boolean | null>(null);
  const [isUpdatingProfilePicture, setIsUpdatingProfilePicture] = useState(false);
  const [isEditingAccount, setIsEditingAccount] = useState(false);
  const [accountError, setAccountError] = useState<string | null>(null);
  const [accountSuccess, setAccountSuccess] = useState<string | null>(null);
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [checkingUsername, setCheckingUsername] = useState(false);
  const [usernameExists, setUsernameExists] = useState<boolean | null>(null);
  const [isUsernameFocused, setIsUsernameFocused] = useState(false);
  const usernameCheckTimeout = useRef<NodeJS.Timeout>();
  const [isValidatingPassword, setIsValidatingPassword] = useState(false);
  const validationTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;

      const profileData = {
        id: user.id,
        first_name: profile.first_name || '',
        last_name: profile.last_name || '',
        gender: profile.gender || '',
        profile_picture_url: profile.profile_picture_url || '',
        last_password_change: profile.last_password_change || '',
        role: profile.role || '',
        created_at: profile.created_at || '',
        updated_at: profile.updated_at || '',
        location: profile.location || '',
        phone_number: profile.phone_number || '',
        email: user.email || '',
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
    setProfileData(originalProfileData);
    setIsEditing(false);
    setIsEditingContact(false);
    setIsEditingPassword(false);
    setIsEditingAccount(false);
    // Reset password form states
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setShowCurrentPassword(false);
    setShowNewPassword(false);
    setShowConfirmPassword(false);
    setPasswordsMatch(null);
    setCurrentPasswordValid(null);
    setPasswordLength(null);
    setPasswordError(null);
    setIsValidatingPassword(false);
    // Clear any pending validation
    if (validationTimeoutRef.current) {
      clearTimeout(validationTimeoutRef.current);
    }
    // Reset username validation states
    setUsernameError(null);
    setCheckingUsername(false);
    setUsernameExists(null);
    setIsUsernameFocused(false);
    if (usernameCheckTimeout.current) {
      clearTimeout(usernameCheckTimeout.current);
    }
  };

  const handleProfileUpdate = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Update profile
      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          first_name: profileData.first_name,
          last_name: profileData.last_name,
          gender: profileData.gender,
          location: profileData.location,
          phone_number: profileData.phone_number,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

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

    // Validate all required fields first
    if (!currentPassword.trim()) {
      setPasswordError('Current password is required');
      return;
    }

    if (!newPassword.trim()) {
      setPasswordError('New password is required');
      return;
    }

    if (!confirmPassword.trim()) {
      setPasswordError('Please confirm your new password');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError('New passwords do not match');
      return;
    }

    if (newPassword.length < 8) {
      setPasswordError('New password must be at least 8 characters long');
      return;
    }

    // Don't allow the same password
    if (currentPassword === newPassword) {
      setPasswordError('New password must be different from current password');
      return;
    }

    try {
      // Get user from auth
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError) {
        console.error('Error getting user:', userError);
        setPasswordError('Failed to get user information');
        return;
      }

      if (!user || !user.email) {
        setPasswordError('User not found or email is missing');
        return;
      }

      // First verify the current password
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: currentPassword
      });

      if (signInError) {
        console.error('Sign in error:', signInError);
        if (signInError.message.includes('Invalid login credentials')) {
          setPasswordError('Current password is incorrect');
        } else {
          setPasswordError('Failed to verify current password');
        }
        return;
      }

      // Update the password
      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (updateError) {
        console.error('Password update error:', updateError);
        if (updateError.message.includes('password')) {
          setPasswordError('Password does not meet requirements');
        } else {
          setPasswordError(updateError.message || 'Failed to update password');
        }
        return;
      }

      // Store the previous password change date before updating
      const previousPasswordChange = profileData.last_password_change || 'Never';

      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          last_password_change: new Date().toISOString()
        })
        .eq('id', user.id);

      if (profileError) {
        console.error('Profile update error:', profileError);
        setPasswordError('Failed to update profile');
        return;
      }

      // Log the password change with the previous date
      const { error: logError } = await supabase.rpc('log_profile_change', {
        p_user_id: user.id,
        p_type: 'password_change',
        p_description: 'Changed Password (Last changed: ' + (previousPasswordChange === 'Never' ? 'Never' : new Date(previousPasswordChange).toLocaleString()) + ')'
      });

      if (logError) {
        console.error('Log error:', logError);
        // Don't return here, as the password was changed successfully
      }

      // Update the profile data with new last_password_change
      const newLastPasswordChange = new Date().toISOString();
      setProfileData(prev => ({
        ...prev,
        last_password_change: newLastPasswordChange
      }));
      setOriginalProfileData(prev => ({
        ...prev,
        last_password_change: newLastPasswordChange
      }));

      // Reset form and show success
      setPasswordSuccess('Password updated successfully');
      setIsEditingPassword(false);
      
      // Clear success message after 3 seconds
      setTimeout(() => setPasswordSuccess(null), 3000);
    } catch (error) {
      console.error('Error changing password:', error);
      if (error instanceof Error) {
        if (error.message.includes('network')) {
          setPasswordError('Network error. Please check your connection.');
        } else if (error.message.includes('timeout')) {
          setPasswordError('Request timed out. Please try again.');
        } else {
          setPasswordError(error.message || 'Failed to change password');
        }
      } else {
        setPasswordError('An unexpected error occurred');
      }
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
    if (isProfileModalOpen && profileData.profile_picture_url) {
      setPreviewImage(profileData.profile_picture_url);
    } else if (isProfileModalOpen) {
      setPreviewImage(null);
    }
  }, [isProfileModalOpen, profileData.profile_picture_url]);

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
      if (profileData.profile_picture_url) {
        const existingPath = profileData.profile_picture_url.split('/').pop();
        if (existingPath) {
          await supabase.storage
            .from('profile-images')
            .remove([`${user.id}/${existingPath}`]);
        }
      }

      // Upload the new profile picture
      const { error: uploadError, data } = await supabase.storage
        .from('profile-images')
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
        .from('profile-images')
        .getPublicUrl(filePath);

      // Update the user profile with the new picture URL
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ 
          profile_picture_url: publicUrl,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (updateError) {
        console.error('Profile update error:', updateError);
        throw new Error(`Profile update failed: ${updateError.message}`);
      }

      // Log the profile picture change with more detail
      await supabase.rpc('log_profile_change', {
        p_user_id: user.id,
        p_type: 'profile_picture_change',
        p_description: profileData.profile_picture_url ? 
          'Changed Profile Picture' : 
          'Set Profile Picture for the first time'
      });

      // Update local state
      setProfileData(prev => ({ ...prev, profile_picture_url: publicUrl }));
      setIsProfileModalOpen(false);
      setPreviewImage(null);
      setSelectedFile(null);
      
      // Notify parent component of the change
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

  const validateCurrentPassword = async (password: string) => {
    // Clear any existing timeout
    if (validationTimeoutRef.current) {
      clearTimeout(validationTimeoutRef.current);
    }

    // Don't validate empty password
    if (!password) {
      setCurrentPasswordValid(null);
      return;
    }

    // Don't validate if password is too short
    if (password.length < 6) {
      setCurrentPasswordValid(false);
      return;
    }

    // Set validating state
    setIsValidatingPassword(true);

    // Debounce the validation
    validationTimeoutRef.current = setTimeout(async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user || !user.email) {
          setCurrentPasswordValid(false);
          return;
        }

        // Only validate if we have a user and email
        const { error } = await supabase.auth.signInWithPassword({
          email: user.email,
          password: password
        });

        setCurrentPasswordValid(!error);
      } catch (error) {
        console.error('Password validation error:', error);
        setCurrentPasswordValid(false);
      } finally {
        setIsValidatingPassword(false);
      }
    }, 500);
  };

  const handleCurrentPasswordChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCurrentPassword(value);
    
    // Only validate if we're not already validating
    if (!isValidatingPassword) {
      await validateCurrentPassword(value);
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
    onModalStateChange?.(false);
  };

  // Update modal state when it changes
  useEffect(() => {
    onModalStateChange?.(isProfileModalOpen);
  }, [isProfileModalOpen, onModalStateChange]);

  const handleAccountUpdate = async () => {
    if (usernameError || checkingUsername || usernameExists) {
      return;
    }

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Update profile
      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          username: profileData.username,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (updateError) throw updateError;

      // Update original profile data to match new username
      setOriginalProfileData(prev => ({ ...prev, username: profileData.username }));
      
      // Reset all validation states
      setUsernameError(null);
      setCheckingUsername(false);
      setUsernameExists(null);
      setIsUsernameFocused(false);
      if (usernameCheckTimeout.current) {
        clearTimeout(usernameCheckTimeout.current);
      }

      setAccountSuccess('Username updated successfully');
      setIsEditingAccount(false);
      setTimeout(() => setAccountSuccess(null), 500);
    } catch (error) {
      console.error('Error updating account info:', error);
      setAccountError('Failed to update username');
    }
  };

  const validateUsername = (value: string) => {
    // Clear any existing timeout
    if (usernameCheckTimeout.current) {
      clearTimeout(usernameCheckTimeout.current);
    }

    // Allow empty value for backspace
    if (!value) {
      setUsernameError(null);
      setUsernameExists(null);
      return;
    }

    // Validate format immediately
    if (value.length < 3) {
      setUsernameError('Username must be at least 3 characters long');
      setUsernameExists(null);
      return;
    }

    if (value.length > 20) {
      setUsernameError('Username must be less than 20 characters');
      setUsernameExists(null);
      return;
    }

    if (!/^[a-zA-Z0-9._]+$/.test(value)) {
      setUsernameError('Username can only contain letters, numbers, dots, and underscores');
      setUsernameExists(null);
      return;
    }

    // If username is the same as current user's username, it's valid
    if (value === profileData.username) {
      setUsernameExists(false);
      setUsernameError(null);
      return;
    }

    setUsernameError(null);
    setCheckingUsername(true);

    // Check username availability after a delay
    usernameCheckTimeout.current = setTimeout(async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        // Use the check_username_exists RPC function
        const { data, error } = await supabase
          .rpc('check_username_exists', { 
            username_to_check: value,
            current_user_id: user.id 
          });

        if (error) {
          // Handle rate limit error specifically
          if (error.message.includes('Rate limit exceeded')) {
            const waitTime = error.message.match(/\d+/)?.[0] || '60';
            setUsernameError(`Too many checks! Please wait ${waitTime} seconds.`);
            setUsernameExists(null);
            return;
          }
          
          // Handle other errors with more concise messages
          console.error('Error checking username:', error);
          if (error.message.includes('network')) {
            setUsernameError('Network error. Please check your connection.');
          } else if (error.message.includes('timeout')) {
            setUsernameError('Request timed out. Please try again.');
          } else {
            setUsernameError('Too many attempts. Please try again in a few seconds.');
          }
          setUsernameExists(null);
          return;
        }

        // The RPC function returns a boolean indicating if username exists
        setUsernameExists(data);
        if (data) {
          setUsernameError('This username is already taken');
        }
      } catch (err) {
        console.error('Error checking username:', err);
        setUsernameExists(null);
        setUsernameError('Unable to check username. Please try again.');
      } finally {
        setCheckingUsername(false);
      }
    }, 500);
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
                  <CancelButtonV2 onClick={handleCancel}>
                    Cancel
                  </CancelButtonV2>
                  <SubmitButtonV2 onClick={handleProfileUpdate} disabled={!isBasicInfoValid()}>
                    Save Changes
                  </SubmitButtonV2>
                </ButtonGroup>
                {basicInfoError && <ErrorMessage>{basicInfoError}</ErrorMessage>}
                {basicInfoSuccess && <SuccessMessage>{basicInfoSuccess}</SuccessMessage>}
              </>
            ) : (
              <>
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
            {profileData.profile_picture_url ? (
              <ProfileImage src={profileData.profile_picture_url} alt="Profile" />
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
                <Label>Location</Label>
                <InputWrapper>
                  <Select
                    value={profileData.location}
                    onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                  >
                    <option value="">Select your country</option>
                    {countries.map(country => (
                      <option key={country.code} value={country.name}>
                        {country.name}
                      </option>
                    ))}
                  </Select>
                </InputWrapper>
              </FormGroup>
              <FormGroup>
                <Label>Phone Number</Label>
                <PhoneInputWrapper>
                  <PhoneInput
                    country={countries.find(c => c.name === profileData.location)?.code?.toLowerCase() || 'us'}
                    value={profileData.phone_number}
                    onChange={(phone: string) => {
                      const cleanedPhone = phone.replace(/[^\d+]/g, '');
                      setProfileData(prev => ({ ...prev, phone_number: cleanedPhone }));
                    }}
                    inputProps={{
                      placeholder: 'Enter your phone number',
                      autoComplete: 'tel',
                      'aria-label': 'Phone number'
                    }}
                    containerClass="phone-input-container"
                    buttonClass="phone-input-button"
                    dropdownClass="phone-input-dropdown"
                    searchClass="phone-input-search"
                    inputClass="phone-input-field"
                    enableSearch={true}
                    searchPlaceholder="Search country..."
                    searchNotFound="No country found"
                    preferredCountries={['us', 'gb', 'ca', 'au', 'nz', 'ph']}
                    countryCodeEditable={false}
                    enableAreaCodes={true}
                    preserveOrder={['onlyCountries', 'preferredCountries']}
                    specialLabel=""
                    disableSearchIcon={false}
                    disableCountryCode={false}
                    enableTerritories={true}
                    enableAreaCodeStretch={true}
                    autoFormat={true}
                    isValid={(value, country) => {
                      if (value.length === 0) return true;
                      return value.length >= 8;
                    }}
                  />
                </PhoneInputWrapper>
              </FormGroup>
              <ButtonGroup>
                <CancelButtonV2 onClick={handleCancel}>
                  Cancel
                </CancelButtonV2>
                <SubmitButtonV2 onClick={() => {
                  handleProfileUpdate();
                  setIsEditingContact(false);
                }}>
                  Save Changes
                </SubmitButtonV2>
              </ButtonGroup>
              {contactError && <ErrorMessage>{contactError}</ErrorMessage>}
              {contactSuccess && <SuccessMessage>{contactSuccess}</SuccessMessage>}
            </>
          ) : (
            <>
              <InfoRow $isEditing={isEditingContact}>
                <InfoLabel $isEditing={isEditingContact}>Location</InfoLabel>
                <InfoValue $isEditing={isEditingContact}>{profileData.location || '-'}</InfoValue>
              </InfoRow>
              <InfoRow $isEditing={isEditingContact} style={{ borderBottom: 'none' }}>
                <InfoLabel $isEditing={isEditingContact}>Phone</InfoLabel>
                <InfoValue $isEditing={isEditingContact}>{profileData.phone_number || '-'}</InfoValue>
              </InfoRow>
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
      </LeftColumn>

      <RightColumn>
        <Section>
          <SectionTitle>
            Account Info
          </SectionTitle>
          {isEditingAccount ? (
            <>
              <FormGroup>
                <Label>Username</Label>
                <InputWrapper>
                  <Input
                    type="text"
                    value={profileData.username}
                    onChange={(e) => {
                      setProfileData({ ...profileData, username: e.target.value });
                      validateUsername(e.target.value);
                    }}
                    onFocus={() => setIsUsernameFocused(true)}
                    onBlur={() => setIsUsernameFocused(false)}
                    placeholder="Enter your username"
                  />
                  <UsernameValidationContainer>
                    {usernameError && (
                      <ValidationMessage $type="error">
                        <FiX size={14} />
                        {usernameError}
                      </ValidationMessage>
                    )}
                    {checkingUsername && profileData.username.length >= 3 && !usernameError && (
                      <ValidationMessage $type="loading">
                        <FiLoader size={14} className="animate-spin" />
                        Checking availability...
                      </ValidationMessage>
                    )}
                    {!checkingUsername && !usernameError && profileData.username.length >= 3 && (
                      <ValidationMessage $type={profileData.username === originalProfileData.username ? 'info' : 'success'}>
                        {profileData.username === originalProfileData.username ? (
                          isUsernameFocused ? 'This is your current username' : null
                        ) : (
                          <>
                            <FiCheck size={14} />
                            This username is available
                          </>
                        )}
                      </ValidationMessage>
                    )}
                  </UsernameValidationContainer>
                </InputWrapper>
              </FormGroup>

              <FormGroup>
                <Label>Email</Label>
                <InputWrapper>
                  <Input
                    type="email"
                    value={profileData.email}
                    disabled
                    placeholder="Your email address"
                  />
                </InputWrapper>
              </FormGroup>

              <ButtonGroup>
                <CancelButtonV2 onClick={() => {
                  setIsEditingAccount(false);
                  setProfileData(originalProfileData);
                  // Reset all username validation states
                  setUsernameError(null);
                  setCheckingUsername(false);
                  setUsernameExists(null);
                  setIsUsernameFocused(false);
                  if (usernameCheckTimeout.current) {
                    clearTimeout(usernameCheckTimeout.current);
                  }
                }}>
                  Cancel
                </CancelButtonV2>
                <SubmitButtonV2
                  onClick={handleAccountUpdate}
                  disabled={!!usernameError || checkingUsername || !!usernameExists}
                >
                  Save Changes
                </SubmitButtonV2>
              </ButtonGroup>
              {accountError && <ErrorMessage>{accountError}</ErrorMessage>}
              {accountSuccess && <SuccessMessage>{accountSuccess}</SuccessMessage>}
            </>
          ) : (
            <>
              <InfoRow>
                <InfoLabel>Username</InfoLabel>
                <InfoValue>{profileData.username || '-'}</InfoValue>
              </InfoRow>
              <InfoRow style={{ borderBottom: 'none' }}>
                <InfoLabel>Email</InfoLabel>
                <InfoValue>{profileData.email || '-'}</InfoValue>
              </InfoRow>
              <div style={{ marginTop: '16px' }}>
                <EditButton onClick={() => {
                  setIsEditingAccount(true);
                  setIsEditing(false);
                  setIsEditingContact(false);
                  setIsEditingPassword(false);
                }}>
                  <FiEdit2 />
                  Edit Account Info
                </EditButton>
              </div>
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
                {validatingCurrentPassword || isValidatingPassword ? (
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
                <CancelButtonV2 onClick={handleCancel}>
                  Cancel
                </CancelButtonV2>
                <SubmitButtonV2 type="submit" disabled={!passwordsMatch || !currentPasswordValid || !passwordLength}>
                  Save Changes
                </SubmitButtonV2>
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
      </RightColumn>

      <Modal
        isOpen={isProfileModalOpen}
        onClose={handleModalClose}
        title="Profile Picture"
        size="sm"
      >
        <div style={{ textAlign: 'center' }}>
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
            <CancelButton
              onClick={() => document.getElementById('profile-picture')?.click()}
              disabled={isUpdatingProfilePicture}
              style={{ flex: 1 }}
            >
              Choose Image
            </CancelButton>
            <SubmitButtonV2
              onClick={handleProfilePictureUpload}
              disabled={!selectedFile || isUpdatingProfilePicture}
              style={{ flex: 1 }}
            >
              {isUpdatingProfilePicture ? (
                <SpinningIcon size={16} />
              ) : (
                'Update'
              )}
            </SubmitButtonV2>
          </ButtonGroup>
        </div>
      </Modal>
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