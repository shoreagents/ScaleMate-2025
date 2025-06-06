import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faSearch, 
  faPlus, 
  faDownload, 
  faStar as faStarRegular, 
  faTrashCan as faTrashCanRegular, 
  faPen,
  faTimes,
  faStar
} from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegularRegular } from '@fortawesome/free-regular-svg-icons';
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';

const TabContainer = styled.div`
  padding: 1.5rem;
`;

const FilterBarContainer = styled.div`
  margin-bottom: 1.5rem; 
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 1167px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto;
    gap: 1rem; 
  }
`;

const SearchContainer = styled.div`
  position: relative;
  width: 16rem;

  @media (max-width: 1167px) {
    width: 100%;
    min-width: 0;
    grid-column: 1 / 2;
    grid-row: 1 / 2;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.5rem 1rem 0.5rem 2.5rem; 
  border: 1px solid #E5E7EB;
  border-radius: 0.5rem; 
  font-size: 0.875rem;
  height: 2.5rem; 
  box-sizing: border-box;
  
  &::placeholder {
    color: rgba(15, 23, 42, 0.4);
  }
`;

const SearchIcon = styled(FontAwesomeIcon)`
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
  min-width: 12rem;

  @media (max-width: 1167px) {
    min-width: 0;
    width: 100%;
    grid-column: 2 / 3;
    grid-row: 1 / 2;
    padding-right: 2rem;
  }
`;

const StyledButton = styled.button<{ primary?: boolean }>`
  padding: 0.5rem 1rem; 
  border-radius: 0.5rem; 
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem; 
  cursor: pointer;
  height: 2.5rem; 
  box-sizing: border-box; 
  transition: background-color 0.2s, border-color 0.2s;
  white-space: nowrap; 
  width: auto;

  ${props => props.primary ? `
    background-color: #3B82F6;
    color: white;
    border: 1px solid #3B82F6;
    &:hover {
      background-color: #2563EB;
      border-color: #2563EB;
    }
  ` : `
    background-color: white;
    color: #0F172A;
    border: 1px solid #E5E7EB;
    &:hover {
      background-color: #F9FAFB;
    }
  `}

  @media (max-width: 1167px) {
    width: 100%;
    min-width: 0;
  }
`;

const AddButton = styled(StyledButton)`
  @media (max-width: 1167px) {
    grid-column: 1 / 2;
    grid-row: 2 / 3;
  }
  @media (max-width: 423px) {
    white-space: normal;
    text-align: center;
    word-break: break-word;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }
`;

const ExportButton = styled(StyledButton)`
  @media (max-width: 1167px) {
    grid-column: 2 / 3;
    grid-row: 2 / 3;
  }
  @media (max-width: 352px) {
    white-space: normal;
    text-align: center;
    word-break: break-word;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }
`;

const DesktopInputGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 1167px) {
    display: contents;
  }
`;

const DesktopActionButtonsGroup = styled.div`
  display: flex;
  gap: 0.75rem;

  @media (max-width: 1167px) {
    display: contents;
  }
`;

const TableWrapper = styled.div`
  background-color: white;
  border-radius: 0.75rem;
  border: 1px solid #E5E7EB;
  overflow: hidden;
  margin-top: 1.5rem;

  @media (min-width: 889px) {
    overflow-x: auto;
  }
  @media (max-width: 888px) {
    display: none;
  }
`;

const StyledTable = styled.table`
  width: 100%;
`;

const TableHeadStyled = styled.thead`
  background-color: #F9FAFB;
  border-bottom: 1px solid #E5E7EB;
`;

const TableBodyStyled = styled.tbody`
  & > tr:not(:first-child) {
    border-top: 1px solid #E5E7EB;
  }
  & > tr:hover {
    background-color: #F9FAFB;
  }
`;

const TableRowStyled = styled.tr`
  cursor: pointer;
