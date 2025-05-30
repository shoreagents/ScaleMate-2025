import React, { useEffect, useState, useRef } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { supabase } from '@/lib/supabase';
import { FiUserPlus, FiTrash2, FiEdit2, FiCheck, FiX, FiAlertCircle, FiUser, FiShield, FiInfo, FiUserCheck, FiUserX, FiEye, FiEyeOff, FiLoader, FiCode, FiEdit } from 'react-icons/fi';
import { FaMale, FaFemale, FaTransgender, FaQuestion, FaSearch, FaTimes } from 'react-icons/fa';
import type { FC, ReactElement } from 'react';
import { LoadingSpinner as PageLoadingSpinner } from '@/components/ui/LoadingSpinner';
import ProfileSidebar from '@/components/layout/ProfileSidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash, faUserCog, faUser, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

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
  
  @media (max-width: 470px) {
    display: none;
  }
`;

const TableScrollContainer = styled.div`
  width: 100%;
  
  @media (max-width: 1284px) {
    overflow-x: auto;
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

const ActionButton = styled.button<{ $color?: string }>`
  padding: 0.5rem;
  color: rgba(15, 23, 42, 0.7);
  border-radius: 0.25rem;
  transition: all 0.2s;
  background: none;
  border: none;

  &:hover {
    color: ${props => props.$color || '#0F172A'};
  }
`;

const ActionGroup = styled.div`
  display: flex;
  gap: 0.5rem;
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

const LoadingSpinner = styled.div`
  width: 40px;
  height: 40px;
  border: 3px solid #f3f4f6;
  border-top: 3px solid #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
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

interface BaseUser {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  created_at: string;
  last_login?: string;
  profile_picture?: string;
}

interface Admin extends BaseUser {
  role: 'admin';
  last_sign_in: string | null;
  phone: string;
  gender: string;
  username: string;
  roles: string[];
  status: 'active' | 'pending';
}

interface UserRole extends BaseUser {
  role: 'user' | 'admin' | 'moderator' | 'developer' | 'author';  // Add developer and author roles
  last_sign_in: string | null;
  phone: string;
  gender: string;
  username: string;
  roles: string[];
  status: string;
}

type UserToDelete = UserRole | Admin;

type SortField = 'email' | 'name' | 'roles' | 'last_sign_in';

type TabType = 'admins' | 'moderators' | 'users' | 'regular-users' | 'developers' | 'authors';

interface AdminFormData {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  gender: string;
  role: 'admin' | 'moderator' | 'user' | 'developer' | 'author';
}

interface UserEditFormData {
  email: string;
  password: string;
  role: 'admin' | 'moderator' | 'user' | 'developer' | 'author';
  first_name: string;
  last_name: string;
  phone: string;
  gender: string;
  username: string;
}

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

const AdminManagementTab: FC<AdminManagementTabProps> = ({ onUserDeleted, onModalStateChange }): ReactElement => {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [allUsers, setAllUsers] = useState<UserRole[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState<Admin | null>(null);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '', // Add confirmPassword field
    phone: '',
    gender: '',
    role: 'user'
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [modalError, setModalError] = useState<string | null>(null);
  const [modalSuccess, setModalSuccess] = useState<string | null>(null);
  const [isConfirmingDelete, setIsConfirmingDelete] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>('users');
  const [isCurrentUserAdmin, setIsCurrentUserAdmin] = useState(false);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<Admin | UserRole | null>(null);
  const [newRole, setNewRole] = useState<'admin' | 'user'>('admin');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState<UserEditFormData>({
    email: '',
    password: '',
    role: 'user',
    first_name: '',
    last_name: '',
    phone: '',
    gender: '',
    username: ''
  });
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [filterEmail, setFilterEmail] = useState('');
  const [sortField, setSortField] = useState<SortField>('email');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<UserToDelete | null>(null);
  const [successMessage, setSuccessMessage] = useState<{ title: string; description: string }>({ title: '', description: '' });
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
  const [showSuccessModal, setShowSuccessModal] = useState(false);

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

      const { data: roles } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .eq('role', 'admin')
        .single();

      setIsCurrentUserAdmin(!!roles);
    } catch (error) {
      console.error('Error checking user role:', error);
      setIsCurrentUserAdmin(false);
    }
  };

  const fetchAllUsers = async () => {
    try {
      const { data: users, error: usersError } = await supabase
        .from('user_details')
        .select(`
          user_id,
          email,
          first_name,
          last_name,
          phone,
          gender,
          created_at,
          last_sign_in_at,
          roles,
          username,
          profile_picture
        `)
        .order('created_at', { ascending: false });

      if (usersError) throw usersError;

      // Format the data to match UserRole interface
      const formattedUsers: UserRole[] = users.map(user => ({
        id: user.user_id,
        email: user.email,
        roles: user.roles || [],
        created_at: user.created_at,
        last_sign_in: user.last_sign_in_at || null,
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        phone: user.phone || '',
        gender: user.gender || '',
        username: user.username || '',
        profile_picture: user.profile_picture || '',
        role: 'user',
        status: 'active'
      }));

      setAllUsers(formattedUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Error fetching users. Please try again.');
    }
  };

  const fetchAdmins = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data: users, error: usersError } = await supabase
        .from('user_details')
        .select(`
          user_id,
          email,
          first_name,
          last_name,
          phone,
          gender,
          created_at,
          last_sign_in_at,
          roles,
          username
        `)
        .order('created_at', { ascending: false });

      if (usersError) {
        throw new Error('Database error: ' + usersError.message);
      }

      if (!users || users.length === 0) {
        setAdmins([]);
        return;
      }

      const formattedAdmins: Admin[] = users
        .filter(user => user.roles.includes('admin'))
        .map(user => ({
          id: user.user_id,
          email: user.email,
          status: 'active',
          created_at: user.created_at,
          last_sign_in: user.last_sign_in_at || null,
          first_name: user.first_name || '',
          last_name: user.last_name || '',
          phone: user.phone || '',
          gender: user.gender || '',
          username: user.username || '',
          roles: user.roles || [],
          role: 'admin'
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
    if (!isCurrentUserAdmin) {
      setError('Only admin users can add new admins');
      return;
    }
    setEditingAdmin(null);
    setFormData({ first_name: '', last_name: '', username: '', email: '', password: '', confirmPassword: '', phone: '', gender: '', role: 'user' });
    setError(null);
    setSuccess(null);
    setIsModalOpen(true);
    onModalStateChange?.(true);
  };

  const handleEditAdmin = (admin: Admin) => {
    setSelectedUser(admin);
    setEditFormData({
      email: admin.email,
      password: '',
      role: admin.role,
      first_name: admin.first_name,
      last_name: admin.last_name,
      phone: admin.phone,
      gender: admin.gender,
      username: admin.username
    });
    setIsEditModalOpen(true);
    onModalStateChange?.(true);
  };

  const handleEditUser = (user: UserRole) => {
    setSelectedUser(user);
    setEditFormData({
      email: user.email,
      password: '',
      role: user.role,
      first_name: user.first_name,
      last_name: user.last_name,
      phone: user.phone,
      gender: user.gender,
      username: user.username
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
      formData.username.trim() !== '' &&
      formData.email.trim() !== '' &&
      formData.password.trim() !== '' &&
      formData.confirmPassword.trim() !== '' &&
      formData.phone.trim() !== '' &&
      formData.gender.trim() !== '' &&
      !usernameError &&
      usernameExists === false &&
      passwordsMatch === true &&
      passwordLength
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting || rateLimitCountdown !== null) {
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setModalError('Passwords do not match');
      return;
    }

    setIsSubmitting(true);
    setLastAttemptTime(Date.now());

    const submitRequest = async () => {
      try {
        if (!formData.email || !formData.password || !formData.first_name || !formData.last_name) {
          setModalError('Email, password, first name, and last name are required');
          return;
        }

        // Validate email format
        if (!isValidEmail(formData.email)) {
          setModalError('Please enter a valid email address');
          return;
        }

        // Normalize email before checking existence
        const normalizedEmail = normalizeEmail(formData.email);

        // First check if user exists
        const { data: existingUser, error: checkError } = await supabase
          .from('user_details')
          .select('user_id')
          .eq('email', normalizedEmail)
          .single();

        if (checkError && checkError.code !== 'PGRST116') {
          setModalError('Error checking user: ' + checkError.message);
          return;
        }

        if (existingUser) {
          setModalError('A user with this email already exists');
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
          setModalError('Failed to create user');
          return;
        }

        // Create user profile using RPC function
        const { error: profileError } = await supabase.rpc('update_user_profile_v2', {
          p_user_id: authData.user.id,
          p_first_name: formData.first_name,
          p_last_name: formData.last_name,
          p_phone: formData.phone || null,
          p_gender: formData.gender || null,
          p_username: formData.username
        });

        if (profileError) {
          setModalError('Error creating user profile: ' + profileError.message);
          return;
        }

        // First remove any existing roles using enable_user_roles_rls
        const { error: deleteRolesError } = await supabase.rpc('enable_user_roles_rls', {
          p_action: 'delete',
          p_new_role: 'user', // This will remove all roles
          p_target_user_id: authData.user.id
        });

        if (deleteRolesError) {
          setModalError('Error clearing existing roles: ' + deleteRolesError.message);
          return;
        }

        // Then assign the selected role
        const { error: roleError } = await supabase.rpc('enable_user_roles_rls', {
          p_action: 'insert',
          p_new_role: formData.role,
          p_target_user_id: authData.user.id
        });

        if (roleError) {
          setModalError('Error assigning role: ' + roleError.message);
          return;
        }

        // Log the user creation activity for the admin
        const { data: { user: adminUser } } = await supabase.auth.getUser();
        if (adminUser) {
          await supabase.rpc('log_profile_change', {
            p_user_id: adminUser.id,
            p_type: 'user_creation',
            p_description: `Created New User

Name: ${formData.first_name} ${formData.last_name}
Email: ${formData.email}
Role: ${formData.role.charAt(0).toUpperCase() + formData.role.slice(1)}`
          });
        }

        showSuccess(
          'User Created',
          'The user has been successfully created and can now log in with their credentials.'
        );
      setIsModalOpen(false);
        setFormData({ first_name: '', last_name: '', username: '', email: '', password: '', confirmPassword: '', phone: '', gender: '', role: 'user' });
        setRetryCount(0);
        setUsernameError(null);
        setUsernameExists(null);
        setCheckingUsername(false);
        setCurrentUsername('');
        setPasswordsMatch(null);
        setPasswordLength(false);
        await fetchAllUsers();
    } catch (error) {
        console.error('Error in handleSubmit:', error);
        setModalError(error instanceof Error ? error.message : 'Failed to create user');
      } finally {
        setIsSubmitting(false);
      }
    };

    addToQueue(submitRequest);
  };

  const handleDeleteAdmin = async (adminId: string) => {
    try {
      // Use the enable_user_roles_rls function to delete admin role
      const { error: deleteError } = await supabase.rpc('enable_user_roles_rls', {
        p_action: 'delete',
        p_new_role: 'admin',
        p_target_user_id: adminId
      });

      if (deleteError) {
        console.error('Error removing admin role:', deleteError);
        throw new Error(`Failed to remove admin role: ${deleteError.message}`);
      }

      // Refresh the admin list
      await fetchAdmins();
      showSuccess(
        'Admin Removed',
        'The admin role has been successfully removed from the user.'
      );
    } catch (error) {
      console.error('Error deleting admin:', error);
      setErrorMessage(error instanceof Error ? error.message : 'Failed to delete admin');
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

  const handleRoleToggle = (user: UserRole) => {
    setSelectedUser(user);
    setNewRole(user.roles.includes('admin') ? 'user' : 'admin');
    setIsRoleModalOpen(true);
  };

  const confirmRoleChange = async () => {
    if (!selectedUser) return;
    
    try {
      await handleUpdateUserRole(selectedUser.id, newRole);
      setIsRoleModalOpen(false);
      setSelectedUser(null);
    } catch (error) {
      console.error('Error in confirmRoleChange:', {
        error,
        user: selectedUser,
        newRole
      });
      setModalError(error instanceof Error ? error.message : 'Failed to update user role. Please check the console for details.');
    }
  };

  const handleDeleteUser = async (user: UserToDelete | string) => {
    try {
      const userId = typeof user === 'string' ? user : user.id;
      const userEmail = typeof user === 'string' ? '' : user.email;
      const userName = typeof user === 'string' ? '' : `${user.first_name} ${user.last_name}`.trim();
      
      // Delete user completely using the new RPC function
      const { error: deleteError } = await supabase.rpc('delete_user_completely', {
        p_user_id: userId
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
      showSuccess(
        'User Deleted',
        'The user has been successfully deleted from the system.'
      );
      await fetchAllUsers();
    } catch (error) {
      console.error('Error in handleDeleteUser:', error);
      setErrorMessage(error instanceof Error ? error.message : 'Failed to delete user');
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

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser) return;

    // Validate required fields
    if (!editFormData.first_name.trim() || !editFormData.last_name.trim() || !editFormData.username.trim()) {
      setModalError('First name, last name, and username are required');
      return;
    }

    try {
      // Update user profile
      const { error: profileError } = await supabase.rpc('update_user_profile_v2', {
        p_user_id: selectedUser.id,
        p_first_name: editFormData.first_name.trim(),
        p_last_name: editFormData.last_name.trim(),
        p_phone: editFormData.phone,
        p_gender: editFormData.gender,
        p_username: editFormData.username.trim()
      });

      if (profileError) {
        throw new Error(`Failed to update profile: ${profileError.message}`);
      }

      // Update role if changed
      if (editFormData.role !== selectedUser.roles[0]) {
        const { error: roleError } = await supabase.rpc('enable_user_roles_rls', {
        p_action: 'update',
        p_new_role: editFormData.role,
        p_target_user_id: selectedUser.id
      });

        if (roleError) {
          throw new Error(`Failed to update role: ${roleError.message}`);
        }
      }

      // Update local state first to prevent flicker
      const updatedUser: UserRole = {
        ...selectedUser,
        first_name: editFormData.first_name.trim(),
        last_name: editFormData.last_name.trim(),
        phone: editFormData.phone,
        gender: editFormData.gender,
        username: editFormData.username.trim(),
        roles: [editFormData.role],
        role: editFormData.role as 'user' | 'admin' | 'moderator'
      };

      // Update the allUsers array with the new data
      setAllUsers(prevUsers => 
        prevUsers.map(user => 
          user.id === selectedUser.id ? updatedUser : user
        )
      );

      // Update admins array if the user is an admin
      if (updatedUser.roles.includes('admin')) {
        setAdmins(prevAdmins => 
          prevAdmins.map(admin => 
            admin.id === selectedUser.id ? {
              ...admin,
              first_name: editFormData.first_name.trim(),
              last_name: editFormData.last_name.trim(),
              phone: editFormData.phone,
              gender: editFormData.gender,
              username: editFormData.username.trim(),
              roles: [editFormData.role]
            } : admin
          )
        );
      }

      // First close the edit modal
      setIsEditModalOpen(false);
      setSelectedUser(null);
      setModalError(null);
      setUsernameError(null);
      setUsernameExists(null);
      setCheckingUsername(false);
      setCurrentUsername('');
      setPasswordsMatch(null);
      setPasswordLength(false);
      
      // Then show the success modal
      showSuccess(
        'User Updated',
        'The user profile has been successfully updated with the new information.'
      );

      // Log the user update activity for the admin
      const { data: { user: adminUser } } = await supabase.auth.getUser();
      if (adminUser) {
        await supabase.rpc('log_profile_change', {
          p_user_id: adminUser.id,
          p_type: 'user_update',
          p_description: `Updated User Profile

Name: ${editFormData.first_name} ${editFormData.last_name}
Email: ${editFormData.email}
Role: ${editFormData.role.charAt(0).toUpperCase() + editFormData.role.slice(1)}`
        });
      }
    } catch (error) {
      console.error('Error in handleEditSubmit:', error);
      setModalError(error instanceof Error ? error.message : 'Failed to update user profile');
    }
  };

  const handleModalClose = () => {
    setIsEditModalOpen(false);
    setSelectedUser(null);
    hideSuccess();
    setModalError(null);
    setUsernameError(null);
    setUsernameExists(null);
    setCheckingUsername(false);
    setCurrentUsername('');
    setPasswordsMatch(null);
    setPasswordLength(false);
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
    const isCurrentUsername = formData.username === currentUsername;
    return formData.first_name.trim() !== '' && 
           formData.last_name.trim() !== '' &&
           !usernameError &&
           (!usernameExists || isCurrentUsername);
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

  const handleDelete = async (user: UserToDelete) => {
    try {
      // Use handleDeleteUser for all roles (user, admin, moderator)
        await handleDeleteUser(user);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  // Update the showSuccess function
  const showSuccess = (title: string, message: string) => {
    setSuccessMessage({
      title,
      description: message
    });
    setShowSuccessModal(true);
  };

  // Update the hideSuccess function
  const hideSuccess = () => {
    setShowSuccessModal(false);
    setSuccessMessage({ title: '', description: '' });
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
    return <PageLoadingSpinner />;
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
        <SuccessMessage>
          <FiCheck size={16} />
          {success}
        </SuccessMessage>
      )}

      {isRefreshing && (
        <LoadingOverlay>
          <LoadingSpinner />
          <LoadingText>Updating lists...</LoadingText>
        </LoadingOverlay>
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
                        <span>Last Activity</span>
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
                      <ActionGroup>
                          <ActionButton $color="#10B981" onClick={(e) => {
                            e.stopPropagation();
                            user.role === 'admin' ? handleEditAdmin(user as Admin) : handleEditUser(user);
                          }}>
                            <FontAwesomeIcon icon={faPen} />
                          </ActionButton>
                          {isConfirmingDelete === user.id ? (
                            <>
                              <ActionButton $color="#10B981" onClick={(e) => {
                                e.stopPropagation();
                                handleDelete(user);
                              }}>
                                <FontAwesomeIcon icon={faCheck} />
                              </ActionButton>
                              <ActionButton 
                              onClick={(e) => {
                                e.stopPropagation();
                                setIsConfirmingDelete(null);
                              }}
                              >
                                <FontAwesomeIcon icon={faTimes} />
                              </ActionButton>
                            </>
                          ) : (
                        <ActionButton $color="#EF4444" onClick={(e) => {
                          e.stopPropagation();
                          setUserToDelete(user);
                          setIsDeleteModalOpen(true);
                        }}>
                          <FontAwesomeIcon icon={faTrash} />
                        </ActionButton>
                          )}
                      </ActionGroup>
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
                    <CardLabel>Last Activity</CardLabel>
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
                    <ActionButton $color="#10B981" onClick={(e) => {
                      e.stopPropagation();
                      user.role === 'admin' ? handleEditAdmin(user as Admin) : handleEditUser(user);
                    }}>
                      <FontAwesomeIcon icon={faPen} />
                    </ActionButton>
                    
                    {isConfirmingDelete === user.id ? (
                      <>
                        <ActionButton $color="#10B981" onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(user);
                        }}>
                          <FontAwesomeIcon icon={faCheck} />
                        </ActionButton>
                        <ActionButton $color="#EF4444" onClick={(e) => {
                          e.stopPropagation();
                          setIsConfirmingDelete(null);
                        }}>
                          <FontAwesomeIcon icon={faTimes} />
                        </ActionButton>
                      </>
                    ) : (
                      <ActionButton $color="#EF4444" onClick={(e) => {
                        e.stopPropagation();
                        setUserToDelete(user);
                        setIsDeleteModalOpen(true);
                      }}>
                        <FontAwesomeIcon icon={faTrash} />
                      </ActionButton>
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
                        <span>Last Activity</span>
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
                        <ActionGroup>
                          <ActionButton $color="#10B981" onClick={(e) => {
                            e.stopPropagation();
                            handleEditUser(user);
                          }}>
                            <FontAwesomeIcon icon={faPen} />
                          </ActionButton>
                          {isConfirmingDelete === user.id ? (
                            <>
                              <ActionButton $color="#10B981" onClick={(e) => {
                                e.stopPropagation();
                                handleDelete(user);
                              }}>
                                <FontAwesomeIcon icon={faCheck} />
                              </ActionButton>
                              <ActionButton 
                              onClick={(e) => {
                                e.stopPropagation();
                                setIsConfirmingDelete(null);
                              }}
                              >
                                <FontAwesomeIcon icon={faTimes} />
                              </ActionButton>
                            </>
                          ) : (
                            <ActionButton $color="#EF4444" onClick={(e) => {
                              e.stopPropagation();
                              setUserToDelete(user);
                              setIsDeleteModalOpen(true);
                            }}>
                              <FontAwesomeIcon icon={faTrash} />
                            </ActionButton>
                          )}
                        </ActionGroup>
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
                    <CardLabel>Last Activity</CardLabel>
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
                    <ActionButton $color="#10B981" onClick={(e) => {
                      e.stopPropagation();
                      handleEditUser(user);
                    }}>
                      <FontAwesomeIcon icon={faPen} />
                    </ActionButton>
                    
                    {isConfirmingDelete === user.id ? (
                      <>
                        <ActionButton $color="#10B981" onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(user);
                        }}>
                          <FontAwesomeIcon icon={faCheck} />
                        </ActionButton>
                        <ActionButton 
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsConfirmingDelete(null);
                        }}
                        >
                          <FontAwesomeIcon icon={faTimes} />
                        </ActionButton>
                      </>
                    ) : (
                      <ActionButton $color="#EF4444" onClick={(e) => {
                        e.stopPropagation();
                        setUserToDelete(user);
                        setIsDeleteModalOpen(true);
                      }}>
                        <FontAwesomeIcon icon={faTrash} />
                      </ActionButton>
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
                      {isCurrentUserAdmin && (
                        <TableCell style={{ width: '120px' }}>
                          <ActionGroup>
                            <ActionButton $color="#10B981" onClick={(e) => {
                              e.stopPropagation();
                              handleEditUser(user);
                            }}>
                              <FontAwesomeIcon icon={faPen} />
                            </ActionButton>
                            <ActionButton $color="#10B981" onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteClick(user);
                            }}>
                              <FontAwesomeIcon icon={faUserCog} />
                            </ActionButton>
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
                    <CardLabel>Last Activity</CardLabel>
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
                    <ActionButton $color="#10B981" onClick={(e) => {
                      e.stopPropagation();
                      handleEditUser(user);
                    }}>
                      <FontAwesomeIcon icon={faPen} />
                    </ActionButton>
                    <ActionButton $color="#10B981" onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteClick(user);
                    }}>
                      <FontAwesomeIcon icon={faUserCog} />
                    </ActionButton>
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
                      {isCurrentUserAdmin && (
                        <TableCell style={{ width: '120px' }}>
                          <ActionGroup>
                            <ActionButton $color="#10B981" onClick={(e) => {
                              e.stopPropagation();
                              handleEditUser(user);
                            }}>
                              <FontAwesomeIcon icon={faPen} />
                            </ActionButton>
                            <ActionButton $color="#10B981" onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteClick(user);
                            }}>
                              <FontAwesomeIcon icon={faUserCog} />
                            </ActionButton>
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
                    <CardLabel>Last Activity</CardLabel>
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
                    <ActionButton $color="#10B981" onClick={(e) => {
                      e.stopPropagation();
                      handleEditUser(user);
                    }}>
                      <FontAwesomeIcon icon={faPen} />
                    </ActionButton>
                    <ActionButton $color="#10B981" onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteClick(user);
                    }}>
                      <FontAwesomeIcon icon={faUserCog} />
                    </ActionButton>
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
                        <span>Last Activity</span>
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
                        <ActionGroup>
                          <ActionButton $color="#10B981" onClick={(e) => {
                            e.stopPropagation();
                            handleEditUser(user);
                          }}>
                            <FontAwesomeIcon icon={faPen} />
                          </ActionButton>
                          {isConfirmingDelete === user.id ? (
                            <>
                              <ActionButton $color="#10B981" onClick={(e) => {
                                e.stopPropagation();
                                handleDelete(user);
                              }}>
                                <FontAwesomeIcon icon={faCheck} />
                              </ActionButton>
                              <ActionButton 
                              onClick={(e) => {
                                e.stopPropagation();
                                setIsConfirmingDelete(null);
                              }}
                              >
                                <FontAwesomeIcon icon={faTimes} />
                              </ActionButton>
                            </>
                          ) : (
                            <ActionButton $color="#EF4444" onClick={(e) => {
                              e.stopPropagation();
                              setUserToDelete(user);
                              setIsDeleteModalOpen(true);
                            }}>
                              <FontAwesomeIcon icon={faTrash} />
                            </ActionButton>
                          )}
                        </ActionGroup>
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
                    <CardLabel>Last Activity</CardLabel>
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
                    <ActionButton $color="#10B981" onClick={(e) => {
                      e.stopPropagation();
                      handleEditUser(user);
                    }}>
                      <FontAwesomeIcon icon={faPen} />
                    </ActionButton>
                    
                    {isConfirmingDelete === user.id ? (
                      <>
                        <ActionButton $color="#10B981" onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(user);
                        }}>
                          <FontAwesomeIcon icon={faCheck} />
                        </ActionButton>
                        <ActionButton 
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsConfirmingDelete(null);
                        }}
                        >
                          <FontAwesomeIcon icon={faTimes} />
                        </ActionButton>
                      </>
                    ) : (
                      <ActionButton $color="#EF4444" onClick={(e) => {
                        e.stopPropagation();
                        setUserToDelete(user);
                        setIsDeleteModalOpen(true);
                      }}>
                        <FontAwesomeIcon icon={faTrash} />
                      </ActionButton>
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

      <Modal $isOpen={isModalOpen}>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>Add New User</ModalTitle>
            <CloseButton onClick={() => {
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
            }}>
              <FaTimes size={20} />
            </CloseButton>
          </ModalHeader>

          <Form onSubmit={handleSubmit}>
            <FormRow>
            <FormGroup>
                <Label htmlFor="first-name">
                  First Name
                  <RequiredAsterisk>*</RequiredAsterisk>
                </Label>
                <Input
                  id="first-name"
                  type="text"
                  pattern="[A-Za-z ]*"
                  value={formData.first_name}
                  onChange={(e) => handleInputChange(e, 'first_name')}
                  required
                  disabled={isSubmitting || rateLimitCountdown !== null}
                  placeholder="Enter first name"
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="last-name">
                  Last Name
                  <RequiredAsterisk>*</RequiredAsterisk>
                </Label>
                <Input
                  id="last-name"
                  type="text"
                  pattern="[A-Za-z ]*"
                  value={formData.last_name}
                  onChange={(e) => handleInputChange(e, 'last_name')}
                  required
                  disabled={isSubmitting || rateLimitCountdown !== null}
                  placeholder="Enter last name"
                />
              </FormGroup>
            </FormRow>

            <FormRow>
              <FormGroup>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  pattern="[0-9]*"
                  value={formData.phone}
                  onChange={(e) => {
                    if (e.target.validity.valid) {
                      setFormData({ ...formData, phone: e.target.value });
                    }
                  }}
                  disabled={isSubmitting || rateLimitCountdown !== null}
                  placeholder="Enter phone number"
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="gender">Gender</Label>
                <GenderSelectContainer>
                  <GenderSelect
                    id="gender"
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    disabled={isSubmitting || rateLimitCountdown !== null}
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </GenderSelect>
                  <GenderIcon>
                    {formData.gender === 'male' ? <FaMale size={18} /> :
                     formData.gender === 'female' ? <FaFemale size={18} /> :
                     formData.gender === 'other' ? <FaTransgender size={18} /> :
                     formData.gender === 'prefer-not-to-say' ? <FaQuestion size={18} /> :
                     <FaQuestion size={18} />}
                  </GenderIcon>
                </GenderSelectContainer>
              </FormGroup>
            </FormRow>

            <FormGroup>
              <Label htmlFor="email">
                Email
                <RequiredAsterisk>*</RequiredAsterisk>
              </Label>
              <InputWrapper>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    if (modalError && modalError.includes('A user with this email already exists')) {
                      setModalError(null);
                    }
                  }}
                  required
                  disabled={isSubmitting || rateLimitCountdown !== null}
                  placeholder="your@email.com"
                />
                {modalError && modalError.includes('A user with this email already exists') && (
                  <HelperText style={{ color: '#dc2626' }}>
                    <FiX size={14} />
                    A user with this email already exists
                  </HelperText>
                )}
              </InputWrapper>
            </FormGroup>

            <FormRow>
              <FormGroup>
                <Label htmlFor="username">
                  Username
                  <RequiredAsterisk>*</RequiredAsterisk>
                </Label>
                <InputWrapper>
                  <Input
                    id="username"
                    type="text"
                    pattern="[a-zA-Z0-9._-]*"
                    value={formData.username}
                    onChange={(e) => {
                      const value = e.target.value;
                      validateUsername(value);
                      if (value === '' || e.target.validity.valid) {
                        setFormData({ ...formData, username: value });
                      }
                    }}
                    placeholder="Enter username"
                    required
                    disabled={isSubmitting || rateLimitCountdown !== null}
                  />
                  {usernameError && (
                    <HelperText style={{ color: '#dc2626' }}>
                      <FiX size={14} />
                      {usernameError}
                    </HelperText>
                  )}
                  {checkingUsername && (
                    <HelperText style={{ color: '#6b7280' }}>
                      <FiLoader size={14} />
                      Checking username...
                    </HelperText>
                  )}
                  {!checkingUsername && !usernameError && usernameExists === false && (
                    <HelperText style={{ color: '#059669' }}>
                      <FiCheck size={14} />
                      Username is available
                    </HelperText>
                  )}
                  {!checkingUsername && !usernameError && usernameExists === true && (
                    <HelperText style={{ color: '#dc2626' }}>
                      <FiX size={14} />
                      Username is already taken
                    </HelperText>
                  )}
                </InputWrapper>
              </FormGroup>

              <FormGroup>
                <Label htmlFor="role">
                  Role
                  <RequiredAsterisk>*</RequiredAsterisk>
                </Label>
                <RoleSelectContainer>
                  <RoleSelect
                    id="role"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value as 'admin' | 'moderator' | 'user' | 'developer' | 'author' })}
                    required
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                    <option value="moderator">Moderator</option>
                    <option value="developer">Developer</option>
                    <option value="author">Author</option>
                  </RoleSelect>
                  <RoleIcon>
                    {formData.role === 'admin' ? <FiShield size={18} /> : 
                     formData.role === 'moderator' ? <FiUserCheck size={18} /> : 
                     formData.role === 'developer' ? <FiCode size={18} /> :
                     formData.role === 'author' ? <FiEdit size={18} /> :
                     <FiUser size={18} />}
                  </RoleIcon>
                </RoleSelectContainer>
              </FormGroup>
            </FormRow>

            <FormRow>
              <FormGroup>
                <Label htmlFor="password">
                  Password
                  <RequiredAsterisk>*</RequiredAsterisk>
                </Label>
                <PasswordInputContainer>
                  <PasswordInput
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handlePasswordChange}
                    required
                    disabled={isSubmitting || rateLimitCountdown !== null}
                    placeholder="Enter password"
                  />
                  <ViewPasswordButton
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isSubmitting || rateLimitCountdown !== null}
                  >
                    {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                  </ViewPasswordButton>
                </PasswordInputContainer>
              </FormGroup>

              <FormGroup>
                <Label htmlFor="confirmPassword">
                  Confirm Password
                  <RequiredAsterisk>*</RequiredAsterisk>
                </Label>
                <PasswordInputContainer>
                  <PasswordInput
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    required
                    disabled={isSubmitting || rateLimitCountdown !== null}
                    placeholder="Confirm your password"
                  />
                  <ViewPasswordButton
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    disabled={isSubmitting || rateLimitCountdown !== null}
                  >
                    {showConfirmPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                  </ViewPasswordButton>
                </PasswordInputContainer>
              </FormGroup>
            </FormRow>

            <div style={{ display: 'flex', flexDirection: 'column', marginTop: '-8px' }}>
              {formData.password && (
                <PasswordMatchIndicator $matches={passwordLength}>
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
            </div>

            {modalError && !modalError.includes('A user with this email already exists') && (
              <ErrorMessage>
                <FiAlertCircle />
                {modalError}
                {rateLimitCountdown !== null && retryCount > 0 && retryCount < MAX_RETRIES && (
                  <div style={{ fontSize: '0.875rem', marginTop: '4px' }}>
                    Attempt {retryCount} of {MAX_RETRIES}
                  </div>
                )}
              </ErrorMessage>
            )}

     

            <ButtonGroup>
              <CancelButton 
                type="button"
                onClick={() => {
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
                disabled={isSubmitting}
              >
                Cancel
              </CancelButton>
              <SaveButton 
                type="submit"
                disabled={Boolean(
                  !formData.first_name.trim() || 
                  !formData.last_name.trim() || 
                  !formData.username.trim() || 
                  !formData.email.trim() || 
                  !formData.password.trim() || 
                  !formData.confirmPassword.trim() || 
                  usernameError ||
                  usernameExists === true ||
                  passwordsMatch !== true ||
                  passwordLength !== true ||
                  isSubmitting || 
                  rateLimitCountdown !== null
                )}
              >
                {isSubmitting ? 'Creating...' : 
                 rateLimitCountdown !== null ? `Time remaining: ${formatTime(rateLimitCountdown)}` : 
                 'Create User'}
              </SaveButton>
            </ButtonGroup>
          </Form>
        </ModalContent>
      </Modal>

      {/* Edit User Modal */}
      <Modal $isOpen={isEditModalOpen}>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>Update User Profile</ModalTitle>
            <CloseButton onClick={handleModalClose}>
              <FaTimes size={20} />
            </CloseButton>
          </ModalHeader>

          <Form onSubmit={handleEditSubmit}>
            
          <FormRow>
            <FormGroup>
                <Label htmlFor="edit-first-name">
                  First Name
                  <RequiredAsterisk>*</RequiredAsterisk>
                </Label>
                <Input
                  id="edit-first-name"
                  type="text"
                  pattern="[A-Za-z ]*"
                  value={editFormData.first_name}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === '' || e.target.validity.valid) {
                      setEditFormData({ ...editFormData, first_name: value });
                    }
                  }}
                  placeholder="Enter first name"
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="edit-last-name">
                  Last Name
                  <RequiredAsterisk>*</RequiredAsterisk>
                </Label>
                <Input
                  id="edit-last-name"
                  type="text"
                  pattern="[A-Za-z ]*"
                  value={editFormData.last_name}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === '' || e.target.validity.valid) {
                      setEditFormData({ ...editFormData, last_name: value });
                    }
                  }}
                  required
                  placeholder="Enter last name"
                />
              </FormGroup>
            </FormRow>

            <FormRow>
              <FormGroup>
                <Label htmlFor="edit-phone">Phone</Label>
                <Input
                  id="edit-phone"
                  type="tel"
                  pattern="[0-9]*"
                  value={editFormData.phone}
                  onChange={(e) => {
                    if (e.target.validity.valid) {
                      setEditFormData({ ...editFormData, phone: e.target.value });
                    }
                  }}
                  placeholder="Enter phone number"
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="edit-gender">Gender</Label>
                <GenderSelectContainer>
                  <GenderSelect
                    id="edit-gender"
                    value={editFormData.gender}
                    onChange={(e) => setEditFormData({ ...editFormData, gender: e.target.value })}
                  >
                    <option value="">Select gender </option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </GenderSelect>
                  <GenderIcon>
                    {editFormData.gender === 'male' ? <FaMale size={18} /> :
                     editFormData.gender === 'female' ? <FaFemale size={18} /> :
                     editFormData.gender === 'other' ? <FaTransgender size={18} /> :
                     editFormData.gender === 'prefer-not-to-say' ? <FaQuestion size={18} /> :
                     <FaQuestion size={18} />}
                  </GenderIcon>
                </GenderSelectContainer>
              </FormGroup>
            </FormRow>

            <FormGroup>
              <Label htmlFor="edit-email">
                Email
                <RequiredAsterisk>*</RequiredAsterisk>
              </Label>
              <Input
                id="edit-email"
                type="email"
                value={editFormData.email}
                onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
                required
                disabled
                className="disabled-input"
              />
              <HelperText>Email cannot be changed</HelperText>
            </FormGroup>

            <FormRow>
            <FormGroup>
                <Label htmlFor="edit-username">
                  Username
                  <RequiredAsterisk>*</RequiredAsterisk>
                </Label>
                <InputWrapper>
              <Input
                    id="edit-username"
                    type="text"
                    pattern="[a-zA-Z0-9._-]*"
                    value={editFormData.username}
                    onChange={(e) => {
                      const value = e.target.value;
                      validateUsername(value);
                      if (value === '' || e.target.validity.valid) {
                        setEditFormData({ ...editFormData, username: value });
                      }
                    }}
                    placeholder="Enter username"
                    required
                    style={{ width: '100%' }}
                  />
                  {usernameError && (
                    <HelperText style={{ color: '#dc2626' }}>
                      <FiX size={14} />
                      {usernameError}
                    </HelperText>
                  )}
                  {checkingUsername && (
                    <HelperText style={{ color: '#6b7280' }}>
                      <FiLoader size={14} />
                      Checking username...
                    </HelperText>
                  )}
                  {!checkingUsername && !usernameError && usernameExists === false && (
                    <HelperText style={{ color: '#059669' }}>
                      <FiCheck size={14} />
                      Username is available
                    </HelperText>
                  )}
                  {!checkingUsername && !usernameError && usernameExists === true && editFormData.username === currentUsername && (
                    <HelperText style={{ color: '#6b7280' }}>
                      <FiCheck size={14} />
                      This is the current username
                    </HelperText>
                  )}
                  {!checkingUsername && !usernameError && usernameExists === true && editFormData.username !== currentUsername && (
                    <HelperText style={{ color: '#dc2626' }}>
                      <FiX size={14} />
                      Username is already taken
                    </HelperText>
                  )}
                </InputWrapper>
            </FormGroup>

            <FormGroup>
                <Label htmlFor="edit-role">
                  Role
                  <RequiredAsterisk>*</RequiredAsterisk>
                </Label>
              <RoleSelectContainer>
                <RoleSelect
                  id="edit-role"
                  value={editFormData.role}
                  onChange={(e) => setEditFormData({ ...editFormData, role: e.target.value as 'admin' | 'moderator' | 'user' | 'developer' | 'author' })}
                  required
                >
                  <option value="">Select role</option>
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                  <option value="moderator">Moderator</option>
                  <option value="developer">Developer</option>
                  <option value="author">Author</option>
                </RoleSelect>
                <RoleIcon>
                    {editFormData.role === 'admin' ? <FiShield size={18} /> : 
                     editFormData.role === 'moderator' ? <FiUserCheck size={18} /> : 
                     editFormData.role === 'developer' ? <FiCode size={18} /> :
                     editFormData.role === 'author' ? <FiEdit size={18} /> :
                     <FiUser size={18} />}
                </RoleIcon>
              </RoleSelectContainer>
            </FormGroup>
            </FormRow>

            

            {modalError && (
              <ErrorMessage>
                <FiAlertCircle />
                {modalError}
              </ErrorMessage>
            )}

            {modalSuccess && (
              <SuccessMessage>
                <FiCheck size={16} />
                {modalSuccess}
              </SuccessMessage>
            )}

            <ButtonGroup>
              <CancelButton 
                type="button"
                onClick={handleModalClose}
              >
                Cancel
              </CancelButton>
              <SaveButton 
                type="submit"
                disabled={Boolean(
                  !editFormData.first_name.trim() || 
                  !editFormData.last_name.trim() || 
                  !editFormData.role || 
                  !editFormData.username.trim() || 
                  usernameError ||
                  (usernameExists === true && editFormData.username !== currentUsername)
                )}
              >
                Save Changes
              </SaveButton>
            </ButtonGroup>
          </Form>
        </ModalContent>
      </Modal>

      {/* Role Change Confirmation Modal */}
      <Modal $isOpen={isRoleModalOpen}>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>
              {newRole === 'admin' ? 'Make Admin' : 'Remove Admin Role'}
            </ModalTitle>
            <CloseButton onClick={() => {
              setIsRoleModalOpen(false);
              setSelectedUser(null);
            }}>
              <FaTimes size={20} />
            </CloseButton>
          </ModalHeader>

          <p style={{ marginBottom: '20px' }}>
            Are you sure you want to {newRole === 'admin' ? 'make' : 'remove'} {selectedUser?.email} an admin?
          </p>

          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
            <Button 
              onClick={() => {
                setIsRoleModalOpen(false);
                setSelectedUser(null);
              }}
              style={{ backgroundColor: '#6B7280' }}
            >
              Cancel
            </Button>
            <Button 
              onClick={confirmRoleChange}
              style={{ backgroundColor: newRole === 'admin' ? '#3B82F6' : '#EF4444' }}
            >
              {newRole === 'admin' ? 'Make Admin' : 'Remove Admin'}
            </Button>
          </div>
        </ModalContent>
      </Modal>

      {/* Delete User Confirmation Modal */}
      {isDeleteModalOpen && userToDelete && (
        <DeleteModal $isOpen={isDeleteModalOpen}>
          <DeleteModalContent>
            <DeleteIcon>
              <FiTrash2 size={24} />
            </DeleteIcon>
            <DeleteTitle>Delete User</DeleteTitle>
            <DeleteMessage>
                  Are you sure you want to delete {userToDelete.username || userToDelete.email}? This action cannot be undone.
            </DeleteMessage>
                {errorMessage && (
              <ErrorMessage>
                <FiAlertCircle />
                    {errorMessage}
              </ErrorMessage>
                )}
            <DeleteButtonGroup>
              <DeleteCancelButton onClick={() => {
                      setIsDeleteModalOpen(false);
                      setUserToDelete(null);
                      setErrorMessage('');
              }}>
                    Cancel
              </DeleteCancelButton>
              <DeleteConfirmButton onClick={handleDeleteConfirm}>
                    Delete
              </DeleteConfirmButton>
            </DeleteButtonGroup>
          </DeleteModalContent>
        </DeleteModal>
      )}

      {showSuccessModal && (
        <SuccessModal $isOpen={showSuccessModal}>
          <SuccessModalContent>
            <SuccessIcon>
              <FiCheck size={24} />
            </SuccessIcon>
            <SuccessTitle>{successMessage.title}</SuccessTitle>
            <SuccessMessage>
              {successMessage.description}
            </SuccessMessage>
            <SuccessButton onClick={hideSuccess}>
              Continue
            </SuccessButton>
          </SuccessModalContent>
        </SuccessModal>
      )}

      {selectedUser && (
        <ProfileSidebar
          isOpen={isProfileOpen}
          onClose={() => setIsProfileOpen(false)}
          profile={{
            name: `${selectedUser.first_name} ${selectedUser.last_name}`,
            email: selectedUser.email,
            username: selectedUser.username,
            role: selectedUser.roles, // Pass the full array of roles
            phone: selectedUser.phone,
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
          return props.$active ? '#1F2937' : '#4B5563';
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

const SuccessModal = styled.div<{ $isOpen: boolean }>`
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

const SuccessModalContent = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 12px;
  width: 100%;
  max-width: 400px;
  text-align: center;
`;

const SuccessIcon = styled.div`
  width: 48px;
  height: 48px;
  background-color: ${props => props.theme.colors.success}15;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  color: ${props => props.theme.colors.success};
`;

const SuccessTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text.primary};
  margin-bottom: 0.5rem;
`;

const SuccessMessage = styled.p`
  font-size: 0.875rem;
  color: ${props => props.theme.colors.text.secondary};
  margin-bottom: 1.5rem;
`;

const SuccessButton = styled.button`
  padding: 0.875rem 1.5rem;
  background: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  width: 100%;

  &:hover {
    background: ${props => props.theme.colors.primaryDark};
  }

  &:active {
    transform: scale(0.98);
  }
`;

// Add new styled components for delete modal
const DeleteModal = styled.div<{ $isOpen: boolean }>`
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

const DeleteModalContent = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 12px;
  width: 100%;
  max-width: 400px;
  text-align: center;
`;

const DeleteIcon = styled.div`
  width: 48px;
  height: 48px;
  background-color: ${props => props.theme.colors.error}15;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  color: ${props => props.theme.colors.error};
`;

const DeleteTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text.primary};
  margin-bottom: 0.5rem;
`;

const DeleteMessage = styled.p`
  font-size: 0.875rem;
  color: ${props => props.theme.colors.text.secondary};
  margin-bottom: 1.5rem;
`;

const DeleteButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
`;

const DeleteConfirmButton = styled(ModalButton)`
  background-color: #EF4444;
  color: white;

  &:hover {
    background-color: #DC2626;
  }
`;

const DeleteCancelButton = styled(ModalButton)`
  background: transparent;
  border: 1.5px solid #9aa2b3;
  color: ${props => props.theme.colors.text.primary};

  &:hover {
    background: ${props => props.theme.colors.background.secondary};
    border-color: ${props => props.theme.colors.text.primary};
  }
`;

// Add these new styled components after the DeleteCancelButton component
const CardViewContainer = styled.div`
  display: none;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;

  @media (max-width: 470px) {
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
  transition: all 0.2s;
  
  &:hover {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    transform: translateY(-2px);
  }
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
