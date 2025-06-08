import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { supabase } from '@/lib/supabase';
import { FiUserPlus, FiTrash2, FiEdit2, FiCheck, FiX, FiAlertCircle, FiUser, FiShield, FiInfo, FiUserCheck, FiUserX, FiEye, FiEyeOff, FiLoader, FiCode, FiEdit } from 'react-icons/fi';
import { FaMale, FaFemale, FaTransgender, FaQuestion, FaSearch, FaTimes } from 'react-icons/fa';
import type { FC, ReactElement } from 'react';
import ProfileSidebar from '@/components/layout/ProfileSidebar';
import { AddUserForm, EditUserForm, DeleteConfirmationForm } from '../forms/admin';
import { AdminFormData, UserEditFormData, Admin, UserRole, UserToDelete, TabType, SortField, BaseUser } from '../../types/admin';
import { useRouter } from 'next/router';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { Tooltip } from '@/components/ui/Tooltip';

const Container = styled.div`
  padding: 24px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text.primary};
`;

const Button = styled.button<{ $primary?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;

  ${props => props.$primary ? `
  background-color: #3B82F6;
  color: white;
  border: none;
  &:hover {
    background-color: #2563EB;
  }
  ` : `
    background-color: white;
    color: #0F172A;
    border: 1px solid #E5E7EB;
    &:hover {
      background-color: #F9FAFB;
    }
  `}
`;

const TableContainer = styled.div`
  background-color: white;
  border-radius: 0.75rem;
  border: 1px solid #E5E7EB;
  overflow: hidden;
  margin-top: 1.5rem;
  
  @media (max-width: 1024px) {
    display: none;
  }
`;

const TableScrollContainer = styled.div`
  width: 100%;
  
  @media (max-width: 1024px) {
    display: none;
  }
`;

const Table = styled.table`
  width: 100%;
`;

const TableHead = styled.thead`
  background-color: #F9FAFB;
  border-bottom: 1px solid #E5E7EB;
`;

const TableHeader = styled.th<{ $sortable?: boolean }>`
  padding: 1rem 1.5rem;
  text-align: left;
  font-size: 0.875rem;
  font-weight: 600;
  color: #0F172A;
  cursor: ${props => props.$sortable ? 'pointer' : 'default'};
  user-select: none;
  white-space: nowrap;
  position: relative;

  &:hover {
    background-color: ${props => props.$sortable ? '#F1F5F9' : 'transparent'};
  }
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
`;

const SortIcon = styled.span<{ $active: boolean; $direction: 'asc' | 'desc' }>`
  display: inline-flex;
  align-items: center;
  color: ${props => props.$active ? '#3B82F6' : '#9CA3AF'};
  transform: ${props => props.$direction === 'desc' ? 'rotate(180deg)' : 'none'};
  transition: all 0.2s ease;
  opacity: ${props => props.$active ? 1 : 0};
  visibility: ${props => props.$active ? 'visible' : 'hidden'};
  margin-left: 0.5rem;

  ${TableHeader}:hover & {
    opacity: 1;
    visibility: visible;
  }
`;

const TableBody = styled.tbody`
  tr {
    border-bottom: 1px solid #E5E7EB;
    &:hover {
      background-color: #F9FAFB;
    }
    &:last-child {
    border-bottom: none;
  }
  }
`;

const TableRow = styled.tr`
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #F9FAFB;
  }
`;

const TableCell = styled.td`
  padding: 1rem 1.5rem;
  color: #0F172A;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.875rem;
  font-weight: 500;
`;

const UserName = styled.span`
  font-weight: 500;
  font-size: 0.875rem;
`;

const UserEmail = styled.span`
  color: rgba(15, 23, 42, 0.7);
  font-weight: 500;
  font-size: 0.875rem;
`;

const Th = styled.th<{ $sortable?: boolean }>`
  padding: 12px 16px;
  text-align: left;
  color: rgb(107, 114, 128);
  border-bottom: 1px solid #E5E7EB;
  font-size: 0.875rem;
  cursor: ${props => props.$sortable ? 'pointer' : 'default'};
  user-select: none;
  
  &:first-child {
    padding-left: 16px;
    width: 50px;
  }
  
  &:last-child {
    padding-right: 16px;
    width: 120px;
  }
`;

const Td = styled.td`
  padding: 12px 16px;
  border-bottom: 1px solid #e5e7eb;
  color: ${props => props.theme.colors.text.primary};
  font-size: 0.875rem;
`;

const ActionButton = styled.button<{ $variant?: 'danger' | 'success' }>`
  font-size: 0.875rem;
  padding: 6px;
  background: none;
  border: none;
  cursor: pointer;
  color: ${props => props.$variant === 'danger' ? '#EF4444' : 
    props.$variant === 'success' ? '#10B981' : '#6B7280'};
  transition: color 0.2s;

  &:hover {
    color: ${props => props.$variant === 'danger' ? '#DC2626' : 
    props.$variant === 'success' ? '#059669' : '#4B5563'};
  }
`;

const ActionGroup = styled.div`
  display: flex;
  gap: 8px;
`;

const StatusBadge = styled.span<{ $status: 'active' | 'pending' | 'not-confirmed' }>`
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  background-color: ${props => {
    switch (props.$status) {
      case 'active':
        return '#05966910';
      case 'pending':
        return '#D9770610';
      case 'not-confirmed':
        return '#6B728010';
      default:
        return '#6B728010';
    }
  }};
  color: ${props => {
    switch (props.$status) {
      case 'active':
        return '#059669';
      case 'pending':
        return '#D97706';
      case 'not-confirmed':
        return '#1F2937';
      default:
        return '#1F2937';
    }
  }};
  text-transform: capitalize;
  display: inline-block;
  line-height: 1;
  min-width: 60px;
  text-align: center;