`;

const TableHeaderCellStyled = styled.th`
  padding: 1rem 1.5rem;
  text-align: left;
  font-size: 0.875rem;
  font-weight: 600;
  color: #0F172A;
  &.text-right {
    text-align: right;
  }
`;

const TableCellStyled = styled.td`
  padding: 1rem 1.5rem;
  color: rgba(15, 23, 42, 0.7);
  &.main-text {
    color: #0F172A;
  }
  &.font-medium {
    font-weight: 500;
  }
`;

const UserCellContainer = styled.div`
  display: flex;
  align-items: center;
`;

const AvatarStyled = styled.img`
  width: 2rem;
  height: 2rem;
  border-radius: 9999px;
  margin-right: 0.5rem;
`;

const ActionButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.75rem;
`;

const ActionButtonStyled = styled.button`
  color: rgba(15, 23, 42, 0.7);
  background: none;
  border: none;
  padding: 0.25rem;
  cursor: pointer;
  font-size: 1rem;
  &:hover { color: #0F172A; }
  &.hover-primary:hover { color: #3B82F6; }
  &.hover-danger:hover { color: #EC297B; }
`;

const CardListContainer = styled.div`
  display: none;
  margin-top: 1.5rem;
  @media (max-width: 888px) {
    display: block;
  }
`;

const RoleCardStyled = styled.div`
  background-color: white;
  border-radius: 0.75rem;
  border: 1px solid #E5E7EB;
  padding: 1rem;
  margin-bottom: 1rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
`;

const CardHeaderStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.75rem;
`;

const CardTitleGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const CardRoleTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: #0F172A;
  margin: 0;
`;

const CardDate = styled.span`
  font-size: 0.875rem;
  color: rgba(15, 23, 42, 0.7);
`;

const CardContentStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const CardDetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.875rem;

  &.created-by-row {
    @media (max-width: 411px) {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.25rem;
    }
  }
`;

const CardLabelStyled = styled.span`
  font-weight: 500;
  color: #0F172A;
`;

const CardValueStyled = styled.span`
  color: rgba(15, 23, 42, 0.7);
  text-align: left;
  &.font-medium {
    font-weight: 500;
    color: #0F172A;
  }
`;

const CardUserDetailStyled = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;

  @media (max-width: 411px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
    img {
      margin-right: 0 !important;
    }
    span {
      display: block;
      width: 100%;
    }
  }
`;

const CardActionsStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 0.5rem;
  border-top: 1px solid #E5E7EB;
  padding-top: 0.75rem;
`;

const FeaturedBadge = styled.span`
  margin-left: 0.5rem;
  padding: 0.25rem 0.5rem;
  background: rgba(236, 41, 123, 0.1);
  color: #EC297B;
  font-size: 0.75rem;
  border-radius: 9999px;
  font-weight: 500;
`;

const StatusBadge = styled.span`
  padding: 0.25rem 0.5rem;
  background: rgba(0, 233, 21, 0.1);
  color: #00E915;
  border-radius: 9999px;
  font-size: 0.9em;
  font-weight: 500;
`;

const UserCell = styled.div`
  display: flex;
  align-items: center;
`;

const ActionGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.75rem;
`;

const ActionButton = styled.button`
  color: rgba(15, 23, 42, 0.7);
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.1rem;
  padding: 0.25rem;
  transition: color 0.2s;

  &:hover {
    color: #0F172A;
  }

  &[data-action='edit']:hover {
    color: #3B82F6;
  }
  &[data-action='delete']:hover {
    color: #EC297B;
  }
`;

const ExportModalOverlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  inset: 0;
  background-color: rgba(15, 23, 42, 0.4);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.2s;
  opacity: ${props => props.$isOpen ? 1 : 0};
  pointer-events: ${props => props.$isOpen ? 'auto' : 'none'};
