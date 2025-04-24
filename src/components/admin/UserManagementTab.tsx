import React, { useState } from 'react';
import styled from 'styled-components';
import { FaSearch, FaPlus, FaTimes, FaTrophy, FaEye, FaUser, FaKey, FaBan, FaBookOpen, FaFilePdf, FaFileAlt, FaMedal } from 'react-icons/fa';

const Container = styled.div`
  padding: 1.5rem;
`;

const FiltersContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
`;

const FilterGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const SearchInput = styled.div`
  position: relative;
  width: 16rem;

  input {
    width: 100%;
    padding: 0.5rem 1rem 0.5rem 2.5rem;
    border: 1px solid #E5E7EB;
    border-radius: 0.5rem;
  }

  svg {
    position: absolute;
    left: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    color: rgba(15, 23, 42, 0.4);
  }
`;

const Select = styled.select`
  padding: 0.5rem 1rem;
  border: 1px solid #E5E7EB;
  border-radius: 0.5rem;
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
`;

const Table = styled.table`
  width: 100%;
`;

const TableHead = styled.thead`
  background-color: #F9FAFB;
  border-bottom: 1px solid #E5E7EB;
`;

const TableHeader = styled.th`
  padding: 1rem 1.5rem;
  text-align: left;
  font-size: 0.875rem;
  font-weight: 600;
  color: #0F172A;
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

const TableCell = styled.td`
  padding: 1rem 1.5rem;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const Avatar = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
`;

const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserName = styled.div`
  font-weight: 500;
  color: #0F172A;
`;

const UserEmail = styled.div`
  font-size: 0.875rem;
  color: rgba(15, 23, 42, 0.7);
`;

const Tag = styled.span<{ $color: string }>`
  padding: 0.25rem 0.5rem;
  background-color: ${props => `${props.$color}10`};
  color: ${props => props.$color};
  border-radius: 9999px;
  font-size: 0.875rem;
`;

const ActionButton = styled.button<{ $color?: string }>`
  color: rgba(15, 23, 42, 0.7);
  padding: 0.25rem;
  border-radius: 0.25rem;
  transition: all 0.2s;

  &:hover {
    color: ${props => props.$color || '#0F172A'};
  }
`;

const Modal = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${props => props.$isOpen ? 'block' : 'none'};
`;

const ModalContent = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 600px;
  background-color: white;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
`;

const ModalHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid #E5E7EB;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ModalTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 700;
  color: #0F172A;
`;

const CloseButton = styled.button`
  color: rgba(15, 23, 42, 0.4);
  &:hover {
    color: #0F172A;
  }
`;

const ModalBody = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  overflow-y: auto;
  height: calc(100vh - 80px);
`;

const ProfileCard = styled.div`
  background-color: #F9FAFB;
  border-radius: 0.75rem;
  padding: 1.5rem;
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ProfileAvatar = styled.img`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
`;

const ProfileDetails = styled.div`
  h3 {
    font-size: 1.25rem;
    font-weight: 700;
    color: #0F172A;
  }
  p {
    color: rgba(15, 23, 42, 0.7);
  }
`;

const LevelInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const LevelText = styled.span`
  color: #00E915;
  font-weight: 500;
`;

const MedalContainer = styled.div`
  display: flex;
  gap: 0.25rem;
`;

const Card = styled.div`
  background-color: white;
  border-radius: 0.75rem;
  border: 1px solid #E5E7EB;
  padding: 1.5rem;
`;

const CardTitle = styled.h4`
  font-size: 1.125rem;
  font-weight: 600;
  color: #0F172A;
  margin-bottom: 1rem;
`;

const ActivityItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 0;
`;

const ActivityContent = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const ActivityIcon = styled.div<{ $color: string }>`
  color: ${props => props.$color};
`;

const ActivityText = styled.div`
  p {
    color: #0F172A;
  }
  span {
    font-size: 0.875rem;
    color: rgba(15, 23, 42, 0.7);
  }
`;

const ActivityTime = styled.span`
  font-size: 0.875rem;
  color: rgba(15, 23, 42, 0.7);
`;

const ResourceItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 0;
`;

const ResourceContent = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const ResourceIcon = styled.div<{ $color: string }>`
  color: ${props => props.$color};
`;

const ResourceName = styled.span`
  color: #0F172A;
`;

const ResourceTime = styled.span`
  font-size: 0.875rem;
  color: rgba(15, 23, 42, 0.7);
