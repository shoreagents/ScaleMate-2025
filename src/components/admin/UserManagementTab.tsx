import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { 
  FaUserPlus, 
  FaFilter, 
  FaPen, 
  FaTrash 
} from 'react-icons/fa6';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text.primary};
`;

const Actions = styled.div`
  display: flex;
  gap: 1rem;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &.primary {
    background-color: #3B82F6;
    color: white;
    border: none;

    &:hover {
      background-color: #2563EB;
    }
  }

  &.secondary {
    background-color: white;
    color: #374151;
    border: 1px solid #E5E7EB;

    &:hover {
      background-color: #F9FAFB;
    }
  }
`;

const SearchBar = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 0.5rem 1rem;
  border: 1px solid #E5E7EB;
  border-radius: 0.5rem;
  font-size: 0.875rem;

  &:focus {
    outline: none;
    border-color: #3B82F6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const FilterButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: white;
  border: 1px solid #E5E7EB;
  border-radius: 0.5rem;
  color: #374151;
  font-size: 0.875rem;
  cursor: pointer;

  &:hover {
    background-color: #F9FAFB;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const Th = styled.th`
  text-align: left;
  padding: 1rem;
  background-color: #F9FAFB;
  font-weight: 500;
  color: #374151;
  border-bottom: 1px solid #E5E7EB;
`;

const Td = styled.td`
  padding: 1rem;
  border-bottom: 1px solid #E5E7EB;
  color: ${props => props.theme.colors.text.primary};
`;

const Tr = styled.tr`
  &:hover {
    background-color: #F9FAFB;
  }
`;

const StatusBadge = styled.span<{ $status: 'active' | 'inactive' }>`
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  background-color: ${props => props.$status === 'active' ? '#D1FAE5' : '#FEE2E2'};
  color: ${props => props.$status === 'active' ? '#059669' : '#DC2626'};
`;

const ActionButton = styled.button`
  padding: 0.25rem;
  background: none;
  border: none;
  color: #6B7280;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: ${props => props.theme.colors.text.primary};
  }

  &.delete:hover {
    color: #DC2626;
  }
`;

interface User {
  id: string;
  email: string;
  full_name: string;
  role: string;
  status: 'active' | 'inactive';
  created_at: string;
}

// Mock data
const mockUsers: User[] = [
  {
    id: '1',
    email: 'john.doe@example.com',
    full_name: 'John Doe',
    role: 'user',
    status: 'active',
    created_at: '2024-04-01'
  },
  {
    id: '2',
    email: 'jane.smith@example.com',
    full_name: 'Jane Smith',
    role: 'admin',
    status: 'active',
    created_at: '2024-03-28'
  },
  {
    id: '3',
    email: 'bob.johnson@example.com',
    full_name: 'Bob Johnson',
    role: 'moderator',
    status: 'inactive',
    created_at: '2024-03-25'
  },
  {
    id: '4',
    email: 'alice.brown@example.com',
    full_name: 'Alice Brown',
    role: 'user',
    status: 'active',
    created_at: '2024-03-20'
  },
  {
    id: '5',
    email: 'charlie.wilson@example.com',
    full_name: 'Charlie Wilson',
    role: 'user',
    status: 'active',
    created_at: '2024-03-15'
  }
];

const UserManagementTab: React.FC = () => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = users.filter(user =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.full_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteUser = (userId: string) => {
    if (!confirm('Are you sure you want to delete this user?')) return;

    // Simulate delete with client-side state update
      setUsers(users.filter(user => user.id !== userId));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Container>
      <Header>
        <Title>User Management</Title>
        <Actions>
          <Button className="primary">
            <FaUserPlus />
            Add User
          </Button>
        </Actions>
      </Header>

      <SearchBar>
        <SearchInput
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <FilterButton>
          <FaFilter />
          Filter
        </FilterButton>
      </SearchBar>

      <Table>
        <thead>
          <tr>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Role</Th>
            <Th>Status</Th>
            <Th>Created</Th>
            <Th>Actions</Th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <Tr key={user.id}>
              <Td>{user.full_name}</Td>
              <Td>{user.email}</Td>
              <Td>{user.role}</Td>
              <Td>
                <StatusBadge $status={user.status}>
                  {user.status}
                </StatusBadge>
              </Td>
              <Td>{user.created_at}</Td>
              <Td>
                <ActionButton>
                  <FaPen />
                </ActionButton>
                <ActionButton 
                  className="delete"
                  onClick={() => handleDeleteUser(user.id)}
                >
                  <FaTrash />
                </ActionButton>
              </Td>
            </Tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default UserManagementTab; 