import React, { useState } from 'react';
import styled from 'styled-components';
import { FaSearch, FaDownload, FaTimes, FaEye, FaFileAlt, FaCheck, FaCalendarAlt, FaChevronDown, FaChevronUp, FaPlus } from 'react-icons/fa';

const Container = styled.div`
  padding: 1.5rem;
  padding-bottom: 5.5rem; /* Space for fixed action bar on mobile */
  @media (max-width: 320px) {
    overflow-x: hidden;
    width: 100vw;
    box-sizing: border-box;
  }
`;

const FiltersContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
  @media only screen and (min-width: 1024px) and (max-width: 1145px) {
    gap: 0;
  }
  @media (max-width: 480px) {
    display: none;
  }
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

  @media only screen and (min-width: 1146px) {
    & > * {
      flex: 1;
      min-width: 0;
    }
  }
`;

const SearchInput = styled.div`
  position: relative;
  width: 16rem;
  @media only screen and (min-width: 1024px) and (max-width: 1145px) {
    width: 100%;
    margin-bottom: 1rem;
  }
  @media only screen and (min-width: 1146px) {
    width: auto;
    flex: 1;
    min-width: 0;
  }
  input {
    width: 100%;
    padding: 0.5rem 1rem 0.5rem 2.5rem;
    border: 1px solid #E5E7EB;
    border-radius: 0.5rem;
    box-sizing: border-box;
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

  @media only screen and (max-width: 1145px) {
    justify-content: center;
    width: 100%;
  }

  @media (max-width: 320px) {
    max-width: 100%;
  }

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
  background: white;
  border: 1px solid #E5E7EB;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  input {
    background: transparent;
    border: none;
    color: #0F172A;
    width: 100%;
  }
  svg {
    color: rgba(15, 23, 42, 0.7);
  }
  @media (max-width: 320px) {
    max-width: 100%;
  }
`;

const TableContainer = styled.div`
  background-color: white;
  border-radius: 0.75rem;
  border: 1px solid #E5E7EB;
  overflow: hidden;
  @media only screen and (min-width: 1024px) and (max-width: 1145px) {
    display: none;
  }
  @media (max-width: 480px) {
    display: none;
  }
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

// Add mobile-specific styled components
const MobileFilters = styled.div`
  display: none;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
  @media (max-width: 480px) {
    display: flex;
  }
`;

const MobileSearchInput = styled.div`
  position: relative;
  width: 100%;
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

  @media (max-width: 320px) {
    max-width: 100%;
  }
`;

const MobileFilterRow = styled.div`
  display: flex;
  gap: 0.5rem;
  @media (max-width: 480px) {
    gap: 0.5rem;
  }
`;

const MobileFilterCol = styled.div`
  flex: 1 1 0%;
  @media (max-width: 480px) {
    min-width: 0;
  }
  @media (max-width: 320px) {
    max-width: 100%;
  }
  select {
    width: 100%;
  }
`;

const MobileLeads = styled.div`
  display: none;
  flex-direction: column;
  gap: 1rem;
  @media (max-width: 480px) {
    display: flex;
  }
`;

const MobileLeadCard = styled.div`
  background-color: white;
  border-radius: 0.75rem;
  border: 1px solid #E5E7EB;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  @media (max-width: 320px) {
    max-width: 100%;
    box-sizing: border-box;
  }
`;

const MobileLeadHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const MobileLeadTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: #0F172A;
  margin: 0;
`;

const MobileLeadDropdownButton = styled.button`
  color: #3B82F6;
  background: none;
  border: none;
  font-size: 1.25rem;
  cursor: pointer;
  margin-left: 1rem;
  display: flex;
  align-items: center;
`;

const MobileLeadDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const MobileLeadRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MobileLeadCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const MobileLeadLabel = styled.span`
  font-size: 0.75rem;
  color: rgba(15, 23, 42, 0.7);
`;

const MobileLeadValue = styled.span`
  font-size: 0.875rem;
  color: #0F172A;
