import React, { useState } from 'react';
import styled from 'styled-components';

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: ${props => props.theme.spacing.md};
`;

const Th = styled.th`
  text-align: left;
  padding: ${props => props.theme.spacing.sm};
  border-bottom: 2px solid ${props => props.theme.colors.border};
  color: ${props => props.theme.colors.text.secondary};
  font-weight: 600;
`;

const Td = styled.td`
  padding: ${props => props.theme.spacing.sm};
  border-bottom: 1px solid ${props => props.theme.colors.border};
`;

const Tr = styled.tr`
  &:hover {
    background-color: ${props => props.theme.colors.background};
  }
`;

const ActionButton = styled.button`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border: none;
  border-radius: 4px;
  background-color: ${props => props.theme.colors.primary};
  color: white;
  cursor: pointer;
  font-size: 0.9rem;
  margin-right: ${props => props.theme.spacing.sm};

  &:hover {
    opacity: 0.9;
  }
`;

const SearchInput = styled.input`
  padding: ${props => props.theme.spacing.sm};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 4px;
  width: 100%;
  max-width: 300px;
  margin-bottom: ${props => props.theme.spacing.md};
`;

// Mock user data
const mockUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin', status: 'active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'user', status: 'active' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'user', status: 'inactive' },
];

export default function UserManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState(mockUsers);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <SearchInput
        type="text"
        placeholder="Search users..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <Table>
        <thead>
          <tr>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Role</Th>
            <Th>Status</Th>
            <Th>Actions</Th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <Tr key={user.id}>
              <Td>{user.name}</Td>
              <Td>{user.email}</Td>
              <Td>{user.role}</Td>
              <Td>{user.status}</Td>
              <Td>
                <ActionButton>Edit</ActionButton>
                <ActionButton>Delete</ActionButton>
              </Td>
            </Tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
} 