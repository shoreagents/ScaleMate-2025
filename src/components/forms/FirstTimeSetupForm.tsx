import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes, DefaultTheme } from 'styled-components';
import { supabase } from '@/lib/supabase';
import { FiEye, FiEyeOff, FiX, FiCheck, FiLoader, FiCamera } from 'react-icons/fi';
import { FaUser } from 'react-icons/fa';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/router';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useProfile } from '@/contexts/ProfileContext';
import { useAuth } from '@/contexts/AuthContext';
import { Modal } from '../ui/Modal';
import { countries, Country } from '@/lib/constants/countries';

const SetupContent = styled.div<{ $show: boolean }>`
  opacity: ${props => props.$show ? 1 : 0};
  transition: opacity 0.3s ease;
`;

const ModalHeader = styled.div`
  margin-bottom: 3rem;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${props => props.theme.colors.text.primary};
  margin: 0;
`;

const SubTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text.primary};
  margin: 0.5rem 0 0 0;
`;

const Description = styled.p`
  font-size: 0.875rem;
  color: ${props => props.theme.colors.text.secondary};
  margin-bottom: 3rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
`;

const FormRow = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;
`;

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text.primary};
`;

const InputWrapper = styled.div<{ $hasContent?: boolean }>`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${props => props.$hasContent ? '0.5rem' : '0'};
`;

const Input = styled.input`
  width: 100%;
  padding: 0.875rem 1rem;
  border: 1.5px solid ${props => props.theme.colors.border};
  border-radius: 8px;
  font-size: 0.875rem;
  background: white;
  color: ${props => props.theme.colors.text.primary};
  transition: all 0.2s ease;
  position: relative;
  z-index: 2;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px ${props => props.theme.colors.primary}15;
  }

  &::placeholder {
    color: ${props => props.theme.colors.text.secondary};
  }
`;

const PasswordInputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const PasswordToggle = styled.button`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  color: ${props => props.theme.colors.text.secondary};
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: ${props => props.theme.colors.text.primary};
  }
`;

const HelperText = styled.div`
  font-size: 0.75rem;
  color: ${props => props.theme.colors.text.secondary};
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const ErrorMessage = styled.div`
  font-size: 0.875rem;
  color: ${props => props.theme.colors.error};
  background-color: ${props => props.theme.colors.error}15;
  padding: 0.75rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Button = styled.button`
  padding: 0.875rem;
  background: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  flex: 1;

  &:hover {
    background: ${props => props.theme.colors.primaryDark};
  }

  &:active {
    transform: scale(0.98);
  }

  &:disabled {
    background: ${props => props.theme.colors.disabled};
    cursor: not-allowed;
  }
`;

const PasswordInputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 8px;
`;

const MessageContainer = styled.div<{ $isSuccess?: boolean }>`
  padding: 0.75rem;
  border-radius: 8px;
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
  color: ${props => props.$isSuccess ? props.theme.colors.success : props.theme.colors.error};
`;

const PasswordHelperText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`;

const PasswordSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const StepIndicator = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 1rem;
  gap: 0.5rem;
`;

const StepLine = styled.button<{ $active: boolean; $completed: boolean }>`
  flex: 1;
  height: 4px;
  border-radius: 2px;
  background-color: ${props => 
    props.$active ? '#4B5563' : // gray-600 for active
    props.$completed ? '#9CA3AF' : // gray-400 for completed
    '#E5E7EB' // gray-200 for inactive
  };
  transition: all 0.2s ease;
  border: none;
  padding: 0;
  cursor: ${props => props.$completed ? 'pointer' : 'default'};

  &:hover {
    background-color: ${props => 
      props.$active ? '#4B5563' : // gray-600 for active
      props.$completed ? '#9CA3AF' : // gray-400 for completed
      '#D1D5DB' // gray-300 for inactive hover
    };
  }
`;

const NavigationButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 0;
`;

const BackButton = styled(Button)`
  background: transparent;
  border: 1.5px solid ${(props: { theme: DefaultTheme }) => props.theme.colors.border};
  color: ${(props: { theme: DefaultTheme }) => props.theme.colors.text.primary};

  &:hover {
    background: ${(props: { theme: DefaultTheme }) => props.theme.colors.background.secondary};
    border-color: ${(props: { theme: DefaultTheme }) => props.theme.colors.text.primary};
  }

  &:disabled {
    background: transparent;
    border-color: ${(props: { theme: DefaultTheme }) => props.theme.colors.border};
    color: ${(props: { theme: DefaultTheme }) => props.theme.colors.text.secondary};
    cursor: not-allowed;
  }