`;

const ExportModalContent = styled.div`
  width: 440px;
  background-color: white;
  border-radius: 1rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  padding: 2rem;
  position: relative;
  z-index: 2001;
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
`;

const ModalTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 700;
  color: #0F172A;
`;

const CloseModalButton = styled.button`
  color: rgba(15, 23, 42, 0.4);
  font-size: 1.5rem;
  background: none;
  border: none;
  padding: 0.25rem;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: #0F172A;
  }
`;

const ModalForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const FormLabel = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: #0F172A;
`;

const FormSelect = styled.select`
  width: 100%;
  border: 1px solid #E5E7EB;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  color: #0F172A;
  font-size: 0.875rem;
  transition: border-color 0.2s;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 1em;

  &:focus {
    outline: none;
    border-color: #3B82F6;
  }
`;

const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ToggleButton = styled.button<{ $isActive: boolean }>`
  width: 2.75rem;
  height: 1.5rem;
  background-color: ${props => props.$isActive ? '#3B82F6' : '#F1F5F9'};
  border: 1px solid #E5E7EB;
  border-radius: 9999px;
  position: relative;
  cursor: pointer;
  transition: background-color 0.2s;
`;

const ToggleKnob = styled.span<{ $isActive: boolean }>`
  position: absolute;
  top: 0.125rem;
  left: 0.125rem;
  width: 1.25rem;
  height: 1.25rem;
  background-color: white;
  border-radius: 50%;
  transition: transform 0.2s;
  transform: ${props => props.$isActive ? 'translateX(1.25rem)' : 'translateX(0)'};
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
`;

const CheckboxList = styled.div`
  max-height: 10rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding-right: 0.5rem;

  &::-webkit-scrollbar {
    width: 0.375rem;
  }

  &::-webkit-scrollbar-track {
    background: #F1F5F9;
    border-radius: 9999px;
  }

  &::-webkit-scrollbar-thumb {
    background: #CBD5E1;
    border-radius: 9999px;
  }
`;

const CheckboxItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const Checkbox = styled.input`
  accent-color: #3B82F6;
  width: 1rem;
  height: 1rem;
  border: 1px solid #E5E7EB;
  border-radius: 0.25rem;
`;

const CheckboxLabel = styled.label`
  font-size: 0.875rem;
  color: rgba(15, 23, 42, 0.9);
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const FeaturedTag = styled.span`
  padding: 0.25rem 0.5rem;
  background-color: rgba(236, 41, 123, 0.1);
  color: #EC297B;
  font-size: 0.75rem;
  border-radius: 9999px;
`;

const RadioGroup = styled.div`
  display: flex;
  gap: 1rem;
`;

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #0F172A;
  cursor: pointer;
`;

const RadioInput = styled.input`
  accent-color: #3B82F6;
`;

const ExportModalButton = styled.button`
  width: 100%;
  background-color: #3B82F6;
  color: white;
  font-weight: 600;
  font-size: 1rem;
  padding: 0.75rem;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #2563EB;
  }
`;

const Avatar = styled.img`
  width: 2rem;
  height: 2rem;
  border-radius: 9999px;
  margin-right: 0.75rem;

  &.agent-avatar {
    width: 1.5rem;
    height: 1.5rem;
    margin-right: 0.5rem;
  }
`;

const Tag = styled.span<{ bgColor?: string; textColor?: string }>`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.5rem;
  background-color: ${props => props.bgColor || 'rgba(0, 152, 255, 0.1)'};
  color: ${props => props.textColor || '#0098FF'};
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
`;

const CardSummary = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const CardNameEmailContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const CardName = styled.span`
  font-weight: 500;
  color: #0F172A;
`;

const CardEmail = styled.span`
  font-size: 0.875rem;
  color: rgba(15, 23, 42, 0.7);
`;

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
  font-size: 0.875rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const DetailLabel = styled.span`
  font-weight: 500;
  color: #0F172A;
`;

const DetailValue = styled.span`
  color: rgba(15, 23, 42, 0.7);
  text-align: right;
