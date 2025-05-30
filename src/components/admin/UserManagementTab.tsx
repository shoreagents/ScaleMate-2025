import React from 'react';
import styled from 'styled-components';
import { FaSearch, FaPlus, FaTrophy, FaEye, FaUser, FaKey, FaBan, FaTimes, FaBookOpen, FaFilePdf, FaFileAlt, FaMedal } from 'react-icons/fa';

const Container = styled.div`
  padding: 1.5rem;
`;

const FilterBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  gap: 1rem;
  flex-wrap: wrap;

  @media (max-width: 1088px) {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
  }
`;

const FilterGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;

  @media (max-width: 1088px) {
    flex-direction: column;
    align-items: stretch;
    width: 100%;
    gap: 1rem;
  }
`;

const SearchContainer = styled.div`
  position: relative;
  width: 16rem;
  min-width: 200px;
  @media (max-width: 1088px) {
    width: 100%;
    min-width: 0;
  }
`;

const StyledSearchInput = styled.input`
  width: 100%;
  padding: 0.5rem 1rem 0.5rem 2.5rem;
  border: 1px solid #E5E7EB;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  height: 2.5rem;
  color: #0F172A;
  background-color: white;
  box-sizing: border-box;
  &::placeholder {
    color: rgba(15, 23, 42, 0.4);
  }
`;

const SearchIcon = styled(FaSearch)`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(15, 23, 42, 0.4);
`;

const StyledSelect = styled.select`
  padding: 0.5rem 2rem 0.5rem 1rem;
  border: 1px solid #E5E7EB;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  color: #0F172A;
  background-color: white;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 1em;
  height: 2.5rem;
  box-sizing: border-box;
  min-width: 10rem;
  @media (max-width: 1088px) {
    width: 100%;
    min-width: 0;
  }
`;

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0 1rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
  justify-content: center;
  height: 2.5rem;
  box-sizing: border-box;
  background-color: #3B82F6;
  color: white;
  border: none;
  font-weight: 500;
  @media (max-width: 1088px) {
    width: 100%;
    margin-top: 0.5rem;
  }
  &:hover {
    background-color: #2563EB;
  }
`;

const TableContainer = styled.div`
  background-color: white;
  border-radius: 0.75rem;
  border: 1px solid #E5E7EB;
  overflow: hidden;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
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
  background-color: #F9FAFB;
  border-bottom: 1px solid #E5E7EB;

  &:last-child {
    text-align: right;
  }
`;

const TableBody = styled.tbody`
  & > tr:not(:last-child) {
    border-bottom: 1px solid #E5E7EB;
  }
`;

const TableRow = styled.tr`
  &:hover {
    background-color: #F9FAFB;
  }
