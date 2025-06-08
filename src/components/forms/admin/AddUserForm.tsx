import React, { FC, useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { FiX, FiEye, FiEyeOff, FiChevronDown, FiCheck } from 'react-icons/fi';
import { AdminFormData } from '../../../types/admin';
import { Modal } from '../../ui/Modal';

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: AdminFormData) => Promise<void>;
  onModalStateChange?: (isOpen: boolean) => void;
  isSubmitting: boolean;
  error: string | null;
  success?: string | null;
  rateLimitCountdown?: number | null;
  retryCount?: number;
  maxRetries?: number;
}

// Add normalizeEmail function
const normalizeEmail = (email: string): string => {
  if (!email) return '';
  
  // Convert to lowercase and trim
  const normalized = email.toLowerCase().trim();
  
  // Split into local and domain parts
  const [localPart, domain] = normalized.split('@');
  
  if (!domain) return normalized;
  
  // Handle Gmail addresses
  if (domain === 'gmail.com') {
    // Remove dots and everything after + in the local part
    const cleanLocal = localPart.replace(/\./g, '').split('+')[0];
    return `${cleanLocal}@gmail.com`;
  }
  
  return normalized;
};

const AddUserModal: FC<AddUserModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  onModalStateChange,
  isSubmitting,
  error,
  success,
  rateLimitCountdown,
  retryCount,
  maxRetries
}) => {
  const [formData, setFormData] = useState<AdminFormData>({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user'
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState<boolean | null>(null);
  const [passwordLength, setPasswordLength] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      onModalStateChange?.(true);
    }
  }, [isOpen, onModalStateChange]);

  const handleClose = () => {
    setFormData({
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: 'user'
    });
    setShowPassword(false);
    setShowConfirmPassword(false);
    setPasswordsMatch(null);
    setPasswordLength(false);
    onClose();
    onModalStateChange?.(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, field: keyof AdminFormData) => {
    const value = e.target.value;
    if (field === 'email') {
      // Normalize email as user types
      const normalizedEmail = normalizeEmail(value);
      setFormData((prev: AdminFormData) => ({ ...prev, [field]: normalizedEmail }));
    } else {
      setFormData((prev: AdminFormData) => ({ ...prev, [field]: value }));
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData((prev: AdminFormData) => ({ ...prev, password: value }));
    setPasswordLength(value.length >= 8);
    setPasswordsMatch(value === formData.confirmPassword);
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData((prev: AdminFormData) => ({ ...prev, confirmPassword: value }));
    setPasswordsMatch(value === formData.password);
  };

  const isFormValid = () => {
    return (
      formData.first_name.trim() !== '' &&
      formData.last_name.trim() !== '' &&
      formData.email.trim() !== '' &&
      formData.password.length >= 8 &&
      formData.password === formData.confirmPassword
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid()) return;
    
    // Ensure email is normalized before submission
    const normalizedFormData = {
      ...formData,
      email: normalizeEmail(formData.email)
    };
    
    await onSubmit(normalizedFormData);
    
    // Reset form after successful submission
    setFormData({
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: 'user'
    });
    setShowPassword(false);
    setShowConfirmPassword(false);
    setPasswordsMatch(null);
    setPasswordLength(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Add New User"
      size="lg"
      closeOnOverlayClick={false}
    >
      <Form onSubmit={handleSubmit}>
        <FormGrid>
          <FormRow>
            <FormGroup>
              <Label htmlFor="first_name">First Name</Label>
              <Input
                type="text"
                id="first_name"
                placeholder="Enter first name"
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
                placeholder="Enter last name"
                value={formData.last_name}
                onChange={(e) => handleInputChange(e, 'last_name')}
                required
              />
            </FormGroup>
          </FormRow>
          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={(e) => handleInputChange(e, 'email')}
              required
            />
            {error && error.toLowerCase().includes('email') && (
              <ValidationMessage $error={true}>
                <FiX size={14} /> {error}
              </ValidationMessage>
            )}
          </FormGroup>
          <FormRow>
            <FormGroup>
              <Label htmlFor="password">Password</Label>
              <PasswordInput>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handlePasswordChange}
                  required
                />
                <PasswordToggle onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </PasswordToggle>
              </PasswordInput>
              {/* Only show error states */}
              {formData.password && !passwordLength && (
                <ValidationMessage $error={true}>
                  <FiX size={14} /> Must be at least 8 characters
                </ValidationMessage>
              )}
              {error && error.toLowerCase().includes('password') && (
                <ValidationMessage $error={true}>
                  <FiX size={14} /> Password is too weak
                </ValidationMessage>
              )}
            </FormGroup>
            <FormGroup>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <PasswordInput>
                <Input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  required
                />
                <PasswordToggle onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                  {showConfirmPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </PasswordToggle>
              </PasswordInput>
              {/* Only show error state for password match */}
              {formData.confirmPassword && passwordsMatch === false && (
                <ValidationMessage $error={true}>
                  <FiX size={14} /> Passwords do not match
                </ValidationMessage>
              )}
            </FormGroup>
          </FormRow>
          <FormGroup>
            <Label htmlFor="role">Role</Label>
            <SelectWrapper>
              <Select
                id="role"
                value={formData.role}
                onChange={(e) => handleInputChange(e, 'role')}
                required
              >
                <option value="" disabled>Select a role</option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
                <option value="moderator">Moderator</option>
                <option value="developer">Developer</option>
                <option value="author">Author</option>
              </Select>
              <FiChevronDown size={18} />
            </SelectWrapper>
          </FormGroup>
        </FormGrid>

        {/* Only show non-email and non-password errors here */}
        {error && !error.toLowerCase().includes('email') && !error.toLowerCase().includes('password') && <ErrorMessage>{error}</ErrorMessage>}
        {success && <SuccessMessage>{success}</SuccessMessage>}

        <ButtonGroup>
          <CancelButton type="button" onClick={handleClose}>
            Cancel
          </CancelButton>
          <SubmitButton type="submit" disabled={!isFormValid() || isSubmitting}>
            {isSubmitting ? 'Adding User...' : 'Add User'}
          </SubmitButton>
        </ButtonGroup>
      </Form>
    </Modal>
  );
};

// Styled Components
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  width: 100%;
  
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
`;

const SelectWrapper = styled.div`
  position: relative;
  width: 100%;

  svg {
    position: absolute;
    right: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
    color: ${props => props.theme.colors.text.secondary};
  }
`;

const Select = styled.select`
  padding: 0.5rem 0.75rem;
  padding-right: 2rem;
  border: 1.5px solid #E5E7EB;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  width: 100%;
  background-color: white;
  transition: all 0.2s;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;

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

const PasswordInput = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const PasswordToggle = styled.button`
  position: absolute;
  right: 0.75rem;
  background: none;
  border: none;
  color: ${props => props.theme.colors.text.secondary};
  cursor: pointer;
  padding: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.25rem;
  transition: all 0.2s;

  &:hover {
    background-color: ${props => props.theme.colors.background.secondary};
    color: ${props => props.theme.colors.text.primary};
  }
`;

const ValidationMessage = styled.div<{ $error?: boolean; $success?: boolean }>`
  font-size: 0.75rem;
  color: ${props => props.$error ? '#EF4444' : props.$success ? '#059669' : '#6B7280'};
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const ErrorMessage = styled.div`
  color: #EF4444;
  font-size: 0.875rem;
  padding: 0.75rem;
  background-color: #FEE2E2;
  border-radius: 0.375rem;
  margin-top: 0.5rem;
`;

const SuccessMessage = styled.div`
  color: #059669;
  font-size: 0.875rem;
  padding: 0.75rem;
  background-color: #D1FAE5;
  border-radius: 0.375rem;
  margin-top: 0.5rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s;
  cursor: pointer;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const CancelButton = styled(Button)`
  background: transparent;
  border: 1.5px solid #9CA3AF;
  color: ${props => props.theme.colors.text.primary};

  &:hover:not(:disabled) {
    background-color: ${props => props.theme.colors.background.secondary};
    border-color: ${props => props.theme.colors.text.primary};
  }
`;

const SubmitButton = styled(Button)`
  background-color: ${props => props.theme.colors.primary};
  border: none;
  color: white;

  &:hover:not(:disabled) {
    background-color: ${props => props.theme.colors.primaryDark};
  }
`;

export default AddUserModal; 