`;

const MobileLeadActions = styled.div`
  display: flex;
  gap: 2rem;
  margin-top: 1rem;
  justify-content: center;
`;

const MobileActionButton = styled.button`
  color: rgba(15, 23, 42, 0.7);
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  transition: all 0.2s;
  background: none;
  border: none;
  font-size: 1.25rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  &:hover {
    color: #0F172A;
    background: #F1F5F9;
  }
`;

const MobileActionLabel = styled.span`
  font-size: 0.95rem;
  color: #0F172A;
  font-weight: 500;
`;

const MobileDateRow = styled.div`
  display: flex;
  gap: 0.5rem;
  @media (max-width: 480px) {
    gap: 0.5rem;
  }
`;

const MobileDateToText = styled.span`
  display: flex;
  align-items: center;
  color: rgba(15, 23, 42, 0.7);
  font-size: 0.95rem;
  padding: 0 0.25rem;
`;

const MobileExportContainer = styled.div`
  display: none;
  @media (max-width: 480px) {
    display: flex;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100vw;
    max-width: 100vw;
    background: white;
    padding: 0.75rem 0 1rem 0;
    box-shadow: 0 -2px 8px rgba(0,0,0,0.04);
    z-index: 100;
    justify-content: center;
  }
`;

const MobileExportButton = styled(Button)`
  width: 100%;
  max-width: 480px;
  font-size: 1rem;
  justify-content: center;
`;

const FixedActionBar = styled.div`
  display: none;
  @media (max-width: 480px) {
    display: flex;
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    background: white;
    box-shadow: 0 -2px 12px rgba(0,0,0,0.06);
    padding: 0.75rem 1.5rem 1.25rem 1.5rem;
    gap: 0.75rem;
    z-index: 100; /* Sidebar should use z-index: 200+ to appear above */
    border-top: 1px solid #E5E7EB;
    justify-content: center;
  }
`;

const MobileLeadDivider = styled.div`
  border-bottom: 1px solid #E5E7EB;
  margin: 0.5rem 0;
`;

// Add DesktopCardView and DesktopFAB styled components
const DesktopCardView = styled.div`
  display: none;
  @media only screen and (min-width: 1024px) and (max-width: 1145px) {
    display: block;
  }
`;

const DesktopFAB = styled.button`
  display: none;
  @media only screen and (min-width: 1024px) and (max-width: 1145px) {
    display: flex;
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 50%;
    background: #3B82F6;
    color: white;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 16px rgba(59,130,246,0.15);
    border: none;
    font-size: 2rem;
    z-index: 2000;
    cursor: pointer;
    transition: background 0.2s;
    &:hover {
      background: #2563EB;
    }
  }
`;

// Add for max-width: 320px
const FilterRowXS = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
  width: 100%;
  @media (max-width: 320px) {
    width: 100%;
  }
`;

const FilterColXS = styled.div`
  flex: 1;
  min-width: 0;
  box-sizing: border-box;
  @media (max-width: 320px) {
    max-width: 100%;
  }
`;