`;

const Modal = styled.div<{ $isOpen: boolean }>`
  display: ${props => props.$isOpen ? 'flex' : 'none'};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  justify-content: center;
  align-items: center;
  background-color: rgba(15, 23, 42, 0.75);
  z-index: 50;
  backdrop-filter: blur(2px);
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 16px 32px 32px 32px;
  border-radius: 12px;
  width: 100%;
  max-width: 530px;
  
  @media (max-width: 550px) {
    padding: 16px 20px 24px 20px;
    max-width: 95%;
    max-height: 85vh;
    overflow-y: auto;
  }
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ModalTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text.primary};
  
  @media (max-width: 550px) {
    font-size: 1.125rem;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #6B7280;
  cursor: pointer;
  padding: 4px;
  
  &:hover {
    color: ${props => props.theme.colors.text.primary};
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  
  @media (max-width: 550px) {
    gap: 12px;
  }
`;

const FormRow = styled.div`
  display: flex;
  gap: 16px;
  width: 100%;
  
  @media (max-width: 550px) {
    flex-direction: column;
    gap: 12px;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
  
  @media (max-width: 550px) {
    gap: 6px;
  }
`;

const RequiredAsterisk = styled.span`
  color: #EF4444;
  margin-left: 4px;
`;

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${props => props.theme.colors.text.primary};
  min-width: 120px;
  
  @media (max-width: 550px) {
    min-width: unset;
    font-size: 0.8125rem;
  }
`;

const Input = styled.input`
   padding: 8px 12px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 0.875rem;

  &:focus {
    outline: none;
    border-color: #3B82F6;
  }
  
  @media (max-width: 550px) {
    padding: 8px 10px;
    font-size: 0.8125rem;
  }
`;

const Select = styled.select`
  padding: 8px 12px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  font-size: 0.875rem;
  background-color: white;

  &:focus {
    outline: none;
    border-color: #3B82F6;
  }
  
  @media (max-width: 550px) {
    padding: 8px 10px;
    font-size: 0.8125rem;
  }
`;

const ErrorMessage = styled.div`
  color: #DC2626;
  font-size: 0.875rem;
  margin-top: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
  
  svg {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
  }
  
  @media (max-width: 550px) {
    font-size: 0.8125rem;
    margin-top: 6px;
    gap: 6px;
    
    svg {
      width: 14px;
      height: 14px;
    }
  }
`;

// Rename the first SuccessMessage to SuccessAlert
const SuccessAlert = styled.div`
  color: #059669;
  font-size: 0.875rem;
  margin-top: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const HelperText = styled.div`
  font-size: 0.75rem;
  color: #6b7280;
  display: flex;
  align-items: center;
  gap: 4px;
  
  @media (max-width: 550px) {
    font-size: 0.6875rem;
    gap: 3px;
  }
`;

const RoleSelectContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
`;

const RoleIcon = styled.div`
  position: absolute;
  right: .5rem;
  top: 50%;
  transform: translateY(-50%);
  color: #374151;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
`;

const RoleSelect = styled.select`
  width: 100%;
  padding: 8px 12px;
  padding-right: 12px;
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
  
  @media (max-width: 550px) {
    padding: 8px 10px;
    padding-right: 24px;
    font-size: 0.8125rem;
  }
`;

const ButtonGroup = styled.div`
  font-size: 0.875rem;
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 16px;
  
  @media (max-width: 550px) {
    gap: 8px;
    margin-top: 12px;
    flex-direction: column;
  }
`;

const ModalButton = styled.button`
font-size: 0.875rem;  
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  @media (max-width: 550px) {
    padding: 10px 16px;
    width: 100%;
  }
`;

const CancelButton = styled(ModalButton)`
  background: transparent;
  border: 1.5px solid #9aa2b3;
  color: ${props => props.theme.colors.text.primary};

  &:hover {
    background: ${props => props.theme.colors.background.secondary};
    border-color: ${props => props.theme.colors.text.primary};
  }
`;

const DeleteButton = styled(ModalButton)`
  background-color: #EF4444;
  color: white;

  &:hover {
    background-color: #DC2626;
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

const DisabledInput = styled(Input)`
  background-color: #F3F4F6;
  color: #6B7280;
  cursor: not-allowed;
`;

const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const LoadingText = styled.div`
  margin-top: 16px;
  color: #374151;
  font-size: 0.875rem;
  font-weight: 500;
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  
  @media (max-width: 470px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const SearchWrapper = styled.div`
  position: relative;
  width: 16rem;

  @media (max-width: 470px) {
    width: 100%;
  }
`;

const StyledSearchInput = styled.input`
    padding: 0.5rem 1rem 0.5rem 2.5rem;
  border: 1px solid #E5E7EB;
    border-radius: 0.5rem;
  width: 100%;
  font-size: 0.875rem;
  background-color: white;
  height: 2.5rem;
  box-sizing: border-box;
  &::placeholder {
    color: rgba(15, 23, 42, 0.4);
  }
`;

const InfoMessage = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px;
  background-color: #F3F4F6;
  border-radius: 6px;
  color: #4B5563;
  margin-bottom: 16px;
  font-size: 0.875rem;
`;

const PasswordInputContainer = styled.div`
  position: relative;
  width: 100%;
  
  @media (max-width: 550px) {
    display: flex;
  }
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
  color: #6B7280;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    color: #374151;
  }
`;

// Add Avatar styled component
const Avatar = styled.div<{ $imageUrl?: string; $isLoading?: boolean }>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #f1f1f1;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  flex-shrink: 0;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: ${props => props.$isLoading ? 0 : 1};
    transition: opacity 0.2s ease;
  }

  svg {
    width: 20px;
    height: 20px;
    color: #6B7280;
    opacity: ${props => props.$isLoading ? 0 : 1};
    transition: opacity 0.2s ease;
  }
`;

const AvatarSpinner = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid rgba(59, 130, 246, 0.1);
  border-radius: 50%;
  border-top-color: #3B82F6;
  animation: spin 1s linear infinite;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  @keyframes spin {
    0% { transform: translate(-50%, -50%) rotate(0deg); }
    100% { transform: translate(-50%, -50%) rotate(360deg); }
  }
`;

const StyledAddUserButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #3B82F6;
  color: white;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  border: none;
  height: 2.5rem;
  box-sizing: border-box;
  cursor: pointer;
  transition: background-color 0.2s;
  &:hover {
    background-color: #2563EB;
  }

  @media (max-width: 470px) {
    display: none;
  }
`;

const CircularAddButton = styled.button`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  background-color: #3B82F6;
  color: white;
  border: none;
  display: none;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transition: all 0.2s ease;
  z-index: 40;

  @media (max-width: 470px) {
    display: flex;
  }

  &:hover {
    background-color: #2563EB;
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }

  svg {
    width: 1.5rem;
    height: 1.5rem;
  }
`;

interface AdminManagementTabProps {
  onUserDeleted?: () => void;
  onModalStateChange?: (isOpen: boolean) => void;
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

// Add email validation function
const isValidEmail = (email: string): boolean => {
  const normalized = normalizeEmail(email);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(normalized);
};

const GlobalStyles = createGlobalStyle`
  @media (max-width: 470px) {
    .full-text {
      display: none;
    }
    .short-text {
      display: inline !important;
    }
  }
`;

// Add styled component for success message
const StyledSuccessMessage = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background-color: #ECFDF5;
  border-radius: 0.375rem;
  color: #059669;
  font-size: 0.875rem;
  margin-bottom: 1rem;
`;

interface LastSignInData {
  id: string;
  last_sign_in_at: string | null;
}

interface ProfileData {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  created_at: string;
  phone_number: string | null;
  gender: string | null;
  username: string | null;
  profile_picture_url: string | null;
  role: string;
  location: string;
}

// Update the CurrentUserIndicator styled component
const CurrentUserIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: rgb(107, 114, 128);
  font-size: 0.875rem;
  padding: 0.5rem;

  svg {
    width: 1.25rem;
    height: 1.25rem;
  }
`;

const AdminManagementTab: FC<AdminManagementTabProps> = ({ onUserDeleted, onModalStateChange }): ReactElement => {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [allUsers, setAllUsers] = useState<UserRole[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState<Admin | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null); // Add this line
  const [formData, setFormData] = useState<AdminFormData>({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user'
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [modalError, setModalError] = useState<string | null>(null);
  const [modalSuccess, setModalSuccess] = useState<string | null>(null);
  const [isConfirmingDelete, setIsConfirmingDelete] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>('users');
  const [isCurrentUserAdmin, setIsCurrentUserAdmin] = useState(false);
  const [selectedUser, setSelectedUser] = useState<Admin | UserRole | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState<UserEditFormData>({
    email: '',
    password: '',
    role: 'user',
    first_name: '',
    last_name: '',
    phone_number: '',
    location: '',
    gender: '',
    username: '',
    profile_picture: null
  });
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [filterEmail, setFilterEmail] = useState('');
  const [sortField, setSortField] = useState<SortField>('email');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<UserToDelete | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [showSortIcon, setShowSortIcon] = useState(false);
  const [activeSortColumn, setActiveSortColumn] = useState<SortField | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastAttemptTime, setLastAttemptTime] = useState<number | null>(null);
  const retryTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [rateLimitCountdown, setRateLimitCountdown] = useState<number | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const countdownRef = useRef<NodeJS.Timeout | null>(null);
  const MAX_RETRIES = 2;
  const INITIAL_RETRY_DELAY = 10000; // 10 seconds
  const requestQueue = useRef<Array<() => Promise<void>>>([]);
  const isProcessing = useRef(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState<boolean | null>(null);
  const [passwordLength, setPasswordLength] = useState<boolean>(false);
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [checkingUsername, setCheckingUsername] = useState(false);
  const [usernameExists, setUsernameExists] = useState<boolean | null>(null);
  const [currentUsername, setCurrentUsername] = useState<string>('');

  // Add ref for timeout
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Add back the showSuccessModal state
  const [loadingProfilePictures, setLoadingProfilePictures] = useState<{ [key: string]: boolean }>({});
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Add pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  // Add pagination controls component
  const PaginationControls = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1rem;
    padding: 1rem;
    background-color: white;
    border-top: 1px solid #E5E7EB;
    
    @media (max-width: 470px) {
      flex-direction: column;
      gap: 1rem;
      padding: 0.75rem;
    }
  `;

  const PageInfo = styled.div`
    font-size: 0.875rem;
    color: #6B7280;
    
    @media (max-width: 470px) {
      font-size: 0.75rem;
      text-align: center;
    }
  `;

  const PageButtons = styled.div`
    display: flex;
    gap: 0.5rem;
    
    @media (max-width: 470px) {
      flex-wrap: wrap;
      justify-content: center;
      max-width: 100%;
    }
  `;

  const PageButton = styled.button<{ $active?: boolean }>`
    padding: 0.5rem 0.75rem;
    border: 1px solid #E5E7EB;
    border-radius: 0.375rem;
    background-color: ${props => props.$active ? '#3B82F6' : 'white'};
    color: ${props => props.$active ? 'white' : '#374151'};
    font-size: 0.875rem;
    cursor: pointer;
    transition: all 0.2s;

    &:hover:not(:disabled) {
      background-color: ${props => props.$active ? '#2563EB' : '#F9FAFB'};
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    
    @media (max-width: 470px) {
      padding: 0.375rem 0.5rem;
      font-size: 0.75rem;
      min-width: 2rem;
    }
  `;

  // Add pagination logic
  const getPaginatedData = (data: (Admin | UserRole)[]) => {
    // First deduplicate data by user ID
    const uniqueData = Array.from(new Map(data.map(user => [user.id, user])).values());

    // Then apply filtering
    const filteredData = uniqueData.filter(user => {
      // Role filtering
      if (activeTab === 'developers') return user.roles.includes('developer');
      if (activeTab === 'authors') return user.roles.includes('author');
      if (activeTab === 'admins') return user.roles.includes('admin');
      if (activeTab === 'moderators') return user.roles.includes('moderator');
      if (activeTab === 'regular-users') return user.roles.includes('user');
      return true;
    }).filter(user => {
      // Search filtering
      if (!filterEmail) return true;
      const searchTerm = filterEmail.toLowerCase();
      const fullName = `${user.first_name || ''} ${user.last_name || ''}`.toLowerCase();
      const email = user.email.toLowerCase();
      const lastSignIn = user.last_sign_in ? new Date(user.last_sign_in).toLocaleDateString().toLowerCase() : '';
      const createdDate = new Date(user.created_at).toLocaleDateString().toLowerCase();
      
      return fullName.includes(searchTerm) || 
             email.includes(searchTerm) || 
             lastSignIn.includes(searchTerm) ||
             createdDate.includes(searchTerm);
    });

    // Then apply sorting
    const sortedData = [...filteredData].sort((a, b) => {
      const direction = sortDirection === 'asc' ? 1 : -1;
      switch (sortField) {
        case 'email':
          return direction * (a.email || '').localeCompare(b.email || '');
        case 'name':
          const nameA = `${a.first_name || ''} ${a.last_name || ''}`.trim().toLowerCase();
          const nameB = `${b.first_name || ''} ${b.last_name || ''}`.trim().toLowerCase();
          return direction * nameA.localeCompare(nameB);
        case 'roles':
          const rolesA = (a.roles || []).join(',').toLowerCase();
          const rolesB = (b.roles || []).join(',').toLowerCase();
          return direction * rolesA.localeCompare(rolesB);
        case 'last_sign_in':
          const dateA = a.last_sign_in ? new Date(a.last_sign_in).getTime() : 0;
          const dateB = b.last_sign_in ? new Date(b.last_sign_in).getTime() : 0;
          return direction * (dateA - dateB);
        default:
          return 0;
      }
    });

    // Finally apply pagination
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return sortedData.slice(startIndex, endIndex);
  };

  // Update total pages calculation to use filtered data
  const getTotalPages = (data: (Admin | UserRole)[]) => {
    // First deduplicate data by user ID
    const uniqueData = Array.from(new Map(data.map(user => [user.id, user])).values());

    // Then apply filtering
    const filteredData = uniqueData.filter(user => {
      // Role filtering
      if (activeTab === 'developers') return user.roles.includes('developer');
      if (activeTab === 'authors') return user.roles.includes('author');
      if (activeTab === 'admins') return user.roles.includes('admin');
      if (activeTab === 'moderators') return user.roles.includes('moderator');
      if (activeTab === 'regular-users') return user.roles.includes('user');
      return true;
    }).filter(user => {
      // Search filtering
      if (!filterEmail) return true;
      const searchTerm = filterEmail.toLowerCase();
      const fullName = `${user.first_name || ''} ${user.last_name || ''}`.toLowerCase();
      const email = user.email.toLowerCase();
      const lastSignIn = user.last_sign_in ? new Date(user.last_sign_in).toLocaleDateString().toLowerCase() : '';
      const createdDate = new Date(user.created_at).toLocaleDateString().toLowerCase();
      
      return fullName.includes(searchTerm) || 
             email.includes(searchTerm) || 
             lastSignIn.includes(searchTerm) ||
             createdDate.includes(searchTerm);
    });

    return Math.ceil(filteredData.length / rowsPerPage);
  };

  // Get total filtered count for display
  const getFilteredCount = (data: (Admin | UserRole)[]) => {
    const uniqueData = Array.from(new Map(data.map(user => [user.id, user])).values());
    return uniqueData.filter(user => {
      if (activeTab === 'developers') return user.roles.includes('developer');
      if (activeTab === 'authors') return user.roles.includes('author');
      if (activeTab === 'admins') return user.roles.includes('admin');
      if (activeTab === 'moderators') return user.roles.includes('moderator');
      if (activeTab === 'regular-users') return user.roles.includes('user');
      return true;
    }).filter(user => {
      if (!filterEmail) return true;
      const searchTerm = filterEmail.toLowerCase();
      const fullName = `${user.first_name || ''} ${user.last_name || ''}`.toLowerCase();
      const email = user.email.toLowerCase();
      const lastSignIn = user.last_sign_in ? new Date(user.last_sign_in).toLocaleDateString().toLowerCase() : '';
      const createdDate = new Date(user.created_at).toLocaleDateString().toLowerCase();
      
      return fullName.includes(searchTerm) || 
             email.includes(searchTerm) || 
             lastSignIn.includes(searchTerm) ||
             createdDate.includes(searchTerm);
    }).length;
  };

  const totalPages = getTotalPages([...admins, ...allUsers]);
  const totalFilteredCount = getFilteredCount([...admins, ...allUsers]);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, filterEmail, sortField, sortDirection]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    checkCurrentUserRole();
    fetchAdmins();
    fetchAllUsers();
  }, []);

  const checkCurrentUserRole = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      setCurrentUserId(user.id); // Add this line

      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      setIsCurrentUserAdmin(profile?.role === 'admin');
    } catch (error) {
      console.error('Error checking user role:', error);
      setIsCurrentUserAdmin(false);
    }
  };

  const fetchAllUsers = async () => {
    try {
      // Get profiles
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
        .returns<ProfileData[]>()
        .order('created_at', { ascending: false });

      if (profilesError) throw profilesError;
      if (!profiles) throw new Error('No profiles found');

      // Get last sign in times for all users using RPC
      const { data: authUsers, error: authError } = await supabase
        .rpc('get_user_last_sign_in', {
          user_ids: profiles.map(p => p.id)
        });

      if (authError) throw authError;

      // Create a map of user IDs to their last sign in times
      const lastSignInMap = new Map<string, string | null>();
      if (authUsers) {
        (authUsers as LastSignInData[]).forEach(user => {
          lastSignInMap.set(user.id, user.last_sign_in_at);
        });
      }

      const formattedUsers: UserRole[] = profiles.map(profile => {
        const lastSignIn = lastSignInMap.get(profile.id) || null;
        return {
          id: profile.id,
          email: profile.email,
          first_name: profile.first_name || '',
          last_name: profile.last_name || '',
          created_at: profile.created_at,
          last_sign_in: lastSignIn,
          phone_number: profile.phone_number || '', // Change from phone to phone_number
          gender: profile.gender || '',
          username: profile.username || '',
          profile_picture: profile.profile_picture_url || '',
          role: profile.role as 'user' | 'admin' | 'moderator' | 'developer' | 'author',
          roles: [profile.role],
          status: 'active',
          location: profile.location || ''
        };
      });

      setAllUsers(formattedUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Failed to fetch users. Please try again.');
    }
  };

  const fetchAdmins = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data: users, error: usersError } = await supabase
        .from('profiles')
        .select('*')
        .eq('role', 'admin')
        .order('created_at', { ascending: false });

      if (usersError) {
        throw new Error('Database error: ' + usersError.message);
      }

      if (!users || users.length === 0) {
        setAdmins([]);
        return;
      }

      const formattedAdmins: Admin[] = users.map(user => ({
        id: user.id,
        email: user.email,
        status: 'active',
        created_at: user.created_at,
        last_sign_in: user.last_sign_in_at || null,
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        phone_number: user.phone_number || '', // Change from phone to phone_number
        gender: user.gender || '',
        username: user.username || '',
        roles: [user.role],
        role: 'admin',
        location: user.location || ''
      }));

      setAdmins(formattedAdmins);
    } catch (error) {
      console.error('Error fetching admins:', error);
      setError(error instanceof Error ? error.message : 'Failed to fetch admins. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddAdmin = () => {
    setFormData({
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: 'user'
    });
    setIsModalOpen(true);
  };

  const handleEditAdmin = (admin: Admin) => {
    setSelectedUser(admin);
    setEditFormData({
      email: admin.email,
      password: '',
      role: admin.role,
      first_name: admin.first_name,
      last_name: admin.last_name,
      phone_number: admin.phone_number || '', // Change from phone to phone_number
      location: admin.location || '',
      gender: admin.gender,
      username: admin.username,
      profile_picture: admin.profile_picture || null
    });
    setIsEditModalOpen(true);
    onModalStateChange?.(true);
  };

  const handleEditUser = (user: Admin | UserRole) => {
    setSelectedUser(user);
    setEditFormData({
      email: user.email,
      password: '',
      role: user.role,
      first_name: user.first_name || '',
      last_name: user.last_name || '',
      phone_number: user.phone_number || '', // Change from phone to phone_number
      location: user.location || '',
      gender: user.gender || '',
      username: user.username || '',
      profile_picture: user.profile_picture || null
    });
    setIsEditModalOpen(true);
    onModalStateChange?.(true);
  };

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  // Cleanup retry timeout on unmount
  useEffect(() => {
    return () => {
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
      }
    };
  }, []);

  // Add cleanup for countdown timer
  useEffect(() => {
    return () => {
      if (countdownRef.current) {
        clearInterval(countdownRef.current);
      }
    };
  }, []);

  // Add cleanup for timers
  useEffect(() => {
    return () => {
      if (countdownRef.current) {
        clearInterval(countdownRef.current);
      }
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
      }
    };
  }, []);

  const processQueue = async () => {
    if (isProcessing.current || requestQueue.current.length === 0) return;
    
    isProcessing.current = true;
    const nextRequest = requestQueue.current.shift();
    
    if (nextRequest) {
      try {
        await nextRequest();
      } catch (error) {
        console.error('Error processing request:', error);
        // Don't rethrow the error, just log it
        // The error will be handled by the modal error state
      } finally {
        isProcessing.current = false;
        if (requestQueue.current.length > 0) {
          setTimeout(processQueue, 1000); // Wait 1 second between requests
        }
      }
    }
  };

  const addToQueue = (request: () => Promise<void>) => {
    requestQueue.current.push(request);
    if (!isProcessing.current) {
      processQueue();
    }
  };

  const startRateLimitCountdown = (delay: number) => {
    setRateLimitCountdown(Math.ceil(delay / 1000));
    if (countdownRef.current) {
      clearInterval(countdownRef.current);
    }
    countdownRef.current = setInterval(() => {
      setRateLimitCountdown(prev => {
        if (prev === null || prev <= 1) {
          if (countdownRef.current) {
            clearInterval(countdownRef.current);
          }
          return null;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const isFormValid = () => {
    return (
      formData.first_name.trim() !== '' &&
      formData.last_name.trim() !== '' &&
      formData.email.trim() !== '' &&
      formData.password.trim() !== '' &&
      formData.confirmPassword.trim() !== '' &&
      passwordsMatch === true &&
      passwordLength
    );
  };

  const handleSubmit = async (formData: AdminFormData) => {
    try {
      setIsSubmitting(true);
      setModalError(null);

    if (formData.password !== formData.confirmPassword) {
      setModalError('Passwords do not match');
          return;
        }

        // Validate email format
        if (!isValidEmail(formData.email)) {
          setModalError('Please enter a valid email address');
          return;
        }

        // Normalize email before checking existence
        const normalizedEmail = normalizeEmail(formData.email);

      // Check if email already exists
        const { data: existingUser, error: checkError } = await supabase
        .from('profiles')
        .select('email')
        .eq('email', normalizedEmail)
          .single();

        if (checkError && checkError.code !== 'PGRST116') {
        setModalError('Error checking email: ' + checkError.message);
          return;
        }

        if (existingUser) {
        setModalError('Email already exists');
          return;
        }

        // Try to create user with longer delays between attempts
        let retries = 0;
        const maxRetries = 2;
        const baseDelay = 30000; // 30 seconds
        let authData: any = null;

        const createUserWithRetry = async () => {
          try {
            const result = await supabase.auth.signUp({
              email: normalizedEmail,
              password: formData.password,
              options: {
              emailRedirectTo: `${window.location.origin}/auth/callback/direct`
              }
            });

            if (result.error) {
              if (result.error.message.includes('rate limit')) {
                if (retries < maxRetries) {
                  retries++;
                  const delay = baseDelay * Math.pow(2, retries - 1);
                  setModalError(`Rate limit exceeded. Please wait ${delay/1000} seconds before trying again.`);
                  await new Promise(resolve => setTimeout(resolve, delay));
                  return createUserWithRetry();
                }
                // If we've exhausted retries, show a more helpful message
                const retryDelay = 300000; // 5 minutes
                startRateLimitCountdown(retryDelay);
                setModalError('Too many attempts! Please wait a few minutes before trying again.');
                return;
              }
              throw result.error;
            }

            authData = result.data;
          } catch (error) {
            if (error instanceof Error && error.message.includes('rate limit') && retries < maxRetries) {
              retries++;
              const delay = baseDelay * Math.pow(2, retries - 1);
              setModalError(`Rate limit exceeded. Please wait ${delay/1000} seconds before trying again.`);
              await new Promise(resolve => setTimeout(resolve, delay));
              return createUserWithRetry();
            }
            throw error;
          }
        };

        await createUserWithRetry();

        if (!authData?.user) {
          return;
        }

        // Create user profile using RPC function
        const { error: profileError } = await supabase.rpc('update_user_profile_v2', {
        target_user_id: authData.user.id,
        update_data: {
          first_name: formData.first_name,
          last_name: formData.last_name
        },
        p_new_role: formData.role
        });

        if (profileError) {
          setModalError('Error creating user profile: ' + profileError.message);
          return;
        }

        // Log the user creation activity for the admin
        const { data: { user: adminUser } } = await supabase.auth.getUser();
        if (adminUser) {
        // Log with a more appropriate action type and structure
        await supabase.from('admin_audit_log').insert({
          admin_id: adminUser.id,
          action: 'ADD_NEW_USER',
          details: {
            new_user_id: authData.user.id,
            user_details: {
              email: normalizedEmail,
              first_name: formData.first_name,
              last_name: formData.last_name,
              role: formData.role
            },
            created_at: new Date().toISOString()
          },
          ip_address: process.env.NODE_ENV === 'production' ? 'REDACTED' : '127.0.0.1'
          });
        }

      setIsModalOpen(false);
      setFormData({ first_name: '', last_name: '', email: '', password: '', confirmPassword: '', role: 'user' });
        setRetryCount(0);
        setPasswordsMatch(null);
        setPasswordLength(false);
        await fetchAllUsers();
    } catch (error) {
      console.error('Error creating user:', error);
      setModalError(error instanceof Error ? error.message : 'Failed to create user. Please try again.');
      } finally {
        setIsSubmitting(false);
    }
  };

  const handleDeleteUser = async (user: UserToDelete | string) => {
    try {
      const userId = typeof user === 'string' ? user : user.id;
      const userEmail = typeof user === 'string' ? '' : user.email;
      const userName = typeof user === 'string' ? '' : `${user.first_name} ${user.last_name}`.trim();
      
      // Delete user completely using the new RPC function
      const { error: deleteError } = await supabase.rpc('delete_user_completely', {
        target_user_id: userId
      });

      if (deleteError) {
        console.error('Error deleting user:', deleteError);
        throw new Error('Failed to delete user');
      }

      // Log the deletion activity for the admin
      const { data: { user: adminUser } } = await supabase.auth.getUser();
      if (adminUser) {
        await supabase.rpc('log_profile_change', {
          p_user_id: adminUser.id,
          p_type: 'user_deletion',
          p_description: `Deleted User

Name: ${userName || 'N/A'}
Email: ${userEmail || userId}
Role: ${typeof user === 'string' ? 'N/A' : user.roles.map(role => role.charAt(0).toUpperCase() + role.slice(1)).join(', ')}`
        });
      }

      // Close the delete modal first
      setIsDeleteModalOpen(false);
      setUserToDelete(null);
      setErrorMessage('');

      // Then show success message
      await fetchAllUsers();
    } catch (error) {
      console.error('Error in handleDeleteUser:', error);
      setErrorMessage(error instanceof Error ? error.message : 'Failed to delete user');
    }
  };

  const handleUpdateUserRole = async (userId: string, newRole: string) => {
    try {
      // First, remove any existing roles for this user
      const { error: deleteError } = await supabase
        .from('user_roles')
        .delete()
        .eq('user_id', userId);

      if (deleteError) throw deleteError;

      // Then add the new role
      const { error: insertError } = await supabase
        .from('user_roles')
        .insert([
          {
            user_id: userId,
            role: newRole,
            created_at: new Date().toISOString()
          }
        ]);

      if (insertError) throw insertError;

      // Refresh the user list
      await fetchAllUsers();
      setSuccess('User role updated successfully');
    } catch (error) {
      console.error('Error updating user role:', error);
      setError(error instanceof Error ? error.message : 'Failed to update user role');
    }
  };

  const handleDeleteConfirm = async () => {
    if (!userToDelete) return;
    
    try {
      // Use handleDeleteUser for all roles (user, admin, moderator)
      await handleDeleteUser(userToDelete);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleEditSubmit = async (formData: UserEditFormData): Promise<void> => {
    console.log('Starting user update process...');

    if (!selectedUser) {
      console.error('No user selected for update');
      setModalError('No user selected for update');
      return;
    }

    // Validate required fields
    if (!formData.first_name.trim() || !formData.last_name.trim() || !formData.username.trim()) {
      setModalError('First name, last name, and username are required');
      return;
    }

    // Validate password if provided
    if (formData.password && formData.password.length < 6) {
      setModalError('Password must be at least 6 characters long');
      return;
    }

    setIsSubmitting(true);
    setModalError(null);

    try {
      console.log('Preparing update data...');
      const updateData = {
        first_name: formData.first_name.trim(),
        last_name: formData.last_name.trim(),
        username: formData.username.trim(),
        ...(formData.phone_number && { phone_number: formData.phone_number.replace(/[^\d+]/g, '') }),
        ...(formData.location && { location: formData.location }),
        ...(formData.gender && { gender: formData.gender }),
        ...(formData.profile_picture && { profile_picture_url: formData.profile_picture.trim() })
      };

      // Call the update function
      const { error: updateError } = await supabase
        .rpc('update_user_profile_v2', {
          target_user_id: selectedUser.id,
          update_data: updateData,
          p_new_role: formData.role,
          p_new_password: formData.password || null
        });

      if (updateError) {
        throw new Error(updateError.message);
      }

      // Close modal immediately after successful update
      setIsEditModalOpen(false);
      
      // Then refresh the data in the background
      try {
        await fetchAllUsers();
        const updatedUser = [...admins, ...allUsers].find(user => user.id === selectedUser.id);
        if (updatedUser) {
          setSelectedUser(updatedUser);
          setEditFormData({
            email: updatedUser.email,
            password: '',
            role: updatedUser.role,
            first_name: updatedUser.first_name || '',
            last_name: updatedUser.last_name || '',
            phone_number: updatedUser.phone_number || '',
            location: updatedUser.location || '',
            gender: updatedUser.gender || '',
            username: updatedUser.username || '',
            profile_picture: updatedUser.profile_picture || null
          });
        }
      } catch (fetchError) {
        console.error('Error refreshing user data:', fetchError);
        // Don't throw here - the update was successful, we just couldn't refresh the view
      }
    } catch (err) {
      console.error('Error in handleEditSubmit:', err);
      setModalError(err instanceof Error ? err.message : 'Failed to update user');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleModalClose = () => {
    setIsEditModalOpen(false);
    setSelectedUser(null);
    setModalError(null);
    setUsernameError(null);
    setUsernameExists(null);
    setCheckingUsername(false);
    setCurrentUsername('');
    setPasswordsMatch(null);
    setPasswordLength(false);
    // Remove the editFormData reset since we want to preserve the data
    onModalStateChange?.(false);
  };

  const handleDeleteClick = (user: UserRole) => {
    setUserToDelete(user);
    setIsDeleteModalOpen(true);
    onModalStateChange?.(true);
  };

  // Update the handleSort function
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
    setActiveSortColumn(field);
  };

  const sortAdmins = (data: Admin[]) => {
    const direction = sortDirection === 'asc' ? 1 : -1;
    
    return [...data].sort((a, b) => {
      switch (sortField) {
        case 'email':
          return direction * a.email.localeCompare(b.email);
        case 'last_sign_in':
          const dateA = a.last_sign_in ? new Date(a.last_sign_in).getTime() : 0;
          const dateB = b.last_sign_in ? new Date(b.last_sign_in).getTime() : 0;
          return direction * (dateA - dateB);
        default:
          return 0;
      }
    });
  };

  const sortUsers = (data: UserRole[]) => {
    const direction = sortDirection === 'asc' ? 1 : -1;
    
    return [...data].sort((a, b) => {
      switch (sortField) {
        case 'email':
          return direction * a.email.localeCompare(b.email);
        case 'roles':
          return direction * a.roles.join(',').localeCompare(b.roles.join(','));
        case 'last_sign_in':
          const dateA = a.last_sign_in ? new Date(a.last_sign_in).getTime() : 0;
          const dateB = b.last_sign_in ? new Date(b.last_sign_in).getTime() : 0;
          return direction * (dateA - dateB);
        default:
          return 0;
      }
    });
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const validateUsername = (value: string) => {
    // Allow empty value for backspace
    if (!value) {
      setUsernameError(null);
      setUsernameExists(null);
      return false;
    }
    if (!/^[a-zA-Z0-9._-]*$/.test(value)) {
      setUsernameError('Special characters are not allowed');
      setUsernameExists(null);
      return false;
    }
    setUsernameError(null);
    checkUsernameExists(value);
    return true;
  };

  const checkUsernameExists = async (username: string) => {
    if (!username) {
      setUsernameExists(null);
      setCheckingUsername(false);
      return;
    }

    try {
      setCheckingUsername(true);

      // Get the profile of the user being edited from user_details view
      const { data: userProfile } = await supabase
        .from('user_details')
        .select('username')
        .eq('user_id', selectedUser?.id)
        .single();

      console.log('User being edited:', {
        selectedUserId: selectedUser?.id,
        currentUsername: userProfile?.username,
        inputUsername: username
      });

      // Store current username for UI comparison
      if (userProfile?.username) {
        setCurrentUsername(userProfile.username);
      }

      // If username is the same as the user being edited, set exists to true and return early
      if (userProfile?.username === username) {
        console.log('Username matches current user being edited');
        setUsernameExists(true);
        setCheckingUsername(false);
        return;
      }

      console.log('Checking username:', username);
      
      // Query the user_details view with a simpler approach
      const { data, error } = await supabase
        .from('user_details')
        .select('username, user_id')
        .eq('username', username)
        .limit(1);

      console.log('Query response:', { data, error });

      if (error) {
        console.error('Error checking username:', error);
        setUsernameExists(null);
      } else if (data && data.length > 0) {
        // If we found a user with this username, check if it's the same user we're editing
        const foundUser = data[0];
        console.log('Found user:', {
          foundUserId: foundUser.user_id,
          selectedUserId: selectedUser?.id,
          isSameUser: foundUser.user_id === selectedUser?.id
        });

        // Only set usernameExists to true for "This is the current username" if it's the same user
        if (foundUser.user_id === selectedUser?.id) {
          console.log('Username belongs to the same user being edited');
          setUsernameExists(true); // It's the same user's current username
        } else {
          console.log('Username belongs to a different user');
          setUsernameExists(true); // Username is taken by another user
        }
      } else {
        console.log('Username is available');
        setUsernameExists(false); // Username is available
      }
    } catch (error) {
      console.error('Error checking username:', error);
      setUsernameExists(null);
    } finally {
      setCheckingUsername(false);
    }
  };

  // Update isBasicInfoValid function
  const isBasicInfoValid = () => {
    return formData.first_name.trim() !== '' && 
           formData.last_name.trim() !== '';
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof AdminFormData) => {
    const value = e.target.value;
    // Allow empty value for backspace
    if (value === '') {
      setFormData(prev => ({ ...prev, [field]: value }));
      return;
    }
    
    // Validate pattern only if there's input
    if (e.target.validity.valid) {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const filterUsersByRole = (users: UserRole[], role: TabType) => {
    const searchTerm = filterEmail.toLowerCase();
    
    return users.filter(user => {
      const name = `${user.first_name || ''} ${user.last_name || ''}`.trim().toLowerCase();
      const email = user.email.toLowerCase();
      const roles = user.roles.join(' ').toLowerCase();
      
      const matchesSearch = name.includes(searchTerm) || 
                          email.includes(searchTerm) || 
                          roles.includes(searchTerm);

      switch (role) {
        case 'regular-users':
          return user.roles.includes('user') && 
                 !user.roles.includes('admin') && 
                 !user.roles.includes('moderator') && 
                 matchesSearch;
        case 'moderators':
          return user.roles.includes('moderator') && matchesSearch;
        case 'admins':
          return user.roles.includes('admin') && matchesSearch;
        case 'users':
        default:
          return matchesSearch;
      }
    });
  };

  // Add password validation functions
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData({ ...formData, password: value });
    setPasswordLength(value.length >= 8);
    if (formData.confirmPassword) {
      setPasswordsMatch(value === formData.confirmPassword);
    }
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData({ ...formData, confirmPassword: value });
    if (formData.password) {
      setPasswordsMatch(value === formData.password);
    }
  };

  // Update the handleImageLoad function to be more robust
  const handleImageLoad = (userId: string) => {
    console.log('Image loaded for user:', userId); // Debug log
    setLoadingProfilePictures(prev => {
      const newState = { ...prev };
      delete newState[userId]; // Remove the loading state completely
      return newState;
    });
  };

  // Update the handleImageError function to be more robust
  const handleImageError = (userId: string) => {
    console.log('Image error for user:', userId); // Debug log
    setLoadingProfilePictures(prev => {
      const newState = { ...prev };
      delete newState[userId]; // Remove the loading state completely
      return newState;
    });
  };

  // Update the initialization of loading states to be more precise
  useEffect(() => {
    const initializeLoadingStates = (users: (UserRole | Admin)[]) => {
      const loadingStates: { [key: string]: boolean } = {};
      users.forEach(user => {
        if (user.profile_picture) {
          // Create an image object to check if it's already cached
          const img = new Image();
          img.src = user.profile_picture;
          
          if (img.complete) {
            // Image is already loaded/cached
            console.log('Image already loaded for user:', user.id);
          } else {
            // Image needs to be loaded
            console.log('Setting loading state for user:', user.id);
            loadingStates[user.id] = true;
          }
        }
      });
      setLoadingProfilePictures(loadingStates);
    };

    if (allUsers.length > 0) {
      initializeLoadingStates(allUsers);
    }
  }, [allUsers]);

  const handleNameClick = (user: Admin | UserRole) => {
    setSelectedUser(user);
    setIsProfileOpen(true);
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Change the implementation to use a helper function for pagination that doesn't require IIFE
  const renderPaginationButtons = (currentPage: number, totalPages: number) => {
    const pages = [];
    // Use a fixed value for mobile screens
    const maxVisiblePages = 3;
    
    if (totalPages <= maxVisiblePages) {
      // Show all pages if there are fewer than the max visible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);
      
      // Calculate start and end of visible range around current page
      let startPage = Math.max(2, currentPage - Math.floor(maxVisiblePages / 2));
      let endPage = Math.min(totalPages - 1, startPage + maxVisiblePages - 3);
      
      // Adjust if at the beginning
      if (currentPage <= Math.floor(maxVisiblePages / 2)) {
        endPage = maxVisiblePages - 1;
      }
      
      // Adjust if at the end
      if (currentPage > totalPages - Math.floor(maxVisiblePages / 2)) {
        startPage = totalPages - maxVisiblePages + 2;
      }
      
      // Add ellipsis after first page if needed
      if (startPage > 2) {
        pages.push('...');
      }
      
      // Add visible range of pages
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      
      // Add ellipsis before last page if needed
      if (endPage < totalPages - 1) {
        pages.push('...');
      }
      
      // Always show last page
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }
    
    return pages.map((page, index) => 
      typeof page === 'number' ? (
        <PageButton
          key={index}
          $active={currentPage === page}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </PageButton>
      ) : (
        <span key={index} style={{ alignSelf: 'center', color: '#6B7280', fontSize: '0.75rem' }}>
          {page}
        </span>
      )
    );
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Container>
      <GlobalStyles />

      <TabContainer>
        <TabButton 
          $active={activeTab === 'users'} 
          onClick={() => setActiveTab('users')}
          $type="all"
        >
          All Users
        </TabButton>

        <TabButton 
          $active={activeTab === 'admins'} 
          onClick={() => setActiveTab('admins')}
          $type="admin"
        >
          Admins
        </TabButton>

        <TabButton 
          $active={activeTab === 'moderators'} 
          onClick={() => setActiveTab('moderators')}
          $type="moderator"
        >
          Moderators
        </TabButton>

        <TabButton 
          $active={activeTab === 'developers'} 
          onClick={() => setActiveTab('developers')}
          $type="developer"
        >
          Developers
        </TabButton>

        <TabButton 
          $active={activeTab === 'authors'} 
          onClick={() => setActiveTab('authors')}
          $type="author"
        >
          Authors
        </TabButton>
       
        <TabButton 
          $active={activeTab === 'regular-users'} 
          onClick={() => setActiveTab('regular-users')}
          $type="user"
        >
          Users
        </TabButton>
      </TabContainer>

      {error && (
        <ErrorMessage>
          <FiAlertCircle />
          {error}
        </ErrorMessage>
      )}

      {success && (
        <StyledSuccessMessage>
          <FiCheck size={16} />
          {success}
        </StyledSuccessMessage>
      )}

      {activeTab === 'admins' ? (
        <>
          <FilterContainer>
            <SearchWrapper>
              <StyledSearchInput
              type="text"
              placeholder="Search ..."
              value={filterEmail}
              onChange={(e) => setFilterEmail(e.target.value)}
            />
              <FaSearch style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'rgba(15, 23, 42, 0.4)' }} />
            </SearchWrapper>
            {isCurrentUserAdmin && (
              <>
                <StyledAddUserButton onClick={handleAddAdmin}>
              <FiUserPlus />
              Add User
                </StyledAddUserButton>
                <CircularAddButton onClick={handleAddAdmin} aria-label="Add User">
                  <FiUserPlus />
                </CircularAddButton>
              </>
            )}
          </FilterContainer>
          {!isCurrentUserAdmin && (
            <InfoMessage>
              <FiInfo />
              You need admin privileges to manage user roles.
            </InfoMessage>
          )}
          <TableContainer>
            <TableScrollContainer>
          <Table>
              <TableHead>
              <tr>
                  <TableHeader style={{ width: '20px', textAlign: 'center' }}>#</TableHeader>
                  <TableHeader 
                  style={{ width: '200px' }}
                  onClick={() => handleSort('name')}
                  $sortable
                >
                  <HeaderContent>
                    <span>Name</span>
                  <SortIcon 
                      $active={sortField === 'name'} 
                    $direction={sortDirection}
                  >
                    ↑
                  </SortIcon>
                  </HeaderContent>
                </TableHeader>
                  <TableHeader 
                  style={{ width: '300px' }}
                  onClick={() => handleSort('email')}
                  $sortable
                >
                  <HeaderContent>
                    <span>Email</span>
                  <SortIcon 
                      $active={sortField === 'email'} 
                    $direction={sortDirection}
                  >
                    ↑
                  </SortIcon>
                  </HeaderContent>
                </TableHeader>
                  <TableHeader 
                  style={{ width: '150px' }}
                  onClick={() => handleSort('roles')}
                  $sortable
                >
                  <HeaderContent>
                    <span>Roles</span>
                  <SortIcon 
                      $active={sortField === 'roles'} 
                    $direction={sortDirection}
                  >
                    ↑
                  </SortIcon>
                  </HeaderContent>
                </TableHeader>
                  <TableHeader 
                  style={{ width: '150px' }}
                  onClick={() => handleSort('last_sign_in')}
                  $sortable
                >
                  <HeaderContent>
                    <span>Last Signed-In</span>
                  <SortIcon 
                      $active={sortField === 'last_sign_in'} 
                    $direction={sortDirection}
                  >
                    ↑
                  </SortIcon>
                  </HeaderContent>
                </TableHeader>
                  {isCurrentUserAdmin && <TableHeader style={{ width: '120px' }}>Actions</TableHeader>}
              </tr>
              </TableHead>
              <TableBody>
              {getPaginatedData([...admins, ...allUsers]).map((user, index) => (
                <TableRow key={user.id} onClick={() => handleNameClick(user)}>
                  <TableCell style={{ width: '20px', textAlign: 'center', color: '#6B7280' }}>{index + 1}</TableCell>
                  <TableCell style={{ width: '200px' }}>
                    <UserInfo>
                      <Avatar 
                        $imageUrl={user.profile_picture} 
                        $isLoading={Boolean(loadingProfilePictures[user.id])}
                      >
                        {user.profile_picture && (
                          <img
                            src={user.profile_picture}
                            alt={`${user.first_name}'s profile`}
                            onLoad={() => handleImageLoad(user.id)}
                            onError={() => handleImageError(user.id)}
                            style={{ display: loadingProfilePictures[user.id] ? 'none' : 'block' }}
                          />
                        )}
                        {!user.profile_picture && <FiUser />}
                        {loadingProfilePictures[user.id] && <AvatarSpinner />}
                      </Avatar>
                      <UserName>{`${user.first_name || ''} ${user.last_name || ''}`.trim() || '-'}</UserName>
                    </UserInfo>
                  </TableCell>
                  <TableCell style={{ width: '300px' }}>
                    <UserEmail>{user.email}</UserEmail>
                  </TableCell>
                  <TableCell style={{ width: '150px' }}>
                    <RoleBadges>
                      {user.roles.map((role: string, idx: number) => (
                        <RoleBadge key={idx} $role={role}>
                          {role}
                        </RoleBadge>
                      ))}
                    </RoleBadges>
                  </TableCell>
                  <TableCell style={{ width: '150px' }}>
                    {user.last_sign_in 
                    ? <span style={{ color: '#6B7280' }}>{new Date(user.last_sign_in).toLocaleDateString()}</span>
                      : <StatusBadge $status="not-confirmed">Not Confirmed</StatusBadge>
                    }
                  </TableCell>
                  {isCurrentUserAdmin && (
                    <TableCell style={{ width: '120px' }}>
                      {user.id === currentUserId ? (
                        <CurrentUserIndicator>
                          <FiUserCheck />
                          <span>Current User</span>
                        </CurrentUserIndicator>
                      ) : (
                        <ActionGroup>
                          <Tooltip text="Update User Info" position="top">
                          <ActionButton 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditUser(user);
                            }}
                          >
                            <FiEdit2 size={18} />
                          </ActionButton>
                          </Tooltip>
                          <Tooltip text="Delete User" position="top">
                              <ActionButton 
                                onClick={(e) => {
                                  e.stopPropagation();
                                handleDeleteClick(user);
                                }}
                              $variant="danger"
                            >
                              <FiTrash2 size={18} />
                            </ActionButton>
                          </Tooltip>
                        </ActionGroup>
                      )}
                    </TableCell>
                  )}
                </TableRow>
              ))}
              </TableBody>
          </Table>
            </TableScrollContainer>
          <PaginationControls>
            <PageInfo>
                <span className="full-text">
              Showing {((currentPage - 1) * rowsPerPage) + 1} to {Math.min(currentPage * rowsPerPage, totalFilteredCount)} of {totalFilteredCount} entries
                </span>
                <span className="short-text" style={{ display: 'none' }}>
                  {((currentPage - 1) * rowsPerPage) + 1}-{Math.min(currentPage * rowsPerPage, totalFilteredCount)} of {totalFilteredCount}
                </span>
            </PageInfo>
            <PageButtons>
              <PageButton 
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                  <span className="full-text">Previous</span>
                  <span className="short-text" style={{ display: 'none' }}>Prev</span>
              </PageButton>
                {renderPaginationButtons(currentPage, totalPages)}
                <PageButton
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  <span className="full-text">Next</span>
                  <span className="short-text" style={{ display: 'none' }}>Next</span>
                </PageButton>
              </PageButtons>
            </PaginationControls>
          </TableContainer>
          
          {/* Add CardViewContainer here */}
          <CardViewContainer>
            {getPaginatedData([...admins, ...allUsers]).map((user, index) => (
              <UserCard key={user.id} onClick={() => handleNameClick(user)}>
                <CardHeader>
                  <Avatar 
                    $imageUrl={user.profile_picture} 
                    $isLoading={Boolean(loadingProfilePictures[user.id])}
                  >
                    {user.profile_picture && (
                      <img
                        src={user.profile_picture}
                        alt={`${user.first_name}'s profile`}
                        onLoad={() => handleImageLoad(user.id)}
                        onError={() => handleImageError(user.id)}
                        style={{ display: loadingProfilePictures[user.id] ? 'none' : 'block' }}
                      />
                    )}
                    {!user.profile_picture && <FiUser />}
                    {loadingProfilePictures[user.id] && <AvatarSpinner />}
                  </Avatar>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <UserName>{`${user.first_name || ''} ${user.last_name || ''}`.trim() || '-'}</UserName>
                    <UserEmail style={{ fontSize: '0.75rem' }}>{user.email}</UserEmail>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <CardItem>
                    <CardLabel>Roles</CardLabel>
                    <CardValue>
                      <RoleBadges>
                        {user.roles.map((role: string, idx: number) => (
                          <RoleBadge key={idx} $role={role}>
                            {role}
                          </RoleBadge>
                        ))}
                      </RoleBadges>
                    </CardValue>
                  </CardItem>
                  
                  <CardItem>
                    <CardLabel>Last Signed-In</CardLabel>
                    <CardValue>
                      {user.last_sign_in 
                        ? new Date(user.last_sign_in).toLocaleDateString()
                        : <StatusBadge $status="not-confirmed">Not Confirmed</StatusBadge>
                      }
                    </CardValue>
                  </CardItem>
                </CardContent>
                
                {isCurrentUserAdmin && (
                  <CardActions>
                    {user.id === currentUserId ? (
                      <CurrentUserIndicator>
                        <FiUserCheck />
                        <span>Current User</span>
                      </CurrentUserIndicator>
                    ) : (
                      <>
                        <Tooltip text="Update User Info" position="top">
                        <ActionButton 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditUser(user);
                          }}
                        >
                          <FiEdit2 size={18} />
                        </ActionButton>
                        </Tooltip>
                        <Tooltip text="Delete User" position="top">
                        <ActionButton 
                          onClick={(e) => {
                            e.stopPropagation();
                              handleDeleteClick(user);
                          }}
                            $variant="danger"
                        >
                          <FiTrash2 size={18} />
                        </ActionButton>
                        </Tooltip>
                      </>
                    )}
                  </CardActions>
                )}
              </UserCard>
            ))}
            
            <PaginationControls>
              <PageInfo>
                <span className="full-text">
                  Showing {((currentPage - 1) * rowsPerPage) + 1} to {Math.min(currentPage * rowsPerPage, totalFilteredCount)} of {totalFilteredCount} entries
                </span>
                <span className="short-text" style={{ display: 'none' }}>
                  {((currentPage - 1) * rowsPerPage) + 1}-{Math.min(currentPage * rowsPerPage, totalFilteredCount)} of {totalFilteredCount}
                </span>
              </PageInfo>
              <PageButtons>
                <PageButton 
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <span className="full-text">Previous</span>
                  <span className="short-text" style={{ display: 'none' }}>Prev</span>
                </PageButton>
                {renderPaginationButtons(currentPage, totalPages)}
              <PageButton 
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                  <span className="full-text">Next</span>
                  <span className="short-text" style={{ display: 'none' }}>Next</span>
              </PageButton>
            </PageButtons>
          </PaginationControls>
          </CardViewContainer>
        </>
      ) : activeTab === 'moderators' ? (
        <>
          <FilterContainer>
            <SearchWrapper>
              <StyledSearchInput
              type="text"
              placeholder="Search ..."
              value={filterEmail}
              onChange={(e) => setFilterEmail(e.target.value)}
            />
              <FaSearch style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'rgba(15, 23, 42, 0.4)' }} />
            </SearchWrapper>
            {isCurrentUserAdmin && (
              <>
                <StyledAddUserButton onClick={handleAddAdmin}>
                <FiUserPlus />
                Add User
                </StyledAddUserButton>
                <CircularAddButton onClick={handleAddAdmin} aria-label="Add User">
                  <FiUserPlus />
                </CircularAddButton>
              </>
            )}
          </FilterContainer>
          {!isCurrentUserAdmin && (
            <InfoMessage>
              <FiInfo />
              You need admin privileges to manage user roles.
            </InfoMessage>
          )}
          <TableContainer>
            <TableScrollContainer>
          <Table>
              <TableHead>
              <tr>
                  <TableHeader style={{ width: '20px', textAlign: 'center' }}>#</TableHeader>
                  <TableHeader 
                  style={{ width: '200px' }}
                  onClick={() => handleSort('name')}
                  $sortable
                >
                  <HeaderContent>
                    <span>Name</span>
                  <SortIcon 
                      $active={sortField === 'name'} 
                    $direction={sortDirection}
                  >
                    ↑
                  </SortIcon>
                  </HeaderContent>
                </TableHeader>
                  <TableHeader 
                  style={{ width: '300px' }}
                  onClick={() => handleSort('email')}
                  $sortable
                >
                  <HeaderContent>
                    <span>Email</span>
                  <SortIcon 
                      $active={sortField === 'email'} 
                    $direction={sortDirection}
                  >
                    ↑
                  </SortIcon>
                  </HeaderContent>
                </TableHeader>
                  <TableHeader 
                  style={{ width: '150px' }}
                  onClick={() => handleSort('roles')}
                  $sortable
                >
                  <HeaderContent>
                    <span>Roles</span>
                  <SortIcon 
                      $active={sortField === 'roles'} 
                    $direction={sortDirection}
                  >
                    ↑
                  </SortIcon>
                  </HeaderContent>
                </TableHeader>
                  <TableHeader 
                  style={{ width: '150px' }}
                  onClick={() => handleSort('last_sign_in')}
                  $sortable
                >
                  <HeaderContent>
                    <span>Last Signed-In</span>
                  <SortIcon 
                      $active={sortField === 'last_sign_in'} 
                    $direction={sortDirection}
                  >
                    ↑
                  </SortIcon>
                  </HeaderContent>
                </TableHeader>
                  {isCurrentUserAdmin && <TableHeader style={{ width: '120px' }}>Actions</TableHeader>}
              </tr>
              </TableHead>
              <TableBody>
              {getPaginatedData([...admins, ...allUsers]).map((user, index) => (
                <TableRow key={user.id} onClick={() => handleNameClick(user)}>
                  <TableCell style={{ width: '20px', textAlign: 'center', color: '#6B7280' }}>{index + 1}</TableCell>
                  <TableCell style={{ width: '200px' }}>
                    <UserInfo>
                      <Avatar 
                        $imageUrl={user.profile_picture} 
                        $isLoading={Boolean(loadingProfilePictures[user.id])}
                      >
                        {user.profile_picture && (
                          <img
                            src={user.profile_picture}
                            alt={`${user.first_name}'s profile`}
                            onLoad={() => handleImageLoad(user.id)}
                            onError={() => handleImageError(user.id)}
                            style={{ display: loadingProfilePictures[user.id] ? 'none' : 'block' }}
                          />
                        )}
                        {!user.profile_picture && <FiUser />}
                        {loadingProfilePictures[user.id] && <AvatarSpinner />}
                      </Avatar>
                      <UserName>{`${user.first_name || ''} ${user.last_name || ''}`.trim() || '-'}</UserName>
                    </UserInfo>
                  </TableCell>
                  <TableCell style={{ width: '300px' }}>
                    <UserEmail>{user.email}</UserEmail>
                  </TableCell>
                  <TableCell style={{ width: '150px' }}>
                    <RoleBadges>
                      {user.roles.map((role: string, idx: number) => (
                        <RoleBadge key={idx} $role={role}>
                          {role}
                        </RoleBadge>
                      ))}
                    </RoleBadges>
                  </TableCell>
                  <TableCell style={{ width: '150px' }}>
                    {user.last_sign_in 
                    ? <span style={{ color: '#6B7280' }}>{new Date(user.last_sign_in).toLocaleDateString()}</span>
                      : <StatusBadge $status="not-confirmed">Not Confirmed</StatusBadge>
                    }
                  </TableCell>
                  {isCurrentUserAdmin && (
                    <TableCell style={{ width: '120px' }}>
                      {user.id === currentUserId ? (
                        <CurrentUserIndicator>
                          <FiUserCheck />
                          <span>Current User</span>
                        </CurrentUserIndicator>
                      ) : (
                        <ActionGroup>
                          <Tooltip text="Update User Info" position="top">
                          <ActionButton 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditUser(user);
                            }}
                          >
                            <FiEdit2 size={18} />
                          </ActionButton>
                          </Tooltip>
                          <Tooltip text="Delete User" position="top">
                              <ActionButton 
                                onClick={(e) => {
                                  e.stopPropagation();
                                handleDeleteClick(user);
                                }}
                              $variant="danger"
                            >
                              <FiTrash2 size={18} />
                            </ActionButton>
                          </Tooltip>
                        </ActionGroup>
                      )}
                    </TableCell>
                  )}
                </TableRow>
              ))}
              </TableBody>
          </Table>
            </TableScrollContainer>
          <PaginationControls>
            <PageInfo>
                <span className="full-text">
              Showing {((currentPage - 1) * rowsPerPage) + 1} to {Math.min(currentPage * rowsPerPage, totalFilteredCount)} of {totalFilteredCount} entries
                </span>
                <span className="short-text" style={{ display: 'none' }}>
                  {((currentPage - 1) * rowsPerPage) + 1}-{Math.min(currentPage * rowsPerPage, totalFilteredCount)} of {totalFilteredCount}
                </span>
            </PageInfo>
            <PageButtons>
              <PageButton 
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                  <span className="full-text">Previous</span>
                  <span className="short-text" style={{ display: 'none' }}>Prev</span>
              </PageButton>
                {renderPaginationButtons(currentPage, totalPages)}
                <PageButton
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  <span className="full-text">Next</span>
                  <span className="short-text" style={{ display: 'none' }}>Next</span>
                </PageButton>
              </PageButtons>
            </PaginationControls>
          </TableContainer>
          
          {/* Add CardViewContainer here */}
          <CardViewContainer>
            {getPaginatedData([...admins, ...allUsers]).map((user, index) => (
              <UserCard key={user.id} onClick={() => handleNameClick(user)}>
                <CardHeader>
                  <Avatar 
                    $imageUrl={user.profile_picture} 
                    $isLoading={Boolean(loadingProfilePictures[user.id])}
                  >
                    {user.profile_picture && (
                      <img
                        src={user.profile_picture}
                        alt={`${user.first_name}'s profile`}
                        onLoad={() => handleImageLoad(user.id)}
                        onError={() => handleImageError(user.id)}
                        style={{ display: loadingProfilePictures[user.id] ? 'none' : 'block' }}
                      />
                    )}
                    {!user.profile_picture && <FiUser />}
                    {loadingProfilePictures[user.id] && <AvatarSpinner />}
                  </Avatar>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <UserName>{`${user.first_name || ''} ${user.last_name || ''}`.trim() || '-'}</UserName>
                    <UserEmail style={{ fontSize: '0.75rem' }}>{user.email}</UserEmail>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <CardItem>
                    <CardLabel>Roles</CardLabel>
                    <CardValue>
                      <RoleBadges>
                        {user.roles.map((role: string, idx: number) => (
                          <RoleBadge key={idx} $role={role}>
                            {role}
                          </RoleBadge>
                        ))}
                      </RoleBadges>
                    </CardValue>
                  </CardItem>
                  
                  <CardItem>
                    <CardLabel>Last Signed-In</CardLabel>
                    <CardValue>
                      {user.last_sign_in 
                        ? new Date(user.last_sign_in).toLocaleDateString()
                        : <StatusBadge $status="not-confirmed">Not Confirmed</StatusBadge>
                      }
                    </CardValue>
                  </CardItem>
                </CardContent>
                
                {isCurrentUserAdmin && (
                  <CardActions>
                    {user.id === currentUserId ? (
                      <CurrentUserIndicator>
                        <FiUserCheck />
                        <span>Current User</span>
                      </CurrentUserIndicator>
                    ) : (
                      <>
                        <Tooltip text="Update User Info" position="top">
                        <ActionButton 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditUser(user);
                          }}
                        >
                          <FiEdit2 size={18} />
                        </ActionButton>
                        </Tooltip>
                        <Tooltip text="Delete User" position="top">
                        <ActionButton 
                          onClick={(e) => {
                            e.stopPropagation();
                              handleDeleteClick(user);
                          }}
                            $variant="danger"
                        >
                          <FiTrash2 size={18} />
                        </ActionButton>
                        </Tooltip>
                      </>
                    )}
                  </CardActions>
                )}
              </UserCard>
            ))}
            
            <PaginationControls>
              <PageInfo>
                <span className="full-text">
                  Showing {((currentPage - 1) * rowsPerPage) + 1} to {Math.min(currentPage * rowsPerPage, totalFilteredCount)} of {totalFilteredCount} entries
                </span>
                <span className="short-text" style={{ display: 'none' }}>
                  {((currentPage - 1) * rowsPerPage) + 1}-{Math.min(currentPage * rowsPerPage, totalFilteredCount)} of {totalFilteredCount}
                </span>
              </PageInfo>
              <PageButtons>
                <PageButton 
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <span className="full-text">Previous</span>
                  <span className="short-text" style={{ display: 'none' }}>Prev</span>
                </PageButton>
                {renderPaginationButtons(currentPage, totalPages)}
              <PageButton 
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                  <span className="full-text">Next</span>
                  <span className="short-text" style={{ display: 'none' }}>Next</span>
              </PageButton>
            </PageButtons>
          </PaginationControls>
          </CardViewContainer>
        </>
      ) : activeTab === 'developers' ? (
        <>
          <FilterContainer>
            <SearchWrapper>
              <StyledSearchInput
                type="text"
                placeholder="Search ..."
                value={filterEmail}
                onChange={(e) => setFilterEmail(e.target.value)}
              />
              <FaSearch style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'rgba(15, 23, 42, 0.4)' }} />
            </SearchWrapper>
            {isCurrentUserAdmin && (
              <>
                <StyledAddUserButton onClick={handleAddAdmin}>
                <FiUserPlus />
                Add User
                </StyledAddUserButton>
                <CircularAddButton onClick={handleAddAdmin} aria-label="Add User">
                  <FiUserPlus />
                </CircularAddButton>
              </>
            )}
          </FilterContainer>
          {!isCurrentUserAdmin && (
            <InfoMessage>
              <FiInfo />
              You need admin privileges to manage user roles.
            </InfoMessage>
          )}
          <TableContainer>
            <TableScrollContainer>
            <Table>
              <TableHead>
                <tr>
                  <TableHeader style={{ width: '20px', textAlign: 'center' }}>#</TableHeader>
                  <TableHeader 
                    style={{ width: '200px' }}
                    onClick={() => handleSort('name')}
                    $sortable
                  >
                    <HeaderContent>
                      <span>Name</span>
                      <SortIcon 
                        $active={sortField === 'name'} 
                        $direction={sortDirection}
                      >
                        ↑
                      </SortIcon>
                    </HeaderContent>
                  </TableHeader>
                  <TableHeader 
                    style={{ width: '300px' }}
                    onClick={() => handleSort('email')}
                    $sortable
                  >
                    <HeaderContent>
                      <span>Email</span>
                      <SortIcon 
                        $active={sortField === 'email'} 
                        $direction={sortDirection}
                      >
                        ↑
                      </SortIcon>
                    </HeaderContent>
                  </TableHeader>
                  <TableHeader style={{ width: '150px' }}>Roles</TableHeader>
                  <TableHeader style={{ width: '150px' }}>Last Sign In</TableHeader>
                  {isCurrentUserAdmin && (
                    <TableHeader style={{ width: '120px' }}>Actions</TableHeader>
                  )}
                </tr>
              </TableHead>
              <tbody>
                {getPaginatedData(allUsers.filter(user => user.roles.includes('developer'))).map((user, index) => (
                  <TableRow key={user.id} onClick={() => handleNameClick(user)}>
                    <TableCell style={{ width: '20px', textAlign: 'center', color: '#6B7280' }}>{index + 1}</TableCell>
                    <TableCell style={{ width: '200px' }}>
                      <UserInfo>
                        <Avatar 
                          $imageUrl={user.profile_picture} 
                          $isLoading={Boolean(loadingProfilePictures[user.id])}
                        >
                          {user.profile_picture && (
                            <img
                              src={user.profile_picture}
                              alt={`${user.first_name}'s profile`}
                              onLoad={() => handleImageLoad(user.id)}
                              onError={() => handleImageError(user.id)}
                              style={{ display: loadingProfilePictures[user.id] ? 'none' : 'block' }}
                            />
                          )}
                          {!user.profile_picture && <FiUser />}
                          {loadingProfilePictures[user.id] && <AvatarSpinner />}
                        </Avatar>
                        <UserName>{`${user.first_name || ''} ${user.last_name || ''}`.trim() || '-'}</UserName>
                      </UserInfo>
                    </TableCell>
                    <TableCell style={{ width: '300px' }}>
                      <UserEmail>{user.email}</UserEmail>
                    </TableCell>
                    <TableCell style={{ width: '150px' }}>
                      <RoleBadges>
                        {user.roles.map((role: string, idx: number) => (
                          <RoleBadge key={idx} $role={role}>
                            {role}
                          </RoleBadge>
                        ))}
                      </RoleBadges>
                    </TableCell>
                    <TableCell style={{ width: '150px' }}>
                      {user.last_sign_in 
                        ? <span style={{ color: '#6B7280' }}>{new Date(user.last_sign_in).toLocaleDateString()}</span>
                        : <StatusBadge $status="not-confirmed">Not Confirmed</StatusBadge>
                      }
                    </TableCell>
                    {isCurrentUserAdmin && user.id !== currentUserId && (
                      <TableCell style={{ width: '120px' }}>
                        <ActionGroup>
                          <Tooltip text="Update User Info" position="top">
                          <ActionButton 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditUser(user);
                            }}
                          >
                            <FiEdit2 size={18} />
                          </ActionButton>
                          </Tooltip>
                          <Tooltip text="Delete User" position="top">
                          <ActionButton 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteClick(user);
                            }}
                            title="Delete User"
                              $variant="danger"
                          >
                            <FiTrash2 size={18} />
                          </ActionButton>
                          </Tooltip>
                        </ActionGroup>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </tbody>
            </Table>
            </TableScrollContainer>
            <PaginationControls>
              <PageInfo>
                <span className="full-text">
                Showing {((currentPage - 1) * rowsPerPage) + 1} to {Math.min(currentPage * rowsPerPage, allUsers.length)} of {allUsers.length} entries
                </span>
                <span className="short-text" style={{ display: 'none' }}>
                  {((currentPage - 1) * rowsPerPage) + 1}-{Math.min(currentPage * rowsPerPage, allUsers.length)} of {allUsers.length}
                </span>
              </PageInfo>
              <PageButtons>
                <PageButton 
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <span className="full-text">Previous</span>
                  <span className="short-text" style={{ display: 'none' }}>Prev</span>
                </PageButton>
                {renderPaginationButtons(currentPage, Math.ceil(allUsers.length / rowsPerPage))}
                  <PageButton
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === Math.ceil(allUsers.length / rowsPerPage)}
                  >
                  <span className="full-text">Next</span>
                  <span className="short-text" style={{ display: 'none' }}>Next</span>
                  </PageButton>
              </PageButtons>
            </PaginationControls>
          </TableContainer>
          
          {/* Add CardViewContainer here */}
          <CardViewContainer>
            {getPaginatedData(allUsers.filter(user => user.roles.includes('developer'))).map((user, index) => (
              <UserCard key={user.id} onClick={() => handleNameClick(user)}>
                <CardHeader>
                  <Avatar 
                    $imageUrl={user.profile_picture} 
                    $isLoading={Boolean(loadingProfilePictures[user.id])}
                  >
                    {user.profile_picture && (
                      <img
                        src={user.profile_picture}
                        alt={`${user.first_name}'s profile`}
                        onLoad={() => handleImageLoad(user.id)}
                        onError={() => handleImageError(user.id)}
                        style={{ display: loadingProfilePictures[user.id] ? 'none' : 'block' }}
                      />
                    )}
                    {!user.profile_picture && <FiUser />}
                    {loadingProfilePictures[user.id] && <AvatarSpinner />}
                  </Avatar>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <UserName>{`${user.first_name || ''} ${user.last_name || ''}`.trim() || '-'}</UserName>
                    <UserEmail style={{ fontSize: '0.75rem' }}>{user.email}</UserEmail>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <CardItem>
                    <CardLabel>Roles</CardLabel>
                    <CardValue>
                      <RoleBadges>
                        {user.roles.map((role: string, idx: number) => (
                          <RoleBadge key={idx} $role={role}>
                            {role}
                          </RoleBadge>
                        ))}
                      </RoleBadges>
                    </CardValue>
                  </CardItem>
                  
                  <CardItem>
                    <CardLabel>Last Signed-In</CardLabel>
                    <CardValue>
                      {user.last_sign_in 
                        ? <span style={{ color: '#6B7280' }}>{new Date(user.last_sign_in).toLocaleDateString()}</span>
                        : <StatusBadge $status="not-confirmed">Not Confirmed</StatusBadge>
                      }
                    </CardValue>
                  </CardItem>
                </CardContent>
                
                {isCurrentUserAdmin && user.id !== currentUserId && (
                  <CardActions>
                    <Tooltip text="Update User Info" position="top">
                    <ActionButton 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditUser(user);
                      }}
                    >
                      <FiEdit2 size={18} />
                    </ActionButton>
                    </Tooltip>
                    <Tooltip text="Delete User" position="top">
                    <ActionButton 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteClick(user);
                      }}
                      title="Delete User"
                        $variant="danger"
                    >
                      <FiTrash2 size={18} />
                    </ActionButton>
                    </Tooltip>
                  </CardActions>
                )}
              </UserCard>
            ))}
            
            <PaginationControls>
              <PageInfo>
                <span className="full-text">
                  Showing {((currentPage - 1) * rowsPerPage) + 1} to {Math.min(currentPage * rowsPerPage, allUsers.length)} of {allUsers.length} entries
                </span>
                <span className="short-text" style={{ display: 'none' }}>
                  {((currentPage - 1) * rowsPerPage) + 1}-{Math.min(currentPage * rowsPerPage, allUsers.length)} of {allUsers.length}
                </span>
              </PageInfo>
              <PageButtons>
                <PageButton 
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <span className="full-text">Previous</span>
                  <span className="short-text" style={{ display: 'none' }}>Prev</span>
                </PageButton>
                {renderPaginationButtons(currentPage, Math.ceil(allUsers.length / rowsPerPage))}
                <PageButton 
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === Math.ceil(allUsers.length / rowsPerPage)}
                >
                  <span className="full-text">Next</span>
                  <span className="short-text" style={{ display: 'none' }}>Next</span>
                </PageButton>
              </PageButtons>
            </PaginationControls>
          </CardViewContainer>
        </>
      ) : activeTab === 'authors' ? (
        <>
          <FilterContainer>
            <SearchWrapper>
              <StyledSearchInput
                type="text"
                placeholder="Search ..."
                value={filterEmail}
                onChange={(e) => setFilterEmail(e.target.value)}
              />
              <FaSearch style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'rgba(15, 23, 42, 0.4)' }} />
            </SearchWrapper>
            {isCurrentUserAdmin && (
              <>
                <StyledAddUserButton onClick={handleAddAdmin}>
                <FiUserPlus />
                Add User
                </StyledAddUserButton>
                <CircularAddButton onClick={handleAddAdmin} aria-label="Add User">
                  <FiUserPlus />
                </CircularAddButton>
              </>
            )}
          </FilterContainer>
          {!isCurrentUserAdmin && (
            <InfoMessage>
              <FiInfo />
              You need admin privileges to manage user roles.
            </InfoMessage>
          )}
          <TableContainer>
            <TableScrollContainer>
            <Table>
              <TableHead>
                <tr>
                  <TableHeader style={{ width: '20px', textAlign: 'center' }}>#</TableHeader>
                  <TableHeader 
                    style={{ width: '200px' }}
                    onClick={() => handleSort('name')}
                    $sortable
                  >
                    <HeaderContent>
                      <span>Name</span>
                      <SortIcon 
                        $active={sortField === 'name'} 
                        $direction={sortDirection}
                      >
                        ↑
                      </SortIcon>
                    </HeaderContent>
                  </TableHeader>
                  <TableHeader 
                    style={{ width: '300px' }}
                    onClick={() => handleSort('email')}
                    $sortable
                  >
                    <HeaderContent>
                      <span>Email</span>
                      <SortIcon 
                        $active={sortField === 'email'} 
                        $direction={sortDirection}
                      >
                        ↑
                      </SortIcon>
                    </HeaderContent>
                  </TableHeader>
                  <TableHeader style={{ width: '150px' }}>Roles</TableHeader>
                  <TableHeader style={{ width: '150px' }}>Last Sign In</TableHeader>
                  {isCurrentUserAdmin && (
                    <TableHeader style={{ width: '120px' }}>Actions</TableHeader>
                  )}
                </tr>
              </TableHead>
              <tbody>
                {getPaginatedData(allUsers.filter(user => user.roles.includes('author'))).map((user, index) => (
                  <TableRow key={user.id} onClick={() => handleNameClick(user)}>
                    <TableCell style={{ width: '20px', textAlign: 'center', color: '#6B7280' }}>{index + 1}</TableCell>
                    <TableCell style={{ width: '200px' }}>
                      <UserInfo>
                        <Avatar 
                          $imageUrl={user.profile_picture} 
                          $isLoading={Boolean(loadingProfilePictures[user.id])}
                        >
                          {user.profile_picture && (
                            <img
                              src={user.profile_picture}
                              alt={`${user.first_name}'s profile`}
                              onLoad={() => handleImageLoad(user.id)}
                              onError={() => handleImageError(user.id)}
                              style={{ display: loadingProfilePictures[user.id] ? 'none' : 'block' }}
                            />
                          )}
                          {!user.profile_picture && <FiUser />}
                          {loadingProfilePictures[user.id] && <AvatarSpinner />}
                        </Avatar>
                        <UserName>{`${user.first_name || ''} ${user.last_name || ''}`.trim() || '-'}</UserName>
                      </UserInfo>
                    </TableCell>
                    <TableCell style={{ width: '300px' }}>
                      <UserEmail>{user.email}</UserEmail>
                    </TableCell>
                    <TableCell style={{ width: '150px' }}>
                      <RoleBadges>
                        {user.roles.map((role: string, idx: number) => (
                          <RoleBadge key={idx} $role={role}>
                            {role}
                          </RoleBadge>
                        ))}
                      </RoleBadges>
                    </TableCell>
                    <TableCell style={{ width: '150px' }}>
                      {user.last_sign_in 
                        ? <span style={{ color: '#6B7280' }}>{new Date(user.last_sign_in).toLocaleDateString()}</span>
                        : <StatusBadge $status="not-confirmed">Not Confirmed</StatusBadge>
                      }
                    </TableCell>
                    {isCurrentUserAdmin && user.id !== currentUserId && (
                      <TableCell style={{ width: '120px' }}>
                        <ActionGroup>
                          <Tooltip text="Update User Info" position="top">
                          <ActionButton 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditUser(user);
                            }}
                          >
                            <FiEdit2 size={18} />
                          </ActionButton>
                          </Tooltip>
                          <Tooltip text="Delete User" position="top">
                          <ActionButton 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteClick(user);
                            }}
                              $variant="danger"
                          >
                            <FiTrash2 size={18} />
                          </ActionButton>
                          </Tooltip>
                        </ActionGroup>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </tbody>
            </Table>
            </TableScrollContainer>
            <PaginationControls>
              <PageInfo>
                <span className="full-text">
                Showing {((currentPage - 1) * rowsPerPage) + 1} to {Math.min(currentPage * rowsPerPage, allUsers.length)} of {allUsers.length} entries
                </span>
                <span className="short-text" style={{ display: 'none' }}>
                  {((currentPage - 1) * rowsPerPage) + 1}-{Math.min(currentPage * rowsPerPage, allUsers.length)} of {allUsers.length}
                </span>
              </PageInfo>
              <PageButtons>
                <PageButton 
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <span className="full-text">Previous</span>
                  <span className="short-text" style={{ display: 'none' }}>Prev</span>
                </PageButton>
                {renderPaginationButtons(currentPage, Math.ceil(allUsers.length / rowsPerPage))}
                  <PageButton
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === Math.ceil(allUsers.length / rowsPerPage)}
                  >
                  <span className="full-text">Next</span>
                  <span className="short-text" style={{ display: 'none' }}>Next</span>
                  </PageButton>
              </PageButtons>
            </PaginationControls>
          </TableContainer>
          
          {/* Add CardViewContainer here */}
          <CardViewContainer>
            {getPaginatedData(allUsers.filter(user => user.roles.includes('author'))).map((user, index) => (
              <UserCard key={user.id} onClick={() => handleNameClick(user)}>
                <CardHeader>
                  <Avatar 
                    $imageUrl={user.profile_picture} 
                    $isLoading={Boolean(loadingProfilePictures[user.id])}
                  >
                    {user.profile_picture && (
                      <img
                        src={user.profile_picture}
                        alt={`${user.first_name}'s profile`}
                        onLoad={() => handleImageLoad(user.id)}
                        onError={() => handleImageError(user.id)}
                        style={{ display: loadingProfilePictures[user.id] ? 'none' : 'block' }}
                      />
                    )}
                    {!user.profile_picture && <FiUser />}
                    {loadingProfilePictures[user.id] && <AvatarSpinner />}
                  </Avatar>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <UserName>{`${user.first_name || ''} ${user.last_name || ''}`.trim() || '-'}</UserName>
                    <UserEmail style={{ fontSize: '0.75rem' }}>{user.email}</UserEmail>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <CardItem>
                    <CardLabel>Roles</CardLabel>
                    <CardValue>
                      <RoleBadges>
                        {user.roles.map((role: string, idx: number) => (
                          <RoleBadge key={idx} $role={role}>
                            {role}
                          </RoleBadge>
                        ))}
                      </RoleBadges>
                    </CardValue>
                  </CardItem>
                  
                  <CardItem>
                    <CardLabel>Last Signed-In</CardLabel>
                    <CardValue>
                      {user.last_sign_in 
                        ? <span style={{ color: '#6B7280' }}>{new Date(user.last_sign_in).toLocaleDateString()}</span>
                        : <StatusBadge $status="not-confirmed">Not Confirmed</StatusBadge>
                      }
                    </CardValue>
                  </CardItem>
                </CardContent>
                
                {isCurrentUserAdmin && user.id !== currentUserId && (
                  <CardActions>
                    <Tooltip text="Update User Info" position="top">
                    <ActionButton 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditUser(user);
                      }}
                    >
                      <FiEdit2 size={18} />
                    </ActionButton>
                    </Tooltip>
                    <Tooltip text="Delete User" position="top">
                    <ActionButton 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteClick(user);
                      }}
                        $variant="danger"
                    >
                      <FiTrash2 size={18} />
                    </ActionButton>
                    </Tooltip>
                  </CardActions>
                )}
              </UserCard>
            ))}
            
            <PaginationControls>
              <PageInfo>
                <span className="full-text">
                  Showing {((currentPage - 1) * rowsPerPage) + 1} to {Math.min(currentPage * rowsPerPage, allUsers.length)} of {allUsers.length} entries
                </span>
                <span className="short-text" style={{ display: 'none' }}>
                  {((currentPage - 1) * rowsPerPage) + 1}-{Math.min(currentPage * rowsPerPage, allUsers.length)} of {allUsers.length}
                </span>
              </PageInfo>
              <PageButtons>
                <PageButton 
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <span className="full-text">Previous</span>
                  <span className="short-text" style={{ display: 'none' }}>Prev</span>
                </PageButton>
                {renderPaginationButtons(currentPage, Math.ceil(allUsers.length / rowsPerPage))}
                <PageButton 
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === Math.ceil(allUsers.length / rowsPerPage)}
                >
                  <span className="full-text">Next</span>
                  <span className="short-text" style={{ display: 'none' }}>Next</span>
                </PageButton>
              </PageButtons>
            </PaginationControls>
          </CardViewContainer>
        </>
      ) : (
        <>
          <FilterContainer>
            <SearchWrapper>
              <StyledSearchInput
              type="text"
              placeholder="Search ..."
              value={filterEmail}
              onChange={(e) => setFilterEmail(e.target.value)}
            />
              <FaSearch style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'rgba(15, 23, 42, 0.4)' }} />
            </SearchWrapper>
            {isCurrentUserAdmin && (
              <>
                <StyledAddUserButton onClick={handleAddAdmin}>
                <FiUserPlus />
                Add User
                </StyledAddUserButton>
                <CircularAddButton onClick={handleAddAdmin} aria-label="Add User">
                  <FiUserPlus />
                </CircularAddButton>
              </>
            )}
          </FilterContainer>
          {!isCurrentUserAdmin && (
            <InfoMessage>
              <FiInfo />
              You need admin privileges to manage user roles.
            </InfoMessage>
          )}
          <TableContainer>
            <TableScrollContainer>
          <Table>
              <TableHead>
              <tr>
                  <TableHeader style={{ width: '20px', textAlign: 'center' }}>#</TableHeader>
                  <TableHeader 
                  style={{ width: '200px' }}
                  onClick={() => handleSort('name')}
                  $sortable
                >
                  <HeaderContent>
                    <span>Name</span>
                  <SortIcon 
                      $active={sortField === 'name'} 
                    $direction={sortDirection}
                  >
                    ↑
                  </SortIcon>
                  </HeaderContent>
                </TableHeader>
                  <TableHeader 
                  style={{ width: '300px' }}
                  onClick={() => handleSort('email')}
                  $sortable
                >
                  <HeaderContent>
                    <span>Email</span>
                  <SortIcon 
                      $active={sortField === 'email'} 
                    $direction={sortDirection}
                  >
                    ↑
                  </SortIcon>
                  </HeaderContent>
                </TableHeader>
                  <TableHeader 
                  style={{ width: '150px' }}
                  onClick={() => handleSort('roles')}
                  $sortable
                >
                  <HeaderContent>
                    <span>Roles</span>
                  <SortIcon 
                      $active={sortField === 'roles'} 
                    $direction={sortDirection}
                  >
                    ↑
                  </SortIcon>
                  </HeaderContent>
                </TableHeader>
                  <TableHeader 
                  style={{ width: '150px' }}
                  onClick={() => handleSort('last_sign_in')}
                  $sortable
                >
                  <HeaderContent>
                    <span>Last Signed-In</span>
                  <SortIcon 
                      $active={sortField === 'last_sign_in'} 
                    $direction={sortDirection}
                  >
                    ↑
                  </SortIcon>
                  </HeaderContent>
                </TableHeader>
                  {isCurrentUserAdmin && <TableHeader style={{ width: '120px' }}>Actions</TableHeader>}
              </tr>
              </TableHead>
              <TableBody>
              {getPaginatedData([...admins, ...allUsers]).map((user, index) => (
                <TableRow key={user.id} onClick={() => handleNameClick(user)}>
                  <TableCell style={{ width: '20px', textAlign: 'center', color: '#6B7280' }}>{index + 1}</TableCell>
                  <TableCell style={{ width: '200px' }}>
                    <UserInfo>
                      <Avatar 
                        $imageUrl={user.profile_picture} 
                        $isLoading={Boolean(loadingProfilePictures[user.id])}
                      >
                        {user.profile_picture && (
                          <img
                            src={user.profile_picture}
                            alt={`${user.first_name}'s profile`}
                            onLoad={() => handleImageLoad(user.id)}
                            onError={() => handleImageError(user.id)}
                            style={{ display: loadingProfilePictures[user.id] ? 'none' : 'block' }}
                          />
                        )}
                        {!user.profile_picture && <FiUser />}
                        {loadingProfilePictures[user.id] && <AvatarSpinner />}
                      </Avatar>
                      <UserName>{`${user.first_name || ''} ${user.last_name || ''}`.trim() || '-'}</UserName>
                    </UserInfo>
                  </TableCell>
                  <TableCell style={{ width: '300px' }}>
                    <UserEmail>{user.email}</UserEmail>
                  </TableCell>
                  <TableCell style={{ width: '150px' }}>
                    <RoleBadges>
                      {user.roles.map((role: string, idx: number) => (
                        <RoleBadge key={idx} $role={role}>
                          {role}
                        </RoleBadge>
                      ))}
                    </RoleBadges>
                  </TableCell>
                  <TableCell style={{ width: '150px' }}>
                    {user.last_sign_in 
                    ? <span style={{ color: '#6B7280' }}>{new Date(user.last_sign_in).toLocaleDateString()}</span>
                      : <StatusBadge $status="not-confirmed">Not Confirmed</StatusBadge>
                    }
                  </TableCell>
                  {isCurrentUserAdmin && (
                    <TableCell style={{ width: '120px' }}>
                      {user.id === currentUserId ? (
                        <CurrentUserIndicator>
                          <FiUserCheck />
                          <span>Current User</span>
                        </CurrentUserIndicator>
                      ) : (
                        <ActionGroup>
                          <Tooltip text="Update User Info" position="top">
                          <ActionButton 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditUser(user);
                            }}
                          >
                            <FiEdit2 size={18} />
                          </ActionButton>
                          </Tooltip>
                          <Tooltip text="Delete User" position="top">
                              <ActionButton 
                                onClick={(e) => {
                                  e.stopPropagation();
                                handleDeleteClick(user);
                                }}
                              $variant="danger"
                            >
                              <FiTrash2 size={18} />
                            </ActionButton>
                          </Tooltip>
                        </ActionGroup>
                      )}
                    </TableCell>
                  )}
                </TableRow>
              ))}
              </TableBody>
          </Table>
            </TableScrollContainer>
          <PaginationControls>
            <PageInfo>
                <span className="full-text">
              Showing {((currentPage - 1) * rowsPerPage) + 1} to {Math.min(currentPage * rowsPerPage, totalFilteredCount)} of {totalFilteredCount} entries
                </span>
                <span className="short-text" style={{ display: 'none' }}>
                  {((currentPage - 1) * rowsPerPage) + 1}-{Math.min(currentPage * rowsPerPage, totalFilteredCount)} of {totalFilteredCount}
                </span>
            </PageInfo>
            <PageButtons>
              <PageButton 
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                  <span className="full-text">Previous</span>
                  <span className="short-text" style={{ display: 'none' }}>Prev</span>
              </PageButton>
                {renderPaginationButtons(currentPage, totalPages)}
              <PageButton 
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                  <span className="full-text">Next</span>
                  <span className="short-text" style={{ display: 'none' }}>Next</span>
              </PageButton>
            </PageButtons>
          </PaginationControls>
          </TableContainer>
          
          {/* Add CardViewContainer here */}
          <CardViewContainer>
            {getPaginatedData([...admins, ...allUsers]).map((user, index) => (
              <UserCard key={user.id} onClick={() => handleNameClick(user)}>
                <CardHeader>
                  <Avatar 
                    $imageUrl={user.profile_picture} 
                    $isLoading={Boolean(loadingProfilePictures[user.id])}
                  >
                    {user.profile_picture && (
                      <img
                        src={user.profile_picture}
                        alt={`${user.first_name}'s profile`}
                        onLoad={() => handleImageLoad(user.id)}
                        onError={() => handleImageError(user.id)}
                        style={{ display: loadingProfilePictures[user.id] ? 'none' : 'block' }}
                      />
                    )}
                    {!user.profile_picture && <FiUser />}
                    {loadingProfilePictures[user.id] && <AvatarSpinner />}
                  </Avatar>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <UserName>{`${user.first_name || ''} ${user.last_name || ''}`.trim() || '-'}</UserName>
                    <UserEmail style={{ fontSize: '0.75rem' }}>{user.email}</UserEmail>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <CardItem>
                    <CardLabel>Roles</CardLabel>
                    <CardValue>
                      <RoleBadges>
                        {user.roles.map((role: string, idx: number) => (
                          <RoleBadge key={idx} $role={role}>
                            {role}
                          </RoleBadge>
                        ))}
                      </RoleBadges>
                    </CardValue>
                  </CardItem>
                  
                  <CardItem>
                    <CardLabel>Last Signed-In</CardLabel>
                    <CardValue>
                      {user.last_sign_in 
                        ? <span style={{ color: '#6B7280' }}>{new Date(user.last_sign_in).toLocaleDateString()}</span>
                        : <StatusBadge $status="not-confirmed">Not Confirmed</StatusBadge>
                      }
                    </CardValue>
                  </CardItem>
                </CardContent>
                
                {isCurrentUserAdmin && (
                  <CardActions>
                    {user.id === currentUserId ? (
                      <CurrentUserIndicator>
                        <FiUserCheck />
                        <span>Current User</span>
                      </CurrentUserIndicator>
                    ) : (
                      <>
                        <ActionButton 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditUser(user);
                          }}
                          title="Update Info"
                        >
                          <FiEdit2 size={18} />
                        </ActionButton>
                        <ActionButton 
                          $variant="danger"
                          onClick={(e) => {
                            e.stopPropagation();
                            setUserToDelete(user);
                            setIsDeleteModalOpen(true);
                          }}
                        >
                          <FiTrash2 size={18} />
                        </ActionButton>
                      </>
                    )}
                  </CardActions>
                )}
              </UserCard>
            ))}
            
            <PaginationControls>
              <PageInfo>
                <span className="full-text">
                  Showing {((currentPage - 1) * rowsPerPage) + 1} to {Math.min(currentPage * rowsPerPage, totalFilteredCount)} of {totalFilteredCount} entries
                </span>
                <span className="short-text" style={{ display: 'none' }}>
                  {((currentPage - 1) * rowsPerPage) + 1}-{Math.min(currentPage * rowsPerPage, totalFilteredCount)} of {totalFilteredCount}
                </span>
              </PageInfo>
              <PageButtons>
                <PageButton 
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <span className="full-text">Previous</span>
                  <span className="short-text" style={{ display: 'none' }}>Prev</span>
                </PageButton>
                {renderPaginationButtons(currentPage, totalPages)}
              <PageButton 
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                  >
                  <span className="full-text">Next</span>
                  <span className="short-text" style={{ display: 'none' }}>Next</span>
              </PageButton>
            </PageButtons>
          </PaginationControls>
          </CardViewContainer>
                    </>
                  )}

      {/* Replace inline modals with new components */}
      <AddUserForm
        isOpen={isModalOpen}
        onClose={() => {
                  setIsModalOpen(false);
                  setRateLimitCountdown(null);
                  setRetryCount(0);
                  requestQueue.current = [];
                  if (countdownRef.current) {
                    clearInterval(countdownRef.current);
                  }
                  if (retryTimeoutRef.current) {
                    clearTimeout(retryTimeoutRef.current);
                  }
                  setUsernameError(null);
                  setUsernameExists(null);
                  setCheckingUsername(false);
                  setCurrentUsername('');
                  setPasswordsMatch(null);
                  setPasswordLength(false);
                }}
        onSubmit={handleSubmit}
        onModalStateChange={onModalStateChange}
        isSubmitting={isSubmitting}
        error={modalError}
        success={success}
        rateLimitCountdown={rateLimitCountdown}
        retryCount={retryCount}
        maxRetries={MAX_RETRIES}
      />

      <EditUserForm
        isOpen={isEditModalOpen}
        onClose={handleModalClose}
        onSubmit={handleEditSubmit}
        onModalStateChange={(isOpen: boolean) => onModalStateChange?.(isOpen)}
        isSubmitting={isSubmitting}
        error={modalError}
        selectedUser={selectedUser}
        initialFormData={editFormData}
      />

      <DeleteConfirmationForm
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setUserToDelete(null);
          setErrorMessage('');
              }}
        onConfirm={handleDeleteConfirm}
        onModalStateChange={onModalStateChange}
        isSubmitting={isSubmitting}
        userToDelete={userToDelete}
      />

      {selectedUser && (
        <ProfileSidebar
          isOpen={isProfileOpen}
          onClose={() => setIsProfileOpen(false)}
          profile={{
            name: `${selectedUser.first_name} ${selectedUser.last_name}`,
            email: selectedUser.email,
            username: selectedUser.username,
            role: selectedUser.roles,
            phone: selectedUser.phone_number, // Change from phone to phone_number
            gender: selectedUser.gender,
            joinedDate: formatDate(selectedUser.created_at),
            lastLogin: formatDate(selectedUser.last_sign_in),
            avatar: selectedUser.profile_picture,
            user_id: selectedUser.id,
            stats: {
              leadsGenerated: 0,
              rolesCreated: 0,
              quotesSent: 0
            },
            preferences: {
              notifications: true,
              language: 'English',
              theme: 'light'
            }
          }}
        />
      )}
    </Container>
  );
};

const TabContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;

  @media (max-width: 640px) {
    gap: 0.25rem;
  }
`;

const TabButton = styled.button<{ $active: boolean; $type: string }>`
  padding: 0.25rem 0.75rem;
  background-color: ${props => {
      switch (props.$type) {
        case 'all':
          return props.$active ? '#6B728040' : '#6B728010';
        case 'admin':
          return props.$active ? '#EC489940' : '#EC489910';
        case 'moderator':
          return props.$active ? '#00E91540' : '#00E91510';
        case 'developer':
          return props.$active ? '#8B5CF640' : '#8B5CF610';
        case 'author':
          return props.$active ? '#F59E0B40' : '#F59E0B10';
        case 'user':
          return props.$active ? '#3B82F640' : '#3B82F610';
        default:
          return props.$active ? '#3B82F640' : '#3B82F610';
      }
  }};
  color: ${props => {
      switch (props.$type) {
        case 'all':
          return props.$active ? '#4B5563' : '#4B5563';
        case 'admin':
          return props.$active ? '#EC4899' : '#EC4899';
        case 'moderator':
          return props.$active ? '#00E915' : '#00E915';
        case 'developer':
          return props.$active ? '#8B5CF6' : '#8B5CF6';
        case 'author':
          return props.$active ? '#F59E0B' : '#F59E0B';
        case 'user':
          return props.$active ? '#3B82F6' : '#3B82F6';
        default:
          return props.$active ? '#3B82F6' : '#3B82F6';
      }
  }};
  border: none;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;

  @media (max-width: 640px) {
    font-size: 0.75rem;
    padding: 0.25rem 0.5rem;
  }

  &:hover {
    background-color: ${props => {
      switch (props.$type) {
        case 'all':
          return '#6B728040';
        case 'admin':
          return '#EC489940';
        case 'moderator':
          return '#00E91540';
        case 'developer':
          return '#8B5CF640';
        case 'author':
          return '#F59E0B40';
        case 'user':
          return '#3B82F640';
        default:
          return '#3B82F640';
      }
    }};
  }
