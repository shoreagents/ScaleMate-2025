import React, { FC, useState, useEffect, useRef, ReactElement } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { FiEye, FiEyeOff, FiCamera, FiX, FiLoader, FiCheck, FiChevronDown, FiUpload } from 'react-icons/fi';
import { FaUser } from 'react-icons/fa';
import { createClient } from '@supabase/supabase-js';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { UserEditFormData, UserRole, Admin } from '@/types/admin';
import { Modal } from '../../ui/Modal';
import { countries, Country } from '@/lib/constants/countries';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: UserEditFormData) => Promise<void>;
  onModalStateChange: (isOpen: boolean) => void;
  isSubmitting: boolean;
  error: string | null;
  selectedUser: UserRole | null;
  initialFormData: UserEditFormData;
}

interface ValidationMessageProps {
  $type: 'error' | 'loading' | 'success' | 'info';
}

interface ProfileImageWrapperProps {
  theme: any; // Using any temporarily to fix the immediate error
}

interface EditButtonProps {
  theme: any; // Using any temporarily to fix the immediate error
}

const ValidationMessage = styled.div<ValidationMessageProps>`
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: ${(props: ValidationMessageProps) => 
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

const ProfileImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  width: 100%;
  height: 100%;
`;

const ProfileImageWrapper = styled.div<ProfileImageWrapperProps>`
  position: relative;
  width: 100%;
  max-width: 120px;
  aspect-ratio: 1;
  border-radius: 50%;
  overflow: hidden;
  background: ${(props: ProfileImageWrapperProps) => props.theme.colors.background.secondary};
  border: 2px solid ${(props: ProfileImageWrapperProps) => props.theme.colors.border};
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const EditButton = styled.button<EditButtonProps>`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  border: none;
  padding: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.8);
  }
`;

const ProfileImageWrapperWithHover = styled(ProfileImageWrapper)`
  &:hover ${EditButton} {
    opacity: 1;
  }
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const HiddenInput = styled.input`
  display: none;
`;

const SelectWrapper = styled.div`
  position: relative;
  width: 100%;

  select {
    appearance: none;
    padding-right: 2.5rem;  /* Make room for the custom arrow */
  }

  svg {
    position: absolute;
    right: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
    color: ${props => props.theme.colors.text.secondary};
    width: 1.25rem;
    height: 1.25rem;
  }
`;

const SectionLabel = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text.primary};
  margin: 0;
`;

const SectionHelperText = styled.div`
  font-size: 0.75rem;
  color: ${props => props.theme.colors.text.secondary};
  display: flex;
  align-items: center;
  gap: 0.25rem;
  margin: 0.25rem 0;
`;

const ErrorMessage = styled.div`
  color: #EF4444;
  font-size: 0.875rem;
  padding: 0.75rem;
  background-color: #FEE2E2;
  border-radius: 0.375rem;
  margin-top: 0.5rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
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

const PhoneInputWrapper = styled.div`
  position: relative;
  z-index: 1000; /* Ensure dropdown appears above modal */

  .react-tel-input {
    .form-control {
      width: 100%;
      padding: 0.875rem 1rem 0.875rem 3rem;
      border: 1.5px solid ${props => props.theme.colors.border};
      border-radius: 8px;
      font-size: 0.875rem;
      background: white;
      color: ${props => props.theme.colors.text.primary};
      transition: all 0.2s ease;

      &:focus {
        outline: none;
        border-color: ${props => props.theme.colors.primary};
        box-shadow: 0 0 0 3px ${props => props.theme.colors.primary}15;
      }
    }

    .flag-dropdown {
      border: 1.5px solid ${props => props.theme.colors.border};
      border-radius: 8px 0 0 8px;
      background-color: white;
    }

    .selected-flag {
      border-radius: 8px 0 0 8px;
      &:hover, &:focus {
        background-color: ${props => props.theme.colors.background.secondary};
      }
    }

    /* Fix dropdown positioning and overflow */
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
      border: 1px solid ${props => props.theme.colors.border};
      border-radius: 8px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }

    .country {
      padding: 0.5rem 1rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;

      &:hover {
        background-color: ${props => props.theme.colors.background.secondary};
      }

      &.highlight {
        background-color: ${props => props.theme.colors.background.secondary};
      }
    }

    .search-box {
      padding: 0.75rem;
      border-bottom: 1px solid ${props => props.theme.colors.border};
      margin: 0;
      width: 100%;
      box-sizing: border-box;
      font-size: 0.875rem;
      border-radius: 8px 8px 0 0;

      &:focus {
        outline: none;
        border-color: ${props => props.theme.colors.primary};
      }
    }
  }
`;