`;

const WelcomeScreen = styled.div`
  text-align: center;
`;

const WelcomeTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${props => props.theme.colors.text.primary};
  margin:0;
`;

const WelcomeText = styled.p`
  font-size: 0.875rem;
  color: ${props => props.theme.colors.text.secondary};
  margin-bottom: 2rem;
  line-height: 1.5;
`;

const TermsContainer = styled.div`
  background: ${props => props.theme.colors.background.secondary};
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1.5rem;
  max-height: 200px;
  overflow-y: auto;
`;

const TermsHeading = styled.h4`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text.primary};
  margin-bottom: 0.5rem;
`;

const TermsText = styled.p`
  font-size: 0.75rem;
  color: ${props => props.theme.colors.text.secondary};
  line-height: 1.5;
`;

const TermsCheckbox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const Checkbox = styled.input`
  width: 1rem;
  height: 1rem;
`;

const CheckboxLabel = styled.label`
  font-size: 0.875rem;
  color: ${props => props.theme.colors.text.primary};
`;

const GetStartedButton = styled(Button)`
  width: 100%;
`;

const ThankYouScreen = styled.div`
  text-align: center;
`;

const AnimatedGraph = styled.div`
  margin-bottom: 2rem;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const GraphLine = styled.path`
  fill: none;
  stroke: ${props => props.theme.colors.primary};
  stroke-width: 2;
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  animation: drawLine 2s ease-out forwards;

  @keyframes drawLine {
    to {
      stroke-dashoffset: 0;
    }
  }
`;

const GraphDots = styled.circle`
  fill: ${props => props.theme.colors.primary};
  r: 4;
  opacity: 0;
  animation: fadeIn 0.5s ease-out forwards;
  animation-delay: 1.5s;

  @keyframes fadeIn {
    to {
      opacity: 1;
    }
  }
`;

const ThankYouTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${props => props.theme.colors.text.primary};
  margin: 0;
`;

const ThankYouText = styled.p`
  font-size: 0.875rem;
  color: ${props => props.theme.colors.text.secondary};
  margin-bottom: 2rem;
  line-height: 1.5;
`;

const ContinueButton = styled(Button)`
  width: 100%;
`;

const ProfileImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 100%;
`;

const ProfileImageWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 320px;
  aspect-ratio: 1;
  border-radius: 50%;
  overflow: hidden;
  background: ${props => props.theme.colors.background.secondary};
  border: 2px solid ${props => props.theme.colors.border};
`;

const EditButton = styled.button`
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

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const HiddenInput = styled.input`
  display: none;