`;

const UserManagementTab: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Container>
      <FiltersContainer>
        <FilterGroup>
          <SearchInput>
            <FaSearch />
            <input type="text" placeholder="Search users..." />
          </SearchInput>
          <Select>
            <option>All Plans</option>
            <option>Free</option>
            <option>Pro</option>
            <option>Enterprise</option>
          </Select>
          <Select>
            <option>Activity Level</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </Select>
          <Select>
            <option>Progress Status</option>
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </Select>
        </FilterGroup>
        <Button $primary>
          <FaPlus />
          Create User
        </Button>
      </FiltersContainer>

      <TableContainer>
        <Table>
          <TableHead>
            <tr>
              <TableHeader>User</TableHeader>
              <TableHeader>Signup Date</TableHeader>
              <TableHeader>XP Level</TableHeader>
              <TableHeader>Plan Type</TableHeader>
              <TableHeader>Status</TableHeader>
              <TableHeader style={{ textAlign: 'right' }}>Actions</TableHeader>
            </tr>
          </TableHead>
          <TableBody>
            <tr>
              <TableCell>
                <UserInfo>
                  <Avatar src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg" alt="User" />
                  <UserDetails>
                    <UserName>Alex Johnson</UserName>
                    <UserEmail>alex.j@example.com</UserEmail>
                  </UserDetails>
                </UserInfo>
              </TableCell>
              <TableCell>
                <UserEmail>Jan 15, 2025</UserEmail>
              </TableCell>
              <TableCell>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ color: '#00E915', fontWeight: 500, marginRight: '0.5rem' }}>2,450 XP</span>
                  <FaTrophy style={{ color: '#00E915' }} />
                </div>
              </TableCell>
              <TableCell>
                <Tag $color="#3B82F6">Pro</Tag>
              </TableCell>
              <TableCell>
                <Tag $color="#00E915">Active</Tag>
              </TableCell>
              <TableCell>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.75rem' }}>
                  <ActionButton onClick={() => setIsModalOpen(true)} title="View Details">
                    <FaEye />
                  </ActionButton>
                  <ActionButton $color="#3B82F6" title="Impersonate">
                    <FaUser />
                  </ActionButton>
                  <ActionButton $color="#EC297B" title="Reset Password">
                    <FaKey />
                  </ActionButton>
                  <ActionButton $color="#EC297B" title="Ban User">
                    <FaBan />
                  </ActionButton>
                </div>
              </TableCell>
            </tr>
          </TableBody>
        </Table>
      </TableContainer>

      <Modal $isOpen={isModalOpen}>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>User Details</ModalTitle>
            <CloseButton onClick={() => setIsModalOpen(false)}>
              <FaTimes />
            </CloseButton>
          </ModalHeader>

          <ModalBody>
            <ProfileCard>
              <ProfileHeader>
                <ProfileAvatar src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg" alt="User" />
                <ProfileDetails>
                  <h3>Alex Johnson</h3>
                  <p>alex.j@example.com</p>
                  <LevelInfo>
                    <LevelText>Level 12</LevelText>
                    <MedalContainer>
                      <FaMedal style={{ color: '#00E915' }} />
                      <FaMedal style={{ color: '#00E915' }} />
                      <FaMedal style={{ color: '#00E915' }} />
                    </MedalContainer>
                  </LevelInfo>
                </ProfileDetails>
              </ProfileHeader>
            </ProfileCard>

            <Card>
              <CardTitle>Recent Activity</CardTitle>
              <ActivityItem>
                <ActivityContent>
                  <ActivityIcon $color="#3B82F6">
                    <FaBookOpen />
                  </ActivityIcon>
                  <ActivityText>
                    <p>Completed "Advanced Role Design"</p>
                    <span>Course Progress: 85%</span>
                  </ActivityText>
                </ActivityContent>
                <ActivityTime>2 hours ago</ActivityTime>
              </ActivityItem>
            </Card>

            <Card>
              <CardTitle>Resources Downloaded</CardTitle>
              <ResourceItem>
                <ResourceContent>
                  <ResourceIcon $color="#EC297B">
                    <FaFilePdf />
                  </ResourceIcon>
                  <ResourceName>Role Blueprint Template</ResourceName>
                </ResourceContent>
                <ResourceTime>Yesterday</ResourceTime>
              </ResourceItem>
            </Card>

            <Card>
              <CardTitle>Generated Quotes & Roles</CardTitle>
              <ResourceItem>
                <ResourceContent>
                  <ResourceIcon $color="#3B82F6">
                    <FaFileAlt />
                  </ResourceIcon>
                  <ResourceName>Senior Product Manager Role</ResourceName>
                </ResourceContent>
                <ResourceTime>3 days ago</ResourceTime>
              </ResourceItem>
            </Card>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default UserManagementTab; 