const EditUserModal: FC<EditUserModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  onModalStateChange,
  isSubmitting,
  error,
  selectedUser,
  initialFormData
}): ReactElement | null => {
  if (!isOpen) return null;
  
  // Use a ref to track if we're in the middle of a submission
  const isSubmittingRef = useRef(false);

  const [formData, setFormData] = useState<UserEditFormData>({
    email: initialFormData.email || '',
    password: initialFormData.password || '',
    role: initialFormData.role || 'user',
    first_name: initialFormData.first_name || '',
    last_name: initialFormData.last_name || '',
    phone_number: initialFormData.phone_number || '',
    location: initialFormData.location || '',
    gender: initialFormData.gender || '',
    username: initialFormData.username || '',
    profile_picture: initialFormData.profile_picture || null
  });
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [checkingUsername, setCheckingUsername] = useState(false);
  const [usernameExists, setUsernameExists] = useState<boolean | null>(null);
  const [currentUsername, setCurrentUsername] = useState<string>('');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const usernameCheckTimeout = useRef<NodeJS.Timeout>();
  const [isUsernameFocused, setIsUsernameFocused] = useState(false);

  useEffect(() => {
    if (isOpen && !isSubmittingRef.current) {
      onModalStateChange?.(true);
      setFormData({
        ...initialFormData,
        phone_number: initialFormData.phone_number ? initialFormData.phone_number.replace(/[^\d+]/g, '') : ''
      });
      setProfileImage(initialFormData.profile_picture || null);
      setImageFile(null);
      setImageError(null);
      setCurrentUsername(initialFormData.username);
    }
  }, [isOpen, onModalStateChange, initialFormData]);

  const handleClose = () => {
    if (!isSubmittingRef.current) {
      onClose();
      onModalStateChange?.(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, field: keyof UserEditFormData) => {
    const value = e.target.value;
    
    // Special handling for phone number to maintain consistent format
    if (field === 'phone_number') {
      const cleanedPhone = value.replace(/[^\d+]/g, '');
      setFormData(prev => ({ ...prev, [field]: cleanedPhone }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }

    if (field === 'username' && value !== currentUsername) {
      validateUsername(value);
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
    if (value === selectedUser?.username) {
      setUsernameExists(false);
      setUsernameError(null);
      return;
    }

    setUsernameError(null);
    setCheckingUsername(true);

    // Check username availability after a delay
    usernameCheckTimeout.current = setTimeout(async () => {
      try {
        const { data, error } = await supabase
          .rpc('check_username_exists', { 
            username_to_check: value,
            current_user_id: selectedUser?.id 
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

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (usernameCheckTimeout.current) {
        clearTimeout(usernameCheckTimeout.current);
      }
    };
  }, []);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setImageError('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setImageError('Image size should be less than 5MB');
      return;
    }

    try {
      // Create a data URL instead of blob URL
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setProfileImage(event.target.result as string);
          setImageFile(file);
          setImageError(null);
        }
      };
      reader.onerror = () => {
        console.error('Error reading file:', reader.error);
        setImageError('Error processing image');
      };
      reader.readAsDataURL(file);
    } catch (err) {
      console.error('Error creating image preview:', err);
      setImageError('Error processing image');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid()) return;

    try {
      isSubmittingRef.current = true;
      let newProfilePictureUrl = formData.profile_picture;

      if (imageFile && selectedUser) {
        setIsUploading(true);
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('profile-images')
          .upload(`${selectedUser.id}/${Date.now()}-${imageFile.name}`, imageFile, {
            cacheControl: '3600',
            upsert: true
          });

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('profile-images')
          .getPublicUrl(uploadData.path);

        newProfilePictureUrl = publicUrl;
      }

      const updatedData = {
        ...formData,
        profile_picture: newProfilePictureUrl,
        phone_number: formData.phone_number ? formData.phone_number.replace(/[^\d+]/g, '') : '',
        location: formData.location.trim()
      };

      await onSubmit(updatedData);
    } catch (err) {
      console.error('Error submitting form:', err);
    } finally {
      isSubmittingRef.current = false;
      setIsUploading(false);
    }
  };

  const isFormValid = () => {
    const isCurrentUsername = formData.username === selectedUser?.username;
    return (
      formData.first_name.trim() !== '' &&
      formData.last_name.trim() !== '' &&
      formData.username.trim() !== '' &&
      !usernameError &&
      (!usernameExists || isCurrentUsername) && // Allow current username
      !checkingUsername
    );
  };

  if (!selectedUser) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Edit User"
      size="lg"
      closeOnOverlayClick={false}
    >
      <Form onSubmit={handleSubmit}>
        <FormGrid>
          <div>
            <SectionLabel>Basic Info</SectionLabel>
            <SectionHelperText>User's basic personal information.</SectionHelperText>
          </div>
          <FormRow className="profile-row">
            <div>
              <FormRow className="name-row">
          <FormGroup>
                  <Label htmlFor="first_name">First Name</Label>
            <Input
              type="text"
              id="first_name"
              name="first_name"
              value={formData.first_name}
              onChange={(e) => handleInputChange(e, 'first_name')}
              required
            />
          </FormGroup>

          <FormGroup>
                  <Label htmlFor="last_name">Last Name</Label>
            <Input
              type="text"
              id="last_name"
              name="last_name"
              value={formData.last_name}
              onChange={(e) => handleInputChange(e, 'last_name')}
              required
            />
          </FormGroup>
              </FormRow>

              <FormGroup style={{ marginTop: '1rem' }}>
                <Label htmlFor="gender">Gender</Label>
                <SelectWrapper>
                  <Select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={(e) => handleInputChange(e, 'gender')}
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </Select>
                  <FiChevronDown />
                </SelectWrapper>
              </FormGroup>
            </div>

            <FormGroup style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ProfileImageContainer>
                <ProfileImageWrapperWithHover>
                  {profileImage ? (
                    <ProfileImage src={profileImage} alt="Profile" />
                  ) : (
                    <div style={{ 
                      width: '100%', 
                      height: '100%', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      color: '#9CA3AF'
                    }}>
                      <FaUser size={80} />
                    </div>
                  )}
                  <EditButton type="button" onClick={() => fileInputRef.current?.click()}>
                    <FiCamera size={18} />
                  </EditButton>
                </ProfileImageWrapperWithHover>
                <HiddenInput
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                {imageError && (
                  <ValidationMessage $type="error">
                    <FiX size={14} />
                    {imageError}
                  </ValidationMessage>
                )}
              </ProfileImageContainer>
            </FormGroup>
          </FormRow>

          <div>
            <SectionLabel>Contact Info</SectionLabel>
            <SectionHelperText>User's location and phone number.</SectionHelperText>
          </div>
          <FormRow className="contact-row">
            <FormGroup>
              <Label htmlFor="location">Country</Label>
              <SelectWrapper>
                <Select
                  id="location"
                  name="location"
                  value={countries.find(c => c.name === formData.location)?.code || ''}
                  onChange={(e) => {
                    const selectedCountry = countries.find(c => c.code === e.target.value);
                    handleInputChange({ 
                      target: { 
                        value: selectedCountry?.name || '', 
                        name: 'location' 
                      } 
                    } as any, 'location');
                  }}
                >
                  <option value="">Select country</option>
                  {countries.map((country: Country) => (
                    <option key={country.code} value={country.code}>
                      {country.name}
                    </option>
                  ))}
                </Select>
                <FiChevronDown />
              </SelectWrapper>
            </FormGroup>

            <FormGroup>
              <Label htmlFor="phone_number">Phone Number</Label>
              <PhoneInputWrapper>
                <PhoneInput
                  country={countries.find(c => c.name === formData.location)?.code?.toLowerCase() || 'us'}
                  value={formData.phone_number}
                  onChange={(phone: string) => {
                    const cleanedPhone = phone.replace(/[^\d+]/g, '');
                    setFormData(prev => ({ ...prev, phone_number: cleanedPhone }));
                  }}
                  inputProps={{
                    id: 'phone_number',
                    name: 'phone_number',
                    placeholder: 'Enter phone number',
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
          </FormRow>

          <div>
            <SectionLabel>Account Info</SectionLabel>
            <SectionHelperText>User's account details and access settings.</SectionHelperText>
          </div>
          <FormRow>
          <FormGroup>
              <Label htmlFor="username">Username</Label>
            <Input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={(e) => handleInputChange(e, 'username')}
              onFocus={() => setIsUsernameFocused(true)}
              onBlur={() => setIsUsernameFocused(false)}
              required
              style={{
                borderColor: usernameError ? '#dc2626' : 
                           usernameExists === true ? '#dc2626' :
                           usernameExists === false ? '#059669' : 
                           '#E5E7EB'
              }}
            />
            <UsernameValidationContainer>
              {usernameError && (
                <ValidationMessage $type="error">
                  <FiX size={14} />
                  {usernameError}
                </ValidationMessage>
              )}
              {checkingUsername && formData.username.length >= 3 && !usernameError && (
                <ValidationMessage $type="loading">
                  <FiLoader size={14} className="animate-spin" />
                  Checking availability...
                </ValidationMessage>
              )}
              {!checkingUsername && !usernameError && formData.username.length >= 3 && (
                <ValidationMessage $type={formData.username === selectedUser?.username ? 'info' : 'success'}>
                  {formData.username === selectedUser?.username ? (
                    isUsernameFocused ? 'This is the current username' : null
                  ) : (
                    <>
                      <FiCheck size={14} />
                      This username is available
                    </>
                  )}
                </ValidationMessage>
              )}
            </UsernameValidationContainer>
          </FormGroup>

            <FormGroup>
              <Label htmlFor="role">Role</Label>
              <SelectWrapper>
                <Select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={(e) => handleInputChange(e, 'role')}
                  required
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                  <option value="moderator">Moderator</option>
                  <option value="developer">Developer</option>
                  <option value="author">Author</option>
                </Select>
                <FiChevronDown />
              </SelectWrapper>
            </FormGroup>
          </FormRow>

          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              value={formData.email}
              disabled
            />
          </FormGroup>
        </FormGrid>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <ButtonGroup>
          <CancelButton type="button" onClick={handleClose}>
            Cancel
          </CancelButton>
          <SubmitButton type="submit" disabled={!isFormValid() || isSubmitting || isUploading}>
            {isSubmitting || isUploading ? 'Saving...' : 'Save Changes'}
          </SubmitButton>
        </ButtonGroup>
      </Form>
    </Modal>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const FormGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  &.profile-row {
    grid-template-columns: 1fr 120px;
    gap: 1.5rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid ${props => props.theme.colors.border};
  }

  &.contact-row {
    padding-bottom: 1.5rem;
    border-bottom: 1px solid ${props => props.theme.colors.border};
  }

  &.name-row {
    grid-template-columns: 1fr 1fr;
    grid-column: 1;
    margin-top: 0;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  /* Remove gap between input and validation message when empty */
  > div:empty {
    display: none;
  }
`;

// Add new styled component for username validation container
const UsernameValidationContainer = styled.div`
  min-height: 0;
  margin-top: -0.5rem; /* Offset the FormGroup gap when empty */
  padding-top: 0.5rem; /* Add padding when there is content */
  
  &:empty {
    display: none;
  }
`;

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${props => props.theme.colors.text.primary};
`;

const Input = styled.input`
  padding: 0.5rem 0.75rem;
  border: 1.5px solid #E5E7EB;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  width: 100%;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 2px ${props => props.theme.colors.primary}20;
  }

  &:disabled {
    background-color: #F3F4F6;
    cursor: not-allowed;
  }
`;

const Select = styled.select`
  padding: 0.5rem 0.75rem;
  border: 1.5px solid #E5E7EB;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  width: 100%;
  background-color: white;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 2px ${props => props.theme.colors.primary}20;
  }

  &:disabled {
    background-color: #F3F4F6;
    cursor: not-allowed;
  }
`;

export default EditUserModal;