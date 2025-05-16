import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaSearch, FaDownload, FaPlus, FaTimes, FaArrowRight } from 'react-icons/fa';

const Container = styled.div`
  padding: 1.5rem;
  padding-bottom: 5.5rem;

  @media only screen and (max-width: 1023px) {
    padding: 1.25rem;
  }

  @media only screen and (max-width: 767px) {
    padding: 1rem;
  }

  @media only screen and (max-width: 480px) {
    padding: 0.75rem;
  }

  @media only screen and (max-width: 320px) {
    padding: 0.5rem;
  }
`;

const FiltersContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;

  @media only screen and (min-width: 1146px) {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
  }

  @media only screen and (max-width: 1145px) {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }
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

const FilterRow = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;

  @media only screen and (min-width: 1024px) and (max-width: 1145px) {
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
  }
  @media only screen and (min-width: 1146px) {
    width: auto;
    flex: 1;
    min-width: 0;
  }
  @media only screen and (max-width: 768px) {
    width: 100%;
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
  padding: 0.5rem 2.25rem 0.5rem 1rem;
  border: 1px solid #E5E7EB;
  border-radius: 0.5rem;
  width: 100%;
  font-size: 1rem;

  @media only screen and (min-width: 1146px) {
    width: auto;
    flex: 1;
    min-width: 0;
  }

  @media only screen and (min-width: 769px) and (max-width: 1023px) {
    flex: 1;
    min-width: 0;
    width: auto;
  }

  @media only screen and (max-width: 1023px) {
    width: 100%;
  }
`;

const DateInput = styled.input`
  padding: 0.5rem 1rem;
  border: 1px solid #E5E7EB;
  border-radius: 0.5rem;
  flex: 1;
  width: 100%;
  font-size: 1rem;
  @media only screen and (min-width: 1146px) {
    width: auto;
    flex: 1;
    min-width: 0;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;

  @media only screen and (max-width: 1145px) {
    width: 100%;
    justify-content: stretch;
    & > * {
      flex: 1;
      min-width: 0;
    }
  }

  @media only screen and (max-width: 768px) {
    width: 100%;
    justify-content: stretch;
  }
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
  @media only screen and (min-width: 1146px) {
    flex: 1;
    min-width: 0;
    width: auto;
    justify-content: center;
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

const TableContainer = styled.div`
  background-color: white;
  border-radius: 0.75rem;

  width: 100%;
  overflow: hidden;

  @media only screen and (min-width: 1024px) and (max-width: 1145px) {
    display: none;
  }

  @media only screen and (max-width: 1023px) {
    border-radius: 0.5rem;
  }
`;

const Table = styled.table`
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;

  @media only screen and (min-width: 1146px) {
    th, td {
      padding: 1rem;
      &:first-child { width: 20%; }
      &:nth-child(2) { width: 20%; }
      &:nth-child(3) { width: 15%; }
      &:nth-child(4) { width: 20%; }
      &:nth-child(5) { width: 15%; }
      &:last-child { width: 10%; }
    }
  }

  @media only screen and (min-width: 1024px) and (max-width: 1145px) {
    min-width: 800px;
  }

  @media only screen and (max-width: 1023px) {
    display: none;
  }
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
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media only screen and (max-width: 1023px) {
    padding: 0.75rem 1rem;
  }
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
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media only screen and (max-width: 1023px) {
    padding: 0.75rem 1rem;
  }
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

  @media only screen and (max-width: 480px) {
    width: 1.75rem;
    height: 1.75rem;
  }
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

  @media only screen and (max-width: 480px) {
    font-size: 0.75rem;
    padding: 0.15rem 0.3rem;
  }
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
  z-index: 1000;
  overflow-y: auto;

  @media only screen and (max-width: 768px) {
    width: 100%;
  }
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

  @media only screen and (max-width: 480px) {
    font-size: 1rem;
  }
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

  @media only screen and (max-width: 480px) {
    padding: 0.75rem;
  }
`;

const LeadHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
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

// Mobile Card View (shown when table is hidden)
const MobileCardView = styled.div`
  display: none;

  @media only screen and (max-width: 1023px) {
    display: block;
  }
`;

const MobileCard = styled.div`
  background: white;
  border-radius: 0.75rem;
  border: 1px solid #E5E7EB;
  padding: 1rem;
  margin-bottom: 1rem;

  @media only screen and (max-width: 480px) {
    padding: 0.75rem;
    margin-bottom: 0.75rem;
  }
`;

const MobileCardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.75rem;
`;

const MobileCardInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const MobileCardDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const MobileCardName = styled.h3`
  font-weight: 500;
  color: #0F172A;
  margin: 0;
  font-size: 1rem;

  @media only screen and (max-width: 480px) {
    font-size: 0.875rem;
  }
`;

const MobileCardEmail = styled.p`
  color: rgba(15, 23, 42, 0.7);
  margin: 0;
  font-size: 0.875rem;

  @media only screen and (max-width: 480px) {
    font-size: 0.75rem;
  }
`;

const MobileCardTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const MobileLeadCard = styled.div`
  background: white;
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 0.75rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  border: 1px solid #e5e7eb;
  
  &:first-child {
    border-top: none !important;
  }
`;

const MobileLeadHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
  cursor: pointer;
`;

const MobileLeadArrow = styled.span<{ isOpen: boolean }>`
  margin-left: auto;
  display: flex;
  align-items: center;
  svg {
    width: 1.25rem;
    height: 1.25rem;
    transition: transform 0.2s;
    color: #6b7280;
  }
`;

const MobileLeadInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const MobileLeadName = styled.h3`
  font-size: 0.875rem;
  font-weight: 600;
  color: #111827;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const MobileLeadEmail = styled.p`
  font-size: 0.75rem;
  color: #6b7280;
  margin: 0.25rem 0 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const MobileLeadTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
  margin-top: 0.5rem;
`;

const MobileLeadTag = styled.span`
  font-size: 0.625rem;
  padding: 0.125rem 0.375rem;
  border-radius: 9999px;
  background: #f3f4f6;
  color: #374151;
  white-space: nowrap;
`;

const MobileLeadSource = styled.span`
  font-size: 0.625rem;
  padding: 0.125rem 0.375rem;
  border-radius: 9999px;
  background: #eef2ff;
  color: #4f46e5;
  white-space: nowrap;
`;

const MobileLeadDropdown = styled.div<{ isOpen: boolean }>`
  margin-top: 0.75rem;
  padding-top: 0.75rem;
  display: ${props => props.isOpen ? 'block' : 'none'};
`;

const MobileLeadDetail = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  font-size: 0.75rem;
  color: #4b5563;

  &:last-child {
    margin-bottom: 0;
  }
`;

const MobileLeadLabel = styled.span`
  color: #6b7280;
  min-width: 4rem;
`;

const MobileLeadValue = styled.span`
  color: #111827;
  font-weight: 500;
`;

const MobileLeadButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.5rem;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  color: #6b7280;
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #f3f4f6;
    color: #374151;
  }

  svg {
    width: 1rem;
    height: 1rem;
    transition: transform 0.2s;
  }

  &[aria-expanded="true"] svg {
    transform: rotate(180deg);
  }
`;

const getTagColor = (tag: string) => {
  switch (tag.toLowerCase()) {
    case 'quote':
    case 'qualified':
      return '#0098FF'; // blue
    case 'hot':
      return '#00E915'; // green
    default:
      return '#374151'; // gray
  }
};

// Add a new TabletFiltersRow styled component
const TabletFiltersRow = styled.div`
  display: none;
  @media only screen and (min-width: 769px) and (max-width: 1023px) {
    display: flex;
    gap: 1rem;
    width: 100%;
    & > * {
      flex: 1;
      min-width: 0;
    }
  }
`;

// Add a new TabletActionsRow styled component
const TabletActionsRow = styled.div`
  display: none;
  @media only screen and (min-width: 769px) and (max-width: 1023px) {
    display: flex;
    gap: 1rem;
    width: 100%;
    align-items: center;
    & > * {
      flex: 1;
      min-width: 0;
    }
  }
`;

// Add a new TabletSearchRow styled component
const TabletSearchRow = styled.div`
  display: none;
  @media only screen and (min-width: 769px) and (max-width: 1023px) {
    display: flex;
    width: 100%;
    margin-bottom: 0.5rem;
  }
`;

// Add a new TabletFAB styled component
const TabletFAB = styled.button`
  display: none;
  @media only screen and (min-width: 769px) and (max-width: 1023px) {
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

// Add a new MobileFAB styled component
const MobileFAB = styled.button`
  display: none;
  @media only screen and (max-width: 768px) {
    display: flex;
    position: fixed;
    bottom: 1.5rem;
    right: 1.5rem;
    width: 3.25rem;
    height: 3.25rem;
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

// Add a new MobileActionsRow styled component
const MobileActionsRow = styled.div`
  display: none;
  @media only screen and (max-width: 768px) {
    display: flex;
    gap: 0.75rem;
    width: 100%;
    margin-bottom: 1rem;
    & > * {
      flex: 1;
      min-width: 0;
    }
  }
`;

// Add a custom hook for window width
function useWindowWidth() {
  const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return width;
}

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

const DesktopCardView = styled.div`
  display: none;
  @media only screen and (min-width: 1024px) and (max-width: 1145px) {
    display: block;
  }
`;

const LeadManagementTab: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [expandedLeadId, setExpandedLeadId] = useState<string | null>(null);

  const width = useWindowWidth();

  return (
    <Container>
      <FiltersContainer>
        {width >= 1024 && width <= 1145 ? (
          <>
            <SearchInput>
              <FaSearch />
              <input type="text" placeholder="Search leads..." />
            </SearchInput>
            <FilterRow>
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
            </FilterRow>
            <FilterRow>
              <DateInput type="date" />
              <Button>
                <FaDownload />
                Export CSV
              </Button>
            </FilterRow>
            <DesktopFAB>
              <FaPlus />
            </DesktopFAB>
          </>
        ) : width <= 768 ? (
          <>
            <div style={{ marginBottom: '1rem' }}>
              <SearchInput>
                <FaSearch />
                <input type="text" placeholder="Search leads..." />
              </SearchInput>
            </div>
            <FilterGroup>
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
            </FilterGroup>
            <MobileActionsRow>
              <DateInput type="date" />
              <Button>
                <FaDownload />
                Export CSV
              </Button>
            </MobileActionsRow>
            {/* Floating Add Lead Button for mobile */}
            <MobileFAB>
              <FaPlus />
            </MobileFAB>
          </>
        ) : width >= 769 && width <= 1023 ? (
          <>
            <TabletSearchRow>
              <SearchInput style={{ width: '100%' }}>
                <FaSearch />
                <input type="text" placeholder="Search leads..." />
              </SearchInput>
            </TabletSearchRow>
            <TabletFiltersRow>
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
            </TabletFiltersRow>
            <TabletActionsRow>
              <DateInput type="date" />
              <Button>
                <FaDownload />
                Export CSV
              </Button>
            </TabletActionsRow>
            {/* Floating Add Lead Button for tablet */}
            <TabletFAB>
              <FaPlus />
            </TabletFAB>
          </>
        ) : (
          <>
            <div style={{ marginBottom: '1rem' }}>
              <SearchInput>
                <FaSearch />
                <input type="text" placeholder="Search leads..." />
              </SearchInput>
            </div>
            <FilterGroup>
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
              <Button>
                <FaDownload />
                Export CSV
              </Button>
              <Button $primary>
                <FaPlus />
                Add Lead
              </Button>
            </FilterGroup>
          </>
        )}
      </FiltersContainer>

      {/* Desktop Card View for 1024px-1145px */}
      {width >= 1024 && width <= 1145 && (
        <DesktopCardView>
          {[
            {
              id: '1',
              name: 'Michael Cooper',
              email: 'm.cooper@example.com',
              avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg',
              source: 'Quote',
              tags: ['Hot', 'Qualified'],
              lastAction: 'Viewed pricing',
              assignedTo: 'Sarah M.',
              assignedAvatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg',
            },
            // Add more leads here as needed
          ].map((lead) => (
            <MobileLeadCard key={lead.id}>
              <MobileLeadHeader onClick={() => setExpandedLeadId(expandedLeadId === lead.id ? null : lead.id)}>
                <Avatar src={lead.avatar} alt={lead.name} />
                <MobileLeadInfo>
                  <MobileLeadName>{lead.name}</MobileLeadName>
                  <MobileLeadEmail>{lead.email}</MobileLeadEmail>
                  {expandedLeadId !== lead.id && (
                    <MobileLeadTags>
                      <MobileLeadSource style={{ color: '#0098FF', background: '#e6f2ff' }}>{lead.source}</MobileLeadSource>
                      {lead.tags.map((tag, idx) => (
                        <MobileLeadTag key={idx} style={{ color: getTagColor(tag), background: getTagColor(tag) + '10' }}>{tag}</MobileLeadTag>
                      ))}
                    </MobileLeadTags>
                  )}
                </MobileLeadInfo>
                <MobileLeadArrow isOpen={expandedLeadId === lead.id}>
                  {expandedLeadId === lead.id ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </MobileLeadArrow>
              </MobileLeadHeader>
              <MobileLeadDropdown isOpen={expandedLeadId === lead.id}>
                <MobileLeadDetail>
                  <MobileLeadLabel>Last Action:</MobileLeadLabel>
                  <MobileLeadValue>{lead.lastAction}</MobileLeadValue>
                </MobileLeadDetail>
                <MobileLeadDetail>
                  <MobileLeadLabel>Assigned To:</MobileLeadLabel>
                  <MobileLeadValue>
                    <Avatar src={lead.assignedAvatar} alt={lead.assignedTo} style={{ width: '1.5rem', height: '1.5rem', marginRight: '0.5rem' }} />
                    {lead.assignedTo}
                  </MobileLeadValue>
                </MobileLeadDetail>
                <MobileLeadDetail>
                  <MobileLeadLabel>Source:</MobileLeadLabel>
                  <MobileLeadValue>
                    <MobileLeadSource style={{ color: '#0098FF', background: '#e6f2ff' }}>{lead.source}</MobileLeadSource>
                  </MobileLeadValue>
                </MobileLeadDetail>
                <MobileLeadDetail>
                  <MobileLeadLabel>Tags:</MobileLeadLabel>
                  <MobileLeadValue>
                    {lead.tags.map((tag, idx) => (
                      <MobileLeadTag key={idx} style={{ color: getTagColor(tag), background: getTagColor(tag) + '10' }}>{tag}</MobileLeadTag>
                    ))}
                  </MobileLeadValue>
                </MobileLeadDetail>
              </MobileLeadDropdown>
            </MobileLeadCard>
          ))}
        </DesktopCardView>
      )}

      {/* Existing Table View */}
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

      {/* Existing Mobile Card View */}
      <MobileCardView>
        {[
          {
            id: '1',
            name: 'Michael Cooper',
            email: 'm.cooper@example.com',
            avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg',
            source: 'Quote',
            tags: ['Hot', 'Qualified'],
            lastAction: 'Viewed pricing',
            assignedTo: 'Sarah M.',
            assignedAvatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg',
          },
          // Add more leads here as needed
        ].map((lead) => (
          <MobileLeadCard key={lead.id}>
            <MobileLeadHeader onClick={() => setExpandedLeadId(expandedLeadId === lead.id ? null : lead.id)}>
              <Avatar src={lead.avatar} alt={lead.name} />
              <MobileLeadInfo>
                <MobileLeadName>{lead.name}</MobileLeadName>
                <MobileLeadEmail>{lead.email}</MobileLeadEmail>
                {expandedLeadId !== lead.id && (
                  <MobileLeadTags>
                    <MobileLeadSource style={{ color: '#0098FF', background: '#e6f2ff' }}>{lead.source}</MobileLeadSource>
                    {lead.tags.map((tag, idx) => (
                      <MobileLeadTag key={idx} style={{ color: getTagColor(tag), background: getTagColor(tag) + '10' }}>{tag}</MobileLeadTag>
                    ))}
                  </MobileLeadTags>
                )}
              </MobileLeadInfo>
              <MobileLeadArrow isOpen={expandedLeadId === lead.id}>
                {expandedLeadId === lead.id ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                )}
              </MobileLeadArrow>
            </MobileLeadHeader>
            <MobileLeadDropdown isOpen={expandedLeadId === lead.id}>
              <MobileLeadDetail>
                <MobileLeadLabel>Last Action:</MobileLeadLabel>
                <MobileLeadValue>{lead.lastAction}</MobileLeadValue>
              </MobileLeadDetail>
              <MobileLeadDetail>
                <MobileLeadLabel>Assigned To:</MobileLeadLabel>
                <MobileLeadValue>
                  <Avatar src={lead.assignedAvatar} alt={lead.assignedTo} style={{ width: '1.5rem', height: '1.5rem', marginRight: '0.5rem' }} />
                  {lead.assignedTo}
                </MobileLeadValue>
              </MobileLeadDetail>
              <MobileLeadDetail>
                <MobileLeadLabel>Source:</MobileLeadLabel>
                <MobileLeadValue>
                  <MobileLeadSource style={{ color: '#0098FF', background: '#e6f2ff' }}>{lead.source}</MobileLeadSource>
                </MobileLeadValue>
              </MobileLeadDetail>
              <MobileLeadDetail>
                <MobileLeadLabel>Tags:</MobileLeadLabel>
                <MobileLeadValue>
                  {lead.tags.map((tag, idx) => (
                    <MobileLeadTag key={idx} style={{ color: getTagColor(tag), background: getTagColor(tag) + '10' }}>{tag}</MobileLeadTag>
                  ))}
                </MobileLeadValue>
              </MobileLeadDetail>
            </MobileLeadDropdown>
          </MobileLeadCard>
        ))}
      </MobileCardView>

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
              <Avatar src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg" alt="Lead" />
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