`;

interface Role {
  id: string;
  name: string;
  department: string;
  isFeatured: boolean;
  createdBy: {
    name: string;
    email: string;
    avatarUrl: string;
  };
  date: string;
  status: string;
}

interface ExportFormData {
  filterBy: string;
  includeFeaturedOnly: boolean;
  selectedRoles: string[];
  exportFormat: 'csv' | 'pdf';
}

const RolesBlueprintTab: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All Departments');
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [exportFormData, setExportFormData] = useState<ExportFormData>({
    filterBy: 'All Departments',
    includeFeaturedOnly: false,
    selectedRoles: [],
    exportFormat: 'csv'
  });

  const exampleRoles = [
    {
      id: 'role1',
      name: 'Senior Product Manager',
      department: 'Product',
      isFeatured: true,
      createdBy: {
        name: 'Michael S.',
        email: 'michael.s@example.com',
        avatarUrl: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg'
      },
      date: '2025-03-15',
      status: 'Active'
    },
    {
      id: 'role2',
      name: 'Frontend Engineer',
      department: 'Engineering',
      isFeatured: false,
      createdBy: {
        name: 'Sarah L.',
        email: 'sarah.l@techcorp.io',
        avatarUrl: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg'
      },
      date: '2025-03-10',
      status: 'Active'
    },
    {
      id: 'role3',
      name: 'UX Designer',
      department: 'Design',
      isFeatured: true,
      createdBy: {
        name: 'Alex K.',
        email: 'alex.k@design.co',
        avatarUrl: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg'
      },
      date: '2025-03-05',
      status: 'Draft'
    },
    {
      id: 'role4',
      name: 'DevOps Specialist',
      department: 'Engineering',
      isFeatured: false,
      createdBy: {
        name: 'Emma W.',
        email: 'emma.w@enterprise.net',
        avatarUrl: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg'
      },
      date: '2025-03-01',
      status: 'Active'
    },
    {
      id: 'role5',
      name: 'QA Lead',
      department: 'Engineering',
      isFeatured: false,
      createdBy: {
        name: 'David R.',
        email: 'david.r@agency.com',
        avatarUrl: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg'
      },
      date: '2025-02-28',
      status: 'Draft'
    },
    {
      id: 'role6',
      name: 'Product Designer',
      department: 'Design',
      isFeatured: true,
      createdBy: {
        name: 'Lisa M.',
        email: 'lisa.m@design.co',
        avatarUrl: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-6.jpg'
      },
      date: '2025-02-25',
      status: 'Active'
    }
  ];

  const filteredRoles = exampleRoles.filter(role => {
    const matchesSearch = searchQuery === '' || 
      role.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      role.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      role.createdBy.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDepartment = selectedDepartment === 'All Departments' || role.department === selectedDepartment;

    return matchesSearch && matchesDepartment;
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleDepartmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDepartment(e.target.value);
  };

  const handleOpenExportModal = () => {
    setIsExportModalOpen(true);
  };

  const handleCloseExportModal = () => {
    setIsExportModalOpen(false);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setExportFormData(prev => ({
      ...prev,
      filterBy: e.target.value
    }));
  };

  const handleToggleFeatured = () => {
    setExportFormData(prev => ({
      ...prev,
      includeFeaturedOnly: !prev.includeFeaturedOnly
    }));
  };

  const handleRoleToggle = (roleId: string) => {
    setExportFormData(prev => ({
      ...prev,
      selectedRoles: prev.selectedRoles.includes(roleId)
        ? prev.selectedRoles.filter(id => id !== roleId)
        : [...prev.selectedRoles, roleId]
    }));
  };

  const handleFormatChange = (format: 'csv' | 'pdf') => {
    setExportFormData(prev => ({
      ...prev,
      exportFormat: format
    }));
  };

  const handleExportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Exporting roles:', exportFormData);
    handleCloseExportModal();
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isExportModalOpen) {
        handleCloseExportModal();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isExportModalOpen]);

  return (
    <TabContainer>
      <FilterBarContainer id="role-filters">
        <DesktopInputGroup>
          <SearchContainer>
            <SearchInput 
              type="text" 
              placeholder="Search roles..." 
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <SearchIcon icon={faSearch} />
          </SearchContainer>
          <StyledSelect value={selectedDepartment} onChange={handleDepartmentChange}>
            <option>All Departments</option>
            <option>Engineering</option>
            <option>Product</option>
            <option>Design</option>
          </StyledSelect>
        </DesktopInputGroup>
        <DesktopActionButtonsGroup>
          <AddButton>
            <FontAwesomeIcon icon={faPlus} />
            Add to Templates
          </AddButton>
          <ExportButton primary onClick={handleOpenExportModal}>
            <FontAwesomeIcon icon={faDownload} />
            Export Roles
          </ExportButton>
        </DesktopActionButtonsGroup>
      </FilterBarContainer>
      <TableWrapper id="roles-table">
        <StyledTable>
          <TableHeadStyled>
            <TableRowStyled>
              <TableHeaderCellStyled>Role Title</TableHeaderCellStyled>
              <TableHeaderCellStyled>Department</TableHeaderCellStyled>
              <TableHeaderCellStyled>Created By</TableHeaderCellStyled>
              <TableHeaderCellStyled>Date</TableHeaderCellStyled>
              <TableHeaderCellStyled>Status</TableHeaderCellStyled>
              <TableHeaderCellStyled className="text-right">Actions</TableHeaderCellStyled>
            </TableRowStyled>
          </TableHeadStyled>
          <TableBodyStyled>
            {filteredRoles.map(role => (
              <TableRowStyled key={role.id}>
                <TableCellStyled>
                  <span className="font-medium main-text">{role.name}</span>
                  {role.isFeatured && (
                    <FeaturedBadge style={{ marginLeft: '0.5rem' }}>Featured</FeaturedBadge>
                  )}
                </TableCellStyled>
                <TableCellStyled>{role.department}</TableCellStyled>
                <TableCellStyled>
                  <UserCell>
                    <AvatarStyled src={role.createdBy.avatarUrl} alt={role.createdBy.name} />
                    <span>{role.createdBy.email}</span>
                  </UserCell>
                </TableCellStyled>
                <TableCellStyled>{new Date(role.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</TableCellStyled>
                <TableCellStyled>
                  <StatusBadge>{role.status}</StatusBadge>
                </TableCellStyled>
                <TableCellStyled className="text-right">
                  <ActionGroup>
                    <ActionButton title="Favorite">
                      <FontAwesomeIcon icon={faStarRegular} />
                    </ActionButton>
                    <ActionButton title="Edit" data-action="edit">
                      <FontAwesomeIcon icon={faPen} />
                    </ActionButton>
                    <ActionButton title="Delete" data-action="delete">
                      <FontAwesomeIcon icon={faTrashCanRegular} />
                    </ActionButton>
                  </ActionGroup>
                </TableCellStyled>
              </TableRowStyled>
            ))}
          </TableBodyStyled>
        </StyledTable>
      </TableWrapper>
      <CardListContainer>
        {filteredRoles.map(role => (
          <RoleCardStyled key={role.id}>
            <CardHeaderStyled>
              <CardSummary>
                <Avatar src={role.createdBy.avatarUrl} alt={role.name} />
                <CardNameEmailContainer>
                  <CardName>{role.name}</CardName>
                  <CardEmail>{role.department}</CardEmail>
                </CardNameEmailContainer>
              </CardSummary>
              {role.isFeatured && (
                <Tag bgColor="rgba(236, 41, 123, 0.1)" textColor="#EC297B">
                  <FontAwesomeIcon icon={faStarSolid} style={{ fontSize: '0.75rem' }} /> Featured
                </Tag>
              )}
            </CardHeaderStyled>
            <CardContentStyled>
              <DetailRow>
                <DetailLabel>Created By:</DetailLabel>
                <DetailValue>
                  <div className="agent-container">
                    <Avatar src={role.createdBy.avatarUrl} alt="Agent" className="agent-avatar" />
                    <span>{role.createdBy.email}</span>
                  </div>
                </DetailValue>
              </DetailRow>
              <DetailRow>
                <DetailLabel>Date:</DetailLabel>
                <DetailValue>{new Date(role.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</DetailValue>
              </DetailRow>
              <DetailRow>
                <DetailLabel>Status:</DetailLabel>
                <DetailValue>
                  <Tag bgColor="rgba(0, 233, 21, 0.1)" textColor="#00E915">{role.status}</Tag>
                </DetailValue>
              </DetailRow>
            </CardContentStyled>
          </RoleCardStyled>
        ))}
      </CardListContainer>
      <ExportModalOverlay $isOpen={isExportModalOpen} onClick={handleCloseExportModal}>
        <ExportModalContent onClick={e => e.stopPropagation()}>
          <ModalHeader>
            <ModalTitle>Export Roles</ModalTitle>
            <CloseModalButton onClick={handleCloseExportModal}>
              <FontAwesomeIcon icon={faTimes} />
            </CloseModalButton>
          </ModalHeader>
          <ModalForm onSubmit={handleExportSubmit}>
            <FormGroup>
              <FormLabel>Filter By</FormLabel>
              <FormSelect value={exportFormData.filterBy} onChange={handleFilterChange}>
                <option>All Departments</option>
                <option>Engineering</option>
                <option>Product</option>
                <option>Design</option>
                <option>By User</option>
              </FormSelect>
            </FormGroup>

            <ToggleContainer>
              <FormLabel>Include Featured Roles Only</FormLabel>
              <ToggleButton
                type="button"
                $isActive={exportFormData.includeFeaturedOnly}
                onClick={handleToggleFeatured}
              >
                <ToggleKnob $isActive={exportFormData.includeFeaturedOnly} />
              </ToggleButton>
            </ToggleContainer>

            <FormGroup>
              <FormLabel>Select Roles</FormLabel>
              <CheckboxList>
                {exampleRoles.map(role => (
                  <CheckboxItem key={role.id}>
                    <Checkbox
                      type="checkbox"
                      id={role.id}
                      checked={exportFormData.selectedRoles.includes(role.id)}
                      onChange={() => handleRoleToggle(role.id)}
                    />
                    <CheckboxLabel htmlFor={role.id}>
                      {role.name}
                      {role.isFeatured && (
                        <FeaturedTag>
                          <FontAwesomeIcon icon={faStar} style={{ fontSize: '0.625rem' }} /> Featured
                        </FeaturedTag>
                      )}
                    </CheckboxLabel>
                  </CheckboxItem>
                ))}
              </CheckboxList>
            </FormGroup>

            <FormGroup>
              <FormLabel>Export Format</FormLabel>
              <RadioGroup>
                <RadioLabel>
                  <RadioInput
                    type="radio"
                    name="exportFormat"
                    checked={exportFormData.exportFormat === 'csv'}
                    onChange={() => handleFormatChange('csv')}
                  />
                  CSV
                </RadioLabel>
                <RadioLabel>
                  <RadioInput
                    type="radio"
                    name="exportFormat"
                    checked={exportFormData.exportFormat === 'pdf'}
                    onChange={() => handleFormatChange('pdf')}
                  />
                  PDF
                </RadioLabel>
              </RadioGroup>
            </FormGroup>

            <ExportModalButton type="submit">
              Export Roles
            </ExportModalButton>
          </ModalForm>
        </ExportModalContent>
      </ExportModalOverlay>
    </TabContainer>
  );
};

export default RolesBlueprintTab; 
