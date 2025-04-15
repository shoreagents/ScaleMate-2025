import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { supabase } from '@/lib/supabase';
import { FiUserPlus, FiTrash2, FiEdit2, FiCheck, FiX, FiAlertCircle } from 'react-icons/fi';

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
  border-collapse: collapse;
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const Th = styled.th`
  padding: 12px 16px;
  text-align: left;
  background-color: #F9FAFB;
  color: #4B5563;
  font-weight: 500;
  border-bottom: 1px solid #E5E7EB;
`;

const Td = styled.td`
  padding: 12px 16px;
  color: #111827;
  border-bottom: 1px solid #E5E7EB;
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

const StatusBadge = styled.span<{ $status: 'active' | 'pending' }>`
  padding: 4px 8px;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
  background-color: ${props => props.$status === 'active' ? '#D1FAE5' : '#FEF3C7'};
  color: ${props => props.$status === 'active' ? '#059669' : '#D97706'};
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
  padding: 24px;
  border-radius: 8px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
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

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
`;

const Input = styled.input`
  padding: 8px 12px;
  border: 1px solid #D1D5DB;
  border-radius: 6px;
  font-size: 0.875rem;

  &:focus {
    outline: none;
    border-color: #3B82F6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
  }
`;

const Select = styled.select`
  padding: 8px 12px;
  border: 1px solid #D1D5DB;
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
`;

const SuccessMessage = styled.div`
  color: #059669;
  font-size: 0.875rem;
  margin-top: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

interface UserData {
  email: string;
  last_sign_in_at: string | null;
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
}

interface AdminFormData {
  email: string;
  password: string;
}

interface UserRole {
  id: string;
  email: string;
  roles: string[];
  created_at: string;
  last_sign_in: string | null | undefined;
}