`;

const TableCell = styled.td`
  padding: 1rem 1.5rem;
  color: #0F172A;

  &:last-child {
    text-align: right;
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const Avatar = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 9999px;
  object-fit: cover;
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

const XPBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #00E915;
  font-weight: 500;
`;

const PlanBadge = styled.span`
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  background-color: rgba(59, 130, 246, 0.1);
  color: #3B82F6;
`;

const StatusBadge = styled.span`
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  background-color: rgba(0, 233, 21, 0.1);
  color: #00E915;
`;

const ActionGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.75rem;
`;

const ActionButton = styled.button`
  padding: 0.5rem;
  color: rgba(15, 23, 42, 0.7);
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: #0F172A;
  }
`;

const Modal = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: none;
`;

const ModalContent = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 600px;
  background-color: white;
  box-shadow: -4px 0 6px -1px rgba(0, 0, 0, 0.1);
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
  font-weight: 600;
  color: #0F172A;
`;

const CloseButton = styled.button`
  color: rgba(15, 23, 42, 0.4);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  transition: color 0.2s;

  &:hover {
    color: #0F172A;
  }
`;

const ModalBody = styled.div`
  padding: 1.5rem;
  height: calc(100vh - 80px);
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
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
  border-radius: 9999px;
  object-fit: cover;
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const ProfileName = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #0F172A;
`;

const ProfileEmail = styled.p`
  color: rgba(15, 23, 42, 0.7);
`;

const LevelInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const LevelBadge = styled.span`
  color: #00E915;
  font-weight: 500;
`;

const MedalGroup = styled.div`
  display: flex;
  gap: 0.25rem;
`;

const SectionCard = styled.div`
  background-color: white;
  border: 1px solid #E5E7EB;
  border-radius: 0.75rem;
  padding: 1.5rem;
`;

const SectionTitle = styled.h4`
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
  border-bottom: 1px solid #E5E7EB;

  &:last-child {
    border-bottom: none;
  }
`;

const ActivityContent = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const ActivityIcon = styled.div`
  color: #3B82F6;
`;

const ActivityText = styled.div`
  display: flex;
  flex-direction: column;
`;

const ActivityTitle = styled.p`
  color: #0F172A;
`;

const ActivitySubtitle = styled.p`
  font-size: 0.875rem;
  color: rgba(15, 23, 42, 0.7);
`;

const ActivityTime = styled.span`
  font-size: 0.875rem;
  color: rgba(15, 23, 42, 0.7);
`;

const UserManagementTab: React.FC = () => {
  return (
    <Container>
      {/* Filters and Actions */}
      <FilterBar>
        <FilterGroup>
          <SearchContainer>
            <StyledSearchInput type="text" placeholder="Search users..." />
            <SearchIcon />
          </SearchContainer>
          <StyledSelect>
            <option>All Plans</option>
            <option>Free</option>
            <option>Pro</option>
            <option>Enterprise</option>
          </StyledSelect>
          <StyledSelect>
            <option>Activity Level</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </StyledSelect>
          <StyledSelect>
            <option>Progress Status</option>
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </StyledSelect>
        </FilterGroup>
        <StyledButton>
          <FaPlus />
          Create User
        </StyledButton>
      </FilterBar>

      {/* User Table */}
      <TableContainer>
        <Table>
          <TableHead>
            <tr>
              <TableHeader>User</TableHeader>
              <TableHeader>Signup Date</TableHeader>
              <TableHeader>XP Level</TableHeader>
              <TableHeader>Plan Type</TableHeader>
              <TableHeader>Status</TableHeader>
              <TableHeader>Actions</TableHeader>
            </tr>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>
                <UserInfo>
                  <Avatar src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg" alt="User" />
                  <UserDetails>
                    <UserName>Alex Johnson</UserName>
                    <UserEmail>alex.j@example.com</UserEmail>
                  </UserDetails>
                </UserInfo>
              </TableCell>
              <TableCell style={{ color: '#0F172A70' }}>Jan 15, 2025</TableCell>
              <TableCell>
                <XPBadge>
                  <span>2,450 XP</span>
                  <FaTrophy />
                </XPBadge>
              </TableCell>
              <TableCell>
                <PlanBadge>Pro</PlanBadge>
              </TableCell>
              <TableCell>
                <StatusBadge>Active</StatusBadge>
              </TableCell>
              <TableCell>
                <ActionGroup>
                  <ActionButton title="View Details">
                    <FaEye />
                  </ActionButton>
                  <ActionButton title="Impersonate">
                    <FaUser />
                  </ActionButton>
                  <ActionButton title="Reset Password">
                    <FaKey />
                  </ActionButton>
                  <ActionButton title="Ban User">
                    <FaBan />
                  </ActionButton>
                </ActionGroup>
              </TableCell>
            </TableRow>
            {/* More user rows... */}
          </TableBody>
        </Table>
      </TableContainer>

      {/* User Detail Modal (static, hidden by default) */}
      <Modal>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>User Details</ModalTitle>
            <CloseButton>
              <FaTimes />
            </CloseButton>
          </ModalHeader>
          <ModalBody>
            {/* User Profile */}
            <ProfileCard>
              <ProfileHeader>
                <ProfileAvatar src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg" alt="User" />
                <ProfileInfo>
                  <ProfileName>Alex Johnson</ProfileName>
                  <ProfileEmail>alex.j@example.com</ProfileEmail>
                  <LevelInfo>
                    <LevelBadge>Level 12</LevelBadge>
                    <MedalGroup>
                      <FaMedal />
                      <FaMedal />
                      <FaMedal />
                    </MedalGroup>
                  </LevelInfo>
                </ProfileInfo>
              </ProfileHeader>
            </ProfileCard>

            {/* Activity Log */}
            <SectionCard>
              <SectionTitle>Recent Activity</SectionTitle>
              <ActivityItem>
                <ActivityContent>
                  <ActivityIcon>
                    <FaBookOpen />
                  </ActivityIcon>
                  <ActivityText>
                    <ActivityTitle>Completed "Advanced Role Design"</ActivityTitle>
                    <ActivitySubtitle>Course Progress: 85%</ActivitySubtitle>
                  </ActivityText>
                </ActivityContent>
                <ActivityTime>2 hours ago</ActivityTime>
              </ActivityItem>
              {/* More activity items */}
            </SectionCard>

            {/* Resources & Downloads */}
            <SectionCard>
              <SectionTitle>Resources Downloaded</SectionTitle>
              <ActivityItem>
                <ActivityContent>
                  <ActivityIcon style={{ color: '#EC297B' }}>
                    <FaFilePdf />
                  </ActivityIcon>
                  <ActivityTitle>Role Blueprint Template</ActivityTitle>
                </ActivityContent>
                <ActivityTime>Yesterday</ActivityTime>
              </ActivityItem>
              {/* More resource items */}
            </SectionCard>

            {/* Quotes & Roles */}
            <SectionCard>
              <SectionTitle>Generated Quotes & Roles</SectionTitle>
              <ActivityItem>
                <ActivityContent>
                  <ActivityIcon style={{ color: '#3B82F6' }}>
                    <FaFileAlt />
                  </ActivityIcon>
                  <ActivityTitle>Senior Product Manager Role</ActivityTitle>
                </ActivityContent>
                <ActivityTime>3 days ago</ActivityTime>
              </ActivityItem>
              {/* More quote items */}
            </SectionCard>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default UserManagementTab;