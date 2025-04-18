import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { supabase } from '@/lib/supabase';
import { FiUserPlus, FiTrash2, FiEdit2, FiCheck, FiX, FiAlertCircle, FiUser, FiShield, FiInfo, FiUserCheck, FiUserX, FiEye, FiEyeOff } from 'react-icons/fi';
import { FaMale, FaFemale, FaTransgender, FaQuestion } from 'react-icons/fa';

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
  color: #111827;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background-color: #3B82F6;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;

  &:hover {
    background-color: #2563EB;
  }
`;

const Table = styled.table`
  width: 100%;
  margin-top: 1rem;
  background: white;
  border-radius: 0.5rem;
  overflow: hidden;
border: 1px solid #E5E7EB;
  tr:last-child td {
    border-bottom: none;
  }
`;

const Th = styled.th<{ $sortable?: boolean }>`
  padding: 12px 16px;
  text-align: left;
  color: rgb(107, 114, 128);
  font-weight: 500;
  border-bottom: 1px solid #E5E7EB;
  font-size: 16px;
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

const SortIcon = styled.span<{ $active: boolean; $direction: 'asc' | 'desc' }>`
  display: inline-block;
  margin-left: 4px;
  color: #111827;
  transform: ${props => props.$direction === 'desc' ? 'rotate(180deg)' : 'none'};
  transition: all 0.3s ease;
  opacity: ${props => props.$active ? 1 : 0};
  visibility: ${props => props.$active ? 'visible' : 'hidden'};
`;

const Td = styled.td`
  padding: 12px 16px;
  border-bottom: 1px solid #e5e7eb;
  color: #111827;
  font-size: 16px;
`;

const ActionButton = styled.button<{ $variant?: 'danger' | 'success' }>`
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
  align-items: center;
`;

const StatusBadge = styled.span<{ $status: 'active' | 'pending' | 'not-confirmed' }>`
  padding: 4px 8px;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  background-color: ${props => {
    switch (props.$status) {
      case 'active':
        return '#D1FAE5';
      case 'pending':
        return '#FEF3C7';
      case 'not-confirmed':
        return '#D1D5DB';
      default:
        return '#D1D5DB';
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
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 16px 32px 32px 32px;
  border-radius: 12px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ModalTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #6B7280;
  cursor: pointer;
  padding: 4px;
  
  &:hover {
    color: #111827;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const FormRow = styled.div`
  display: flex;
  gap: 16px;
  width: 100%;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
`;

const RequiredAsterisk = styled.span`
  color: #EF4444;
  margin-left: 4px;
`;

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  display: flex;
  align-items: center;
`;

const Input = styled.input`
   padding: 8px 12px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 0.875rem;

  &:focus {
    outline: none;
    border-color: #3B82F6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
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
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
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
`;

const SuccessMessage = styled.div`
  color: #059669;
  font-size: 0.875rem;
  margin-top: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const HelperText = styled.span`
  font-size: 0.75rem;
  color: #6B7280;
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
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 24px;
`;

const ModalButton = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
`;

const CancelButton = styled(ModalButton)`
  background-color: #F3F4F6;
  color: #374151;

  &:hover {
    background-color: #E5E7EB;
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
`;

