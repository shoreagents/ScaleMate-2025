import React, { useState } from 'react';
import styled from 'styled-components';
import { FaSearch, FaDownload, FaTimes, FaEye, FaFileAlt, FaCheck, FaCalendarAlt } from 'react-icons/fa';

const Container = styled.div`
  padding: 1.5rem;
`;

const FiltersContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const FilterRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
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

const DateRangeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const DateInputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #F1F5F9;
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;

  input {
    background: transparent;
    border: none;
    color: #0F172A;
  }

  svg {
    color: rgba(15, 23, 42, 0.7);
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
    cursor: pointer;
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
  gap: 0.5rem;
`;

const Avatar = styled.img`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
`;

const UserEmail = styled.span`
  color: rgba(15, 23, 42, 0.7);
`;

const ActionButton = styled.button<{ $color?: string }>`
  color: rgba(15, 23, 42, 0.7);
  padding: 0.25rem;
  border-radius: 0.25rem;
  transition: all 0.2s;
  background: none;
  border: none;

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
  width: 500px;
  background-color: #F1F5F9;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
`;

const ModalHeader = styled.div`
  padding: 1.5rem;
  background-color: white;
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

const Card = styled.div`
  background-color: white;
  border-radius: 0.75rem;
  padding: 1.5rem;
`;

const CardTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #0F172A;
  margin-bottom: 1rem;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const InfoLabel = styled.span`
  color: rgba(15, 23, 42, 0.7);
`;

const InfoValue = styled.span<{ $bold?: boolean; $color?: string }>`
  color: ${props => props.$color || '#0F172A'};
  font-weight: ${props => props.$bold ? '600' : '500'};
  font-size: ${props => props.$bold ? '1.125rem' : '1rem'};
`;

const Tag = styled.span<{ $color: string }>`
  padding: 0.25rem 0.5rem;
  background-color: ${props => `${props.$color}10`};
  color: ${props => props.$color};
  border-radius: 9999px;
  font-size: 0.875rem;
`;

const Divider = styled.div`
  border-top: 1px solid #E5E7EB;
  padding-top: 1rem;
  margin-top: 1rem;
`;

const TaskItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const TaskIcon = styled.div`
  color: #00E915;
`;

const TaskText = styled.span`
  color: #0F172A;
`;

const QuoteAnalyticsTab: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Container>
      <FiltersContainer>
        <FilterRow>
          <FilterGroup>
            <SearchInput>
              <FaSearch />
              <input type="text" placeholder="Search roles..." />
            </SearchInput>
            <Select>
              <option>All Regions</option>
              <option>North America</option>
              <option>Europe</option>
              <option>Asia Pacific</option>
            </Select>
            <Select>
              <option>All Status</option>
              <option>Saved</option>
              <option>Abandoned</option>
            </Select>
          </FilterGroup>
          <Button $primary>
            <FaDownload />
            Export CSV
          </Button>
        </FilterRow>
        <DateRangeContainer>
          <DateInputWrapper>
            <FaCalendarAlt />
            <input type="date" />
          </DateInputWrapper>
          <span style={{ color: 'rgba(15, 23, 42, 0.7)' }}>to</span>
          <DateInputWrapper>
            <FaCalendarAlt />
            <input type="date" />
          </DateInputWrapper>
        </DateRangeContainer>
      </FiltersContainer>

      <TableContainer>
        <Table>
          <TableHead>
            <tr>
              <TableHeader>Date</TableHeader>
              <TableHeader>Role</TableHeader>
              <TableHeader>Currency</TableHeader>
              <TableHeader>Offshore Cost</TableHeader>
              <TableHeader>Local Cost</TableHeader>
              <TableHeader>User</TableHeader>
              <TableHeader style={{ textAlign: 'right' }}>Actions</TableHeader>
            </tr>
          </TableHead>
          <TableBody>
            <tr onClick={() => setIsModalOpen(true)}>
              <TableCell>
                <span style={{ color: 'rgba(15, 23, 42, 0.7)' }}>Mar 15, 2025</span>
              </TableCell>
              <TableCell>
                <span style={{ color: '#0F172A' }}>Senior Product Manager</span>
              </TableCell>
              <TableCell>
                <span style={{ color: '#0F172A' }}>USD</span>
              </TableCell>
              <TableCell>
                <span style={{ color: '#0F172A', fontWeight: 500 }}>$45,000</span>
              </TableCell>
              <TableCell>
                <span style={{ color: '#0F172A', fontWeight: 500 }}>$120,000</span>
              </TableCell>
              <TableCell>
                <UserInfo>
                  <Avatar src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg" alt="User" />
                  <UserEmail>alex.j@example.com</UserEmail>
                </UserInfo>
              </TableCell>
              <TableCell>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.75rem' }}>
                  <ActionButton title="View Details">
                    <FaEye />
                  </ActionButton>
                  <ActionButton $color="#3B82F6" title="View Document">
                    <FaFileAlt />
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
            <ModalTitle>Quote Details</ModalTitle>
            <CloseButton onClick={() => setIsModalOpen(false)}>
              <FaTimes />
            </CloseButton>
          </ModalHeader>

          <ModalBody>
            <Card>
              <CardTitle>Quote Summary</CardTitle>
              <InfoRow>
                <InfoLabel>Role Title</InfoLabel>
                <InfoValue>Senior Product Manager</InfoValue>
              </InfoRow>
              <InfoRow>
                <InfoLabel>Experience Level</InfoLabel>
                <Tag $color="#3B82F6">Senior (8+ years)</Tag>
              </InfoRow>
              <InfoRow>
                <InfoLabel>Region</InfoLabel>
                <InfoValue>North America</InfoValue>
              </InfoRow>
            </Card>

            <Card>
              <CardTitle>Cost Breakdown</CardTitle>
              <InfoRow>
                <InfoLabel>Base Salary</InfoLabel>
                <InfoValue>$100,000</InfoValue>
              </InfoRow>
              <InfoRow>
                <InfoLabel>Benefits</InfoLabel>
                <InfoValue>$20,000</InfoValue>
              </InfoRow>
              <Divider>
                <InfoRow>
                  <InfoValue $bold>Total Cost</InfoValue>
                  <InfoValue $bold $color="#3B82F6">$120,000</InfoValue>
                </InfoRow>
              </Divider>
            </Card>

            <Card>
              <CardTitle>Tasks & Requirements</CardTitle>
              <TaskItem>
                <TaskIcon>
                  <FaCheck />
                </TaskIcon>
                <TaskText>Product Strategy Development</TaskText>
              </TaskItem>
              <TaskItem>
                <TaskIcon>
                  <FaCheck />
                </TaskIcon>
                <TaskText>Team Leadership</TaskText>
              </TaskItem>
              <TaskItem>
                <TaskIcon>
                  <FaCheck />
                </TaskIcon>
                <TaskText>Stakeholder Management</TaskText>
              </TaskItem>
            </Card>

            <Card>
              <CardTitle>Quote Generated By</CardTitle>
              <UserInfo>
                <Avatar src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg" alt="User" />
                <div>
                  <div style={{ fontWeight: 500, color: '#0F172A' }}>Alex Johnson</div>
                  <div style={{ fontSize: '0.875rem', color: 'rgba(15, 23, 42, 0.7)' }}>alex.j@example.com</div>
                </div>
              </UserInfo>
            </Card>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default QuoteAnalyticsTab; 