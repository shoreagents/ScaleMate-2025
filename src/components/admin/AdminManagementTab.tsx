import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { supabase } from '@/lib/supabase';
import { FiUserPlus, FiTrash2, FiEdit2, FiCheck, FiX } from 'react-icons/fi';

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

interface Admin {
  id: string;
  email: string;
  status: 'active' | 'pending';
  created_at: string;
  last_sign_in: string | null;
}

const AdminManagementTab: React.FC = () => {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('*, users:user_id(*)')
        .eq('role', 'admin');

      if (error) throw error;

      const formattedAdmins = data.map(admin => ({
        id: admin.user_id,
        email: admin.users.email,
        status: admin.status || 'active',
        created_at: admin.created_at,
        last_sign_in: admin.users.last_sign_in_at
      }));

      setAdmins(formattedAdmins);
    } catch (error) {
      console.error('Error fetching admins:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddAdmin = async () => {
    // Implement admin addition logic
    console.log('Add admin clicked');
  };

  const handleEditAdmin = async (adminId: string) => {
    // Implement admin edit logic
    console.log('Edit admin:', adminId);
  };

  const handleDeleteAdmin = async (adminId: string) => {
    // Implement admin deletion logic
    console.log('Delete admin:', adminId);
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
                  <ActionButton onClick={() => handleEditAdmin(admin.id)}>
                    <FiEdit2 size={18} />
                  </ActionButton>
                  <ActionButton 
                    $variant="danger"
                    onClick={() => handleDeleteAdmin(admin.id)}
                  >
                    <FiTrash2 size={18} />
                  </ActionButton>
                </ActionGroup>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default AdminManagementTab; 