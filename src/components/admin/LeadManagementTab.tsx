import React, { useState } from 'react';
import styled from 'styled-components';
import { FaSearch, FaDownload, FaPlus, FaTimes, FaArrowRight } from 'react-icons/fa';

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

const DateInput = styled.input`
  padding: 0.5rem 1rem;
  border: 1px solid #E5E7EB;
  border-radius: 0.5rem;
`;

const ActionButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
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

const LeadInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const Avatar = styled.img`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
`;

const LeadName = styled.span`
  font-weight: 500;
`;

const LeadEmail = styled.span`
  color: rgba(15, 23, 42, 0.7);
`;

const Tag = styled.span<{ $color: string }>`
  padding: 0.25rem 0.5rem;
  background-color: ${props => `${props.$color}10`};
  color: ${props => props.$color};
  border-radius: 9999px;
  font-size: 0.875rem;
  margin-right: 0.5rem;
`;

const Sidebar = styled.aside<{ $isOpen: boolean }>`
  position: fixed;
  right: 0;
  top: 0;
  width: 24rem;
  height: 100%;
  background-color: #F1F5F9;
  border-left: 1px solid #E5E7EB;
  padding: 1.5rem;
  transform: translateX(${props => props.$isOpen ? '0' : '100%'});
  transition: transform 0.2s;
`;

const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
`;

const SidebarTitle = styled.h2`
  font-size: 1.125rem;
  font-weight: 700;
  color: #0F172A;
`;

const CloseButton = styled.button`
  color: rgba(15, 23, 42, 0.4);
  &:hover {
    color: #0F172A;
  }
`;

const SidebarContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Card = styled.div`
  background-color: white;
  border-radius: 0.75rem;
  padding: 1rem;
`;

const LeadHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const LeadAvatar = styled.img`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
`;

const LeadDetails = styled.div`
  h3 {
    font-weight: 600;
    color: #0F172A;
  }
  p {
    font-size: 0.875rem;
    color: rgba(15, 23, 42, 0.7);
  }
`;

const SectionTitle = styled.h4`
  font-size: 0.875rem;
  font-weight: 600;
  color: #0F172A;
  margin-bottom: 0.5rem;
`;

const FunnelContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const ProgressBar = styled.div`
  width: 100%;
  background-color: #F9FAFB;
  border-radius: 9999px;
  height: 0.5rem;
  margin-bottom: 0.25rem;
`;

const ProgressFill = styled.div<{ $width: number }>`
  background-color: #00E915;
  height: 100%;
  border-radius: 9999px;
  width: ${props => props.$width}%;
`;

const ProgressText = styled.span`
  font-size: 0.875rem;
  color: rgba(15, 23, 42, 0.7);
`;

const NoteContainer = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1rem;
`;

const NoteContent = styled.div`
  flex: 1;
`;

const NoteBubble = styled.div`
  background-color: #F9FAFB;
  border-radius: 0.5rem;
  padding: 0.75rem;
  margin-bottom: 0.25rem;
`;

const NoteText = styled.p`
  font-size: 0.875rem;
  color: #0F172A;
`;

const NoteTime = styled.span`
  font-size: 0.75rem;
  color: rgba(15, 23, 42, 0.6);
`;

const TextArea = styled.textarea`
  width: 100%;
  border: 1px solid #E5E7EB;
  border-radius: 0.5rem;
  padding: 0.75rem;
  font-size: 0.875rem;
  resize: vertical;
  min-height: 5rem;
`;

const LeadManagementTab: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <Container>
      <FiltersContainer>
        <FilterGroup>
          <SearchInput>
            <FaSearch />
            <input type="text" placeholder="Search leads..." />
          </SearchInput>
          <Select>
            <option>All Sources</option>
            <option>Quote</option>
            <option>Contact</option>
            <option>Quiz</option>
          </Select>
          <Select>
            <option>All Tags</option>
            <option>Hot</option>
            <option>Qualified</option>
            <option>Quiz-ready</option>
          </Select>
          <DateInput type="date" />
        </FilterGroup>
        <ActionButtons>
          <Button>
            <FaDownload />
            Export CSV
          </Button>
          <Button $primary>
            <FaPlus />
            Add Lead
          </Button>
        </ActionButtons>
      </FiltersContainer>

      <TableContainer>
        <Table>
          <TableHead>
            <tr>
              <TableHeader>Name</TableHeader>
              <TableHeader>Email</TableHeader>
              <TableHeader>Source</TableHeader>
              <TableHeader>Tags</TableHeader>
              <TableHeader>Last Action</TableHeader>
              <TableHeader>Assigned To</TableHeader>
            </tr>
          </TableHead>
          <TableBody>
            <tr onClick={() => setIsSidebarOpen(true)}>
              <TableCell>
                <LeadInfo>
                  <Avatar src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg" alt="Lead" />
                  <LeadName>Michael Cooper</LeadName>
                </LeadInfo>
              </TableCell>
              <TableCell>
                <LeadEmail>m.cooper@example.com</LeadEmail>
              </TableCell>
              <TableCell>
                <Tag $color="#0098FF">Quote</Tag>
              </TableCell>
              <TableCell>
                <Tag $color="#00E915">Hot</Tag>
                <Tag $color="#0098FF">Qualified</Tag>
              </TableCell>
              <TableCell>
                <LeadEmail>Viewed pricing</LeadEmail>
              </TableCell>
              <TableCell>
                <LeadInfo>
                  <Avatar src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg" alt="Agent" />
                  <LeadName>Sarah M.</LeadName>
                </LeadInfo>
              </TableCell>
            </tr>
          </TableBody>
        </Table>
      </TableContainer>

      <Sidebar $isOpen={isSidebarOpen}>
        <SidebarHeader>
          <SidebarTitle>Lead Details</SidebarTitle>
          <CloseButton onClick={() => setIsSidebarOpen(false)}>
            <FaTimes />
          </CloseButton>
        </SidebarHeader>

        <SidebarContent>
          <Card>
            <LeadHeader>
              <LeadAvatar src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg" alt="Lead" />
              <LeadDetails>
                <h3>Michael Cooper</h3>
                <p>m.cooper@example.com</p>
              </LeadDetails>
            </LeadHeader>

            <SectionTitle>Lead Source</SectionTitle>
            <FunnelContainer>
              <Tag $color="#0098FF">Quote</Tag>
              <FaArrowRight style={{ color: 'rgba(15, 23, 42, 0.4)' }} />
              <Tag $color="#00E915">Qualified</Tag>
            </FunnelContainer>

            <SectionTitle>Interest Score</SectionTitle>
            <ProgressBar>
              <ProgressFill $width={85} />
            </ProgressBar>
            <ProgressText>85% - High Interest</ProgressText>
          </Card>

          <Card>
            <SectionTitle>Notes & Comments</SectionTitle>
            <NoteContainer>
              <Avatar src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg" alt="Agent" />
              <NoteContent>
                <NoteBubble>
                  <NoteText>Showed high interest in VA services. Following up next week.</NoteText>
                </NoteBubble>
                <NoteTime>2 hours ago</NoteTime>
              </NoteContent>
            </NoteContainer>
            <TextArea placeholder="Add a note..." />
          </Card>
        </SidebarContent>
      </Sidebar>
    </Container>
  );
};

export default LeadManagementTab; 