const AdminManagementTab: React.FC = () => {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [allUsers, setAllUsers] = useState<UserRole[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState<Admin | null>(null);
  const [formData, setFormData] = useState<AdminFormData>({
    email: '',
    password: ''
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isConfirmingDelete, setIsConfirmingDelete] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'admins' | 'users'>('admins');

  useEffect(() => {
    fetchAdmins();
    fetchAllUsers();
  }, []);

  const fetchAllUsers = async () => {
    try {
      const { data: users, error: usersError } = await supabase
        .from('user_roles_view')
        .select('*')
        .order('created_at', { ascending: false });

      if (usersError) throw usersError;

      // Format the data to match UserRole interface
      const formattedUsers: UserRole[] = users.map(user => ({
        id: user.id,
        email: user.email || 'No email', // Add fallback for null email
        roles: user.roles || [],
        created_at: user.created_at,
        last_sign_in: user.last_sign_in_at || null
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

      // Get all users with their roles from the view
      const { data: users, error: usersError } = await supabase
        .from('user_roles_view')
        .select('*')
        .order('created_at', { ascending: false });

      if (usersError) {
        throw new Error('Database error: ' + usersError.message);
      }

      if (!users || users.length === 0) {
        setAdmins([]);
        return;
      }

      // Filter and format admin users
      const formattedAdmins = users
        .filter(user => user.roles.includes('admin'))
        .map(user => ({
          id: user.id,
          email: user.email || 'Unknown',
          status: 'active' as const,
          created_at: user.created_at,
          last_sign_in: user.last_sign_in_at || null
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
    setEditingAdmin(null);
    setFormData({ email: '', password: '' });
    setError(null);
    setSuccess(null);
    setIsModalOpen(true);
  };

  const handleEditAdmin = (admin: Admin) => {
    setEditingAdmin(admin);
    setFormData({
      email: admin.email,
      password: '' // Don't show existing password
    });
    setError(null);
    setSuccess(null);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      if (editingAdmin) {
        // For now, we can't update password since it's handled by Supabase Auth
        setSuccess('Admin details updated');
        setIsModalOpen(false);
        return;
      }

      // Create new admin
      let userId: string;

      // Try to create new user
      const { data: newUser, error: createError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (createError) {
        if (createError.message.includes('already registered')) {
          // User exists, try to sign in to get their ID
          const { data: { user }, error: signInError } = await supabase.auth.signInWithPassword({
            email: formData.email,
            password: formData.password,
          });
          
          if (signInError) {
            throw new Error('Error signing in: ' + signInError.message);
          }
          if (!user) {
            throw new Error('User not found');
          }
          userId = user.id;
        } else {
          throw new Error('Error creating user: ' + createError.message);
        }
      } else {
        if (!newUser.user) {
          throw new Error('Failed to create user');
        }
        userId = newUser.user.id;
      }

      // Add admin role
      const { error: roleError } = await supabase
        .from('user_roles')
        .insert({
          user_id: userId,
          role: 'admin',
          created_at: new Date().toISOString()
        });

      if (roleError) {
        if (roleError.code === '23505') { // Unique violation
          throw new Error('This user is already an admin');
        }
        throw new Error('Error adding admin role: ' + roleError.message);
      }

      setSuccess('Admin added successfully');
      await fetchAdmins();
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error managing admin:', error);
      setError(error instanceof Error ? error.message : 'Failed to manage admin. Please try again.');
    }
  };

  const handleDeleteAdmin = async (adminId: string) => {
    try {
      const { error } = await supabase
        .from('user_roles')
        .delete()
        .eq('user_id', adminId)
        .eq('role', 'admin');

      if (error) {
        throw new Error('Error removing admin role: ' + error.message);
      }

      setAdmins(admins.filter(admin => admin.id !== adminId));
      setIsConfirmingDelete(null);
      setSuccess('Admin removed successfully');
    } catch (error) {
      console.error('Error deleting admin:', error);
      setError(error instanceof Error ? error.message : 'Failed to delete admin');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Header>
        <Title>Admin Management</Title>
        <Button onClick={handleAddAdmin}>
          <FiUserPlus />
          Add Admin
        </Button>
      </Header>

      <TabContainer>
        <TabButton 
          $active={activeTab === 'admins'} 
          onClick={() => setActiveTab('admins')}
        >
          Admins
        </TabButton>
        <TabButton 
          $active={activeTab === 'users'} 
          onClick={() => setActiveTab('users')}
        >
          All Users
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

      {activeTab === 'admins' ? (
        <Table>
          <thead>
            <tr>
              <Th>Email</Th>
              <Th>Status</Th>
              <Th>Created</Th>
              <Th>Last Sign In</Th>
              <Th>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {admins.map(admin => (
              <tr key={admin.id}>
                <Td>{admin.email}</Td>
                <Td>
                  <StatusBadge $status={admin.status}>
                    {admin.status === 'active' ? 'Active' : 'Pending'}
                  </StatusBadge>
                </Td>
                <Td>{new Date(admin.created_at).toLocaleDateString()}</Td>
                <Td>
                  {admin.last_sign_in 
                    ? new Date(admin.last_sign_in).toLocaleDateString()
                    : 'Never'
                  }
                </Td>
                <Td>
                  <ActionGroup>
                    <ActionButton onClick={() => handleEditAdmin(admin)}>
                      <FiEdit2 size={18} />
                    </ActionButton>
                    {isConfirmingDelete === admin.id ? (
                      <>
                        <ActionButton 
                          $variant="success"
                          onClick={() => handleDeleteAdmin(admin.id)}
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
                        onClick={() => setIsConfirmingDelete(admin.id)}
                      >
                        <FiTrash2 size={18} />
                      </ActionButton>
                    )}
                  </ActionGroup>
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <Table>
          <thead>
            <tr>
              <Th>Email</Th>
              <Th>Roles</Th>
              <Th>Created</Th>
              <Th>Last Sign In</Th>
            </tr>
          </thead>
          <tbody>
            {allUsers.map(user => (
              <tr key={user.id}>
                <Td>{user.email}</Td>
                <Td>
                  <RoleBadges>
                    {user.roles.map(role => (
                      <RoleBadge key={role} $role={role}>
                        {role}
                      </RoleBadge>
                    ))}
                  </RoleBadges>
                </Td>
                <Td>{new Date(user.created_at).toLocaleDateString()}</Td>
                <Td>
                  {user.last_sign_in 
                    ? new Date(user.last_sign_in).toLocaleDateString()
                    : 'Never'
                  }
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <Modal $isOpen={isModalOpen}>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>
              {editingAdmin ? 'Edit Admin' : 'Add New Admin'}
            </ModalTitle>
            <CloseButton onClick={() => setIsModalOpen(false)}>
              <FiX size={20} />
            </CloseButton>
          </ModalHeader>

          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                disabled={!!editingAdmin}
                required
                placeholder="your@email.com"
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required={!editingAdmin}
                placeholder={editingAdmin ? "Leave blank to keep current password" : ""}
              />
            </FormGroup>

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

            <Button type="submit">
              {editingAdmin ? 'Update Admin' : 'Add Admin'}
            </Button>
          </Form>
        </ModalContent>
      </Modal>
    </Container>
  );
};

const TabContainer = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  border-bottom: 1px solid #E5E7EB;
  padding-bottom: 8px;
`;

const TabButton = styled.button<{ $active: boolean }>`
  padding: 8px 16px;
  background: none;
  border: none;
  color: ${props => props.$active ? '#3B82F6' : '#6B7280'};
  font-weight: ${props => props.$active ? '600' : '500'};
  cursor: pointer;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    bottom: -9px;
    left: 0;
    right: 0;
    height: 2px;
    background-color: ${props => props.$active ? '#3B82F6' : 'transparent'};
  }

  &:hover {
    color: ${props => props.$active ? '#3B82F6' : '#4B5563'};
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
      case 'user':
        return '#374151';
      default:
        return '#6B21A8';
    }
  }};
`;

export default AdminManagementTab; 