const QuoteAnalyticsTab: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLeadExpanded, setIsLeadExpanded] = useState(false);
  const width = typeof window !== 'undefined' ? window.innerWidth : 1200;

  return (
    <Container>
      {/* Extra Small Mobile (≤ 320px) custom layout */}
      {width <= 320 ? (
        <>
          <div style={{ marginBottom: '0.75rem' }}>
            <MobileSearchInput style={{ width: '100%' }}>
              <FaSearch />
              <input type="text" placeholder="Search roles..." />
            </MobileSearchInput>
          </div>
          <FilterRowXS>
            <FilterColXS>
              <Select>
                <option>All Regions</option>
                <option>North America</option>
                <option>Europe</option>
                <option>Asia Pacific</option>
              </Select>
            </FilterColXS>
            <FilterColXS>
              <Select>
                <option>All Status</option>
                <option>Saved</option>
                <option>Abandoned</option>
              </Select>
            </FilterColXS>
          </FilterRowXS>
          <FilterRowXS>
            <FilterColXS>
              <DateInputWrapper>
                <FaCalendarAlt />
                <input type="date" placeholder="From" />
              </DateInputWrapper>
            </FilterColXS>
            <FilterColXS>
              <DateInputWrapper>
                <FaCalendarAlt />
                <input type="date" placeholder="To" />
              </DateInputWrapper>
            </FilterColXS>
          </FilterRowXS>
          <Button $primary style={{ width: '100%', justifyContent: 'center', marginBottom: '1rem' }}>
            <FaDownload />
            Export CSV
          </Button>
          {/* Card List (dropdown style) */}
          <div style={{ width: '100%' }}>
            <MobileLeadCard style={{ width: '100%' }}>
              <MobileLeadHeader>
                <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0 }}>
                  <MobileLeadTitle>Senior Product Manager</MobileLeadTitle>
                  <span style={{ color: 'rgba(15, 23, 42, 0.7)', fontSize: '0.95rem', fontWeight: 500 }}>Mar 15, 2025</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.25rem' }}>
                    <Avatar src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg" alt="User" style={{ width: '1.5rem', height: '1.5rem' }} />
                    <UserEmail style={{ fontSize: '0.8rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>alex.j@example.com</UserEmail>
                  </div>
                </div>
                <MobileLeadDropdownButton onClick={() => setIsLeadExpanded(!isLeadExpanded)} aria-label={isLeadExpanded ? 'Collapse' : 'Expand'}>
                  {isLeadExpanded ? <FaChevronUp /> : <FaChevronDown />}
                </MobileLeadDropdownButton>
              </MobileLeadHeader>
              {isLeadExpanded && (
                <MobileLeadDetails>
                  <MobileLeadRow>
                    <MobileLeadCol>
                      <MobileLeadLabel>Currency</MobileLeadLabel>
                      <MobileLeadValue>USD</MobileLeadValue>
                    </MobileLeadCol>
                    <MobileLeadCol>
                      <MobileLeadLabel>User</MobileLeadLabel>
                      <UserInfo>
                        <Avatar src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg" alt="User" />
                        <UserEmail>alex.j@example.com</UserEmail>
                      </UserInfo>
                    </MobileLeadCol>
                  </MobileLeadRow>
                  <MobileLeadDivider />
                  <MobileLeadRow>
                    <MobileLeadCol>
                      <MobileLeadLabel>Offshore Cost</MobileLeadLabel>
                      <MobileLeadValue>$45,000</MobileLeadValue>
                    </MobileLeadCol>
                    <MobileLeadCol>
                      <MobileLeadLabel>Local Cost</MobileLeadLabel>
                      <MobileLeadValue>$120,000</MobileLeadValue>
                    </MobileLeadCol>
                  </MobileLeadRow>
                  <MobileLeadDivider />
                  <MobileLeadActions>
                    <MobileActionButton title="View Details" onClick={() => setIsModalOpen(true)}>
                      <FaEye />
                      <MobileActionLabel>View Details</MobileActionLabel>
                    </MobileActionButton>
                    <MobileActionButton title="View Document">
                      <FaFileAlt />
                      <MobileActionLabel>View Document</MobileActionLabel>
                    </MobileActionButton>
                  </MobileLeadActions>
                </MobileLeadDetails>
              )}
            </MobileLeadCard>
          </div>
        </>
      ) : width >= 1024 && width <= 1145 ? (
        <>
          <SearchInput>
            <FaSearch />
            <input type="text" placeholder="Search roles..." />
          </SearchInput>
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
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
          </div>
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
            <DateInputWrapper style={{ flex: 1 }}>
              <FaCalendarAlt />
              <input type="date" placeholder="From" />
            </DateInputWrapper>
            <span style={{ color: 'rgba(15, 23, 42, 0.7)', alignSelf: 'center' }}>to</span>
            <DateInputWrapper style={{ flex: 1 }}>
              <FaCalendarAlt />
              <input type="date" placeholder="To" />
            </DateInputWrapper>
            <Button $primary>
              <FaDownload />
              Export CSV
            </Button>
          </div>
          <DesktopCardView>
            {/* Reuse mobile card markup for each quote/lead */}
            <MobileLeadCard>
              <MobileLeadHeader>
                <div>
                  <MobileLeadTitle>Senior Product Manager</MobileLeadTitle>
                  <span style={{ color: 'rgba(15, 23, 42, 0.7)', fontSize: '0.95rem', fontWeight: 500 }}>Mar 15, 2025</span>
                </div>
                <MobileLeadDropdownButton onClick={() => setIsLeadExpanded(!isLeadExpanded)} aria-label={isLeadExpanded ? 'Collapse' : 'Expand'}>
                  {isLeadExpanded ? <FaChevronUp /> : <FaChevronDown />}
                </MobileLeadDropdownButton>
              </MobileLeadHeader>
              {isLeadExpanded && (
                <MobileLeadDetails>
                  <MobileLeadRow>
                    <MobileLeadCol>
                      <MobileLeadLabel>Currency</MobileLeadLabel>
                      <MobileLeadValue>USD</MobileLeadValue>
                    </MobileLeadCol>
                    <MobileLeadCol>
                      <MobileLeadLabel>User</MobileLeadLabel>
                      <UserInfo>
                        <Avatar src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg" alt="User" />
                        <UserEmail>alex.j@example.com</UserEmail>
                      </UserInfo>
                    </MobileLeadCol>
                  </MobileLeadRow>
                  <MobileLeadDivider />
                  <MobileLeadRow>
                    <MobileLeadCol>
                      <MobileLeadLabel>Offshore Cost</MobileLeadLabel>
                      <MobileLeadValue>$45,000</MobileLeadValue>
                    </MobileLeadCol>
                    <MobileLeadCol>
                      <MobileLeadLabel>Local Cost</MobileLeadLabel>
                      <MobileLeadValue>$120,000</MobileLeadValue>
                    </MobileLeadCol>
                  </MobileLeadRow>
                  <MobileLeadDivider />
                  <MobileLeadActions>
                    <MobileActionButton title="View Details" onClick={() => setIsModalOpen(true)}>
                      <FaEye />
                      <MobileActionLabel>View Details</MobileActionLabel>
                    </MobileActionButton>
                    <MobileActionButton title="View Document">
                      <FaFileAlt />
                      <MobileActionLabel>View Document</MobileActionLabel>
                    </MobileActionButton>
                  </MobileLeadActions>
                </MobileLeadDetails>
              )}
            </MobileLeadCard>
          </DesktopCardView>
          <DesktopFAB>
            <FaPlus />
          </DesktopFAB>
        </>
      ) : (
        <>
          <MobileFilters>
            <MobileSearchInput>
              <FaSearch />
              <input type="text" placeholder="Search roles..." />
            </MobileSearchInput>
            <MobileFilterRow>
              <MobileFilterCol>
                <Select>
                  <option>All Regions</option>
                  <option>North America</option>
                  <option>Europe</option>
                  <option>Asia Pacific</option>
                </Select>
              </MobileFilterCol>
              <MobileFilterCol>
                <Select>
                  <option>All Status</option>
                  <option>Saved</option>
                  <option>Abandoned</option>
                </Select>
              </MobileFilterCol>
            </MobileFilterRow>
            <MobileDateRow>
              <DateInputWrapper style={{ flex: 1 }}>
                <FaCalendarAlt />
                <input type="date" placeholder="From" />
              </DateInputWrapper>
              <MobileDateToText>to</MobileDateToText>
              <DateInputWrapper style={{ flex: 1 }}>
                <FaCalendarAlt />
                <input type="date" placeholder="To" />
              </DateInputWrapper>
            </MobileDateRow>
          </MobileFilters>

          <MobileLeads>
            <MobileLeadCard>
              <MobileLeadHeader>
                <div>
                  <MobileLeadTitle>Senior Product Manager</MobileLeadTitle>
                  <span style={{ color: 'rgba(15, 23, 42, 0.7)', fontSize: '0.95rem', fontWeight: 500 }}>Mar 15, 2025</span>
                </div>
                <MobileLeadDropdownButton onClick={() => setIsLeadExpanded(!isLeadExpanded)} aria-label={isLeadExpanded ? 'Collapse' : 'Expand'}>
                  {isLeadExpanded ? <FaChevronUp /> : <FaChevronDown />}
                </MobileLeadDropdownButton>
              </MobileLeadHeader>
              {isLeadExpanded && (
                <MobileLeadDetails>
                  <MobileLeadRow>
                    <MobileLeadCol>
                      <MobileLeadLabel>Currency</MobileLeadLabel>
                      <MobileLeadValue>USD</MobileLeadValue>
                    </MobileLeadCol>
                    <MobileLeadCol>
                      <MobileLeadLabel>User</MobileLeadLabel>
                      <UserInfo>
                        <Avatar src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg" alt="User" />
                        <UserEmail>alex.j@example.com</UserEmail>
                      </UserInfo>
                    </MobileLeadCol>
                  </MobileLeadRow>
                  <MobileLeadDivider />
                  <MobileLeadRow>
                    <MobileLeadCol>
                      <MobileLeadLabel>Offshore Cost</MobileLeadLabel>
                      <MobileLeadValue>$45,000</MobileLeadValue>
                    </MobileLeadCol>
                    <MobileLeadCol>
                      <MobileLeadLabel>Local Cost</MobileLeadLabel>
                      <MobileLeadValue>$120,000</MobileLeadValue>
                    </MobileLeadCol>
                  </MobileLeadRow>
                  <MobileLeadDivider />
                  <MobileLeadActions>
                    <MobileActionButton title="View Details" onClick={() => setIsModalOpen(true)}>
                      <FaEye />
                      <MobileActionLabel>View Details</MobileActionLabel>
                    </MobileActionButton>
                    <MobileActionButton title="View Document">
                      <FaFileAlt />
                      <MobileActionLabel>View Document</MobileActionLabel>
                    </MobileActionButton>
                  </MobileLeadActions>
                </MobileLeadDetails>
              )}
            </MobileLeadCard>
          </MobileLeads>

          <FixedActionBar>
            <MobileExportButton $primary>
              <FaDownload />
              Export CSV
            </MobileExportButton>
          </FixedActionBar>

          <FiltersContainer>
            {/* For large desktop (>=1146px): Search is full width on top row, filters/dates/export are left-aligned on next row, each with max width. */}
            {width > 1145 && (
              <>
                <div style={{ width: '100%', marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
                  <SearchInput style={{ width: '100%', maxWidth: '1100px' }}>
                    <FaSearch />
                    <input type="text" placeholder="Search roles..." />
                  </SearchInput>
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    marginBottom: '1.5rem',
                    width: '100%',
                    maxWidth: '1100px',
                  }}
                >
                  <Select style={{ minWidth: 0, maxWidth: 180 }}>
                    <option>All Regions</option>
                    <option>North America</option>
                    <option>Europe</option>
                    <option>Asia Pacific</option>
                  </Select>
                  <Select style={{ minWidth: 0, maxWidth: 180 }}>
                    <option>All Status</option>
                    <option>Saved</option>
                    <option>Abandoned</option>
                  </Select>
                  <DateInputWrapper style={{ minWidth: 0, maxWidth: 180 }}>
                    <input type="date" placeholder="From" />
                  </DateInputWrapper>
                  <span style={{ color: 'rgba(15, 23, 42, 0.7)', fontSize: '1rem', margin: '0 0.25rem' }}>to</span>
                  <DateInputWrapper style={{ minWidth: 0, maxWidth: 180 }}>
                    <input type="date" placeholder="To" />
                  </DateInputWrapper>
                  <Button $primary style={{ maxWidth: 180, justifyContent: 'center' }}>
                    <FaDownload />
                    Export CSV
                  </Button>
                </div>
              </>
            )}
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
        </>
      )}
    </Container>
  );
};

export default QuoteAnalyticsTab; 