`;

const RoleBadges = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const RoleBadge = styled.span<{ $role: string }>`
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
  background-color: ${props => {
    switch (props.$role) {
      case 'admin':
        return '#EC489910';
      case 'moderator':
        return '#00E91510';
      case 'developer':
        return '#8B5CF610';
      case 'author':
        return '#F59E0B10';
      case 'user':
        return '#3B82F610';
      default:
        return '#3B82F610';
    }
  }};
  color: ${props => {
    switch (props.$role) {
      case 'admin':
        return '#EC4899';
      case 'moderator':
        return '#00E915';
      case 'developer':
        return '#8B5CF6';
      case 'author':
        return '#F59E0B';
      case 'user':
        return '#3B82F6';
      default:
        return '#3B82F6';
    }
  }};
  text-transform: capitalize;
  display: inline-block;
  line-height: 1;
  min-width: 60px;
  text-align: center;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${props => {
      switch (props.$role) {
        case 'admin':
          return '#EC489920';
        case 'moderator':
          return '#00E91520';
        case 'developer':
          return '#8B5CF620';
        case 'author':
          return '#F59E0B20';
        case 'user':
          return '#3B82F620';
        default:
          return '#3B82F620';
      }
    }};
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

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
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

// Add these new styled components after the DeleteCancelButton component
const CardViewContainer = styled.div`
  display: none;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;

  @media (max-width: 1024px) {
    display: flex;
  }
`;

const UserCard = styled.div`
  background-color: white;
  border-radius: 0.75rem;
  border: 1px solid #E5E7EB;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  cursor: pointer;
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const CardItem = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;
  
  &:not(:last-child) {
    padding-bottom: 0.5rem;
    border-bottom: 1px solid #F3F4F6;
  }
`;

const CardLabel = styled.span`
  color: #6B7280;
  font-weight: 500;
`;

const CardValue = styled.span`
  color: #1F2937;
  font-weight: 500;
  text-align: right;
`;

const CardActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

export default AdminManagementTab; 