`;

// Add hover effect using a separate styled component
const ProfileImageWrapperWithHover = styled(ProfileImageWrapper)`
  &:hover ${EditButton} {
    opacity: 1;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.875rem 1rem;
  border: 1.5px solid ${props => props.theme.colors.border};
  border-radius: 8px;
  font-size: 0.875rem;
  background: white;
  color: ${props => props.theme.colors.text.primary};
  transition: all 0.2s ease;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 1em;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px ${props => props.theme.colors.primary}15;
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

const graphAnimation = keyframes`
  0% {
    stroke-dashoffset: 1000;
  }
  100% {
    stroke-dashoffset: 0;
  }
`;

const scaleAnimation = keyframes`
  0% {
    transform: scale(0.8);
    opacity: 0;
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

const ValidationMessage = styled.div<{ $type: 'error' | 'loading' | 'success' }>`
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: ${props => 
    props.$type === 'error' ? '#dc2626' :  // red-600
    props.$type === 'success' ? '#059669' : // green-600
    '#6B7280'  // gray-500 for loading
  };
  min-height: 20px;
  position: relative;
  z-index: 1;
  background: white;
`;

interface FirstTimeSetupFormProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  currentUsername: string;
  onSetupComplete: () => void;
}

interface UserProfile {
  username: string;
  user_id: string;
}

interface FormData {
  username: string;
  country: string;
  phoneNumber: string;
  profileImage: string | null;
}

const FirstTimeSetupForm: React.FC<FirstTimeSetupFormProps> = ({
  isOpen,
  onClose,
  userId,
  currentUsername,
  onSetupComplete
}) => {
  const router = useRouter();
  const { setProfilePicture } = useProfile();
  const { refreshProfile } = useAuth();
  const [formData, setFormData] = useState<FormData>({
    username: currentUsername,
    country: '',
    phoneNumber: '',
    profileImage: null
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [usernameExists, setUsernameExists] = useState<boolean | null>(null);
  const [checkingUsername, setCheckingUsername] = useState(false);
  const [showSteps, setShowSteps] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const totalSteps = 3;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const usernameCheckTimeout = useRef<NodeJS.Timeout>();

  // Reset states when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setShowSteps(false);
      setShowThankYou(false);
      setCurrentStep(1);
      setError(null);
      setIsLoading(false);
      setFormData({
        username: currentUsername,
        country: '',
        phoneNumber: '',
        profileImage: null
      });
    }
  }, [isOpen, currentUsername]);

  const validateUsername = (value: string) => {
    // Allow empty value for backspace
    if (!value) {
      setUsernameError(null);
      return false;
    }
    if (!/^[a-zA-Z0-9._]+$/.test(value)) {
      setUsernameError('Username can only contain letters, numbers, dots, and underscores');
      return false;
    }
    if (value.length < 3) {
      setUsernameError('Username must be at least 3 characters long');
      return false;
    }
    if (value.length > 30) {
      setUsernameError('Username must be less than 30 characters');
      return false;
    }
    setUsernameError(null);
    return true;
  };

  const checkUsernameExists = async (username: string) => {
    if (!username || username.length < 3) {
      setUsernameExists(null);
      setCheckingUsername(false);
      return;
    }

    try {
      setCheckingUsername(true);
      
      // Check if username exists using a function that bypasses RLS
      const { data, error } = await supabase
        .rpc('check_username_exists', { 
          username_to_check: username,
          current_user_id: userId 
        });

      if (error) {
        // Handle rate limit error specifically
        if (error.message.includes('Rate limit exceeded')) {
          const waitTime = error.message.match(/\d+/)?.[0] || '60';
          setUsernameError(`Too many checks! Wait ${waitTime} seconds.`);
          setUsernameExists(null);
          return;
        }
        
        // Handle other errors with more concise messages
        console.error('Error checking username:', error);
        if (error.message.includes('network')) {
          setUsernameError('Network error. Check your connection.');
        } else if (error.message.includes('timeout')) {
          setUsernameError('Request timed out! Try again.');
        } else {
          setUsernameError('Too many attempts! Try again in a few seconds.');
        }
        setUsernameExists(null);
        return;
      }

      // The RPC function returns a boolean indicating if username exists
      setUsernameExists(data);
      setUsernameError(null); // Clear any previous errors
    } catch (error) {
      console.error('Error checking username:', error);
      setUsernameError('Unable to check username. Please try again.');
      setUsernameExists(null);
    } finally {
      setCheckingUsername(false);
    }
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    // Clear any existing timeout
    if (usernameCheckTimeout.current) {
      clearTimeout(usernameCheckTimeout.current);
    }

    // Validate format immediately
    const isValid = validateUsername(value);
    
    // Update form data
    setFormData(prev => ({ ...prev, username: value }));

    // Only check availability if format is valid and length is sufficient
    if (isValid && value.length >= 3) {
      setCheckingUsername(true);
      usernameCheckTimeout.current = setTimeout(() => {
        checkUsernameExists(value);
      }, 500); // Wait 500ms after user stops typing
    } else {
      setUsernameExists(null);
      setCheckingUsername(false);
    }
  };

  const isFormValid = () => {
    if (currentStep === 1) {
      return (
        formData.username &&
        formData.username.length >= 3 &&
        !usernameError &&
        usernameExists === false
      );
    }
    // ... rest of the validation logic ...
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep < totalSteps) {
      handleNext();
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      // Find the full country name from the selected code
      const selectedCountry = countries.find(c => c.code === formData.country);
      const countryName = selectedCountry ? selectedCountry.name : '';

      // Update user profile with full country name, making phone and location optional
      const updateData: any = {
        username: formData.username,
        profile_picture_url: formData.profileImage
      };

      // Only include phone and location if they are provided
      if (formData.phoneNumber) {
        updateData.phone_number = formData.phoneNumber;
      }
      if (countryName) {
        updateData.location = countryName;
      }

      const { error: profileError } = await supabase
        .from('profiles')
        .update(updateData)
        .eq('id', userId);

      if (profileError) throw profileError;

      // Reset loading state before showing thank you screen
      setIsLoading(false);
      
      // Show thank you screen and ensure steps are hidden
      setShowThankYou(true);
      setShowSteps(false);
    } catch (err) {
      console.error('Setup error:', err);
      setError(err instanceof Error ? err.message : 'Failed to complete setup');
      setIsLoading(false);
    }
  };

  const handleGetStarted = () => {
    setShowSteps(true);
    setShowThankYou(false);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsLoading(true);
      setError(null);

      // Upload to Supabase Storage with correct path structure
      const fileExt = file.name.split('.').pop() || '';
      const fileName = `${userId}/${Date.now()}.${fileExt}`;
      const { error: uploadError, data } = await supabase.storage
        .from('profile-images')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('profile-images')
        .getPublicUrl(fileName);

      // Update form data
      setFormData(prev => ({ ...prev, profileImage: publicUrl }));
      
      // Update profile context
      setProfilePicture(publicUrl);
      
      // Refresh profile data
      await refreshProfile();
    } catch (err) {
      console.error('Error uploading image:', err);
      setError('Failed to upload image. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditClick = () => {
    fileInputRef.current?.click();
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        const hasValidationContent: boolean = Boolean(usernameError || checkingUsername || usernameExists !== null);
        return (
          <FormGroup>
            <Label htmlFor="username">
              Username
            </Label>
            <InputWrapper $hasContent={hasValidationContent}>
              <Input
                id="username"
                type="text"
                pattern="[a-zA-Z0-9._]+"
                value={formData.username}
                onChange={handleUsernameChange}
                placeholder="Choose a username"
                required
                autoComplete="username"
                style={{
                  borderColor: usernameError ? '#dc2626' : 
                             usernameExists === true ? '#dc2626' :
                             usernameExists === false ? '#059669' : 
                             '#E5E7EB'
                }}
              />
              <div>
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
                {!checkingUsername && usernameExists === true && !usernameError && formData.username.length >= 3 && (
                  <ValidationMessage $type="error">
                    <FiX size={14} />
                    This username is already taken
                  </ValidationMessage>
                )}
                {!checkingUsername && usernameExists === false && !usernameError && formData.username.length >= 3 && (
                  <ValidationMessage $type="success">
                    <FiCheck size={14} />
                    This username is available
                  </ValidationMessage>
                )}
              </div>
            </InputWrapper>
          </FormGroup>
        );
      case 2:
        return (
          <>
            <FormGroup>
              <Label htmlFor="country">
                Location
              </Label>
              <InputWrapper>
                <Select
                  id="country"
                  value={formData.country}
                  onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
                  autoComplete="country"
                >
                  <option value="">Select your country</option>
                  {countries.map(country => (
                    <option key={country.code} value={country.code}>
                      {country.name}
                    </option>
                  ))}
                </Select>
              </InputWrapper>
            </FormGroup>
            <FormGroup>
              <Label htmlFor="phoneNumber">
                Phone Number
              </Label>
              <PhoneInputWrapper>
                <PhoneInput
                  country={formData.country.toLowerCase()}
                  value={formData.phoneNumber}
                  onChange={(phone: string) => setFormData(prev => ({ ...prev, phoneNumber: phone }))}
                  inputProps={{
                    id: 'phoneNumber',
                    name: 'phoneNumber',
                    placeholder: 'Enter your phone number',
                    autoComplete: 'tel',
                    'aria-label': 'Phone number',
                    'aria-required': 'false'
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
                />
              </PhoneInputWrapper>
            </FormGroup>
          </>
        );
      case 3:
        return (
          <FormGroup>
            <ProfileImageContainer>
              <ProfileImageWrapperWithHover>
                {formData.profileImage ? (
                  <ProfileImage src={formData.profileImage} alt="Profile" />
                ) : (
                  <div style={{ 
                    width: '100%', 
                    height: '100%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    color: '#9CA3AF'
                  }}>
                    <FaUser size={140} />
                  </div>
                )}
                <EditButton type="button" onClick={handleEditClick}>
                  <FiCamera size={24} />
                </EditButton>
              </ProfileImageWrapperWithHover>
              <HiddenInput
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </ProfileImageContainer>
          </FormGroup>
        );
      default:
        return null;
    }
  };

  const termsAndConditions = `By using ScaleMate, you agree to the following terms and conditions:

1. Account Usage
   - You must provide accurate and complete information
   - You are responsible for maintaining the security of your account
   - You must be at least 18 years old to use this service

2. Privacy
   - We collect and process your data in accordance with our Privacy Policy
   - Your information is protected and never shared with third parties
   - You can request data deletion at any time

3. Service Usage
   - ScaleMate is provided "as is" without warranties
   - We may modify or discontinue services at any time
   - You agree to use the service in compliance with all applicable laws

4. Intellectual Property
   - All content and materials are owned by ScaleMate
   - You may not copy or distribute our materials without permission
   - User-generated content remains your property

5. Termination
   - We reserve the right to terminate accounts that violate our terms
   - You may close your account at any time
   - Upon termination, your data will be handled according to our policy`;

  const handleContinue = () => {
    onClose();
    onSetupComplete();
  };

  const renderContent = () => {
    if (showThankYou) {
      return (
        <ThankYouScreen>
          <AnimatedGraph>
            <svg
              viewBox="0 0 300 180"
              width="100%"
              height="auto"
              preserveAspectRatio="xMidYMid meet"
              style={{ overflow: 'visible', display: 'block', maxWidth: '100%' }}
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Background grid lines */}
              <line x1="0" y1="150" x2="300" y2="150" stroke="#E5E7EB" strokeWidth="1" />
              <line x1="0" y1="112.5" x2="300" y2="112.5" stroke="#E5E7EB" strokeWidth="1" />
              <line x1="0" y1="75" x2="300" y2="75" stroke="#E5E7EB" strokeWidth="1" />
              <line x1="0" y1="37.5" x2="300" y2="37.5" stroke="#E5E7EB" strokeWidth="1" />
              
              {/* Animated growth line */}
              <GraphLine d="M30,150 C60,120 90,135 120,105 C150,75 180,90 210,60 C240,30 270,45 300,15" />
              
              {/* Animated dots */}
              <GraphDots cx="30" cy="150" />
              <GraphDots cx="120" cy="105" />
              <GraphDots cx="210" cy="60" />
              <GraphDots cx="300" cy="15" />
            </svg>
          </AnimatedGraph>
          <ThankYouTitle>Thank You for Completing Setup!</ThankYouTitle>
          <ThankYouText>
            Your account has been successfully set up. You can now start using ScaleMate.
          </ThankYouText>
          <ContinueButton 
            onClick={handleContinue}
            disabled={isLoading}
          >
            Continue to Dashboard
          </ContinueButton>
        </ThankYouScreen>
      );
    }

    if (!showSteps) {
      return (
        <WelcomeScreen>
          <WelcomeTitle>Welcome to ScaleMate!</WelcomeTitle>
          <WelcomeText>
            We're excited to have you on board. Before we get started, we'll need to collect some basic information from you to complete your account setup. It'll only take a few quick steps.
          </WelcomeText>

          <TermsContainer>
            <TermsHeading>Terms and Conditions</TermsHeading>
            <TermsText>
              {termsAndConditions}
            </TermsText>
          </TermsContainer>

          <TermsCheckbox>
            <Checkbox
              type="checkbox"
              id="terms"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
            />
            <CheckboxLabel htmlFor="terms">
              I have read and agree to the Terms and Conditions
            </CheckboxLabel>
          </TermsCheckbox>

          <GetStartedButton 
            onClick={handleGetStarted}
            disabled={!termsAccepted || isLoading}
          >
            {isLoading ? 'Loading...' : 'Continue'}
          </GetStartedButton>
        </WelcomeScreen>
      );
    }

    return (
      <SetupContent $show={showSteps}>
        <ModalHeader>
          <Title>Complete Setup</Title>
          <SubTitle>Step {currentStep} of {totalSteps}</SubTitle>
          <Description>
            {currentStep === 1 ? "Enter a unique username to represent your account." :
             currentStep === 2 ? "Tell us where you're located and how to reach you." :
             "Add a profile picture to personalize your account."}
          </Description>
        </ModalHeader>

        <Form onSubmit={handleSubmit}>
          {renderStepContent()}

          {error && (
            <ErrorMessage>
              <FiX size={16} />
              {error}
            </ErrorMessage>
          )}

          <StepIndicator style={{ marginTop: '2rem' }}>
            {Array.from({ length: totalSteps }).map((_, index) => (
              <StepLine
                key={index}
                $active={currentStep === index + 1}
                $completed={currentStep > index + 1}
                onClick={() => {
                  if (currentStep > index + 1) {
                    setCurrentStep(index + 1);
                  }
                }}
                disabled={currentStep <= index + 1}
                aria-label={`Go to step ${index + 1}`}
              />
            ))}
          </StepIndicator>

          <NavigationButtons>
            {currentStep > 1 && (
              <BackButton
                type="button"
                onClick={handleBack}
                disabled={isLoading}
              >
                Back
              </BackButton>
            )}
            <Button
              type="submit"
              disabled={isLoading || (currentStep === 1 && !isFormValid())}
            >
              {isLoading ? 'Saving...' : 
               currentStep === totalSteps ? (formData.profileImage ? 'Complete Setup' : 'Skip') : 
               currentStep === 2 && !formData.phoneNumber && !formData.country ? 'Skip' :
               'Next'}
            </Button>
          </NavigationButtons>
        </Form>
      </SetupContent>
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title=""
      size="md"
      showCloseButton={false}
    >
        {renderContent()}
    </Modal>
  );
};

export default FirstTimeSetupForm; 