const FilterInput = styled.input`
  padding: 8px 12px;
  border: 1px solid #E5E7EB;
  border-radius: 6px;
  font-size: 0.875rem;
  width: 400px;

  &:focus {
    outline: none;
    border-color: #3B82F6;
    box-shadow: 0 0 0 1px #3B82F6;
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

interface UserData {
  user_id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  gender: string;
  created_at: string;
  last_sign_in_at: string | null;
  roles: string[];
}

interface AdminRoleData {
  user_id: string;
  created_at: string;
  users: UserData | null;
}

interface Admin {
  id: string;
  email: string;
  status: 'active' | 'pending';
  created_at: string;
  last_sign_in: string | null;
  first_name?: string;
  last_name?: string;
  phone?: string;
  gender?: string;
}

interface AdminFormData {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  phone: string;
  gender: string;
}

interface UserRole {
  id: string;
  email: string;
  roles: string[];
  created_at: string;
  last_sign_in: string | null | undefined;
  first_name?: string;
  last_name?: string;
  phone?: string;
  gender?: string;
}

interface UserEditFormData {
  email: string;
  password: string;
  role: 'admin' | 'moderator' | 'user';
  first_name: string;
  last_name: string;
  phone: string;
  gender: string;
}

// Add type for user to delete
type UserToDelete = UserRole | Admin;

// Update the sort field type
type SortField = 'email' | 'name' | 'roles' | 'last_sign_in';

const AdminManagementTab: React.FC = () => {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [allUsers, setAllUsers] = useState<UserRole[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState<Admin | null>(null);
  const [formData, setFormData] = useState<AdminFormData>({
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    phone: '',
    gender: ''
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [modalError, setModalError] = useState<string | null>(null);
  const [modalSuccess, setModalSuccess] = useState<string | null>(null);
  const [isConfirmingDelete, setIsConfirmingDelete] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'admins' | 'moderators' | 'users'>('admins');
  const [isCurrentUserAdmin, setIsCurrentUserAdmin] = useState(false);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserRole | null>(null);
  const [newRole, setNewRole] = useState<'admin' | 'user'>('admin');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState<UserEditFormData>({
    email: '',
    password: '',
    role: 'user',
    first_name: '',
    last_name: '',
    phone: '',
    gender: ''
  });
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [filterEmail, setFilterEmail] = useState('');
  const [sortField, setSortField] = useState<SortField>('email');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<UserToDelete | null>(null);
  const [successMessage, setSuccessMessage] = useState<string>('');
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

  // Add ref for timeout
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

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
          roles
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
        gender: user.gender || ''
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
          roles
        `)
        .order('created_at', { ascending: false });

      if (usersError) {
        throw new Error('Database error: ' + usersError.message);
      }

      if (!users || users.length === 0) {
        setAdmins([]);
        return;
      }

      const formattedAdmins = users
        .filter(user => user.roles.includes('admin'))
        .map(user => ({
          id: user.user_id,
          email: user.email,
          status: 'active' as const,
          created_at: user.created_at,
          last_sign_in: user.last_sign_in_at || null,
          first_name: user.first_name || '',
          last_name: user.last_name || '',
          phone: user.phone || '',
          gender: user.gender || ''
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
    setFormData({ email: '', password: '', first_name: '', last_name: '', phone: '', gender: '' });
    setError(null);
    setSuccess(null);
    setIsModalOpen(true);
  };

  const handleEditAdmin = (admin: Admin) => {
    if (!isCurrentUserAdmin) {
      setError('Only admin users can edit admins');
      return;
    }
    setSelectedUser({
      id: admin.id,
      email: admin.email,
      roles: ['admin'],
      created_at: admin.created_at,
      last_sign_in: admin.last_sign_in,
      first_name: admin.first_name || '',
      last_name: admin.last_name || '',
      phone: admin.phone || '',
      gender: admin.gender || ''
    });
    setEditFormData({
      email: admin.email,
      password: '',
      role: 'admin',
      first_name: admin.first_name || '',
      last_name: admin.last_name || '',
      phone: admin.phone || '',
      gender: admin.gender || ''
    });
    setIsEditModalOpen(true);
  };

  const handleEditUser = (user: UserRole) => {
    setSelectedUser(user);
    setEditFormData({
      email: user.email,
      password: '',
      role: user.roles.includes('admin') ? 'admin' : user.roles.includes('moderator') ? 'moderator' : 'user',
      first_name: user.first_name || '',
      last_name: user.last_name || '',
      phone: user.phone || '',
      gender: user.gender || ''
    });
    setIsEditModalOpen(true);
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
      formData.password.trim() !== ''
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting || rateLimitCountdown !== null) {
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

        // First check if user exists
        const { data: existingUser, error: checkError } = await supabase
          .from('user_details')
          .select('user_id')
          .eq('email', formData.email)
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
              email: formData.email,
              password: formData.password,
              options: {
                emailRedirectTo: `${window.location.origin}/auth/callback`
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
                setModalError('Too many attempts. Please wait 5 minutes or try using a different email address.');
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

        // Create user profile
        const { error: profileError } = await supabase
          .from('user_details')
          .insert({
            user_id: authData.user.id,
            email: formData.email,
            first_name: formData.first_name,
            last_name: formData.last_name,
            phone: formData.phone || null,
            gender: formData.gender || null,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          });

        if (profileError) {
          setModalError('Error creating user profile: ' + profileError.message);
          return;
        }

        // Assign user role
        const { error: roleError } = await supabase.rpc('enable_user_roles_rls', {
          p_action: 'insert',
          p_new_role: 'user',
          p_target_user_id: authData.user.id
        });

        if (roleError) {
          setModalError('Error assigning role: ' + roleError.message);
          return;
        }

        setModalSuccess('User created successfully');
        setIsModalOpen(false);
        setFormData({ email: '', password: '', first_name: '', last_name: '', phone: '', gender: '' });
        setRetryCount(0);
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
        p_target_user_id: adminId
      });

      if (deleteError) {
        console.error('Error removing admin role:', deleteError);
        throw new Error(`Failed to remove admin role: ${deleteError.message}`);
      }

      // Refresh the admin list
      await fetchAdmins();
      setSuccess('Admin removed successfully');
    } catch (error) {
      console.error('Error deleting admin:', error);
      setError(error instanceof Error ? error.message : 'Failed to delete admin');
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
      
      // First delete all roles for the user
      const { error: roleError } = await supabase.rpc('delete_user_roles', {
        user_id: userId
      });

      if (roleError) {
        console.error('Error deleting user roles:', roleError);
        throw new Error('Failed to delete user roles');
      }

      // Then delete the user using our API endpoint
      const response = await fetch('/api/admin/delete-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to delete user');
      }

      // Set success message and refresh the user list
      setSuccessMessage('User deleted successfully');
      await fetchAllUsers();

      // Auto close the modal after 0.5 seconds
      setTimeout(() => {
        setIsDeleteModalOpen(false);
        setUserToDelete(null);
        setSuccessMessage('');
      }, 500);
    } catch (error) {
      console.error('Error in handleDeleteUser:', error);
      setErrorMessage(error instanceof Error ? error.message : 'Failed to delete user');
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser) return;

    // Validate required fields
    if (!editFormData.first_name.trim() || !editFormData.last_name.trim()) {
      setModalError('First name and last name are required');
      return;
    }

    try {
      // Update user profile
      const { error: profileError } = await supabase.rpc('update_user_profile', {
        p_user_id: selectedUser.id,
        p_first_name: editFormData.first_name.trim(),
        p_last_name: editFormData.last_name.trim(),
        p_phone: editFormData.phone,
        p_gender: editFormData.gender
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

      setModalSuccess('User profile updated successfully');
      
      // Refresh both admin and user lists
      await Promise.all([
        fetchAdmins(),
        fetchAllUsers()
      ]);
      
      // Close the modal
      handleModalClose();
    } catch (error) {
      console.error('Error in handleEditSubmit:', error);
      setModalError(error instanceof Error ? error.message : 'Failed to update user profile');
    }
  };

  const handleModalClose = () => {
    setIsEditModalOpen(false);
    setSelectedUser(null);
    setModalSuccess(null); // Clear modal success message
    setModalError(null); // Clear modal error message
  };

  const handleDeleteClick = (user: UserRole) => {
    setUserToDelete(user);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!userToDelete) return;
    
    try {
      await handleDeleteUser(userToDelete);
      setIsDeleteModalOpen(false);
      setUserToDelete(null);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container>

      <TabContainer>
        <TabButton 
          $active={activeTab === 'users'} 
          onClick={() => setActiveTab('users')}
          $type="user"
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
       
      </TabContainer>

      {error && (
        <ErrorMessage>
          <FiAlertCircle />
          {error}
        </ErrorMessage>
      )}

      {success && (
        <SuccessMessage>
          <FiCheck />
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
            <FilterInput
              type="text"
              placeholder="Search ..."
              value={filterEmail}
              onChange={(e) => setFilterEmail(e.target.value)}
            />
            {isCurrentUserAdmin && (
              <Button onClick={handleAddAdmin}>
                <FiUserPlus />
                Add User
              </Button>
            )}
          </FilterContainer>
          {!isCurrentUserAdmin && (
            <InfoMessage>
              <FiInfo />
              You need admin privileges to manage user roles.
            </InfoMessage>
          )}
          <Table>
            <thead>
              <tr>
                <Th style={{ width: '50px' }}>#</Th>
                <Th 
                  style={{ width: '200px' }}
                  onClick={() => handleSort('name')}
                  $sortable
                >
                  Name
                  <SortIcon 
                    $active={showSortIcon && activeSortColumn === 'name'} 
                    $direction={sortDirection}
                  >
                    ↑
                  </SortIcon>
                </Th>
                <Th 
                  style={{ width: '300px' }}
                  onClick={() => handleSort('email')}
                  $sortable
                >
                  Email
                  <SortIcon 
                    $active={showSortIcon && activeSortColumn === 'email'} 
                    $direction={sortDirection}
                  >
                    ↑
                  </SortIcon>
                </Th>
                <Th style={{ width: '200px' }}>Status</Th>
                <Th 
                  style={{ width: '150px' }}
                  onClick={() => handleSort('last_sign_in')}
                  $sortable
                >
                  Last Activity
                  <SortIcon 
                    $active={showSortIcon && activeSortColumn === 'last_sign_in'} 
                    $direction={sortDirection}
                  >
                    ↑
                  </SortIcon>
                </Th>
                {isCurrentUserAdmin && <Th style={{ width: '120px' }}>Actions</Th>}
              </tr>
            </thead>
            <tbody>
              {sortAdmins(admins)
                .filter(admin => {
                  const searchTerm = filterEmail.toLowerCase();
                  const name = `${admin.first_name || ''} ${admin.last_name || ''}`.trim().toLowerCase();
                  const email = admin.email.toLowerCase();
                  const role = 'admin';
                  
                  return name.includes(searchTerm) || 
                         email.includes(searchTerm) || 
                         role.includes(searchTerm);
                })
                .map((admin, index) => (
                  <tr key={admin.id}>
                    <Td style={{ width: '50px' }}>{index + 1}</Td>
                    <Td style={{ width: '200px' }}>
                      {`${admin.first_name || ''} ${admin.last_name || ''}`.trim() || '-'}
                    </Td>
                    <Td style={{ width: '300px' }}>{admin.email}</Td>
                    <Td style={{ width: '200px' }}>
                      <StatusBadge $status={admin.status}>
                        {admin.status === 'active' ? 'Active' : 'Pending'}
                      </StatusBadge>
                    </Td>
                    <Td style={{ width: '150px' }}>
                      {admin.last_sign_in 
                        ? new Date(admin.last_sign_in).toLocaleDateString()
                        : <StatusBadge $status="not-confirmed">Not Confirmed</StatusBadge>
                      }
                    </Td>
                    {isCurrentUserAdmin && (
                      <Td style={{ width: '120px' }}>
                        <ActionGroup>
                          <ActionButton onClick={() => handleEditAdmin(admin)}>
                            <FiEdit2 size={18} />
                          </ActionButton>
                          <ActionButton 
                            $variant="danger"
                            onClick={() => {
                              setUserToDelete(admin);
                              setIsDeleteModalOpen(true);
                            }}
                          >
                            <FiTrash2 size={18} />
                          </ActionButton>
                        </ActionGroup>
                      </Td>
                    )}
                  </tr>
                ))}
            </tbody>
          </Table>
        </>
      ) : activeTab === 'moderators' ? (
        <>
          <FilterContainer>
            <FilterInput
              type="text"
              placeholder="Search ..."
              value={filterEmail}
              onChange={(e) => setFilterEmail(e.target.value)}
            />
            {isCurrentUserAdmin && (
              <Button onClick={handleAddAdmin}>
                <FiUserPlus />
                Add User
              </Button>
            )}
          </FilterContainer>
          {!isCurrentUserAdmin && (
            <InfoMessage>
              <FiInfo />
              You need admin privileges to manage user roles.
            </InfoMessage>
          )}
          <Table>
            <thead>
              <tr>
                <Th style={{ width: '50px' }}>#</Th>
                <Th 
                  style={{ width: '200px' }}
                  onClick={() => handleSort('name')}
                  $sortable
                >
                  Name
                  <SortIcon 
                    $active={showSortIcon && activeSortColumn === 'name'} 
                    $direction={sortDirection}
                  >
                    ↑
                  </SortIcon>
                </Th>
                <Th 
                  style={{ width: '300px' }}
                  onClick={() => handleSort('email')}
                  $sortable
                >
                  Email
                  <SortIcon 
                    $active={showSortIcon && activeSortColumn === 'email'} 
                    $direction={sortDirection}
                  >
                    ↑
                  </SortIcon>
                </Th>
                <Th 
                  style={{ width: '200px' }}
                  onClick={() => handleSort('roles')}
                  $sortable
                >
                  Role
                  <SortIcon 
                    $active={showSortIcon && activeSortColumn === 'roles'} 
                    $direction={sortDirection}
                  >
                    ↑
                  </SortIcon>
                </Th>
                <Th 
                  style={{ width: '150px' }}
                  onClick={() => handleSort('last_sign_in')}
                  $sortable
                >
                  Last Account Activity
                  <SortIcon 
                    $active={showSortIcon && activeSortColumn === 'last_sign_in'} 
                    $direction={sortDirection}
                  >
                    ↑
                  </SortIcon>
                </Th>
                {isCurrentUserAdmin && <Th style={{ width: '120px' }}>Actions</Th>}
              </tr>
            </thead>
            <tbody>
              {allUsers
                .filter(user => {
                  const searchTerm = filterEmail.toLowerCase();
                  const name = `${user.first_name || ''} ${user.last_name || ''}`.trim().toLowerCase();
                  const email = user.email.toLowerCase();
                  const roles = user.roles.join(' ').toLowerCase();
                  
                  return (user.roles.includes('moderator') &&
                         (name.includes(searchTerm) || 
                          email.includes(searchTerm) || 
                          roles.includes(searchTerm)));
                })
                .sort((a, b) => {
                  const direction = sortDirection === 'asc' ? 1 : -1;
                  switch (sortField) {
                    case 'email':
                      return direction * a.email.localeCompare(b.email);
                    case 'name':
                      const nameA = `${a.first_name || ''} ${a.last_name || ''}`.trim();
                      const nameB = `${b.first_name || ''} ${b.last_name || ''}`.trim();
                      return direction * nameA.localeCompare(nameB);
                    case 'roles':
                      return direction * a.roles.join(',').localeCompare(b.roles.join(','));
                    case 'last_sign_in':
                      const dateA = a.last_sign_in ? new Date(a.last_sign_in).getTime() : 0;
                      const dateB = b.last_sign_in ? new Date(b.last_sign_in).getTime() : 0;
                      return direction * (dateA - dateB);
                    default:
                      return 0;
                  }
                })
                .map((user: UserRole, index: number) => (
                  <tr key={user.id}>
                    <Td style={{ width: '50px' }}>{index + 1}</Td>
                    <Td style={{ width: '200px' }}>
                      {`${user.first_name || ''} ${user.last_name || ''}`.trim() || '-'}
                    </Td>
                    <Td style={{ width: '300px' }}>{user.email}</Td>
                    <Td style={{ width: '200px' }}>
                      <RoleBadges>
                        {user.roles.map((role: string) => (
                          <RoleBadge key={role} $role={role}>
                            {role}
                          </RoleBadge>
                        ))}
                      </RoleBadges>
                    </Td>
                    <Td style={{ width: '150px' }}>
                      {user.last_sign_in 
                        ? new Date(user.last_sign_in).toLocaleDateString()
                        : <StatusBadge $status="not-confirmed">Not Confirmed</StatusBadge>
                      }
                    </Td>
                    {isCurrentUserAdmin && (
                      <Td style={{ width: '120px' }}>
                        <ActionGroup>
                          <ActionButton 
                            onClick={() => handleEditUser(user)}
                            title="Update Info"
                          >
                            <FiEdit2 size={18} />
                          </ActionButton>
                          {isConfirmingDelete === user.id ? (
                            <>
                              <ActionButton 
                                $variant="success"
                                onClick={() => handleDeleteUser(user as UserToDelete)}
                              >
                                <FiCheck size={18} />
                              </ActionButton>
                              <ActionButton 
                                onClick={() => setIsConfirmingDelete(null)}
                              >
                                <FiX size={18} />
                              </ActionButton>
                            </>
                          ) : (
                            <ActionButton 
                              $variant="danger"
                              onClick={() => {
                                setUserToDelete(user as UserToDelete);
                                setIsDeleteModalOpen(true);
                              }}
                            >
                              <FiTrash2 size={18} />
                            </ActionButton>
                          )}
                        </ActionGroup>
                      </Td>
                    )}
                  </tr>
                ))}
            </tbody>
          </Table>
        </>
      ) : (
        <>
          <FilterContainer>
            <FilterInput
              type="text"
              placeholder="Search ..."
              value={filterEmail}
              onChange={(e) => setFilterEmail(e.target.value)}
            />
            {isCurrentUserAdmin && (
              <Button onClick={handleAddAdmin}>
                <FiUserPlus />
                Add User
              </Button>
            )}
          </FilterContainer>
          {!isCurrentUserAdmin && (
            <InfoMessage>
              <FiInfo />
              You need admin privileges to manage user roles.
            </InfoMessage>
          )}
          <Table>
            <thead>
              <tr>
                <Th style={{ width: '50px' }}>#</Th>
                <Th 
                  style={{ width: '200px' }}
                  onClick={() => handleSort('name')}
                  $sortable
                >
                  Name
                  <SortIcon 
                    $active={showSortIcon && activeSortColumn === 'name'} 
                    $direction={sortDirection}
                  >
                    ↑
                  </SortIcon>
                </Th>
                <Th 
                  style={{ width: '300px' }}
                  onClick={() => handleSort('email')}
                  $sortable
                >
                  Email
                  <SortIcon 
                    $active={showSortIcon && activeSortColumn === 'email'} 
                    $direction={sortDirection}
                  >
                    ↑
                  </SortIcon>
                </Th>
                <Th 
                  style={{ width: '200px' }}
                  onClick={() => handleSort('roles')}
                  $sortable
                >
                  Role
                  <SortIcon 
                    $active={showSortIcon && activeSortColumn === 'roles'} 
                    $direction={sortDirection}
                  >
                    ↑
                  </SortIcon>
                </Th>
                <Th 
                  style={{ width: '150px' }}
                  onClick={() => handleSort('last_sign_in')}
                  $sortable
                >
                  Last Account Activity
                  <SortIcon 
                    $active={showSortIcon && activeSortColumn === 'last_sign_in'} 
                    $direction={sortDirection}
                  >
                    ↑
                  </SortIcon>
                </Th>
                {isCurrentUserAdmin && <Th style={{ width: '120px' }}>Actions</Th>}
              </tr>
            </thead>
            <tbody>
              {allUsers
                .filter(user => {
                  const searchTerm = filterEmail.toLowerCase();
                  const name = `${user.first_name || ''} ${user.last_name || ''}`.trim().toLowerCase();
                  const email = user.email.toLowerCase();
                  const roles = user.roles.join(' ').toLowerCase();
                  
                  return name.includes(searchTerm) || 
                         email.includes(searchTerm) || 
                         roles.includes(searchTerm);
                })
                .sort((a, b) => {
                  const direction = sortDirection === 'asc' ? 1 : -1;
                  switch (sortField) {
                    case 'email':
                      return direction * a.email.localeCompare(b.email);
                    case 'name':
                      const nameA = `${a.first_name || ''} ${a.last_name || ''}`.trim();
                      const nameB = `${b.first_name || ''} ${b.last_name || ''}`.trim();
                      return direction * nameA.localeCompare(nameB);
                    case 'roles':
                      return direction * a.roles.join(',').localeCompare(b.roles.join(','));
                    case 'last_sign_in':
                      const dateA = a.last_sign_in ? new Date(a.last_sign_in).getTime() : 0;
                      const dateB = b.last_sign_in ? new Date(b.last_sign_in).getTime() : 0;
                      return direction * (dateA - dateB);
                    default:
                      return 0;
                  }
                })
                .map((user: UserRole, index: number) => (
                  <tr key={user.id}>
                    <Td style={{ width: '50px' }}>{index + 1}</Td>
                    <Td style={{ width: '200px' }}>
                      {`${user.first_name || ''} ${user.last_name || ''}`.trim() || '-'}
                    </Td>
                    <Td style={{ width: '300px' }}>{user.email}</Td>
                    <Td style={{ width: '200px' }}>
                      <RoleBadges>
                        {user.roles.map((role: string) => (
                          <RoleBadge key={role} $role={role}>
                            {role}
                          </RoleBadge>
                        ))}
                      </RoleBadges>
                    </Td>
                    <Td style={{ width: '150px' }}>
                      {user.last_sign_in 
                        ? new Date(user.last_sign_in).toLocaleDateString()
                        : <StatusBadge $status="not-confirmed">Not Confirmed</StatusBadge>
                      }
                    </Td>
                    {isCurrentUserAdmin && (
                      <Td style={{ width: '120px' }}>
                        <ActionGroup>
                          <ActionButton 
                            onClick={() => handleEditUser(user)}
                            title="Update Info"
                          >
                            <FiEdit2 size={18} />
                          </ActionButton>
                          {isConfirmingDelete === user.id ? (
                            <>
                              <ActionButton 
                                $variant="success"
                                onClick={() => handleDeleteUser(user as UserToDelete)}
                              >
                                <FiCheck size={18} />
                              </ActionButton>
                              <ActionButton 
                                onClick={() => setIsConfirmingDelete(null)}
                              >
                                <FiX size={18} />
                              </ActionButton>
                            </>
                          ) : (
                            <ActionButton 
                              $variant="danger"
                              onClick={() => {
                                setUserToDelete(user as UserToDelete);
                                setIsDeleteModalOpen(true);
                              }}
                            >
                              <FiTrash2 size={18} />
                            </ActionButton>
                          )}
                        </ActionGroup>
                      </Td>
                    )}
                  </tr>
                ))}
            </tbody>
          </Table>
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
            }}>
              <FiX size={20} />
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
                  pattern="[A-Za-z ]+"
                  value={formData.first_name}
                  onChange={(e) => {
                    if (e.target.validity.valid) {
                      setFormData({ ...formData, first_name: e.target.value });
                    }
                  }}
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
                  pattern="[A-Za-z ]+"
                  value={formData.last_name}
                  onChange={(e) => {
                    if (e.target.validity.valid) {
                      setFormData({ ...formData, last_name: e.target.value });
                    }
                  }}
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
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                disabled={isSubmitting || rateLimitCountdown !== null}
                placeholder="your@email.com"
              />
            </FormGroup>

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
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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
            
            {modalError && (
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

            {modalSuccess && (
              <SuccessMessage>
                <FiCheck />
                {modalSuccess}
              </SuccessMessage>
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
                }}
                disabled={isSubmitting}
              >
                Cancel
              </CancelButton>
              <SaveButton 
                type="submit"
                disabled={!isFormValid() || isSubmitting || rateLimitCountdown !== null}
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
              <FiX size={20} />
            </CloseButton>
          </ModalHeader>

          <Form onSubmit={handleEditSubmit}>
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
                <Label htmlFor="edit-first-name">
                  First Name
                  <RequiredAsterisk>*</RequiredAsterisk>
                </Label>
                <Input
                  id="edit-first-name"
                  type="text"
                  pattern="[A-Za-z ]+"
                  value={editFormData.first_name}
                  onChange={(e) => {
                    if (e.target.validity.valid) {
                      setEditFormData({ ...editFormData, first_name: e.target.value });
                    }
                  }}
                  required
                  placeholder="Enter first name"
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
                  pattern="[A-Za-z ]+"
                  value={editFormData.last_name}
                  onChange={(e) => {
                    if (e.target.validity.valid) {
                      setEditFormData({ ...editFormData, last_name: e.target.value });
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
              <Label htmlFor="edit-role">
                Role
                <RequiredAsterisk>*</RequiredAsterisk>
              </Label>
              <RoleSelectContainer>
                <RoleSelect
                  id="edit-role"
                  value={editFormData.role}
                  onChange={(e) => setEditFormData({ ...editFormData, role: e.target.value as 'admin' | 'moderator' | 'user' })}
                  required
                >
                  <option value="">Select role</option>
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                  <option value="moderator">Moderator</option>
                </RoleSelect>
                <RoleIcon>
                  {editFormData.role === 'admin' ? <FiShield size={18} /> : 
                   editFormData.role === 'moderator' ? <FiUserCheck size={18} /> : 
                   <FiUser size={18} />}
                </RoleIcon>
              </RoleSelectContainer>
            </FormGroup>

            {modalError && (
              <ErrorMessage>
                <FiAlertCircle />
                {modalError}
              </ErrorMessage>
            )}

            {modalSuccess && (
              <SuccessMessage>
                <FiCheck />
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
                disabled={!editFormData.first_name.trim() || !editFormData.last_name.trim() || !editFormData.role}
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
              <FiX size={20} />
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
        <Modal $isOpen={isDeleteModalOpen}>
          <ModalContent style={{ maxWidth: '400px', textAlign: 'center', padding: '8px 32px 32px' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#111827', marginBottom: '0px' }}>
              Delete User
            </h3>
            {successMessage ? (
              <div style={{ padding: '16px 0' }}>
                <p style={{ 
                  color: '#059669', 
                  fontSize: '1rem',
                  fontWeight: 500,
                  margin: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}>
                  <FiCheck size={20} />
                  {successMessage}
                </p>
              </div>
            ) : (
              <>
                <p style={{ color: '#4B5563', marginBottom: '24px' }}>
                  Are you sure you want to delete {userToDelete.email}? This action cannot be undone.
                </p>
                {errorMessage && (
                  <p style={{ color: '#DC2626', marginBottom: '16px' }}>
                    {errorMessage}
                  </p>
                )}
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                  <CancelButton 
                    onClick={() => {
                      setIsDeleteModalOpen(false);
                      setUserToDelete(null);
                      setErrorMessage('');
                    }}
                  >
                    Cancel
                  </CancelButton>
                  <DeleteButton 
                    onClick={async () => {
                      try {
                        if ('roles' in userToDelete) {
                          await handleDeleteUser(userToDelete);
                        } else {
                          await handleDeleteAdmin(userToDelete.id);
                        }
                      } catch (error) {
                        console.error('Error deleting user:', error);
                      }
                    }}
                  >
                    Delete
                  </DeleteButton>
                </div>
              </>
            )}
          </ModalContent>
        </Modal>
      )}
    </Container>
  );
};

const TabContainer = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  padding-bottom: 8px;
`;

const TabButton = styled.button<{ $active: boolean; $type?: 'admin' | 'moderator' | 'user' }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  border: none;
  border-radius: 9999px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
  min-width: 120px;
  background-color: ${props => {
    if (props.$active) {
      switch (props.$type) {
        case 'admin':
          return '#DBEAFE';
        case 'moderator':
          return '#F0FDF4';
        case 'user':
          return '#E5E7EB';
        default:
          return '#F3F4F6';
      }
    } else {
      switch (props.$type) {
        case 'admin':
          return '#DBEAFE';
        case 'moderator':
          return '#F0FDF4';
        case 'user':
          return '#E5E7EB';
        default:
          return '#F3F4F6';
      }
    }
  }};
  color: ${props => {
    if (props.$active) {
      switch (props.$type) {
        case 'admin':
          return '#1E40AF';
        case 'moderator':
          return '#166534';
        case 'user':
          return '#374151';
        default:
          return '#6B7280';
      }
    } else {
      switch (props.$type) {
        case 'admin':
          return '#1E40AF';
        case 'moderator':
          return '#166534';
        case 'user':
          return '#374151';
        default:
          return '#6B7280';
      }
    }
  }};

  &:hover {
    opacity: 0.9;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${props => {
      switch (props.$type) {
        case 'admin':
          return '#1E40AF';
        case 'moderator':
          return '#166534';
        case 'user':
          return '#374151';
        default:
          return '#6B7280';
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
  padding: 4px 8px;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  background-color: ${props => {
    switch (props.$role) {
      case 'admin':
        return '#DBEAFE';
      case 'moderator':
        return '#F0FDF4';
      case 'user':
        return '#E5E7EB';
      default:
        return '#F3E8FF';
    }
  }};
  color: ${props => {
    switch (props.$role) {
      case 'admin':
        return '#1E40AF';
      case 'moderator':
        return '#166534';
      case 'user':
        return '#374151';
      default:
        return '#6B21A8';
    }
  }};
  text-transform: capitalize;
  display: inline-block;
  line-height: 1;
  min-width: 60px;
  text-align: center;
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

export default AdminManagementTab; 